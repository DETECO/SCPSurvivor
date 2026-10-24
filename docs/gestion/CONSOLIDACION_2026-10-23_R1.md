# Consolidación incremental — REV-EST-0006

23/10/2026 · Juanillo / ESTRUCTURA · Base: CONTROL_CAMBIOS 0.5, REV-EST-0005. Encargo directo: «CONSOLIDA.». Esta revisión prepara documentación y entregas; no implementa ni publica.

## Cambios consolidados

| Área | Revisión o fuente observada | Resultado y límite |
| --- | --- | --- |
| ESTRUCTURA | EST-ARM-001 r1; EST-GRI-001 r1; nueva EST-ESC-001 r1 | Armas y dado conservan sus aprobaciones y lotes. Iván elige NIV-ESC-008-A r1 durante esta consolidación: M01 240×160, cámara vertical 512 unidades, proporciones del soldado conservadas |
| NIVELES | Pauta R7.4; M01-R7; NIV-ESC-008-A r1; NIV-GRI-009 r1 | Opción A ahora aprobada aquí; la ficha del área capturada todavía dice pendiente y debe incorporar la referencia a EST-ESC-001. Seis animaciones de grieta aprobadas por «apruebo.»; informe de implementación local separado de la publicación 0.33 |
| ARMAS | Pauta R2; ARM-VIS-001/R1; EST-ARM-001 r1 | El lote visual de 160 sprites conserva aprobación. La pauta del área aún muestra escala/fusión pendientes; para las reglas globales prevalece la aceptación posterior de ESTRUCTURA. Solo F24 jugable inicial; las otras 62 recetas siguen propuestas |
| PERSONAJES | Aprobación 22/10; anomalías biológicas y recursos V1; bancos de diálogo V1/V2 | Cinco identidades y repertorio de 15 ataques aprobados; paquete raster V1 aceptado para futura integración. Los diálogos están aprobados como redacción. No equivale a encuentros completos, parámetros de combate, selección de nombres o burbujas integradas |
| MENUS | MEN-001/002 r1; requisito MEN-003 r1; revisión local MEN-004 r1 | Arte previo aprobado para pruebas. Corrección móvil solicitada y aplicada localmente, pendiente de evidencia de PROGRAMACION. MEN-004 limita la galería a nueve diseños + F24 por petición del usuario; su nueva ficha sigue en revisión y la galería no permite equipar armas |
| SONIDO | SON-001 revisión 1.0 | Selección «Presencia en la oscuridad» ya aceptada; WAV disponible. Integración de menú pendiente, distinta del futuro sonido de burbujas |
| ICONO APP | ICON-APP-001/R1 | Localizada aprobación y procedencia del diseño 3 con SCP. Se cierra la carencia anterior del índice; la entrega 0.33 informa su aplicación sin acreditar teléfono físico |
| PROGRAMACION | Presentación 0.33 y sus recibos; informe NIV-GRI-009 local | Se conserva la evidencia publicada histórica. La animación local posterior y cambios de MENUS no quedan publicados por ese recibo; los nuevos lotes necesitan su propio informe |

Las fuentes vigentes se enlazan en la pauta maestra; las revisiones documentales de este corte se conservan con huellas en [MANIFIESTO REV-EST-0006](revisiones/REV-EST-0006/MANIFIESTO.json). Las copias documentales archivadas conservan sus rutas relativas originales; para navegar recursos usar las fuentes de la pauta, no interpretar una referencia relativa del archivo histórico como un recurso ausente.

Para cerrar la procedencia del banco narrativo se consultaron 12 turnos recientes de PERSONAJES. Aprobación directa: «apruebo los dialogos.» (`01a169f4-597a-7a51-88cd-34f070d200fd`); también se recuperaron «ya aprobados.» para el repertorio y «aceptado.» para el paquete raster. [Extractos y mensajes identificados](revisiones/REV-EST-0006/CONVERSACIONES.json). Esto verifica la aceptación en su contexto sin extenderla a parámetros o reglas adicionales.

## Nueva aceptación de escala

Pregunta presentada a Iván: NIVELES registró que el personaje se ve pequeño y propone dos correcciones NIV-ESC-008 aún sin aceptar. Opciones: A 240×160 y cámara cercana; B conservar 480×320 y acercar cámara; dejar pendiente para comparación visual.

**Respuesta literal:** «A: mapa 240×160 y cámara más cercana en móvil vertical (recomendada).» Se registra como **EST-ESC-001 r1**, que acepta **NIV-ESC-008-A r1** para la siguiente prueba de M01. El ancho vertical de 512 unidades y la redistribución de la opción A están en la ficha identificada por la pregunta. No se agranda el actor cambiando sus estadísticas ni se cambia automáticamente la escala de todos los mapas. El ID individual de este mensaje no está expuesto.

La elección A cierra el conflicto de proporciones pendiente de NIVELES; no convierte en aprobadas la alternativa B ni comprobaciones de navegación, hordas o dispositivo que aún no se ejecutan.

## Lotes para PROGRAMACION

