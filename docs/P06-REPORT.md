# P06 — inicio local: copias, mochilas y gestión de equipo

**V2-ESTRUCTURA · documento histórico desde18/10/2026.** Iván retiró mochilas y accesorios físicos y pidió replantear la pauta. Este informe/prueba describe el prototipo anterior que se conserva; no es la lista vigente para continuar P06 ni se exige aceptar mochilas antes de retirarlas. Consultar [pauta vigente](../PAUTA_DESARROLLO.md) y [plan de cambios](PLAN_CAMBIOS_ESTRUCTURA.md). Las pruebas anteriores no aceptan el diseño nuevo.

16/10/2026. Iván pidió comenzar la siguiente fase después de simplificar las grietas y pidió usar subagentes Luna con razonamiento máximo, manteniendo a raíz al mando. Esta entrega inicia **P06-T01**; **no completa P06** ni sustituye el guardado confirmado por servidor. P05 permanece EV0/6.

## Implementado en este primer tramo

- `InventoryModel`: identidad única y una ubicación por copia, sin apilado. Dos armas y mochila equipadas no ocupan interior; mods instalados forman parte del arma.
- Mochilas8/16 sin penalización de movilidad, reserva y almacén simulado60. Transferencias atómicas que rechazan exceso sin descartar objetos. Cambio a mochila pequeña solo si cabe todo.
- Intercambio de armas conservando identidad, nivel temporal, munición y recarga. Dos copias del mismo modelo mantienen datos independientes.
- Instalación/retirada/intercambio de mods físicos; con mochila llena, sustitución directa devuelve la misma copia al espacio liberado.
- Panel en base/preparación con borrador, confirmar y cancelar. El descanso continúa y muestra su contador. Al terminar, descarta lo no confirmado y empieza la oleada; no permite gestionar en combate, pausa o selección de mejora.
- Adaptación al `FieldCombat` existente conservando espera compartida, cambio, disparos y temporizadores. Tras cambiar mods se refleja también el límite de cargador y proporción de recarga del actor.
- Prueba optativa `?inventario=local` o directa `?prueba=inventario`: loopback, sin cuentas. La directa comienza en preparación20s y después inicia la primera oleada, sin acreditar una victoria ficticia ni saltarse la primera oleada.

El equipo es **ficticio y temporal**: no se guarda al recargar, no tiene valor económico, no es el kit gratuito definitivo y no concede botín. Mantiene los dos slots ocupados del prototipoP04; la disponibilidad de equipo/kit y jugar sin equipo se resolverán enP06-T02. El almacén de prueba no acredita un almacén compartido confirmado por cuenta.

## Verificación actual

- `node --test tests/*.test.js`: **96 pruebas,95 aprobadas,0 fallidas,1 integración optativa de emuladores omitida**. Incluye9 pruebas del modelo/aislamiento y regresión de preparación inicial/checkpoints.
- `npm.cmd run build` y `npm.cmd run build:check`: correctos,85 scripts, bundle`57d8cefba5`; dependencias sin cambios.
- Ensayo aislado inicial en fuente/móvil emulado: panel base y preparación abren sin errores. Capturas revisadas; interfaz provisional, no aceptación visualP09.
- Regresión del cargador reproducida antes de corregir: quitar Ampliado dejó actor12/inventario16. Corregida la sincronización posterior a aplicar el cambio; el ensayo de navegador conserva ese caso.
- Regresión de catálogo: un mod cuyo modelo fuese una propiedad heredada de JavaScript se aceptaba. Reproducido con prueba fallida y corregido mediante búsqueda de modelos propios del catálogo; prueba aprobada.
- Navegador aislado en fuente/compilado, escritorio/móvil emulado: **4 escenarios aprobados**, sin errores JavaScript, peticiones remotas ni fallos HTTP. Confirmar/cancelar, cambio de mochila/arma/mod, cargador12 coherente en actor e inventario, temporizadores preservados y descarte automático al terminar preparación. Se controlaron munición, temporizadores y salto de21s para comprobar límites; no acredita uso humano, dispositivo físico ni balance.
- Regresión de grietas sobre el mismo compilado: **4 escenarios aprobados**, incluida entrada instantánea y64 semillas de ubicación. No se cambió el calendario de jefes normales.
- Evidencias fuera del juego: `../migration-audit/p06-inventory-20261016-node.txt`, `../migration-audit/p06-inventory-20261016-browser/results.json` y `../migration-audit/p06-rifts-regression-20261016-browser/results.json`. Scripts reproducibles: `tests/p06-browser.py` y `tests/rifts-browser.py`; las capturas finales fueron revisadas. **Aceptación manual de Iván pendiente.**
- Coordinación: tres subagentes Luna con razonamiento máximo para documentación, ejecución del navegador y revisión estática; raíz implementó/integró y corrigió las regresiones. El revisor no confirmó fallos adicionales, pero no ejecutó pruebas propias ni verificó de forma independiente las correcciones; los resultados de ejecución corresponden a los ensayos documentados, no a una auditoría exhaustiva.
- Integridad contra el respaldo anterior al ingreso instantáneo: ningún archivo original eliminado,12 assets byte a byte conservados,53 tareas y sus criterios/pesos/dependencias e historial previo intactos. [Diff de la entrega](P06-CAMBIOS.diff) incluye ingreso instantáneo y primer tramoP06; los archivos generados se resumen por hash.

## Pendiente para continuar P06

1. P06-T01: inventario confirmado por cuenta, transacciones UID/revisión/sesión/recibos, continuidad/checkpoints compatibles y pruebas integradas. No enviar este fixture a esquemaP05: `RunCheckpoint.capture()` lo excluye expresamente.
2. P06-T02: almacén real compartido, kit de emergencia y reglas contra acumulación/reciclaje.
3. P06-T03: muerte, selección25–50%, redondeo y recuperación única confirmada.
4. P06-T04: buzón30 sin caducidad y reclamación idempotente.
5. P06-T05: entrega pendiente única cuando no cabe todo; bloqueos de gasto/nueva expedición y recuperación tras desconexión.

No se activaron servicios reales, economía, ranking ni publicación en GitHub. Se conservan pesos/criterios: global52/100. El primer tramo permanece en curso hasta cubrir su aceptación y dependencias. Leer [prueba local](PRUEBA_INVENTARIO_P06.md) y el diseño/plan bajo `docs/superpowers/`.
