# LOT-EST-003 r1 — M01: escala y encuadre de la opción A

23/10/2026 · ESTRUCTURA · **Listo documentalmente para PROGRAMACION. Sin implementación ni publicación por esta consolidación.**

## Fuente fijada y aceptación

- **NIV-ESC-008-A r1**, [ficha de NIVELES](../../NIVELES_AJUSTE_ESCALA_008.md), opción A y su diseño. Copia conservada en [REV-EST-0006](../revisiones/REV-EST-0006/docs/NIVELES_AJUSTE_ESCALA_008.md); huellas en [manifiesto del corte](../revisiones/REV-EST-0006/MANIFIESTO.json).
- **EST-ESC-001 r1:** Iván acepta en ESTRUCTURA el 23/10/2026: «A: mapa 240×160 y cámara más cercana en móvil vertical (recomendada).» Respuesta a la pregunta que identificaba expresamente NIV-ESC-008. ID individual del mensaje no expuesto.
- [CONTROL_CAMBIOS, REV-EST-0006](../CONTROL_CAMBIOS.md). M01-R7 permanece como antecedente artístico; esta revisión sustituye sus dimensiones para la siguiente prueba de M01. No aplica automáticamente a todos los escenarios.

## Cambio esperado

Construir M01 de **240 × 160 casillas**, manteniendo casillas de 32 unidades y las seis familias de R7. En móvil vertical, ancho objetivo visible de **512 unidades** frente a las 768 observadas en la ficha. No cambiar tamaño de mundo, velocidad, colisiones ni proporciones del soldado para simular el acercamiento.

Redistribuir recintos, plazas, conexiones y referencias próximas al inicio conforme a la opción A. Reubicar jefe, puerta, terminales y candidatos de cofre sobre lugares válidos; no dividir coordenadas automáticamente por dos. Los rangos de accesos y recintos de la ficha son parámetros de construcción para esta prueba, sujetos a comprobar radios reales y rutas. No trasladar el encuadre vertical a PC/horizontal sin comprobarlos.

## Dependencias

- **NIVELES:** distribución de la opción A y seis familias aprobadas; originales R7 conservados.
- **PERSONAJES:** mismos actores y proporciones relativas en 16/32. La resolución del PNG no altera el tamaño físico.
- **MENUS:** ocupación de pantalla y controles de juego; MEN-003 corrige el menú, no demuestra por sí mismo que el HUD deje suficiente terreno visible. Cualquier nueva propuesta visual de HUD se mantiene en su área.
- **ESTRUCTURA:** conservar mapas de cinco minutos, jefe obligatorio, puerta/apoyos a 5:00, cupos de cofres y reglas de grieta. LOT-EST-002 exige estación accesible desde mapa 2, no añade una obligatoria al primer M01.
- **PROGRAMACION:** adaptar generador/cámara existentes, navegación y aparición enemiga; enlazar su informe. No activar cuentas ni economía real para esta prueba.

## Criterios de prueba

1. Comparativa misma posición/personaje/pantalla en 16 y 32; el acercamiento mejora lectura sin modificar colisiones, velocidad ni alcances. La relación matemática de cámara 1,5 no sustituye la inspección del resultado.
2. M01 tiene 240×160 y conserva familias, rutas alternativas y referencias de escala. Inicio, jefe, puerta y premios requeridos son alcanzables; recintos con al menos dos salidas según la ficha.
3. Probar radios reales de enemigos, maniobra, oclusión y ocupación creciente; no deducir capacidad de hordas del plano ni cerrar escapes con decoración.
4. Revisar aparición fuera de la vista y margen de reacción con el nuevo encuadre. No crear enemigos encima del jugador ni amenazas inevitables ocultas por controles.
5. Medir recorrido hasta jefe/puerta dentro de cinco minutos sin cambiar la condición de avance. Conservar los seis candidatos y reglas de descubrimiento/sorteo de cofres.
6. Comprobar móvil vertical, horizontal y PC, ambas resoluciones y pausa/transición. Distinguir emulación de teléfono físico, balance y rendimiento real.

## Salida

Informe de PROGRAMACION con versión implementada, capturas comparables, pruebas y pendientes. [Presentación 0.33](../../PRESENTACION_INTEGRADA.md) acredita el M01 anterior; no se reescribe como evidencia de esta corrección. Publicación se registra por separado cuando exista un encargo aplicable y verificación.
