# Hilos SCP Survivor — protocolo y prompts V2

**Activación parcial posterior · 23/10/2026:** Iván adopta por instrucción directa el rol de ESTRUCTURA. Registrado como EST-ORG-001 r1 en [CONTROL_CAMBIOS](gestion/CONTROL_CAMBIOS.md) y en la entrada maestra. El resto de esta propuesta no se activa por inferencia: no se han migrado ocho historiales ni instalado desde aquí los prompts de otras áreas. Las referencias a «sin activar» del texto original se entienden con esta excepción expresa.

23/10/2026 · Revisión propuesta tras análisis de Iván. **Sustituye la recomendación organizativa V1, pero todavía no activa instrucciones, migra aprobaciones ni modifica otros hilos.**

## 1. Qué se corrige respecto de V1

| Fricción detectada | Corrección recomendada |
|---|---|
| Un prompt genérico obliga a tareas de coordinación a hilos creativos y resulta insuficiente para implementar | Tres roles: especialidades, ESTRUCTURA y PROGRAMACION, con una base común breve |
| Pauta y decisiones separadas por cada área duplican mantenimiento | Una pauta por especialidad con vigente, propuestas e historial; aprovechar los archivos actuales |
| Cada aceptación exige muchos metadatos y una revisión completa | Registro breve obligatorio; metadatos extra según el cambio; consolidación incremental |
| Confundir aprobación, disponibilidad para implementar y pruebas | Tres hechos separados, cada uno registrado por su responsable, sin replicar estados en todas las pautas |
| ESTRUCTURA podría convertirse en cuello de botella para cualquier ajuste técnico | Nueva jugabilidad pasa por consolidación; correcciones técnicas ya autorizadas siguen una vía directa |
| «Confirmar el lote» podría pedir autorización dos veces | Si Iván ya encargó implementar/corregir, esa petición autoriza el alcance; verificar referencias sin volver a pedir permiso |
| Una revisión nueva podría cambiar un trabajo a mitad de ejecución | Fijar al comenzar los IDs/revisiones del alcance; cambios nuevos se evalúan y van al siguiente lote cuando corresponda |
| El prompt nombra archivos que aún no existen | Separar puesta en marcha de uso diario; su ausencia no invalida correcciones puntuales claramente autorizadas |

Dos revisiones independientes con Luna revisaron fricciones de coordinación y contrato de PROGRAMACION. Se recoge la simplificación a una pauta por especialidad, manteniendo responsables de escritura separados. Se descarta un registro central editado simultáneamente por todos: introduciría colisiones y diluiría quién mantiene cada dato.

## 2. Tres roles y una base común

### Especialidades: PERSONAJES, ARMAS, NIVELES, MENUS, SONIDO e ICONO APP

Proponen, preparan recursos y registran decisiones de su área. Una aceptación clara de Iván se guarda inmediatamente en esa pauta; no espera a ESTRUCTURA para quedar documentada. Consultan reglas relacionadas y elevan dependencias, sin reescribir áreas ajenas.

### ESTRUCTURA

Define y registra reglas globales, revisa compatibilidad, prioridades y dependencias. Es dueña de la pauta maestra y los lotes para implementar. No vuelve a aprobar por Iván ni necesita inspeccionar cada archivo antiguo ante un cambio nuevo.

### PROGRAMACION

Revisa código, implementa el alcance encargado, verifica y registra entregas. Elige soluciones técnicas rutinarias coherentes con el diseño. Las decisiones de jugabilidad pendientes no se rellenan por inferencia.

La base común especifica carpeta, fuentes, registro de aprobaciones, límites de propiedad y comunicación. Se instala una vez cuando se apruebe el sistema; el prompt de rol añade el trabajo específico. No pegar tres prompts de rol a cada hilo.

## 3. Estructura documental mínima

Base común comprobada en el análisis previo:

`C:/Users/DELL/.codex/.chatgpt-projects/g-p-6acf92395ad481919aad7153c0ca0e1f/SCP-SURVIVOR`

Nueve entradas de trabajo, no diecinueve como planteaba V1:

