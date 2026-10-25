# Pauta de armas — sincronización del hilo ARMAS

## Resumen vigente — 25/10/2026 · R3

- **ARM-FALTANTES-VIS-001/r1: aceptada visualmente.** Incluye ARM-SMG-VIS-001/r1 (Subfusil/smg), ARM-SHOTGUN-VIS-001/r1 (Escopeta/shotgun) y ARM-BATON-VIS-001/r1 (Porra/baton), ocho direcciones en16/32:48 sprites. Fecha25/10/2026. Cita de Iván: «Aprobado. Ahora diseñas los poderes anomalos al matar una anomalia.» El referente es el lote entregado inmediatamente antes. [Registro exacto, recursos y dependencias](referencias/armas/armas-faltantes-v1/APROBACION_2026-10-25.md). Sustituye el estado de propuesta del corte R2.2; no aprueba anclas técnicas, animaciones completas ni integración.
- **ARM-POD-BIO-001/r1: diez propuestas pendientes de elección.** Nuevo encargo directo: dos versiones por cada una de las cinco anomalías, animación y colores propios del monstruo, visor para iOS. [Diseño](referencias/armas/poderes-anomalos-v1/DISENO_PODERES.md) y [comparativa local](referencias/armas/poderes-anomalos-v1/dist/index.html). IDs POD-01-A/B a POD-05-A/B, cada uno r1. Ninguna elección se infiere del «Aprobado» anterior.

Los poderes conservan adquisición por victoria y reclamación, máximo tres, activación automática y5+extra; A/B son alternativas de diseño y no dos premios por baja. Tiempos y parámetros nuevos son propuestas de ensayo. Las aprobaciones de PERSONAJES aportan apariencia/origen; no aprueban estos nuevos poderes.

Dependencias visibles: ESTRUCTURA consolida las armas aceptadas y las futuras elecciones de poderes; PERSONAJES valida montaje y correspondencia; SONIDO aporta eventos; MENUS coordina recompensa y selección; PROGRAMACION integra y mantiene su evidencia en [REGISTRO_IMPLEMENTACION](gestion/REGISTRO_IMPLEMENTACION.md). No se modifican otras pautas ni código del juego. La publicación del visor se registra únicamente cuando exista confirmación del alojamiento.

Historial íntegro previo: [pauta R2.2](referencias/armas/historial/PAUTA_ARMAS_R2.2_2026-10-24.md). Los estados antiguos bajo esta nota quedan conservados como antecedentes.

## Propuesta de recursos faltantes — 24/10/2026 · R2.2

Por petición directa de Iván, «Haz los sprite y modelos, de las armas faltantes», se produce **ARM-FALTANTES-VIS-001/r1**, con tres propuestas identificables: **ARM-SMG-VIS-001/r1** (Subfusil/smg), **ARM-SHOTGUN-VIS-001/r1** (Escopeta/shotgun) y **ARM-BATON-VIS-001/r1** (Porra/baton). [Lote para revisión](referencias/armas/armas-faltantes-v1/index.html) · [alcance](referencias/armas/armas-faltantes-v1/LEEME.md) · [recursos y anclas](referencias/armas/armas-faltantes-v1/catalogo.json).

Entregadas 48 poses nativas: tres modelos, ocho direcciones y16/32. **Son propuestas nuevas pendientes de aceptación; la petición de producirlas no aprueba sus resultados.** No hay cita de aprobación de este lote. Cada modelo mantiene su identidad legada; no se reasigna AF02, no se añade otra arma ni se crean estadísticas/tiers/recetas.

Dependencias: Iván revisa y elige la revisión visual; PERSONAJES valida compatibilidad del rig; PROGRAMACION calibra agarres/salidas y completa animaciones/montaje, manteniendo su evidencia en [REGISTRO_IMPLEMENTACION](gestion/REGISTRO_IMPLEMENTACION.md). Las anclas son estimadas y el lote no acredita combate. ESTRUCTURA debe conocer la nueva propuesta como dependencia de INC-VIS-001, sin declarar resuelta la incidencia ni ampliar EST-ARM-001 r1.

