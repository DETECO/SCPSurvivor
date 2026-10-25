# LOT-EST-005 r2 — cierre técnico de Juanillo

25/10/2026 · REV-EST-0008 · EST-NPC-001r1 · Control0.10. **Publicado y comprobado en GitHub Pages para ensayo.** [Validación](../LOT-EST-005_VALIDACION.json). [Recibo público comprobado](../LOT-EST-005_PUBLICACION.json).

## Responsabilidad y alcance real

PROGRAMACION, retomado con gpt-6.1-sol/alto por autorización de Iván, terminó con `systemError` en el turno `01a17329-0f0b-7602-9dbc-7e8bcdd5d9dc`; su agente NPC también falló, turno `01a1732a-2adb-7dc3-96ca-b1b57334e9a8`. La inspección posterior confirmó que seguía la reserva finita. Juanillo asumió la implementación, integración, pruebas y publicación del encargo ya autorizado. Es un relevo técnico de este lote; no otorga a todas las áreas permiso general para publicar. Se conservaron los avances de salas/carga/alias y la integración R3 que Iván había encargado directamente a PERSONAJES.

Las áreas se consultaron y sus entregas relevantes se leyeron en REV-EST-0007/0008. No se afirma una nueva lectura completa de los ocho historiales. Las auditorías auxiliares que no entregaron resultados no cuentan como revisiones independientes de este código final.

## Resultado implementado

- Cinco BIO, cada una en16/32, con tres patrones anunciados y sala propia de ensayo. Director50/50 en minutos1–4 desde mapa2, máximo dos apariciones; peligrosidades50/32/8/7/3. Origen congelado por referencia, retirada única90–95s, victoria/poder y regreso conservados.
- Un apoyo temporal con arma elegida una vez entre pistola/subfusil/escopeta. Reserva infinita explícita; cargadores12/24/6 y recargas1,5/1,8/2,2s. Disparos reales individuales, rápidos o seis perdigones, con trayectoria, alcance y obstáculos. Daño/cadencia por rareza son perfiles identificados de ensayo. No se impone cupo oculto de tiros o daño.
- Conserva presencia33%D1–D4/10%D5, rarezas, incapacitación, ausencia de remate al jefe, XP por bajas aliadas o transferencia de arma. La supresión de XP ocurre durante la baja real; no depende solo de una etiqueta que el gestor no consumía. El disparo del NPC no incrementa el contador ni consume el cargador del jugador.
- Rig masculino y tres compañeras R3, nombres y14personalidades, presentación y reconocimiento del arma realmente sorteada. Frases de reserva agotada excluidas sin borrar los bancos históricos. Burbujas sin voz; pausar/seleccionar premio detiene ataques y recarga. El NPC se limpia al abandonar el encuentro.
- Atlas404 o espera de10s activos retorna al origen conservado con aviso, sin premio, cura, recarga gratis ni reroll. Los enlaces `premios=grieta` abren la práctica integral; `legado=b3` conserva el ensayo histórico explícito.

## Comprobación y límites

**270/270 pruebas del juego**,50archivos, sin fallos u omitidas. Build/check117scripts, bundle local `c5f789805d`. Navegador local: **10/10** salas BIO×resolución; **18/18** compañeras×resolución×arma; **14** grupos de desenlace/poderes/NPC; **6** casos de carga/alias. Se inspeccionaron capturas reales de sala, vistas del montaje y D5. Las pruebas nuevas de reserva/proyectiles fallaron antes de la corrección y pasaron después.

La suite general que incluye P05 quedó esperando tras pruebas de Worker y se detuvo su proceso concreto; no tiene resultado completo actual. La regresión del juego se ejecutó aparte y pasó. Los fallos SQLite/P05 del recibo r1 son históricos, no resultados inventados para esta ejecución.

Se inyectan tiempo/posición/HP/invulnerabilidad/sorteos solo para QA declarada; no se acredita victoria natural, evasión bajo presión, balance, iPhone físico o aceptación artística. Subfusil/escopeta usan dibujo legado marcado provisional; los sprites nuevos ARMASR2.2 siguen pendientes. R3 no sustituye ni repara silenciosamente los originales R1/R2. Salas y cifras son ENSAYO-GRI-001r1, ENSAYO-POD-001r2 y ENSAYO-NPC-RESERVA-r3. Sonido NPC, arte final de salas, fusión y servicios conservan sus dependencias.

## Publicación comprobada —25/10/2026

Runtime `92fc1fd7c2347aed7b585946328670944008b39c`, Pages built, bundle `adec3ec93c`,117scripts. **55casos/grupos públicos aprobados:**10salas BIO×resolución,18combinaciones femeninas×resolución×arma y1respaldo femenino,14grupos de desenlace,7carga/alias,3recorridos de coordinación y2inicio/pausa. **217/217SHA256** coinciden con el payload publicado. Cero errores JavaScript o HTTP inesperados;404 intencional, carga demorada y timeout son casos separados. Las capturas públicas se inspeccionaron. Práctica forzada y probabilidades normales se distinguen en la guía y recibo.

PROGRAMACION volvió con una entrega de auditoría; se detuvieron sus escrituras para evitar dos cierres. Aporta una prueba complementaria3PASS y una suite completa acotada: **328casos/322PASS/5fallosP05/1omitida**. Se leyó JSON/log y la causa reproducida: workerd soporta2026-08-06 y el Worker exige2026-10-17. Este resultado actual complementa el intento de raíz detenido; no se presenta como suite verde ni se arregla/despliega un backend ajeno a este lote.

Novedad de ARMAS revisada durante el cierre: **R3 acepta visualmente48sprites smg/shotgun/baton**, mensaje humano `01a1730a-66c3-70f2-815b-b958e20083d4`. El runtime de este recibo todavía usa los dibujos legados para smg/shotgun. El montaje técnico está encargado en [LOT-EST-006r1](../lotes/LOT-EST-006-r1.md); ya no falta aprobación visual de esas imágenes. Los poderesA/B nuevos no están elegidos. El hash anterior de la entrega PERSONAJES-COMPANERAS-003 no pudo recuperarse byte a byte; se conserva declarado con esa limitación, se releyó el archivo actual y se verificaron sus recursos/comportamiento públicos.