| Lote | Estado documental | Alcance y relación |
| --- | --- | --- |
| [LOT-EST-001 r1](lotes/LOT-EST-001-r1.md) | Listo; revisión conservada | Director aislado del dado. No habilita automáticamente el recinto separado, cinco encuentros, poderes o NPC |
| [LOT-EST-002 r1](lotes/LOT-EST-002-r1.md) | Listo por fases; revisión conservada | Escala única, montaje y AF01/CC04/TE01 → F24. Habilitar parejas solo con poses compatibles comprobadas |
| [LOT-EST-003 r1](lotes/LOT-EST-003-r1.md) | Nuevo, listo documentalmente | M01 opción A 240×160 y encuadre vertical cercano; coordinar pruebas de ocupación de pantalla |
| [LOT-EST-004 r1](lotes/LOT-EST-004-r1.md) | Nuevo, listo documentalmente | Integración y comprobación del ambiente SON-001 en el menú; no define sonido del compañero |

Prioridad práctica: comprobar composición local de MENUS/animación y sus recibos; corregir escala/encuadre con LOT-003; continuar montaje/progresión/fusión con LOT-002. LOT-001 y LOT-004 admiten trabajo independiente. Esta prioridad no cambia revisiones; el [encargo de implementación](ENCARGO_PROGRAMACION_REV-EST-0006.md) se prepara a petición expresa de Iván, quien autoriza enviarlo al hilo PROGRAMACION al terminar esta consolidación. No se amplían por ello las autorizaciones de publicación/servicios.

El paquete de anomalías y el banco de diálogos quedan entregables como recursos aprobados. Su integración de combate/NPC completa permanece en preparación: faltan parámetros y dependencias explícitos; no se presenta como un quinto lote listo solo por existir los atlas o las frases.

## Diferencias resueltas y pendientes concretos

1. **Referencias antiguas de ARMAS y NIVELES:** resueltas documentalmente por autoridad y fecha. EST-ARM-001 r1 y EST-ESC-001 r1 prevalecen en su alcance; las áreas conservan propiedad de sus pautas y deberán reflejar esas referencias, sin pedir a Iván la misma aprobación de nuevo.
2. **Galería y equipo inicial:** MEN-004 es una vista previa local. No cumple por sí sola la selección de un arma inicial ni permite iniciar con F24. PROGRAMACION debe conservar la regla de una arma inicial y obtención de la segunda; cualquier nuevo diseño del selector se revisa en MENUS, sin trasladar la galería como selección funcional por inferencia.
3. **Recibos y mezcla de cambios locales:** la publicación 0.33 pertenece a sus huellas históricas. No acredita que MEN-003/004 o NIV-GRI-009 estén publicados. PROGRAMACION debe identificar la composición que comprueba y actualizar su evidencia; no reescribir resultados anteriores como si hubieran probado cambios posteriores.
4. **Grietas completas:** cinco identidades/ataques y su arte aceptados no bastan para declarar jugables cinco tiers. Siguen pendientes vida/daño/velocidad/frecuencia, recintos transitables, escape único alcanzable, premios/poderes y señalización D1–D5 compatible con cualquiera de los seis estilos. No asignar un estilo de portal a un tier automáticamente.
5. **Diálogos/NPC:** separar frases aprobadas de reglas de selección, listas de nombres, cadencias y presentación en juego aún por integrar/revisar. Las voces/personas no alteran estadísticas, sorteos de aparición ni conducta de huida aprobada. Los sprites femeninos solicitados no se dan por entregados por existir frases femeninas.
6. **Pruebas técnicas:** el informe local NIV-GRI-009 registra 21 pruebas dirigidas y 4 escenarios de navegador aprobados, pero suite completa con 5 fallos/1 omisión. Mantener esos límites; no declarar suite completa aprobada ni exigir otra consolidación para corregir fallos técnicos ya encargados.

## Cobertura real

Comparación documental de las ocho áreas mediante registros locales, nuevas fichas y dependencias; revisión del mensaje actual, aceptación de A y autorización de derivación recibidas en esta ejecución. Lectura enfocada de cabeceras, registros de aprobación, apartados nuevos y recibos; 12 turnos recientes de PERSONAJES para resolver procedencia y dos de PROGRAMACION para confirmar identidad/rol y preparar el encargo. No relectura completa de catálogos ni de ocho conversaciones. Se delegaron tres revisiones Luna máximo, sin informe final incorporado; se detuvieron al cerrar la lectura directa. Las conclusiones de este corte se sustentan en las fuentes revisadas por Juanillo, quien mantiene la escritura central.

Se preservaron 21 documentos del corte previo a esta consolidación. Se comprobaron recursos y huellas indicados en los registros, con [recibo de verificación del corte](revisiones/REV-EST-0006/VERIFICACION.json) y detalle en CONTROL_CAMBIOS. No se ejecutaron pruebas de juego, publicación, reproducción del audio ni ensayo en teléfono físico. La evidencia de otros encargos se cita como evidencia registrada, no como verificación repetida aquí.
