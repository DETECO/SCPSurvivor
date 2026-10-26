# Pauta MENUS

**Responsabilidad:** conservar las decisiones visuales aprobadas y los requisitos de comportamiento para las pruebas del menú de SCP Survivor. Esta pauta registra propuestas, aprobaciones y dependencias; para implementación vigente, remite al informe de PROGRAMACION.

## Resumen vigente

Estilo aprobado para las pruebas: sala de contención industrial pixel art; paneles verde oscuro y carbón, texto marfil, apoyos verde salvia y acentos ámbar; Guardia como personaje destacado y botones de acción grandes. Se aceptan tres formatos: móvil vertical, móvil horizontal y PC.

La selección de personaje muestra Guardia y Médico. La pantalla «Armas aprobadas» muestra únicamente los nueve diseños aprobados y F24 de ARM-VIS-001/R1 como vistas previas. No ofrece acciones de equipamiento, estadísticas ni efectos de combate; reemplaza las cuatro tarjetas antiguas de ensayo en esta pantalla sin convertirlas en parte del catálogo visual aprobado. MEN-004 r1 está preparado localmente para revisión; su ficha no ha sido aprobada.

Para el HUD horizontal, Iván aprobó **MEN-005-A r1 — HUD anclado a las esquinas** como dirección visual provisional para pruebas el 25/10/2026. MEN-005-B y MEN-005-C siguen sin aprobación. La decisión no confirma implementación ni cambia reglas de juego.

**Comportamiento móvil requerido (23/10/2026):** el menú debe sentirse como una pantalla del juego, ocupar una sola vista, adaptar el contenido al alto y ancho del teléfono y evitar zoom, desplazamiento de página y recortes. Este requisito corrige la interacción de las pantallas aprobadas y no reemplaza sus propuestas visuales.

## Decisiones y requisitos registrados

### MEN-001 r1 — Menú inicial responsivo

- **Estado y alcance:** aprobado para pruebas en tres formatos.
- **Fecha de aprobación:** 22/10/2026, confirmada por el informe de PROGRAMACION.
- **Cita de Iván:** «ACEPTADO EL ESTILO. PARA LAS PRUEBAS.»
- **Decisión exacta:** se acepta el estilo del menú inicial propuesto, con una versión para móvil vertical, otra para móvil horizontal y otra para PC.
- **Recursos elegidos:** [móvil vertical](../design-proposals/menus/aprobados-20261022/01-menu-movil-vertical.png), [móvil horizontal](../design-proposals/menus/aprobados-20261022/02-menu-movil-horizontal.png) y [PC](../design-proposals/menus/aprobados-20261022/03-menu-pc.png). Prompts en [MEN-001](../design-proposals/menus/aprobados-20261022/PROMPTS-MEN-001.md).
- **Dependencias:** ESTRUCTURA gobierna las reglas de inicio y equipamiento; PROGRAMACION enlaza el informe de integración actual. Las tres imágenes definen presentación para pruebas, no cambian reglas.

### MEN-002 r1 — Selección de personaje y arma

- **Estado y alcance:** aprobados para pruebas, con seis pantallas: dos selectores por tres formatos.
- **Fecha de aprobación:** 22/10/2026, según la trazabilidad de MENUS en el informe de PROGRAMACION.
- **Cita de Iván:** «aceptados estos menus».
- **Decisión exacta:** se aceptan los menús propuestos para escoger soldado y luego arma, en móvil vertical, móvil horizontal y PC, siguiendo el estilo de MEN-001 r1.
- **Recursos elegidos:** personaje [móvil vertical](../design-proposals/menus/aprobados-20261022/01-personaje-movil-vertical.png), [móvil horizontal](../design-proposals/menus/aprobados-20261022/02-personaje-movil-horizontal.png), [PC](../design-proposals/menus/aprobados-20261022/03-personaje-pc.png); arma [móvil vertical](../design-proposals/menus/aprobados-20261022/04-arma-movil-vertical.png), [móvil horizontal](../design-proposals/menus/aprobados-20261022/05-arma-movil-horizontal.png), [PC](../design-proposals/menus/aprobados-20261022/06-arma-pc.png). Prompts en [MEN-002](../design-proposals/menus/aprobados-20261022/PROMPTS-MEN-002.md).
- **Dependencias:** PERSONAJES aporta Guardia y Médico aprobados; ARMAS delimita el catálogo que se muestra; ESTRUCTURA rige el equipo inicial y la obtención de la segunda arma; PROGRAMACION es la fuente para la integración vigente.

