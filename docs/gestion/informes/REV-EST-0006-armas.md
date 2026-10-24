# REV-EST-0006 — Progresión y primera fusión de armas

> Informe de dominio/visor del agente. El estado posterior de AF01 integrado, **14/14** pruebas de dominio y sus gráficos/navegador se registra en [REGISTRO_IMPLEMENTACION](../REGISTRO_IMPLEMENTACION.md). CC04/TE01/F24 mantienen los límites descritos aquí.

**Fecha:** 24-10-2026  
**Revisión implementada:** LOT-EST-002 r1 / EST-ARM-001 r1  
**Estado:** dominio aislado probado; integración de partida y recorrido completo pendientes.

Se implementó un módulo nuevo de dominio, pruebas focalizadas y un visor técnico para los diez modelos ARM-VIS-001/R1, además de la inspección específica de la pareja CC04 + TE01. No se modificaron módulos actuales compartidos, menús, scripts de compilación, pautas ni registros centrales. El visor y el módulo no equipan armas en la partida.

**Fuentes aprobadas revisadas:** [LOT-EST-002 r1](../lotes/LOT-EST-002-r1.md), [cierre EST-ARM-001 r1](../../CIERRE_ARMAS_PROGRESION_FUSION_V1.md), [catálogo direccional](../../referencias/armas/armas-prueba-direccionales-v1/catalogo.json), [catálogo de personajes](../../../js/data/character-catalog.js) y [renderer existente](../../../js/ui/personajes-art.js).

## Cobertura por fase

| Fase | Estado | Evidencia y límite |
| --- | --- | --- |
| A — Montaje | **Visor completo; aceptación técnica de pose pendiente** | [Visor](../../../visor-armas-revision-r1.html): diez modelos, ocho direcciones, 16/32 px, G/A/S y los PNG reales; 164/164 imágenes locales cargadas en navegador. La calibración final de anclajes y la validación de pareja/animaciones no quedan aprobadas por la inspección. |
| B — Dominio de combate y progresión | **Implementado como dominio aislado; no integrado** | [Módulo](../../../js/systems/weapon-revision-r1.js) y [13 pruebas](../../../tests/v2-weapon-revision-r1.test.js): perfiles, escala, copias, ofertas, recompensas, extras MAX, cobertura de los 160 PNG direccionales y aplicación global única sobre F24. No controla puntería, proyectiles, munición real, pausa ni UI de partida. |
| C — Práctica de fusión | **Transacción modelada; práctica jugable pendiente** | La API prueba estación desde mapa 2, vista previa, cancelar, confirmación única, consumo, resultado FINAL y reemplazo. Faltan la sala transitable, menú, pausa/congelación y conexión con las recompensas existentes. |
| D — Recorrido completo | **Pendiente** | No hay recorrido de combate integrado, prueba de paredes/rangos en la partida, prueba de balance o medición de rendimiento. La vista del visor es una inspección estática de anclajes, no una aceptación final de poses ni animaciones. |

## Dominio implementado

El módulo publica `G.WeaponRevisionR1`, identificado como `LOT-EST-002-r1`. Conserva perfiles fijados en el cierre aprobado:

- AF01: daño 10, intervalo 0,5 s, cargador 12, recarga 1,5 s y alcance 320.
- CC04: daño 14, intervalo 0,8 s, alcance 72, arco 140° y hasta cuatro objetivos.
- TE01: daño 14, ciclo completo 0,8 s, emisión 0,12 s, alcance 288 y primer blanco válido.
- F24: 36 de daño, ciclo 0,72 s, reparto 60/40, corte de 140°/alcance 83/hasta 3 objetivos y proyección de alcance 124/hasta 2; máximo 4 enemigos distintos por ciclo.

Cada copia progresa `1 → 2 → 3 → 4 → 5 → MAX` en cinco ascensos. Nivel 2 aplica daño ×1,15; nivel 3, intervalo ×0,90; nivel 4, alcance ×1,15; nivel 5 reemplaza el daño por ×1,30 total. Las copias iguales mantienen progreso independiente. Las ofertas excluyen copias ausentes y MAX; al estar llenas las dos ranuras, una recompensa válida sube una copia elegible. El premio se registra por `rewardId` y no se duplica al reintentarlo.

Los extras MAX son locales a cada copia: AF01 añade una bala al mismo objetivo en el primer disparo tras recargar, con daño local ×0,40 y demora 0,12 s; CC04 amplía cada cuarto corte a 180° y hasta cinco blancos; TE01 permite un segundo objetivo alineado en cada cuarta emisión. F24 aplica cada multiplicador general entregado por el integrador una sola vez al resultado compuesto: daño, ciclo y alcance efectivo. Sin modificador de alcance, conserva los límites base 83/124; no se añadió una fuente nueva de alcance global. F24 limita objetivos ya filtrados por el sistema de mundo. La comprobación de obstáculos y el orden geométrico de objetivos corresponden al integrador.

El inicio seguro del módulo es AF01. CC04 solo puede iniciar con `fusionPractice: true`, para la práctica local aprobada; TE01 debe obtenerse como recompensa; F24 es solo resultado de fusión y no puede ser inicial. En `effective(F24, modifiers)` y `resolveF24Cycle`, `intervalMultiplier` escala el ciclo 0,72 una vez; `rangeMultiplier` escala los alcances base 83/124 una vez si el integrador entrega un modificador existente. Con valores omitidos se conservan ciclo y límites base. El ensayo general vigente aporta daño y cadencia, no un bono global de alcance; la especialización de las ramas de arma antiguas fue sustituida y no se trasladó. Esta API no incorpora un selector desde MEN-004 ni convierte su galería en selector funcional.

## Validación de recursos y pareja CC04 + TE01

