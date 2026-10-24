# Control de cambios — ESTRUCTURA

Revisión de control **0.5** · 23/10/2026 · Responsable: **Juanillo / ESTRUCTURA**.

Entrada maestra: [PAUTA_DESARROLLO.md](../../PAUTA_DESARROLLO.md).

## Estado operativo

**Rol de ESTRUCTURA activado por instrucción directa de Iván.** Este registro organiza revisiones, conflictos y lotes. La activación no equivale a consolidar los ocho historiales ni a activar instrucciones de otras áreas.

La activación inicial no preparó un lote. Posteriormente, REV-EST-0003 registra la aprobación del dado y prepara LOT-EST-001 r1 para su núcleo de sorteos aislado; REV-EST-0005 registra la aceptación de armas y prepara LOT-EST-002 r1 por fases. La integración completa de grietas sigue fuera del primero. Las entregas y autorizaciones anteriores mantienen su alcance; este registro no las revoca ni las da por revalidadas.

## Decisiones de coordinación

### EST-ORG-001 · Revisión 1 · Activa — Rol de ESTRUCTURA

- **Fecha:** 23/10/2026.
- **Fuente:** mensaje directo de Iván en ESTRUCTURA, hilo `01a1457c-c051-73d2-9864-e7deb6435420`. El identificador individual del mensaje no está expuesto en esta ejecución.
- **Cita de referencia:** «Eres Juanillo, coordinador de ESTRUCTURA de SCP Survivor. Mantén PAUTA_DESARROLLO.md como entrada maestra y docs/gestion/CONTROL_CAMBIOS.md como registro de revisiones examinadas, conflictos y lotes de implementación».
- **Alcance aceptado:** registrar reglas globales aprobadas aquí; respetar recursos y decisiones de las especialidades; al pedir consolidación, comparar revisiones y consultar cambios y dependencias, recuperando conversaciones solo cuando falte evidencia; declarar cobertura real.
- **Coherencia:** no reinterpretar aprobaciones para hacerlas encajar. Resolver con evidencia; ante una elección nueva, presentar el conflicto y recomendar solución, continuando con lo independiente.
- **Salidas:** mantener resumen e índice maestro, preparar lotes con decisiones/revisiones/recursos/dependencias/criterios de prueba, conservar las revisiones citadas y enlazar informes de PROGRAMACION.
- **Límites:** consolidar no implementa ni publica. Un fallo técnico ya encargado que contradiga el diseño aprobado no requiere otra consolidación.
- **Comunicación final:** cambios consolidados, lote preparado si existe, conflictos concretos y cobertura revisada. No presentar un lote como listo solo por crear este archivo.
- **Reemplazo:** activa para este hilo las instrucciones de coordinación antes propuestas; no aprueba por inferencia todos los apartados del protocolo V2 ni cambia el nivel/modelo de los agentes.

## Decisiones generales

### EST-ARM-001 · Revisión 1 · Aprobada — Progresión y primera fusión