### MEN-003 r1 — Menú móvil en una sola vista

- **Estado y alcance:** requisito de interacción solicitado directamente el 23/10/2026; no es una nueva aprobación de arte ni altera MEN-001 r1 o MEN-002 r1.
- **Decisión exacta:** en móvil, el menú debe ocupar una sola vista y adaptarse al teléfono sin zoom, desplazamiento como página ni contenido recortado.
- **Cita de Iván:** «el menu en movil, parece que fuera solo una carcasa, una pagina de un landing page, puedo hacer zoom, deslizar el menu como una web, pero no deberia funcionar asi. soluciona este problema.»
- **Recursos de referencia:** capturas adjuntas a la solicitud del 23/10/2026; se mantienen los diseños aprobados de MEN-001 r1 y MEN-002 r1.
- **Dependencias:** PROGRAMACION debe actualizar la evidencia de integración al consolidar este ajuste; se enlaza [Presentación integrada 0.33](PRESENTACION_INTEGRADA.md) sin duplicar aquí su estado ni resultados. No requiere consolidación en ESTRUCTURA porque no cambia reglas de juego.
- **Registro local para revisión (23/10/2026):** cambio conservado en `dev.html` (viewport móvil), `css/operations-menu.css` (menú ajustado a una vista y bloqueo de gestos de zoom/desplazamiento), `index.html` (salida generada), `tests/v2-mobile-menu-shell.test.js` (regresión) y esta pauta. Verificaciones: `node --test tests/v2-mobile-menu-shell.test.js tests/v2-operations-menu.test.js` — 5 pruebas aprobadas; `node tools/build.js --local --check` — 102 scripts válidos; `npm run build:check` — compilación local aprobada (Firebase SDK 227131 bytes; bundle de 102 scripts, 1933 KB). El cambio queda local para revisión; integración, evidencia consolidada y publicación corresponden a PROGRAMACION. No se realizó prueba manual en teléfono físico.

### MEN-005-A r1 — HUD anclado a las esquinas

- **Estado y alcance:** aprobada como dirección visual provisional para pruebas; no acredita implementación, integración ni publicación.
- **Fecha de aprobación:** 25/10/2026.
- **Cita de Iván:** «Apruebo la opción 1 por ahora .»
- **Decisión exacta:** elegir la opción 1 del paquete MEN-005 r1, identificada como MEN-005-A r1 — HUD anclado a las esquinas. La selección se limita a esa revisión; MEN-005-B r1 y MEN-005-C r1 permanecen propuestas no aprobadas.
- **Recurso elegido:** [MEN-005-A r1 — lámina HUD anclado a las esquinas](../design-proposals/menus/propuestas-20261024/01-hud-esquinas.png), descrita en [la ficha MEN-005 r1](superpowers/specs/2026-10-24-men-005-hud-in-game-design.md).
- **Dependencias:** PROGRAMACION debe evaluar la adaptación al HUD vigente y conservar allí la evidencia de implementación y pruebas; consultar [INC-VIS-001](gestion/INC-VIS-001.md), [su informe de PROGRAMACION](gestion/informes/INC-VIS-001-programacion.md) y el [registro de implementación](gestion/REGISTRO_IMPLEMENTACION.md). ESTRUCTURA define reglas de mejoras si se les asigna contenido real; la lámina mantiene sus categorías como rótulos visuales. ARMAS conserva el catálogo y las mecánicas aprobadas; esta decisión no los modifica.

## Cambio local en revisión

### MEN-004 r1 — Galería de ARM-VIS-001/R1

