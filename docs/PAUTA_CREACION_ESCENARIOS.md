# Pauta de creación de escenarios — SCP Survivor
Revisión documental R7.10 · 26/10/2026 · Área responsable: NIVELES.
Diseños conservados: M01-R7 y GRIETAS-V1. Animación NIV-GRI-009 r1 aprobada visualmente por Iván el 23/10/2026.

## Autoridad y estado
Iván pidió un escenario Backrooms que se llene de monstruos, con profundidad 2.5D, un poco de difuminado, espacios abiertos y delimitados, módulos y laberinto amplio. Solicitó ampliar y rediseñar la distribución, evitando que todo parezca copiado. Estas instrucciones posteriores sustituyen el plano repetitivo de 24 recintos como objetivo de esta nueva propuesta.

Iván validó R7 como escenario inicial el 22/10/2026: «ME GUSTO ESTE ESCENARIO. LO VALIDO.». Su plano original de 480 × 320 conserva la aprobación artística como antecedente. Posteriormente acepta M01 de **240 × 160 casillas y cámara vertical 512** mediante NIV-ESC-008-A / EST-ESC-001 r1, registrado el 23/10 en [LOT-EST-003 r1](gestion/lotes/LOT-EST-003-r1.md). R5 se conserva como antecedente. El alcance de implementación se consulta en PROGRAMACION; no se duplica su lista de estados.

Índice de entrada: [PAUTA_DESARROLLO.md](../PAUTA_DESARROLLO.md). Para las dependencias de grietas se consultaron los documentos locales [dado, revisión 2.1](GRIETAS_DADO_POR_MINUTO_V2.md) y [corte de ESTRUCTURA del 23/10](ESTRUCTURA_SYNC_2026-10-23.md). Esto no declara una nueva lectura del hilo completo. Las reglas de otras áreas se referencian; NIVELES no las modifica.

Las láminas son conceptos de composición, ambiente y ocupación. No son atlas de tiles, planos métricos ni evidencia de un generador ya implementado.

## Mapas BIO compactos C1 — cinco conceptos aprobados

26/10/2026 · Iván pide mapas de cada anomalía inspirados en su lore, con protección/obstáculos y tamaño contenido. Se crean **NIV-BIO01-C1…NIV-BIO05-C1**: Cultivo invadido, Galería del fluido, Cámara de anclajes, Patio de contención y Núcleo de cuarentena. [Cinco imágenes, fundamento y dependencias](../design-proposals/niveles/anomalias-compactas-c1-20261026/LEEME.md).

**NIV-BIO-C1-APR-001, 26/10/2026:** Iván aprueba las cinco C1 y encarga implementarlas: «arobados, ahora desarrollalos para dejarlos listo.  me gustaria que los implmentaras asi, estilo 2.5D con luces, particulas, sombras ...». Se eligen los cinco PNG C1 del paquete, conservados sin edición. [Decisión exacta, recursos, revisiones y dependencias](NIVELES_BIO_C1_APROBACION.md). No se atribuye una aprobación humana a la implementación aún no revisada.

**Corrección de fidelidad NIV-BIO-C1-FID-002, 26/10/2026:** Iván indica «continua, pero adapta los lvl tal cual me los presentaste ?. puedes replicarlos tal cual ....». Se retira la simplificación geométrica de C1-r1 como objetivo visual. C1-r2 usa las cinco imágenes C1 como referencia directa, produce versiones sin guardia/anomalía pintados y traza sus estructuras y capas de profundidad. Es un encargo de corrección, no una nueva aprobación humana del resultado. [Recursos derivados y hashes](../assets/levels/bio-c1/MANIFEST.json).

**Aprobación visual NIV-BIO-C1-APR-003, 26/10/2026:** «aprobados, muy buen diseño.». Iván acepta los cinco resultados C1-r2 de la galería: Cultivo invadido, Galería del fluido, Cámara de anclajes, Patio de contención y Núcleo de cuarentena. [Decisión exacta, recursos, hashes y dependencias](NIVELES_BIO_C1_R2_APROBACION.md). Sustituye únicamente el estado visual pendiente de R2; no acredita publicación, balance ni teléfono físico. La pauta R7.8 anterior queda en el historial enlazado desde ese registro.

