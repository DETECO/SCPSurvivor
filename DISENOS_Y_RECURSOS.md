# Diseños y recursos recuperados

**Actualización 0.32 · PERSONAJES, 22/10/2026:** Personajes del hilo PERSONAJES incorporados al ensayo T1BC: seis actores en 32/16, selección gráfica, montaje humano modular y dos apoyos amarillos. PNG copiados sin edición; geometría, estadísticas, armas jugables y comportamiento aliado conservados. Arte provisional; no catálogo final 24+24 ni armas nuevas. [Jugar 32](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=32) · [Jugar 16](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=16) · [Alcance](docs/PERSONAJES_INTEGRACION.md).


**Actualización 0.31 · Arte de ensayo V1, 21/10/2026:** Arte de ensayo V1 aplicado sobre T1BC: cinco actores locales con siluetas y animación más detalladas, cuatro armas distinguibles y comparación clásica. No reemplaza el catálogo final ni cambia colisiones, estadísticas, cámara o recorrido. Fusión, nueva geometría, poderes y ultimate siguen pendientes. [Jugar](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2) · [Ver modelos](https://deteco.github.io/SCPSurvivor/prueba-visual-v1.html) · [Alcance](docs/ARTE_ENSAYO_V1.md). Iván aceptó T1BC en general; no todas las pruebas/dispositivos. El nuevo arte aún no tiene aprobación final.


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
