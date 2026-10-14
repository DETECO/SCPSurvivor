# P03-local-01 — expedición y escenarios (alfa 0.3)

14 de octubre de 2026, America/Santiago. Copia independiente en SCP Survivor, sin rama Git local. Referencia de origen: main, commit `a1006e6e3d0cea9162238a90b0ffdd7fd38397b6`; control final del original sin modificaciones.

## Comportamiento entregado

La expedición continúa por sectores sin un límite artificial de dos mapas. Hay salas, corredores de cuatro casillas, intersecciones y zonas opcionales, generados con semillas reproducibles. Las salas de combate tienen al menos 12×12 casillas; los mapas y sus salidas se validan para cuerpos de radio 22.

Cada sector normal tiene tres oleadas: neutralización, resistencia de 60 segundos y neutralización. En resistencia se detiene la aparición al cumplirse el tiempo y hay que derrotar los enemigos restantes. Se aplica una sola vez el escalado aprobado por sector/oleada, con aumento de velocidad limitado al 20 %. La primera oleada conserva 12 perseguidores; después se combinan aproximadamente 75 % perseguidores y 25 % biológicos. Continúa automáticamente tras la última mejora elegida; sin mejoras pendientes conserva el descanso de 20 segundos y Listo para saltarlo.

El biológico dispara en una dirección fijada tras un aviso de 0,6 segundos, solo desde una posición visible y con línea libre. Sus proyectiles de 190 unidades/s no siguen al jugador y chocan con cobertura. Ambos enemigos normales carecen de daño por contacto.

El Custodio utiliza el modelo inicial inspirado en SCP-049: golpe de área avisado, refuerzos limitados y mayor movilidad por debajo de media vida. Aparece por primera vez entre los sectores 4 y 6; después hay de tres a cinco sectores normales entre encuentros. Su salida está accesible desde el inicio. Huir requiere dos segundos quieto y se cancela por movimiento o daño; conserva la expedición y registra evasión, sin victoria. Vencer concede 220 XP temporal base, multiplicada una sola vez por Aprendizaje. Los refuerzos vivos restantes se retiran sin bajas ni botín.

Desde el sector normal 3 hay un 25 % de probabilidad de extracción por mapa elegible, garantizada en el cuarto elegible seguido sin extracción. Se anuncia al entrar, se habilita al despejar y se puede ignorar. Continuar y extraer son acciones separadas; extraer requiere confirmar y permanecer quieto tres segundos. El resultado se resuelve una vez.

Se mantienen velocidad base 165, Sprint, pantalla adaptable, controles, pausa, cámara y combate de P02. Los nuevos sprites son recursos geométricos propios provisionales, no arte final ni diseños extraídos de la wiki.

## Reutilización y cambios técnicos

Se conserva JavaScript y Canvas 2D, sin dependencias nuevas. Se reutilizan World (tiles/chunks/cachés/colisión), Path (BFS), EnemyMgr, animadores, Projectiles, Combat, Pickups, FX y el bucle Game. Se añaden SectorMaps, BiologicalAI y ContainmentBoss. Expedition evoluciona como director; el catálogo y UI incorporan entidades, objetivos y acciones.

La consulta de paredes de fixtures se normaliza en un Set en lugar de buscar linealmente el array por cada casilla. Se conserva el contrato de arrays y se invalidan las cachés cuando cambia el mapa. Para estos sectores, el BFS cubre sus límites completos: el campo antiguo de radio 28 podía recortar el rodeo necesario entre salas y bloquear una oleada. El mundo original mantiene el campo de radio 28. Esta ampliación se verifica como corrección funcional; no se afirma una mejora de FPS. El campo finito examina unas 6.700 casillas en vez de las 3.249 originales; el rendimiento físico móvil queda pendiente.

## Verificación ejecutada