Dependencias **CON-NIV-08**, pendientes de consolidación en ESTRUCTURA: C1-r2 sustituye las salas de ensayo mediante arte fiel y contornos de colisión; las seis apariencias de grieta siguen siendo independientes. Implementación local por encargo directo de Iván, evidencias y límites en [informe vigente para PROGRAMACION](NIVELES_BIO_C1_IMPLEMENTACION_R2.md); esa evidencia es la referencia para el código, sin duplicar una lista de implementación aquí. PERSONAJES conserva identidades/atlas/proporciones. No se modifica otra pauta ni se envían mensajes a otros hilos.

El estado pendiente sustituido queda en [pauta R7.6 respaldada](historial-niveles/BIO-C1-antes-implementacion-20261026/PAUTA_CREACION_ESCENARIOS.md); se conserva también el [historial previo a C1](historial-niveles/PAUTA_antes_mapas_BIO_C1_2026-10-26_070250.md).

La simplificación C1-r1 y la pauta R7.7 quedan en [historial anterior a la corrección](historial-niveles/BIO-C1-r1-antes-fidelidad-20261026/).

## Cuatro mapas grandes P1 — encargo y propuestas pendientes

26/10/2026 · **NIV-MAPAS-GRANDES-P1**. Después de registrar la aprobación BIO C1-r2, Iván encarga rediseñar el principal y presentar mapas nuevos antes de desarrollarlos. Aclara la cantidad: «Cuatro en total: principal + tres nuevos».

- **NIV-M01-R8-P1 — Complejo Liminal:** rediseño visual/espacial del principal Backrooms, conservando el presupuesto vigente 240×160.
- **NIV-M02-P1 — Dársena de Transferencia:** nuevo ambiente de logística y maquinaria.
- **NIV-M03-P1 — Invernadero de Contención:** nuevo complejo de cultivo y procesamiento de muestras.
- **NIV-M04-P1 — Archivo de Cuarentena:** nuevo ambiente de archivo institucional y servicios clínicos.

[Cuatro láminas y fichas](../design-proposals/niveles/mapas-grandes-p1-20261026/LEEME.md) · [Galería preliminar](../design-proposals/niveles/mapas-grandes-p1-20261026/VISTA_PRELIMINAR.html) · [Recursos y hashes](../design-proposals/niveles/mapas-grandes-p1-20261026/MANIFIESTO.json).

**Estado: las cuatro propuestas P1 están pendientes de elección.** No se han aplicado al runtime. La aprobación de las cinco salas BIO C1-r2 no se extiende al nuevo principal ni a M02–M04. M01-R7 con escala NIV-ESC-008-A sigue vigente hasta una aceptación nueva inequívoca. Los acercamientos son conceptos visuales, no pruebas de cámara o geometría; los grafos de zonas solo comprueban su relación conceptual.

**CON-NIV-09:** ESTRUCTURA consolida las opciones/revisiones que Iván acepte; PROGRAMACION desarrolla y valida geometría, navegación, rutas, capacidad de hordas y futura generación modular. MENUS/PERSONAJES conservan sus decisiones de encuadre y proporción. Este encargo preliminar no modifica LOT008 ni las pautas de otras áreas y no autoriza mensajes a sus hilos. Implementación y publicación se consultan en las evidencias de PROGRAMACION, sin duplicar su estado aquí.

## Resumen vigente y registro de decisiones

