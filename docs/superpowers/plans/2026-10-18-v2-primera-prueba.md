# Primera prueba V2 — plan de implementación

**Objetivo:** probar localmente mapa de 300 s, jefe obligatorio, llegada de puerta/soldados y transición sin extracción. Iván autorizó comenzar el 18/10 después de revisar la pauta. No representa cierre P05 ni implementación de inventario P06.

**Arquitectura:** extender G.Expedition mediante una opción local G.MapTrial. Reutilizar mundo, enemigos, combate, soldados existentes, interfaz y compilador. No reemplazar el motor ni diseños. Modo normal anterior conservado para regresión.

**Tecnología:** JavaScript/Canvas2D, Node test y Chromium local.

## Contrato de la primera prueba

- `?prueba=mapa-v2`, solo loopback y sin parámetro de cuentas. `&rapida=1` inicia en 4:30 para probar la llegada; no simula una victoria ni acelera el reloj del modo normal. Cada nuevo mapa comienza 0:00.
- Reloj de 300 s de juego activo, pausa/menú de mejoras detenidos. Jefe a los 240 s provisional; en acceso rápido aparece al empezar. Aparición del jefe garantizada sin depender del cupo normal.
- A los 300 s: cerrar todos los productores enemigos, incluidos refuerzos; abrir puerta, alertar y llegar dos soldados aliados de cobertura. Conservar remanentes, también al morir jefe.
- Cruzar por contacto, sin botón/espera, solo con puerta llegada y jefe derrotado. Llegar cerca sin tocar no cruza. Nuevo mapa conserva vida/build y reinicia reloj. No extracción ni huida del jefe en este modo.
- Puerta/localizador/estado claros; sprites y efectos provisionales, sin generar ni sustituir arte aprobado.
- Aliados separados de EnemyMgr; disparan con alcance/línea de visión, sin daño al jugador. Su muerte de enemigos usa el mecanismo normal de daño/XP, sin economía persistente. Parámetros provisionales.
- Sin UI de accesorios ni mochilas; seleccionar armas/soldado de prueba sin mods. Familias nuevas y azar de mejoras permanecen pendientes: se conservan las cartas actuales para este ensayo del recorrido.
- No cuentas, guardado, ranking o premios reales. Capturar/restaurar checkpoint V2 no puede emitir/aceptar esquema 1. No mezclar con prototipos de grietas/inventario.

## Tareas y verificación

- [x] Respaldar fuente y registrar hashes previos.
- [x] Escribir prueba de comportamiento que falle antes de extender director.
- [x] Director: reloj/corte, jefe, remanentes, transición, modo rápido y rechazo de extracción.
- [x] Interfaz y aliados: menú/HUD/localizador/puerta/cobertura; ocultar accesorios/mochilas y aislar guardado.
- [x] Pruebas Node/regresiones pertinentes y compilación/check.
- [x] Navegador fuente/compilado, escritorio/móvil emulado: iniciar, pausar, puerta bloqueada/desbloqueada, daño aliado, transición, ausencia de servicios remotos.
- [x] Revisar diff con agente y raíz; corregir hallazgos. Revisión independiente de cumplimiento y calidad aprobada; corregidos doble cómputo de bajas y superposición de aliados.
- [x] Registrar resultados/límites, pauta manual y roadmap; servidor de prueba local disponible. Publicación autorizada: verificar su commit en Git.
