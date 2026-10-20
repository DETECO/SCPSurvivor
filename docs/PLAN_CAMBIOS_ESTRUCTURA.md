# Plan de adaptación a ESTRUCTURA — SCP Survivor

**Prioridad vigente 0.27 · 20/10/2026 (A-037/D-333):** Iván da por aceptado lo pendiente de P05 para continuar y prioriza llegar al diseño visual. Aceptación del propietario registrada; las comprobaciones técnicas de servicios reales no ejecutadas se difieren, sin declararlas aprobadas. P05 deja de bloquear el prototipo local B4 y la preparación visual. Cuentas propias, economía persistente y facturación siguen desactivadas. [Mecánicas pendientes y ruta al diseño](PRIORIDAD_MECANICAS_Y_DISENO.md). Esta instrucción posterior sustituye el bloqueo anterior por aceptación P05 para esos trabajos locales; no autoriza activar servicios reales ni reintroducir mochilas, accesorios o extracciones.


**Entrega 0.25 · 19/10/2026:** RC-10 tiene el prototipo B1/B2: mapa inicial 160 × 100, seis ubicaciones y cofres de exploración con tabla base y tickets ficticios. [Prueba](PRUEBA_MAPA_COFRES_V2.md) · [Verificación](V2-B1-B2-REPORT.md). Conserva aceptación final y dependencias pendientes, incluidos premios de jefe/grieta, hitos, bono de diez minutos y economía persistente. Los criterios completos siguientes no se dan por cerrados.

**Actualización 0.24 (19/10/2026):** RC-07 ahora exige dos armas simultáneas y tres ofertas compatibles; se añaden RC-13 (tres poderes y reemplazo) y RC-14 (ultimate única, máximo nivel 5), pendientes. RC-09/RC-11/RC-12 incorporan esas dependencias. [Detalle y aceptación](ROADMAP_ACTUALIZACION_ESTRUCTURA_2026-10-19.md). La demo y los criterios históricos no cambian.

**Primer ensayo A-031 disponible:** RC-03–RC-06 tienen prototipo local en prueba, sin aceptación final, contrato persistente ni cierre de dependencias. Consultar [prueba manual](PRUEBA_MAPA_V2.md). Las tareas/casos de abajo siguen siendo criterios de la adaptación completa; no exigir terminar la economía o P06 anterior para ejecutar este ensayo sin guardado.

18/10/2026 · Plan técnico V2 · **Recorrido en prototipo; siguiente bloque de diseño aprobado, implementación restante pendiente.**

Objetivo: adaptar el proyecto existente a [la pauta vigente](../PAUTA_DESARROLLO.md). La sincronización 0.22 actualiza documentación y seguimiento sobre el primer prototipo disponible; conserva el ejecutable y los datos. No sustituye el cierre pendiente de P05.

## Matriz de impacto

