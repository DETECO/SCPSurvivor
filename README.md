# SCP Survivor

Juego web en desarrollo. Esta entrega **P01-local-01** permite abrir un menú propio y recorrer una escena provisional con el guardia novato. Conserva y adapta los sistemas de la base; no es todavía la primera partida completa ni la versión final.

## Qué funciona en esta entrega

- Arranque desde `dev.html` y desde `index.html` compilado.
- Movimiento con WASD/flechas y joystick táctil flotante; ocho direcciones.
- Cámara, colisiones y dibujo de terreno reutilizados. El área de mundo visible de esta escena es 768 × 768 unidades en ambas orientaciones.
- Sprite geométrico propio provisional de ocho direcciones con animación de marcha.
- Pausa manual y al perder foco o entrar en segundo plano; regreso al menú y reinicio de la escena.
- Configuración local sin cuentas, Firebase, altas, social, cooperativo, ranking ni service worker activo.

Todavía no hay combate, oleadas, recompensas, inventario, gacha adaptado ni guardado de expedición. Sus módulos de origen se conservan para las siguientes fases; no se presentan como funciones terminadas. El arte y el sector de prueba son provisionales.

## Probarlo en tu ordenador

El ZIP ya contiene `index.html` y `js/app.min.js`. Para verlos no necesitas reconstruir el juego:

1. Descomprime los archivos conservando las carpetas.
2. Desde esa carpeta inicia un servidor local con Python: `python -m http.server 8000 --bind 127.0.0.1` (en Linux puede llamarse `python3`).
3. Abre http://127.0.0.1:8000/ en el navegador. Para revisar las fuentes abre http://127.0.0.1:8000/dev.html.

No abras el HTML con doble clic: las pruebas de esta entrega utilizan HTTP local. Publicar en Firebase Hosting será una fase posterior; subir los archivos a GitHub no publica por sí solo el juego.

## Reconstruir

Se verificó Node **24.19.0**, npm **11.9.0** y Terser **5.51.2**. Terser es la herramienta que ya utilizaba la base; ahora su versión y dependencias quedan fijadas en el lockfile. No se ha probado otra versión de Node.

```sh
npm ci --ignore-scripts
npm run build:check
npm run build
```

Edita `dev.html` y los módulos JS; `index.html` y `js/app.min.js` son resultados generados. `PREPARATION_ONLY` identifica la entrega local; `--local` permite construirla sin habilitar servicios. No instales dependencias de `functions/` ni despliegues su configuración.

## Pruebas

`python3 tests/p01-browser.py` utiliza Playwright y Chromium del entorno de desarrollo. Documentación de entorno, recorridos y límites en [P01-REPORT.md](docs/P01-REPORT.md). Las dependencias de pruebas no son dependencias del juego. Esta entrega se comprobó con Chromium en Linux y táctil emulado; Safari y los teléfonos físicos siguen pendientes.

## Subida manual a GitHub

Destino: https://github.com/DETECO/SCPSurvivor

- Arrastra las carpetas desde un ordenador para conservar rutas; no añadas una carpeta contenedora extra.
- GitHub admite menos de 100 archivos por carga. Divide en dos lotes, por ejemplo `js/`, `css/`, `assets/`, `functions/`, `tools/` primero; `docs/`, `tests/` y archivos raíz después. Comprueba el contador antes de confirmar cada lote.
- Incluye archivos ocultos de configuración/ignore cuando uses Git desde tu ordenador. No subas `node_modules/`, cachés ni logs.
- La actualización de RoadmapSCP se entrega por separado: añade `RoadmapSCP.json` y `RoadmapSCP.md` juntos. No mantengas dos registros editables; JSON es la fuente.

No se han hecho commits ni subidas remotas desde este hilo. Los nombres visibles usan SCP Survivor; los avisos de código, recursos y procedencia se conservan en `LICENSE`, `CREDITS.md` y documentación.

## Procedencia y aislamiento

Consulta [ORIGIN.md](docs/ORIGIN.md), [ISOLATION.md](docs/ISOLATION.md), [manifiesto de preparación previa](docs/source-manifest.json) y [PREPARATION-REPORT.md](docs/PREPARATION-REPORT.md). Los dos últimos describen **preparacion-01**, anterior a esta escena; no son hashes ni resultados actuales. `docs/upstream-reference/` contiene referencias históricas inactivas, sin instrucciones para configurar servicios propios.
