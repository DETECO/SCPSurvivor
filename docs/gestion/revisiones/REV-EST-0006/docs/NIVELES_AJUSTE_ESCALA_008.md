# NIV-ESC-008 — revisión de escala y encuadre

23/10/2026 · NIVELES · Revisión 1 · Propuesta pendiente de aceptación.
No modifica el ejecutable ni sustituye todavía la aprobación M01-R7.

## Corrección solicitada por Iván

«siento que el personaje es pequeño en el mapa, ajusta mejor la dimencion del mapa. se que te pedi que fuera mas grande pero aqui en la prueba se ve mal.»

La solicitud acepta corregir las proporciones; no elige por sí sola las dimensiones ni el encuadre concretos propuestos aquí. La validación artística anterior se conserva, pero la escala 480 × 320 queda bajo revisión para la siguiente prueba.

Evidencia: dos capturas de móvil vertical aportadas en este chat el 23/10/2026, a 0:02 y 0:19. Muestran al Guardia pequeño respecto al campo visible, mucho suelo sin referencias próximas y paneles que cubren una parte importante del terreno. No se deduce de ellas la URL, la versión desplegada ni el ajuste de gráficos seleccionado.

## Diagnóstico comprobado y límites

- [Cámara](../js/core/camera.js): ancho objetivo visible de 768 unidades, alto mínimo de 420; escala calculada a partir del tamaño del canvas. No depende de la anchura total del mapa. Por tanto, reducir solo el perímetro no agranda al personaje.
- [Plantilla R7](../js/world/scene-r7.js): habitaciones de aproximadamente 40–62 casillas de ancho y puertas de 14 casillas. Una casilla son 32 unidades. Una habitación de 40 casillas tiene 1.280 unidades, más que las 768 visibles a lo ancho: puede verse como suelo continuo sin que aparezcan sus límites.
- La plantilla presenta grupos bastante separados: el ajuste debe acercar referencias y redistribuir zonas, además de revisar el perímetro.
- La ocupación de interfaz se aprecia en las capturas, pero su rediseño pertenece a MENUS. No se atribuye el tamaño de los controles a una causa de código no comprobada.
- Es un análisis de capturas y fuentes locales, no una reproducción del teléfono ni una prueba de capacidad de hordas.

## Opciones identificables

| Opción / revisión | Dimensión total | Encuadre propuesto en móvil vertical | Resultado esperado |
|---|---|---|---|
| **NIV-ESC-008-A r1 — recomendada** | **240 × 160 casillas** | Ancho visible de **512 unidades**, frente a 768 actuales | Acerca los módulos y aumenta un 50% la escala visual del mundo y del personaje, a igualdad de canvas. |
| NIV-ESC-008-B r1 | 480 × 320 casillas | El mismo ancho visible de 512 unidades | Agranda el personaje en pantalla, pero conserva los grandes desplazamientos y vacíos de R7. |

Los porcentajes describen la transformación matemática de cámara, no un resultado medido en el teléfono. El ajuste vertical debe verificarse también con las zonas de pantalla ocupadas por los controles.

## Diseño de la opción A

- Mantener las seis familias aprobadas: plazas, recintos atravesables, núcleo modular, laberinto abierto, servicios y arena.
- Reducir la superficie total de 153.600 a 38.400 casillas, un 75%, mediante una redistribución espacial. No reducir personajes, colisiones u objetos para encajarlos.
- Recintos habituales de 18–30 casillas de ancho y 16–26 de fondo. Reservar dos salidas separadas como mínimo; preferir tres en núcleos de combate.
- Conexiones principales de 10–14 casillas libres; accesos de 6–8 casillas. Estas anchuras son propuestas de diseño que deben comprobarse con los radios reales de enemigos antes de fijar geometría.
- Plazas y arena de aproximadamente 32–44 casillas, con obstáculos de borde y cruces alternativos. No colocar obstáculos en el centro solo para llenar suelo.
- Conservar circuito exterior y conexiones transversales. No crear pasillos sin salida ni zonas cuya única conexión pueda quedar anulada por decoración.
- Colocar referencias de escala próximas al inicio: puerta, pared baja, pilar y mobiliario reconocible, sin cubrir la ruta ni el área de maniobra.
- Reubicar jefe, puerta, terminal y candidatos de cofre sobre la nueva composición. No dividir sus coordenadas por dos de forma automática.
- Mantener pixel art 2.5D, paleta Backrooms y difuminado solo ambiental; conservar nítidos personaje, ataques y límites sólidos.
- Proponer un ancho visible de 512 unidades en móvil vertical. Esto equivale a un encuadre 1,5 veces más cercano con el mismo canvas; no cambia estadísticas, alcance de armas ni velocidad por sí mismo.
- La cámara horizontal y la de PC requieren su comprobación independiente. No trasladar el encuadre vertical a todos los formatos sin verificación.

## Dependencias y consolidación

- **ESTRUCTURA — CON-NIV-05:** consolidar la corrección solicitada de escala. Si Iván acepta A, sustituir 480 × 320 por 240 × 160 para esta revisión, conservando R7 como antecedente. La aceptación no se extiende a otros mapas.
- **PROGRAMACION:** aplicar el encuadre y construir la distribución de la opción elegida; comprobar navegación, puntos de aparición fuera de la vista, distancias de recorrido y acceso a jefe/puerta. No cambiar el tamaño del actor para simular el acercamiento.
- **MENUS:** revisar, por separado, los paneles superpuestos, el radar y el espacio libre para jugar en móvil vertical. Esta propuesta registra la dependencia; no cambia su pauta ni aprueba un diseño nuevo de interfaz.
- **PERSONAJES:** mantener los recursos aprobados y su escala relativa de mundo; cualquier cambio de proporciones del actor requiere una decisión de esa área.

## Criterios de revisión de la siguiente prueba

1. Comparar el mismo personaje, posición y formato de pantalla antes y después, con capturas de 16 y 32.
2. Verificar que el acercamiento hace legible al personaje y deja visibles amenazas próximas; no aceptar un zoom que esconda ataques inevitables.
3. Recorrer inicio, conexiones, plaza, laberinto, servicios y arena; comprobar radios reales y al menos dos rutas desde cada recinto.
4. Probar ocupación creciente de enemigos y observar atascos, oclusión y margen de giro. No deducir una capacidad máxima del plano.
5. Comprobar aparición de enemigos al cambiar el área visible; evitar apariciones sobre el jugador o entradas enemigas fuera de un margen reaccionable.
6. Medir acceso al jefe y la puerta dentro del recorrido de cinco minutos, sin cambiar su condición de avance.
7. Validar el encuadre y la interfaz en móvil vertical, horizontal y PC.

La evidencia de implementación se consulta en [PROGRAMACION](PRESENTACION_INTEGRADA.md) y en los informes que esa área enlace para la nueva prueba. Este documento no lleva otra lista de estado del ejecutable.

## Estado de la decisión

- Corrección solicitada por Iván: registrada el 23/10/2026 con cita literal.
- Opción recomendada: NIV-ESC-008-A r1.
- Opción elegida: ninguna todavía.
- Fecha y cita de aceptación de A/B: no existen todavía.
- Recursos aprobados R7 y grietas: conservados sin edición.
