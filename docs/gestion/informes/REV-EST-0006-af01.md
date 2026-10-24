# REV-EST-0006 — Ensayo de combate AF01 r1

> Informe de entrega auxiliar. La raíz completó el arranque, gráficos y comprobaciones de navegador; el [registro central](../REGISTRO_IMPLEMENTACION.md) contiene el estado integrado posterior. Al cierre, el adaptador tiene **14/14** unitarios; se corrigió además la salida táctica ya aprobada para cartas/premios saturados, con dos regresiones nuevas y recorrido real al mapa 2. Los límites que figuran abajo describen el corte del agente, no la integración final.

**Fecha:** 24-10-2026  
**Lote:** LOT-EST-002 r1 · EST-ARM-001 r1  
**Estado:** ensayo AF01 implementado de forma aislada; integración del arranque y recorrido jugable completo pendientes.

## Resultado

Se añadió el adaptador [weapon-revision-trial.js](../../../js/systems/weapon-revision-trial.js) entre el dominio r1 y el runtime actual de pistola, junto con hooks condicionales para estadísticas, combate, cartas, recompensas, terminal e inspección/HUD. Solo se activa con `?prueba=combate-v2&armas=r1` en el mapa expandido. La práctica legacy `ensayo` se ignora únicamente con esta combinación exacta; los demás enlaces conservan su comportamiento vigente.

El adaptador usa la pistola y el sistema real de proyectiles. AF01 conserva el perfil aprobado de ensayo: daño 10, intervalo 0,5 s, cargador de 12, recarga 1,5 s y alcance 320. Cada copia progresa independientemente por `1 → 2 → 3 → 4 → 5 → MAX`; los bonos generales se aplican una vez. Cartas y premios eligen copias elegibles, no ofrecen ascensos para MAX, y el premio existente puede entregar una segunda pistola en nivel 1. El terminal reemplaza solo la copia elegida y comienza su reemplazo en nivel 1.

Al completar una recarga en MAX, el primer disparo principal programa un proyectil real adicional para 0,12 s después, con 40% del daño local incluyendo una sola aplicación del modificador general. No gasta munición adicional ni puede generar otro extra. Los relojes de combate se congelan durante pausa, cartas y terminal. Después de 5:00 las armas siguen disparando y recargando contra el jefe o enemigos restantes; los relojes de regeneración y cooldowns de habilidades mantienen su regla existente.

La inspección y el HUD de esta modalidad muestran nivel/MAX y no exponen las antiguas ramas. El aviso identifica el ensayo como parcial y deja explícita la fusión pendiente. La vista previa prepartida usa un prototipo AF01 de nivel 1 mediante una ruta de cálculo marcada para preview; no crea una expedición/copia de dominio. El selector y las opciones de inicio de este modo solo ofrecen AF01.

El proyectil MAX secundario conserva el mismo gate de un disparo: no avanza ni consume su temporizador cuando `fireAllowed` es falso, el jugador está muerto/sin vida, el juego está pausado o la fase está en cartas/armamento/terminal. Se dispara cuando vuelve a existir una llamada válida de combate.

## Límites de alcance

La modalidad solo acepta AF01, mapeada sobre el modelo runtime `pistol`. No habilita SMG, escopeta, porra, Katana, láser, F24 iniciales ni selección desde MEN-004. El dominio compartido conserva sus perfiles aprobados, pero este ensayo **no** habilita CC04 ni TE01 en la partida. La pareja y la fusión siguen cerradas hasta contar con pose/animaciones validadas e integración de sala; no se realizó ese levantamiento en esta revisión.

El dominio [weapon-revision-r1.js](../../../js/systems/weapon-revision-r1.js) recibió únicamente un callback opcional de materialización en `claimReward`: si la adquisición runtime devuelve `false` o lanza una excepción, revierte la copia y no registra el receipt; sin callback, la API conserva su comportamiento anterior. No se modificaron `expedition.js`, `main`, `dev.html`, TechnicalUI, pautas ni control de cambios. La raíz debe cargar `weapon-revision-trial.js` después de `weapon-revision-r1.js` y antes de `field-stats.js`. `FieldCombat.reset`, invocado al iniciar la expedición, prepara y enlaza la partida r1; no se requiere un hook adicional de reset en `expedition.js`.

## Verificación

- `node --test tests/v2-af01-revision-trial.test.js`: **12/12**. Cubre activación explícita y aislamiento legacy, loadout AF01, progresión independiente de dos copias, cartas/recompensas/MAX, extra real con bono global tras recarga, extra pendiente ante llamadas bloqueadas/muerte, congelación de pausa/cartas/terminal, combate activo después de 5:00, fallo y reintento de adquisición, preview prepartida anterior a `FieldCombat.reset` sin run/copia, gates de vida/fase, reemplazo de terminal y presentación sin ramas.
- `node --test tests/v2-weapon-revision-r1.test.js`: **14/14**, incluida la reversión de copia y reintento cuando falla la materialización runtime.
- `node --test tests/v2-expanded-combat.test.js tests/v2-expanded-terminal.test.js`: **10/10**.
- `node --test tests/v2-infinite-rewards.test.js tests/p04-weapons.test.js`: **6 pruebas y comprobación P04 correctas**.
- `node --test tests/v2-expanded-damage.test.js`: **6/6**.

El ciclo red/green reprodujo primero los defectos del extra sin bono global, el congelamiento indebido a 5:00 y la adquisición parcial; tras las correcciones, esas pruebas y la prueba de reversión/idempotencia del dominio pasaron.

Las pruebas del adaptador usan runtime y proyectiles reales dentro de un entorno mock; verifican integración de módulos y reglas, no un recorrido manual en navegador o dispositivo. No se midieron balance, poses, animaciones ni rendimiento. La rama legacy se mantuvo bajo gates condicionales y pasó las regresiones focalizadas indicadas.
