# LOT-EST-003 r1 — M01 opción A

PROGRAMACION · iniciado 23/10/2026, comprobaciones continuadas el 24/10. Fuentes: REV-EST-0006, CONTROL_CAMBIOS0.6, EST-ESC-001 r1 y NIV-ESC-008-A r1. La aceptación posterior de ESTRUCTURA resuelve A/B; no se cambió la ficha histórica del área.

## Implementado

`js/world/scene-m01-a.js` construye una composición explícita de240×160, casilla32. Conserva seis familias de R7, diez recintos de18–30×16–26 con dos o tres salidas de ocho casillas, plaza, conexiones exteriores/transversales, servicios y arena. Anclajes de entrada, jefe, puerta, terminal y seis candidatos de cofre reubicados y comprobados; no se dividieron coordenadas del plano anterior. Pared baja, pilar y mobiliario próximos al inicio. Renderer R7 reutilizado con límites dinámicos; original de referencia480×320 y sus recursos conservados.

Se aplica al primer mapa moderno y a la práctica de grieta. El segundo mapa conserva su plantilla anterior. `Camera.setSceneView` usa512 unidades de ancho objetivo solo en vertical y en la revisión A; al pasar a otra escena recupera768. PC/horizontal conservan su regla previa y el alto mínimo420. Personajes, radios, velocidad, alcances y calendario de jefe/puerta no se modificaron para simular zoom.

## Evidencia real

- Pruebas de mapa/cámara: tres casos nuevos, incluyendo todos los suelos accesibles con radios0/12/22 y anclajes/interiores/salidas; distancias BFS hasta jefe/puerta por debajo de240/300 segundos a velocidad165. Es cálculo de recorrido libre, no tiempo medido de un jugador bajo presión.
- Cinco regresiones de R7 anterior conservadas. Ambos generadores reproducibles por semilla.
- Presentación: doce escenarios, fuentes y compilado, PC1280×900, vertical390×844 y horizontal844×390, ambos tamaños16/32. Movimiento real, selección de soldado, galería visual sin equipamiento y arranque240×160.
- Cuatro flujos controlados de grieta/transición: pausa/caducidad/contacto, jefe/premio/puerta y conservación al mapa siguiente. No se anuncian victorias naturales por inyectar daño/tiempo de QA.
- Seis escenarios de ocupación:90 segundos activos con jugador estacionario invulnerable y disparo deshabilitado **solo en QA**. Se ejecutan la IA, navegación y colisiones reales; crece la población hasta23 enemigos regulares, cupo previo al jefe. Nuevas apariciones fuera de vista con margen20, posiciones libres/alcanzables y radios originales. No certifica maniobra del jugador, balance ni rendimiento de teléfono.

Evidencias locales: `tests/artifacts/presentation/local/results.json`, `flows.json` y `tests/artifacts/rev-est-0006/m01/occupation.json`. Capturas por formato y resolución en esas carpetas. La revisión de código no encontró un fallo concreto de límites/cámara; informe `REV-EST-0006-revision-mapa-director.md`.

## Límites

Plantilla de referencia, no generación procedural completa. Pendientes aceptación visual de la nueva integración, maniobra/escape con hordas en juego natural y teléfono físico. El HUD heredado aún ocupa espacio en vertical; este lote no aprueba un rediseño de interfaz. El recibo público0.33 pertenece al mapa anterior y no acredita esta composición. No se publicaron estos cambios por redactar este informe.
