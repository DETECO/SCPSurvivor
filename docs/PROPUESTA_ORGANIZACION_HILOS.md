# Propuesta de organización de hilos y decisiones — SCP Survivor

**Revisión de la propuesta, 23/10/2026:** [protocolo y prompts V2](PROTOCOLO_HILOS_V2_PROPUESTA.md) sustituye la recomendación de organización y prompts de esta V1: una pauta por especialidad, roles separados y vía directa para correcciones técnicas ya autorizadas. Ambas son propuestas sin activar; este documento conserva el diagnóstico e inventario anteriores, no es una segunda instrucción operativa.

23/10/2026 · ESTRUCTURA · **Propuesta para revisión de Iván. No activa nuevas instrucciones, no migra las pautas ni altera los otros hilos.**

## 1. Diagnóstico comprobado

Los ocho hilos de la imagen existen y sus metadatos consultados apuntan a la misma carpeta local. Esto permite proponer documentos compartidos, pero una conversación nueva o una ejecución en otro equipo debe verificar acceso y versión; el título del proyecto no garantiza por sí solo acceso a todos los archivos o lectura de todos los chats.

La documentación actual ya tiene pautas, recursos, decisiones e informes de implementación; se encontraron 118 archivos directamente bajo docs. Falta una entrada breve que determine para cada tema qué texto está vigente, quién puede modificarlo y qué versión se implementó.

Ejemplo real: la pauta de escenarios conserva «integración pendiente» para R7 mientras el informe PRESENTACION_INTEGRADA.md registra su integración parcial en la presentación 0.33. Eso no se resuelve eligiendo el archivo más reciente para todo: aprobación artística y ejecución son ejes distintos. También se acumularon notas posteriores por encima de instrucciones históricas, haciendo difícil distinguir vigencia sin leer toda la cronología.

Se leyeron las últimas intervenciones accesibles de SONIDO y MENUS, además de metadatos de los ocho hilos y documentación local. No es una auditoría exhaustiva de todos sus historiales. La siguiente fase tendría que recuperar y clasificar las aprobaciones existentes; este documento no las da por migradas.

## 2. Recomendación y alternativas

**Recomendación: documentos compartidos por área + consolidación de ESTRUCTURA + entregas de PROGRAMACION.** Mantener los ocho hilos existentes y sus nombres. No añadir una herramienta de gestión o un servicio para esta primera etapa.

- Solo conversaciones: inicio rápido, pero deja vigencia y acuerdos sujetos a recuperar contexto.
- Documentos compartidos: historial comprobable, responsabilidades claras y lectura directa desde PROGRAMACION. Es la opción recomendada.
- Base de datos/panel con sincronización: podría facilitar búsquedas al escalar, pero añade implementación, mantenimiento y coordinación. Reconsiderar cuando los archivos resulten insuficientes.

Los archivos propuestos son una convención del proyecto, no una función de sincronización de Codex. Las instrucciones comunes guían el trabajo durante las ejecuciones activas; no despiertan un chat ni crean vigilancia de otros hilos. No se configura ninguna automatización en esta entrega.

## 3. Propiedad de cada área

