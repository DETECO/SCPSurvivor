# MEN-005 r1 — Propuestas de HUD in-game horizontal

**Fecha:** 24/10/2026  
**Estado:** MEN-005-A r1 aprobada como dirección visual provisional para pruebas el 25/10/2026; MEN-005-B r1 y MEN-005-C r1 siguen pendientes. Ninguna opción se declara implementada aquí.  
**Área:** MENUS.

## Objetivo y referencia

Resolver la falta de espacio y los solapamientos de la interfaz horizontal compartida por Iván. La propuesta cubre el HUD de combate, radar, control táctil, estado de vida, tiempo, nivel/XP, arma/munición, recarga, habilidad visible, pausa y selección de mejora.

Las capturas adjuntas del 24/10/2026 son la referencia de estado visual. La implementación y su validación se consultan en el [registro INC-VIS-001](../../gestion/INC-VIS-001.md), el [informe de PROGRAMACION](../../gestion/informes/INC-VIS-001-programacion.md) y el [registro de implementación](../../gestion/REGISTRO_IMPLEMENTACION.md); este documento no duplica ese estado.

## Registro de decisión

- **Opción elegida:** MEN-005-A r1 — HUD anclado a las esquinas.
- **Fecha:** 25/10/2026.
- **Cita de Iván:** «Apruebo la opción 1 por ahora .»
- **Alcance:** dirección visual provisional para pruebas. MEN-005-B r1 y MEN-005-C r1 siguen pendientes y no quedan aprobadas por esta decisión. La selección tampoco demuestra implementación o publicación.
- **Recurso:** [01-hud-esquinas.png](../../../design-proposals/menus/propuestas-20261024/01-hud-esquinas.png).

La ficha conserva las tres opciones originales. El estado anterior de revisión pendiente queda registrado en [la pauta MENUS](../../PAUTA_MENUS.md#historial-de-propuestas).

## Opciones identificables

### MEN-005-A r1 — HUD anclado a las esquinas

![Propuesta A: HUD con controles en las esquinas](../../../design-proposals/menus/propuestas-20261024/01-hud-esquinas.png)

Mantiene el radar arriba a la derecha y el objetivo en una cápsula separada. Joystick y Sprint ocupan las esquinas inferiores; el arma, munición y recarga quedan en el centro inferior. La vista de juego conserva el mayor espacio central posible.

### MEN-005-B r1 — Carril táctico lateral

![Propuesta B: carril táctico izquierdo](../../../design-proposals/menus/propuestas-20261024/02-hud-carril-tactico.png)

Agrupa radar, objetivo y joystick en un carril izquierdo. El estado de vida, tiempo y nivel queda en una sola línea superior; arma/munición/recarga se agrupan abajo al centro y Sprint al extremo derecho. El campo jugable ocupa el espacio amplio restante.

### MEN-005-C r1 — Consola inferior integrada

![Propuesta C: consola de control inferior](../../../design-proposals/menus/propuestas-20261024/03-hud-consola-inferior.png)

Concentra joystick, arma y habilidad dentro de una consola inferior translúcida. Radar y objetivo se anclan en extremos superiores separados; vida, tiempo y XP usan una única banda superior. Es la opción con mayor agrupación de controles táctiles.

Cada lámina incluye una vista principal de combate y referencias visuales del mismo sistema para pausa y subida de nivel.

## Alcance visual y límites

- Las categorías “COMBATE”, “SUPERVIVENCIA” y “UTILIDAD” son rótulos ilustrativos para la pantalla de subida de nivel. No asignan efectos, estadísticas ni reglas.
- “VIDA 100/100”, “00:06 / 05:00”, “PUERTA 4:53”, “PISTOLA 12/12” y “NV 1” reproducen el ejemplo de las capturas; no fijan valores de balance.
- Se representa únicamente Sprint como habilidad visible. El aro de enfriamiento y la barra de recarga son indicadores propuestos, sin duración ni lógica definidas.
- La ranura 2 aparece vacía según la captura. No se agregan armas ni se cambia el catálogo aprobado por ARMAS.
- Los botones de pausa y controles muestran jerarquía/tamaño táctil; sus acciones y navegación quedan sujetas a PROGRAMACION.
- No se modificó código ni otra pauta. No se ejecutaron pruebas de software porque esta entrega es exclusivamente visual.

## Dependencias

- **PROGRAMACION:** revisar la distribución en el HUD real y conservar allí la evidencia de integración/pruebas. Consultar los registros enlazados arriba.
- **ESTRUCTURA:** revisar cualquier efecto o contenido real que se quiera asignar a las mejoras; esta propuesta deja sus categorías como marcadores visuales.
- **ARMAS:** la pantalla de combate mantiene la pistola de la captura. No se modifica la pauta ni se convierte la galería ARM-VIS-001/R1 en equipamiento de partida.

La decisión de MEN-005-A r1 quedó registrada en la pauta MENUS. MEN-005-B r1 y MEN-005-C r1 permanecen pendientes; la adaptación e integración de la dirección visual aprobada requiere revisión y evidencia de PROGRAMACION. Se conservan las tres láminas originales.