**Resumen de recurso vigente:** ya existe una propuesta de sprite del Subfusil; sigue sin existir una aceptación específica de ese arte. ARM-SMG-REC-001 r1 se conserva como auditoría del corte anterior a esta generación. No se modifican sus hallazgos originales ni se presentan como ausencia actual de toda propuesta.

Historial: [pauta R2.1 previa a esta entrega](referencias/armas/historial/PAUTA_ARMAS_R2.1_2026-10-24.md). Originales aprobados y reglas consolidadas conservados. No se modificó código del juego ni se enviaron mensajes a otros hilos.

## Actualización acotada de recurso — 24/10/2026 · R2.1

**ARM-SMG-REC-001 r1:** no se encontró sprite aprobado recuperable del Subfusil legado (`smg`) en las fuentes auditadas. Se conserva su identidad; FR07 y AF02 no son sustitutos autorizados. [Ficha y mínimo recurso pendiente](referencias/armas/inc-vis-001/ARM-SMG-REC-001-r1.md) · [Evidencia del corte](referencias/armas/inc-vis-001/ARM-SMG-REC-001-r1.json). ARM-SMG-VIS-001 r1 identifica el recurso de reemplazo por producir y presentar, sin arte nuevo aprobado.

Dependencia acotada de [INC-VIS-001](gestion/INC-VIS-001.md); implementación y cierre global en [PROGRAMACION](gestion/REGISTRO_IMPLEMENTACION.md) y [su informe de la incidencia](gestion/informes/INC-VIS-001-programacion.md). No se modifica otra pauta ni el ejecutable.

**Precedencia vigente:** [EST-ARM-001 r1](CIERRE_ARMAS_PROGRESION_FUSION_V1.md), aceptada en ESTRUCTURA el 23/10/2026, gobierna la escala única y la primera fusión F24 dentro de su alcance. Las etiquetas «pendiente» y la referencia a cuatro ramas del corte R2 conservado debajo son antecedentes anteriores a esa aceptación; no reabren sus reglas. Las otras 62 recetas y el catálogo completo no reciben aceptación por extensión. El encargo actual solo resuelve el recurso de smg.

Historial: [pauta R2 anterior a esta nota](referencias/armas/historial/PAUTA_ARMAS_R2_2026-10-23.md). Esta revisión R2.1 incorpora el hallazgo de recurso, sin cambiar las revisiones originales de diseño ni conceder nuevas aprobaciones.



Actualizado: 23/10/2026 · revisión documental R2. Diseño y registro de aceptación visual del área ARMAS.

Fuente inicial: hilo **ARMAS**, `01a164ea-cca2-74b2-a034-5f6a7c949cbd`, corte histórico hasta `01a165d1-7960-7f11-b81e-57fe593b0f0d`. Esta revisión incorpora la entrega y aceptación visual posteriores visibles en el mismo hilo y la instrucción de gestión del área del 23/10/2026. Se preservan las reglas de ESTRUCTURA en las materias no sustituidas expresamente.

## Resumen vigente — ARMAS R2 · 23/10/2026

- **ARM-VIS-001/R1 — aceptada:** apariencia del lote de nueve armas y la fusión de prueba F24, con ocho direcciones por modelo y versiones 16×16 y 32×32. Aprobación de Iván del 22/10/2026: «aprobado.». Son 160 sprites individuales; la aceptación se limita a esta revisión visual.
- **ARM-PROG-001/R1 — propuesta pendiente:** escala única 1 → 2 → 3 → 4 → 5 → MAX. Continúa vigente la regla de ramas de ESTRUCTURA hasta que se acepte un cambio explícito.
- **ARM-FUS-001/R1 — propuesta pendiente:** condiciones nuevas y 63 recetas del catálogo. La apariencia aceptada de F24 no aprueba su receta jugable ni el resto de las fusiones.
- **ARM-CAT-001/R1 — propuesta pendiente:** selección completa de 90 modelos y su distribución. Las nueve categorías y cuatro tiers son requisitos pedidos por Iván; el lote visual aceptado no aprueba todos los modelos.

