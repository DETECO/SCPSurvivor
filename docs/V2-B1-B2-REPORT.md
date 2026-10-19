# V2-trial-02: mapa abierto y cofres de exploración

19/10/2026 · B1/B2 · Prototipo aislado, aceptación de Iván pendiente.

Se adaptó el juego existente: variante V2 de **160 × 100 casillas**, seis ubicaciones alternativas, islas de obstáculos rodeables, zonas libres de entrada/jefe/puerta y aparición de la horda desde las cercanías del jugador. El generador anterior se conserva. No se sustituyeron diseños aprobados.

Los cofres de exploración tienen cuatro oportunidades a 60/120/180/240 segundos activos y la tabla base aprobada por franja de mapas. Apertura de proximidad 50 unidades, sin pared, durante 3,5 segundos; retroceso de 1,5 segundos por segundo al alejarse. El daño no cancela por sí solo. El contenido queda fijado al aparecer y abrir no libera cupo. Los IDs distinguen sector, semilla y candidato. Los premios son **tickets ficticios en memoria**, sin tocar cuentas, `player.t1`, gacha o almacenamiento. Se reinician al empezar otra partida.

La práctica `?prueba=mapa-v2&cofres=prueba` fuerza un cofre cerca del inicio del primer mapa y consume su cupo. La prueba rápida normal omite oportunidades anteriores sin concederlas retrospectivamente. El HUD no indica la ubicación hasta descubrir el cofre. [Guía de prueba](PRUEBA_MAPA_COFRES_V2.md).

## Verificaciones ejecutadas

| Comprobación | Resultado y alcance |
| --- | --- |
| Node, desarrollo | 28 archivos, 151 casos: **150 aprobados, 1 omitido, 0 fallos**. Se omite el ensayo que exige emuladores reales activos. |
| Node, publicación | 28 archivos, 151 casos: **149 aprobados, 2 omitidos, 0 fallos**. Además de emuladores, el manejador CORS real requiere dependencias de `functions` no instaladas en esta copia. No se cambió ese servicio. |
| Compilación y comprobación | `npm.cmd run build` y `npm.cmd run build:check` aprobados en ambas copias: **87 scripts**, orden y sintaxis comprobados. Cada copia conserva sus diferencias anteriores de cuentas; se compila de forma independiente. |
| Cofres, Chromium local | **8 recorridos aprobados**: desarrollo/publicación × fuente/compilado × escritorio/táctil emulado. Dimensiones, seis posiciones alcanzables, práctica, apertura, retroceso, pausa, límite de tiempo y entrega única. |
| Recorrido de jefe/puerta | **4 recorridos aprobados** en publicación: fuente/compilado × escritorio/táctil emulado. Jefe bloquea puerta vivo, corte a 300 s, remanentes, daño aliado y transición con vida/build conservados. |
| Errores y aislamiento de navegador | En esos recorridos: sin errores de página/consola, respuestas HTTP fallidas ni solicitudes ajenas al origen servido. Cuentas desactivadas y captura de checkpoint nula. |
| Inspección visual | Revisadas capturas de apertura en táctil y cofre abierto en escritorio. HUD legible sin cubrir controles; dibujo temporal. No acredita acabado final. |

Los ensayos controlan tiempo, posición e invulnerabilidad. El simulador usa `Game.togglePause()` porque `Game.state` es un getter; conserva una captura del HUD mientras el motor está detenido para fotografiarla sin avanzar la apertura. El fallo inicial de la prueba estaba en intentar escribir ese getter; se corrigió el simulador. No se eliminó la guarda de pausa del juego.

## Medición de rutas

Se usaron ocho semillas: `0, 1, 19, 42, 73, 127, -1, 3585071513`. Grafo de ocho vecinos, diagonales sin cortar esquinas, colisión real `World.isFree` con radio 22, casilla de 32 unidades y velocidad base 165 unidades/s:

- Entrada a salida: **36,05 s**, dentro de la meta inicial 30–45 s.
- Ancla central a las seis ubicaciones: **11,64–14,05 s**, dentro de la meta inicial 10–15 s.
- Suelo conectado; margen de 3 × 3 en puntos de interés y apariciones; jefe, puerta y ubicaciones alcanzables. Pruebas del generador anterior y pathing conservadas.

Son tiempos de las rutas transitables calculadas, sin combate, pausas ni aceptación humana. La segunda medida parte del ancla central definida en el ensayo; no representa un desvío adicional idéntico desde cualquier ruta elegida por el jugador. No mide FPS, carga ni rendimiento físico.

## Pendientes y conservación

No se implementaron premio de jefe/grieta, hitos antiguos, bono acumulado de diez minutos, economía real, persistencia, combate de dos armas simultáneas, tres poderes, ultimate o arte/audio final. RC-10 queda en curso como prototipo; P05 y aceptación completa V2 siguen pendientes. No se cambian los 53 criterios, pesos o estados históricos ni se convierte su 52/100 en avance V2.

Firebase sigue en Spark, sin facturación; cuentas propias y preparación Worker continúan desactivadas. La publicación aplica solo los cambios de esta entrega sobre la copia Git existente, conservando sus configuraciones y dependencias anteriores. Respaldo previo de ambas copias guardado fuera del repositorio. Originales Cloud, ZIPs y `sources/` intactos.

La publicación y el roadmap están autorizados. Tras el push, comprobar el build de Pages, la igualdad SHA-256 del compilado servido y los ensayos `--live`. El recibo posterior se conserva en la auditoría local para evitar inscribir un SHA autorreferente antes de crear el commit.

[Validación y hashes](V2-B1-B2-VALIDACION.json) · [Diff revisable](V2-B1-B2-CAMBIOS.diff) · [Plan ejecutado](superpowers/plans/2026-10-19-b1-b2.md).

## Publicación comprobada

Runtime publicado en `957bc9b67c33996bf1579bc91dd29c421a5c358a`. Pages construyó ese commit. El índice, compilado y roadmap servidos coinciden con lo probado; SHA-256 del compilado `27373c595c3a6a37c43c83c6e5776794d650cf3159946257675567d03c09542a`. Cuatro recorridos online aprobados: cofre de práctica en escritorio/táctil y accesos normal/rápido. Sin errores JavaScript, HTTP ni solicitudes externas. Este registro documental posterior conserva ese mismo compilado; no modifica el juego ni sustituye la aceptación manual. [Recibo](V2-B1-B2-PUBLICACION.json).