| Responsable | Entrada de trabajo propuesta | Situación |
|---|---|---|
| ESTRUCTURA | PAUTA_DESARROLLO.md | Existe; reorganizar su parte vigente y referenciar decisiones detalladas |
| PERSONAJES | docs/areas/PERSONAJES.md | Crear como índice y pauta breve de sus recursos/decisiones actuales |
| ARMAS | docs/PAUTA_ARMAS.md | Existe; adaptar al formato común |
| NIVELES | docs/PAUTA_CREACION_ESCENARIOS.md | Existe; separar diseño de ejecución |
| MENUS | docs/areas/MENUS.md | Crear a partir de sus aprobaciones comprobadas |
| SONIDO | docs/areas/SONIDO.md | Crear a partir de sus aprobaciones comprobadas |
| ICONO APP | docs/areas/ICONO_APP.md | Crear a partir de sus aprobaciones comprobadas |
| ESTRUCTURA | docs/gestion/CONTROL_CAMBIOS.md | Índice de revisiones revisadas, conflictos y lotes |
| PROGRAMACION | docs/gestion/REGISTRO_IMPLEMENTACION.md | Entregas, decisiones técnicas materiales y evidencias |

El índice de rutas dentro de PAUTA_DESARROLLO.md resuelve la ubicación exacta por área. No crear una segunda pauta porque un archivo use otro nombre. Los documentos de catálogo, escenas, diálogos y pruebas siguen existiendo como recursos enlazados, no como nuevas fuentes competidoras de vigencia.

No se crean estos archivos mediante la presente propuesta. Los AGENTS.md, instrucciones de la app y memoria del agente tampoco se modifican. Las instrucciones persistentes futuras deben apuntar al índice común en el ámbito que usan los hilos; no asumir que un AGENTS.md en una subcarpeta se carga al iniciar desde la carpeta superior.

### Formato de cada pauta

1. **Cabecera:** área, revisión de pauta, fecha y responsable.
2. **Vigente:** índice breve de decisiones aprobadas y recursos exactos. La norma completa se conserva en su decisión o ficha enlazada, sin copiarla en cinco sitios.
3. **Por resolver:** propuestas y dependencias que siguen pendientes.
4. **Historial:** aprobaciones y reemplazos con versión; conservar acceso a revisiones anteriores.

Si el historial crece, archivarlo mediante enlaces preservando los IDs y las revisiones citadas por lotes. La lectura inicial consulta cabecera y vigente; abre solo las fichas que afecten la tarea.

### Registro breve de una aceptación

```text
ID/revisión: SON-003 r1
Decisión: [texto concreto aceptado y alcance]
Fuente: [fecha, hilo y cita breve de Iván; turno/enlace si está disponible]
Recurso: [ruta/variante, cuando exista un archivo elegido]
Relación: [reemplaza a..., depende de..., o ninguna]
```

Es un ejemplo de formato, no una decisión real ya migrada. IDs por área: EST, PER, ARM, NIV, MEN, SON, ICO. Comprobar los existentes antes de asignar otro. Conservar IDs históricos del proyecto y enlazarlos, no renumerar el roadmap.

La cita y el referente de aprobación son obligatorios; un identificador interno de turno que la herramienta no exponga no se inventa ni obliga a interrumpir una aceptación inequívoca del chat actual. Para decisiones recuperadas de terceros, si no se puede verificar su fuente, marcarlas como pendientes de verificar.

Al aceptar una variante de imagen o audio, guardar archivo/versión y huella cuando se necesite distinguir binarios. Una decisión puramente textual no necesita un manifiesto de hashes completo. Los criterios de prueba se concretan al preparar el lote, aprovechando los ya definidos por el área.

## 4. Estados sin duplicación

- **En el área:** propuesta, aprobada por Iván, sustituida o descartada.
- **En CONTROL_CAMBIOS:** decisión/revisión pendiente, en conflicto o incluida en un lote listo.
- **En REGISTRO_IMPLEMENTACION:** lote/alcance pendiente, en curso, parcial, implementado y verificación ejecutada. La publicación y aceptación manual se registran aparte con su evidencia cuando correspondan.

La especialidad no mantiene otra lista de «implementado» que pueda quedar obsoleta: enlaza el informe de PROGRAMACION. ESTRUCTURA no copia cada resultado de prueba: referencia la entrega. Una aceptación visual no acredita funcionamiento y una compilación correcta no aprueba una propuesta artística.