- **NIV-MAPAS-GRANDES-P1:** principal rediseñado más tres mapas nuevos presentados como cuatro preliminares, pendientes de elección. No sustituyen M01 vigente ni se incluyen en la aprobación BIO. Ver CON-NIV-09 y paquete P1 arriba.
- **NIV-BIO01-C1-r2…NIV-BIO05-C1-r2:** cinco adaptaciones visuales aceptadas el 26/10/2026 mediante NIV-BIO-C1-APR-003: «aprobados, muy buen diseño.». [Recursos y alcance](NIVELES_BIO_C1_R2_APROBACION.md). La evidencia técnica se consulta en el informe enlazado; pendientes de consolidación/publicación y teléfono físico no se dan por resueltos por esta aceptación.
- **NIV-BIO01-C1…NIV-BIO05-C1:** cinco conceptos aceptados el 26/10/2026; registro NIV-BIO-C1-APR-001. [Aprobación y recursos](NIVELES_BIO_C1_APROBACION.md). Consolidación CON-NIV-08 visible arriba; verificación del ejecutable y publicación se consultan en el informe enlazado.
- **M01 vigente — NIV-ESC-008-A / EST-ESC-001 r1:** opción A aceptada el 23/10: 240 × 160 y cámara más cercana en móvil vertical, ancho 512. [Fuente de aceptación](gestion/lotes/LOT-EST-003-r1.md). Sustituye las dimensiones R7 originales y el estado pendiente A/B de la pauta anterior; conserva sus materiales y proporciones de actores.
- **GRIETAS-V1, 01–06:** seis diseños visuales aprobados como catálogo. No hay una elección única ni correspondencia aprobada con los cinco niveles de peligro.
- **NIV-GRI-009 r1:** seis animaciones de portal aprobadas visualmente por Iván el 23/10/2026: «apruebo.». [Registro, recursos y dependencias](NIVELES_APROBACION_GRIETAS_ANIMACION_009.md); implementación y verificaciones en [evidencia de PROGRAMACION](PROGRAMACION_GRIETAS_ANIMACION_009.md). Publicación y teléfono físico se consultan allí; esta aprobación no elige la escala NIV-ESC-008.
- **M01-R5:** aprobación histórica sustituida por M01-R7 como referencia inicial. No se aplica a R6 ni a revisiones futuras.
- **NIVELES-GRIETAS-001 r1:** [ficha concreta de recinto/entrada/retorno](gestion/entregas/NIVELES-GRIETAS-001.md), entregada el 24/10 para LOT-EST-005. Cinco salas de ensayo, roster BIO-01–05 y seis transiciones independientes del peligro. Composiciones y parámetros nuevos son de ensayo; no se declaran arte final aprobado ni runtime corregido.
- Los diseños estáticos conservan su aprobación del 22/10. El 23/10 se aprueban NIV-GRI-009 r1 y la opción A mediante ESTRUCTURA. El 24/10 se registra el encargo de corregir la entrada a grietas y la entrega documental asociada.

### Decisión de escala recuperada de ESTRUCTURA y encargo vigente

| ID/revisión | Decisión exacta y fecha | Cita literal | Recursos y dependencias |
|---|---|---|---|
| NIV-ESC-008-A r1 / EST-ESC-001 r1 | Aceptar M01 240 × 160 y cámara más cercana en móvil vertical; 23/10/2026. Sustituye 480 × 320 para la siguiente prueba de M01. | «A: mapa 240×160 y cámara más cercana en móvil vertical (recomendada).» | [LOT-EST-003](gestion/lotes/LOT-EST-003-r1.md), [ficha A original](NIVELES_AJUSTE_ESCALA_008.md). PROGRAMACION construye/prueba; PERSONAJES conserva proporciones; ESTRUCTURA ya consolidó esa aceptación. |
| NIVELES-GRIETAS-001 r1 | Corregir el contacto sin traslado y definir entrada animada según la grieta con anomalía aprobada; encargo del 24/10/2026. No es aprobación del arte nuevo de salas. | «Quiero que soluciones un error con las grietas. Al entrar en una, no nos mete en ella. Tiene que haber un animacion de entrar, dependiendo de la grieta que nos aparzca.» | [Entrega única para PROGRAMACION](gestion/entregas/NIVELES-GRIETAS-001.md); cita íntegra allí. ESTRUCTURA coordina LOT-EST-005; PROGRAMACION es el único integrador; PERSONAJES aporta BIO y MENUS/SONIDO sus eventos. |

La pauta sustituida se conserva en [historial R7.4](historial-niveles/PAUTA_R7.4_antes_entrega_grietas_2026-10-24_194909.md).