- **Estado y alcance:** Iván rechazó la ficha original y corrigió el alcance el 23/10/2026. La galería está implementada localmente para revisión; esta ficha y la mecánica de armas no están aprobadas.
- **Cita de Iván:** «no, quiero que dejes las armas aprobadas + f24, las demas no,».
- **Decisión exacta:** mostrar solo los nueve diseños aprobados y F24 de ARM-VIS-001/R1; excluir del menú los demás objetos de ensayo. Presentarlos como vistas previas visuales, sin equiparlos ni asignarles estadísticas o efectos.
- **Recurso elegido:** [catálogo aprobado ARM-VIS-001/R1](PAUTA_ARMAS.md) y [catálogo de vistas previas MENUS](../assets/menus/approved-weapons-arm-vis-r1/catalog.json), con veinte miniaturas 16/32 px copiadas desde las imágenes aprobadas. La copia se cotejó contra los PNG fuente.
- **Dependencias:** ARMAS es la fuente del alcance y de los recursos; su pauta no se modificó. PROGRAMACION integra y publica el cambio y mantiene la evidencia en [Presentación integrada](PRESENTACION_INTEGRADA.md). No requiere consolidación en ESTRUCTURA porque no cambia reglas del juego.
- **Registro local para revisión (23/10/2026):** archivos de interfaz `js/ui/operations-menu.js`, `css/operations-menu.css`, `dev.html` y salidas `index.html`/`js/app.min.js`; recursos `assets/menus/approved-weapons-arm-vis-r1/catalog.json` y sus veinte PNG; documentación `docs/superpowers/specs/2026-10-23-men-004-armas-aprobadas-menu-design.md` y esta pauta; pruebas `tests/v2-operations-menu.test.js` y `tests/v2-presentation-browser.py`. Las pruebas Node combinadas con MEN-003 pasan 6 casos y `node tools/build.js --local --check` valida 102 scripts. La vista local confirmó las diez tarjetas, sin controles ni funciones de selección de las armas del ensayo. La automatización de navegador no se ejecutó porque falta el módulo Python Playwright; la comprobación visual se hizo en escritorio, no en teléfono físico. `npm run build:check` quedó bloqueado por el sandbox al intentar leer el directorio ancestro durante la comprobación de Firebase. Integración y publicación siguen pendientes de PROGRAMACION.

## Dependencias y compatibilidad

- **PROGRAMACION — implementación:** consultar [Presentación integrada 0.33](PRESENTACION_INTEGRADA.md). Allí están conectados el menú inicial, las selecciones de soldado y arma, los formatos y sus verificaciones. Esta pauta no replica su estado ni sus métricas.
- **PERSONAJES:** consultar [aprobación de diseños](PERSONAJES_APROBACION_2026-10-22.md). MEN-002 usa únicamente Guardia y Médico como opciones seleccionables en estas pantallas.
- **ARMAS:** consultar [Pauta de armas](PAUTA_ARMAS.md). MEN-004 muestra la lista `selected` de ARM-VIS-001/R1 (nueve diseños y F24) únicamente como galería visual; cualquier cambio de alcance debe venir de ARMAS.
- **ESTRUCTURA — regla relacionada:** el corte aprobado vigente [0.29](ESTRUCTURA_REGLAS_APROBADAS.md) establece una arma inicial y la posibilidad de obtener una segunda por recompensa, hasta dos balísticas simultáneas. Por ello, el selector de una arma inicial en MEN-002 r1 es coherente con el ensayo actual; no requiere consolidación de reglas. Cualquier cambio futuro en el número de armas iniciales o en su obtención debe pasar por ESTRUCTURA antes de modificar esta pauta.

## Historial de propuestas

- **MEN-001 r0 — concepto único de PC:** propuesta previa a la solicitud de tres formatos; no aprobada. Se conserva en [historial](../design-proposals/menus/aprobados-20261022/historial/MEN-001-r0-menu-inicial-pc-no-aprobado.png). MEN-001 r1 la reemplaza como propuesta vigente.
- **MEN-002 — exploración horizontal descartada antes de r1:** una generación confundió el selector de soldado con el de armas. No fue presentada ni aprobada como selector de soldado; se conserva identificada en [historial](../design-proposals/menus/aprobados-20261022/historial/MEN-002-exploracion-personaje-horizontal-descartada.png). La imagen aprobada es el archivo `02-personaje-movil-horizontal.png`.
- **MEN-005 r1 — estado antes de la decisión:** las opciones A/B/C quedaron pendientes de elección tras su presentación el 24/10/2026. El 25/10/2026 se aprobó únicamente MEN-005-A r1; las láminas B y C se conservan en la [ficha completa](superpowers/specs/2026-10-24-men-005-hud-in-game-design.md) como propuestas no aprobadas.

Las aprobaciones cubren únicamente las revisiones y archivos citados arriba. Todo rediseño posterior requiere su propia decisión. Los PNG aprobados se copiaron al área SCP-SURVIVOR y se cotejaron con SHA-256; dimensiones y huellas constan en [VERIFICACION.json](../design-proposals/menus/aprobados-20261022/VERIFICACION.json).
