'use strict';
// Generate the view from the existing canonical schema and its Markdown template.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),file=path.join(root,'RoadmapSCP.json');
const r=JSON.parse(fs.readFileSync(file,'utf8'));
const fmt=n=>new Intl.NumberFormat('es-CL',{maximumFractionDigits:2}).format(n);
const cell=value=>String(value??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');
const row=(...values)=>'| '+values.map(cell).join(' | ')+' |';
const table=(headers,rows)=>[row(...headers),row(...headers.map(()=> '---')),...rows].join('\n');
const verified=t=>t.status==='CV'&&t.evidenceComplete===true;
const sum=tasks=>tasks.reduce((n,t)=>n+t.weight,0);
if(new Set(r.tasks.map(t=>t.id)).size!==r.tasks.length)throw Error('IDs de tareas duplicados.');
if(sum(r.tasks)!==r.baseline.totalWeight)throw Error('Los pesos no coinciden con la línea base.');
for(const collection of ['phases','evidence','decisions','authorizations','remainingAreas','risks','changeHistory']){
 if(new Set(r[collection].map(item=>item.id)).size!==r[collection].length)throw Error('IDs duplicados en '+collection);
}
for(const t of r.tasks){
 if(!Number.isFinite(t.weight)||t.weight<=0||!r.statusLabels[t.status])throw Error('Peso/estado inválido: '+t.id);
 if(!r.phases.some(p=>p.id===t.phaseId))throw Error('Fase desconocida: '+t.id);
 if(t.dependencies.some(id=>!r.tasks.some(other=>other.id===id)))throw Error('Dependencia desconocida: '+t.id);
 if(t.evidenceIds.some(id=>!r.evidence.some(e=>e.id===id)))throw Error('Referencia de evidencia desconocida: '+t.id);
 if(t.status==='CV'&&(!t.evidenceComplete||!t.evidenceIds.length))throw Error('Cierre sin evidencia completa: '+t.id);
}
const phase=r.phases.map(p=>{
 const tasks=r.tasks.filter(t=>t.phaseId===p.id),weight=sum(tasks),completedWeight=sum(tasks.filter(verified));
 if(weight!==p.approvedWeight)throw Error('Peso de fase distinto al aprobado: '+p.id);
 if(JSON.stringify([...p.taskIds].sort())!==JSON.stringify(tasks.map(t=>t.id).sort()))throw Error('La lista de tareas no coincide con su fase: '+p.id);
 return{id:p.id,weight,completedWeight,percent:100*completedWeight/weight,globalContribution:completedWeight,
  completedTasks:tasks.filter(verified).length,totalTasks:tasks.length};
});
const completedWeight=sum(r.tasks.filter(verified)),planning=phase.find(p=>p.id==='P00');
const previousDerived=JSON.stringify(r.derivedProgress);
r.derivedProgress={...r.derivedProgress,
 global:{totalWeight:sum(r.tasks),completedWeight,percent:100*completedWeight/sum(r.tasks),completedTasks:r.tasks.filter(verified).length,totalTasks:r.tasks.length},
 planning:{totalWeight:planning.weight,completedWeight:planning.completedWeight,percent:planning.percent},
 technical:{totalWeight:sum(r.tasks)-planning.weight,completedWeight:completedWeight-planning.completedWeight,
  percent:100*(completedWeight-planning.completedWeight)/(sum(r.tasks)-planning.weight)},phases:phase,
 computedFromTaskDigest:crypto.createHash('sha256').update(JSON.stringify(r.tasks)).digest('hex'),
 taskDigestAlgorithm:'SHA256 of JSON.stringify(tasks), UTF-8'};
const byId=(items,id)=>{const item=items.find(x=>x.id===id);if(!item)throw Error('Referencia desconocida '+id);return item;};
// Old evidence anchors refer to the unchanged v0.11 view, preserved in the archive.
const references=items=>(items||[]).map(value=>{
 const target=value.startsWith('RoadmapSCP.md#')?'docs/historial-local/alfa-0.4/'+value:value;
 return '['+value+']('+target+')';
}).join(', ');
const details=item=>Object.entries(item).filter(([key])=>!['id','kind','summary','references','runtimeProof'].includes(key))
 .map(([key,value])=>key+': '+(typeof value==='object'?JSON.stringify(value):value)).join('; ');
function render(key){
 const [type,id]=key.split(':');
 if(type==='ACTIVE_DESIGN'){
  const d=r.activeDesignRevision;
  if(!d)throw Error('Falta la revisión de diseño vigente.');
  const trial=d.firstTrial?'\n\n**Primera prueba local disponible:** [guía]('+d.firstTrial.guide+') · [prueba rápida]('+d.firstTrial.quickUrl+') · [mapa completo]('+d.firstTrial.url+'). Sin cuentas ni guardado; aceptación de Iván pendiente.':'';
  return '**Diseño vigente '+d.id+' — '+d.title+' ('+d.updatedOn+').** '+d.summary+'\n\n'+
   '[Pauta vigente]('+d.pautaPath+') · [Plan de cambios]('+d.changePlanPath+') · [Decisiones y pendientes]('+d.decisionsPath+')'+trial+'\n\n'+
   '**Avance V2: sin calcular.** '+d.progress.explanation+'\n\n'+
   table(['Elemento','Tratamiento vigente'],d.scope.map(x=>row(x.element,x.treatment)))+'\n\n'+
   table(['Paso','Trabajo y estado','Dependencias'],d.implementationPlan.map(x=>row(x.id,x.title+(x.status==='EC'?' — prototipo local; aceptación pendiente':''),x.dependencies.join(', ')||'Reglas V2')))+'\n\n'+
   '**P05 continúa pendiente de aceptación real; P06 se replantea.** No continuar la lista anterior de mochila, accesorios, pérdida/recuperación o extracción. '+
   'Las tablas y porcentajes siguientes conservan la **línea base histórica**, no acreditan aceptación de V2.';
 }
 if(type==='GLOBAL')return fmt(r.derivedProgress.global.percent);
 if(type==='VERSION')return r.planVersion;
 if(type==='DATE')return r.updatedOn;
 if(type==='CV_COUNT')return r.tasks.filter(verified).length;
 if(type==='STATE_COUNTS')return Object.entries(r.statusLabels).map(([status,label])=>status+' ('+label+'): '+r.tasks.filter(t=>t.status===status).length).join('; ');
 if(type==='P05_VALIDATION_SUMMARY')return '**EV-027 — verificación local final:** '+byId(r.evidence,'EV-027').summary;
 if(type==='SUMMARY_COUNTS')return '**'+r.tasks.length+' tareas, '+r.phases.length+' fases, '+sum(r.tasks)+' puntos y '+r.tasks.filter(verified).length+' tareas CV.**';
 if(type==='SUMMARY_METRICS')return table(['Indicador','Puntos verificados','Avance'],[
  row('Global hasta primera versión completa publicada',completedWeight+'/'+sum(r.tasks),fmt(r.derivedProgress.global.percent)+' %'),
  row('Planificación',planning.completedWeight+'/'+planning.weight,fmt(planning.percent)+' %'),
  row('Técnico P01–P11',r.derivedProgress.technical.completedWeight+'/'+r.derivedProgress.technical.totalWeight,fmt(r.derivedProgress.technical.percent)+' %')]);
 if(type==='SUMMARY_PHASES')return table(['Fase','Categoría','Puntos verificados','Avance','Estado'],r.phases.map(p=>{
  const v=byId(phase,p.id);
  const states=r.tasks.filter(t=>t.phaseId===p.id).map(t=>t.status);
  const state=p.id==='P05'?'En validación local; aceptación real pendiente':v.percent===100?'Verificada localmente':states.includes('EC')?'En curso':states.includes('EV')?'En validación':states.includes('B')?'Bloqueada':'Pendiente';
  return row(p.id,p.title,v.completedWeight+'/'+v.weight,fmt(v.percent)+' %',state);
 }));
 if(type==='ALL_AUTHORIZATIONS')return table(['ID','Acción','Alcance registrado'],r.authorizations.map(a=>row(a.id,a.action,a.scopeStatus)));
 if(type==='ALL_DECISIONS')return table(['ID','Tema','Aprobación/registro','Resolución'],r.decisions.map(d=>row(d.id,d.topic,d.approvalStatus,d.resolution)));
 if(type==='ALL_EVIDENCE')return table(['ID','Tipo y alcance','Prueba ejecutada','Referencias','Detalles'],r.evidence.map(e=>row(e.id,e.kind+': '+e.summary,e.runtimeProof?'Sí, dentro del alcance descrito':'Documental; sin prueba de ejecución',references(e.references),details(e))));
 if(type==='ALL_REMAINING')return table(['ID','Estado y trabajo restante','Prioridad','Dependencias'],r.remainingAreas.map(q=>row(q.id,q.scopeAndRemaining,q.typeAndPriority,q.dependenciesAndBlocks)));
 if(type==='ALL_RISKS')return table(['ID','Riesgo','Impacto','Estado/probabilidad','Mitigación'],r.risks.map(q=>row(q.id,q.description,q.impact,q.likelihood,q.mitigation)));
 if(type==='ALL_CLOSURES')return table(['ID','Tema','Resolución histórica','Ejecución pendiente al registrarse'],r.closureCases.map(q=>row(q.id,q.topic,q.resolution,q.remainingExecution)));
 if(type==='ALL_HISTORY')return table(['ID','Fecha','Cambio','Autorización'],r.changeHistory.map(q=>row(q.id,q.date,q.description,q.approval)));
 if(type==='ALL_NEWS')return table(['ID','Título y versión','Estado','Evidencia','Imagen y texto alternativo'],r.news.map(q=>row(q.id,q.title+'; '+q.version+'; '+q.summary,q.status,q.evidenceIds.join(', '),q.image?references([q.image])+'; '+q.altText:'Sin imagen; pendiente')));
 if(type==='ALL_TASKS')return r.phases.map(p=>{
  const tasks=r.tasks.filter(t=>t.phaseId===p.id),v=byId(phase,p.id);
  const rows=tasks.map(t=>row(t.id,t.scopeAndAcceptance,fmt(t.weight),t.status,t.dependencies.join(', ')||'Ninguna',t.evidenceIds.join(', ')||'Pendiente'));
  const notes=tasks.filter(t=>t.completionSummary||t.remainingAcceptance?.length||t.closureBlock).map(t=>
   '**'+t.id+' — estado actual:** '+(t.completionSummary||'')+
   (t.remainingAcceptance?.length?' Pendiente de aceptación: '+t.remainingAcceptance.join('; ')+'.':'')+
   (t.closureBlock?' Bloqueo: '+t.closureBlock: '')).join('\n\n');
  return '### '+p.id+' — '+p.title+'\n\n'+fmt(v.completedWeight)+'/'+fmt(v.weight)+' puntos; '+fmt(v.percent)+' % de la fase. '+p.dependencyPolicy+'\n\n'+
   table(['Tarea','Criterio de aceptación conservado','Peso global','Estado','Dependencias','Evidencias'],rows)+(notes?'\n\n'+notes:'');
 }).join('\n\n');
 if(type==='A'){const a=byId(r.authorizations,id);return row(a.id,a.action,a.scopeStatus);}
 if(type==='D'){const d=byId(r.decisions,id);return d.tableFormat==='extended'?row(d.id,d.topic,d.approvalStatus,d.resolution):row(d.id,d.topic,d.resolution);}
 if(type==='TASK'){const t=byId(r.tasks,id),p=byId(phase,t.phaseId);return row(t.id,t.scopeAndAcceptance,fmt(t.weight)+' %',fmt(100*t.weight/p.weight)+' %',t.status,verified(t)?'100 %':'0 %');}
 if(type==='Q'){const q=byId(r.remainingAreas,id);return row(q.id,q.scopeAndRemaining,q.typeAndPriority,q.dependenciesAndBlocks);}
 if(type==='R'){const q=byId(r.risks,id);return row(q.id,q.description,q.impact,q.likelihood,q.mitigation);}
 if(type==='CIE'){const q=byId(r.closureCases,id);return row(q.id,q.topic,q.resolution,q.remainingExecution);}
 if(type==='CHG'){const q=byId(r.changeHistory,id);return row(q.id,q.date,q.description,q.approval);}
 if(type==='PHASE_PROGRESS')return table(['Etapa','Categoría','Peso global','Avance de etapa','Aporte al global'],r.phases.map(p=>{
  const v=byId(phase,p.id);return row(p.id,p.title,fmt(v.weight)+' %',fmt(v.percent)+' %',fmt(v.completedWeight)+' %');}));
 if(type==='COMPLETED_EVIDENCE')return table(['Tarea','Peso global','Evidencia'],r.tasks.filter(verified).map(t=>row(t.id,fmt(t.weight)+' %',t.evidenceIds.join(', '))));
 if(type==='PROGRESS_SUMMARY')return table(['Indicador','Resultado'],[
  row('Global de primera versión publicada',`${fmt(completedWeight)} / ${sum(r.tasks)} (${fmt(r.derivedProgress.global.percent)} %)`),
  row('Auditoría/planificación P00',`${planning.completedWeight}/${planning.weight}`),
  row('Bloque técnico P01–P11',`${r.derivedProgress.technical.completedWeight}/${r.derivedProgress.technical.totalWeight} (${fmt(r.derivedProgress.technical.percent)} %)`),
  row('P03',`${byId(phase,'P03').completedWeight}/12 (${fmt(byId(phase,'P03').percent)} %)`),
  row('P05',`${byId(phase,'P05').completedWeight}/${byId(phase,'P05').weight}; en validación local; flujos reales y producción pendientes`),row('Juego/web publicados','No')]);
 throw Error('Placeholder desconocido: '+key);
}
const markdown=r.markdownTemplate.replace(/\{\{([^}]+)\}\}/g,(_,key)=>render(key));
const summary=r.summaryTemplate?.replace(/\{\{([^}]+)\}\}/g,(_,key)=>render(key));
if(process.argv.includes('--check')){
 if(previousDerived!==JSON.stringify(r.derivedProgress))throw Error('Los cálculos del JSON están desactualizados. Generar la vista antes de comprobar.');
 if(fs.readFileSync(path.join(root,'RoadmapSCP.md'),'utf8').replace(/\r\n/g,'\n')!==markdown.replace(/\r\n/g,'\n'))throw Error('La vista del roadmap está desactualizada.');
 if(summary&&fs.readFileSync(path.join(root,'ROADMAP.md'),'utf8').replace(/\r\n/g,'\n')!==summary.replace(/\r\n/g,'\n'))throw Error('El resumen ROADMAP.md está desactualizado.');
 console.log('Roadmap coherente: '+r.tasks.length+' tareas; '+fmt(completedWeight)+'/'+sum(r.tasks));
}else{
 fs.writeFileSync(file,JSON.stringify(r,null,2)+'\n');fs.writeFileSync(path.join(root,'RoadmapSCP.md'),markdown);
 if(summary)fs.writeFileSync(path.join(root,'ROADMAP.md'),summary);
 console.log('Roadmap generado: '+fmt(completedWeight)+'/'+sum(r.tasks));
}