Los IDs anteriores identifican las propuestas y recursos existentes; no crean revisiones nuevas de sus diseños. Cualquier cambio posterior se presentará con su propia revisión y aceptación.

## Registro de decisión aceptada

| Campo | Registro |
|---|---|
| ID / revisión | **ARM-VIS-001/R1**, lote `armas-prueba-direccionales-v1`, catálogo de recursos 1.0 |
| Decisión exacta | Aceptar los diseños visuales presentados de AF01, AR01, CC04, IN03, FR07, PE04, RU04, TE01 y AN09, más F24, en ocho direcciones y ambas resoluciones. |
| Fecha de aprobación / de incorporación | 22/10/2026 / 23/10/2026. La incorporación documental no es una aprobación nueva. |
| Cita de aprobación | Iván: **«aprobado.»**, en este hilo ARMAS, tras la entrega del lote para aprobación. [Registro conservado con el recurso](referencias/armas/armas-prueba-direccionales-v1/APROBACION.md). |
| Recurso elegido | [Visor local del lote](referencias/armas/armas-prueba-direccionales-v1/index.html), [catálogo de recursos](referencias/armas/armas-prueba-direccionales-v1/catalogo.json), [lámina 16](referencias/armas/armas-prueba-direccionales-v1/APROBACION_16.png) y [lámina 32](referencias/armas/armas-prueba-direccionales-v1/APROBACION_32.png). Copia sin modificar imágenes; [procedencia y hashes](referencias/armas/PROCEDENCIA_LOTE_APROBADO_R1.json). |
| Dependencias | PERSONAJES: compatibilidad de montaje y dos armas; PROGRAMACION: calibración de agarres/salidas, animaciones e integración; ESTRUCTURA: consolidar el alcance visual aceptado y resolver por separado progresión y fusión. |
| Límites de la aceptación | No aprueba estadísticas, balance, animaciones completas, exactitud técnica de agarres, implementación, el catálogo entero, todas las recetas ni propuestas posteriores. |

| ID | Categoría / compuesto | Recurso elegido | Tier del recurso |
|---|---|---|---|
| AF01 | Fuego | Pistola de servicio | Normal |
| AR01 | Arrojadizas | Granada de fragmentación | Normal |
| CC04 | Cuerpo a cuerpo | Katana de contención | Raro |
| IN03 | Incendiarias | Lanzallamas de contención | Normal |
| FR07 | Francotiradores | Rifle Tres Eslabones | Épico |
| PE04 | Pesadas | Lanzamisiles de contención | Raro |
| RU04 | Rústicas | Ballesta de recuperación | Raro |
| TE01 | Tecnológicas | Emisor láser | Normal |
| AN09 | Anómalas | Reloj prestado | Legendario |
| F24 | Fusión de prueba visual | Hoja fotónica de contención | Raro |

La tabla identifica el aspecto y los metadatos del recurso elegido; no fija multiplicadores de combate. La pareja propuesta para F24 es CC04 + TE01; su regla jugable permanece en ARM-FUS-001/R1.

## Forma de trabajo del área

Instrucción de Iván del 23/10/2026: «Cuando Iván acepte claramente una propuesta, guarda en tu pauta: ID/revisión, decisión exacta, fecha, cita de aprobación, recurso elegido y dependencias». Aplicación: propuestas identificables; aceptación limitada a su referente y revisión; resumen vigente y antecedentes conservados. «Me gusta», «acepto» o «elijo» bastan si el referente es inequívoco; si no, preguntar únicamente cuál opción acepta. Las dependencias se registran aquí sin modificar pautas ajenas ni enviar mensajes a otros hilos sin autorización.

## Requisitos pedidos por Iván

