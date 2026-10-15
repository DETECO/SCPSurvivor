# SCP Survivor

Juego web en desarrollo. **P04-local-01 (alfa 0.4)** amplía la expedición con soldados, armas y modificaciones sobre los sistemas reutilizados de la base. No es la versión final publicada.

## Esta entrega

- Mapas modulares propios con salas, pasillos y zonas opcionales, generados con semillas reproducibles.
- Expedición que continúa por sectores: neutralización, resistencia de 60 segundos y neutralización por mapa normal.
- Perseguidor y biológico con disparos avisados; jefe Custodio con refuerzos, victoria y huida disponible desde el inicio.
- Extracciones aleatorias desde el sector 3, con garantía tras varios mapas sin extracción. Puedes ignorarlas y seguir.
- Guardia con Sprint y médico con curación instantánea; ambos a **165 unidades/s (1,5× la velocidad original)**.
- Pistola, subfusil y escopeta; dos copias equipadas, incluso del mismo modelo, con munición, recarga y nivel independientes.
- Seis mods compatibles, dos por arma; selección antes de empezar y cambios confirmados durante la preparación.
- Fórmulas aditivas, topes aprobados y cartas parciales; el arma apunta por separado del movimiento del soldado. Las paredes bloquean la perforación.
- Al subir un nivel, la partida se pausa inmediatamente para elegir UNA mejora y luego continúa en la misma oleada. Si sobra XP para otro nivel, se procesa después de esa elección. No se guardan elecciones para el cierre de oleada.
- Descanso de 20 segundos entre oleadas, separado de las subidas de nivel; Listo permite saltarlo.
- Canvas que ocupa el área disponible del navegador, controles adaptables y pausa al entrar en segundo plano.
- Resumen de extracción o muerte, reinicio y regreso al menú.

El arte es provisional. No hay guardado, cuentas, inventario persistente, reclutamiento adaptado, ranking ni servicios de nube activos. La partida se pierde al recargar la página. Es una alfa intermedia; la meta sigue siendo la primera versión completa publicada.

## Controles

**Ordenador:** WASD/flechas para moverse; Q/E para seleccionar arma; Espacio o botón de habilidad; teclas 1–3 o clic para elegir mejoras; Esc para pausar.

**Móvil:** arrastra el dedo sobre el área de juego para moverte; toca un arma o la habilidad del soldado. Disparo y recarga son automáticos. Los mods se editan durante preparación; su cuenta atrás sigue avanzando.

## Abrir el juego

El paquete incluye `index.html` y `js/app.min.js` ya compilados. Desde la carpeta del juego:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre http://127.0.0.1:8000/ . Para revisar las fuentes utiliza `/dev.html`. Conserva las carpetas; no abras el HTML con doble clic.

## Actualización manual

El ZIP de actualización P04 se aplica **sobre la entrega P03 (incluidos los ajustes 0.3.1/0.3.2)**, reemplazando archivos y conservando sus rutas. Incluye el ajuste de elección inmediata. No borres los demás archivos ni añadas una carpeta contenedora adicional.

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
node tests/p04-stats.test.js
node tests/p04-abilities.test.js
node tests/p04-weapons.test.js
node tests/p04-collisions.test.js
node tests/p04-props.test.js
python3 tests/p04-browser.py
python3 tests/p03-levels.py
python3 tests/p03-browser.py
```

Las pruebas de navegador requieren Python Playwright y Chromium; no son dependencias del juego. Véanse [informe P04](docs/P04-REPORT.md), [informe P03](docs/P03-REPORT.md) y [elección inmediata 0.3.2](docs/P03-0.3.2-REPORT.md). Se utiliza Chromium en Linux con controles táctiles emulados; Safari e iPhone/Infinix físicos quedan pendientes. La simulación acelerada de la partida no es una medición de FPS.

No instales dependencias de `functions/` ni despliegues servicios. La configuración mantiene deshabilitadas cuentas, nube y service worker.

## Procedencia

Los avisos de código y procedencia se conservan en `LICENSE`, `CREDITS.md` y [ORIGIN.md](docs/ORIGIN.md). Los informes P01 y preparación son históricos; sus hashes no describen esta entrega. El repositorio original permanece separado e intacto.