| ID / revisión | Decisión exacta y alcance | Fecha de aprobación | Cita literal de Iván | Recurso elegido | Dependencias |
|---|---|---|---|---|---|
| M01-R7 | Validar el concepto visual y la distribución como escenario inicial vigente. Sustituye M01-R5 como referencia. | 22/10/2026 | «ME GUSTO ESTE ESCENARIO. LO VALIDO.» | [Plano R7](../../design-proposals/escenarios/mapa01-r7-modular-backrooms-25d-20261022/01-mapa-general-r7-25d.png), [familias](../../design-proposals/escenarios/mapa01-r7-modular-backrooms-25d-20261022/03-familias-de-modulos-r7.png), [contrato](../../design-proposals/escenarios/mapa01-r7-modular-backrooms-25d-20261022/CONTRATO_MODULAR_R7.json) y [aprobación original](../../design-proposals/escenarios/mapa01-r7-modular-backrooms-25d-20261022/VALIDACION_ESCENARIO_R7.md). | ESTRUCTURA: escala y recorrido; PROGRAMACION: construcción, navegación y pruebas; PERSONAJES: escala y legibilidad. |
| GRIETAS-V1 / 01 | Aprobar Cicatriz carmesí como variante visual de entrada a la anomalía peligrosa. | 22/10/2026 | «apruebo estas grietas.» | [01 — Cicatriz carmesí](../../design-proposals/grietas/6-estilos-25d-20261022/01-cicatriz-carmesi.png). | ESTRUCTURA: peligro y aparición; PROGRAMACION: adaptación; SONIDO: aviso. |
| GRIETAS-V1 / 02 | Aprobar Pliegue amarillo como variante visual del mismo catálogo. | 22/10/2026 | «apruebo estas grietas.» | [02 — Pliegue amarillo](../../design-proposals/grietas/6-estilos-25d-20261022/02-pliegue-amarillo.png). | Las mismas dependencias de GRIETAS-V1. |
| GRIETAS-V1 / 03 | Aprobar Fractura prismática como variante visual del mismo catálogo. | 22/10/2026 | «apruebo estas grietas.» | [03 — Fractura prismática](../../design-proposals/grietas/6-estilos-25d-20261022/03-fractura-prismatica.png). | Las mismas dependencias de GRIETAS-V1. |
| GRIETAS-V1 / 04 | Aprobar Fisura orgánica como variante visual del mismo catálogo. | 22/10/2026 | «apruebo estas grietas.» | [04 — Fisura orgánica](../../design-proposals/grietas/6-estilos-25d-20261022/04-fisura-organica.png). | Las mismas dependencias de GRIETAS-V1. |
| GRIETAS-V1 / 05 | Aprobar Horizonte negro como variante visual del mismo catálogo. | 22/10/2026 | «apruebo estas grietas.» | [05 — Horizonte negro](../../design-proposals/grietas/6-estilos-25d-20261022/05-horizonte-negro.png). | Las mismas dependencias de GRIETAS-V1. |
| GRIETAS-V1 / 06 | Aprobar Interferencia espectral como variante visual del mismo catálogo. | 22/10/2026 | «apruebo estas grietas.» | [06 — Interferencia espectral](../../design-proposals/grietas/6-estilos-25d-20261022/06-interferencia-espectral.png). | Las mismas dependencias de GRIETAS-V1. |

La cita común aprueba las seis grietas mostradas, sin aprobar su mecánica de aparición ni convertir sus números en tiers. Evidencia: [registro visual original](../../design-proposals/grietas/6-estilos-25d-20261022/APROBACION_GRIETAS_VISUALES.md) y [comparativa aprobada](../../design-proposals/grietas/6-estilos-25d-20261022/00-comparativa-6-estilos.png).

## Solicitud de corrección — NIV-ESC-008 r1

**23/10/2026 · Cita literal:** «siento que el personaje es pequeño en el mapa, ajusta mejor la dimencion del mapa. se que te pedi que fuera mas grande pero aqui en la prueba se ve mal.»

Se solicita revisar las proporciones de la prueba. [Diagnóstico y opciones A/B](NIVELES_AJUSTE_ESCALA_008.md). A recomienda 240 × 160 casillas y ancho visible de 512 unidades en móvil vertical. B mantiene 480 × 320 con el mismo encuadre cercano. La cámara actual usa ancho visible fijo: reducir solo el mapa no agranda al personaje.

Estado actualizado el 24/10 desde la aceptación posterior registrada en ESTRUCTURA: opción A aceptada el 23/10 como NIV-ESC-008-A / EST-ESC-001 r1; B no elegida. Dependencias: PROGRAMACION (geometría/cámara/pruebas), MENUS (ocupación de pantalla) y PERSONAJES (proporciones conservadas). [Fuente y cita de aceptación](gestion/lotes/LOT-EST-003-r1.md). Recursos actuales conservados; el estado inicialmente pendiente se conserva en [historial](historial-niveles/PAUTA_antes_ajuste_escala_2026-10-23_152337.md).

## Dependencias y cambios que requieren consolidación en ESTRUCTURA

- **CON-NIV-06 — Animación:** aprobación visual de NIV-GRI-009 r1, del 23/10/2026, cita «apruebo.», recogida en el corte REV-EST-0006. No cambia azar, tiers, contacto, ventana de entrada, premios ni la escala M01-A aceptada. La nueva transición de cruce se describe como ensayo en NIVELES-GRIETAS-001.