| Hilo | Qué define y conserva | Qué coordina con otras áreas |
|---|---|---|
| ESTRUCTURA | Reglas globales, recorrido, progresión, economía, límites, azar, prioridades y pauta maestra | Contratos entre áreas y conflictos; la aprobación final de nuevas decisiones sigue siendo de Iván |
| PERSONAJES | Soldados, NPC, monstruos, apariencia, sprites, identidades, biografías y textos de diálogo | Capacidades, aparición y efecto de combate con ESTRUCTURA; burbujas con MENUS; sonido con SONIDO |
| ARMAS | Catálogo, identidad de ataques, fichas, recetas y recursos de armas | Límites globales, progresión y balance transversal con ESTRUCTURA; ejecución con PROGRAMACION |
| NIVELES | Escenarios, geometría, composición, módulos, rutas y puntos de aparición válidos | Frecuencia, premios, peligrosidad y reglas de grietas con ESTRUCTURA; amenazas visuales con PERSONAJES |
| MENUS | Pantallas, navegación, HUD, radar, disposición y legibilidad de burbujas | Representa las reglas aceptadas; no cambia sus probabilidades, precios o capacidades |
| SONIDO | Música, efectos, variantes, mezcla y sonidos identificativos | Recibe eventos y recursos aprobados; no cambia personajes, armas o reglas para justificar un sonido |
| ICONO APP | Icono, variantes aprobadas y recursos de identidad para app | Entrega formato/versiones; coordina uso en menús y publicación |
| PROGRAMACION | Arquitectura, código, integración, pruebas, versiones y evidencia de entregas | Implementa el alcance autorizado y consolidado; eleva incompatibilidades de diseño a ESTRUCTURA |

Las áreas pueden proponer dependencias fuera de su ámbito, sin convertirlas en reglas vigentes ni editar la pauta ajena. Una petición explícita de Iván puede reasignar una decisión: registrar esa excepción y avisar a ESTRUCTURA, no rechazarla solo por el título del hilo.

Ejemplo del compañero: ESTRUCTURA define 33%/10%, arma temporal y límites; PERSONAJES conserva sprite, personalidad y frases; MENUS dispone las burbujas; SONIDO diseña el sonido; PROGRAMACION integra y prueba. Es un sistema con entregables de varios dueños, no cinco versiones de su misma regla.

## 4. Archivos propuestos y responsabilidades de escritura

Base común actual:

`C:/Users/DELL/.codex/.chatgpt-projects/g-p-6acf92395ad481919aad7153c0ca0e1f/SCP-SURVIVOR`

Una vez aprobado el sistema, organizar allí:

```text
PAUTA_DESARROLLO.md                 Entrada maestra vigente; la escribe ESTRUCTURA
docs/areas/
  ESTRUCTURA/PAUTA.md               Reglas y decisiones del área
  ESTRUCTURA/DECISIONES.md          Historial de aprobaciones de Iván
  PERSONAJES/PAUTA.md
  PERSONAJES/DECISIONES.md
  ARMAS/PAUTA.md
  ARMAS/DECISIONES.md
  NIVELES/PAUTA.md
  NIVELES/DECISIONES.md
  MENUS/PAUTA.md
  MENUS/DECISIONES.md
  SONIDO/PAUTA.md
  SONIDO/DECISIONES.md
  ICONO_APP/PAUTA.md
  ICONO_APP/DECISIONES.md
  PROGRAMACION/PAUTA.md             Contrato técnico y forma de verificar
  PROGRAMACION/DECISIONES.md        Decisiones técnicas, sin redefinir jugabilidad
docs/gestion/
  CONSOLIDACION.md                  ESTRUCTURA: revisiones leídas, conflictos y lotes
  ENTREGAS_PROGRAMACION.md          PROGRAMACION: ejecución y evidencia por lote
```

Este árbol es propuesto: los archivos anteriores no se han creado con este documento. Las pautas y recursos actuales se enlazarían desde las áreas, conservando sus originales. PAUTA_DESARROLLO.md ya existe y sería reorganizada, no duplicada con otra «pauta maestra» competidora.

Cada área escribe su propia pauta y registro. ESTRUCTURA escribe la entrada maestra y consolidación; PROGRAMACION escribe entregas. Evitar dos escritores simultáneos sobre el mismo archivo. Los agentes auxiliares entregan resultados al responsable de su hilo para que este integre la edición.

Pauta de área: resumen vigente breve con versión y enlaces al historial/recursos. Registro: entradas con cambios trazables, sin borrar decisiones reemplazadas. La maestra resume reglas transversales y referencia versiones de área; no copia todo el catálogo, todos los diálogos y todos los datos de recursos.