| Sistema actual | Cambio necesario | Rutas de referencia |
| --- | --- | --- |
| Sectores de 3/4/5 oleadas, preparación20s y jefe cada4–6 sectores | Director por mapa con reloj300s, escalada temporal y jefe obligatorio en cada mapa; revisar las antiguas pausas entre oleadas | `js/systems/expedition.js`, `js/world/sector-maps.js` |
| Extracción aleatoria, espera3s y resultado `extracted` | Retirar del recorrido V2; la puerta cambia de mapa, no termina la partida | `js/systems/expedition.js`, `js/ui/`, `js/core/`, `dev.html` |
| Victoria del jefe limpia enemigos y prepara otro sector | Conservar enemigos restantes; desbloquear avance solo con jefe derrotado y puerta llegada a5:00 | `js/systems/expedition.js`, `js/systems/containment-boss.js` |
| Sin equipo aliado de transición | Incorporar puerta y soldados con llamada/cobertura, aparición única y ubicación alcanzable; aliados no generan recompensas por matar aliados | `js/entities/`, `js/systems/`, `js/world/`, `js/ui/`, audio |
| Armas de fuego con mods y estadísticas combinadas | Separar identidad/familia/estadísticas; quitar ranuras y efectos de accesorios sin quitar las mejoras temporales | `js/data/field-catalog.js`, `js/systems/field-stats.js`, `field-combat.js`, `field-upgrades.js`, `js/ui/field-loadout.js` |
| Inventario temporal con mochila8/16, mods y almacén60 | Retirar la gestión de mochila/mods del recorrido nuevo; replantear colección y equipamiento | `js/systems/inventory-model.js`, `js/ui/inventory-trial.js`, `dev.html`, estilos, pruebas P06 |
| Guardado de dos armas con mods, oleadas y calendario de extracción | Definir contrato V2, versión/migración y fronteras seguras antes de conectarlo | `js/systems/run-checkpoint.js`, `run-continuity.js`, `functions/account-service.js`; el Worker preparado también reutiliza ese contrato |
| Grieta local en el mismo escenario | Mantener señales, duración/localizador/contacto; especificar encuentro separado, retorno y premio si se decide esa modalidad | `js/systems/dimensional-rifts.js`, `expedition.js`, `js/ui/`, `docs/PRUEBA_GRIETAS.md` |
| Cofres aprobados por oleadas no integrados; hasta tres cajas de campo sin botín | Aplicar cuatro intentos 60/120/180/240 s, tabla/topes aprobados, tres tipos y seis puntos; ensayar 160 × 100 antes de validar dimensiones finales. Las cajas no equivalen a cofres | `js/world/world.js`, `sector-maps.js`, `js/systems/interact.js`, [base de cofres](COFRES_BASE_Y_ADAPTACION_V2.md) |
| Gacha/kit/recuperación/buzón concebidos para objetos físicos | Rediseñar tablas/entrega según colección de soldados y armas; no entregar mods/mochilas ni copiar overflow sin revisar | Roadmap P06/P07, `docs/P06-REPORT.md`, futuros comandos de servidor |
| Ranking y resultados basados en expedición/extracción | Versionar reglas y decidir métrica para mapas de5min; no mezclar marcas antiguas | Roadmap P08/P10, resultado de expedición y persistencia |

Las rutas son puntos de inspección, no instrucciones de borrar carpetas. El código heredado de Pokesurvivor que no participa en el recorrido actual se conserva como referencia; no se reactiva por encontrar allí un cofre o premio.

## Trabajo ordenado y aceptación

Todas las tareas RC siguen pendientes de **aceptación final**. La cadencia/tipos de cofres y escala inicial ya tienen aprobación E-12–E-15; O-08/O-09 solo mantienen abiertos los detalles restantes y la validación final. RC-03–RC-06 tienen un prototipo local en prueba (EV-036), sin contrato persistente ni cierre de dependencias. No son puntos completados ni modifican los pesos históricos.