- **CON-NIV-01 — Escala histórica:** M01-R7 de 480 × 320 conserva su aprobación original como antecedente; NIV-ESC-008-A / EST-ESC-001 sustituye sus dimensiones para la prueba actual de M01. No volver a 160 × 100, R5 o R7 original por inferencia.
- **CON-NIV-05 — Corrección de proporciones:** consolidada en ESTRUCTURA mediante LOT-EST-003 r1. PROGRAMACION conserva su evidencia de implementación; no reabrir la elección A/B.
- **CON-NIV-07 — Recintos y cruce:** consumir NIVELES-GRIETAS-001 r1 en LOT-EST-005. Congelar origen, transición por apariencia, cinco BIO aprobadas y retorno/escape. Parámetros de salas/transición/escape señalados como ensayo; aceptación visual de la futura composición pendiente. No duplicar runtime ni modificar maestro/control desde NIVELES.
- **CON-NIV-02 — Grietas:** registrar que los seis aspectos están aprobados. Las referencias de ESTRUCTURA que aún los llamen propuestas artísticas requieren consolidación; la peligrosidad sigue siendo un eje separado.
- **CON-NIV-03 — Señalización de peligro:** falta proponer y aceptar cómo mostrar D1–D5 sobre cualquiera de los seis aspectos, sin depender solo del color. NIVELES diseña la señal visual; ESTRUCTURA confirma su significado y compatibilidad con la entrada por contacto.
- **CON-NIV-04 — Procedural y hordas:** el contrato espacial R7 conserva rutas alternativas y variedad. ESTRUCTURA coordina su relación con el ritmo de cinco minutos; la implementación y su evidencia pertenecen a PROGRAMACION.
- El azar y la frecuencia dependen de [la ficha de ESTRUCTURA](GRIETAS_DADO_POR_MINUTO_V2.md). La aprobación visual no los acepta ni los revoca. Los pendientes de otras áreas se consultan en sus fuentes, sin copiarlos como decisiones de NIVELES.

No se han modificado pautas de otras áreas ni enviado mensajes a otros hilos.

## Evidencia de implementación — PROGRAMACION

Para la corrección integral de grietas, consultar [REGISTRO_IMPLEMENTACION](gestion/REGISTRO_IMPLEMENTACION.md), vinculado al encargo [LOT-EST-005 r1](gestion/lotes/LOT-EST-005-r1.md). La ficha [NIVELES-GRIETAS-001](gestion/entregas/NIVELES-GRIETAS-001.md) es un contrato de construcción, no evidencia de un traslado ya ejecutado.

Para la animación NIV-GRI-009 r1, consultar [PROGRAMACION_GRIETAS_ANIMACION_009.md](PROGRAMACION_GRIETAS_ANIMACION_009.md). La pauta conserva el encargo; no copia su lista de estados ni resultados de pruebas.

Consultar [PRESENTACION_INTEGRADA.md](PRESENTACION_INTEGRADA.md), su [validación](PRESENTACION_VALIDACION.json) y su [recibo de publicación](PRESENTACION_PUBLICACION.json). Es la referencia de implementación para R7 y las apariencias de grieta; sus resultados, límites y aceptación de la integración se mantienen allí. Esta pauta registra diseño y decisiones, no otra lista de funcionalidades implementadas.

## Historial y reglas de aceptación

### Aprobación posterior del resultado: NIV-GRI-009 r1

| ID/revisión | Decisión exacta | Fecha | Cita de aprobación | Recurso elegido | Dependencias |
|---|---|---|---|---|---|
| NIV-GRI-009 r1 | Aprobar visualmente las seis animaciones de grieta presentadas, con movimiento, partículas y profundidad 2.5D. | 23/10/2026 | «apruebo.» | [Comparativa animada](../tests/artifacts/rift-animation-009/grietas-animadas-009.gif), [renderer](../js/ui/rift-visuals.js) y [registro con huellas de versión](NIVELES_APROBACION_GRIETAS_ANIMACION_009.md). | ESTRUCTURA: consolidar aprobación; PROGRAMACION: evidencia, teléfono físico y publicación; PERSONAJES: conservar proporciones y recursos. |

El encargo original se conserva a continuación como historial. La aprobación actual se aplica solo al resultado NIV-GRI-009 r1 mostrado, no a revisiones futuras ni a NIV-ESC-008.

### Encargo posterior: NIV-GRI-009 r1