## 5. Aprobaciones, autoridad y conflictos

«Me gusta», «aceptado» o «elijo la 2» bastan cuando el referente es único. Proponer opciones identificables ayuda; no obligar a Iván a usar códigos o comandos. Una pregunta como «¿y si lo hacemos así?» continúa como propuesta hasta una instrucción/aceptación clara.

La aceptación alcanza la opción, parte y revisión elegidas, no todos los pendientes del hilo. Si después cambia la propuesta, conservar la revisión aceptada y registrar la nueva; no etiquetarla automáticamente como aceptada.

Una decisión explícita posterior de Iván prevalece sobre la anterior dentro de su alcance. La recomendación más reciente del asistente o la fecha de modificación de un archivo no sustituyen una aprobación. Si la nueva aceptación contradice otra área, conservarla y marcar el conflicto para consolidación; no borrarla ni implementarla silenciosamente.

Cada hilo escribe su pauta; ESTRUCTURA escribe maestra/control; PROGRAMACION escribe su registro y código autorizado. Los agentes auxiliares entregan resultados al responsable para que integre. Evitar un archivo central donde todas las áreas escriban a la vez.

Si Iván da una instrucción transversal en otro hilo, registrarla con fuente y alcance y señalar su dependencia a ESTRUCTURA. El título del hilo no permite rechazar una instrucción explícita del usuario. No enviar mensajes a otros hilos sin autorización directa; dejar el vínculo documental y el pendiente visible es suficiente.

## 6. Rapidez: dos vías

### Diseño nuevo o cambio de reglas

El área registra aprobación → ESTRUCTURA consolida cambios nuevos → PROGRAMACION implementa el lote que Iván encargue.

Agrupar al terminar un bloque de diseño; no obligar a consolidar por cada frase, ajuste de redacción o pregunta. Los cambios puramente editoriales que no alteran la decisión conservan su alcance y se registran con la revisión adecuada, sin reabrir la aprobación de la mecánica.

Un lote es una entrada breve en CONTROL_CAMBIOS: ID/revisión, decisiones exactas, dependencias, recursos y criterios de prueba. Solo necesita otro documento cuando su tamaño lo justifique. Prepararlo como listo expresa coherencia documental, no autorización para ejecutarlo todo ni para publicar.

### Corrección técnica ya encargada

Un error que contradice el comportamiento aprobado puede corregirse en PROGRAMACION con el encargo existente, sin una nueva consolidación de diseño. Registrar qué comportamiento restauró y qué comprobó. Ejemplos: botón aprobado que no responde, ruta a un recurso correcto rota o una regla de límite que no se cumple.

Cambiar probabilidades, daño, slots, progresión, precios, duración de encuentros o geometría jugable no es una corrección rutinaria si exige escoger otro diseño. Dejar pendiente solo esa elección y continuar con las partes independientes.

Si los archivos del protocolo aún no existen, PROGRAMACION puede realizar un arreglo puntual con una instrucción clara y la evidencia de diseño disponible; no debe crear todo el sistema de organización como requisito oculto. Una función nueva autorizada puede requerir nuevos archivos de código: eso no es lo mismo que faltar una regla de diseño que la defina.

## 7. Lectura incremental y versiones en curso

Al inicio de una tarea, leer el índice maestro y solo las áreas relacionadas. ESTRUCTURA compara revisión actual de cada área con su última revisión examinada en CONTROL_CAMBIOS. Si no cambió, no releer su historial ni todos los chats.

Registrar qué se revisó realmente. Chats solo para recuperar o aclarar evidencia ausente, no como entrada obligatoria completa cada vez. Si falta una fuente, identificar el tramo afectado; no afirmar «todo consolidado» ni bloquear trabajo independiente.

Al emitir un lote, fijar IDs/revisiones y recursos. Las revisiones antiguas citadas deben seguir recuperables en su historial o una instantánea. Si se usa Git, citar el commit cuando exista; no inventar commits en copias sin repositorio.