Las instrucciones de trabajo deben indicar esta base común y qué documentos leer. AGENTS.md es apropiado para orientación persistente de repositorio, manteniéndolo breve; no debe crecer como un segundo historial de aprobaciones. Como los hilos arrancan en la carpeta superior, no asumir que el AGENTS.md dentro de SCP-SURVIVOR se aplica automáticamente a todos: configurar la instrucción compartida en el ámbito que realmente usen o pedir su lectura explícita en el prompt.

No editar fuentes sincronizadas de sources, material original de otros hilos, copias de auditoría/publicación ni memoria de Codex para usarlos como registro. La memoria personal del agente no sustituye los documentos versionados del juego.

## 5. Cómo registrar una aprobación

Al decir Iván «me gusta», «acepto» o «elijo», guardar si el referente identifica claramente una propuesta/version concreta. No exigir una fórmula exacta ni hacerle repetir una aprobación inequívoca.

Si hay tres variantes y «me gusta» no identifica cuál, preguntar únicamente cuál se acepta. No extender aprobación de imagen a reglas de combate, de una parte al catálogo completo, ni de una propuesta a sus revisiones futuras.

Cada decisión registra:

- ID estable por área: EST-001, PER-001, ARM-001, NIV-001, MEN-001, SON-001, ICO-001 o PRO-001; comprobar el último antes de asignar uno. No migrar numeraciones históricas por suposición.
- Título, revisión, fecha y dueño; texto concreto aprobado y alcance excluido cuando sea material.
- Fuente: nombre/ID de hilo y turno o mensaje, cita breve de Iván y referencia de la propuesta a la que responde. Si no se puede recuperar evidencia, marcar pendiente de verificar.
- Recursos exactos: ruta y versión/variante; hash para un binario concreto cuando esté disponible. «Opción 2» necesita enlazar la opción de aquella presentación, no cualquier archivo llamado opción 2.
- Dependencias, criterio observable de aceptación y decisión anterior que modifica.

Ejemplo real para migrar con verificación: SONIDO contiene «eligo la opcion 2.» y su respuesta la identifica como «Presencia en la oscuridad» para el menú inicial. Recuperar la propuesta y el archivo correspondiente antes de asignar un ID o afirmar que existe un audio integrado. No basta con el número de opción aislado.

Diseño, coordinación y ejecución se guardan por separado:

| Eje | Estados propuestos |
|---|---|
| Decisión de diseño | Propuesta / Aprobada por Iván / Sustituida / Descartada |
| Consolidación | Pendiente / En conflicto / Consolidada para una versión |
| Entrega | Pendiente / En curso / Implementada / Verificada / Publicada |

Cada estado requiere su fuente: aprobación de Iván, revisión de ESTRUCTURA, o evidencia de PROGRAMACION. Una captura aprobada no prueba funcionamiento; una prueba que pasa no aprueba el arte; publicado no significa aceptación manual completa. Evitar porcentajes globales de avance inventados.

## 6. Consolidación de ESTRUCTURA

Al solicitar «consolida las decisiones», leer revisiones nuevas de las áreas desde el último punto de revisión. Consultar chats solo para recuperar fuente o aclarar contexto que no esté en archivos. Registrar qué revisiones y turnos se revisaron y cuáles no estuvieron accesibles.

Comprobar coherencia entre áreas, especialmente cambios de slots, progresión, economía, horarios, rutas y eventos. Una decisión posterior explícita de Iván prevalece en su alcance; la fecha de modificación de un archivo o una recomendación del asistente no sustituye una aprobación anterior.

Un conflicto no elimina una aprobación: conservarla, exponer la incompatibilidad y proponer resolución. Pedir decisión de Iván solo para el punto que no se pueda resolver con evidencia existente. Continuar con áreas independientes. ESTRUCTURA no cambia por iniciativa propia la intención aprobada para «hacerla encajar».

