# Contexto de SCP Survivor

Fecha de consolidación: 14 de octubre de 2026, America/Santiago.

## Propósito y alcance

SCP Survivor es un juego web de supervivencia por expediciones y sectores, desarrollado a partir de una copia independiente de una base existente. La meta del plan es una primera versión completa publicada, con servicios propios y aceptación verificada. La entrega actual es **P04-local-01, alfa 0.4**, ejecutable localmente y con arte provisional.

Esta continuidad corresponde exclusivamente al trabajo principal «SCP Survivor». No incorpora decisiones nuevas de las conversaciones separadas de pixel art, web de roadmap o revisión de un prompt maestro. Este documento y PROMPT_MAESTRO.md sintetizan los registros presentes en el repositorio; no certifican la recuperación íntegra de esas conversaciones.

Carpeta de trabajo actual:

`C:\Users\DELL\Documents\Proyectos\SCP-SURVIVOR (destino recomendado; usar la carpeta local realmente abierta)`

## Fuentes y autoridad

1. Las instrucciones actuales de Iván y el alcance que autorice para cada trabajo.
2. RoadmapSCP.json, versión **0.11**, es el registro canónico de decisiones, tareas, pesos, dependencias, autorizaciones y evidencias. RoadmapSCP.md es su vista generada.
3. README.md y docs/P04-REPORT.md describen la alfa 0.4. Los informes previos conservan el historial de sus versiones.
4. AUDITORIA_MIGRACION.md registra las comprobaciones actuales de la migración y sus límites. Consultarlo antes de afirmar el resultado final de navegador, construcción o integración en Windows.
5. ROADMAP.md es una guía de trabajo resumida; CONTEXTO_PROYECTO.md y PROMPT_MAESTRO.md facilitan el relevo. Ninguno reemplaza el registro canónico.

No cambiar la línea base, estados, decisiones o porcentajes canónicos por haber trasladado archivos o escrito documentación. Una decisión posterior expresa puede sustituir una anterior; conservar sus identificadores y trazabilidad.

## Procedencia del consolidado

La base recuperada procede del repositorio propio https://github.com/DETECO/SCPSurvivor, rama main, commit `78abae79ecef81a4de01068479d872877dd7ed00` del 14/10/2026. Sobre ella se integraron el ZIP P04 y el ZIP RoadmapSCP v0.11 entregados por Iván. El resultado local contiene cambios que ese commit de GitHub no acredita por sí solo.

La referencia original y sus avisos están en docs/ORIGIN.md, LICENSE y CREDITS.md. docs/upstream-reference conserva antecedentes archivados; sus instrucciones de despliegue, dominios o servicios no son configuración activa de SCP Survivor.

Durante la migración se restituyó una única línea de js/core/touch.js ausente en main, necesaria para reproducir el compilado entregado. Es una reparación de integridad documentada, no una funcionalidad añadida. El bundle resultante coincide con el P04 de Cloud:

- SHA256 de js/app.min.js: `3a6f562cf5ee38801c796998d6990230d0d450fed1cbf4b2471ebd9c514abec5`.
- Token de index.html: `dd0724d6bd`.

También se adaptaron cinco pruebas de navegador a las rutas de Chromium en Windows. El detalle y la validación de esas adaptaciones corresponden a AUDITORIA_MIGRACION.md. No confundir los resultados históricos de Linux con una nueva ejecución completa en Windows.

## Qué existe en alfa 0.4

| Área | Estado local |
| --- | --- |
| Expedición | Sectores sucesivos, mapas modulares con semilla, preparación, extracción, muerte, resumen y reinicio |
| Soldados | Guardia con Sprint y médico con curación; ambos con velocidad base 165 unidades/s |
| Armas | Pistola, subfusil y escopeta; dos copias equipadas con munición, recarga, mods y niveles independientes |
| Modificaciones | Seis modelos, hasta dos compatibles por copia y sin duplicados |
| Amenazas | Perseguidor, biológico y un jefe Custodio con avisos, refuerzos, victoria y huida |
| Mejoras | Elección inmediata de una mejora por nivel, topes aditivos y cartas parciales |
| Presentación | Canvas adaptable, teclado y táctil, pausa, menú de equipo y editor durante preparación |

La selección de equipo sirve para pruebas locales. No representa propiedad de objetos, desbloqueos por cuenta ni economía implementada. Las referencias de 24 soldados y 24 criaturas no son un catálogo implementado ni contenido comprometido para esta publicación.

No están activos el guardado, las cuentas, el inventario persistente, el reclutamiento adaptado, el ranking ni los servicios de nube. Recargar pierde la partida. La existencia de módulos heredados no demuestra que sus sistemas estén habilitados, adaptados o aceptados.

## Arquitectura que debe conservarse

El juego utiliza **JavaScript, HTML, CSS y Canvas 2D**, sin incorporar un motor o framework nuevo. Los módulos comparten el espacio de nombres global `G`, iniciado por js/core/util.js; el orden explícito de los scripts en dev.html determina sus dependencias.

