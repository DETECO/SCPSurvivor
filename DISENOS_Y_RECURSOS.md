# Diseños y recursos recuperados

Inventario del proyecto consolidado alfa 0.4. Se conservaron los archivos existentes; no se generó arte nuevo. Las sesiones independientes de pixel art, Roadmap y prompt maestro se omitieron por petición de Iván.

## Recursos que utiliza la alfa

| Recurso | Archivos | Dimensiones del SVG | Estado |
|---|---|---|---|
| Guardia | assets/actors/guard01/Idle.svg y Walk.svg | 24×224 y 48×224 | Actor provisional utilizable |
| Médico | assets/actors/medic01/Idle.svg y Walk.svg | 24×224 y 48×224 | Actor provisional utilizable |
| Perseguidor | assets/actors/pursuer01/Idle.svg y Walk.svg | 24×224 y 48×224 | Enemigo provisional utilizable |
| Biológico | assets/actors/biological01/Idle.svg y Walk.svg | 64×64 y 64×64 | Enemigo provisional utilizable |
| Custodio | assets/actors/warden01/Idle.svg y Walk.svg | 64×64 y 64×64 | Un jefe provisional utilizable |
| Tipografía | assets/fonts/PixelifySans.ttf; OFL.txt | Fuente y licencia | Utilizada/conservada |
| Capturas de hitos | docs/screenshots/*.png | Variable | Evidencia visual; no sprites |

Las dimensiones anteriores corresponden a hojas/recursos SVG; no significan que se haya entregado un catálogo de sprites raster 16×16. Sprites, animación y anclajes se declaran en js/data/content.js y se interpretan en js/core/sprites.js. Armas, interfaz, escenarios y efectos incluyen dibujo programático en Canvas. Música y efectos tienen código de Web Audio; no necesitan un paquete MP3/WAV externo para esta alfa.

## Identidad y aprobación

Se conserva la presentación existente de terror/ciencia ficción, los interiores y el arte de prueba. La identidad negro/blanco/rojo es una directriz de proyecto mencionada por Iván; no se impuso un rediseño durante la migración. El informe P04 especifica que los recursos actuales no son el arte final.

No se declara aprobado un diseño final solo porque exista un archivo o una captura. La información de aprobaciones disponible está en las decisiones del RoadmapSCP; las otras sesiones no se consultaron para agregar nuevas aprobaciones.

## Referencias archivadas

Se preserva docs/upstream-reference, incluidos iconos, favicon e imagen social históricos con extensión .bin. Son referencias del proyecto de origen y no los iconos finales de SCP Survivor. No renombrarlos ni conectarlos automáticamente al frontend. LICENSE, CREDITS.md, docs/ORIGIN.md y OFL.txt conservan la procedencia.

## Elementos no recuperados ni implementados como catálogo final

- 24 soldados y 24 criaturas definitivos.
- Sus adaptaciones completas a 16×16 y animaciones finales.
- Tres jefes finales: la alfa dispone de un Custodio.
- Icono definitivo de SCP Survivor.
- Panel Roadmap independiente para escritorio/móvil.

La ampliación 24+24 está fuera del denominador de la primera versión según RoadmapSCP.json.baseline.outsideScope. No inventar estos recursos ni reemplazarlos por otros para completar el inventario. Si se retoman las sesiones excluidas, incorporar sus archivos originales y registrar su aprobación aparte.
