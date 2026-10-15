# Instalación en Windows — SCP Survivor alfa 0.4

## Qué contiene esta entrega

Proyecto existente completo consolidado: main de DETECO/SCPSurvivor, actualización P04/alfa 0.4 y RoadmapSCP 0.11. Conserva las carpetas del juego; no necesita un proyecto vacío ni una reconstrucción.

## 1. Software y versiones

- Windows de 64 bits; esta migración se probó en Windows con Chromium. No se establece un mínimo de RAM/CPU validado: no se hicieron benchmarks de hardware.
- Python 3.12.x para el servidor HTTP y las pruebas; se verificó Python 3.12 en este equipo. Instalar desde [python.org](https://www.python.org/downloads/windows/) con el lanzador `py`.
- Navegador actual Chrome o Edge para jugar. Las pruebas automatizadas usan el Chromium que instala Playwright.
- Node.js 24 LTS con npm, solo si vas a compilar o ejecutar tests JavaScript. Se verificó Node 24.12.0/npm 11.6.2. Cloud registraba 24.19.0/11.9.0; no es una versión mínima declarada. [Node 24 figura como LTS](https://nodejs.org/en/about/previous-releases). Terser queda fijado a 5.51.2 por package-lock.json.
- Git for Windows, opcional para conservar historial/sincronizar: [git-scm.com](https://git-scm.com/download/win). Versión comprobada: 2.51.0.windows.1.
- La aplicación de escritorio con Codex Local que ya utilizas. El juego no requiere claves de OpenAI.

No instalar Node 20 para este frontend por el `engines` de functions/package.json: ese archivo corresponde a un servidor futuro e inactivo.

## 2. Descomprimir

Guarda el ZIP final en Descargas. En PowerShell:

```powershell
$scpZip = Join-Path $env:USERPROFILE 'Downloads\SCP-SURVIVOR-CODEX-LOCAL.zip'
$scpBase = Join-Path $env:USERPROFILE 'Documents\Proyectos'
$scpProyecto = Join-Path $scpBase 'SCP-SURVIVOR'
if (Test-Path -LiteralPath $scpProyecto) { throw 'La carpeta ya existe. Elige otro destino para conservarla.' }
New-Item -ItemType Directory -Path $scpBase -Force | Out-Null
Expand-Archive -LiteralPath $scpZip -DestinationPath $scpBase
Set-Location -LiteralPath $scpProyecto
Get-ChildItem -Force
```

Si guardaste el ZIP en otra carpeta, cambia únicamente `$scpZip`. No superpongas este ZIP completo sobre una versión anterior.

## 3. Iniciar el juego, sin instalar dependencias

Desde SCP-SURVIVOR:

```powershell
py -3.12 -m http.server 8000 --bind 127.0.0.1
```

Deja esa terminal abierta y visita [http://127.0.0.1:8000/](http://127.0.0.1:8000/). Debe verse ALFA 0.4. El compilado ya viene incluido. Para cerrar, Ctrl+C en la terminal.

La entrada de fuentes es [http://127.0.0.1:8000/dev.html](http://127.0.0.1:8000/dev.html). Evita abrir los HTML con doble clic. La entrada compilada es la recomendada para jugar.

## 4. Variables y bases de datos

Esta alfa no exige variables de entorno ni base de datos. `.env.example` documenta esa situación; el frontend no carga `.env`. No necesitas copiarlo a `.env`.

js/core/firebase-config.js conserva Firebase/URLs en null y nube, registros, social y multijugador deshabilitados. Las reglas Firestore/RTDB permanecen cerradas; functions/index.js no tiene handlers. No se migró ninguna base de datos porque no existe un servicio activo de esta alfa en las fuentes recuperadas. Tampoco se exportaron guardados del navegador: esta entrega pierde la partida al recargar.

La configuración propia de cuentas, guardado y continuidad se realizará en P05 con su autorización. No activar Firebase, Functions, TURN, hosting ni facturación para abrir el juego local.

## 5. Dependencias y compilación

Para desarrollar las fuentes:

```powershell
node --version
npm.cmd --version
npm.cmd ci --ignore-scripts
npm.cmd run build:check
npm.cmd run build
```

Editar dev.html, CSS y los módulos fuente; no editar index.html ni js/app.min.js a mano. El build actual genera token `dd0724d6bd` y reproduce exactamente el compilado Cloud. Después de cambios autorizados será normal que cambie el token.

Comprobación opcional de esta entrega antes de modificarla:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath '.\js\app.min.js'
```

Hash esperado: `3a6f562cf5ee38801c796998d6990230d0d450fed1cbf4b2471ebd9c514abec5`.

No ejecutar `npm install` dentro de functions/ para este paso. Su Node 20 y dependencias de servidor son referencias pendientes, no requisitos actuales.

## 6. Pruebas

JavaScript, sin dependencias extra para los tests:

```powershell
$scpTests = Get-ChildItem -LiteralPath '.\tests' -Filter '*.test.js' | Sort-Object Name | ForEach-Object { $_.FullName }
node --test --test-reporter=tap $scpTests
```

La migración registró 13 archivos, 39 resultados, cero fallos. La batería de armas se ejecuta también mediante el alias p02-weapon; el conteo no equivale a 39 mecánicas únicas.

Para navegador, crear un entorno de pruebas independiente, sin activar scripts de PowerShell:

```powershell
py -3.12 -m venv .venv
& '.\.venv\Scripts\python.exe' -m pip install -r '.\requirements-tests-windows.txt'
& '.\.venv\Scripts\python.exe' -m playwright install chromium
& '.\.venv\Scripts\python.exe' '.\tests\p04-browser.py'
& '.\.venv\Scripts\python.exe' '.\tests\p03-levels.py'
& '.\.venv\Scripts\python.exe' '.\tests\p03-browser.py'
```

Cada prueba abre su propio servidor local; no necesita la terminal del paso 3. Sus resultados aparecen en tests/artifacts. Los tests P01 documentan una escena antigua y no se usaron como aceptación de alfa 0.4. No modificar el juego para satisfacer requisitos obsoletos.

Se adaptaron rutas Linux de Chromium y la cola del servidor de pruebas para Windows, manteniendo las aserciones. El detalle exacto está en docs/migracion/CAMBIOS_MIGRACION.diff.

## 7. Abrir en Codex Local

En la aplicación, agrega o selecciona un proyecto local asociado a la carpeta `C:\Users\DELL\Documents\Proyectos\SCP-SURVIVOR` (o tu destino elegido). Abre una conversación que trabaje en ese directorio. No selecciones solamente el proyecto ChatGPT «SCP» como sustituto de conectar la carpeta local.

Las guías oficiales explican [proyectos y carpetas locales](https://learn.chatgpt.com/docs/projects) y la [aplicación de Windows](https://learn.chatgpt.com/docs/windows/windows-app). Las conversaciones y el acceso a archivos son cosas distintas; este paquete transfiere los archivos y el contexto duradero.

Primer mensaje sugerido:

> Continúa este SCP Survivor existente. Lee AGENTS.md, CONTEXTO_PROYECTO.md, PROMPT_MAESTRO.md, ROADMAP.md y AUDITORIA_MIGRACION.md. Estamos en alfa 0.4 con roadmap 0.11. Confirma el estado y propón el alcance de la próxima tarea, sin cambiar mecánicas, diseños, servicios ni GitHub todavía.

Si ya tienes instalado Codex CLI, también puedes ejecutar `codex` desde la carpeta del proyecto. No es necesario instalar la CLI para usar la aplicación.

## 8. GitHub e historial

Repositorio: https://github.com/DETECO/SCPSurvivor ; rama main. Base exportada: `78abae79ecef81a4de01068479d872877dd7ed00`, del 14/10/2026 a las 08:23:27 de Chile. En la auditoría no había otras ramas ni PR. El remoto contiene alfa 0.3; alfa 0.4 y roadmap 0.11 se incorporaron desde los ZIP, sin subida remota.

El ZIP final omite .git. Para trabajar con historial, clona en una segunda carpeta y aplica esta copia sobre una rama local; conserva ambos directorios hasta revisar los cambios:

```powershell
Set-Location -LiteralPath $scpBase
git clone --branch main https://github.com/DETECO/SCPSurvivor.git SCP-SURVIVOR-GIT
Set-Location -LiteralPath (Join-Path $scpBase 'SCP-SURVIVOR-GIT')
git switch -c migracion-local-20261014 78abae79ecef81a4de01068479d872877dd7ed00
robocopy $scpProyecto (Get-Location).Path /E /XD .git node_modules .venv __pycache__ /XF '*.pyc'
if ($LASTEXITCODE -ge 8) { throw 'Revisar los errores de copia antes de continuar.' }
git status --short
git diff --stat
```

Este procedimiento es una guía, no se ejecutó sobre tus ramas. No copiar carpetas con credenciales ni usar /MIR, reset --hard o force push. Revisar e integrar los cambios antes de autorizar commits/push.

Para observar novedades sin alterar archivos:

```powershell
git fetch origin
git log --oneline --left-right HEAD...origin/main
git diff --stat HEAD origin/main
```

No hacer un pull automático sobre la copia con avances locales. Cuando autorices la integración, crear el commit local y publicar una rama para revisión; no sobrescribir main. El historial original permanece disponible en GitHub.

## 9. Problemas habituales

| Error | Acción concreta |
|---|---|
| `py` no se reconoce | Instalar Python con su lanzador y abrir una terminal nueva; si `python --version` muestra 3.12, puede usarse `python` en su lugar. |
| `npm.ps1` bloqueado | Usar `npm.cmd`, como en estos comandos. No requiere cambiar ExecutionPolicy. |
| Puerto 8000 ocupado | Iniciar `py -3.12 -m http.server 8001 --bind 127.0.0.1` y abrir el puerto 8001. |
| Chromium de pruebas no existe | Ejecutar el comando `python.exe -m playwright install chromium` del entorno .venv. |
| Archivo de script o CSS no encontrado | Confirmar que index.html, js/, css/ y assets/ están en la misma raíz; no aplanar el ZIP. |
| Errores de conexión al cargar muchos scripts en pruebas | Los tests de este paquete usan request_queue_size=128. Confirmar que se está ejecutando esta copia y no los tests antiguos. |
| Falta Terser o falla build | Ejecutar npm.cmd ci --ignore-scripts en la raíz que contiene package-lock.json. No regenerar el lock como primera solución. |
| Aparece alfa 0.3 | Se abrió la copia antigua de GitHub; iniciar el servidor desde esta carpeta y comprobar la URL/puerto. |
| Se pierde la partida al recargar | Es la limitación actual del producto; el guardado pertenece a P05, no un error de instalación. |

Safari y teléfonos físicos, rendimiento sostenido, equilibrio y servicios reales siguen sin validarse en esta migración.
