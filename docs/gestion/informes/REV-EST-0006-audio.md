# REV-EST-0006 — Integración SON-001

**Fecha:** 23/10/2026  
**Lote:** LOT-EST-004 r1 · SON-001 rev. 1.0

## Resultado

El estado real del menú moderno solicita `village` desde `TechnicalUI.state('ui')`; al pasar a `playing` detiene el WAV de menú. El WAV aprobado espera el desbloqueo por gesto del navegador y pasa por una ganancia propia conectada al `musicBus`, por lo que conserva volumen y silencio. Al volver mediante `Game.toUI()` se reutiliza esa misma instancia y se reproduce el tema de menú sin una solicitud directa de la prueba. La música de partida conserva su comportamiento vigente durante pausa y reanudación. Los fundidos sintéticos pendientes se cortan antes de reactivar el WAV para evitar música superpuesta.

Se modificaron `js/core/audio.js`, el hook de estado en `js/ui/technical-ui.js`, `tests/v2-menu-audio.test.js`, `tests/v2-menu-audio-browser.py` y este informe. No se creó ni modificó ningún recurso de audio.

## Recurso fijado

- `assets/audio/menu/presencia-en-la-oscuridad-loop-60s-v1.wav`
- SHA-256: `9ce7902dd22fede902fac5f9b7ea78139076b1d9f50303588431ede5cbe86d24` (coincide con LOT-EST-004 r1).
- Cabecera leída: WAV PCM sin compresión, estéreo, 16 bits, 44,1 kHz, 60,0 segundos; 10.584.044 bytes.

## Verificación

- TDD: los cuatro casos mockaudio fallaron antes del cambio porque el menú aún no cargaba el recurso; después, `node --test tests/v2-menu-audio.test.js` pasó **4/4**. Cubren desbloqueo y ruta del WAV, bus de volumen/silencio, ciclo partida/pausa/regreso sin duplicación y reintento después de rechazo de autoplay.
- `node tools/build.js --local --check`: **correcto**, sintaxis válida de 104 scripts (1951 KB).
- Prueba local en Chromium real, ejecutada con el entorno de Playwright del proyecto: **3/3 viewports pasaron** (390×844, 844×390, 1280×900). En cada uno el elemento multimedia alcanzó reproducción y `AudioContext` quedó activo; el WAV reportó 60 s, loop habilitado, `readyState >= 3` y sin error. También pasaron el límite del loop por búsqueda cerca del final, volumen/silencio, detención del elemento WAV durante partida y pausa, y retorno con `Game.toUI()` reutilizando una sola instancia. Evidencia: `tests/artifacts/rev-est-0006/audio/browser.json`.
- `node --test tests/*.test.js`: **274 pruebas; 268 pasaron, 5 fallaron y 1 se omitió**. Los cinco fallos son de `tests/p05-worker-runtime.test.js` al compilar el runtime SQLite: esbuild recibe “Acceso denegado” al leer `../../../..` y no resuelve `./worker/accounts-object.mjs`. El archivo nuevo de audio pasó dentro de este lote.
- `npm.cmd run build:check`: falló en `tools/build-firebase.js --check` por el mismo acceso denegado de esbuild y porque no pudo resolver `./tools/firebase-client-entry.js`; el paso directo de comprobación del frontend sí pasó.

## Alcance y limitaciones

La prueba de Chromium confirma que el navegador decodifica y avanza el WAV en las tres ventanas; el límite del loop se probó mediante búsqueda cerca del final, no tras escuchar un minuto completo. No hubo audición humana ni prueba en teléfono físico, así que el empalme audible del loop y la experiencia en dispositivos reales quedan pendientes de esa revisión.
