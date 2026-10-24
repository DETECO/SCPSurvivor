# REV-EST-0006 — Informe del director aislado de grietas

**Fecha:** 23/10/2026  
**Lote:** LOT-EST-001 r1  
**Revisiones aplicadas:** EST-GRI-001 r1; reglas de pesos previas de peligrosidad 50/32/8/7/3; REV-EST-0006.

## Resultado

Implementé un núcleo aislado en `js/systems/rift-director.js`. Expone `G.RiftDirector` para carga clásica del navegador y CommonJS para ensayos de Node. No modifica `G.DimensionalRifts` ni inicia encuentros.

El contrato del módulo es:

- `create({ rng })` crea un director independiente; el RNG puede inyectarse para reproducir los ensayos.
- `startMap(mapId, mapNumber)` abre o conserva el estado en memoria del mapa. Solo una identidad/ordinal nuevo reinicia el contador; el mapa 1 queda excluido.
- `advanceTo(activeSeconds)` recibe el reloj activo de origen y resuelve una sola vez cada cruce de 60, 120, 180 y 240 segundos. No hay evento en 0 ni en 300 segundos. Si la llamada cruza varios umbrales, los procesa en orden.
- Cada solicitud identifica el ordinal, tipo y valor de `mapId`, además del umbral. Una confirmación tardía de otro ordinal queda como `unknown_request` aunque el identificador del mapa se reutilice.
- Una tirada menor que 0,5 solicita aparición; esa solicitud recibe un tier por sorteo condicional 1–100 con rangos D1 1–50, D2 51–82, D3 83–90, D4 91–97 y D5 98–100.
- `confirmAppearance(requestId)` confirma que el adaptador abrió el portal. La cuenta incluye solo apariciones confirmadas y la confirmación repetida no incrementa el total.
- `failAppearance(requestId, failure)` conserva el detalle opaco del fallo, no incrementa apariciones y no cambia el tier solicitado. El director no selecciona ni sustituye ubicaciones.
- Solicitudes con tier pendiente reservan cupo para mantener el máximo de dos confirmaciones si varias oportunidades se procesan en una sola actualización; aún no cuentan como apariciones. Si no queda cupo entre confirmadas y pendientes, el umbral queda registrado como omitido sin tirada. Una falla libera la reserva para umbrales futuros, pero el umbral consumido no se vuelve a sortear.
- `restoreForTest(snapshot)` restaura una copia de estado solo en memoria para ensayos; no usa almacenamiento local, servicios ni guardado de expedición.

El director exige un reloj monótono por mapa. La pausa y el interior de un recinto deben conservar el reloj de origen; al reanudar, pasar el mismo valor no produce una oportunidad nueva.

## Comprobaciones ejecutadas

- **Red:** la suite falló con el director sin comportamiento implementado. Se corrigieron las expectativas del contrato y se mantuvo el orden prueba antes de implementación.
- **Red/verde de la revisión de IDs:** el caso nuevo reprodujo que el mismo `mapId` producía el mismo ID de solicitud en los ordinales 2 y 3; una confirmación tardía podía confirmar la solicitud actual. Tras incorporar el ordinal y la identidad tipada al ID, `node --test tests/v2-rift-director.test.js` — **8/8 aprobadas**. Incluye además mapa 1, umbrales, 50/50, límites de tier, cupo, idempotencia, fallas, restauración, reloj y RNG.
- **Regresión cercana:** `node --test tests/rifts.test.js tests/rift-boss.test.js tests/v2-rift-visuals.test.js` — **21/21 aprobadas**.
- **Carga de navegador:** prueba de VM clásica confirmó que el archivo expone `G.RiftDirector.create`.

## Alcance pendiente

Este resultado acredita el cálculo aislado y sus transiciones de confirmación/fallo. Sigue pendiente conectar la carga del módulo. No acredita selección/alcanzabilidad de ubicación, catálogo compatible de encuentros, integración con el calendario o el mapa, entrada/retorno, encuentros, premios, balance, persistencia real ni aceptación jugable. El estado simulado restaurable no prueba guardado ni migración.
