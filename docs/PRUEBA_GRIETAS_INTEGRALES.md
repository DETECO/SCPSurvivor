# Prueba jugable de grietas — LOT-EST-005 r1

24/10/2026 · ENSAYO-GRI-001 r1 · PROGRAMACION. Implementación en verificación; el recibo de publicación identifica el corte público comprobado. No equivale a aceptación humana o balance final.

## Cómo probar

1. Abre [práctica32](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=grietas&graficos=32) o el menú **Prácticas → Grieta dimensional**. También funciona en16 desde Ajustes.
2. Inicia la práctica. Comienza expresamente en mapa2, minuto1, con una apertura garantizada para ahorrar espera. Sigue la flecha y el tiempo del portal. **Cruza caminando: no hay botón de ingreso.** La entrada permanece45s activos.
3. Aparece un recinto separado y la anomalía identificada. Caminar permite esquivar las zonas señaladas. Pausa detiene el reloj y todos los ataques.
4. En este ensayo la retirada se anuncia a1:15 y abre una sola vez en el centro a1:30, durante5s. Sigue el indicador. Si la pierdes, debes vencer o morir; no se vuelve a abrir.
5. Al vencer, elige un poder si aparece la oferta; esa elección detiene la partida. Cruza el portal central para regresar al mismo mapa y sus mismos enemigos/objetos, sin cura o recarga de transición. Retirarse no entrega premio.
6. Consulta los poderes adquiridos y su rango al pausar/consultar equipo. Funcionan automáticamente; no añaden un botón.

**Variantes explícitas de QA:** añade `&grado=D2`, D3, D4 o D5 para practicar otra anomalía; `&apoyo=si` o `&apoyo=no` fuerza presencia/ausencia de compañero solo en esta práctica. No son frecuencias naturales. [D5 con compañero forzado](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=grietas&grado=D5&apoyo=si&graficos=32). El modo habitual conserva sus sorteos aprobados desde mapa2, sin garantía de apertura.

La URL anterior `?prueba=mapa-v2&premios=grieta` conserva el B3 histórico del Custodio en el mismo mapa. El menú actualizado dirige a la nueva prueba separada; el prototipo histórico no acredita este lote.

## Parámetros concretados para ensayo

Estos valores se concretan por la autorización de LOT-EST-005, sin convertirlos en reglas finales de balance.

| Parámetro ENSAYO-GRI-001 r1 | Valor |
|---|---|
| Transición | Mundo cambiado inmediatamente; presentación0,5s. No avanza el reloj durante transición/carga de atlas |
| Sala | Composición finita28×20casillas32px, centro despejado; cinco distribuciones/ambientaciones reutilizando World. No arte final nuevo aprobado |
| Entrada/salida de sala | Llegada(16,208), anomalía(16,-144), retirada/regreso(16,16). Radio de contacto22+radio del jugador |
| Retirada | Aviso75s, abre90s, cierra95s; una sola vez. Centro alcanzable caminando a165u/s en menos5s desde el recinto; probar además bajo ataques |
| Posición de portal en origen | Candidato transitable, distancia140–900u del jugador, libre para radio36, separado110u de puerta y100u de terminal/premios. Fallo consume oportunidad sin reroll/cupo |
| Vida BIO D1–D5 | 500 /700 /950 /1200 /1600 |
| Radio BIO | 24 /24 /26 /28 /32; igual en16/32 |
| Preparación BIO | 1,25 /1,3 /1,4 /1,4 /1,6s; objetivo fijado al empezar, sin perseguirlo durante ejecución |
| Recuperación BIO | 1,4 /1,3 /1,2 /1,2 /1,4s; descanso adicional0,7s; avance de reposo48u/s |
| Daño BIO | 9 /11 /13 /15 /18 por impacto efectivo. Invulnerabilidad breve existente del jugador conservada |
| Zonas | Salto64u(D5:88), vuelo0,65s; cápsula58u/retardo0,65s/charco3s; líneas ancho28u y alcance230; carreras corredor48u, destino máximo240u y0,65s, se detienen ante pared; conos185–210u; tres brotes65u/orden0,65s; abanico7proyectiles190u/s |
| Premio posterior a primera victoria | 25% de ensayo; primera garantizada y garantía después de3victorias vacías conservadas. Identidad única por encuentro. Sin tickets/moneda persistentes |
| Poderes | Pulso de esporas12daño/4s/r160; cápsula vítrea18/3,5s/r420; tensión orgánica14/5s/r240/hasta3blancos; salva espinosa9×5/5s/r400; brote20/6s/r210/hasta8blancos. Rangos2–5:+18%base por rango; extraMAX×1,3. Bonos del jugador una vez |
| Límites de poderes | Máximo3,5rangos+extra, sin activación manual; oferta hasta3válidos, duplicado mejora, MAX alternativo; cuarto rechazar/reemplazar rango1 y retirar efectos anteriores |
| Equipo NPC | AF01 de apoyo real con PNG aprobados; único modelo compatible del ensayo, sin prometer variedad inexistente. Normal20disparos/5daño/0,8s; Rara24/6/0,75; Épica28/7/0,7; Legendaria32/8/0,65. Perfiles temporales distintos, no solo etiquetas |
| Vida/movimiento NPC | 45vida,95u/s de seguimiento; incapacitable, sin rescate/reroll/reaparición; sin remate/XP/transferencia de equipo |
| Nombres y texto NPC | Nombres masculinos de la lista propuesta, sin repetir en expedición mientras queden opciones. Rig Apoyo amarillo.14personalidades estables; presentación y comentarios de arma propia/equipo observado. Cadencia ambiental12/28/44/60s, descartada ante ataques/retirada. Sin recuerdos o entorno no observados |
| Audio | Cues existentes provisionales `riftOpen`/`rift`/`bossDown`, no aprobación sonora final. Compañero sin voz ni sonido nuevo |

## Conservación de estado y límites

El origen conserva por referencia fixture, geometría/semilla, props/caches, enemigos/animación/IA, proyectiles con Sets, objetos, campos, FX, navegación y banner. Sus relojes, cupo/director, jefe/puerta, cofres/terminales/aliados y variables de Expedition no se actualizan dentro. No se llama `map()` ni se emite un checkpointV1 para retornar.

Vida, equipo, mejoras, temporizadores de recarga/habilidad y efectos del jugador continúan en el recinto; elegir y pausar los detienen. Solo se restauran posición y cámara. Un poder reemplazado elimina también sus proyectiles suspendidos al retornar. Morir descarta el origen y acaba la expedición; reiniciar limpia sala/NPC/poderes.

El reloj `elapsed` anterior sigue midiendo tiempo del mapa de origen; la sala tiene su propio reloj. Ranking/bonos/economía no forman parte de esta entrega. No hay guardado real del encuentro ni garantía antitrampas.

Pendientes: aceptación de Iván, balance/evasión bajo presión y teléfono físico; arte final de sala/MEN-005, sonido característico del NPC y cues definitivos; exportación femenina y armas pendientes de sus áreas. Cinco BIO en dos resoluciones, cantidad resuelta por EST-GRI-002r1. No quedan otras cinco identidades por inventar.