| ID/revisión | Decisión exacta | Fecha | Cita literal | Recurso/alcance | Dependencias |
|---|---|---|---|---|---|
| NIV-GRI-009 r1 | Animar en el juego los portales de las seis grietas, con movimiento, partículas cuando corresponda y profundidad 2.5D. Es autorización de trabajo, no aceptación visual del resultado. | 23/10/2026 | «anima los partales de las grietas, quiero que tengan animaciones en el juego, con particulas movimiento, si corresponde. recordar que todo esto debe tener un profundidad, estilo 2.5D» | GRIETAS-V1 / 01–06; [ficha de animación](NIVELES_GRIETAS_ANIMACION_009.md) y [evidencia](PROGRAMACION_GRIETAS_ANIMACION_009.md). | PROGRAMACION: renderer/reloj/pruebas; PERSONAJES: profundidad respecto a actores; ESTRUCTURA: consolidación visual. |

Pauta anterior y fuentes previas conservadas en [respaldo del encargo](historial-niveles/grietas-animacion-20261023-162610/docs/PAUTA_CREACION_ESCENARIOS.md). La aprobación del 22/10 conserva su alcance: diseños estáticos; no se extiende automáticamente a esta animación.

| ID / revisión histórica | Decisión exacta | Fecha | Cita de aprobación | Recurso conservado | Dependencias y sustitución |
|---|---|---|---|---|---|
| M01-R5 | Aprobar el concepto visual y la distribución como escenario inicial de 320 × 200, con 24 conjuntos de paredes y 18 grupos de mobiliario. | 22/10/2026 | «APRUEBO ESTE ESCENARIO. COMO INICIAL.» | [Plano R5](../../design-proposals/escenarios/mapa01-r5-paredes-y-rutas-20261022/01-mapa-general-r5.png) y [registro original](../../design-proposals/escenarios/mapa01-r5-paredes-y-rutas-20261022/APROBACION_ESCENARIO_INICIAL.md). | Construcción y pruebas dependían de PROGRAMACION. Sustituido por M01-R7 como referencia inicial, sin borrar su aprobación histórica. |

La pauta anterior se conserva íntegra en [respaldo R7 previo al registro](historial-niveles/PAUTA_R7_antes_registro_2026-10-23_104620.md). Sus afirmaciones de implementación describen aquel corte; para el estado actual se consulta PROGRAMACION.

Las siguientes propuestas de NIVELES tendrán ID y revisión identificables. Al aceptar Iván una opción inequívoca —incluido «me gusta», «acepto» o «elijo»— se guardarán decisión exacta, fecha, cita, recurso y dependencias; se actualizará el resumen y se archivará lo sustituido. Si el referente no es inequívoco, se preguntará únicamente cuál opción acepta. Una aceptación no se extiende a otras opciones ni a revisiones posteriores.

## 1. Contrato jugable que debe acompañar a cada escenario
- Recorrido infinito: base → escenario → jefe superado y puerta disponible → siguiente escenario.
- Cada mapa cuenta cinco minutos de tiempo activo. Pausa, cartas y terminales detienen sus relojes.
- Jefe a 4:00 como parámetro aceptado de ensayo; no se universaliza como horario definitivo de todo el catálogo.
- A 5:00 aparece la puerta blindada con dos aliados y cesan nuevas apariciones enemigas, incluidos refuerzos del jefe.
- Los enemigos que ya viven permanecen. La puerta requiere jefe superado; vencerlo antes no permite omitir la espera hasta 5:00.
- Si los dos aliados ven al jefe vivo, uno huye por la puerta y uno permanece como apoyo limitado. No pueden resolver el jefe por el jugador; sus bajas no entregan XP temporal.
- Desde 5:00 se congelan regeneración y cooldowns de habilidades según la regla aceptada; ataques y recargas siguen funcionando y los efectos activos expiran normalmente.
- Antes del cruce se resuelven XP, elecciones y premio del jefe una sola vez. Cruzar conserva vida/configuración de la expedición y reinicia el reloj del mapa siguiente.
- La puerta es avance de escenario; no una extracción que termina la expedición.
- Mochilas y accesorios físicos de arma quedan fuera del recorrido nuevo.

## 2. Escala, diversidad y movimiento
Escala vigente de M01 — NIV-ESC-008-A / EST-ESC-001 r1: **240 × 160 casillas**, 32 unidades por casilla; superficie de 38.400 casillas y ancho visible objetivo de 512 unidades en móvil vertical. La escala original R7 de 480 × 320 queda en su historial. Actores y objetos conservan sus proporciones de mundo; inclinación visual y difuminado no cambian física ni velocidad.

