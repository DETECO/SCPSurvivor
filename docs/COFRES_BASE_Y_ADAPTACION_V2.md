# Cofres: base aprobada y adaptación a mapas de cinco minutos

**Estado 0.25 · 19/10/2026:** B1/B2 incorpora la geometría inicial y los cofres de exploración con tabla base, descubrimiento y apertura, únicamente con tickets ficticios en memoria. [Guía](PRUEBA_MAPA_COFRES_V2.md) e [informe verificado](V2-B1-B2-REPORT.md). Bono de diez minutos, hitos antiguos, premios de jefe/grieta y economía siguen pendientes; no es integración completa ni aceptación final.

Antecedente del 18/10/2026: al volver a consultar ESTRUCTURA se confirmó que **sí existen reglas aprobadas de cofres en el roadmap anterior**. No deben descartarse ni sustituirse por las reglas genéricas de Pokesurvivor. En ese corte documental todavía no estaban implementadas.

## Base documental que se conserva

Fuente: decisiones de `RoadmapSCP.json`, no resultados de juego.

| Decisión | Regla anterior |
| --- | --- |
| D-140 | Cofres de reclutamiento aleatorios y tres hitos únicos de un ticket: primera oleada, llegar al sector2 y al sector3 |
| D-141 | Reloj de combate activo acumulado entre mapas; excluye preparación, pausas y menús |
| D-142 | Un intento al completar cada oleada; como máximo un cofre por intento exitoso |
| D-144 / D-220 | Sectores1–3:10% por intento, máximo1cofre/mapa,1–2tickets; sectores4–7:15%, máximo2,1–2tickets;8+:20%, máximo3,1–3tickets. Cantidades enteras equiprobables |
| D-144 / D-220 | A10min de combate activo: una vez+5puntos de probabilidad y+1al máximo de tickets. Contenido fijado al aparecer; abrir no libera cupo |
| D-146 / D-279 | Apertura por proximidad3,5s, radio50 y sin obstáculo; avance1s/s y retroceso1,5s/s al alejarse. Pausa congela; disparo continúa; daño por sí solo no cancela |
| D-147 | Tickets directamente a la cuenta tras confirmación; no caen al suelo ni dependen de la mochila |
| D-148 | Aviso de cofre sin descubrir; flecha después de verlo en pantalla. No añade minimapa/niebla |
| D-181 / D-183 | Botín físico previsto solo desde cofres/jefes: cofre grande50% de un objeto y jefe vencido siempre uno; tickets independientes |

Estas cifras pertenecen al diseño por oleadas. **10% por oleada no significa10% por segundo ni10% por mapa.** No convertirlas automáticamente al reloj de300s, multiplicarlas por fotogramas ni garantizar máximos que eran límites.

## Qué existe realmente en el código

- `js/world/sector-maps.js` coloca hasta tres `fieldCrate` según puntos válidos de la geometría. Son cajas destructibles, no los cofres de tickets aprobados.
- `js/world/world.js` acepta `fieldCrate` en el escenario SCP y su destrucción genera efectos sin botín. D-278 también documenta decoración sin XP/tickets/monedas.
- En la rama procedural heredada existen `chest` y `bigchest`, con sus premios originales. Esa rama no demuestra cofres de reclutamiento activos dentro del escenario SCP configurado por fixture.

Ni las tres cajas ni las probabilidades de la base heredada fijan la cantidad final de cofres del mapa V2.

## Adaptación aprobada en ESTRUCTURA; implementación pendiente

Iván aprobó el último bloque de recomendaciones en el turno `01a15142-340f-7400-8660-f8d2502ce2aa`. [Corte estable](ESTRUCTURA_REGLAS_APROBADAS.md):

1. Exploración: un intento en 60, 120, 180 y 240 segundos activos de cada mapa. Conservar tabla 10/15/20 %, topes 1/2/3 y tickets 1–2/1–2/1–3 para mapas 1–3/4–7/8+. Sorteos únicos; pausa no añade intentos.
2. Jefe: cofre garantizado al derrotarlo, con una mejora temporal aleatoria compatible con armas equipadas. Elegibilidad, tope y alternativa sin candidatos requieren especificación antes de aplicar la mejora.
3. Grieta: recompensa superior solo tras superar la anomalía; tabla exacta pendiente. Es un evento distinto del cupo de exploración.
4. Reservar seis posiciones alternativas válidas para exploración y zona propia para jefe/puerta. La escala inicial de ensayo es 160 × 100 casillas; medir desplazamientos de 30–45 s entre extremos útiles y desvíos de 10–15 s.

Los valores aprobados son contrato de diseño para adaptar, no resultados de implementación. El máximo sigue siendo límite, abrir no libera cupo y el contenido queda fijado al aparecer. Se conserva la apertura/descubrimiento de la base; no sustituirlos por la apertura de una grieta, que es instantánea por contacto.

## Detalles que todavía deben cerrarse

- Hitos de primera oleada/sectores 2 y 3: definir su correspondencia en V2 sin duplicar premios por mapa.
- Reloj acumulado de diez minutos: mantener la regla histórica como base y precisar qué ocurre con remanentes después de 5:00 y dentro de grietas. No borrarla ni aplicarla de forma distinta silenciosamente.
- Armas compatibles al tope o sin mejora candidata y entrega única de premio de jefe.
- Tabla de grieta y entrega confirmada de tickets. La colección/economía y compatibilidad de guardados no están resueltas por esta aprobación.

El ensayo B1/B2 prueba geometría, puntos y sorteos con premios ficticios aislados. No debe conceder tickets reales, activar gacha ni escribir cuentas. [Plan de adaptación jugable](PLAN_DISENO_JUGABLE_V2.md). P05 real y aceptación del recorrido siguen pendientes.
