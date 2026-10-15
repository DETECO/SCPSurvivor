# Auditoría de migración — SCP Survivor

Fecha: 14/10/2026, America/Santiago. Resultado: copia consolidada de alfa 0.4/P04-local-01, con RoadmapSCP 0.11 y continuidad para Windows. No se creó otro videojuego ni se modificó el original en Cloud o GitHub.

## Alcance y recuperación

La petición posterior de Iván limitó la operación a «SCP Survivor». Se omitieron las sesiones independientes de pixel art, Roadmap y revisión de prompt. Se leyó la sesión principal mediante las herramientas de chats, incluidos sus 20 turnos recientes y los entregables finales de P01–P04/roadmap; no se exportó una transcripción íntegra ni se accedió al disco Cloud como si fuera una carpeta local.

| Fuente | Resultado |
|---|---|
| Espejo local del proyecto ChatGPT SCP | Solo AGENTS.md y sources vacío; no contenía el juego |
| Repositorio DETECO/SCPSurvivor/main | 186 archivos recuperados del commit 78abae79ecef81a4de01068479d872877dd7ed00 |
| ZIP P04 aportado por Iván | 49 entradas válidas; incluye P04 y correcciones 0.3.1/0.3.2 |
| ZIP RoadmapSCP v0.11 aportado por Iván | JSON canónico y vista Markdown actualizados |
| Consolidación de las tres fuentes | 212 archivos originales conservados; 26 nuevos respecto de main y 25 rutas superpuestas desde los ZIP |

Ambos ZIP pasaron comprobación CRC, duplicados de nombre y seguridad de rutas antes de extraerse. Los hashes de entradas y procedencia se conservan en docs/migracion/PROCEDENCIA.json y ARCHIVOS_INCORPORADOS.json. Los ZIP de entrada quedaron intactos. No se eliminaron archivos de la base ni se aplanaron carpetas.

El repositorio es público, rama principal main. En la lectura remota no se localizaron otras ramas ni PR. El commit recuperado es del 14/10/2026 a las 08:23:27 de Chile y contiene alfa 0.3. La alfa 0.4 y Roadmap v0.11 provienen de los ZIP posteriores; no están sincronizados con ese main. No se hicieron commits, pushes, publicaciones ni cambios de ramas.

## Tecnología y dependencias

HTML/CSS/JavaScript, Canvas 2D y módulos globales G. dev.html carga 77 scripts en orden; index.html usa js/app.min.js. Node/Terser sirven para construir; el juego compilado solo necesita un servidor HTTP y navegador.

- Terser 5.51.2 exacto; package.json y package-lock.json coherentes. npm ci --ignore-scripts instaló 11 paquetes de herramientas.
- Node verificado 24.12.0, npm 11.6.2, Python 3.12.10.
- Playwright 1.64.0, Chromium 156.0.8078.4 de Playwright, Windows.
- functions/ conserva Node 20 y dependencias Firebase Admin/Functions para una fase futura. index.js exporta un objeto vacío. No se instalaron ni activaron esas dependencias.

No hay base de datos operativa que exportar en esta alfa, ni variables de aplicación requeridas. .env.example explica que el frontend no lee .env. Firebase/TURN/signups están en null; cloud/multiplayer/social/signups false; CSP bloquea conexiones/workers y no se registra service worker.

## Cambios indispensables de migración

El diff completo de los siete archivos existentes modificados está en docs/migracion/CAMBIOS_MIGRACION.diff.

1. **js/core/touch.js:** restaurada una condición ya presente en los bundles Cloud P03/P04, pero omitida de la fuente subida a main y ausente de ambos ZIP de actualización. En modo técnico el joystick aplica fuerza completa tras la zona muerta. La ausencia hacía que fuente y compilado se comportaran distinto. Restituir esa única línea reproduce el compilado Cloud byte a byte: no se añadió una mecánica nueva.
2. **Cinco tests de navegador:** eliminada la ruta Linux fija /usr/bin/chromium o su fallback; se usa el Chromium de Playwright/búsqueda existente. Ajustada la etiqueta descriptiva del test histórico P01.
3. **Seis tests de navegador:** request_queue_size=128 antes de crear su servidor HTTP. La cola predeterminada de cinco conexiones provocaba rechazos intermitentes en Windows al cargar los scripts. Se diagnosticaron URLs locales concretas con ERR_CONNECTION_REFUSED; la mayor cola resolvió los recorridos manteniendo sus aserciones.
4. **Archivos añadidos:** documentos de continuidad, inventario/hashes, requisitos de herramientas de pruebas, .env.example y .gitignore local. Este .gitignore es nuevo, no una recuperación certificada del archivo histórico ausente.

No se cambió el contenido del compilado final: index.html y js/app.min.js coinciden exactamente con el ZIP P04. Se conservaron mecánicas, recursos, estilos, licencias y las dos fuentes canónicas del roadmap.

## Verificación nueva en Windows