- Nueve categorías de catálogo, con al menos diez modelos por categoría.
- Cuatro tiers: **Normal, Raro, Épico y Legendario**.
- Ataques distinguibles: bala, rayo, flecha, golpe, llama y demás efectos propios de cada arma. Aplicar identidad visual por mecanismo, tier, nivel y fusión.
- Armas con representación adecuada para los distintos ángulos de disparo.
- Simplificar la dificultad para alcanzar el máximo y fusionar. La escala concreta propuesta abajo todavía requiere aprobación.

## Equipamiento y categorías

Se conserva: una arma inicial, segunda mediante recompensa y garantía del primer jefe si falta; máximo dos armas simultáneas, tres poderes anómalos y una ultimate. Cada arma conserva su funcionamiento y recursos. Las ofertas reconocen las armas equipadas; no mejoran modelos ausentes. Un arma anómala ocupa una ranura de arma: no concede un cuarto poder.

| Categoría del catálogo | Modelos propuestos |
|---|---:|
| Armas de fuego | 10 |
| Armas arrojadizas | 10 |
| Armas cuerpo a cuerpo | 10 |
| Armas incendiarias | 10 |
| Francotiradores | 10 |
| Armas pesadas | 10 |
| Armas rústicas | 10 |
| Armas tecnológicas | 10 |
| Armas anómalas | 10 |

Estas nueve secciones complementan las cinco familias mecánicas existentes: **Balística, Energía, Melee, Explosivos y Arrojadizas**. Cada modelo tiene una familia principal; no recibe bonos duplicados por aparecer en una sección temática.

El catálogo propone 90 modelos y distribución de 27 Normal, 27 Raro, 18 Épico y 18 Legendario. Los modelos, su reparto y sus cifras son propuestas; la petición de nueve categorías y cuatro tiers sí procede del usuario. La rareza no incorpora por sí sola un multiplicador de daño. Sin mochilas ni accesorios físicos nuevos.

## Progresión: decisión vigente y alternativa pendiente

| Estado | Regla | Inversión temporal por arma |
|---|---|---:|
| Aprobado en ESTRUCTURA; utilizado en el ensayo T1BC | Cuatro ramas, cada una con cinco mejoras y un extra propio | 24 elecciones |
| Propuesta posterior de ARMAS | Una escala única **1 → 2 → 3 → 4 → 5 → MAX**, adquirida en nivel 1 | 5 elecciones |

**Recomendación de ARMAS pendiente de aprobación:** usar la escala única. Dos armas requerirían diez elecciones de mejora de arma para alcanzar MAX, frente a 48 del esquema de ramas. No equivale a diez niveles del jugador: también aparecen mejoras generales y poderes. Potencia, ritmo, manejo y especialización pasan a describir los ascensos, sin cuatro barras separadas.

No se cambia silenciosamente el ensayo ni las reglas aprobadas. Los poderes y mejoras generales mantienen sus cinco niveles más extra propio; las ultimates, sus cinco niveles permanentes. Los porcentajes ilustrativos del catálogo y el objetivo de primera fusión entre mapas 2–3 necesitan prueba de ritmo y balance.

## Fusión

**Aprobado previamente:** una sala dentro de algún escenario combina dos armas al máximo en una sola y libera una ranura. El resultado se conserva entre mapas durante la expedición.

**Desarrollo propuesto en ARMAS, pendiente de aprobación:**

- 63 recetas explícitas; ambos modelos distintos, compatibles y MAX. Tier mínimo **Normal**. Dos copias iguales pueden equiparse, pero no tienen receta en esta versión.
- Resultado único, sin fallo; tier igual al mayor entre Raro y los tiers de sus componentes, sin multiplicador automático de daño.
- Una fusión por expedición, sin monedas, tickets, materiales ni consumo de la colección permanente. Este límite es una propuesta nueva: la «apertura única» aprobada en ESTRUCTURA corresponde al escape de grieta.
- Compuesto en estado **FINAL**, sin nueva escalera ni refusión. Sustituye los extras originales por su comportamiento compuesto; no acumula todos sus efectos anteriores.
- La siguiente recompensa de armamento elegible ofrece llenar la ranura libre con un arma de nivel 1. No entrega otra arma MAX automáticamente.
- Sala accesible propuesta desde mapa 2 hasta utilizar la fusión; consulta previa sin consumir el uso y confirmación con pausa. Reemplazar el compuesto no devuelve componentes ni recupera el uso.

