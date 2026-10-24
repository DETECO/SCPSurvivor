# ARM-SMG-REC-001 r1 — carencia de recurso del Subfusil legado

24/10/2026 · ARMAS · Dependencia de INC-VIS-001. **Auditoría de recurso cerrada: carencia documentada. Corrección visual pendiente del recurso y su aceptación.**

## Resultado y alcance

No se encontró un sprite aprobado y recuperable inequívocamente correspondiente al modelo jugable existente **`smg` / «Subfusil»** en las fuentes locales revisadas. No hay una ruta de PNG aprobado, vistas propias ni anclas validadas que entregar para ese modelo. `approvedSprite` y `approvedAnchors` quedan explícitamente en `null` en la ficha JSON.

Sí son recuperables sus dibujos provisionales por código. No equivalen a un atlas aprobado. La aceptación general del recorrido T1BC o de PERSONAJES no convierte ese dibujo en una aprobación específica de arte del Subfusil.

## Evidencia revisada

Rutas relativas a la raíz SCP-SURVIVOR. Las huellas del corte consultado se guardan en [ARM-SMG-REC-001-r1.json](ARM-SMG-REC-001-r1.json). Los archivos de PROGRAMACION pueden evolucionar; sus hashes identifican esta revisión consultada, no congelan su estado futuro.

| Fuente | Hallazgo |
|---|---|
| `docs/referencias/armas/armas-prueba-direccionales-v1/catalogo.json` y `APROBACION.md` | ARM-VIS-001/R1 contiene AF01, AR01, CC04, IN03, FR07, PE04, RU04, TE01, AN09 y F24. Ninguno corresponde a smg. |
| `assets/menus/approved-weapons-arm-vis-r1/catalog.json` | La galería deriva del mismo lote; no aporta otro recurso de Subfusil. |
| `assets/personajes-20261022/16/Armas.png`, `32/Armas.png` y `LEEME.md` | Seis representaciones: pistola, porra, katana, pistola láser, escopeta y lanzamisiles. La hoja 32 fue inspeccionada visualmente; la documentación identifica ambas. Ninguna está documentada como Subfusil. |
| `js/ui/personajes-art.js`, función `weapon()`, rama `smg` | Silueta procedural de tres rectángulos, escalada con n/32 y girada en el montaje. No contiene ocho sprites dibujados del modelo ni un atlas recuperable aprobado. |
| `js/ui/trial-weapon-art.js`, función `drawSmg()` | Dibujo procedural de ensayo anterior, recuperable como código, también provisional. Su origen de fogonazo no es un ancla validada para nuevos PNG. |
| `docs/ARTE_ENSAYO_V1.md` | Describe armas distinguibles de ensayo y deja expresamente el arte nuevo pendiente de aceptación manual. |
| `docs/referencias/armas/armas-v1/DATOS_DISENO_ARMAS_V1.json` y catálogo | AF02 «Subfusil de pasillo» es una propuesta. No hay sprite elegido de AF02 en el lote aceptado ni identidad smg→AF02 aprobada. No importar sus ráfagas u otras estadísticas al legado. |
| `js/data/field-catalog.js` | Identifica `smg` como «Subfusil». Se usa solo para verificar identidad, sin editar el modelo ni sus cifras. |

**No sustituir smg por FR07:** FR07 es Rifle Tres Eslabones, de francotiradores. Tampoco AF01, AR01, una hoja genérica o F24 resuelven la carencia por compartir apariencia de arma o tener aprobación para otro modelo.

Cobertura: fuentes y recursos locales del área, metadatos de PERSONAJES y galería, dibujos legados e informes relacionados. No se afirma ausencia universal en respaldos externos o conversaciones históricas no consultadas. Si aparece otra fuente, deberá verificarse identidad, recuperabilidad y aprobación antes de levantar la dependencia.

## Mínimo recurso de corrección — ARM-SMG-VIS-001 r1, por producir y presentar

Es una especificación de entrega propuesta para reemplazar el dibujo del **mismo Subfusil existente**, no un arma nueva. No hay imagen nueva ni aceptación asociada a este ID.