La prueba automática lee el catálogo y valida 160 PNG: diez modelos por ocho direcciones en 16 y 32 px, con dimensiones y firma PNG verificadas. Confirma G/S en las 160 vistas y presencia opcional de A. El catálogo no declara A para AR01 y AN09; el visor no inventa ese punto. F24 aparece como recurso visual para inspección, no como arma inicial o selector de partida. En navegador se cargaron 164/164 PNG: los 160 del catálogo más los cuatro `Partes.png` de Guardia/Médico en ambas resoluciones.

G/A/S continúan marcados como estimaciones. La vista individual superpone el arma real al rig existente y conecta G; cuando el catálogo declara A, el otro brazo muestra el ajuste geométrico estático. En la vista simultánea CC04 + TE01 se cargan sus PNG reales sobre el rig de Guardia o Médico y se asigna un brazo existente a cada G. Los A permanecen visibles sin mano asignada.

**Conclusión de compatibilidad:** el visor permite observar ajuste estático de ambos G con los dos brazos, uno por arma, en las ocho direcciones y ambos tamaños. Esto no acredita poses actuales jugables: `PersonajesArt.drawWeapons` solo admite `pistol`, `smg`, `shotgun` y `baton`, y no tiene montaje de runtime para CC04/TE01. No hay evidencia de si A es obligatorio ni animaciones de preparación, ataque y recuperación. La pareja sigue cerrada.

El recurso concreto que falta en PERSONAJES/ARMAS es una pose simultánea CC04 + TE01 para el rig actual de dos brazos, con un brazo por arma, ocho direcciones y 16/32 px, que resuelva y documente el rol de A dentro de esa pose y se acompañe de sus animaciones. Si ambos A requieren una mano dedicada, la pose/arte debe resolver esa dependencia antes de validar la pareja. No se propone aumentar extremidades, usar arnés ni simular esos apoyos como una solución jugable.

Por este límite, el módulo no acepta una pareja por defecto. Solo abre el gate si el integrador le entrega evidencia explícita con `status: "validated"`, ambas resoluciones, ocho direcciones, Guardia y Médico, layout `one-arm-per-weapon` e `evidenceId`. El visor presente no produce esa evidencia.

## API de integración para la raíz

1. Cargar el archivo nuevo y registrar `WeaponRevisionR1` en el arranque. No conectar MEN-004 a `startingModel`.
2. Inicio normal: `createRun({ id })` (AF01). Práctica de fusión: `createRun({ id, startingModel: 'CC04', fusionPractice: true })`. El segundo hueco debe llegar con `claimReward(run, { rewardId, model: 'TE01' })`.
3. Obtener cartas desde `weaponOffers(run)` y subir por ID de copia con `advanceCopy(run, copyId)`. Para saturación, `claimReward` escoge entre copias elegibles; para objetivo explícito recibe `copyId`. El planificador externo de premios debe garantizar el siguiente premio de jefe si el hueco sigue vacío; este módulo solo procesa el premio que el juego le entrega.
4. Llamar `effective(copy, modifiers)` para estadísticas locales y bonos globales. `resolveAttack(run, copyId, { targetIds })` devuelve el descriptor mecánico; el integrador debe filtrar blancos por puntería 360°, paredes y alcance, y aplicar la munición/cooldowns reales.
5. Al entrar en mapa usar `enterMap(run, mapNumber)`/`station(run)`. La API declara disponible la estación desde mapa 2; no reserva ni coloca una coordenada transitable.
6. La UI presenta `previewFusion(run, componentIds)`, permite `cancelFusion(run)` y confirma una sola vez mediante `confirmFusion(run, { transactionId, componentIds })`. Solo después de validar la pose real debe pasarse `fusionPoseValidation`; mientras falte, la estación permanece visible pero la fusión cerrada.
7. Para reemplazo, `replaceCopy(run, { transactionId, copyId, newModel, terminalAuthorized: true })` genera una copia nivel 1. No restaura componentes ni el uso de expedición.
8. Para F24, entregar a `resolveF24Cycle(copy, { cutTargets, projectionTargets, damageMultiplier, intervalMultiplier, rangeMultiplier })` listas ya filtradas/ordenadas por el mundo y únicamente multiplicadores generales que existan en el integrador. Cada multiplicador se aplica una vez; sin uno de alcance, los límites son 83/124. El integrador mantiene paredes, punto real de emisión, colisiones y un contacto máximo por fase/objetivo/ciclo.

`station`, transacciones y recibos viven en estado privado del módulo por instancia de ejecución. La serialización/restauración de una expedición no está implementada en este lote. El módulo tampoco sustituye las reglas de poderes, mejoras generales, ultimates ni la persistencia.

## Pruebas realizadas y límites

Comando ejecutado desde `SCP-SURVIVOR`:

```text
node --test tests/v2-weapon-revision-r1.test.js
tests 13 · pass 13 · fail 0
```

También pasaron `node --check` para el módulo y el visor. En navegador se verificaron los diez modelos, cada uno con ocho tarjetas y marcas G/A/S en 16 y 32 px, y el estado 164/164 recursos. Se inspeccionó la pareja simultánea CC04+TE01 para Guardia y Médico en ambas resoluciones; cada montaje usa los dos brazos existentes, un G por arma, y deja A visible sin mano. La prueba de catálogo comprueba integridad y dimensiones de todos los PNG. Esto no valida poses animadas ni compatibilidad runtime.

Las pruebas de fusión usan un fixture sintético completo para comprobar la transacción; **no** es evidencia de pose real. No se ejecutó juego, compilación, automatización de navegador sobre combate, prueba en dispositivo, pruebas de rendimiento ni balance. F24 no filtra paredes sin la integración de mundo. La entrega permanece local, sin publicación y sin cambios en registros centrales.
