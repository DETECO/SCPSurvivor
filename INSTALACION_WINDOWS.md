# Instalación Windows — SCP Survivor P05 local

**Prioridad17/10/2026:** cerrar P05 antes de continuarP06. Las instrucciones de abajo mantienen el entorno local, sin coste. La integración propia sigue desactivada. El acceso CLI del titular ya está autorizado; EV-033 confirma proveedores/dominios/política Auth. Iván eligió Spark sin facturación (A-028/D-315): no ejecutar despliegues propios ni habilitar ownAccountsEnabled. El backend Functions actual no se puede desplegar en ese plan. Leer [estado Spark](docs/P05-ESTADO-SPARK.md) y, como referencia condicionada, [docs/ACTIVACION_FIREBASE_PROPIO.md](docs/ACTIVACION_FIREBASE_PROPIO.md) y [docs/CIERRE_P05.md](docs/CIERRE_P05.md). No activar facturación como parte de esta instalación local.

Esta entrega continúa alfa0.4. P05 utiliza Firebase emulado en este computador; no necesita proyecto Firebase real, facturación, Google real ni claves privadas. El modo sin cuentas continúa disponible.

## 1. Herramientas

- Windows64bits y navegador Chrome/Edge. No hay mínimo de CPU/RAM validado ni pruebas en teléfonos físicos.
- Node24: se utilizaron24.12.0 y npm11.6.2. Necesario para herramientas y emuladores.
- Java21, para Firestore Emulator. Se utilizó Temurin21.0.12.1 JRE portátil. Puede instalarse Temurin21 JDK desde https://adoptium.net/temurin/releases/?version=21 ; comprobar java -version en una terminal nueva.
- Python3.12, únicamente para pruebas de navegador; se utilizó3.12.10 con Playwright1.64.0 y Chromium156.
- Git for Windows opcional, comprobado2.51.0.windows.1. La aplicación Codex Local que ya utilizas.

Dependencias fijadas en ambos package-lock.json: FirebaseJS13.0.0, CLI15.34.0, esbuild0.28.2, Terser5.51.2; servidor firebase-admin14.5.0/firebase-functions7.4.0. Node24 de Functions se usa localmente; no acredita un despliegue de producción.

## 2. Carpeta

Descomprimir SCP-SURVIVOR-P05-LOCAL.zip en una carpeta nueva, conservando SCP-SURVIVOR/ y sus subcarpetas. No superponer sobre una versión anterior sin respaldo. En PowerShell, desde la carpeta que contiene package.json:

```powershell
node --version
npm.cmd --version
java -version
npm.cmd ci --ignore-scripts
npm.cmd --prefix functions ci --ignore-scripts
npm.cmd run build:check
```

Necesitas Internet para reinstalar dependencias y para la primera descarga de emuladores. Las partidas se ejecutan localmente después de preparar las herramientas. No necesitas firebase login.

## 3. Partida sin cuentas

```powershell
npm.cmd run serve
```

Abre http://127.0.0.1:8000/ . Esta entrada no guarda partidas. El compilado está incluido; no necesitas compilar para jugar. Alternativa si solo dispones de Python: py -3.12 -m http.server 8000 --bind 127.0.0.1 . No abrir el HTML con doble clic.

## 4. Cuentas y guardado de prueba

Primera ventana PowerShell, dentro del proyecto:

```powershell
npm.cmd run emulators
```

Esperar el mensaje de que todos los emuladores están listos. Segunda ventana, misma carpeta:

```powershell
npm.cmd run serve
```

Abrir http://127.0.0.1:8000/?cuentas=local . Para fuentes: http://127.0.0.1:8000/dev.html?cuentas=local . Siempre usar127.0.0.1: ambos enlaces apuntan a los mismos emuladores.

Puertos: HTTP8000, Auth9099, Functions5001, Firestore8080, hub4400, logging4500; todos en127.0.0.1. No abrirlos al exterior.

Crear cuenta ficticia con alias3–24 y contraseña de al menos8 caracteres. No uses tu contraseña real. No se envía correo a Internet. Para obtener el enlace local de verificación o recuperación solicitado desde el juego, abre una tercera terminal:

```powershell
npm.cmd run correo:local -- explorador@example.test
```

Sustituye la dirección por la usada en la prueba. Abre el enlace que devuelve el emulador; luego pulsa Actualizar verificación en el juego. El botón Google de prueba usa el correo ficticio escrito en el formulario y una credencial simulada admitida por Auth Emulator; no abre Google ni valida una cuenta real. Vincular métodos exige la acción explícita correspondiente.

Una cuenta puede tener una sola expedición activa. Reanudar toma el control y detiene la sesión anterior al comprobarlo. Se conserva el último checkpoint confirmado. Cerrar durante combate vuelve al inicio de esa oleada y excluye la expedición de clasificación. No existe todavía ranking oficial ni recompensas persistentes.

## 5. Datos y variables

No crear .env: el frontend no lo lee. .env.example describe los hosts locales y variables opcionales de pruebas. No pegar claves privadas en firebase-config.js ni activar los servicios heredados.

npm.cmd run emulators importa automáticamente local-data/firebase cuando existe una exportación válida. **Antes de cerrar**, desde otra terminal dentro del proyecto ejecuta:

```powershell
npm.cmd run emulators:save
```

