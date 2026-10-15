# GAP-001 — sorteo de oleadas normales

Inicio14/10/2026; implementación15/10/2026 sobre alfa0.4, autorizada al avanzar GAP-001→P05.

Se conserva el director existente. Cada sector normal registra sectorWaves3/4/5, elegido una sola vez a partir de runSeed/sector con un generador independiente. Jefes registran0. No consume las secuencias existentes de jefe/extracción ni apariciones. Oleadas impares neutralizan y pares resisten60s. Contadores, salida y HUD utilizan el tamaño registrado.

## Evidencia de módulo

node --test tests/p03-director.test.js:11pruebas aprobadas,0fallos. Incluye900semillas (cada tamaño entre240y360), reproducibilidad, los tres tamaños, objetivos alternos, preparación20s, salida al terminar, contadores únicos, muerte en cuarta/quinta y calendario histórico de18sectores seed77 sin cambios. Conserva pruebas anteriores de jefe/huida/extracción/XP.

La regresión contra la fuente anterior falla expresamente en Normal debe registrar3/4/5 (migration-audit/gap001-red.txt, fuera del paquete). La prueba inicial completa contra esa fuente no terminaba porque su helper depende del campo ausente; se utilizó el caso aislado para comprobar el fallo sin alterar la fuente activa.

## Aceptación integrada

Consultar docs/P05-REPORT.md y evidencias P05 para las ejecuciones actuales de navegador fuente/compilado y cierre del roadmap. Esta prueba de módulo por sí sola no acredita rendimiento, dispositivos físicos, balance final o publicación.