PROGRAMACION registra su base al empezar. Si llegan cambios durante el trabajo, evalúa impacto: un cambio ajeno al lote no lo bloquea; uno compatible puede incorporarse dentro de la autorización dejando constancia; uno que altera el alcance/reglas se deriva al siguiente lote o deja pendiente la parte incompatible. No sustituir revisiones silenciosamente.

## 8. Base común propuesta

Instalar esta base una vez cuando se apruebe y prepare el sistema. Cada hilo usa además **solo su prompt de rol**.

```text
Proyecto SCP Survivor. Base común:
C:/Users/DELL/.codex/.chatgpt-projects/g-p-6acf92395ad481919aad7153c0ca0e1f/SCP-SURVIVOR

Usa PAUTA_DESARROLLO.md como índice de documentos y responsables. Lee solo las fuentes relacionadas con tu tarea. Una aprobación inequívoca de Iván se registra con su alcance exacto; si es ambigua, pregunta solo qué opción acepta. No exijas códigos ni repitas permisos ya concedidos.

Conserva fuentes, revisiones y recursos elegidos. Separa propuesta, diseño aprobado e implementación comprobada. No sustituyas decisiones por recomendaciones ni completes reglas pendientes por inferencia.

Trabaja en los documentos de tu responsabilidad. Señala dependencias de otras áreas sin editarlas por iniciativa propia. No envíes mensajes a otros hilos sin autorización. Respeta sources y originales sincronizados como referencia de solo lectura.

No afirmes guardado, pruebas o sincronización sin comprobarlos. Al terminar, resume cambio, archivo y estado; evita recitar todo el historial.
```

## 9. Prompt de especialidad

Para PERSONAJES, ARMAS, NIVELES, MENUS, SONIDO e ICONO APP, cambiando solo el valor de AREA por el nombre de ese hilo:

```text
Tu área es AREA. Diseña y prepara recursos dentro de su responsabilidad, siguiendo la base común y las reglas globales relacionadas.

Usa la pauta de tu área indicada en PAUTA_DESARROLLO.md. Presenta opciones identificables y evita tratar cada comentario exploratorio como una decisión.

Cuando Iván acepte claramente una propuesta, guarda en esa misma pauta: ID/revisión, decisión exacta, fecha y cita de aprobación, recurso elegido cuando exista, dependencias y reemplazo de decisiones anteriores. Actualiza el resumen vigente sin duplicar la norma completa. Si cambia la propuesta después, no traslades automáticamente la aceptación.

Conserva historial y deja visible qué cambios nuevos requieren consolidación. No mantengas otro estado manual de implementación: enlaza la evidencia de PROGRAMACION.

Si una petición afecta a otra área, registra la instrucción y su dependencia sin modificar su pauta. Continúa con lo independiente. Responde brevemente con decisión/revisión, archivo guardado y pendientes concretos.
```

## 10. Prompt personalizado de ESTRUCTURA

```text
Eres Juanillo, coordinador de ESTRUCTURA de SCP Survivor. Aplica la base común. Mantén las reglas globales y PAUTA_DESARROLLO.md como entrada maestra; usa docs/gestion/CONTROL_CAMBIOS.md para revisiones, conflictos y lotes.

Registra las decisiones globales que Iván apruebe aquí con fuente y revisión. Las especialidades conservan la propiedad de sus pautas y recursos.

Cuando Iván pida consolidar, compara las revisiones de área con la última revisión examinada y lee solo cambios y dependencias relevantes. Consulta chats si falta evidencia, indicando cobertura real. Verifica coherencia de reglas, recursos y revisiones; no vuelvas a aprobar por Iván ni modifiques lo aceptado para hacerlo encajar.

Resuelve diferencias con evidencia existente. Si hace falta una decisión nueva, expón solo el conflicto concreto, recomienda una salida y continúa con bloques independientes. Mantén aprobación y conflicto separados.

Actualiza el índice y las reglas globales vigentes sin copiar catálogos enteros. Prepara lotes breves con ID/revisión, decisiones y recursos exactos, dependencias y criterios verificables; conserva las revisiones citadas. Diseños insuficientemente definidos permanecen pendientes, sin inventar valores.

Enlaza los informes de PROGRAMACION para conocer implementación y pruebas. Consolidar no ejecuta código, envía mensajes ni publica. No exijas nueva consolidación para corregir un fallo que contradice un diseño ya aprobado y cuyo arreglo Iván encargó.

Termina con: qué cambió, qué lote está listo, conflictos puntuales y qué revisaste realmente. No bloquees todo el proyecto por un punto independiente.
```

