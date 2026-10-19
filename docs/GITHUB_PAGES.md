# Demo web V2 en GitHub Pages

**Actualización vigente 0.25 · B1/B2, 19/10/2026 (A-035/D-331/EV-040):** B1/B2 implementados como prototipo aislado: geometría inicial 160 × 100 y seis nodos alternativos; cuatro intentos de exploración en 60/120/180/240 s con probabilidades/topes por tramo y tickets ficticios en memoria. RC-10 sigue EC, evidenceComplete=false. Aceptación manual y P05 real pendientes; combate 2+3+1, bono de diez minutos/hitos, cofres de jefe/grieta y economía persistente pendientes. [Guía de mapa y cofres](PRUEBA_MAPA_COFRES_V2.md) · [Demo de práctica](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&cofres=prueba) · [Resultados y límites](V2-B1-B2-REPORT.md). Publicación viva pendiente de verificar; consultar el informe antes de afirmar resultados.

18/10/2026 · Iván pidió «Pero quiero probarlo en github subelo». Se publica la primera prueba existente, conservando la pauta ESTRUCTURA y los pendientes de la adaptación.

- [Mapa completo](https://deteco.github.io/SCPSurvivor/).
- [Prueba rápida desde 4:30](https://deteco.github.io/SCPSurvivor/?rapida=1).
- El sitio ya está configurado en GitHub Pages desde `main` y `/`, sin dominio personalizado. No se cambió facturación, visibilidad del repositorio ni configuración Firebase.

## Cambio concreto

El ensayo V2 solo se activaba en loopback. Ahora permite además el origen HTTPS `deteco.github.io` y el prefijo exacto `/SCPSurvivor/`. En ese sitio inicia V2 por defecto; la prueba rápida conserva los 300 segundos por mapa. Dominios ajenos, HTTP y rutas parecidas no habilitan esta excepción. Ningún parámetro de cuentas se combina con V2.

El menú identifica la demo web. No hay servicios locales necesarios para jugar online. El backend propio y la preparación Worker siguen desactivados; no se publican cambios de esos servicios. La partida se pierde al recargar. La publicación original no añadía cofres ni mapa 160 × 100. La entrega B1/B2 actual incorpora esos prototipos; economía, familias nuevas y diseños finales siguen pendientes.

## Verificación antes de publicar

- Tres pruebas fallaron antes del cambio, demostrando que Pages no activaba V2 ni el modo rápido.
- Después: **27/27 pruebas Node** de acceso, director y checkpoints aprobadas.
- Build y build:check aprobados en las copias de desarrollo/publicación: **86 scripts**.
- Dos recorridos Chromium con origen HTTPS virtual: escritorio en mapa completo y táctil emulado en prueba rápida. Inicio/pausa/continuación, crédito, interfaz sin mods, aislamiento de cuentas y checkpoint nulo; sin errores JavaScript, fallos HTTP o solicitudes ajenas al sitio.
- Regresión adicional de fuente/compilado y escritorio/táctil registrada por `tests/v2-map-browser.py`.

La prueba virtual no demuestra el despliegue real. Tras el push se debe consultar el build de Pages y ejecutar `tests/v2-pages-browser.py --live`; el recibo vivo queda en la auditoría local y el resultado de navegador en `tests/artifacts/v2-pages/live/results.json` (artefacto ignorado por Git). No se afirma aceptación humana, balance, rendimiento ni móvil físico por este smoke test.

Comandos locales:

```powershell
node --test tests/v2-map-trial.test.js tests/v2-map-director.test.js tests/p05-checkpoints.test.js
npm.cmd run build
npm.cmd run build:check
python tests/v2-pages-browser.py
python tests/v2-pages-browser.py --live
```

Los dos comandos Python requieren Playwright y Chromium. El primero utiliza archivos locales bajo un origen HTTPS virtual; el segundo consulta únicamente el sitio publicado.

El roadmap 0.23 registra esta publicación de demo, manteniendo 53 tareas y 52/100 históricos; V2 permanece sin porcentaje y P05 sin cierre real. [Pauta del ensayo](PRUEBA_MAPA_V2.md).
