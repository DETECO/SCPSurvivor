# P05: servidor alternativo compatible con Spark

## Arquitectura

Firebase Authentication conserva el proyecto `scp-survivor` y sus proveedores. El servidor alternativo usa Cloudflare Workers y un Durable Object SQLite por UID. `functions/account-service.js` mantiene las reglas de comandos, revisión, sesión, checkpoint y recibos. `functions/` conserva el camino anterior y los emuladores; no desplegar Functions mientras se mantenga Spark.

El Worker verifica firma RS256 y las claves públicas oficiales de Google, emisor, audiencia, caducidad, fecha de emisión/autenticación y UID. No recibe una clave privada de Firebase. Como `verifyIdToken()` sin `checkRevoked`, la verificación criptográfica no consulta revocaciones administrativas; un token emitido puede permanecer válido hasta caducar.

El cliente envía el ID token por HTTPS y mantiene el mismo comando/requestId ante un reintento. La identidad se obtiene del token; el JSON del comando no determina el UID. Las transacciones confirman conjuntamente estado y recibo. No hay rutas públicas de administración, SQL, exportación masiva o pruebas.

## Coste y activación

La documentación de Cloudflare admite Durable Objects SQLite en Workers Free; al exceder sus límites las operaciones fallan. Esto **no confirma el plan de la cuenta concreta**. [Precios y límites oficiales](https://developers.cloudflare.com/durable-objects/platform/pricing/).

La conexión disponible permitió consultar la cuenta, el subdominio y los Workers existentes. Las consultas de suscripciones devolvieron error de autorización. El modelo `standard` del API no demuestra Free. No activar planes, suscripciones, billing ni Blaze para sortear este bloqueo.

`config/accounts-runtime.json` conserva `ownAccountsEnabled: false`. La dirección preparada corresponde al nombre y subdominio de la cuenta; **no es un enlace de juego disponible ni prueba de despliegue**. No habilitar el cliente antes de verificar el servidor remoto.

## Comandos locales de PowerShell

Desde la raíz del proyecto, con Node 24:

```powershell
npm.cmd ci
npm.cmd run test:p05
npm.cmd run build
npm.cmd run build:check
npx.cmd wrangler deploy --dry-run --outdir dist-worker
npx.cmd wrangler types worker/worker-configuration.d.ts --include-runtime false --check
```

El dry-run compila sin publicar. Las pruebas Miniflare usan bases temporales y un adaptador de entrada exclusivo de pruebas; no aceptan tokens ficticios en el Worker de producción. `.wrangler/`, `dist-worker/` y `local-data/` quedan excluidos de Git.

## Secuencia de activación pendiente

1. Confirmar Workers **Free** en la cuenta existente, sin cambiar el plan. Si no se puede confirmar, conservar el servidor sin publicar.
2. Revisar `wrangler.jsonc`, el bundle y las pruebas. Crear únicamente `scp-survivor-accounts`; conservar todos los Workers ajenos.
3. Desplegar con la conexión autorizada. Verificar `/health` y que `/accountCommand` sin identidad responde 401. No confundir estas comprobaciones con guardado probado.
4. Con cuentas reales, ejecutar R01–R07 de `CIERRE_P05.md`: correo, Google, vinculación, aislamiento, concurrencia, transferencia, desconexión y retención. Registrar resultados saneados.
5. Solo después de verificar el servidor, habilitar `ownAccountsEnabled`, regenerar el frontend y probar `?cuentas=propias`. El modo `?cuentas=local` sigue usando los emuladores originales.

## Datos y límites

No se trasladan datos de Firestore por inferencia: su consulta previa devolvió `SERVICE_DISABLED`. No borrar ni reemplazar una base existente sin haberla inventariado.

Los recibos no caducan ni se podan. Cada uno incluye el resultado original para garantizar deduplicación. El adaptador limita el tamaño lógico UTF-8 por jugador a 50 MiB y rechaza nuevas escrituras al agotarlo; conserva lectura y reintentos confirmados. Ese límite no es una medida de páginas SQLite ni un tope monetario global. Se debe medir almacenamiento real y aplicar las cuotas del proveedor. No borrar recibos para recuperar espacio de forma improvisada.

P05 no queda aceptada por las pruebas locales. P06 conserva su prototipo y depende del cierre real de P05.

Referencias: [verificación de tokens Firebase](https://firebase.google.com/docs/auth/admin/verify-id-tokens), [transacciones SQLite de Durable Objects](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/).