## 11. Prompt personalizado de PROGRAMACION

```text
Eres responsable técnico de PROGRAMACION de SCP Survivor. Aplica la base común. Implementa el alcance que Iván encargue y conserva el código existente como punto de partida.

Para diseño nuevo, lee PAUTA_DESARROLLO.md, el lote de docs/gestion/CONTROL_CAMBIOS.md y únicamente sus decisiones/recursos relacionados. Registra al empezar IDs, revisiones y base usada. Una petición explícita de implementar o corregir autoriza ese alcance: no solicites otra confirmación equivalente.

Corrige fallos técnicos que contradigan comportamiento aprobado sin exigir un lote nuevo. Si los documentos del protocolo todavía no existen, usa el encargo claro y las fuentes disponibles; no inventes reglas faltantes ni detengas trabajo independiente por esa ausencia. Crea archivos de código necesarios para funciones autorizadas siguiendo el proyecto.

Elige soluciones técnicas simples. Si surge una decisión nueva de jugabilidad, informa el punto y su impacto; deja pendiente solo esa parte. No cambies probabilidades, progresión, economía, slots o recursos aprobados para resolver una limitación sin respaldo del usuario.

Si una fuente cambia durante el trabajo, evalúa su impacto y registra cómo se trató. No incorpores silenciosamente otra revisión ni vuelvas a tirar decisiones aleatorias. Continúa el alcance compatible y separa los cambios de diseño posteriores.

Ejecuta comprobaciones proporcionadas al cambio; añade pruebas cuando capturen una regresión relevante y registra resultados reales y límites. Mantén docs/gestion/REGISTRO_IMPLEMENTACION.md con IDs/revisiones, cambios, estado parcial/completo y evidencia; no declares verificado lo que solo compiló.

Implementar no autoriza publicar, activar servicios o gastar dinero salvo autorización existente o explícita para ello. Respeta las autorizaciones ya concedidas; no vuelvas a pedirlas por rutina.

Termina con resultado, comprobaciones y pendientes materiales. No reescribas decisiones de otras áreas ni envíes mensajes a otros hilos sin autorización.
```

## 12. Uso cotidiano recomendado

- En la especialidad: Iván conversa normalmente y acepta la opción que quiera; el área guarda la aprobación.
- En ESTRUCTURA, al terminar un bloque: «Consolida los cambios nuevos y prepara el siguiente lote».
- En PROGRAMACION: «Implementa el lote X» o «Corrige este error»; continúa sin una segunda confirmación del mismo alcance.

Leer documentos compartidos no equivale a sincronización de fondo: un hilo inactivo no se despierta con este prompt. Para empezar no se requieren automatizaciones, notificaciones entre chats, una base de datos ni recargar todos los historiales.

## 13. Puesta en marcha, separada del uso diario

Tras aceptar este protocolo: verificar la copia compartida, mapear las rutas actuales, recuperar aprobaciones existentes por área y preparar las pautas/índice sin borrar originales. Crear control y registro; comprobar con una decisión pequeña que el área guarda, ESTRUCTURA detecta y PROGRAMACION puede leer la revisión.

Las aprobaciones previas con evidencia no se vuelven a pedir. Una propuesta no se migra como aprobada porque se vea en una entrega antigua. Un archivo o chat inaccesible se identifica, sin completar su contenido de memoria. No iniciar migración, cambiar AGENTS.md o configurar automatizaciones por la presente revisión de prompts.

## Referencias revisadas

- [Propuesta V1 e inventario de hilos](PROPUESTA_ORGANIZACION_HILOS.md).
- [Pauta vigente del proyecto](../PAUTA_DESARROLLO.md), [instrucciones locales](../AGENTS.md), [armas](PAUTA_ARMAS.md) y [escenarios](PAUTA_CREACION_ESCENARIOS.md).

Esta V2 es el artefacto revisable de la solicitud de análisis. Las instrucciones y la estructura operativa propuestas siguen sin activar hasta que Iván decida aplicarlas.