Combinar seis familias en una distribución irregular:
- Plaza abierta con pilares espaciados y varias conexiones.
- Recintos delimitados de tamaños diferentes, con dos salidas como mínimo y tres preferidas.
- Grupo modular poroso, con piezas de diferentes medidas y orientaciones.
- Laberinto amplio, con tabiques escalonados, cortes transversales y pequeños patios.
- Servicios/talleres con galería y recorrido exterior.
- Arena abierta con centro despejado, varios accesos y llegada a puerta rodeable.

Las familias se repiten con variantes y giros compatibles; no se acepta llenar el escenario con una cuadrícula de copias idénticas. Abierto no significa vacío: usar pilares, pantallas y mobiliario de borde para dar referencias sin consumir el centro de maniobra.

Medidas nominales propuestas:
- Enlaces principales y pasos del laberinto de la opción A: 10–14 casillas libres, sujetos a validación física.
- Aberturas de recintos de la opción A: 6–8 casillas libres, sujetos a validación física.
- Dos o más áreas amplias, incluida la arena del jefe.
- Al menos dos salidas separadas por recinto transitable; las más delimitadas prefieren tres.
- Circuito exterior y cruces internos que permitan volver a otra zona sin retroceder por el mismo acceso.

“Cerrado” significa delimitado por paredes con varias entradas; no significa introducir bloqueos temporales o habitaciones obligatorias de una sola puerta. El mobiliario se coloca después de reservar recorridos. Ninguna decoración, cofre o equipo puede anular una salida.

La puerta y el jefe deben quedar alcanzables dentro del ritmo de cinco minutos. Al crecer la superficie, se deben medir las distancias reales y los tiempos de aproximación; no se heredan las cifras de R5.

El grafo conceptual R7 tiene ocho nodos y trece enlaces, un componente conectado y ninguna zona o enlace individual indispensable para conectar el resto. Este resultado corresponde solo al grafo entre zonas. Este análisis conceptual no acredita por sí solo anchuras, puertas ni colisiones físicas; consultar la evidencia de PROGRAMACION.

## 3. Cofres y puntos de interés
Reservar seis candidatos de exploración, todos accesibles. Son ubicaciones alternativas, no seis cofres garantizados.

| Profundidad | Intentos activos | Probabilidad por intento | Máximo de exploración |
|---|---|---|---|
| Mapas 1–3 | 1:00, 2:00, 3:00 y 4:00 | 10 % | 1 |
| Mapas 4–7 | Los mismos cuatro momentos | 15 % | 2 |
| Mapas 8+ | Los mismos cuatro momentos | 20 % | 3 |

Los topes no garantizan una aparición. Abrir no libera cupo y el contenido queda fijado al aparecer. Cofre de jefe y recompensa de grieta se tratan por separado. Los tickets del ensayo son ficticios.

Conservar apertura de exploración durante 3,5 segundos en proximidad, distancia máxima de 50 unidades y línea libre; pausa o cartas detienen el proceso. El radar no revela cofres desconocidos: las marcas del concepto no sustituyen el descubrimiento de juego.

El terminal de sustitución de armas es opcional y está próximo al inicio en T1BC; su posición real la selecciona el algoritmo entre puntos válidos. Abrirlo pausa el ensayo. No implica tienda, gacha o fusión permanente.

## 4. Grietas, fusión y ampliaciones
- Grieta especial: desde el mapa 2, entrada opcional por contacto y ventana de 45 segundos activos. La frecuencia, los sorteos y sus aprobaciones se consultan en [GRIETAS_DADO_POR_MINUTO_V2.md](GRIETAS_DADO_POR_MINUTO_V2.md); la franja histórica 1:30–3:00 no gobierna el nuevo contrato por minuto.
- Recinto separado, origen congelado y retorno tras reclamar victoria: dependencias de ESTRUCTURA. Para conocer su implementación se consulta PROGRAMACION.
- Escape anticipado: una única ventana de cinco segundos entre 1:00 y 3:00 del recinto. Su instante, ubicación y aviso requieren concretar la ficha.
- En el mapa 1 de esta propuesta no se dibuja una grieta activa ni se exige jugar ese bloque para validar el escenario.
- La sala de fusión dentro de algunos escenarios está aceptada. Su frecuencia, recetas, herencia y límite de operaciones siguen abiertos; esta pauta no la añade obligatoriamente al mapa 1.
- Saltos dimensionales no deben borrar la obligación del jefe ni conceder premios por mapas omitidos. No forman parte de esta primera prueba espacial.

