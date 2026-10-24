# NIV-GRI-009 r1 — animación de portales 2.5D

23/10/2026 · NIVELES · Encargo de implementación local.

**Resultado visual aprobado por Iván el 23/10/2026: «apruebo.».** Se aceptan las seis animaciones de esta revisión; [registro de aprobación](NIVELES_APROBACION_GRIETAS_ANIMACION_009.md). La publicación se consulta en la evidencia de PROGRAMACION.

Solicitud literal de Iván: «anima los partales de las grietas, quiero que tengan animaciones en el juego, con particulas movimiento, si corresponde. recordar que todo esto debe tener un profundidad, estilo 2.5D».

Se conserva el catálogo GRIETAS-V1 / 01–06 aprobado el 22/10. Esta instrucción encarga animación en el juego; no equivale a aceptación visual del resultado posterior ni elige la revisión de escala NIV-ESC-008.

## Diseño y dependencias

1. Cicatriz carmesí: respiración del borde, chispas ascendentes y filamentos móviles.
2. Pliegue amarillo: bordes de papel que se separan y vuelven, polvo suspendido.
3. Fractura prismática: fragmentos suspendidos con oscilación individual y caras sombreadas.
4. Fisura orgánica: pulso lento y fibras ondulantes, motas cálidas.
5. Horizonte negro: órbitas elípticas y partículas atraídas hacia el centro.
6. Interferencia espectral: desplazamiento de bandas y residuos de píxel, sin destellos de pantalla.

Sombras y luz elípticas en el suelo; cuerpo vertical ordenado por su base respecto a personajes/paredes; partículas traseras y delanteras. Animación analítica acotada, sin partículas acumulativas ni azar compartido con el juego. El reloj activo congela el movimiento durante pausa, cartas y terminal. La opción existente de menos destellos reduce movimiento y cantidad de motas.

Dependencias: PROGRAMACION (renderer Canvas2D, orden de dibujo y reloj activo), PERSONAJES (oclusión sin modificar sus recursos), ESTRUCTURA (consolidar solo el encargo visual). Sin cambios de aparición, tiers, contacto, ventana de entrada, daño, premios o tamaño del mapa. No se añaden sonidos nuevos ni se modifican otras pautas. No se publica esta entrega.

## Plan de trabajo

- [x] Escribir y ejecutar pruebas que detecten movimiento por tiempo, pausa y límites de los efectos.
- [x] Animar los seis estilos y separar suelo/cuerpo para la profundidad respecto a los actores.
- [x] Comprobar mecánicas de grieta, construir el juego y revisar en navegador 16/32 y móvil emulado.
- [x] Registrar resultados en evidencia enlazada, guardar diff y actualizar únicamente la pauta de NIVELES.

## Evidencia de PROGRAMACION

El estado de la implementación de este encargo se consulta en [el informe de verificación](PROGRAMACION_GRIETAS_ANIMACION_009.md), incluidos los fallos de permisos del empaquetado de Firebase y de cinco pruebas de backend. La base integrada anterior se consulta en [PRESENTACION_INTEGRADA.md](PRESENTACION_INTEGRADA.md). La aceptación visual posterior queda registrada por separado; no se declara publicación.