| Comprobación | Resultado real |
|---|---|
| npm ci --ignore-scripts | Correcta, dependencias declaradas |
| npm run build:check | Correcta, 77 scripts/sintaxis válida |
| npm run build | Correcta; token dd0724d6bd y binarios exactos al P04 original |
| JavaScript, 13 archivos .test.js | 39 resultados aprobados, cero fallos |
| P04 navegador | 4 escenarios PASS: fuente/compilado × escritorio/táctil emulado |
| P03 navegador/integración | 4 escenarios PASS y 2 expediciones completas, ambas hasta extracción en sector 10; una huye del jefe y otra lo vence |
| Niveles | 2 escenarios PASS, fuente y compilado |
| Recursos de las entradas | Todas las referencias locales presentes |
| Secretos | Búsqueda estática por patrones sin coincidencias de claves privadas/tokens en las fuentes; no es una garantía absoluta |
| Original upstream local | Checkout sin cambios respecto del commit descargado |

Las cuatro rutas P04 y cuatro P03 finales registran cero errores de consola, cero solicitudes remotas y cero respuestas HTTP fallidas. Los niveles comprueban una elección inmediata por nivel, XP sobrante y repetición de entradas. p02-weapon delega en p04-weapons, por lo que parte de la batería Node se ejecuta dos veces; 39 resultados no significa 39 sistemas independientes.

Los logs y JSON finales están en docs/migracion/evidencias/. Se incluyen tres capturas representativas si fueron generadas. Los informes docs/P01–P04 anteriores siguen siendo evidencia histórica, principalmente Chromium/Linux; sus hashes/entorno no se presentan como los de esta auditoría. Los fallos iniciales se diagnosticaron y corrigieron como se describe arriba; no se ocultaron cambiando las aserciones.

SHA256 del bundle final:

3a6f562cf5ee38801c796998d6990230d0d450fed1cbf4b2471ebd9c514abec5

SHA256 de index.html final:

8de13a0eba94cb4bad835c435ae35b9fd0fe2810539a41d28877928a9feaafe5

## Estado del producto y faltantes

Se conserva 49/100 global, 39/90 técnico (43,33%) y P03 75%. La migración no suma progreso de desarrollo.

- GAP-001/P03-T02: tres oleadas fijas; falta el sorteo equiprobable de 3/4/5 y su integración.
- Cuentas, guardado, continuidad entre dispositivos, inventario persistente, economía adaptada y ranking siguen pendientes. La partida se pierde al recargar.
- Recursos actuales: cinco actores provisionales con diez SVG, fuente con licencia, escenarios/armas/FX programáticos y capturas. No se recuperaron catálogos finales 24+24, tres bosses ni icono definitivo. Las otras sesiones quedaron excluidas por decisión de Iván.
- El manifiesto histórico docs/source-manifest.json menciona cuatro archivos ausentes de las fuentes: .gitignore, .nojekyll, docs/upstream-reference/.firebaserc.txt y docs/upstream-reference/.github/FUNDING.yml.txt. El primero se sustituyó por una nueva regla local documentada; los demás no se inventaron. Tampoco existe .firebaserc activo en raíz. No son necesarios para ejecutar la alfa aislada; importan si se retoma procedencia/hosting.
- No se exportó una base de datos, guardados personales del navegador ni secretos de servicios. No se dio por recuperado un directorio auxiliar Cloud inaccesible.
- Safari, iPhone/Infinix físicos, FPS sostenidos, memoria, balance, carga/costes de servidores y producción no se probaron.

Las rutas /workspace presentes en RoadmapSCP y documentos son antecedentes del entorno Cloud. El build y los tests calculan la raíz a partir de sus archivos y no necesitan ese directorio. No se reescribieron los registros canónicos solo para sustituir sus rutas históricas. .env.example no habilita servicios.

## Exportación y continuidad

SCP-SURVIVOR-CODEX-LOCAL.zip incluye una carpeta SCP-SURVIVOR con el código completo, assets, configuraciones, licencias, pruebas, herramientas y documentación. Se excluyen .git, node_modules, entornos Python, navegadores descargados, cachés y artefactos temporales. Las evidencias seleccionadas están incluidas expresamente.

INVENTARIO_PROYECTO.csv lista el contenido exportado. docs/migracion/MANIFIESTO_SHA256.json registra hashes de todos los archivos salvo el propio manifiesto; VERIFICACION_INTEGRIDAD.json registra la comprobación de fuentes/entradas. El ZIP se valida por CRC y comparación de cada archivo con el manifiesto antes de entregarlo; su SHA256 se entrega en el archivo contiguo .sha256.

Abrir INSTALACION_WINDOWS.md. Extraer en una carpeta nueva, arrancar el servidor HTTP y asociar esa carpeta a Codex Local. CONTEXTO_PROYECTO.md, PROMPT_MAESTRO.md y RoadmapSCP mantienen el contexto. La guía incluye cómo clonar el historial de GitHub y revisar los avances locales sin sobrescribir main.
