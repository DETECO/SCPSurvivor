# SCP Survivor

Juego web en desarrollo. **P02-local-01 (alfa 0.2)** incorpora una primera partida completa de prueba sobre los sistemas reutilizados de la base. No es la versión final publicada.

## Esta entrega

- Guardia novato con velocidad base **165 unidades/s: 1,5× la velocidad original de 110**.
- Pistola automática, cargador, recarga y Sprint; enemigos que avisan antes de golpear.
- Dos sectores provisionales conectados, tres oleadas por sector, experiencia y elección de mejoras temporales.
- Preparación de 20 segundos entre oleadas, con botón Listo para continuar antes. Elegir mejoras detiene sus temporizadores.
- Paso al segundo sector conservando el personaje. Extracción confirmada de tres segundos en el segundo sector; moverse la cancela.
- Derrota, resumen, reinicio y regreso al menú. Pausa manual y al entrar en segundo plano.

Los mapas, enemigos y arte son provisionales. Esta extracción en el segundo sector pertenece al recorrido mínimo de prueba; no modifica el diseño posterior del juego. No hay guardado, cuentas, inventario persistente, reclutamiento adaptado, ranking ni servicios de nube activos. La partida se pierde al recargar la página.

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

El ZIP de actualización P02 contiene únicamente archivos nuevos o cambiados y el aviso de licencia. Descomprímelo **sobre la entrega P01**, reemplazando archivos y conservando sus rutas. No borres los demás archivos ni añadas una carpeta contenedora adicional.

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
python3 tests/p02-browser.py
```

Las pruebas de navegador requieren Python Playwright y Chromium; no son dependencias del juego. Véase [informe P02](docs/P02-REPORT.md). Se utiliza Chromium en Linux con controles táctiles emulados; Safari e iPhone/Infinix físicos quedan pendientes. La simulación acelerada de la partida no es una medición de FPS.

No instales dependencias de `functions/` ni despliegues servicios. La configuración mantiene deshabilitadas cuentas, nube y service worker.

## Procedencia

Los avisos de código y procedencia se conservan en `LICENSE`, `CREDITS.md` y [ORIGIN.md](docs/ORIGIN.md). Los informes P01 y preparación son históricos; sus hashes no describen esta entrega. El repositorio original permanece separado e intacto.
