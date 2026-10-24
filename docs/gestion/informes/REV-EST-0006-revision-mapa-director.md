# REV-EST-0006 — Revisión acotada de M01 y director de grietas

23/10/2026 · Revisión de código y contratos de LOT-EST-001 r1 / LOT-EST-003 r1. No se editaron fuentes ni se ejecutaron suites.

## Hallazgo concreto

**Confirmaciones pueden cruzarse entre mapas si se reutiliza el mismo `mapId`.** En `js/systems/rift-director.js:79`, el estado distingue el mapa por el par `mapId`/`mapNumber` y lo reinicia cuando cambia cualquiera. Sin embargo, `resolveOpportunity()` construye el identificador solo con `String(mapId)` y el umbral (`:85`); `confirmAppearance()` busca únicamente ese ID en el estado actual (`:136–153`). Por ejemplo, `mapId=7, mapNumber=2` y `mapId="7", mapNumber=3` producen ambos `7:rift:60`. Si una respuesta atrasada del adaptador del primer mapa llega cuando el segundo tiene una solicitud en ese umbral, puede confirmar la solicitud nueva y consumir su cupo con la respuesta anterior.

Esto afecta la asociación de confirmación con su mapa/tier. Conviene incorporar `mapNumber` o una generación única al ID y conservar esa identidad al confirmar. La colisión está habilitada por los tipos de `mapId` que `startMap()` acepta (`:72–80`); no depende de estado de restauración corrupto.

## Contratos revisados sin falla concreta

- **LOT-EST-001:** el código usa oportunidades 60/120/180/240 s, omite mapa 1, consume cada umbral una vez y aplica 50/50 más los pesos 50/32/8/7/3. Las confirmaciones repetidas son idempotentes; una solicitud fallida no suma aparición; un estado válido restaurado conserva umbrales y apariciones. El límite de dos se comprueba al crear solicitudes y al confirmarlas. La restauración disponible se llama `restoreForTest`; este resultado no acredita persistencia de expedición ni integración con el adaptador, que LOT-EST-001 deja fuera del núcleo aislado.
- **LOT-EST-003:** `scene-m01-a.js` declara límites 0–239 y 0–159 (240×160), revisión A, seis familias y geometría separada de R7. La selección de `expedition.js:37–40` aplica la revisión a la prueba expandida/de grieta y pasa su `sceneRevision` a la cámara; el resto de mapas vuelve a vista estándar. `camera.js:22–30` limita a 512 unidades de ancho solo en vertical para esta revisión y recalcula al cambiar orientación.
- **Navegación y render:** el fixture marca navegación estática y `pathing.js:27–41` acota el campo a sus límites e invalida la máscara cuando cambia el fixture. `world.js:76–77` trata el borde como pared. El renderer R7 usa `sceneRevision` para el tratamiento compacto (`scene-r7.js:43–46`), dibuja los props visibles según la cámara (`:60–75`) y comparte el ID de layout que expone M01. No encontré una discrepancia concreta de límites o selección en estas rutas.

Se inspeccionaron los contratos y las pruebas fuente correspondientes, incluida `tests/v2-rift-director.test.js` y `tests/v2-m01-option-a.test.js`; no se volvieron a ejecutar las suites ya verificadas por el root.
