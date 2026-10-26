# SONIDO-GRIETAS-001 — Recursos y eventos existentes

**Fecha:** 24/10/2026 · **Alcance:** inventario documental de sonidos para grietas y burbujas de compañeros. No genera, aprueba ni integra audio.

Fuentes: [pauta de SONIDO](../../PAUTA_SONIDO.md), [requisito P09](../../OBSERVACIONES_VISUALES.md), [prueba local de grietas](../../PRUEBA_GRIETAS.md), [sistema actual de grietas](../../../js/systems/dimensional-rifts.js), [sistema heredado](../../../js/systems/rift.js) y [G.Audio](../../../js/core/audio.js). El informe de [integración de SON-001](../informes/REV-EST-0006-audio.md) acredita el sonido del menú; no aprueba sonidos de grieta o compañero.

| Momento | Recurso o evento existente y estado | Hook posible | Carencia |
|---|---|---|---|
| Aparición/alerta de grieta | P09 conserva como requisito una alerta sonora. El prototipo actual llama `G.Audio.sfx('riftOpen')` desde `DimensionalRifts.offer`; el propio código lo llama provisional. No hay recurso final de grieta aprobado. | Mantener `riftOpen` como cue provisional al abrir hasta que SONIDO presente un reemplazo aceptado. | Aprobación auditiva final y correspondencia con las seis apariencias visuales NIV-GRI-009 siguen pendientes. |
| Entrada/contacto | El ingreso instantáneo por contacto está aprobado como regla. El sistema actual `DimensionalRifts.enter` no dispara audio. El sistema heredado dispara el genérico `rift` al entrar, sin aprobación específica recuperada para la nueva transición. | Punto de transición a recinto al completar `enter`; podría reutilizarse `rift` solo tras confirmar que el recurso sigue vigente y encaja. | Falta un cue aprobado para la transición al recinto separado. |
| Inicio de anomalía/encuentro | El sistema heredado usa `boss` al aparecer su jefe. Es un efecto genérico existente, no una identidad sonora aprobada para anomalías. | Punto de aparición de la anomalía en el recinto propio. | Sin cue aprobado específico; las variantes visuales no tienen asignación sonora. |
| Escape/expulsión | El sistema heredado usa `back` cuando la grieta expulsa al jugador. No equivale a una aprobación para la nueva retirada de cinco segundos. `DimensionalRifts.complete('evaded')` no tiene hook de audio. | Resolución de retirada/escape y posterior retorno al origen. | Falta definir y aceptar el sonido para retirada y retorno del flujo nuevo. |
| Victoria/retorno | En el sistema heredado, `legend` acompaña la victoria; el retorno final no tiene cue dedicado. No es evidencia de aprobación para el nuevo flujo. | Resolución de victoria y regreso al punto de entrada. | Falta confirmar si se reutiliza un cue vigente y si retorno necesita evento propio. |
| Burbujas del compañero | Diálogo en burbujas y **sin locución**. La pauta dice que SONIDO diseñará un sonido característico; no consta recurso aceptado. | Evento de presentación/intervención de burbuja, después de una aceptación explícita del recurso. | Diseñar, presentar y aceptar el sonido. Hasta entonces, el compañero queda en silencio. |

## Límite operativo

Los recursos/hooks anteriores son evidencia de código o requisitos; los cues `riftOpen`, `rift`, `boss`, `back` y `legend` no constituyen aprobación auditiva final para el flujo nuevo. La ausencia de sonidos finales no bloquea salas, combate ni textos aprobados de LOT-EST-005 r1. PROGRAMACION puede continuar esas partes con el compañero en silencio hasta que exista un sonido característico aceptado.