- **Fecha y fuente:** 23/10/2026, mensaje directo de Iván en ESTRUCTURA, hilo `01a1457c-c051-73d2-9864-e7deb6435420`; ID individual del mensaje no expuesto.
- **Cita exacta:** «acepto todo.» Referente: propuesta de cierre EST-ARM-001 r1 presentada inmediatamente antes, no los catálogos completos de las especialidades.
- **Decisión:** escala 1–5 + MAX por copia equipada, perfiles/ascensos de ensayo, una fusión por expedición, estación accesible desde mapa 2 mientras quede uso, consumo de dos copias temporales MAX y resultado FINAL sin refusión. Primera receta jugable CC04 + TE01 → F24. Acepta también el contrato de animación y el orden de integración.
- **Sustitución explícita:** las cuatro ramas dejan de ser diseño vigente de armas; su presencia en el código y entregas previas es antecedente pendiente de adaptación. Poderes/generales conservan 5 + extra, ultimates cinco permanentes. Sin cambios de dominio, economía o gacha.
- **Fuente conservada:** [propuesta presentada r1](../CIERRE_ARMAS_PROGRESION_FUSION_V1_PROPUESTA.md), SHA-256 `03ab0d512e07ed3a97252c988512e42c831cd82c4cd7033075b612ec97dd1c2a`; [reglas r1 aprobadas](../CIERRE_ARMAS_PROGRESION_FUSION_V1.md). Futuras modificaciones de mecánica deberán citar una revisión posterior.
- **Límites:** no acredita balance, poses verificadas, implementación o publicación; no aprueba las otras 62 recetas ni todos los 90 modelos. ARM-VIS-001/R1 mantiene su alcance visual independiente.
- **Lote:** [LOT-EST-002 r1](lotes/LOT-EST-002-r1.md), listo documentalmente por fases para PROGRAMACION. Montaje/poses, ubicación y confirmación son dependencias de producción con comprobación pendiente; no se dan por resueltas al aceptar el diseño.

### EST-GRI-001 · Revisión 1 · Aprobada — Dado y horarios

- **Fecha y fuente:** 23/10/2026, mensaje directo de Iván en ESTRUCTURA, hilo `01a1457c-c051-73d2-9864-e7deb6435420`; ID individual del mensaje no expuesto.
- **Cita exacta:** «Apruebo el dado 50/50, con tiradas del minuto 1 al 4 desde el segundo mapa y máximo dos grietas.»
- **Decisión:** oportunidades a 1:00/2:00/3:00/4:00 activos desde el segundo mapa, sí/no 50/50 y máximo acumulado de dos apariciones por mapa.
- **Dependencia conservada:** segundo sorteo de peligrosidad 50/32/8/7/3 ya elegido por Iván; ventana de entrada y reglas del recinto mantienen su alcance propio.
- **Reemplazo:** deja aprobados horarios y sí/no antes pendientes en ficha 2.1, matriz 46 y resumen maestro. No aprueba automáticamente propuestas adicionales de ubicación, fallos, persistencia o refuerzo exterior.
- **Revisión vigente:** [ficha de grietas 2.2](../GRIETAS_DADO_POR_MINUTO_V2.md).
- **Lote:** [LOT-EST-001 r1](lotes/LOT-EST-001-r1.md), núcleo aislado listo documentalmente; pendiente de encargo de implementación y sin código nuevo por esta entrega.

## Registro de revisiones examinadas

### REV-EST-0005 — Aceptación de EST-ARM-001 r1 · 23/10/2026

- **Entrada nueva:** aprobación directa «acepto todo.» del cierre preparado en REV-EST-0004. Cierra su espera de aprobación y convierte LOT-EST-002 r0 en r1 listo documentalmente, conservando la propuesta presentada.
- **Consolidado:** reglas y valores de ensayo del cierre completo; resumen maestro, matriz 19/escala/fusión/pendientes y wiki alineados. Nota posterior en el corte histórico de PROGRAMACION, sin reescribir sus resultados. Las pautas y recursos de las especialidades se conservan; ARMAS debe reflejar esta referencia al revisar sus registros de progresión/fusión.
- **Cobertura real:** mensaje actual, cierre r1 completo y apartados afectados de maestro, matriz, wiki, corte y control. No se recuperaron los ocho historiales ni se revalidaron los 160 PNG, código, navegador o dispositivo; se conserva la comprobación previa de recursos descrita en REV-EST-0004.
- **Pendiente:** PROGRAMACION debe integrar y aportar su informe; PERSONAJES/ARMAS verifican poses compatibles, NIVELES ubicación transitable y MENUS confirmación. Los valores quedan aceptados para ensayo, todavía sin medición de balance. No se identifica una nueva elección de diseño que exija otra aprobación para preparar este lote.
- **Lote independiente:** LOT-EST-001 r1 de grietas mantiene su alcance y revisión; la aceptación de armas no amplía su implementación.

