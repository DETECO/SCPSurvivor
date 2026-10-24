# Grietas integrales — plan técnico de implementación

> Ejecución con subagentes Luna máximo; raíz integra y revisa. Corte LOT-EST-005 r1 / REV-EST-0007 / CONTROL_CAMBIOS 0.8.

**Objetivo:** entrada por contacto desde mapa2, recinto biológico separado, poderes/NPC y retorno al mismo estado de origen, en la demo autorizada.

**Arquitectura:** mantener las variables privadas de Expedition sin actualizar durante el recinto. Intercambiar por referencia los contenedores de mundo/enemigos/proyectiles/pickups/campos/FX/path/banner; no serializar ni regenerar el origen. Un adaptador RiftExpedition gobierna entrada, recinto y retorno; RiftSession concentra el reloj y la retirada única. Canvas2D y namespace G existentes, sin nuevas dependencias.

**Restricciones:** probabilidades del director intactas; 5 BIO verificadas, originales16/32; máximo3 poderes5+extra; NPC temporal; ninguna cuenta/economía real. M01 y física original conservados. Salas, perfiles y cifras nuevas son ENSAYO-GRI-001 r1, no aceptación visual/balance final.

- [ ] Suspensión por referencia: World/EnemyMgr/Projectiles/Pickups/Path/Combat/FX/Spawner, pruebas de identidad y temporizadores. Agente estado.
- [ ] BIO/atlas/15 ataques y señales, tabla de ensayo, pruebas de patrones y montaje. Agente recursos.
- [ ] Poderes/recompensa idempotente/3ranuras/5+extra y NPC con diálogo/equipo limitado; pruebas de tasas y límites. Agente NPC/poderes.
- [ ] RiftSession: transición breve sin consumir reloj; aviso15s antes, retirada única a90s durante5s; victoria independiente, fin por muerte. Prueba primero del dominio, luego implementación mínima. Raíz.
- [ ] RiftExpedition: director→ubicación transitable→contacto→mundo separado→combate→recompensa→salida; retorno/restauración exacta, limpieza de reinicio. Pruebas primero y navegador con entidades activas de origen. Raíz.
- [ ] Integrar renderer/HUD/selección pausada/carta libre. Ocultar terminales/cofres/orientación del origen dentro del recinto. Pausa/suspensión/cargas no consumen tiempo. Raíz.
- [ ] Build/regresiones pertinentes, escenarios5BIO×16/32 y tres formatos. Pruebas QA forzadas identificadas; distinguirlas del azar natural.
- [ ] Registro/roadmap/informe/recibo; payload revisado a GitHub main sin force, Pages y flujo público comprobados.

## Interfaces acordadas

- Managers: `suspend()` devuelve token opaco de referencias; `resume(token)` restaura el mismo estado.
- Anomalías: `RiftAnomalies.create({tier,geometry,rng,player,anomalyId})`, enemigo compatible con EnemyMgr y `hurt`, renderer original de atlas.
- Poderes: `startRun/victory/choose/reject/levelCards/applyCard/tick/clear/state`. NPC: `create/update/drawables/clear/state`.
- Adaptador: `startRun/startMap/updateOrigin/updateRoom/drawGround/drawables/chooseReward/leave/clear/state`.

## Ensayo inicial explícito

ENSAYO-GRI-001 r1: transición0,5s; retirada a90s, aviso a75s, ventana5s, ancla central; posibilidad intermedia de poder25% (garantías aprobadas conservadas). Sala transitable28×20casillas32px con cuatro composiciones diferenciadas y zona central despejada; las entregas posteriores NIVELES se evalúan y registran por hash antes de incorporarlas. Sin cura/recarga/transporte de NPC por transición. Cooldowns/equipo/vida del jugador continúan en el recinto; origen y sus avisos permanecen congelados. Al salir, posición original válida, sin invulnerabilidad ni curación añadidas.
