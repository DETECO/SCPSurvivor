# P06 inventario local Implementation Plan

> **For agentic workers:** ejecución local, pruebas antes del modelo y revisión independiente antes de entrega.

**Goal:** Iniciar P06-T01 con inventario físico gestionable y probado, sin confundir el prototipo con autoridad de servidor.

**Architecture:** `G.InventoryModel` puro y transacciones inmutables; `G.InventoryTrial` adapta copias al FieldCombat existente y presenta borrador/confirmación. Opt-in sin cuentas; no cambia esquemaP05.

**Tech Stack:** JavaScript/Canvas2D/DOM existentes, node:test, esbuild/Terser actual y Playwright aislado.

## Global Constraints

- Conservar catálogo3armas/6mods, dos copias/armas, mochilas8/16, almacén60, velocidad165, IDs y tiempos de arma.
- No kit/recompensas/inventario de cuenta ficticiamente definitivo. Buzón, pérdidas y resultados pendientes siguen pendientes.
- Sin Firebase real, GitHub, rediseño ni modificaciones a sources/ o respaldos anteriores.

## Task 1: Modelo

Files: `js/systems/inventory-model.js`, `tests/p06-inventory.test.js`.

Interfaces: `fixture(loadout)`, `validate(state)`, `apply(state,command,phase)` devuelve nuevo estado o lanza Error sin mutar; `loadout(state)` adapta IDs físicos y mods instalados al catálogoP04.

- [x] Tests fallidos de identidad, ocupación,8/16,60, intercambio arma/mod/mochila, límites, fases y atomicidad.
- [x] Implementación mínima y pruebas verdes.

## Task 2: Gestión local y equipo entre oleadas

Files: `js/ui/inventory-trial.js`, `js/ui/technical-ui.js`, `js/systems/expedition.js`, `dev.html`, `css/technical.css`.

- [x] Opt-in loopback sin cuentas, fixtures claramente rotulados; prueba directa en preparación.
- [x] Panel base/preparación con borrador; confirmar o cancelar, reloj sigue y descarta al vencer. Preservar FieldCombat.shotWait/switchRemaining/shots y copia/ammo/reload/level al adaptar.
- [x] Integrar sin alterar selección/ejecución de modo normal o P05 ni habilitar checkpoint del prototipo.

## Task 3: Verificación y contexto

- [x] SuiteNode, build/check, navegador aislado fuente/compilado escritorio/móvil emulado; cambios/limitaciones documentados.
- [x] Roadmap: A-024 inicioP06 local, P06-T01EC, resto pendiente; conservar pesos/criterios/52puntos y aceptaciónP05.
- [x] Instrucciones de prueba, diff y próximo tramo: inventario confirmado por servidor antes de cerrarP06-T01.