### REV-EST-0004 — Cierre de pendientes de ARMAS · 23/10/2026

**Registro histórico:** la espera de aprobación descrita en esta revisión quedó cerrada posteriormente por REV-EST-0005.

- **Encargo:** Iván pide diseñar solución de progresión, fusión, animaciones e integración para seguir. Esto autoriza preparar la propuesta, no aceptar nuevas reglas en su nombre.
- **Fuentes:** pauta ARMAS **R2**, aceptación **ARM-VIS-001/R1**, catálogo direccional 1.0 y datos de modelos/receta F24 en el catálogo de diseño. Se consultó también el perfil actual de FieldCatalog y el punto de oferta de mejoras; sin ejecutar ni editar código. Dos revisiones independientes de Luna trataron progresión y contrato de animación.
- **Consolidado:** aceptación visual del lote nueve armas + F24, ocho vistas en 16/32 y 160 sprites. No se generaliza a los 90 modelos ni a todas las recetas. Se corrige el resumen maestro anterior que aún presentaba las ocho vistas del lote como no aprobadas.
- **Propuesta nueva en ese corte:** [EST-ARM-001 r1 presentada](../CIERRE_ARMAS_PROGRESION_FUSION_V1_PROPUESTA.md), escala única, reglas de sala/fusión, perfiles de ensayo, primera F24 y contrato de animación. Entonces pendiente de aprobación específica: no reemplazaba por sí sola las cuatro ramas aceptadas.
- **Dependencias:** montaje/poses compatibles de PERSONAJES, interacción de MENUS, sala válida de NIVELES e implementación de PROGRAMACION. Se conservan las pautas y PNG originales de esas áreas.
- **Cobertura:** acotada a este lote de armas y documentos relacionados; no recuperación completa de hilos ni prueba de combate/balance/publicación.
- **Lote:** LOT-EST-002 r0 en preparación; no listo para ejecutar hasta adoptar las reglas nuevas y comprobar dependencias de montaje. LOT-EST-001 de grietas conserva su alcance independiente.

### REV-EST-0003 — Aprobación del dado y consolidación acotada · 23/10/2026

Se leyó el mensaje de aprobación, la ficha de dado 2.1 completa, el control 0.2, cabeceras/notas relacionadas de la pauta maestra y wiki, y las referencias de matriz 46 y corte previo de PROGRAMACION. Se actualiza la ficha a 2.2 y se prepara únicamente el director de oportunidades.

Cobertura: coherencia de calendario, probabilidad, cap de apariciones y pesos ya elegidos. No se recuperan ocho historiales ni se revalidan código, arte, publicación o catálogo de encuentros. El corte previo del 23/10 conserva su contexto histórico, con nota de aprobación posterior.

Resultado: EST-GRI-001 r1 consolidada para el alcance explícito; LOT-EST-001 r1 listo como núcleo aislado. La integración de recintos/encuentros/NPC no se incluye ni se declara lista.

### REV-EST-0001 — Inicialización documental · 23/10/2026

**Objetivo:** registrar el rol e identificar las fuentes existentes. Lectura local acotada; no auditoría completa de áreas, código, recursos o conversaciones.