Ejemplo del catálogo: **F46, Pistola de servicio + Porra de seguridad → Repulsor de Guardia**, Raro. La identidad precisa de cada componente y las restantes recetas están en el catálogo enlazado. Solo son compatibles las parejas listadas; no hay fusión universal.

Los ataques secundarios comparten el presupuesto de daño del ciclo compuesto: no añaden ciclos completos por cada rebote, eco o campo. Sin cadenas recursivas, ejecuciones de jefes, intangibilidad permanente ni acceso que evite puertas. El techo de eficacia de ensayo de +5% frente a la suma de los dos MAX y los límites numéricos de control son objetivos propuestos, todavía sin validación jugable.

## Pauta visual

La forma y el color principal identifican el mecanismo del ataque. El tier añade un acento pequeño y una marca reconocible; no recolorea toda bala, llama o golpe. Los niveles refinan esa identidad; MAX muestra su extra cuando realmente se activa.

| Tier | Acento propuesto | Marca |
|---|---|---|
| Normal | Plata `#B8C0CC` | Círculo |
| Raro | Azul `#60A5FA` | Rombo |
| Épico | Violeta `#C084FC` | Rombo doble |
| Legendario | Dorado `#F4C76B` | Estrella |

La guía V1.1 documenta los ataques de los 90 modelos y los efectos de las 63 fusiones. Máximo propuesto de tres colores simultáneos por efecto; evitar ocultar enemigos y señales de peligro. El reparto visual núcleo/donante 70/30 no representa reparto de daño. Las dimensiones gráficas no alteran alcance ni colisiones.

**Direcciones del lote aceptado ARM-VIS-001/R1:** ocho vistas por modelo, E/SE/S/SW/W/NW/N/NE, en 16×16 y 32×32. Las nueve armas aportan 144 vistas base y F24 añade 16: total 160 sprites. Esta aceptación no generaliza la cantidad a los 90 modelos ni acredita las animaciones completas. La puntería de 360°, los puntos de agarre/salida y el orden delante/detrás son requisitos de montaje que deben calibrarse y verificarse al integrar.

Conservar versiones nativas de 16 y 32 píxeles con el mismo tamaño aparente en el mundo, arma separada del cuerpo y montaje de las dos armas. El lote aceptado contiene sprites nativos y hojas direccionales; sus agarres son estimaciones técnicas pendientes de calibración. La lámina anterior de nueve modelos queda como antecedente conceptual, sustituida por este lote solo para la selección visual de prueba. La aceptación no acredita animaciones ni colisiones.

## Recursos preservados

- [Lote visual aceptado ARM-VIS-001/R1 y alcance](referencias/armas/armas-prueba-direccionales-v1/APROBACION.md).
- [Procedencia verificable del lote aceptado](referencias/armas/PROCEDENCIA_LOTE_APROBADO_R1.json).

- [Catálogo completo y condiciones de fusión](referencias/armas/armas-v1/CATALOGO_ARMAS_Y_FUSIONES_V1.md).
- [Lista rápida: 90 armas y 63 fusiones](referencias/armas/armas-v1/LISTA_RAPIDA_90_ARMAS_63_FUSIONES.md).
- [Datos de diseño](referencias/armas/armas-v1/DATOS_DISENO_ARMAS_V1.json).
- [Guía visual de ataques V1.1](referencias/armas/armas-v1/GUIA_VISUAL_ATAQUES_V1.1.md).
- [Muestra conceptual y alcance](referencias/armas/armas-16-32-muestra/LEEME.md).
- [Procedencia y huellas de los originales](referencias/armas/PROCEDENCIA_Y_HASHES.json).