Espera «Datos locales exportados» y después cierra los emuladores con Ctrl+C. El guardado explícito evita depender de la salida automática del CLI, que presentó un fallo nativo en Windows/Node24 durante esta auditoría. Usa el mismo servicio de exportación del CLI fijado; solo apunta al proyecto demo local. Esa carpeta contiene cuentas y partidas de prueba: se omite en ZIP/Git. Respáldala de forma privada si quieres conservarla entre computadores. Cerrar a la fuerza puede perder cambios aún no exportados. El paquete no incluye una base de datos real.

Los checkpoints y comandos pendientes del navegador pertenecen a su UID/sesión y no sustituyen la base del emulador. Si borras la base local, borra también los datos de ese sitio para evitar cuentas/guardados huérfanos.

## 6. Desarrollo y compilación

Editar dev.html, CSS y módulos fuente; conservar orden. No editar los archivos generados a mano.

```powershell
npm.cmd run build
npm.cmd run build:check
node tools/render-roadmap.js --check
```

El build genera SDKFirebase local, js/app.min.js e index.html. No despliega nada. Revisar docs/P05-CAMBIOS.diff y docs/P05-REPORT.md.

## 7. Pruebas

Con emuladores abiertos para las pruebas de integración:

```powershell
$scpTests = Get-ChildItem .\tests -Filter '*.test.js' | Sort-Object Name | ForEach-Object { $_.FullName }
node --test $scpTests
$env:RUN_P05_EMULATORS = '1'
node --test tests\p05-emulators.test.js
Remove-Item Env:RUN_P05_EMULATORS
py -3.12 -m venv .venv
& '.\.venv\Scripts\python.exe' -m pip install -r requirements-tests-windows.txt
& '.\.venv\Scripts\python.exe' -m playwright install chromium
& '.\.venv\Scripts\python.exe' tests\p05-browser.py
& '.\.venv\Scripts\python.exe' tests\p04-browser.py
& '.\.venv\Scripts\python.exe' tests\p03-levels.py
& '.\.venv\Scripts\python.exe' tests\p03-browser.py
```

Los scripts de navegador abren su propio servidor y guardan evidencias en tests/artifacts. No necesitan la terminal HTTP8000. Tests P01 describen una escena anterior; no cambiar la jugabilidad vigente para satisfacer expectativas históricas. Consultar el informe para los comandos específicos del ensayo servidor y resultados actuales.

## 8. Codex Local y GitHub

Selecciona como carpeta local este SCP-SURVIVOR, no solamente el espejo ChatGPT del padre. Primer mensaje sugerido:

> Continúa este SCP Survivor. Lee AGENTS.md, CONTEXTO_PROYECTO.md, PROMPT_MAESTRO.md, ROADMAP.md y docs/P05-REPORT.md. P05 está preparado con emuladores locales; falta verificar servicios reales. Conserva arquitectura, mecánicas y diseños. No publiques ni subas cambios sin petición concreta.

Repositorio: https://github.com/DETECO/SCPSurvivor, main. Esta actualización incorpora P05-local-01 y RoadmapSCPv0.12 sobre39344e77/alfa0.4 por petición expresa de Iván. La ejecución Firebase sigue emulada. Ver docs/PUBLICACION_GITHUB.md y git log para identificar el commit de esta entrega.

Para recuperar el historial y esta actualización, clona main en una carpeta nueva y crea una rama local antes de editar. No necesitas superponer el ZIP para obtener P05 desde esa rama actualizada. Revisa el diff antes de cualquier commit/push; no uses force ni sustituyas main. El ZIP entregado antes de la subida omite .git y conserva su estado histórico.

```powershell
git clone --branch main https://github.com/DETECO/SCPSurvivor.git SCP-SURVIVOR-GIT
Set-Location SCP-SURVIVOR-GIT
git switch -c desarrollo-local
```

## 9. Errores habituales

- npm.ps1 bloqueado: usar npm.cmd, sin cambiar política de ejecución.
- Java no encontrado/incompatible: instalar Java21, abrir terminal nueva y revisar java -version/JAVA_HOME. La JRE portátil usada en esta auditoría está fuera del ZIP y no es un requisito de ruta.
- Puerto ocupado: cerrar el otro servidor/emulador; no iniciar dos instancias. Ctrl+C detiene cada proceso iniciado desde su terminal.
- Functions no aparece: ejecutar npm.cmd --prefix functions ci --ignore-scripts y revisar la consola del emulador. No intentar desplegar como solución.
- No se verifica correo: el enlace es local; obtenerlo con correo:local y luego Actualizar verificación. No buscar un correo real en Gmail.
- Sin conexión/confirmación pendiente: mantener la partida detenida, abrir emuladores y pulsar Reintentar. No borrar el comando pendiente para continuar por la fuerza.
- Sesión tomada: volver al menú y Reanudar explícitamente. No copiar datos entre UID.
- Chromium ausente: instalarlo con el mismo Python de .venv que ejecuta las pruebas.
- Guardado incompatible: conservar los datos y comunicar schemaVersion/buildVersion. No forzar mezclas o restauraciones parciales.

Iván ya creó scp-survivor y configuró Authentication en la consola. Sus datos públicos están conservados e inactivos; consultar docs/FIREBASE_PROPIO.md. Google/correo reales, backend propio, eliminación de cuentas, despliegue, balance final, dispositivos físicos y costes no quedan comprobados por este entorno local.