1. Dos versiones nativas, celdas de **16×16 y 32×32**, fondo transparente; **ocho vistas E/SE/S/SW/W/NW/N/NE por tamaño**: 16 poses base en total. Entregar sprites o una hoja de ocho celdas por tamaño, con recortes documentados. Conservar originales y evitar suavizado que mezcle píxeles al ampliar.
2. Identidad escrita `runtimeModel: smg`, nombre «Subfusil», revisión y procedencia. Silueta compacta de subfusil que se distinga de la pistola y del rifle. No reasignar AF02 ni añadir una entrada nueva a la colección.
3. Por vista y tamaño, coordenadas locales **grip / support / muzzle** y convención de ángulos; marcar cuándo el apoyo es obligatorio. No inventar coordenadas antes de contar con el dibujo. Declarar eje y posición del recorte. Diferenciar la salida visual del proyectil de su origen físico vigente.
4. Tamaño aparente definido respecto al rig Guardia/Médico y equivalente en el mundo entre 16 y 32. La resolución de la imagen no determina su tamaño de mundo ni la hitbox. No fijar ahora un factor arbitrario para ocultar el problema de proporción.
5. Mostrar montaje comparativo Guardia y Médico, ambas resoluciones, ocho direcciones y una/dos copias compatibles. Si el apoyo requiere dos manos, comprobar su disponibilidad con la segunda arma; no añadir brazos ni dar por validada una pose incompatible. Fogonazo separado, visible en la salida, sin cambiar cadencia, proyectil, alcance, daño, cargador o recarga.
6. Presentar esa revisión visual con referente inequívoco a Iván y registrar su decisión. Los movimientos de disparo/retroceso/recarga se verifican por separado: las 16 poses base no acreditan animaciones completas ni su montaje jugable.

**Recomendación:** sí hace falta una propuesta visual acotada de reemplazo del dibujo provisional del Subfusil, seguida de aceptación y montaje técnico. No hace falta abrir el catálogo de 90 armas ni rediseñar sus estadísticas. Este encargo solo identifica y especifica la carencia; no produce ni aprueba ese arte.

## Dependencias y autoridad de implementación

- ARMAS: producir y presentar el recurso identificado cuando se encargue esa siguiente fase; registrar la aceptación real y sus anclas revisadas.
- PERSONAJES: compatibilidad del montaje y disponibilidad de manos. No se modifica su pauta ni sus originales.
- PROGRAMACION: aplicar únicamente el recurso correspondiente tras resolver esta dependencia y comprobar proporciones, salida y capas en la partida. Mientras tanto, no equipar otra identidad para fingir el cierre; mantener explícita la condición provisional que describe su informe.
- ESTRUCTURA: seguimiento de la dependencia de recurso de INC-VIS-001. **EST-ARM-001 r1 se conserva:** progresión y F24 no se alteran ni se vuelven a proponer aquí. Este informe no reabre el gate de CC04/TE01/F24.

El estado técnico y el cierre global se consultan exclusivamente en `docs/gestion/REGISTRO_IMPLEMENTACION.md`, `docs/gestion/informes/INC-VIS-001-programacion.md` y `docs/gestion/INC-VIS-001.md`. ARMAS no mantiene una segunda lista de correcciones implementadas. Se ha leído el informe técnico vigente; esta ficha no acredita publicación, montaje final, balance o teléfono físico.

## Decisión guardada y límites

Se guarda **ARM-SMG-REC-001 r1: carencia verificada dentro del corte auditado**, con el recurso mínimo propuesto ARM-SMG-VIS-001 r1. **No es una aceptación de arte de Iván** y no tiene cita de aprobación nueva. La cita «aprobado.» de ARM-VIS-001/R1 no cubre smg.

No se modificaron código, estadísticas ni imágenes; no se enviaron mensajes a otros hilos. ESTRUCTURA puede leer esta ficha y transmitirla a PROGRAMACION según el encargo recibido.