Para un conjunto coherente y suficientemente definido, emitir lote de implementación con ID, revisión, decisiones y recursos incluidos, dependencias, criterios de prueba y pendientes explícitos. La marca «consolidado» certifica coherencia documental de ese alcance, no funcionamiento.

Si un área cambia mientras se consolida, comparar revisiones antes de cerrar el lote. Fijar la versión que se revisó; el cambio posterior va a otro lote, sin modificar un trabajo en curso silenciosamente. En Git, usar commits concretos cuando estén disponibles; mientras sea local, registrar revisiones y huellas de los archivos relevantes.

## 7. Trabajo de PROGRAMACION

Entrada: PAUTA_DESARROLLO.md → CONSOLIDACION.md → lote autorizado → revisiones de área/recursos vinculados. No necesita releer todos los chats para cada tarea. Si un archivo necesario no está accesible, identificar esa carencia sin reconstruirlo de memoria.

Al recibir un encargo de implementación, confirmar el lote y el alcance autorizado, revisar código y aplicar los cambios correspondientes. «Aprobado como diseño» no equivale a encargar todos los pendientes del proyecto ni autoriza por sí solo publicar.

Registrar IDs implementados y revisión exacta, archivos/código afectados, pruebas y limitaciones. Si aparece una incompatibilidad, comunicarla y dejar pendiente solo el tramo afectado; no diseñar una regla de juego nueva para taparla. Las decisiones técnicas dentro del alcance sí pertenecen a PROGRAMACION.

Después de integrar, ESTRUCTURA enlaza el informe de entrega desde la maestra. Las áreas conservan su aprobación de diseño sin duplicar afirmaciones manuales de ejecución. Así se evita que NIVELES mantenga una segunda lista de integración que derive respecto de PROGRAMACION.

## 8. Prompts propuestos

Antes de usarlos como regla permanente, aprobar el sistema y crear/migrar los documentos que nombran. Pueden ponerse en instrucciones comunes compatibles con el entorno y fijar el área de cada hilo. Esta propuesta no cambia la configuración de la app.

### Prompt común para los ocho hilos

Actúa como responsable del área correspondiente al nombre de este hilo del proyecto SCP Survivor. Usa como base común la carpeta SCP-SURVIVOR indicada en esta propuesta; comprueba acceso antes de afirmar que guardaste algo. Lee PAUTA_DESARROLLO.md y la pauta/registro de tu área bajo docs/areas.

Trabaja en tu área y registra propuestas fuera de ella como dependencias para ESTRUCTURA, sin modificar reglas ajenas. Una instrucción explícita posterior de Iván puede reasignar alcance: regístrala.

Presenta propuestas identificables por ID y revisión. Cuando Iván acepte inequívocamente una opción, registra en DECISIONES.md el texto y alcance aprobados, fecha, cita, hilo/turno, recursos y dependencias; actualiza el resumen vigente en PAUTA.md. «Me gusta» cuenta si el referente es único. Si no se identifica la opción, pregunta solo cuál. No amplíes una aceptación a otras propuestas ni inventes datos faltantes.

Conserva lo sustituido como historial y enlaza el reemplazo. Separa diseño aprobado, consolidación y ejecución. Escribe solo documentos de tu área; ESTRUCTURA es responsable de la maestra y PROGRAMACION de las entregas. Evita duplicar reglas transversales: enlaza su fuente vigente.

Al terminar, informa ID/revisión, estado, archivo actualizado y si requiere consolidación. Si no pudiste guardar, dilo; no digas «registrado» solo por responder en el chat. No envíes mensajes a otros hilos sin autorización expresa.

### Prompt para ESTRUCTURA