| Área | Fuente encontrada / revisión observada | Cobertura de esta revisión | Próxima acción de consolidación |
|---|---|---|---|
| ESTRUCTURA | [Pauta maestra](../../PAUTA_DESARROLLO.md), cabecera de entrega 0.33 y notas de decisiones; protocolos V1/V2 | Cabecera y primeras 48 líneas de la pauta; rol directo del usuario y propuesta de organización disponibles en la conversación | Examinar solo las decisiones nuevas y dependencias cuando se pida consolidar |
| PERSONAJES | [Aprobación de diseños 22/10](../PERSONAJES_APROBACION_2026-10-22.md) | Lectura del registro breve de aprobación y sus límites; no nueva recuperación del hilo | Verificar cambios posteriores y ubicación de su pauta vigente |
| ARMAS | [Pauta de armas](../PAUTA_ARMAS.md), actualización 22/10 | Primeras 12 líneas; no catálogo ni aceptación posterior revisados en esta activación | Comparar contenido/revisión y recuperar solo las aprobaciones que falten |
| NIVELES | [Pauta de escenarios](../PAUTA_CREACION_ESCENARIOS.md), **R7.1** del 23/10 | Cabecera, autoridad y final del contrato/entrega; no lectura completa de su registro de decisiones | Usar R7.1 como versión observada, sin reutilizar el supuesto anterior de que aún duplica el estado de integración |
| SONIDO | [Pauta de sonido](../PAUTA_SONIDO.md), **SON-001 rev. 1.0** | Lectura del registro de recurso, alcance, dependencias e historial; sin reproducir audio ni revisar código | Enlazar la selección exacta al preparar una integración autorizada; no decidir sonido del compañero a partir de este ambiente |
| MENUS | [Informe de PROGRAMACION](../PRESENTACION_INTEGRADA.md), entrega **0.33** | Solo referencia de implementación en las primeras 30 líneas del informe; no pauta de MENUS ni hilo revisados aquí | Localizar pauta/recursos propios antes de consolidar cambios de diseño |
| ICONO APP | [Informe de PROGRAMACION](../PRESENTACION_INTEGRADA.md), entrega **0.33** | Solo referencia al icono 3 en el informe; no nueva revisión de aprobación ni binarios | Localizar aprobación y recurso exactos si entra en un lote nuevo |
| PROGRAMACION | [Presentación integrada](../PRESENTACION_INTEGRADA.md), **0.33** | Primeras 30 líneas: alcance declarado y limitaciones; sin repetir pruebas, comprobar publicación o releer el hilo | Enlazar el informe correspondiente al alcance que se consolide |

La revisión observada permite detectar novedades, pero **no acredita consolidación completa**. La ausencia de una pauta en esta tabla significa que no se identificó/revisó aquí, no que esa área carezca de documentación.

Las fuentes leídas parcialmente no reciben un estado de «aprobación verificada» o «sin cambios pendientes». Una futura consolidación debe completar solo los tramos relevantes, no asumir revisado todo el archivo por conocer su cabecera.

## Conflictos y carencias

### REV-EST-0002 — Consulta de implementación de grietas visuales · 23/10/2026

- **Alcance consultado:** catálogo aprobado GRIETAS-V1 / 01–06 de NIVELES; implementación visual y evidencia declarada por PROGRAMACION.
- **Fuentes revisadas:** registro de aprobación y sección de evidencia en [pauta R7.1](../PAUTA_CREACION_ESCENARIOS.md); [informe de presentación 0.33](../PRESENTACION_INTEGRADA.md); código [rift-visuals.js](../../js/ui/rift-visuals.js) y conexión con [dimensional-rifts.js](../../js/systems/dimensional-rifts.js); campos de estado/fecha de los recibos [validación](../PRESENTACION_VALIDACION.json) y [publicación](../PRESENTACION_PUBLICACION.json).
- **Resultado:** las seis apariencias tienen render específico y están conectadas al dibujo del encuentro de práctica B3 en gráficos 16/32. La apariencia se selecciona sin definir su peligrosidad. No son solo imágenes de referencia guardadas.
- **Publicación registrada:** recibo PASS del 23/10/2026 a las 08:49, zona -03:00; runtime `484f2f2b6e9aa3e983ffdc12df53f9551f298f5b`. Validación registrada PASS a las 08:20. Este control leyó esos recibos; no repitió la prueba del navegador ni comprobó nuevamente el sitio público.
- **Límites vigentes del informe:** B3 se juega dentro del mismo mapa. El nuevo dado por minuto, tabla 50/32/8/7/3, máximo dos apariciones, recinto separado y compañeros/diálogos no quedan implementados por aplicar estas apariencias.
- **Aceptación:** aprobación de los diseños comprobada en el registro de NIVELES. El recibo conserva aceptación manual de la presentación integrada pendiente y teléfono físico no verificado; no se convierten en aprobados por esta consulta.
- **Cambios/lote:** registro de alcance y evidencia, sin nuevo código, publicación, instrucciones de áreas ni lote de implementación. No equivale a consolidación de los ocho hilos.