| Ruta | Función |
| --- | --- |
| dev.html | Entrada de fuentes y listado ordenado de scripts; aquí se modifica el HTML fuente |
| index.html | Entrada generada para el compilado; no editar a mano |
| tools/build.js | Lee los scripts de dev.html y genera index.html y js/app.min.js con Terser |
| js/core/ | Utilidades, entrada, táctil, cámara, sprites y barreras de configuración |
| js/data/field-catalog.js | Modelos y copias de armas, modificaciones y soldados locales |
| js/systems/field-stats.js | Fórmulas, topes y aplicación de estadísticas |
| js/systems/field-abilities.js | Sprint y curación con sus relojes |
| js/systems/field-combat.js | Equipo, recargas, disparo automático y orientación del arma |
| js/systems/field-upgrades.js | Ofertas y aplicación de mejoras |
| js/systems/expedition.js | Director de estados, oleadas, sectores, jefe y resultados |
| js/world/ | Mapas, colisiones y rutas, junto con js/systems/pathing.js |
| js/entities/ | Jugador, enemigos, proyectiles y efectos |
| js/ui/field-loadout.js y js/ui/technical-ui.js | Selección de equipo y flujo local |
| functions/ | Estructura conservada para el servidor propio previsto; sin servicios desplegados |
| tests/ y docs/ | Pruebas y evidencias con identificación de su versión y entorno |

Reutilizar World, Path, Player, EnemyMgr, Projectiles, Combat, Pickups, FX, Sprites y Game. Revisar sus implementaciones y sus consumidores antes de cambiarlos. Mantener separadas las rutas de armas de campo y los ataques heredados donde el código ya las distingue.

El futuro backend aprobado en el plan es **Firebase Auth + Firestore + Firebase Functions propios**, con Firebase Hosting para la publicación futura. Su activación continúa pendiente. El stack Supabase/Expo de otros proyectos de Iván no sustituye esta arquitectura.

## Reglas que no deben perderse

- D-305 fija velocidad base 165. No restaurar la velocidad histórica de 100 o 110.
- D-306 exige una elección inmediatamente por nivel: congela combate y relojes; elegir reanuda sin Listo. La XP sobrante se procesa después, con su bonificación aplicada una sola vez.
- D-214 conserva una elección pendiente si todos los efectos están al máximo y no cabe curación, sin bloquear preparación ni conceder otro nivel antes de resolverla.
- La preparación ordinaria dura 20 s. Editar mods no detiene esa cuenta atrás; cambios sin confirmar se descartan al cambiar de fase.
- Dos armas son copias físicas distintas, aunque compartan modelo. Cambiar capacidad no rellena munición; cambiar duración conserva la fracción de recarga.
- La perforación no atraviesa paredes. La orientación visual del arma no permite crear balas al otro lado de un obstáculo.
- Escapar de un jefe permite continuar, pero no concede victoria ni su recompensa. Los resultados no se duplican.
- La expedición normal tiene pendiente GAP-001: aún usa tres oleadas fijas, frente al sorteo equiprobable aprobado de 3, 4 o 5.

## Seguridad, autorizaciones y verificación

js/core/firebase-config.js mantiene PREPARATION_MODE y LOCAL_TECHNICAL_MODE en true; ENABLE_CLOUD, ENABLE_MULTIPLAYER, ENABLE_SOCIAL y ENABLE_SIGNUPS en false; FIREBASE_CONFIG, SIGNUPS_URL y TURN_URL en null. La entrada local aplica una CSP que bloquea conexiones y workers. Conservar estas barreras mientras no se autorice una fase que las sustituya con configuración propia y pruebas.

Leer el código existente y aplicar cambios acotados al objetivo autorizado. No rediseñar, reconstruir el juego ni ampliar el catálogo como parte de una corrección. No introducir credenciales, activar facturación, desplegar, publicar, crear commits o escribir en GitHub sin autorización concreta. No instalar dependencias de functions/ por seguir instrucciones históricas.

La aprobación histórica del plan no autoriza ejecutar todas sus fases. La migración y su verificación local tampoco autorizan P05 ni cambios de jugabilidad pendientes. Respetar las autorizaciones ya dadas y evitar pedirlas de nuevo para el mismo alcance.

Las pruebas Node de la migración ejecutaron los 13 archivos .test.js con 39 resultados aprobados y cero fallos; el log está en docs/migracion/evidencias/node-tests.txt. p02-weapon.test.js delega en p04-weapons.test.js, de modo que esa batería se ejecuta dos veces. Esto no acredita por sí solo funcionamiento completo en navegador, Safari, teléfonos físicos, FPS, memoria, costes o producción.

## Punto de relevo

El progreso canónico sigue en **49/100**: planificación 10/10 y ejecución técnica 39/90, equivalente a 43,33 %. P03 está en 9/12, 75 %, porque P03-T02 no está cerrada. No sumar avance por la migración.

Siguiente orden: consultar la auditoría actual; obtener autorización concreta para cerrar GAP-001 y probar los tres tamaños de oleada; después preparar el alcance de P05 conforme al servidor Firebase Functions propio aprobado. P05 permanece pendiente de implementación y configuración autorizadas. No activar servicios al preparar ese plan.