| ID | Trabajo | Depende de | Se acepta cuando |
| --- | --- | --- | --- |
| RC-01 | Cerrar contrato de diseño V2: armas/azar, muerte/fin, cofres, grietas/saltos y alcance de colección | Registro O-01–O-11 | Cada regla necesaria para el siguiente cambio tiene resolución explícita; parámetros abiertos identificados y sin supuestos económicos |
| RC-02 | Compatibilidad de guardado y resultado V2 | P05 verificado + RC-01 para sus campos | Versiones identificadas, partida antigua conservada, reintentos/sesión/UID intactos, recuperación definida; ningún guardado anterior se borra o interpreta como V2 por defecto |
| RC-03 | Director de mapa300s y escalada temporal | RC-02 | Casos299,99/300/300,01s correctos; reloj activo coherente con pausa/segundo plano; semillas y transiciones reproducibles |
| RC-04 | Jefe obligatorio por mapa | RC-03 | Aparece a tiempo según regla cerrada, no se duplica, no hay salida anticipada ni bloqueo porque nunca apareció; refuerzos respetan corte5:00 |
| RC-05 | Puerta blindada, soldados y transición | RC-04 | Puerta llega una vez a300s, soldados llaman/combaten, no aparecen enemigos nuevos, sobreviven los remanentes; solo cruza con jefe derrotado; siguiente mapa conserva vida/build y reinicia reloj |
| RC-06 | Retirar extracción del recorrido V2 | RC-05 | Sin opción/calendario/espera/cobro de extracción en V2; cruzar no ejecuta `finish('extracted')`; muerte y fin real producen resultado único |
| RC-07 | Dos armas simultáneas, familias y tres ofertas compatibles | RC-01 + RC-02 | Categorías y reglas cerradas; cada arma conserva identidad; azar/topes comprobables; familias sin cargador no heredan recarga ficticia; no aumentan copias ajenas por accidente |
| RC-08 | Retirar accesorios y mochilas; replantear P06 | RC-07 + RC-02 | Sin ranuras, objetos ni paneles de mochila/mods en V2; colección de armas/soldados conservada; guardados anteriores tratados según migración; pruebas de inicio/cambio/recuperación pasan |
| RC-09 | Colección, gacha de armas/soldados/skins/ultimates y premios | RC-08 + RC-01 + RC-14 | Solo catálogo vigente; premios y gastos confirmados por servidor, recibos idempotentes, concurrencia y respuesta perdida probadas; sin economía libre del cliente |
| RC-10 | Cofres y dimensiones de mapas | RC-01 + RC-03 | Tipos/frecuencia/premios cerrados; presupuesto y distribución reproducibles, rutas accesibles, desplazamiento probado en cinco minutos; sin premios de mods/mochilas |
| RC-11 | Grietas especiales y saltos dimensionales | RC-05 + RC-09 + RC-13 y reglas O-06/O-07 | Aviso sonoro/visual/localizador, tiempo limitado e ingreso inmediato; reloj/retorno/saltos respetan contrato y jefe obligatorio; premio único sin duplicación |
| RC-12 | Interfaz, audio, regresión y aceptación de V2 | RC-06–RC-11 + RC-13 + RC-14 | Fuente/compilado y escritorio/táctil verificados; controles/avisos legibles; crédito visible; resultados/guardado/ranking versionados; defectos bloqueantes resueltos y aceptación registrada |

RC-07 y RC-10 pueden desarrollarse en paralelo después de sus dependencias. La primera entrega jugable debe ser RC-03–RC-06 con el arte existente y sin ampliar catálogo: prueba el recorrido nuevo antes de producir mapas y recursos finales. No requiere reconstruir el motor.

## Compatibilidad y conservación

1. Respaldar estado local y comprobar versión antes de cualquier migración. Los ZIP y `sources/` originales quedan intactos.
2. Inventariar dónde existen datos reales y dónde solo hay fixtures. El prototipo P06 usa datos temporales; eso no acredita ausencia de otros datos de cuenta.
3. Separar versión de diseño/reglas, versión del checkpoint y versión de build. Un guardado de oleadas con mods no se carga bajo reglas V2 sin validación.
4. Definir qué se conserva/migra de armas y soldados. No transformar accesorios en moneda, borrar mochilas persistentes ni conceder compensaciones inventadas.
5. Conservar un guardado incompatible y mostrar su estado con claridad. No forzar su carga ni reiniciar silenciosamente la cuenta.
6. Mantener propiedad por UID, revisión esperada, una partida activa, sesión propietaria y recibos. La transición de mapa no puede cobrar dos premios después de una desconexión.
7. Adaptar las fronteras seguras: entrada/salida de mapa, jefe, puerta y eventual dimensión. Recuperar combate no concede elegibilidad al ranking por repetir una recompensa.

**Riesgo concreto detectado:** hoy preparación/exploración se consideran fronteras seguras sin enemigos serializados y restaurar limpia `EnemyMgr`. En V2 puede haber enemigos vivos frente a la puerta. No guardar esa situación como si fuera la exploración antigua: definir conservación de remanentes o recuperación de combate explícita y probarla. El reloj de mapa debe distinguirse del tiempo total de partida y respetar las pausas del juego, incluida la selección de mejora.

## Pautas mínimas de prueba de la implementación futura

