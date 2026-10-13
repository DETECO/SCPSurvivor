# P01 — primer arranque y escena controlable

**Versión:** P01-local-01. **Fecha:** 13/10/2026 (America/Santiago). Base main/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6; copia original intacta. Copia propia /workspace/scp-survivor, sin commit nuevo ni subida verificados.

## Resultado

Menú propio, guardia provisional animado, movimiento/colisión, cámara y controles en una sala fija con paredes y apertura. Escena local de entrenamiento, no expedición ni primera partida completa H-001. Combate, oleadas, experiencia, extracción, gacha/economía/cuentas siguen pendientes.

- Bucle RAF y control de tiempo/pausa en Game conservados con rama técnica.
- Se instancia Player y se reutiliza su actualización de movimiento y dibujo. No se escribió otro motor de movimiento.
- World conserva chunks, cachés, autotiling, render y colisión; fixture limitado a esta escena provisional. No sustituye la generación definitiva de salas.
- Camera/Input/Touch/Sprites reutilizados. Touch adapta coordenadas al canvas desplazado; se limpian entradas al pausar/perder foco.
- Content fija solo catálogo/metadata provisionales y paleta de la escena. Sprites admite una ruta propia para las dos hojas SVG del guardia; no se descargaron sprites faltantes originales.
- Marca visible propia; copyright/licencias/procedencia intactos en archivos distribuidos.

## Entorno

Linux, Chromium154.0.8037.57, Node24.19.0, npm11.9.0, Terser5.51.2 exacto/lock. Servidor HTTP temporal ligado a127.0.0.1, sin Firebase/emuladores/Functions. Pruebas Chromium1280×900 escritorio y390×844 táctil emulado/DPR3, también orientación844×390. DPR interno limitado a1,5 por el motor. **No Safari ni teléfonos físicos.**

## Procedimiento y resultados

1. `npm run build:check`: scripts locales válidos, minificación en memoria, sin escritura.
2. `npm run build`:66scripts concatenados en orden; bundle941KB aproximados. Dos construcciones produjeron HTML/bundle idénticos.
3. `node --check` de67archivos JS incluidos fuente/bundle: sin fallos.
4. `python3 tests/p01-browser.py`: cuatro recorridos dev/bundle × escritorio/táctil emulado. Se comprueban ocho ejes de movimiento normalizados, desplazamiento real, pared, pausa/reanudación, blur/segundo plano, menú/reinicio, joystick, orientación, viewport768×768, guardias de servicios, ausencia de SW y errores de carga.
5. Dos fallos simulados (módulo faltante/configuración de cloud inválida) muestran error sin arrancar jugador/servicios.

| Entrada | Interacción | Solicitudes locales | Intentos remotos | Errores/HTTP fallidos | Resultado |
|---|---|---:|---:|---|---|
| dev.html | Teclado | 70 | 0 | 0/0 | PASS |
| dev.html | Táctil emulado | 70 | 0 | 0/0 | PASS |
| index.html | Teclado | 5 | 0 | 0/0 | PASS |
| index.html | Táctil emulado | 5 | 0 | 0/0 | PASS |

El test registra y bloquea destinos distintos del servidor local; cualquier intento remoto haría fallar la comprobación. CSP y flags propios también restringen las conexiones. Acredita estos recorridos/versiones, no módulos inactivos ni cambios posteriores.

## Revisión

Subagentes GPT-6 Luna hicieron análisis de arranque, tooling, adaptación de cadenas, revisión estática y preparación de seguimiento; integración y comprobaciones finales a cargo del coordinador. Revisión estática adicional sin defectos bloqueantes en bootstrap, aislamiento, loop/pausa y táctil. Una sugerencia de enlace a créditos se clasificó como mejora opcional: se conservan copyright y avisos en la distribución; no es requisito MIT añadirlos al menú. Revisión de distribución final en P11.

Se reprodujo un defecto heredado del teclado: Tab estaba bloqueado también en el menú técnico. Se corrigió la prevención de teclas para permitir navegación/activación nativa de controles en modo técnico; la prueba Tab/Enter y pausa ahora pasa, conservando el comportamiento legacy.

Se reprodujo y corrigió un problema del procedimiento de prueba: la referencia de posición se tomaba antes de pulsar las ocho direcciones, acumulando desplazamiento; se toma después de esa comprobación. No fue un defecto del movimiento. La primera prueba de arranque falló por ausencia de la escena antes de su implementación, luego pasó.

## Límites y siguiente paso

P01-T02/T03/T04 tienen evidencia para esta escena. No se acredita ninguna función completa de P02/P03 o economía. La primera partida completa aún no está verificada; no hay publicación ni servicios de nube. No se midieron FPS, capacidad simultánea, coste o estabilidad de partidas largas. Node22 y Safari/dispositivos físicos pendientes.

Captura real de la versión: [P01-local-01.png](screenshots/P01-local-01.png). Una imagen para la novedad preparada; no publicada en web. Los reportes/manifiestos preparacion-01 anteriores son históricos, no el estado de esta entrega.

Hashes de construcción:

- index.html SHA256: `0a0995612f73a60919ac12fed6ab7483337032fbdff7d58a9022266e45252717`
- js/app.min.js SHA256: `a1b493e1087bc5314011b07f2fa65be19385f222e1ce2b58faa012f9643dd19d`
