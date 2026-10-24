# REV-EST-0006 — AF01 gráfico

24/10/2026 · PROGRAMACION / raíz · LOT-EST-002 r1, ARM-VIS-001/R1.

Se conecta AF01 al montaje existente de `PersonajesArt` mediante `js/ui/af01-approved-art.js`. La raíz completó esta integración directamente; el agente auxiliar de arte se detuvo antes de entregar código y no se acredita una entrega suya.

## Alcance

Solo con `?prueba=combate-v2&armas=r1`, se precargan los dieciséis PNG originales de AF01, ocho por tamaño. El catálogo conserva rutas y anclajes G/A/S; no se editaron las imágenes ni el catálogo. `preload()` es idempotente y cubre 16 y 32 para que cambiar de gráficos no deje una modalidad permanentemente en fallback. Errores de catálogo o imagen permiten conservar el renderer anterior.

La vista elegida es la más cercana entre ocho; el ángulo de puntería real permanece continuo. El PNG direccional se pinta sin volver a rotarlo. G se coloca en la mano existente; con una pistola el segundo brazo sigue A, mientras con dos pistolas cada copia conserva un brazo y su objetivo propio. El destello visual utiliza S. No se añadieron extremidades, arnés ni equipos.

Se mantienen la escala de mundo del personaje y sus físicas. El lienzo de cada arma corresponde al tamaño n del rig y recibe su transformación `56/n`; no cambia el alcance ni la colisión. Los anclajes del catálogo siguen siendo estimaciones, pendientes de aceptación visual del montaje/animación. El origen físico de los proyectiles conserva su regla anterior; dibujar un destello en S no acredita una recalibración física del cañón ni de paredes.

No integra Katana/láser/F24, poses nuevas, una sala ni selector de equipo. La galería MEN-004 conserva su estado de revisión.

## Evidencia

Las seis pruebas nuevas fallaron primero por ausencia del módulo. Tras implementarlo pasaron **6/6**, y las tres regresiones de `PersonajesArt` pasaron **3/3**. Verifican carga única de ambas resoluciones, rutas exactas, redondeo a ocho direcciones conservando aim, G/A/S del catálogo, escala del lienzo, ausencia de doble rotación, restauración del estado de dibujo, no mutación y fallback ante errores.

El navegador AF01 de la raíz exige un `drawImage` real del PNG `/16/AF01/` o `/32/AF01/` después de iniciar; no basta con que el juego funcione usando fallback. Los resultados de la composición final, capturas y prueba de continuidad al mapa 2 constan en [el recibo central](../REV-EST-0006_VALIDACION.json). No se afirma aceptación humana ni prueba de teléfono físico.
