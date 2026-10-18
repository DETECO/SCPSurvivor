# Activación de Firebase propio para cerrar P05

Estado vigente17/10/2026: acceso CLI y configuración Auth comprobados en vivo (EV-033). Iván eligió **mantener Spark sin facturación** (A-028/D-315). El backend actual Functions no se despliega en Spark; `ownAccountsEnabled=false`. Las secciones de despliegue de abajo son una referencia condicionada y **NO DEBEN EJECUTARSE bajo la decisión vigente**. Leer [estado Spark](P05-ESTADO-SPARK.md). No cambiar los estados del roadmap por seguir estos comandos sin ejecutar y revisar las pruebas de CIERRE_P05.md.

## Acceso del propietario y coste

Desde PowerShell en la carpeta SCP-SURVIVOR, con las dependencias instaladas:

```powershell
npx.cmd firebase login:list --non-interactive
node tools/check-firebase-own.js
```

El propietario ya autorizó Google directamente; no repetir el login mientras sea válido. El comprobador confirma acceso y solo consulta proyectos. No pegar códigos, tokens o contraseñas en el chat. Si una sesión futura realmente caduca, usar `npx.cmd firebase login --interactive --reauth` para el flujo interactivo oficial. En esta ejecución Windows mostró Success seguido de una aserción nativa al salir; login:list y el preflight confirmaron que la sesión sí quedó persistida.

La consulta real confirmó facturación deshabilitada y ninguna cuenta vinculada. El titular eligió conservar Spark sin facturación; no volver a proponer activarlo como paso automático. [Cloud Functions requiere Blaze para desplegar](https://firebase.google.com/docs/functions/get-started): vincula facturación y puede generar cargos. D-068 fija objetivo20USD/mes, sin autorización de gasto; D-284 no es un tope monetario garantizado. No activar Blaze automáticamente por una petición general de desarrollo. Revisar ese paso con el titular antes de desplegar.

## Comprobar proyecto, Firestore y configuración

- Usar exclusivamente `scp-survivor`; la configuración web pública está en config/firebase-public.json.
- Las consultas de Firestore/Functions devolvieron403SERVICE_DISABLED: no pudieron listarse y no prueban ausencia de datos. No habilitar APIs o crear bases como parte de esta auditoría. Si una implementación futura compatible con Spark requiere una base, revisar antes la configuración existente y usar una base protegida en el proyecto correcto. La ubicación debe revisarse antes de crearla; las funciones actuales usan us-central1. No usar reglas abiertas ni modo de prueba para resolver errores de permisos.
- EV-033 confirma administrativamente Google/correo,localhost/127.0.0.1 y ambos hosts del proyecto, política ENFORCE8..4096 sin clases. `allowDuplicateEmails` fue omitido y queda sin confirmar. Las consultas no prueban OAuth o recepción de correo.
- Revisar templates de correo y flujos reales de verificación/recuperación. [Guía de correo/contraseña](https://firebase.google.com/docs/auth/web/password-auth) y [vinculación explícita](https://firebase.google.com/docs/auth/web/account-linking).
- La plantilla firebase.own.json es independiente del archivo de emuladores. Las reglas mantienen denegación total al cliente; solo Functions usa Admin con identidad del runtime, sin descargar una clave privada.

## Referencia de backend — NO EJECUTAR con Spark

Conservar cualquier configuración preexistente; no sobrescribir .env.scp-survivor sin revisarla. El único valor de activación necesario no es secreto:

```powershell
if (Test-Path 'functions/.env.scp-survivor') { throw 'Revisar configuración existente antes de continuar.' }
Set-Content -LiteralPath 'functions/.env.scp-survivor' -Value 'SCP_ACCOUNT_PROJECT=scp-survivor' -Encoding ascii
npx.cmd firebase functions:list --project scp-survivor
npx.cmd firebase deploy --project scp-survivor --config firebase.own.json --only 'functions:scp-own,firestore:rules,firestore:indexes'
```

No ejecutar el despliegue si las funciones existentes pertenecen a otro código/base sin revisar. El runtime propio rechaza otro proyecto, habilitación ausente o variables de emuladores mezcladas. Conserva la misma propiedad/versión/sesión/recibos y checkpoint schema1; no migra datos de cuentas ficticias.

Instancias mínimas0 y máximas1/concurrencia20 acotan capacidad; no equivalen a una garantía de coste mensual. No existe aquí una protección monetaria P10/P11 validada. No borrar recibos por TTL: se debe conservar deduplicación conforme a D-290. Falta revisar y probar la política de retención/eliminación para cerrar la aceptación real.

## Referencia de frontend propio — NO EJECUTAR sin backend aceptado

config/accounts-runtime.json mantiene ownAccountsEnabled=false. No habilitarlo hasta comprobar el backend propio. Después:

```powershell
node -e "const fs=require('fs');const p='config/accounts-runtime.json';const c=JSON.parse(fs.readFileSync(p,'utf8'));c.ownAccountsEnabled=true;fs.writeFileSync(p,JSON.stringify(c,null,2)+'\n');"
npm.cmd run build
npm.cmd run build:check
node tools/prepare-own-hosting.js
npx.cmd firebase deploy --project scp-survivor --config firebase.own.json --only hosting
```

El preparador crea dist-own con frontend público solamente: no expone backend, docs, pruebas ni datos locales. Si ya existe, se detiene y conserva la copia; revisar/archivar antes de preparar otra. dist-own está excluido de Git. El despliegue de Hosting requiere revisar antes cualquier sitio existente para no reemplazar contenido ajeno.

Abrir https://scp-survivor.web.app/?cuentas=propias para las pruebas entre dispositivos. También se admite el modo propio explícito en localhost/127.0.0.1. Un dominio cualquiera no activa cuentas aunque lleve el parámetro. `?cuentas=local` sigue siendo exclusivamente emulado y nunca utiliza el proyecto real. Las cachés de ambos modos son independientes.

## Evidencia exigida para terminar

Completar CIERRE_P05.md con cuentas del titular y una segunda identidad de ensayo real, sin registrar secretos: OAuth, correo recibido, vinculación/UID, aislamiento, reintentos/concurrencia y recuperación entre dispositivos/redes. Guardar resultados observados, build y proyecto. Los mocks y emuladores acreditan regresión/preparación; no estos casos reales. Hasta entonces, P05 sigue EV0/6 y P06 no se continúa.