- **Conflictos nuevos elevados a Iván:** ninguno resuelto ni declarado inexistente en esta inicialización. Todavía no se hizo la primera comparación cruzada completa.
- **Cobertura pendiente:** pautas/revisiones de MENUS, ICONO APP y cambios posteriores de PERSONAJES; decisiones de las fuentes leídas parcialmente cuando afecten un encargo.
- **Nota de vigencia comprobada:** NIVELES ya dispone de R7.1 y remite su implementación a PROGRAMACION; el ejemplo de duplicación detectado durante la propuesta anterior no se presenta aquí como un fallo actual sin resolver.
- **Activación de otros roles:** no realizada por ESTRUCTURA. No se enviaron mensajes a otros hilos ni se modificaron sus instrucciones.

## Lotes de implementación

### LOT-EST-002 r1 — Progresión y primera fusión de armas

**Listo documentalmente para PROGRAMACION por fases**, con EST-ARM-001 r1 y ARM-VIS-001/R1 aprobadas. [Lote, fuentes conservadas, dependencias y criterios](lotes/LOT-EST-002-r1.md). Montaje de diez modelos y primera prueba jugable AF01/CC04/TE01 → F24; no afirma nueve armas funcionales ni integra las 63 recetas. La habilitación de parejas depende de comprobar sus agarres/poses; sala y presentación requieren integración. El r0 queda como antecedente en REV-EST-0004 y en la propuesta preservada. Sin ejecución ni publicación por esta consolidación.

### LOT-EST-001 r1 — Director de sorteos

**Listo documentalmente para implementar y comprobar el núcleo aislado**, con EST-GRI-001 r1 y los pesos previos 50/32/8/7/3. [Alcance fijado, dependencias y criterios](lotes/LOT-EST-001-r1.md). No hay ejecución de código en esta revisión ni encargo de publicación; la integración completa sigue pendiente de sus dependencias.

REV-EST-0001 no preparó lotes; este registro posterior no cambia su cobertura histórica.

Al consolidar un alcance, registrar como mínimo:

1. ID/revisión y objetivo del lote.
2. Decisiones concretas y revisión de cada una; aprobaciones comprobadas.
3. Recursos exactos, variantes y referencias recuperables.
4. Dependencias y conflictos relevantes tratados.
5. Criterios verificables y límites pendientes.
6. Estado documental: en preparación o listo; encargo de implementación existente, si lo hay.
7. Informe de PROGRAMACION cuando se ejecute, sin confundir diseño listo con código probado o publicado.

Un historial, archivo o revisión citados deben permanecer recuperables. Evitar cambiar la base de un lote en curso por una actualización posterior sin evaluar y registrar su efecto.

## Método incremental activo

Cuando Iván pida consolidar: consultar el índice maestro, comparar revisiones de las áreas relevantes contra este control, leer sus cambios y dependencias, y registrar una nueva revisión de cobertura. Conservar este registro inicial como historial, no convertirlo retroactivamente en una auditoría completa.

Las áreas mantienen la propiedad de sus pautas. ESTRUCTURA actualiza este control y la entrada maestra mediante resúmenes y enlaces; PROGRAMACION aporta evidencia de ejecución. Los agentes auxiliares entregan resultados al responsable, evitando escritores simultáneos en este control.