Consolida los cambios documentados desde la última revisión. Lee las pautas y aprobaciones de las áreas, comprueba sus fuentes y revisiones, y registra cobertura y carencias en docs/gestion/CONSOLIDACION.md. Detecta conflictos sin modificar la intención de decisiones aprobadas. Actualiza PAUTA_DESARROLLO.md y prepara lotes coherentes, versionados y trazables para PROGRAMACION. No declares implementado lo que solo esté diseñado. Conserva los pendientes y continúa con los bloques independientes. No envíes mensajes ni implementes código por esta solicitud de consolidación.

### Prompt para PROGRAMACION

Revisa PAUTA_DESARROLLO.md y docs/gestion/CONSOLIDACION.md. Para el lote que Iván encargue implementar, lee las revisiones de área y recursos vinculados y revisa el código existente. Implementa el alcance autorizado sin añadir reglas de jugabilidad por inferencia. Registra en docs/gestion/ENTREGAS_PROGRAMACION.md qué IDs/revisiones integraste, evidencia de pruebas, versión y limitaciones. Ante un conflicto, informa el punto y avanza con trabajo independiente seguro. La autorización de diseño no sustituye autorización de publicación o activación de servicios.

## 9. Puesta en marcha recomendada

1. Aprobar o ajustar este reparto de responsabilidades y formato.
2. Fijar carpeta/copia de trabajo común y registrar el mapa de hilos. Mantener las copias de publicación/auditoría como salidas o antecedentes, no como pautas rivales.
3. Recuperar aprobaciones de los ocho hilos, sin marcar como aceptadas todas las propuestas. Aprovechar las pautas y recursos actuales mediante enlaces; conservar originales e historial.
4. Crear las pautas y registros de área, consolidar la primera revisión maestra y registrar dudas puntuales. No exigir reaprobar decisiones que ya tengan evidencia clara.
5. Incorporar instrucciones comunes en el ámbito que usen todos los hilos y verificar con una aprobación pequeña que el registro se guarda y se puede leer desde ESTRUCTURA.
6. Preparar un primer lote y hacer que PROGRAMACION registre su implementación y pruebas. Versionar documentos junto con el código a través del flujo del repositorio, sin publicar por esta propuesta.

Tras esa puesta en marcha: Iván diseña y acepta en cada área; pide «consolida» aquí y luego encarga el lote en PROGRAMACION. Se puede estudiar una automatización más adelante si la solicita; no se necesita para comenzar.

## 10. Mapa verificado de hilos

Metadatos consultados el 23/10/2026; todos indicaban la carpeta padre local de SCP-SURVIVOR. No se movieron, renombraron ni enviaron mensajes.

| Título exacto | Identificador |
|---|---|
| PERSONAJES | 01a160be-4bf0-7883-b313-604e7ce76652 |
| ESTRUCTURA | 01a1457c-c051-73d2-9864-e7deb6435420 |
| PROGRAMACION | 01a13aeb-020a-7d62-8256-3d42a6e61877 |
| ARMAS | 01a164ea-cca2-74b2-a034-5f6a7c949cbd |
| NIVELES | 01a1457a-3dba-75b3-badf-018086fb9bda |
| MENUS | 01a16600-8b86-7a31-839f-1e84ba543bb3 |
| SONIDO | 01a16600-1ef2-7871-aeec-86430d1a2e41 |
| ICONO APP | 01a1468c-b1ec-7371-a2c0-70ef7b30af7b |

## Referencias

- [Pauta actual del proyecto](../PAUTA_DESARROLLO.md), [escenarios](PAUTA_CREACION_ESCENARIOS.md), [armas](PAUTA_ARMAS.md), [presentación integrada](PRESENTACION_INTEGRADA.md) y [sincronización previa de ESTRUCTURA](ESTRUCTURA_SYNC_2026-10-23.md).
- [Documentación oficial de OpenAI sobre instrucciones y flujos documentados](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex): AGENTS.md es orientación persistente reconocida; otros archivos son convenciones adaptables. La estructura de áreas, estados, IDs y lotes de esta propuesta es una recomendación para SCP Survivor, no una función automática de la app.