- Jefe derrotado antes de5:00: puerta aún no disponible; llega al tiempo correcto.
- Jefe vivo a5:00: puerta visible pero avance bloqueado; cobertura aliada activa; jefe y enemigos siguen vivos.
- En300s se bloquea cada productor de enemigos, incluidos refuerzos de jefe. Ningún contador acumulado genera una ráfaga de apariciones después del corte.
- Al derrotar al jefe después de5:00 se habilita cruzar sin exigir exterminar a todos los remanentes ni ejecutar la extracción anterior.
- Permanecer sobre la puerta o reenviar un comando no duplica mapa, resultado o recompensa. Nueva semilla/reloj una sola vez.
- Un aliado no cuenta como enemigo, no bloquea el objetivo y no da XP/botín explotable. Camino al portal y coberturas alcanzables bajo presión.
- Guardado/recuperación antes y después de300s conserva `spawnClosed`, estado del jefe, puerta y efectos de transición según contrato. No acepta reloj/estado alterados por cliente como autoridad económica.
- Retirar mods no elimina progreso de arma. Quitar mochila no elimina la colección. Versiones antiguas siguen conservadas.
- Mejoras aleatorias: casos sin candidatos, candidatos al tope, duplicados, varias subidas juntas y recarga/cambio de arma. Ningún menú queda bloqueado.
- Cofres/grietas: reabrir/reconectar no duplica premios; localizador y aviso funcionan fuera de pantalla; sin dependencia exclusiva del color o sonido.
- Pausa, segundo plano, desconexión, sesión transferida, móvil emulado y compilado preservan el recorrido y sus límites.

Estas son pruebas **por ejecutar cuando se implementen los cambios**, no resultados obtenidos en esta revisión.

## Cómo quedan las fases

| Fase | Tratamiento después de ESTRUCTURA |
| --- | --- |
| P01/P02 | Reutilizar base técnica y controles; repetir regresiones afectadas |
| P03 | Reabrir criterios de recorrido/director/jefes/salida para V2; la aceptación anterior queda como histórica |
| P04 | Conservar combate útil; retirar criterio de mods y revisar armas/mejoras |
| P05 | Continúa pendiente de aceptación real y compatibilidad V2; mantener Spark sin facturación |
| P06 | **Replantear antes de implementar**; no seguir construyendo mochila, extracción, kit o recuperación física por la lista anterior |
| P07 | Ajustar colección/gacha/recompensas a soldados y armas, con economía coherente |
| P08–P11 | Revisar resultados/ranking, interfaz/audio, aceptación y publicación para el nuevo recorrido |

El JSON conserva las53 tareas, pesos y evidencias anteriores como línea base histórica; `activeDesignRevision` identifica alcance activo, tareas afectadas y esta secuencia. **52/100 no es el porcentaje de V2.** No se recalcula un avance nuevo suprimiendo del denominador las funciones descartadas.

## Antecedente del siguiente bloque — 0.22

El corte 0.22 dejó definido B1 (geometría) y después B2 (cofres ficticios), ahora ejecutados como prototipo 0.25. Usar el [plan jugable actualizado](PLAN_DISENO_JUGABLE_V2.md) para sus pendientes y siguientes bloques. Las nuevas regresiones del recorrido se registran como regresiones de esta build, sin convertirlas en aceptación humana ni cierre de dependencias. El contrato persistente, azar detallado de armas y economía necesitan sus propias definiciones.

## Combate ampliado pendiente

| ID | Trabajo | Depende de | Se acepta cuando |
| --- | --- | --- | --- |
| RC-13 | Hasta tres poderes y reemplazo del cuarto | RC-01 + RC-07 | Catálogo/adquisición/rangos cerrados; máximo tres; retirada de efectos salientes comprobada; sin apoyos extra ni acumulación oculta |
| RC-14 | Una ultimate de efecto único y máximo nivel 5 | RC-01 + RC-07 | Efecto, límites, cinco niveles, reloj/cooldown y controles definidos por habilidad; relación con habilidad del soldado resuelta; integración de gacha transaccional en RC-09 |

Son tareas pendientes sin nuevos puntos. Las propuestas de balance/economía no se adoptan como reglas cerradas.
