import runtime from '../functions/project-runtime.js';
const {ServiceError}=runtime;

export const MAX_ACCOUNT_BYTES=50*1024*1024;
const encoder=new TextEncoder();
const bytes=value=>encoder.encode(value).byteLength;
const fail=(code,message)=>{throw new ServiceError(code,message);};
function segment(value){
 if(typeof value!=='string'||!value||value.includes('/'))fail('invalid-argument','Ruta de documento inválida.');
 return value;
}

// Only the small document/transaction surface consumed by executeCommand.
export class SqliteAdapter {
 constructor(storage,{maxBytes=MAX_ACCOUNT_BYTES}={}){
  this.storage=storage;
  this.sql=storage.sql;
  this.maxBytes=maxBytes;
  this.sql.exec('CREATE TABLE IF NOT EXISTS docs (path TEXT PRIMARY KEY, json TEXT NOT NULL)');
  this.sql.exec('CREATE TABLE IF NOT EXISTS account_meta (id INTEGER PRIMARY KEY CHECK (id=1), owner_uid TEXT, document_bytes INTEGER NOT NULL)');
  this.sql.exec(`INSERT OR IGNORE INTO account_meta (id, owner_uid, document_bytes)
   SELECT 1, NULL, COALESCE(SUM(length(CAST(path AS BLOB))+length(CAST(json AS BLOB))),0) FROM docs`);
 }

 async bindOwner(uid){
  await this.storage.transaction(async()=>{
   const {owner_uid:owner}=this.sql.exec('SELECT owner_uid FROM account_meta WHERE id=1').one();
   if(owner!==null&&owner!==uid)fail('permission-denied','La cuenta no pertenece a este almacenamiento.');
   if(owner===null)this.sql.exec('UPDATE account_meta SET owner_uid=? WHERE id=1',uid);
  });
 }

 collection(name){return this.collectionAt(segment(name));}

 collectionAt(path){
  return{doc:id=>this.documentAt(path+'/'+segment(id))};
 }

 documentAt(path){
  return{path,get:async()=>this.read(path),collection:name=>this.collectionAt(path+'/'+segment(name))};
 }

 read(path){
  const row=this.sql.exec('SELECT json FROM docs WHERE path=?',path).toArray()[0];
  // Each data() call returns an isolated copy, like a document snapshot.
  return{exists:row!==undefined,data:()=>row===undefined?undefined:JSON.parse(row.json)};
 }

 async runTransaction(callback){
  return await this.storage.transaction(async()=>{
   const tx={
    get:async ref=>this.read(ref.path),
    set:(ref,value)=>{
     const json=JSON.stringify(value);
     if(typeof json!=='string')fail('invalid-argument','Documento JSON inválido.');
     const old=this.sql.exec('SELECT json FROM docs WHERE path=?',ref.path).toArray()[0];
     const {document_bytes:used}=this.sql.exec('SELECT document_bytes FROM account_meta WHERE id=1').one();
     const projected=used+bytes(json)+(old? -bytes(old.json):bytes(ref.path));
     if(used>=this.maxBytes||projected>this.maxBytes)
      fail('resource-exhausted','La cuenta alcanzó su límite de almacenamiento. Conserva sus datos y recibos.');
     this.sql.exec('INSERT INTO docs (path,json) VALUES (?,?) ON CONFLICT(path) DO UPDATE SET json=excluded.json',ref.path,json);
     this.sql.exec('UPDATE account_meta SET document_bytes=? WHERE id=1',projected);
    }
   };
   // On SQLite-backed DOs direct SQL participates in this async transaction.
   // Any callback failure rolls back both documents and the quota counter.
   return await callback(tx);
  });
 }
}
