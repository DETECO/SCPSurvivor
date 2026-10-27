# Prueba jugable de grietas — LOT-EST-005 r2

**Registro histórico de LOT005. La [guía vigente de 0.40.1 / LOT008](PRUEBA_JUGABILIDAD_008.md) sustituye sus reglas posteriores de salas, poderes, compañero persistente y carga. Se conserva el contenido original que sigue como evidencia de aquella entrega.**

25/10/2026 · REV-EST-0008 / EST-NPC-001r1 · ENSAYO-GRI-001 r1 + ENSAYO-NPC-RESERVA-r3 · PROGRAMACION. **Publicado y comprobado**, runtime92fc1fd/bundleadec3ec93c. [Recibo público](gestion/LOT-EST-005_PUBLICACION.json). No equivale a aceptación humana o balance final.

## Cómo probar

1. Abre [práctica32](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=grietas&graficos=32) o el menú **Prácticas → Grieta dimensional**. También funciona en16 desde Ajustes.
2. Inicia la práctica. Comienza expresamente en mapa2, minuto1, con una apertura garantizada para ahorrar espera. Sigue la flecha y el tiempo del portal. **Cruza caminando: no hay botón de ingreso.** La entrada permanece45s activos.
3. Aparece un recinto separado y la anomalía identificada. Caminar permite esquivar las zonas señaladas. Pausa detiene el reloj y todos los ataques.
4. En este ensayo la retirada se anuncia a1:15 y abre una sola vez en el centro a1:30, durante5s. Sigue el indicador. Si la pierdes, debes vencer o morir; no se vuelve a abrir.
5. Al vencer, elige un poder si aparece la oferta; esa elección detiene la partida. Cruza el portal central para regresar al mismo mapa y sus mismos enemigos/objetos, sin cura o recarga de transición. Retirarse no entrega premio.
6. Consulta los poderes adquiridos y su rango al pausar/consultar equipo. Funcionan automáticamente; no añaden un botón.

**Variantes explícitas de QA:** añade `&grado=D2`, D3, D4 o D5 para practicar otra anomalía; `&apoyo=si` o `&apoyo=no` fuerza presencia/ausencia de compañero solo en esta práctica. `&estilo=1`…`6` fuerza una apariencia independiente del grado. No son frecuencias naturales. [D5 con compañero forzado](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=grietas&grado=D5&apoyo=si&graficos=32). El modo habitual conserva sus sorteos aprobados desde mapa2, sin garantía de apertura.

Los enlaces antiguos con `premios=grieta` se redirigen a esta práctica separada. Solo `&legado=b3` solicita deliberadamente la regresión histórica del Custodio; no acredita este lote.

Si un atlas falla o tarda10s de juego activo en cargar, se restaura el origen congelado con un aviso, sin premio ni nuevo sorteo. Pausar también detiene esa espera. No se pierde vida/equipo ni se rellena el cargador durante la recuperación.

Para comprobar las compañeras: añade `&apoyo=si&companera=delgada`, `fitness` o `curvy`, en16/32. El arma se elige al azar una vez; su reserva es ilimitada, pero sí tiene cargador y recarga. La presencia normal sigue33%D1–D4/10%D5; forzarla en práctica no representa esa frecuencia.

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
| Zonas | Salto64u(D5:88), vuelo0,65s; P3 suma el sector frontal anunciado90u/semiángulo0,7rad; cápsula58u/retardo0,65s/charco3s; líneas ancho28u y alcance230; carreras corredor48u, destino máximo240u y0,65s, se detienen ante pared; conos185–210u; tres brotes65u/orden0,65s; abanico7proyectiles190u/s |
| Premio posterior a primera victoria | 25% de ensayo; primera garantizada y garantía después de3victorias vacías conservadas. Identidad única por encuentro. Sin tickets/moneda persistentes |
| Poderes | Pulso de esporas12daño/4s/r160; cápsula vítrea18/3,5s/r420; tensión orgánica14/5s/r240/hasta3blancos; salva espinosa9×5/5s/r400; brote20/6s/r210/hasta8blancos. Rangos2–5:+18%base por rango; extras propios según [ENSAYO-POD-001r2](ENSAYO_PODERES_R2.md), sin multiplicadorMAX genérico. Bonos del jugador una vez |
| Límites de poderes | Máximo3,5rangos+extra, sin activación manual; oferta hasta3válidos (una compatible propia por BIO en r2), duplicado mejora, MAX usa apoyo táctico existente; cuarto rechazar/reemplazar rango1 y retirar efectos anteriores |
| Equipo NPC | Selección uniforme pistol/smg/shotgun por encuentro, reserva ilimitada explícita y cargadores12/24/6, recargas1,5/1,8/2,2s. Patrones individual/ráfaga/6perdigones y alcances320/280/180. ENSAYO-NPC-RESERVA-r3 registra daño/cadencia por rareza; sin límite oculto de tiros o daño. AF01 aprobado; smg/shotgun dibujo legado provisional |
| Vida/movimiento NPC | 45vida,95u/s de seguimiento; incapacitable, sin rescate/reroll/reaparición; sin remate/XP/transferencia de equipo |
| Nombres y texto NPC | Rig masculino amarillo y compañeras delgada/fitness/curvy R3; cuatro apariencias de ensayo uniformes tras presencia. Nombres acordes sin repetir mientras haya opciones;14personalidades independientes. Texto identifica arma real; sin frase de munición agotada. Recarga solo durante recarga. Presentación, contexto observado, miedoD5 y recuerdo compatible se conservan |
| Audio | Cues existentes provisionales `riftOpen`/`rift`/`bossDown`, no aprobación sonora final. Compañero sin voz ni sonido nuevo |

## Conservación de estado y límites

El origen conserva por referencia fixture, geometría/semilla, props/caches, enemigos/animación/IA, proyectiles con Sets, objetos, campos, FX, navegación y banner. Sus relojes, cupo/director, jefe/puerta, cofres/terminales/aliados y variables de Expedition no se actualizan dentro. No se llama `map()` ni se emite un checkpointV1 para retornar.

Vida, equipo, mejoras, temporizadores de recarga/habilidad y efectos del jugador continúan en el recinto; elegir y pausar los detienen. Solo se restauran posición y cámara. Un poder reemplazado elimina también sus proyectiles suspendidos al retornar. Morir descarta el origen y acaba la expedición; reiniciar limpia sala/NPC/poderes.

El reloj `elapsed` anterior sigue midiendo tiempo del mapa de origen; la sala tiene su propio reloj. Ranking/bonos/economía no forman parte de esta entrega. No hay guardado real del encuentro ni garantía antitrampas.

Pendientes: aceptación de Iván, balance/evasión bajo presión y teléfono físico; arte final de sala/MEN-005, sonido característico del NPC y cues definitivos; revisión visual final de la composición femenina R3 y montaje técnico de sprites smg/shotgun/baton ya aceptados en ARMASR3, encargado en LOT006. Cinco BIO en dos resoluciones, cantidad resuelta por EST-GRI-002r1. No quedan otras cinco identidades por inventar.

**Montaje de armas actualizado — LOT006/roadmap0.38:** Subfusil/Escopeta y Porra del jugador ya usan sus sprites aceptados en16/32. Compañeros balísticos conservan sus tres modelos y reglas de LOT005. [Recibo de la corrección visual](gestion/LOT-EST-006_PUBLICACION.json), sin aprobación física/manual por inferencia.