Son copias de referencia sin edición. La propuesta usa tecnología y anomalías inspiradas en el contexto SCP; sus efectos de juego no convierten cada modelo inventado en un objeto canónico de la wiki SCP.

Verificación documental independiente con Luna: 90 IDs únicos, nueve categorías de diez modelos y 63 parejas sin duplicados ni referencias rotas; concordancia de IDs y conteos entre catálogo y JSON. Los nueve archivos copiados conservan sus huellas SHA-256. El JSON es una referencia de diseño: no contiene todas las reglas globales ni es una configuración ejecutable validada.

## Evidencia de PROGRAMACION

El estado de implementación se consulta en los informes mantenidos por PROGRAMACION; ARMAS no mantiene una segunda lista de funciones implementadas:

- [Presentación integrada: alcance y límites](PRESENTACION_INTEGRADA.md).
- [Informe de combate T1BC](V2-T1BC-REPORT.md) y [evidencia estructurada](V2-T1BC-VALIDACION.json).

La aprobación visual y el banco local de este lote no sustituyen esa evidencia. Esta revisión de pauta no modifica el ejecutable.

## Dependencias y cambios para consolidar en ESTRUCTURA

| ID de seguimiento | Área responsable | Cambio o cierre requerido | Situación documental |
|---|---|---|---|
| ARM-DEP-001 | ESTRUCTURA | Consolidar ARM-VIS-001/R1: el lote de prueba sí tiene aceptación visual y ocho vistas en 16/32. | Pendiente de consolidación. El índice todavía presenta las ocho vistas como recomendación pendiente; no se modifica desde ARMAS. |
| ARM-DEP-002 | ESTRUCTURA | Resolver ARM-PROG-001/R1, escala única frente a cuatro ramas. | Propuesta sin aceptación; [regla de referencia](DECISIONES_INFINITO_2026-10-20.md). |
| ARM-DEP-003 | ESTRUCTURA | Resolver ARM-FUS-001/R1: recetas, tier mínimo, límites, frecuencia de sala y reposición. | Aceptación visual de F24 no resuelve estas reglas. |
| ARM-DEP-004 | PERSONAJES | Compatibilidad de poses y montaje simultáneo, especialmente armas de dos manos. | Registrar resolución en esta pauta cuando exista evidencia; no modificar pauta de PERSONAJES. |
| ARM-DEP-005 | PROGRAMACION | Integrar recursos elegidos, calibrar agarres/salidas, completar animaciones y comprobar combate/rendimiento. | Consultar y enlazar su evidencia cuando se produzca; no declarar integración por copiar recursos. |

La coordinación con escenarios se consulta en el índice del proyecto; ARMAS no fija ni cambia su revisión visual. La referencia antigua a M01 R5 se conserva únicamente en el historial de esta pauta.

## Próximos cierres de diseño de ARMAS

1. Aprobar o ajustar ARM-PROG-001/R1 sin trasladar la aceptación visual a la progresión.
2. Revisar ARM-FUS-001/R1 y las condiciones de la primera receta jugable.
3. Fijar estadísticas de ensayo de las armas elegidas y medir ritmo hasta MAX/fusión cuando exista prueba de PROGRAMACION.
4. Completar poses de ataque, efectos y animaciones del lote con su propia revisión; calibrar agarres durante el montaje.
5. Definir desbloqueos y duplicados junto a las reglas de colección; no activar economía por inferencia.

## Historial y sustituciones

- **23/10/2026 — pauta R2:** incorpora ARM-VIS-001/R1 y el método de registro indicado por Iván. Sustituye las frases que describían el lote como todavía conceptual o sin aceptación. Reemplaza la lista local de implementación por enlaces a PROGRAMACION. No acepta nuevas mecánicas ni cambia sus reglas.
- **22/10/2026 — pauta anterior:** [copia íntegra preservada](referencias/armas/historial/PAUTA_ARMAS_2026-10-22.md). Incluye el corte inicial, las propuestas pendientes y la referencia histórica de escenarios. El catálogo y las guías anteriores se conservan sin edición.
