# Roadmap: actualización desde ESTRUCTURA

19/10/2026 · Versión **0.24** · Diseño confirmado; implementación nueva pendiente.

Se consultaron los últimos diez turnos accesibles del hilo **ESTRUCTURA** (`01a1457c-c051-73d2-9864-e7deb6435420`), hasta `01a15409-96d6-72a1-a825-4038ce3a6007`, completado. La lectura alcanzó el corte anterior de cofres; no se afirma haber exportado todo el historial. La [referencia de combate conservada](ESTRUCTURA_COMBATE_2026-10-19_REFERENCIA.md) distingue decisiones y propuestas; no acredita implementación.

## Decisiones que se incorporan

| Confirmado por Iván | Evidencia del hilo | Estado en el juego |
| --- | --- | --- |
| Dos armas elegidas antes de empezar; mejoras de arma solo para las equipadas; tres ofertas aleatorias | `01a1515b-5135-7273-bb10-dc9122a7e754` | Pendiente de adaptar cartas/compatibilidades; el prototipo conserva sus cartas anteriores |
| Las dos armas atacan simultáneamente | `01a15404-6977-77c0-b895-56721a1ba418` | Pendiente: el ejecutable todavía cambia entre un arma activa y otra |
| Hasta tres poderes anómalos; opción de reemplazo cuando aparece un cuarto | Mismo turno | Pendiente: no se añaden además las dos ranuras de apoyo propuestas anteriormente |
| Una ultimate, cooldown largo, obtención por gacha, máximo nivel 5 y progreso difícil | Mismo turno | Pendiente: definir efectos, progresión, costes y autoridad de cuenta |
| Ultimate de efecto único: puede defender, curar, permitir evasión o atacar; ejemplos escudo, curación, fantasma, explosión y meteoritos | `01a15409-96d6-72a1-a825-4038ce3a6007` | Pendiente de catálogo y balance; los ejemplos no son recursos ni habilidades implementadas |
| Gacha incluye armas, ultimates y skins de soldados | `01a15404-6977-77c0-b895-56721a1ba418` | Pendiente: tablas, duplicados y relación con el reclutamiento anterior; no eliminar soldados por inferencia |
| Respetar el lore de SCP al diseñar poderes | Aclaración del usuario en `01a153bd-4dcb-7591-b92d-ce94b5f81049` | Requisito de diseño; no significa transferencia canónica de poderes ni nuevo contenido publicado en SCP Wiki |

Las tres ofertas conservan la referencia de elegir una. Su distribución exacta entre armas, poderes y soldado requiere contrato: los textos proponen mezclas diferentes y ninguna se convierte aquí en aprobación.

## Qué sigue siendo propuesta o decisión abierta

- Categorías/rangos Potencia/Ritmo/Manejo 0–5 y Especialización 0–3; categorías generales y reparto exacto de cartas.
- Catálogo y disponibilidad de poderes; adquisición desde jefes/grietas; pausa, retirada de efectos, herencia o reembolso al reemplazar.
- Valores de cada ultimate, cooldown exacto y reloj entre mapas/pausas/grietas; relación con Sprint/curación del soldado y controles.
- Costes, fragmentos, materiales, duplicados, probabilidades y efectos de las skins. No fijar skins exclusivamente cosméticas como si ya estuviera aprobado.
- No imponer 120 segundos universales ni la antigua escala común 100/105/110/115/120 %. Cada habilidad única necesita su definición propia, sin valores inventados.
- Dos armas iguales o sustitución durante la partida, saturación de cartas y premio de jefe sin candidatos.

## Trabajo incorporado al roadmap activo

| Paso | Trabajo | Dependencias para la adaptación completa | Aceptación necesaria |
| --- | --- | --- | --- |
| RC-07 | Dos armas simultáneas y tres ofertas compatibles con el equipo | RC-01 y RC-02 | Ataques con relojes independientes; compatibilidades correctas; cartas sin armas ajenas ni ramas saturadas; elegir sin bloquear la partida |
| RC-13 | Hasta tres poderes y reemplazo del cuarto | RC-01 y RC-07 | Nunca superar tres; sustitución explícita y retirada de efectos salientes; sin apoyos gratuitos extra; reglas de adquisición/rangos cerradas |
| RC-14 | Una ultimate de efecto único y hasta cinco niveles | RC-01 y RC-07 | Contrato por habilidad: efecto, límites, cooldown/reloj, niveles, relación con habilidad del soldado y controles; no crecimiento permanente desde una carta temporal |
| RC-09 | Colección/gacha de armas, soldados, skins y ultimates según catálogo cerrado | RC-08, RC-01 y RC-14 | Recompensas y costes confirmados por servidor; recibos y duplicados/overflow definidos; compatibilidad de datos |
| RC-11/RC-12 | Recompensas de grieta compatibles y aceptación visual/técnica de la build completa | Incorporan RC-13/RC-14 donde corresponda | Avisos del jefe visibles entre efectos; sin cadenas infinitas, bloqueo permanente de jefes o acumulación de efectos retirados; pruebas de rendimiento y aceptación |

RC-13/RC-14 quedan **pendientes de implementar**, sin peso ni puntos nuevos. El orden de tareas respeta dependencias y no cierra P05 por documentar el combate. Los ensayos aislados no activan economía real.

## Lo que permanece

Mapas de cinco minutos, jefe obligatorio, puerta y soldados a 5:00, cese de apariciones enemigas, remanentes vivos y transición por contacto. Continúan retiradas extracción de fin de partida, mochilas y accesorios físicos. Se conservan las reglas aprobadas de cofres y la escala inicial 160 × 100, todavía pendientes de implementar.

La demo [GitHub Pages](https://deteco.github.io/SCPSurvivor/) conserva el ejecutable publicado en `d85f1f3`; esta actualización cambia seguimiento y documentos, no el juego. La verificación de publicación del 18/10 está conservada en la auditoría local; no se ejecutaron nuevas pruebas de combate hoy.

Se preservan los **53 criterios, estados, dependencias, evidencias y pesos históricos**. El **52/100 es histórico**; V2 sigue sin porcentaje calculado. RC-03–RC-06 conservan el ensayo ya existente y su aceptación pendiente. P05 real y la integración persistente continúan pendientes.

[Roadmap](../ROADMAP.md) · [Pauta vigente](../PAUTA_DESARROLLO.md) · [Plan de cambios](PLAN_CAMBIOS_ESTRUCTURA.md) · [Validación de integridad](ROADMAP_0.24_VALIDACION.json).
