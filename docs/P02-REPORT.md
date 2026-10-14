# P02-local-01 — primera partida completa de prueba

Inspección y pruebas: 13 de octubre de 2026. Copia independiente sin Git; referencia original main, commit `a1006e6e3d0cea9162238a90b0ffdd7fd38397b6`. Original sin cambios en el control final.

## Alcance entregado

Velocidad base 165 unidades/s, pistola automática y Sprint, perseguidor con aviso frontal, seis oleadas de neutralización en dos sectores, experiencia y mejoras temporales, preparación, continuidad entre mapas y cierre por extracción o muerte. Se conservan bucle, cámara, movimiento, rutas, colisiones, proyectiles y resolución de combate de la base, con adaptaciones acotadas y módulos de expedición.

Los dos mapas y la extracción en el segundo son un recorrido mínimo provisional. No implementan todavía la generación y reglas finales de P03. No hay datos persistentes ni ranking, cuentas, nube o publicación.

## Evidencia

- Construcción y comprobación de orden/sintaxis: 70 scripts, correctas.
- Pruebas de armas y mejoras: correctas. IA: cinco pruebas correctas, incluido fallo de golpe por evasión o muro.
- Navegador: fuente y compilado, escritorio y táctil emulado; cuatro escenarios correctos, sin errores de navegador, peticiones externas ni errores HTTP.
- Dos recorridos completos: seis oleadas y 116 bajas, conservación entre sectores y extracción. El combate se simula con pasos fijos de 1/60 s utilizando módulos de producción y entradas de teclado. La cancelación por movimiento, confirmación y espera final de tres segundos se comprueban en tiempo real.
- Controles reales, Sprint, pausa, segundo plano, tarjetas detenidas y protección contra doble clic; derrota controlada y reinicio comprobados.
- Prueba independiente de movimiento: 165 unidades por segundo de tiempo del juego.
- Revisión estática final por subagente: sin fallos bloqueantes en salida, recuperación de objetivos, tarjetas y disponibilidad de Sprint. Esa revisión no fue una prueba ejecutada.

Datos y recorridos: [P02-validation.json](P02-validation.json). Captura real de Chromium: [P02-local-01.png](screenshots/P02-local-01.png).

## Correcciones durante integración

Se reprodujo y corrigió una llamada local con argumentos incorrectos a `Combat.resolve`: debe recibir `(dt, player, elapsed)`. No es un defecto atribuido a la base. Se corrigieron Sprint para afectar movimiento y no balas, cooldown al esquivar, salida oeste del segundo sector y protección contra doble selección. La recuperación de un enemigo inaccesible conserva entidad, ID y HP y no otorga bajas o experiencia ficticias.

## Límites

Entorno: Linux, Chromium y Playwright. No se han probado Safari ni iPhone 13/15 o Infinix Note 40 5G físicos. La simulación no prueba FPS, capacidad de servidores ni estabilidad de una publicación final. Las pruebas de muerte usan daño controlado. No se han activado servicios, facturación, automatizaciones, commits ni despliegues.

RoadmapSCP permanece en la versión anterior: esta entrega prepara evidencia, pero no actualiza el registro automáticamente. Los informes P01 siguen siendo históricos.
