# SCP Survivor

Juego web en desarrollo. **P03-local-01 (alfa 0.3)** incorpora una primera partida completa de prueba sobre los sistemas reutilizados de la base. No es la versión final publicada.

## Esta entrega

- Mapas modulares propios con salas, pasillos y zonas opcionales, generados con semillas reproducibles.
- Expedición que continúa por sectores: neutralización, resistencia de 60 segundos y neutralización por mapa normal.
- Perseguidor y biológico con disparos avisados; jefe Custodio con refuerzos, victoria y huida disponible desde el inicio.
- Extracciones aleatorias desde el sector 3, con garantía tras varios mapas sin extracción. Puedes ignorarlas y seguir.
- Guardia novato a **165 unidades/s (1,5× la velocidad original)**, pistola automática y Sprint.
- Una mejora por nivel ganado y continuación automática tras elegir la última. Descanso de 20 segundos sin mejoras pendientes; Listo permite saltarlo.
- Canvas que ocupa el área disponible del navegador, controles adaptables y pausa al entrar en segundo plano.
- Resumen de extracción o muerte, reinicio y regreso al menú.

El arte es provisional. No hay guardado, cuentas, inventario persistente, reclutamiento adaptado, ranking ni servicios de nube activos. La partida se pierde al recargar la página. Es una alfa intermedia; la meta sigue siendo la primera versión completa publicada.

## Controles

**Ordenador:** WASD/flechas para moverse; Espacio o botón Sprint; teclas 1–3 o clic para elegir mejoras; Esc para pausar.

**Móvil:** arrastra el dedo sobre el área de juego para moverte; utiliza los botones Sprint, Pausa, Listo y salida. El disparo y la recarga son automáticos.

## Abrir el juego

El paquete incluye `index.html` y `js/app.min.js` ya compilados. Desde la carpeta del juego:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre http://127.0.0.1:8000/ . Para revisar las fuentes utiliza `/dev.html`. Conserva las carpetas; no abras el HTML con doble clic.

## Actualización manual

El ZIP de actualización P03 contiene únicamente archivos nuevos o cambiados y el aviso de licencia. Descomprímelo **sobre la entrega P01, P02 o 0.2.1**, reemplazando archivos y conservando sus rutas. No borres los demás archivos ni añadas una carpeta contenedora adicional.

Sube esos archivos a `DETECO/SCPSurvivor`. El paquete se mantiene por debajo de 100 archivos para facilitar una carga desde GitHub. No contiene una actualización de RoadmapSCP. Este hilo no ha realizado commits, subidas ni publicaciones.

## Construcción y pruebas

Herramientas utilizadas: Node 24.19.0, npm 11.9.0 y Terser 5.51.2, fijado en el lockfile.

```sh
npm ci --ignore-scripts
npm run build:check
npm run build
node tests/p02-weapon.test.js
node --test tests/p02-ai.test.js
node tests/p02-upgrades.test.js
node tests/p03-maps.test.js
node tests/p03-pathing.test.js
node tests/p03-biological.test.js
node tests/p03-boss.test.js
node tests/p03-director.test.js
python3 tests/p03-browser.py
```

Las pruebas de navegador requieren Python Playwright y Chromium; no son dependencias del juego. Véase [informe P03](docs/P03-REPORT.md). Se utiliza Chromium en Linux con controles táctiles emulados; Safari e iPhone/Infinix físicos quedan pendientes. La simulación acelerada de la partida no es una medición de FPS.

No instales dependencias de `functions/` ni despliegues servicios. La configuración mantiene deshabilitadas cuentas, nube y service worker.

## Procedencia

Los avisos de código y procedencia se conservan en `LICENSE`, `CREDITS.md` y [ORIGIN.md](docs/ORIGIN.md). Los informes P01 y preparación son históricos; sus hashes no describen esta entrega. El repositorio original permanece separado e intacto.
