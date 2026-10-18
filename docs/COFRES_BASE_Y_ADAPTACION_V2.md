# Cofres: base aprobada y adaptación a mapas de cinco minutos

18/10/2026. Aclaración incorporada al volver a consultar ESTRUCTURA: **sí existen reglas aprobadas de cofres en el roadmap anterior**. No deben descartarse ni sustituirse por las reglas genéricas de Pokesurvivor. Su integración en el recorrido SCP todavía no está implementada.

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

## Adaptación pendiente, sin perder la base anterior

1. Sustituir el disparador «completar oleada» por una cadencia explícita compatible con300s. Precisar número de intentos, relación con jefe y momento de aparición.
2. Revisar la correspondencia de sector/mapa y el reloj acumulado de combate, incluido el tiempo con enemigos restantes después de5:00 o dentro de grietas.
3. Tomar probabilidades, topes, tickets, apertura y descubrimiento anteriores como base de revisión. Documentar qué se conserva y qué cambia; no reiniciar esas decisiones como si nunca hubieran existido.
4. Replantear el objeto físico y la entrega al quitar mochilas/accesorios. Los tickets ya iban a cuenta y esa separación puede reutilizarse. No convertir objetos retirados en moneda por inferencia.
5. Adaptar hitos de la primera oleada a un recorrido sin esa misma estructura; no conceder ni duplicar el premio de un hito por cada mapa.
6. Con la cadencia y premios cerrados, fijar presupuesto de puntos de aparición y probar distancias/rutas en un mapa de cinco minutos. El tamaño final todavía no queda aprobado.

Las decisiones compatibles se conservan como antecedentes aprobados; los cambios de regla se registrarán antes de implementar RC-09/RC-10. No se cambian cofres, cantidades ni premios en esta entrega documental.