- Construcción: 73 scripts, orden y sintaxis correctos, bundle e index actualizados.
- P03: 24 comprobaciones de comportamiento: mapas (6), biológico (4), jefe (6), director (6) y rutas (2). Mapas y rutas cubren semillas 0–127 con el hash de producción, incluida sustitución de fixture y conexión de salida con colisión real.
- Regresiones de pistola, perseguidor y mejoras P02 correctas. Pruebas P01 de arranque, ocho direcciones, teclado, táctil, colisión, pausa/foco y configuraciones inseguras correctas. Movimiento medido: 165 unidades por segundo de tiempo del juego.
- Navegador fuente/compilado × escritorio/táctil emulado: cuatro escenarios correctos, sin errores de navegador, peticiones remotas ni fallos HTTP. Canvas adaptable en vertical y horizontal.
- Dos recorridos completos de semilla 1337, hasta sector 10 y 27 oleadas normales cada uno. Fuente: 1 jefe evadido, 0 vencidos, 1.128 bajas; compilado: 1 jefe vencido, 0 evadidos, 1.133 bajas. Ambos finalizan por extracción, con reinicio y muerte comprobados.
- Muerte controlada adicional en fuente y compilado: vida 0, resumen visible, resultado único y reinicio a 100 HP/nivel 1/0 bajas.
- Revisión estática por subagente, supervisada por el agente principal: sin defectos críticos/importantes detectados. No se presenta como prueba ejecutada.

Los recorridos acelerados utilizan entradas de teclado y módulos de producción con paso fijo de 1/30 s. El reloj de caché de línea de visión avanza con el mismo tiempo virtual; se restaura después. Los recorridos ganadores no aumentan artificialmente vida, daño o invulnerabilidad. Muerte y recolocación de enemigo inaccesible se comprueban con inyecciones controladas independientes. Esto valida flujo y reglas, no rendimiento ni equilibrio final.

Evidencias: [P03-validation.json](P03-validation.json), [P03-death-validation.json](P03-death-validation.json), [captura de resistencia](screenshots/P03-local-01.png) y [captura del jefe](screenshots/P03-boss.png). Las capturas proceden de Chromium ejecutando la versión correspondiente.

## Incidencias corregidas y límites

Se reprodujo un bloqueo de neutralización en sector 2/semilla de expedición 1337: un perseguidor necesitaba un rodeo fuera de R28. La prueba de regresión falla antes del cambio y pasa con el campo finito. Se corrigieron durante revisión puntos de aparición fuera del campo inicial, dimensiones intrínsecas SVG y adquisición del golpe del jefe fuera de su radio útil. Estas correcciones se atribuyen a la integración P03.

No se ha ejecutado Safari ni teléfonos físicos. No hay medición de FPS, pruebas de carga de servidores, publicación ni validación final de equilibrio. Las expediciones no se guardan al cerrar/recargar. Cuentas, inventario, armas/mods adicionales, reclutamiento, recompensas físicas/permanentes y ranking dependen de fases posteriores. La IA y entidades jugables están implementadas; el arte definitivo, audio y acabado siguen pendientes.

El registro canónico RoadmapSCP no se actualiza automáticamente. La propuesta para registrar P02/P03 queda pendiente de sincronizar cuando el director lo indique. No se ha escrito en GitHub ni activado nube, facturación, seguimiento o publicación en esta fase.

## Repetir las comprobaciones

```sh
npm run build:check
npm run build
node tests/p03-maps.test.js
node tests/p03-pathing.test.js
node tests/p03-biological.test.js
node tests/p03-boss.test.js
node tests/p03-director.test.js
node tests/p02-weapon.test.js
node tests/p02-ai.test.js
node tests/p02-upgrades.test.js
python3 tests/p03-browser.py
python3 tests/p03-death.py
python3 tests/p01-browser.py
python3 tests/p01-movement.py
```

Chromium y Python Playwright se utilizan solo para las pruebas. `tests/p02-browser.py` es ahora una entrada compatible al recorrido P03 actual; los resultados históricos P02 permanecen en sus informes.