## 5. Dirección artística y legibilidad
- **Pixel art 2.5D**, con proyección ortográfica ligeramente inclinada: paredes bajas con caras frontales, grosor, volumen en objetos y sombras suaves.
- Backrooms amarillo: alfombra gastada/húmeda, papel mural repetitivo, zócalos envejecidos y fluorescentes.
- Difuminado leve en iluminación, sombras y decoración lejana. Mantener legibles actores, suelo cercano, accesos y límites sólidos.
- Preservar contraste de los monstruos y la lectura de movimientos/ataques sobre el suelo. La luz amarilla no debe fundir sus siluetas con el entorno.
- Evitar que paredes altas o capas de luz oculten una ruta o un grupo entero de enemigos; comprobar la oclusión durante la integración.
- Distinguir zonas con geometría, desgaste, disposición de luces y equipos, manteniendo un ambiente coherente.
- Usar como referencia los actores existentes del proyecto; las multitudes de las láminas no aprueban diseños nuevos ni sustituyen sus PNG.
- Mantener separadas colisión de suelo, altura visual, decoración y elementos interactivos. La ilustración no define la física.

## 6. Contrato de futura generación procedural
La dirección procedural y el concepto visual/distribución M01-R7 están aceptados. El siguiente orden es una guía para construir el generador, no una aprobación adicional de cada algoritmo o parámetro. Su implementación se consulta en PROGRAMACION.

Orden de construcción:
1. Crear un grafo de sectores con circuito exterior y conexiones alternativas. La referencia R7 usa seis familias; la propuesta futura permite seis a nueve áreas, conservando las familias necesarias.
2. Asignar tamaño y tipo a cada sector. Reservar al menos dos áreas de maniobra y la arena.
3. Seleccionar piezas compatibles por ancho y posición de sus accesos. Variar silueta, dimensiones y orientación; no solo el color de las paredes.
4. Conectar primero las rutas amplias; colocar después paredes y tabiques, manteniendo dos caminos independientes entre sectores principales.
5. Añadir objetos fuera de accesos, esquinas de giro y reservas. Cada habitación transitable debe mantener dos salidas.
6. Colocar inicio, terminal opcional próximo, jefe, llegada y seis candidatos de cofre en puntos accesibles.
7. Construir la navegación con radios reales de jugador y enemigos; comprobar puertas, anchuras, giros, rutas alternativas y accesos aliados.
8. Probar ocupación progresiva de monstruos y medir atascos, desplazamientos, oclusión, legibilidad y rendimiento.
9. Guardar semilla y versión del catálogo. Rechazar composiciones inválidas y usar una plantilla de respaldo validada de la misma versión.

No afirmar que un plano se ha generado proceduralmente porque ilustre módulos. El grafo conectado no sustituye las pruebas de la geometría resultante.

## 7. Entrega y evidencia
- Plano general del escenario, con variedad espacial y escala propuesta.
- Vista de ocupación ilustrativa con monstruos, diferenciada de una partida ejecutada.
- Familias de módulos y sus conexiones para construir posteriormente el generador.
- Guía de zonas, reglas de circulación, paleta y fuentes.
- Contrato de datos y comprobaciones claramente separadas: grafo, geometría, partida y aceptación visual.
- Reglas vigentes de jefe, puerta, aliados y premios, sin reintroducir extracción final.

La cantidad de figuras dibujadas no determina capacidad, balance ni límite de enemigos. La vía de escape disponible cambia con su ocupación; el diseño ofrece alternativas geométricas, y la densidad/IA/velocidad se deben ajustar mediante pruebas.

## 8. Aplicación actual
M01 R7 — Backrooms modular 2.5D. Entrega en design-proposals/escenarios/mapa01-r7-modular-backrooms-25d-20261022. El plano mezcla plazas, recintos, grupos modulares, laberinto amplio y servicios, con una arena abierta.

Vigencia: M01 con escala NIV-ESC-008-A / EST-ESC-001 r1 y arte base R7, GRIETAS-V1 / 01–06 y su animación aprobada NIV-GRI-009 r1. NIVELES-GRIETAS-001 r1 concreta recintos y traslado de ensayo para LOT-EST-005; no declara su aceptación artística ni ejecución. R5 y el plano R7 original se conservan como historial. La implementación se consulta en PROGRAMACION.
