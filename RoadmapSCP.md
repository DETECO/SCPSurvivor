# RoadmapSCP

Registro maestro del juego, decisiones, pendientes, etapas, evidencias y seguimiento hasta la primera versión completa publicada.

**Versión:** 0.7 — tabla y saldo de reciclaje aprobados; subida pendiente, 12 de octubre de 2026.  
**Director:** el usuario. **Estado:** planificación; implementación y publicación del juego no autorizadas. Subida de este documento a GitHub autorizada.  
**Copia local vigente:** `/workspace/RoadmapSCP.md`. **Destino aprobado:** [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), archivo raíz `RoadmapSCP.md` en `main`. **GitHub:** subida autorizada y pendiente; escritura rechazada con HTTP 403. **Web:** sin publicar ni sincronizar.  
**Nombre del juego:** SCP Survivor es un nombre de trabajo; el nombre definitivo está pendiente. El nombre de este registro permanece RoadmapSCP.

## 1. Objetivo y condición de término

Adaptar directamente el código funcional de PokéSurvivor para un juego de supervivencia de soldados y anomalías, con identidad propia, expediciones entre escenarios, equipo físico, progreso persistente y clasificación. Reutilizar y adaptar antes de sustituir sistemas; evaluar la viabilidad con evidencia.

**La demo y la primera partida completa son hitos intermedios. El proyecto se dará por terminado cuando la primera versión completa del alcance aprobado funcione, supere sus pruebas de aceptación y esté publicada y comprobada en producción.** Una URL publicada con funciones pendientes tampoco basta.

El director confirmó que cooperativo, Hardcore, códigos y regalos serán ampliaciones posteriores a ese cierre. No se cuentan en el denominador de la primera versión. PC, grandes ampliaciones de catálogo y funciones no aprobadas tampoco entran silenciosamente en el alcance.

Este archivo conserva las decisiones conocidas y propone su organización ejecutable por etapas. **Todavía no es un plan final aprobado para programar:** faltan decisiones, contratos y parámetros señalados más adelante. No autoriza a rellenarlos mediante suposiciones de producto.

## 2. Autorizaciones y control del documento

| ID | Acción | Estado y alcance |
|---|---|---|
| A-001 | Lectura, investigación y planificación | Vigente. Se permite inspeccionar código/documentación y mantener el registro. |
| A-002 | Guardar RoadmapSCP y asignar pesos | Autorizado en la solicitud actual. Crear este archivo, consolidar lo visto, pendientes y etapas hasta publicación; comprobar la integridad del documento. |
| A-003 | Implementar el juego | No autorizado. Requiere identificar expresamente la fase o tarea que se permite implementar. |
| A-004 | Ejecutar juego, pruebas del repositorio, herramientas de build o instalar dependencias | No autorizado. Las verificaciones de texto de este registro no son pruebas del juego. |
| A-005 | Crear repositorios, ramas, commits; desplegar o escribir en servicios | No autorizado con carácter general. Excepción documental vigente: subida y commit de RoadmapSCP en el repositorio elegido, A-008. La copia original se conserva intacta. |
| A-006 | Construir/publicar la web y activar automatización | No autorizado; otro hilo. |
| A-007 | Pagar servicios o habilitar facturación | No autorizado. El objetivo de 20 USD/mes no constituye autorización de gasto. |
| A-008 | Guardar RoadmapSCP en DETECO/SCPSurvivor | Autorizado expresamente por el director. Inspeccionar el repositorio existente, conservar sus archivos, subir este registro mediante un commit documental y verificar el resultado. Los futuros desarrollos del juego se guardarán allí conforme se autoricen; esta elección de destino no autoriza a empezar a programar, copiar la base completa, desplegar, construir la web ni activar automatizaciones. |

La copia local del archivo está fuera de la copia del juego para conservarla intacta. No se han guardado nuevos programas, parches, configuraciones ni recursos gráficos. Las ilustraciones adjuntas se describen en ART-001; sus originales no están incrustados en este Markdown.

**Acceso parcial y bloqueo de escritura, 12/10/2026:** las consultas iniciales devolvieron HTTP 404. Después de los ajustes del director, la API confirma `DETECO/SCPSurvivor` público y rama predeterminada `main`. Se inspeccionaron `README.md` y `LICENSE`, únicos archivos previos, en la revisión inicial `a8627fbcad05955702cc59c1efa42be14827b345`. Aunque la ficha del repositorio muestra `push: true`, los intentos de crear `RoadmapSCP.md` desde GitHub CLI y desde el conector fueron rechazados con HTTP 403, `Resource not accessible by integration`. Esos permisos de la ficha no prueban el permiso efectivo de escritura de la integración. No se ha subido el archivo ni creado un commit. La autorización A-008 sigue vigente: cuando la integración permita escribir, añadir únicamente este documento y verificar contenido y commit sin solicitar de nuevo permiso al director.

La aprobación de una decisión de diseño no autoriza implementación, pruebas, publicación ni automatización. Las autorizaciones se mantienen mientras no cambien sus condiciones. Cualquier cambio de alcance deberá versionar este registro y preservar la decisión sustituida.

## 3. Referencia técnica y límites de la investigación

| Campo | Referencia |
|---|---|
| Repositorio original | https://github.com/JPTER78/pokesurvivor |
| Web de referencia | https://pokesurvivor.com/ |
| Rama analizada | `main`, predeterminada visible al consultar el origen |
| Commit fijado | `a1006e6e3d0cea9162238a90b0ffdd7fd38397b6` |
| Fecha del commit | `2026-10-11T17:23:47+02:00` |
| Inspección | 11–12 de octubre de 2026; HEAD local y ausencia de cambios reconfirmados el 12 |
| Copia local consultada | `/workspace/containment-survivor` |
| Estado real de esa copia | Copia del original; el nombre del directorio no demuestra una adaptación SCP implementada |
| Recursos locales | Copia selectiva; los sprites de `assets/pokemon/` no están completos localmente |
| Repositorio activo propio de SCP Survivor | [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), elegido por el director; público y rama predeterminada `main`, comprobados por API el 12/10/2026. Contenido previo: `README.md` y `LICENSE`; commit inicial `a8627fbcad05955702cc59c1efa42be14827b345`. |
| Repositorio de seguimiento/web | Sin destino confirmado; pendiente de aprobación e implementación en el otro hilo |

No se ha iniciado el juego, ejecutado su build, instalado dependencias, medido FPS ni reproducido defectos durante esta planificación. Las conclusiones de funcionamiento son análisis estático, salvo donde se indique expresamente documentación externa.

Los documentos anteriores de `/workspace/pokesurvivor-research/` son antecedentes. Sus propuestas de cantidades, controles y arquitectura no sustituyen las decisiones posteriores aquí consolidadas. No se mezclan versiones del repositorio: las referencias de código corresponden al commit fijado.

### Niveles de evidencia

- **DOCUMENTADO:** una fuente afirma o describe la característica.
- **LOCALIZADO EN CÓDIGO:** se identificó una implementación mediante lectura; no demuestra que funcione correctamente en ejecución.
- **VERIFICADO MEDIANTE EJECUCIÓN:** requiere entorno, procedimiento y resultado. Actualmente ninguna función de SCP Survivor tiene esta evidencia.
- **PENDIENTE DE COMPROBAR:** falta lectura suficiente, decisión, prueba o medición.

## 4. Alcance de la primera versión completa

### 4.1 Experiencia central

Juego gratuito de navegador, inicialmente individual, para Safari en iPhone y Chrome en Android, en horizontal y vertical. Teléfonos de referencia: iPhone 13, iPhone 15 e Infinix Note 40 **5G**. Objetivo propuesto y aprobado de rendimiento: 60 FPS; todavía sin mediciones ni umbrales de aceptación detallados.

El jugador mueve a su soldado, las armas apuntan y disparan automáticamente y las habilidades se activan manualmente. La expedición continúa entre sectores sin volver al menú. Los sectores contienen varias oleadas, con preparación de 5–30 segundos entre ellas. Hay habitaciones amplias, corredores y exploración opcional, construidos mediante módulos de escenario.

La expedición es infinita como estructura jugable. La dificultad progresa por sectores y oleadas. En algunos mapas aparecen opciones de extracción. Extraer termina la expedición conservando recompensas y penaliza su puntaje; morir tiene una penalización mayor y activa pérdida/recuperación del equipo. Escapar de un jefe permite avanzar a otro escenario sin recompensa por derrotarlo ni penalización adicional de puntaje.

### 4.2 Catálogo comprometido para esta entrega

| Componente | Cantidad y contenido |
|---|---|
| Soldados | 2: guardia básico con Sprint de emergencia; médico operativo con primeros auxilios instantáneos |
| Armas | 3 familias/modelos iniciales: pistola, subfusil y escopeta; nombres y estadísticas pendientes |
| Modificaciones | 6, con compatibilidades y efectos indicados abajo |
| Mochilas | 2 modelos; diferente capacidad como única diferencia inicial |
| Entorno | 1 ambientación modular propia inspirada en Backrooms, capaz de generar múltiples sectores |
| Enemigos normales | 2: perseguidor inspirado en SCP-049-2 y atacante a distancia inspirado en SCP-811 |
| Jefe | 1 inspirado en SCP-049; siempre existe una vía de escape |
| Categorías permanentes | 10 categorías por soldado, con 10 mejoras posibles por categoría |
| Modos de acceso | Cuenta con Google o correo real/contraseña; demo online de invitado sin transferencia de progreso |
| Persistencia y servicios | Caché local, guardado en nube, una expedición activa por cuenta, autoridad de servidor para operaciones persistentes |
| Economía | Tickets separados de reclutamiento y suministros, gacha, equipo físico, reciclaje, almacén y buzón de excedentes |
| Clasificación final | Global y por país, mejor expedición válida, fórmula oficial por misiones/avance después de las pruebas |

Los 24 soldados y 24 diseños de criaturas aportados son referencias y reserva de contenido. No equivalen a 48 personajes comprometidos para esta primera publicación. La aspiración de cientos de armas/modificaciones y miles de combinaciones es una dirección futura, sin cantidad ni plazo de entrega aprobado.

### 4.3 Modificaciones aprobadas

| Modelo de trabajo | Efecto | Coste o inconveniente | Compatibilidad |
|---|---|---|---|
| Empuñadura estable | Menor dispersión | Sin inconveniente directo aprobado | Pistola, subfusil, escopeta |
| Recarga asistida | Recargar más rápido | Sin inconveniente directo aprobado | Las tres |
| Mecanismo reforzado | Más daño | Sin inconveniente directo aprobado | Las tres |
| Cargador ampliado | Más capacidad de cargador | Recarga más lenta | Las tres |
| Mecanismo rápido | Mayor cadencia | Más dispersión | Pistola y subfusil |
| Munición perforante | Atraviesa más enemigos | Menos daño por impacto | Pistola y subfusil; no atraviesa paredes ni obstáculos indestructibles |

Hay dos espacios genéricos por arma; no se repite una misma modificación en esa arma. Munición perforante es una modificación física, no munición consumible. Dos armas pueden estar equipadas y solo una activa; la recarga de la inactiva continúa en segundo plano. La reserva de munición es infinita, con cargadores y recarga automática. Cada modelo tiene características fijas, sin variantes estadísticas de calidad en el MVP.

### 4.4 Categorías permanentes

| Categoría | Función aprobada; magnitud pendiente |
|---|---|
| Vitalidad | Salud máxima |
| Protección | Reducción de daño recibido |
| Potencia | Daño de armas |
| Cadencia | Intervalo entre disparos |
| Recarga | Tiempo de recarga del cargador |
| Movilidad | Velocidad de desplazamiento |
| Recolección | Radio de recogida de experiencia |
| Aprendizaje | Experiencia ganada durante la expedición |
| Recuperación | Regeneración de salud |
| Especialización | Reducción de espera entre usos de la habilidad |

La experiencia permanente del soldado permite elegir una mejora de categoría por nivel. Un duplicado permite mejorar una categoría del soldado repetido, sin subir su nivel general. Si todas están completas, concede tickets de suministros. Los puntos y categorías temporales de la expedición son un sistema distinto y se reinician al terminarla.

### 4.5 Pérdida, recuperación y almacenamiento

Al morir se sortea un porcentaje entre 25 % y 50 % del número de unidades perdidas. Si el resultado contiene una fracción, esta es la probabilidad de recuperar una unidad adicional: 1,2 significa una unidad segura y 20 % de posibilidad de una segunda. Después se seleccionan las unidades aleatoriamente. En cantidades pequeñas se puede recuperar todo o nada; el rango corresponde al cálculo previo, no a una garantía exacta por resultado.

Un arma con sus modificaciones instaladas es una unidad para la recuperación; las modificaciones sueltas son unidades independientes. La mochila equipada es otra unidad y recuperarla no devuelve automáticamente su contenido. La recuperación se resuelve al cerrar el resultado de muerte y vuelve a la cuenta cuando el servidor la confirma. Se simula a los compañeros que encontraron el cuerpo; no exige NPC aliados ni cooperativo.

El almacén es compartido por cuenta, con capacidad fija inicial medida en espacios por objeto. El buzón guarda excedentes de gacha, extracción y recuperación; tiene capacidad limitada y no caduca. Cuando ambos están llenos se bloquea el gacha antes de consumir tickets. Un resultado de expedición conserva su entrega pendiente y bloquea una nueva expedición hasta resolverla; solo hay uno por cuenta.

El equipo sobrante puede reciclarse. Cada modelo tiene su valor de reciclaje, acumulable hacia tickets de suministros. Cuando se recicla un arma con modificaciones instaladas se consume el conjunto y se suma el aporte de sus componentes. Las equivalencias iniciales están aprobadas en D-132; su equilibrio real y funcionamiento aún no se han probado.

**Papel del reciclaje, D-131:** fuente complementaria de tickets de suministros; las misiones son la fuente principal. Referencia inicial aprobada: unos cinco objetos comunes por ticket, con valores propios por modelo. Es un objetivo de diseño para calibrar, no una cadencia de recompensas medida. D-132 concreta la tabla inicial. Q-002 mantiene pendientes el análisis conjunto con recompensas y la validación.

**Kit básico, D-130:** reposición de emergencia por pieza: se entrega pistola básica cuando no hay ninguna arma disponible para comenzar, y mochila pequeña cuando no hay ninguna mochila disponible. Las copias de esa entrega gratuita tienen valor de reciclaje cero; las copias obtenidas jugando o mediante gacha mantienen el valor normal de su modelo. La distinción corresponde al origen de cada copia, no a bloquear el reciclaje de todas las pistolas o mochilas pequeñas. Quedan por concretar qué ubicaciones cuentan como disponibles, límite de copias gratuitas, transferencia y tratamiento de pérdida/recuperación; Q-008 se conserva parcialmente pendiente. El aporte de modificaciones obtenidas normalmente sigue la suma por componentes D-124, sin atribuir valor al arma gratuita.

**D-132 / Q-002 — APROBADA como tabla inicial:** 100 puntos de reciclaje se convierten en un ticket de suministros. El saldo sobrante se conserva en la cuenta entre operaciones y partidas, sin perderse al morir. Los puntos no son objetos de la mochila ni pesos de avance del roadmap. Conversión entera con remanente: 135 puntos dan un ticket y conservan 35. Los modelos gratuitos mantienen aporte cero por D-130.

| Modelo | Puntos de reciclaje aprobados |
|---|---:|
| Pistola obtenida jugando/gacha | 20 |
| Subfusil | 30 |
| Escopeta | 40 |
| Empuñadura estable | 15 |
| Recarga asistida | 20 |
| Mecanismo reforzado | 25 |
| Cargador ampliado | 20 |
| Mecanismo rápido | 25 |
| Munición perforante | 30 |
| Mochila pequeña obtenida jugando/gacha | 20 |
| Mochila grande | 35 |

Esta tabla está aprobada como punto inicial para futuras pruebas; no constituye un equilibrio demostrado ni una clasificación de rareza/potencia. Con un ticket por objeto de gacha, todo componente devuelve menos de un ticket; reciclar únicamente premios de gacha no puede sostener tiradas indefinidas sin otra fuente de recursos. Esta última conclusión es matemática sobre los valores, no una prueba ejecutada del juego. Al reciclar un arma con modificaciones se consumen los componentes y se suman sus aportes una única vez. Quedan análisis y validación futura de ritmo real, fuentes externas de recompensas, duplicados, transacciones y origen gratuito; cualquier cambio de valores exige registrar su aprobación.

### 4.6 Gacha y primeros hitos

- Reclutamiento y suministros usan tickets distintos, guardados en la cuenta y no perdidos al morir.
- Reclutamiento: un ticket por tirada. Puede dar duplicados desde el principio. Si el médico sigue bloqueado, la tercera tirada lo garantiza.
- Hitos iniciales de reclutamiento: primera oleada completada, alcanzar segundo sector y alcanzar tercer sector; un ticket por hito, una única vez por cuenta.
- Suministros: un ticket por objeto; se elige armas, modificaciones o mochilas antes de sortear el modelo.
- Suministros proceden de misiones, compensación de duplicados de soldados completos y reciclaje. Reclutamiento procede de hitos.
- Probabilidades de suministros aprobadas en D-126: distribución uniforme entre modelos de la categoría elegida. Con el catálogo inicial, cada arma tiene probabilidad exacta 1/3, cada modificación 1/6 y cada mochila 1/2. Son probabilidades por tirada, sin garantía de recibir todos los modelos tras un número determinado de intentos. No cambia la garantía del médico en reclutamiento.
- La concesión de tickets por hitos de avance no acredita una derrota de jefe si el encuentro fue evadido.

**LOCALIZADO EN CÓDIGO original:** `js/data/missions.js` define plantillas diarias/semanales; `G.Progress.ensure` en `js/systems/progress.js` crea tres misiones diarias y dos semanales, y `G.Progress.claim` concede premios al reclamarlas. `js/ui/goals-ui.js` muestra sus listas y reclamación. Se ha leído el código del commit fijado, sin ejecución. Las cantidades, recompensas, renovación y reglas de reclamación del original no se consideran aprobadas automáticamente para SCP Survivor.

**D-133 / Q-003 — decisión pendiente:** estructura de las misiones que darán suministros: A, diarias/semanales; B, contratos de expedición renovables al completar; C, combinar ambos. A aprovecha directamente los períodos y listas existentes, pero limita las recompensas de misión por calendario. B mantiene objetivos remunerados durante sesiones largas, pero requiere acordar renovación y evitar repetir solo los más fáciles. C reutiliza diarias/semanales y añade contratos renovables, con más parámetros de equilibrio; permite continuar obteniendo recompensas de misiones sin depender exclusivamente del calendario. Propuesta del asesor: C. Cantidades, objetivos, premios y límites todavía pendientes; no cerrar esta elección sin respuesta del director.

### 4.7 Hitos intermedios que no son el final

**H-001 — Primera partida completa mínima:** guardia, pistola con recarga, Sprint, perseguidor, dos sectores sencillos enlazados, varias oleadas con preparación, experiencia y selección de mejoras, continuidad entre sectores, extracción/muerte y resumen. Arte provisional propio. Inventario completo, gacha, clasificación y servicios finales se incorporan después según dependencias. Este hito todavía no está implementado ni probado.

**MVP integrado:** el catálogo pequeño y los sistemas comprometidos funcionan juntos. Aún debe pasar aceptación, optimización, preparación y publicación. MVP significa primera versión mínima completa del alcance acordado; una demo aislada no satisface este objetivo.

**Primera versión publicada:** todas las etapas de juego cerradas con evidencia, clasificación oficial habilitada tras validación, servicios propios, URL pública y verificación de producción. Este es el cierre del global.

## 5. Registro de decisiones aprobadas

Cada decisión tiene alcance de diseño o planificación salvo autorización expresa indicada. Su fundamento procede de las elecciones del director y de la evidencia citada; la columna final conserva su consecuencia principal. Las cifras de equilibrio que no aparecen aquí siguen pendientes.

| ID | Tema y alternativa aprobada | Justificación/consecuencia y dependencia |
|---|---|---|
| D-001 | Adaptar directamente PokéSurvivor | Reutilizar sistemas; no iniciar un motor nuevo. Auditoría previa. |
| D-002 | Usar contenido SCP cumpliendo las condiciones ya acordadas | Procedencia registrada; no reabrir la explicación en cada turno. |
| D-003 | Web propia e independiente en otro hilo | Refleja el plan; no gobierna el juego. |
| D-004 | Intención de distribución gratuita | No autoriza costes ni monetización de tiradas. |
| D-005 | Prioridad móvil | PC queda pendiente de una ampliación concreta. |
| D-006 | Horizontal y vertical | Adaptar cámara, HUD, manifiesto y bloqueo de orientación del original. |
| D-007 | Apuntado/disparo automático y habilidades manuales | Define controles y selección de objetivos. |
| D-008 | Continuar inmediatamente al siguiente escenario tras el sector | Escenarios inspirados en Backrooms; continuidad sin menú intermedio. |
| D-009 | Expedición infinita con extracción en mapas aleatorios | Frecuencia y condiciones de extracción pendientes. |
| D-010 | Extraer conserva recompensas y penaliza puntaje competitivo | Separar puntuación y posición en ranking. |
| D-011 | Penalización solo a la expedición actual | No reducir registros históricos. |
| D-012 | Pérdida de mochila y recuperación aleatoria simulada tras morir | Modelos con distinta capacidad; refinada por D-096 a D-102. |
| D-013 | Mochila lleva botín, suministros, armas de reserva y mods sueltos | Catálogo de consumibles/suministros adicional aún no aprobado. |
| D-014 | Armas equipadas y mods también se arriesgan al morir | Recuperación conjunta refinada en D-097. |
| D-015 | Kit básico gratuito para poder volver a empezar | Pistola y mochila pequeña; reglas antiacumulación pendientes. |
| D-016 | Almacén compartido por cuenta | No un almacén distinto por soldado. |
| D-017 | Capacidad por espacios de objeto | No inventario de formas tipo Tetris. |
| D-018 | Gestión completa de mochila/equipo entre oleadas, 5–30 s | Cambio rápido de arma en combate añadido en D-083. |
| D-019 | Varias oleadas por sector | Fin del sector continúa expedición. |
| D-020 | Final de oleada según objetivo de misión | Catálogo final de objetivos pendiente. |
| D-021 | Salas amplias, corredores y exploración opcional | Validar rutas y esquiva. |
| D-022 | Módulos diseñados y ensamblaje procedural | Adaptar generador existente; no sustituirlo sin justificación y aprobación. |
| D-023 | Primera entrega individual; cooperativo posterior | Conservar evaluación de red para ampliación, no eliminarla por defecto. |
| D-024 | Checkpoints entre oleadas | No guardado exacto en mitad del combate. |
| D-025 | Caché local y sincronización de cuenta en nube | El guardado original necesita adaptación a inventario mutable. |
| D-026 | Conexión requerida al comenzar o reanudar | Manejo de cortes concretado en D-075. |
| D-027 | Ranking global y por país | País, períodos y empates pendientes. |
| D-028 | Mejor expedición válida por jugador | No suma acumulativa de todas las partidas. |
| D-029 | Morir penaliza más puntaje que extraer | Fórmulas y porcentajes pendientes. |
| D-030 | Ranking de prueba por tiempo; oficial posterior por misiones/avance | La fórmula final se implementa y valida después de las pruebas del juego. |
| D-031 | Ranking de pruebas separado; oficial empieza en cero | No migrar marcas de pruebas al oficial. |
| D-032 | Especialidad y habilidad manual propia por soldado | Pasivas/diferencias adicionales pendientes. |
| D-033 | Modo normal conserva soldado y progreso permanente al morir | Equipo sí puede perderse. |
| D-034 | Hardcore futuro con muerte permanente y ranking propio | Fuera del cierre de primera publicación. |
| D-035 | Progresión permanente por experiencia | D-104–D-110 añaden reglas de duplicados y categorías. |
| D-036 | Empezar con guardia básico que desconoce las anomalías | Caracterización propia del juego. |
| D-037 | Reutilizar y adaptar el gacha del repositorio | No heredar automáticamente probabilidades, banners ni economía. |
| D-038 | Gacha de reclutamiento y de suministros | Tickets separados por D-103. |
| D-039 | Suministros entregan copias físicas | No planos de desbloqueo permanente. |
| D-040 | Tickets en cuenta, sin espacio ni pérdida por muerte | Servidor confirma concesiones y gastos. |
| D-041 | Guardia: Sprint de emergencia | Velocidad temporal; colisiones normales. |
| D-042 | Pistola inicial | Estadísticas y modelo definitivo pendientes. |
| D-043 | Cargadores, recarga automática y reserva infinita | Nuevo estado por arma frente al cooldown original. |
| D-044 | Mejoras temporales elegidas en preparación | Persisten entre sectores; terminan con la expedición. |
| D-045 | Pixel art | Paleta, escala, iluminación y audio aún pendientes. |
| D-046 | Primer enemigo de prueba inspirado en SCP-049-2 | Perseguidor cuerpo a cuerpo. |
| D-047 | H-001: primera partida completa mínima | Hito temprano; no cierre del juego. |
| D-048 | Safari iPhone y Chrome Android | Referencias: iPhone 13/15 e Infinix Note 40 5G. |
| D-049 | Misma forma y extensión visible de combate en ambas orientaciones | Espacio sobrante para interfaz; cámara/spawn requieren ajustes. |
| D-050 | Objetivo 60 FPS en los tres teléfonos de referencia | Meta sin medición; criterios técnicos pendientes. |
| D-051 | Duración de oleada según misión | 45–90 s fue referencia, no duración final aprobada. |
| D-052 | Primera misión de H-001: neutralizar grupo designado | Cantidad y contingencias de objetivos inaccesibles pendientes. |
| D-053 | Ataque cuerpo a cuerpo del perseguidor con aviso previo | No daño automático solo por contacto. |
| D-054 | Ambientación propia inspirada en Backrooms | No fijar un nivel canónico concreto. |
| D-055 | Mods compatibles por familias de armas | Algunas compatibles con varias familias. |
| D-056 | Espacios genéricos de modificaciones | No anclajes obligatorios de cañón/mira/etc. |
| D-057 | Sin repetir el mismo mod en un arma | Copias en otras armas o almacén sí. |
| D-058 | Mezcla de mods positivos y mods con contrapartidas | Seis efectos concretados en D-082. |
| D-059 | Gráficos originales para el juego | Sustituir imágenes temáticas del original. |
| D-060 | Arte propio provisional para H-001 | No presentarlo como arte final. |
| D-061 | Referencias provisionales: soldado 13 y criatura 3 | Del material adjunto; no son hojas animadas terminadas. |
| D-062 | Adaptación libre de historias/personajes de la wiki | Cambiar nombres/diseños; sin exigir fidelidad absoluta. |
| D-063 | Ocho direcciones visuales desde H-001 | Producción de diagonales y ciclos pendiente. |
| D-064 | Arma en capa separada del cuerpo | Requiere anclajes y orden de dibujo por dirección/fotograma. |
| D-065 | Al disparar, cuerpo y arma miran al objetivo | Movimiento puede ser lateral o hacia atrás; sin objetivo mira al movimiento. |
| D-066 | Selección automática por prioridades de amenaza | Orden e histéresis pendientes. |
| D-067 | Pistola ignora objetivos bloqueados por paredes/indestructibles | Comprobar línea de visión antes de priorizar. |
| D-068 | Objetivo máximo de infraestructura del juego: 20 USD/mes | Sin autorización de gasto; requiere estimación y controles reales. |
| D-069 | Una expedición activa por cuenta | Transferencia controlada entre dispositivos; protocolo pendiente. |
| D-070 | Google o correo real/contraseña, alias público separado | Registro, verificación, recuperación y vinculación pendientes. |
| D-071 | Demo online invitado | Contenido/tiempo limitado por definir; no objetivo final del proyecto. |
| D-072 | Progreso de demo no se transfiere a cuenta | Comunicar antes de jugar. |
| D-073 | Firebase propio como proveedor previsto | Auth y Firestore; configuración/facturación no autorizadas. |
| D-074 | Servidor confirma operaciones persistentes | Gacha, propiedad, pérdidas, recuperación y duplicados; combate cliente. |
| D-075 | Corte de conexión: terminar oleada local y esperar confirmación | Espera técnica distinta del temporizador de preparación. |
| D-076 | Retroceso de combate a checkpoint invalida ranking de esa expedición | Conserva progreso/recompensas válidos; pausa sin retroceso no descalifica. |
| D-077 | Catálogo compacto: 2 soldados, 3 armas, 6 mods, 2 mochilas, 1 entorno, 2 enemigos, 1 jefe | Cantidades aprobadas; no todos los parámetros cerrados. |
| D-078 | Segundo soldado: médico operativo | Habilidad manual de primeros auxilios. |
| D-079 | Sprint y primeros auxilios usan cooldown independiente | No consumen objetos de mochila. |
| D-080 | Primeros auxilios: curación instantánea | Cantidad y cooldown pendientes. |
| D-081 | Armas: pistola, subfusil y escopeta | Modelos ficticios y equilibrio pendientes. |
| D-082 | Seis mods y compatibilidades de la tabla 4.3 | Incrementos, costes espaciales y límites pendientes. |
| D-083 | Dos armas equipadas; una activa; cambio rápido en combate | Gestión completa entre oleadas; ambas arriesgadas al morir. |
| D-084 | Recarga continúa en arma inactiva | Cambiar no rellena cargador ni reinicia ventajas. |
| D-085 | Dos espacios de modificación por arma | Sin duplicados en la misma arma. |
| D-086 | Segundo enemigo normal: atacante a distancia | Complementa al perseguidor. |
| D-087 | Inspiración SCP-811 para el segundo enemigo | Proyectil biológico con aviso, daño inmediato y sin infección persistente inicial. |
| D-088 | Encuentros de combate o persecución según jefe; siempre se puede escapar | Sustituye propuesta de duelo cerrado hasta muerte obligatoria. Solo un jefe inicial. |
| D-089 | Escapar del jefe continúa al siguiente escenario | Conserva estado/equipo/mochila; sin recompensa de derrota. |
| D-090 | Primer jefe inspirado en SCP-049 | Adaptación inicial: ataques avisados, daño elevado sin muerte instantánea por contacto. Patrones, valores y condición de victoria pendientes de concretar. |
| D-091 | Salida del primer jefe accesible desde el inicio | Alcanzarla e interactuar brevemente, cancelable; sin objetos ni bajas requeridas. |
| D-092 | Escapar del jefe no resta puntaje | Registrar evadido separado de vencido; sin puntos/recompensa de victoria. |
| D-093 | Jefes aleatorios entre mínimo y máximo de sectores y tramo inicial sin jefe | Cantidades y primer encuentro pendientes. |
| D-094 | Dificultad por sectores y oleadas | No escalar principalmente por espera o poder del equipo. |
| D-095 | Mochilas distintas únicamente por capacidad | Sin penalización de movilidad ni bonus de recuperación inicial. |
| D-096 | Sortear porcentaje y seleccionar qué unidades vuelven | Refinado en D-098, D-100 y D-101. |
| D-097 | Arma y mods instalados se recuperan/pierden juntos | Mods sueltos independientes. |
| D-098 | Porcentaje sobre cantidad de unidades | No sobre valor económico o espacio ocupado. |
| D-099 | Recuperación al resolver muerte, confirmada por servidor | Sin temporizador real ni misión de compañeros. |
| D-100 | Recuperación inicial entre 25 % y 50 % | Parámetro inicial sujeto a validación de equilibrio. |
| D-101 | Redondeo probabilístico de la fracción | Permite resultados enteros sin perder el valor esperado. |
| D-102 | Mochila equipada participa como unidad recuperable | Contenido no vuelve automáticamente con ella. |
| D-103 | Tickets de reclutamiento y suministros separados | No única moneda intercambiable general. |
| D-104 | Duplicado permite elegir mejora permanente de categoría | Ajuste del director a la propuesta de XP simple. |
| D-105 | Categorías de atributos inspiradas en la referencia de Vampire Survivors | Se concretan en D-106; no copiar pantalla ni asignar rareza por esta referencia. |
| D-106 | Diez categorías de la tabla 4.4 | Incluye regeneración y especialización. |
| D-107 | Duplicado mejora al soldado que salió repetido | No transferir a cualquier personaje. |
| D-108 | Cada nivel permanente permite mejorar una categoría | Duplicado mejora categoría sin subir nivel general. |
| D-109 | Diez mejoras por categoría | Magnitudes y límites efectivos aún pendientes. |
| D-110 | Duplicado de soldado completamente mejorado da tickets de suministros | Cantidad pendiente. |
| D-111 | Reclutamiento por hitos, suministros por misiones | Ampliada por compensación D-110 y reciclaje D-122; no sustituir silenciosamente. |
| D-112 | Médico aleatorio con garantía posterior | Se permiten duplicados del guardia antes de obtenerlo. |
| D-113 | Tercera tirada garantiza médico si sigue bloqueado | Después pueden aparecer ambos y duplicados. |
| D-114 | Un ticket por reclutamiento y tres primeros hitos únicos por cuenta | Primera oleada, llegar a sector 2, llegar a sector 3; un ticket cada uno. |
| D-115 | Elegir armas, mods o mochilas antes de tirar suministros | Modelo concreto aleatorio dentro del grupo. |
| D-116 | Almacén limitado y fijo en MVP | Ampliaciones no comprometidas; tamaño pendiente. |
| D-117 | Premio de gacha que no cabe va al buzón | No bloquear solo porque el almacén esté lleno. |
| D-118 | Buzón general para excedentes; también destino futuro de códigos/regalos | Alcance temporal fijado por D-119. |
| D-119 | Códigos y regalos después del MVP | Reafirmado fuera del cierre de primera publicación en D-128. |
| D-120 | Buzón limitado y sin caducidad | Capacidad y unidad de cómputo pendientes. |
| D-121 | Si almacén y buzón llenos, no gastar en gacha; resultado de expedición único pendiente | No iniciar nueva expedición hasta resolver entrega. |
| D-122 | Reciclar equipo por suministros | Añade fuente económica; no heredar venta/monedas del original. |
| D-123 | Estadísticas fijas por modelo | Sin variantes estadísticas de calidad en el MVP. |
| D-124 | Valor de reciclaje distinto según modelo | Sumar el aporte de arma y mods consumidos; tabla de equivalencias pendiente. |
| D-125 | Un ticket de suministros entrega un objeto del grupo elegido | Probabilidades uniformes aprobadas en D-126. |
| D-126 | Probabilidades iguales por modelo dentro de cada categoría de suministros | Opción A aprobada expresamente: armas 1/3, modificaciones 1/6, mochilas 1/2 para el catálogo inicial. Facilita entender y probar el sorteo. No fija valores de reciclaje, recompensas ni nuevas garantías. Cierra Q-001. |
| D-127 | Guardar RoadmapSCP con etapas, pendientes y porcentajes | Autorización documental A-002; no programación. |
| D-128 | Terminar con primera versión completa funcionando y publicada | Ampliaciones después; demo no es meta final. |
| D-129 | Usar DETECO/SCPSurvivor para el roadmap y todo el desarrollo futuro autorizado del juego | Repositorio creado por el director, distinto del original. Autoriza la subida documental A-008 y fija el destino; no modifica el alcance ni autoriza implementación. Lectura confirmada; escritura de la integración bloqueada por HTTP 403 el 12/10/2026. |
| D-130 | Kit gratuito mediante reposición de emergencia y sin aporte al reciclaje | Opción A aprobada expresamente: reponer pistola o mochila básica si falta cualquier arma o mochila disponible, respectivamente. Copias gratuitas con valor de reciclaje cero; copias ganadas jugando/gacha con valor normal por modelo. Resuelve entrega general y protección económica de Q-008; quedan límites, disponibilidad, transferencia y pérdida/recuperación por concretar. No autoriza implementación. |
| D-131 | Reciclaje complementario, misiones como fuente principal de suministros | Opción A aprobada expresamente: referencia inicial de unos cinco objetos comunes por ticket, respetando valores por modelo. No aprueba una tabla exacta ni demuestra ritmo medido; Q-002 parcialmente pendiente. |
| D-132 | Tabla inicial de reciclaje, conversión y conservación del saldo | Aprobación expresa Sí: 100 puntos por ticket de suministros; once valores de la tabla 4.5; sumar componentes consumidos, copias gratuitas con aporte cero, conservar sobrante en cuenta incluso al morir. Diseño aprobado para futuras pruebas, sin implementación ni equilibrio medido. Q-002 pendiente de análisis/validación restantes. |

### Última decisión resuelta

**D-132 — Tabla de reciclaje.** El director aprobó la tabla y sus reglas de acumulación como valores iniciales. Q-002 conserva pendientes de análisis/validación, sin nuevas dudas sobre la tabla aprobada. La siguiente decisión de diseño es D-133/Q-003: estructura de las misiones remuneradas. D-131 mantiene las misiones como fuente principal de suministros; D-130 protege las copias gratuitas y D-126 cerró Q-001.

### Alternativas descartadas o desplazadas

| Alternativa | Motivo/decisión | Cuándo reconsiderar |
|---|---|---|
| Crear juego desde cero | D-001: usar base existente | Solo impedimento crítico probado y aprobación expresa |
| Probabilidades diferentes por modelo en suministros | D-126 aprobó distribución uniforme, opción A | Nuevos datos de equilibrio o cambio de catálogo, con aprobación expresa de nueva tabla |
| Kit básico prestado que no entra en el almacén | D-130 eligió reposición de emergencia, opción A | Dificultad demostrada para controlar copias gratuitas y nueva aprobación del director |
| Reciclaje más generoso, referencia de 2–3 objetos comunes por ticket | D-131 eligió referencia de unos cinco y papel complementario | Ritmo de recompensas medido insuficiente o nuevo objetivo económico, con aprobación expresa |
| Demo como entrega final | D-128: cierre exige versión completa publicada | No corresponde al objetivo vigente |
| Incorporar todas las ampliaciones antes de publicar | D-128 confirmó cierre de primera versión | Nueva versión del alcance aprobada |
| Duelo de jefe que solo termina por muerte | D-088–D-092: huida siempre posible | No sin cambio expreso del director |
| Una moneda para ambos gachas | D-103 eligió tickets separados | Revisión económica posterior aprobada |
| Evitar todos los duplicados de soldados | D-104: duplicados mejoran categorías | Nueva política de reclutamiento |
| Primera tirada garantiza médico | D-112–D-113: garantía en tercera | Evidencia de frustración y revisión aprobada |
| Recuperación 50–75 % o 0–100 % | D-100 eligió 25–50 % | Pruebas de equilibrio y nueva decisión |
| Cada objeto se recupera con tirada independiente | D-096 eligió porcentaje conjunto | Revisión del sistema aprobada |
| Recuperación por espacio o valor | D-098 eligió número de unidades | Cambio del modelo de pérdida aprobado |
| Recuperar siempre la mochila | D-102 incluye su pérdida | Revisión aprobada |
| Cinco mejoras máximas por atributo | D-109 eligió diez | Datos de progresión y nueva aprobación |
| Descarte sin compensación como solución principal | D-122 eligió reciclaje | No añadir eliminación destructiva por rutina |
| Igual valor de reciclaje para todos | D-124 eligió valor por modelo | Simplificación económica aprobada |
| Calidad estadística aleatoria por modelo | D-123: características fijas | Ampliación posterior explícita |
| Buzón con caducidad o capacidad ilimitada | D-120: limitado, sin caducidad | Revisión de almacenamiento aprobada |
| Bloquear gacha solo por almacén lleno | D-117 añadió buzón; D-121 bloquea cuando ambos se llenan | Mantener coherencia con entrega atómica |
| Packs gráficos externos propuestos inicialmente | D-059: gráficos originales | Cambio de dirección artística aprobado |
| nilbuild/developer-roadmap para seguimiento | Exclusión expresa del director | No usar ni importar materiales |

## 6. Porcentajes, pesos y estado real

### 6.1 Reglas de cómputo

Los porcentajes representan cumplimiento del alcance, **no tiempo restante, coste ni cantidad de código**. Se asignan pesos de planificación a solicitud del director; deben revisarse junto con la aprobación integral del plan antes de convertirse en la línea base oficial. No se deducen de commits, conversaciones, horas o líneas de código.

Cada tarea tiene un peso global `w`. La suma de tareas del juego es **100 puntos = 100 %**. El peso de una etapa es la suma de sus tareas. Una tarea aporta todo su peso solo cuando está **Completada y verificada (CV)** y tiene evidencias. Las demás aportan cero; no se inventan avances parciales. Si una tarea resulta demasiado grande para medirla, se divide conservando su peso y su historial, antes de marcar avances.

- Porcentaje de tarea: 100 % si está CV; 0 % en cualquier otro estado.
- Peso de tarea dentro de etapa: `100 × peso_tarea / peso_etapa`.
- Avance de etapa: `100 × suma(pesos de sus tareas CV) / peso_etapa`.
- Avance global: `100 × suma(pesos de todas las tareas CV) / suma(pesos de todas las tareas del alcance)`.
- Ninguna tarea se cuenta dos veces. Las referencias a una dependencia no duplican su peso.
- Reabrir una tarea retira su aporte hasta nueva verificación. Cambiar alcance versiona el denominador y explica el cambio; no se borran pendientes para subir el porcentaje.

Estados: **P** Pendiente; **EC** En curso; **B** Bloqueada; **EV** En validación; **CV** Completada y verificada. Las tareas de ejecución están pendientes y además carecen de autorización; no se presentan como trabajo iniciado.

### 6.2 Indicadores al crear este registro

| Indicador | Estado |
|---|---|
| Avance global oficial del alcance final | **Pendiente de definición y aprobación final**: todavía hay decisiones bloqueantes y este desglose de pesos no es un plan integral aprobado |
| Índice provisional del roadmap v0.7 | **3 %**, exclusivamente por registro documental (2 puntos) y revisión panorámica estática (1 punto); resolver decisiones aisladas no completa por sí solo una tarea ponderada |
| Planificación P00 | **30 %** del peso de esa etapa; no implica 30 % del diseño completo en términos de esfuerzo |
| Implementación/validación/publicación P01–P11 | **0 %** de sus 90 puntos |
| Juego SCP Survivor ejecutado/probado | Ninguna ejecución autorizada ni evidencia disponible |
| Juego publicado | No |
| Web de seguimiento | No construida; última sincronización correcta: ninguna |

Los dos entregables documentales CV tienen evidencia en este archivo, en las lecturas del commit fijado y en la comprobación textual del propio registro. No se atribuye al juego nuevo el código ya existente del autor original. El 3 % provisional no debe mostrarse como progreso oficial aprobado en una web.

### 6.3 Resumen por etapas del juego

| Etapa | Categoría | Peso global | Avance actual | Aporte provisional al global |
|---|---|---:|---:|---:|
| P00 | Auditoría, decisiones y plan aprobado | 10 % | 30 % | 3 % |
| P01 | Copia independiente y fundamento técnico | 8 % | 0 % | 0 % |
| P02 | Primera partida completa mínima H-001 | 10 % | 0 % | 0 % |
| P03 | Expedición, escenarios, misiones y enemigos finales | 12 % | 0 % | 0 % |
| P04 | Soldados, armas, modificaciones y combate completo | 12 % | 0 % | 0 % |
| P05 | Cuentas, autoridad de servidor y continuidad | 6 % | 0 % | 0 % |
| P06 | Inventario, muerte, recuperación, almacén y buzón | 10 % | 0 % | 0 % |
| P07 | Progresión, gacha, hitos y economía | 10 % | 0 % | 0 % |
| P08 | Demo y clasificación de pruebas/oficial | 4 % | 0 % | 0 % |
| P09 | Interfaz, arte, audio y experiencia móvil final | 8 % | 0 % | 0 % |
| P10 | Aceptación, rendimiento, integridad y costes | 6 % | 0 % | 0 % |
| P11 | Distribución, publicación y cierre verificado | 4 % | 0 % | 0 % |
| TOTAL | Primera versión completa publicada | **100 %** | **3 % provisional** | **3 % documental** |

## 7. Etapas y tareas verificables

Las rutas citadas son módulos **existentes probablemente afectados**, no autorización de modificación. Los módulos nuevos y contratos exactos se fijarán en P00; no se inventan firmas de código mientras haya decisiones pendientes. Cada etapa de ejecución requiere autorización para su alcance y las comprobaciones que necesite. Cualquier acceso de prueba a servicios debe estar aislado de los originales.

### P00 — Auditoría, decisiones y plan aprobado · 10 % global

**Objetivo:** permitir implementar la primera versión sin inventar decisiones relevantes. **Entrada:** lectura y documentación autorizadas. **Reutilización:** toda la base evaluada, todavía sin alteración. **Módulos:** lectura de los 18 dominios del inventario técnico. **Riesgos:** lagunas de auditoría, supuestos de rendimiento y decisiones incompletas.

| Tarea | Entregable y criterio de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P00-T01 | Consolidar decisiones, límites, alcance, pendientes y continuidad en RoadmapSCP. Evidencia: registro D-001–D-132 y propuestas pendientes diferenciadas; archivo legible y verificado documentalmente. | 2 % | 20 % | CV | 100 % |
| P00-T02 | Fijar versión y revisión panorámica con estructura y los 18 dominios. Evidencia: HEAD/estado de la copia y referencias del inventario; clasificar expresamente límites de acceso. No exige auditoría profunda ni ejecución. | 1 % | 10 % | CV | 100 % |
| P00-T03 | Completar análisis crítico de persistencia, economía, control de servicios, mundo modular, render/móvil y procedencia. Aceptación: cada riesgo crítico tiene evidencia, alternativas y método de validación. | 2 % | 20 % | EC | 0 % |
| P00-T04 | Resolver decisiones bloqueantes y aprobar catálogo, parámetros iniciales, balance, UX y reglas de misión/extracción. Aceptación: ningún pendiente de producto necesario para implementar queda implícito. | 2 % | 20 % | EC | 0 % |
| P00-T05 | Aprobar arquitectura incremental, contratos, pruebas, escenarios de coste y especificación de seguimiento. Aceptación: responsabilidades cliente/servidor, datos y permisos definidos; riesgos residuales aceptados. | 2 % | 20 % | P | 0 % |
| P00-T06 | Revisión y aprobación explícita de la versión final del plan y pesos. Aceptación: resolución del director registrada; siguiente tarea de implementación solo si recibe autorización aparte. | 1 % | 10 % | P | 0 % |

**Salida:** P00-T03 a T06 cerradas. La verificación de este Markdown no sustituye las pruebas del juego ni la aprobación del director.

### P01 — Copia independiente y fundamento técnico · 8 % global

**Objetivo:** disponer de una base reproducible y aislada para adaptar. **Decisiones previas:** P00, repositorio/destinos/arquitectura propios aprobados. **Reutilización:** orden de módulos, arranque, build y configuración existentes donde sean adecuados. **Archivos:** `dev.html`, `tools/build.js`, `js/main.js`, `js/core/firebase-config.js`, `firebase.json`, `.firebaserc`, `sw.js`, `manifest.webmanifest`, configuración propia por definir. **Riesgos:** llamadas accidentales al origen, cambios masivos y build no reproducible.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P01-T01 | Crear/configurar copia o repositorio independiente, fijar upstream y conservar avisos. Verificar que cambios/remotos no alteran el proyecto original y que se puede reconstruir la revisión. | 2 % | 25 % | P | 0 % |
| P01-T02 | Arranque y build propios reproducibles con dependencias controladas. Probar salida de `dev.html` y bundle equivalentes y errores de carga visibles. | 2 % | 25 % | P | 0 % |
| P01-T03 | Aislar servicios, orígenes, claves, cachés y ambientes de prueba. Inspección de tráfico debe demostrar ausencia de llamadas de escritura/uso a los servicios originales. | 2 % | 25 % | P | 0 % |
| P01-T04 | Establecer catálogo/configuración mínima y puntos de integración sin romper los módulos reutilizados. Prueba de arranque local aislado, controles y carga del contenido propio mínimo. | 2 % | 25 % | P | 0 % |

**Salida:** arranque reproducible, entorno aislado y evidencia de dependencias. No avanzar sobre servicios del autor mientras se configura el proyecto propio.

### P02 — Primera partida completa mínima H-001 · 10 % global

**Objetivo:** validar el bucle central antes de ampliar sistemas. **Entrada:** P01 y parámetros de H-001 aprobados. **Reutilización:** `game.js`, jugador, cámara, entradas, combate, proyectiles, experiencia y animador. **Archivos:** `js/game.js`, `js/entities/player.js`, `js/entities/enemy.js`, `js/systems/combat.js`, `js/systems/levelup.js`, `js/core/sprites.js`, `js/world/world.js`, HUD/menús. **Riesgos:** controles, claridad, colisiones y producción de animación provisional.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P02-T01 | Guardia provisional, movimiento, cámara equivalente entre orientaciones, ocho direcciones y arma separada. Comprobar control táctil, colisiones y legibilidad en una escena mínima. | 2 % | 20 % | P | 0 % |
| P02-T02 | Pistola automática con cargador, recarga, selección básica aprobada y Sprint. Probar disparos, paredes, agotamiento del cargador y cooldown sin duplicar acciones. | 2 % | 20 % | P | 0 % |
| P02-T03 | Primer perseguidor y misión de neutralización, con aviso de golpe. Completar varias oleadas sin enemigos inaccesibles que bloqueen el cierre. | 2 % | 20 % | P | 0 % |
| P02-T04 | Recoger experiencia y elegir mejoras en preparación; enlazar dos sectores de prueba conservando estado aprobado. Verificar temporizador de preparación y transición sin reinicio del personaje. | 2 % | 20 % | P | 0 % |
| P02-T05 | Recorrido completo: inicio, combate, mejora, transición, extracción/muerte, resumen y nueva partida. Documentar recorrido reproducible y problemas de experiencia antes de ampliar catálogo. | 2 % | 20 % | P | 0 % |

**Salida:** una partida completa comprobada. No equivale a versión final ni a validación del inventario, nube o economía completos. Las funciones mínimas aquí verificadas no se vuelven a contar como nuevas en P03/P04: esas tareas cubren sus ampliaciones concretas.

### P03 — Expedición, escenarios, misiones y enemigos finales · 12 % global

**Objetivo:** completar la estructura de expedición infinita del catálogo inicial. **Entrada:** P02, reglas de misiones/extracción/dificultad aprobadas. **Reutilización:** generación/chunks, colisiones, pathing, aparición de enemigos y arenas. **Archivos:** `js/world/world.js`, `js/world/tiles.js`, `js/systems/pathing.js`, `spawner.js`, `rift.js`, `events.js`, `hazards.js`, `interact.js`, `js/data/enemies.js`, `js/entities/enemy.js`, `js/game.js`. **Riesgos:** rutas imposibles, oleadas que no terminan, dificultad abusiva, fuga bloqueada.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P03-T01 | Entorno modular propio con salas/corredores/zonas opcionales y semillas reproducibles. Validar conectividad, espacio de aparición y salida alcanzable en el conjunto de semillas acordado. | 3 % | 25 % | P | 0 % |
| P03-T02 | Director de sectores/oleadas con objetivos, preparación 5–30 s y dificultad por avance. Probar fin de objetivo, condiciones de contingencia y continuidad de expedición. | 3 % | 25 % | P | 0 % |
| P03-T03 | Segundo enemigo a distancia y combinación de los dos normales. Probar avisos, proyectiles esquivables, cobertura y ataques desde posiciones visibles/justas según reglas aprobadas. | 2 % | 16,67 % | P | 0 % |
| P03-T04 | Jefe inspirado en SCP-049: patrones, refuerzos limitados, victoria y salida disponible. Probar huida cancelable, avance sin victoria ni recompensa de jefe, y aparición con límites entre sectores. | 2 % | 16,67 % | P | 0 % |
| P03-T05 | Extracción aleatoria y cierre de expedición; transición de estados sin duplicar resultados. Probar extraer, seguir, morir y escapar de jefe como resultados diferentes. | 2 % | 16,67 % | P | 0 % |

**Salida:** expediciones extendidas reproducibles con objetivos y salidas válidas. Los 16,67 % son presentación redondeada; el cálculo usa 2/12, no la suma de decimales redondeados.

### P04 — Soldados, armas, modificaciones y combate completo · 12 % global

**Objetivo:** completar las elecciones tácticas del catálogo. **Entrada:** P02 y estadísticas/compatibilidades/composición de efectos aprobadas. **Reutilización:** jugador, familias de ataques, proyectiles, aplicación de modificadores, curación/buffs y animador. **Archivos:** `js/entities/player.js`, `projectile.js`, `js/systems/combat.js`, `js/data/moves.js`, `upgrades.js`, `js/core/sprites.js`, catálogos propios todavía por diseñar. **Riesgos:** recargas duplicadas, combinaciones excesivas, apuntado inestable y acoplamientos Pokémon.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P04-T01 | Guardia y médico con diferencias y habilidades completas. Probar Sprint y curación instantánea, límites de salud y cooldown independiente sin consumibles. | 3 % | 25 % | P | 0 % |
| P04-T02 | Tres armas con sus patrones aprobados, dos equipadas y recarga en segundo plano. Probar cambio durante disparo/recarga, cargadores independientes y reserva infinita. | 3 % | 25 % | P | 0 % |
| P04-T03 | Seis mods, dos slots por arma, compatibilidad y ausencia de duplicado por arma. Probar combinaciones representativas y límites de efectos; perforación no atraviesa paredes. | 2 % | 16,67 % | P | 0 % |
| P04-T04 | Prioridades de amenaza, línea de visión y orientación cuerpo/arma definitivas. Probar cobertura, cambios de objetivo y movimiento lateral sin oscilación injustificada. | 2 % | 16,67 % | P | 0 % |
| P04-T05 | Composición coherente de base, categorías permanentes, mods y mejoras temporales. Pruebas con extremos aprobados y reinicio de efectos temporales al terminar la expedición. | 2 % | 16,67 % | P | 0 % |

**Salida:** todas las elecciones de combate funcionan y los valores calculados coinciden con los explicados en interfaz. No se heredan cuatro movimientos ni escalas de poder del original como requisito del juego nuevo.

### P05 — Cuentas, autoridad de servidor y continuidad · 6 % global

**Objetivo:** fundamento seguro de propiedad y progreso persistente. Puede investigarse/diseñarse desde P00 y ejecutarse después de P01, en paralelo lógico con contenido; debe cerrarse antes de la integración persistente P06/P07. **Reutilización:** Auth, caché, interfaz de acceso y partes del guardado. **Archivos:** `js/core/db.js`, `firebase-config.js`, `js/ui/login.js`, `firestore.rules`, `database.rules.json`, `functions/`, configuración propia. **Riesgos:** dobles gastos, restauración de objetos perdidos, cuentas duplicadas y costes sin control.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P05-T01 | Cuenta Google/correo real, alias y flujos de recuperación aprobados; servicios propios. Probar alta, acceso, cierre, errores y vinculación si entra en el diseño final. | 2 % | 33,33 % | P | 0 % |
| P05-T02 | Operaciones persistentes de servidor con propiedad, versión e idempotencia. Probar peticiones repetidas/concurrentes, ausencia de escritura económica libre del cliente y recuperación tras respuesta perdida. | 2 % | 33,33 % | P | 0 % |
| P05-T03 | Checkpoints, caché/nube, una expedición activa, cambio de dispositivo y desconexiones. Probar corte de oleada, espera en preparación, cierre del navegador y marca de expedición no clasificable al retroceder combate. | 2 % | 33,33 % | P | 0 % |

**Salida:** contratos persistentes y aislamiento demostrados en entorno autorizado. Esta etapa establece garantías de operación; P06/P07 verifican sus reglas específicas sin volver a contabilizar el fundamento genérico.

### P06 — Inventario, pérdida, recuperación, almacén y buzón · 10 % global

**Objetivo:** ciclo de propiedad completo del equipo físico. **Entrada:** P04 para modelos y P05 para autoridad; capacidades/stacking/equipamiento aprobados. **Reutilización:** presentación de objetos, pickups y guardado donde sean compatibles; el original no aporta un almacén equivalente listo. **Archivos:** `js/data/items.js`, `js/entities/pickup.js`, `player.js`, `js/core/db.js`, UI de equipo y operaciones de servidor por definir. **Riesgos:** duplicación, pérdida accidental y bloqueos por capacidad.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P06-T01 | Copias de equipo con identidad, dos mochilas, espacios y slots equipados/reserva. Probar límites, transferencias y gestión entre oleadas con dos armas. | 2 % | 20 % | P | 0 % |
| P06-T02 | Almacén compartido fijo y kit gratuito según reglas aprobadas. Probar volver a jugar sin equipo, impedir acumulación/reciclaje explotable del kit y uso entre soldados. | 2 % | 20 % | P | 0 % |
| P06-T03 | Muerte con sorteo 25–50 %, redondeo probabilístico y unidades agrupadas. Probar conjuntos, cantidades pequeñas, mochila independiente y una sola resolución de recuperación por expedición. | 2 % | 20 % | P | 0 % |
| P06-T04 | Buzón de excedentes limitado, sin caducidad, y reclamación confirmada. Probar entrega de gacha/extracción/recuperación, capacidad, reclamación repetida y cuenta en otro dispositivo. | 2 % | 20 % | P | 0 % |
| P06-T05 | Ambos depósitos llenos y resultado único pendiente. Probar bloqueo de gasto, conservación del resultado, gestión para liberar espacio, resolución tras desconexión y bloqueo de nueva expedición hasta cerrar. | 2 % | 20 % | P | 0 % |

**Salida:** equipo nunca tiene dos propietarios/ubicaciones a la vez y ningún resultado se resuelve dos veces; el jugador puede recuperarse de una derrota sin bloqueo permanente. Códigos/regalos no son parte de estas tareas.

### P07 — Progresión, gacha, hitos y economía · 10 % global

**Objetivo:** progresión completa y economía consistente. **Entrada:** P05/P06 y tablas de equilibrio aprobadas. **Reutilización:** `progress`, logros/misiones, mejoras y separación gacha/UI. **Archivos:** `js/systems/gacha.js`, `progress.js`, `levelup.js`, `js/data/upgrades.js`, `missions.js`, `achievements.js`, `js/ui/gacha-ui.js`, `goals-ui.js`, operaciones de servidor. **Riesgos:** azar sesgado, tickets repetidos, recompensas autosostenidas y categorías al máximo sin regla.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P07-T01 | XP permanente y diez categorías con diez mejoras, independientes de XP temporal. Probar subida, elección, límites, progreso tras muerte y tratamiento de todas las categorías completas. | 2 % | 20 % | P | 0 % |
| P07-T02 | Reclutamiento con ticket propio, garantía del médico en tercera, duplicado del mismo soldado y compensación al máximo. Probar secuencias controladas, costes y recuperación de operación. | 2 % | 20 % | P | 0 % |
| P07-T03 | Suministros por grupo elegido, un ticket/un objeto, modelos fijos y probabilidades aprobadas. Probar distribución configurada, grupo sin candidatos, entrega/overflow y gasto único. | 2 % | 20 % | P | 0 % |
| P07-T04 | Misiones/hitos y concesión de tickets, incluyendo tres hitos iniciales una vez por cuenta. Probar reclamación, reinicio/cambio de dispositivo y avance por huida sin acreditar victoria de jefe. | 2 % | 20 % | P | 0 % |
| P07-T05 | Reciclaje por modelo, acumulación hacia tickets y compensaciones finales. Verificar matemáticamente tablas y probar reciclaje repetido, componentes instalados, objetos gratuitos y ausencia de ciclos autosostenidos de tiradas. | 2 % | 20 % | P | 0 % |

**Salida:** progreso completo de cuenta y economía coherente con tablas visibles. Las comprobaciones probabilísticas deberán distinguir exactitud del algoritmo de variación estadística en muestras; aún no se ha ejecutado ninguna.

### P08 — Demo y clasificación de pruebas/oficial · 4 % global

**Objetivo:** acceso de prueba y competencia publicable. **Entrada:** P03/P05/P07 para resultados persistentes. **Reutilización:** invitado, guard, ranking y UI. **Archivos:** `js/ui/login.js`, `js/core/guard.js`, `js/net/ranking.js`, `js/ui/ranking-ui.js`, reglas/servidor de puntuación. **Riesgos:** ranking manipulable, empates/país ambiguos, confundir pruebas con producción.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P08-T01 | Ranking de pruebas por tiempo, separado del oficial. Probar mejor marca, expedición inválida, muerte/extracción y tratamiento de desconexiones según reglas. | 1 % | 25 % | P | 0 % |
| P08-T02 | Implementar fórmula oficial de misiones/avance, país/global y validación de resultados. Se ejecuta después de P10-T01/T02, conforme a D-030; probar sus casos nuevos antes de publicar. | 1 % | 25 % | P | 0 % |
| P08-T03 | Demo online de invitado con alcance aprobado y aviso de no transferencia. Probar entrada/salida y registro sin premios ni progreso persistente indebidos. | 1 % | 25 % | P | 0 % |
| P08-T04 | Validar ranking oficial, empates, penalizaciones, reinicio a cero y exclusión de pruebas. Evidencia de resultados esperados y controles de publicación; no habilitarlo públicamente antes de P11. | 1 % | 25 % | P | 0 % |

**Orden especial:** P08-T01/T03 → P10-T01/T02 → P08-T02/T04 → P10-T03 → P11. Así se respeta la transición de ranking solicitada sin crear una dependencia circular. Aprobar el ranking de pruebas no verifica el oficial.

### P09 — Interfaz, arte, audio y experiencia móvil final · 8 % global

**Objetivo:** presentación completa y coherente de todos los sistemas. **Entrada:** dirección artística/UI aprobada; puede producirse desde P02 y finalizar tras P03–P08 inicial. **Reutilización:** Canvas/Animator, audio Web Audio, HUD, touch, menús/settings. **Archivos:** `css/`, `js/ui/`, `js/core/touch.js`, `input.js`, `audio.js`, `sprites.js`, `settings.js`, `js/data/music.js`, `sprites-meta.js`, `assets/`, manifiesto. **Riesgos:** arte legible a escala móvil, costes de producción y paneles complejos.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P09-T01 | Arte final del catálogo, escenarios, armas separadas y animaciones ocho direcciones. Verificar coherencia, anclajes, siluetas, legibilidad y procedencia de cada recurso final. | 2 % | 25 % | P | 0 % |
| P09-T02 | Menús y flujos completos de soldado, equipo, categorías, gacha, almacén, buzón y resultados. Recorridos probados con estados vacíos, llenos, errores y espera de servidor. | 2 % | 25 % | P | 0 % |
| P09-T03 | HUD y controles definitivos en ambos formatos, safe areas y transición de orientación. Probar los tres móviles, cambio de arma/habilidad, pausas y ausencia de ventaja de campo visible. | 2 % | 25 % | P | 0 % |
| P09-T04 | Audio, avisos, ajustes y accesibilidad básica aprobados. Verificar desbloqueo de audio Safari, volúmenes, señales que no dependan solo de color/sonido y reducción de efectos acordada. | 2 % | 25 % | P | 0 % |

**Salida:** experiencia final, no solo pantallas maquetadas. Las ilustraciones conceptuales no sirven como evidencia de una función implementada.

### P10 — Aceptación, rendimiento, integridad y costes · 6 % global

**Objetivo:** demostrar que el alcance es publicable. **Entrada:** integración P01–P07, P08 inicial y P09; después se incorpora ranking oficial como se indica. **Reutilización:** mecanismos de observación/ajustes existentes adecuados; herramientas nuevas solo justificadas y aprobadas. **Riesgos:** pérdida/duplicación de datos, dispositivos lentos, gasto y errores de actualización.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P10-T01 | Aceptación funcional del juego integrado antes del ranking oficial: expediciones completas, victoria/huida/extracción/muerte, progreso y reinicio. Registrar defectos reproducidos, corregir y cerrar los bloqueantes. | 2 % | 33,33 % | P | 0 % |
| P10-T02 | Rendimiento en los tres teléfonos y ambos formatos con escenarios y umbrales aprobados. Medir fotogramas, memoria/carga y sesiones largas; comparar cambios equivalentes y documentar límites. | 2 % | 33,33 % | P | 0 % |
| P10-T03 | Validación final de economía, concurrencia, datos, costes y ranking oficial tras P08-T04. Probar errores/reintentos, estimar consumo con carga acordada, revisar riesgos residuales y ejecutar regresiones justificadas por cambios. | 2 % | 33,33 % | P | 0 % |

**Salida:** evidencias completas, sin defectos bloqueantes aceptados como terminados, riesgos residuales expresamente tratados y candidato de publicación identificado. Aprobar 60 FPS como objetivo no cierra P10-T02.

### P11 — Distribución, publicación y cierre verificado · 4 % global

**Objetivo:** primera versión completa accesible públicamente y comprobada. **Entrada:** todas las tareas previas necesarias CV; destino/servicios y publicación autorizados expresamente. **Archivos:** build de distribución, configuración propia de hosting/caché/manifiesto, materiales públicos y documentación de operación. **Riesgos:** build distinto al validado, configuración original, cachés antiguas, fallo de producción y gasto no controlado.

| Tarea | Entregable y prueba de aceptación | Peso global | Peso en etapa | Estado | Avance |
|---|---|---:|---:|---|---:|
| P11-T01 | Preparar versión candidata identificable, créditos/procedencia, nombre, instrucciones, política de datos y notas del alcance. Verificar que recursos provisionales no se presentan como finales. | 1 % | 25 % | P | 0 % |
| P11-T02 | Preparar alojamiento/dominio, servicios propios, permisos mínimos, controles de coste, copia/recuperación y rollback aprobados. Verificar configuración antes de solicitar autorización final de despliegue. | 1 % | 25 % | P | 0 % |
| P11-T03 | Publicar la versión autorizada y habilitar ranking oficial desde cero. Evidencia: URL, versión/commit y resultado de despliegue, sin conexiones a servicios originales. | 1 % | 25 % | P | 0 % |
| P11-T04 | Verificar producción: acceso, cuenta, partida, persistencia, gacha, almacén/buzón, clasificación, actualización y móviles. Registrar aceptación del director, incidencias residuales y entrega operativa. | 1 % | 25 % | P | 0 % |

**Salida y 100 %:** primera versión completa funcionando y publicada, pruebas finales documentadas y aceptación de cierre. Un despliegue fallido o una URL que solo muestra la demo mantiene tareas pendientes. La duración de observación en producción se debe fijar antes de esta etapa.

### Dependencias principales

P00 → P01 → P02 → P03/P04. P05 puede avanzar desde P01 una vez aprobados contratos. P04 + P05 habilitan P06; P05 + P06 habilitan P07. P03 + P05 + P07 habilitan P08 inicial. P09 acompaña el desarrollo y se cierra para P10. El cierre de P08/P10 sigue la secuencia especial indicada. P11 es la última etapa obligatoria.

El orden no autoriza ejecución paralela por agentes ni implementación automática. Cada tarea debe señalar sus dependencias reales antes de iniciarse. La validación es parte de cada entrega, no se aplaza toda hasta P10.

## 8. Lo que falta definir antes de programar y antes de publicar

**C** requiere decisión del director sobre alternativas fundamentadas. **T** requiere investigación/propuesta técnica del asesor; no se pregunta al director un dato comprobable leyendo código. **V** requiere ejecución/medición autorizada. Los temas se pueden agrupar coherentemente para aprobación; no es necesario convertir cada cifra en una pregunta aislada.

**Prioridad 1:** bloquea el diseño o el inicio de la tarea dependiente. **Prioridad 2:** bloquea integrar el MVP completo. **Prioridad 3:** bloquea publicar. Toda referencia a una propuesta significa pendiente, no aprobación tácita.

| ID | Pendiente, alternativas o información faltante | Tipo/prioridad | Dependencias y bloqueo |
|---|---|---|---|
| Q-001 | RESUELTA por D-126: distribución uniforme por categoría; probabilidades del catálogo inicial registradas en 4.6. Implementación y pruebas del sorteo siguen pendientes en P07-T03. | Resuelta, 12/10/2026 | Ya no bloquea decisión de probabilidades; P07-T03 sin implementar |
| Q-002 | DISEÑO DE TABLA RESUELTO por D-131/D-132: papel complementario, once valores aprobados en 4.5, 100 puntos por ticket y remanente en cuenta. Pendientes análisis conjunto con recompensas de Q-003, doble cómputo y validación de todas las rutas económicas; no reinterpretar la tabla como pendiente de aprobación. | T+V; C si se propone cambiar valores / 2 | P06/P07; validación restante |
| Q-003 | D-133 pendiente: diarias/semanales, contratos renovables o combinación, alternativas en 4.6. Después fijar tickets por misión, objetivos, períodos/límites, hitos posteriores a los tres iniciales, compensación de duplicado completo y reclamación. | C / 2 | P07; sí |
| Q-004 | XP permanente: cuándo se gana y confirma, tabla de niveles y qué sucede al completar las 10×10 mejoras. Diferenciar XP temporal y permanente en eventos/UI. | C+T / 2 | P04/P07; sí |
| Q-005 | Incrementos y topes efectivos de las diez categorías; composición con mods y mejoras temporales. Elegir reglas de acumulación, no copiar porcentajes del original. | C+T+V / 1 | P04, P07, equilibrio; sí |
| Q-006 | Armas: daño, dispersión, alcance, cadencia, cargador, recarga, patrón de escopeta, cambio de arma y temporizadores al pausar/transitar. | C+T+V / 1 | P02 pistola y P04 catálogo; sí |
| Q-007 | Magnitudes de los seis mods, instalación/desmontaje, coste si lo hubiera, tiempo de gestión, visualización de piezas y persistencia de la configuración. | C+T / 2 | P04/P06; sí |
| Q-008 | PARCIALMENTE RESUELTA por D-130: reposición de emergencia por pieza y valor cero al reciclar copias gratuitas; copias normales conservan su valor. Quedan ubicaciones que cuentan como disponibles, momento exacto de entrega, cantidad máxima, transferencia y pérdida/recuperación. Verificar que origen gratuito no se pierde al mover o recuperar objetos. | C+T / 1 | P06/P07; sí para detalles y validación restantes |
| Q-009 | Capacidades exactas de mochilas, almacén y buzón; espacios por modelo; apilado, unidad de capacidad del buzón y entrega de lotes. | C+T / 1 | Contratos P05 y P06; sí |
| Q-010 | Recogida de botín, mochila llena durante combate, objetos dejados en el suelo, movimiento entre equipo/mochila/almacén y acceso al reciclaje desde un resultado pendiente. | C / 2 | P03/P06/UI; sí |
| Q-011 | Detalles de recuperación: distribución del porcentaje dentro de 25–50 %, selección uniforme o sesgo explícito, unidades elegibles y registro de sorteo para impedir repetirlo con recargas. | T y C si cambia equidad / 2 | P05/P06; sí |
| Q-012 | Jefe: patrones y valores del ataque avisado de daño elevado sin muerte instantánea, refuerzos, condiciones de victoria/contención, recompensa y duración/interrupción de la interacción de huida. Concretar la ficha dentro de esa dirección. | C+T+V / 1 | P03-T04; sí |
| Q-013 | Mínimo/máximo entre jefes, duración del tramo inicial sin jefe y efecto de huir sobre contador/objetivos. | C / 2 | P03/P08; sí |
| Q-014 | Misiones iniciales y finales: número de oleadas, cantidades, duración por objetivo, preparación exacta dentro de 5–30 s y opción de terminarla antes. | C / 1 | P02/P03; sí |
| Q-015 | Extracción: probabilidad, mínimo/máximo o garantía, señales previas, activación, vulnerabilidad y relación con oleadas/jefes. | C / 1 | P03/P06/P08; sí |
| Q-016 | Curvas de dificultad por sector/oleada, límites de población/proyectiles/velocidad y tratamiento de expediciones muy largas. | C+T+V / 1 | P03/P04/P10; sí |
| Q-017 | Prioridades concretas de amenaza y estabilidad del objetivo; reglas de visión para todas las armas/enemigos, no solo pistola; geometría y colisiones. | C+T+V / 1 | P02/P04; sí |
| Q-018 | Diseño de módulos de mundo, conectividad, tamaño de salas, corredores, semilla/checkpoint y resolución de enemigos u objetivos inaccesibles. | C+T+V / 1 | P02/P03; sí |
| Q-019 | Arte: paleta, escala nativa, tamaños aparentes, anclajes/ciclos de ocho direcciones, iluminación/efectos y aspecto final del médico, atacante a distancia y jefe. | C+T / 1 | Arte mínimo para P02; finales P09; sí |
| Q-020 | Audio/ambientación y accesibilidad: música, sonidos de avisos, mezcla, vibración si se propone, sacudidas/destellos y ajustes. | C+T / 2 | P09; sí |
| Q-021 | Distribución táctil y pantallas; representación de inventario, selección de mejora, confirmaciones de reciclaje, espera de nube y safe areas. Idiomas iniciales por confirmar. | C+T+V / 1 | P02 y P09; sí |
| Q-022 | Autenticación: correo verificado, recuperación de contraseña, vinculación Google/correo, alias, recuperación/eliminación de cuenta y versiones de navegadores soportadas. | C+T / 1 | P05; sí |
| Q-023 | Protocolo de una expedición: propiedad de sesión, transferencia entre dispositivos, caducidad del bloqueo, reconciliación y desconexión en muerte/extracción. | T + C para comportamiento visible / 1 | P05/P06/P08; sí |
| Q-024 | Modelo de datos, transacciones, identificadores, comandos idempotentes, versiones, migración, límites de documentos y retención. Elegir qué partes de `db.js` adaptar sin reintroducir su unión de colecciones. | T / 1 | P05–P08; sí |
| Q-025 | Integridad competitiva: qué resultados puede comprobar el servidor, qué continúa confiando al cliente, política de resultados sospechosos y riesgo residual aceptable. | T+C+V / 1 | P05/P08/P10; sí |
| Q-026 | Puntuación final por misiones/avance; penalizaciones numéricas muerte/extracción; límites de tiempo, país, cambios de país, períodos, empates y marcas al evadir jefe. | C+T / 2 | Fórmula debe diseñarse antes de plan final; implementación oficial tras pruebas, P08 |
| Q-027 | Demo: contenido, duración, restricciones, salida y registro; sin transferencia ya aprobado. | C / 2 | P08-T03; sí |
| Q-028 | Pausas, pestaña oculta, orientación, temporizadores y regeneración en preparación; impedir que una pausa técnica altere dificultad, recarga, puntuación o recompensas indebidamente. | C+T+V / 1 | P02/P03/P05/P08; sí |
| Q-029 | Disposición de sistemas originales no decididos: test inicial, tipos/evoluciones, clima, eventos, colecciones, logros adicionales, social, arenas especiales. Conservar/adaptar/posponer/sustituir con evidencia y autorización si es importante. | T+C / 1 | P01–P04; sí si bloquean acoplamientos |
| Q-030 | Destino del juego resuelto por D-129: DETECO/SCPSurvivor; lectura y contenido inicial comprobados, escritura bloqueada por HTTP 403. Quedan resolver permisos de integración, estrategia de copia/ramas, configuración separada y dependencia de build/SDK; no añadir frameworks sin necesidad demostrada. Elegir repositorio y subir documentación no completa P01-T01. | T+C / 1 | P01/P05; sí |
| Q-031 | Escenarios de usuarios/sesiones/operaciones y costes dentro del objetivo 20 USD/mes. Billing, cuotas, avisos, medidas efectivas y comportamiento al alcanzar límites. | T+C+V / 1 | Antes de servicios P05 y publicación; sí |
| Q-032 | Objetivos medibles de FPS/tiempo de fotograma, memoria, carga, duración de sesión, población y degradación aceptable por dispositivo/orientación. | T+C+V / 1 | P02 para línea base; P10 para aceptación; sí |
| Q-033 | Plan de pruebas, datos ficticios, escenarios/semillas y cobertura de regresión. Distinguir pruebas que requieren nuevas autorizaciones de la auditoría de lectura. | T / 1 | Todas las etapas de ejecución |
| Q-034 | Nombre final, alojamiento, dominio, actualización de caché/build, privacidad/datos, materiales públicos, recuperación/rollback y período de observación tras desplegar. | C+T / 3 | P11; sí bloquea publicación |
| Q-035 | Destino de RoadmapSCP resuelto por D-129: raíz de DETECO/SCPSurvivor, en `main`; subida autorizada A-008 y bloqueada por HTTP 403. Quedan permisos efectivos de escritura, versión/esquema estructurado, permisos de automatización de la web, imágenes y cálculo; aprobar formatos derivados y pesos definitivos. | T+C / 1 para coordinación | P00-T05/T06 y hilo web; no requisito de arranque del juego |
| Q-036 | Condiciones de publicación de novedades y capturas reproducibles, evidencia por versión y qué hacer si falta una imagen. | T+C / 2 | Seguimiento independiente |
| Q-037 | Auditoría de servicios y dependencia indirecta de Cloudflare para altas de cuenta: `signups`, funciones y Worker además de TURN. Decidir cómo aislar/conservar/adaptar sus funciones útiles. | T+C si sustituye servicio / 1 | P01/P05; sí |
| Q-038 | Acceso persistente a originales gráficos y metadatos de producción; validar recursos finales y del material público. Las cuatro láminas del chat aún no son un paquete de sprites archivado. | T+C / 1 para producción | P02/P09/P11 |

### Puerta para empezar a programar

Antes de autorizar una tarea se necesita: alcance de esa tarea aprobado, decisiones bloqueantes resueltas, contrato de entrada/salida acordado, módulos/riesgos identificados, procedimiento de prueba y aislamiento preparado en el plan. El director deberá autorizar expresamente la tarea/fase. La aprobación de este archivo como registro no autoriza automáticamente P01.

Para aprobar **todo el plan de primera publicación** deben cerrarse los pendientes de producto/arquitectura que bloquean el MVP, fijar parámetros iniciales verificables y señalar qué ajustes dependerán de pruebas. Las mediciones pendientes pueden permanecer como hipótesis con método y momento; no como promesas de rendimiento.

## 9. Inventario técnico: reutilización y comparación

### 9.1 Estructura y tecnología observadas

JavaScript propio y Canvas 2D; módulos que comparten `G` y carga por scripts ordenados. `dev.html` es la entrada fuente; `tools/build.js` genera `index.html` y `js/app.min.js`. Se localizaron 64 scripts locales en el arranque. `js/main.js` comprueba módulos requeridos antes de iniciar. El README describe un despliegue simple, pero la distribución actual sí tiene generación de bundle y servicios externos; no interpretar “sin dependencias” como ausencia de servicios.

Directorios presentes: `css/`, `js/core/`, `js/data/`, `js/entities/`, `js/systems/`, `js/world/`, `js/ui/`, `js/net/`, `assets/`, `tools/`, `functions/`, `cloudflare/`, `docs/`. Documentos consultados incluyen README, GDD, LICENSE, CREDITS y guías Firebase/publicación/TURN. `js/ui/test.js` es un cuestionario de personalidad, no una suite de pruebas.

Sin `package.json` raíz localizado. `functions/package.json` declara Node 20, `firebase-admin ^12.7.0` y `firebase-functions ^6.1.0`, con lockfile. El cliente carga Firebase compat 13.0.0 desde gstatic. El build utiliza Terser mediante npx con versión mayor 5; reproducibilidad exacta pendiente. `.github` contiene FUNDING; no se localizó una suite automatizada/CI en el inventario revisado. Nada de ello se ha instalado ni ejecutado.

### 9.2 Sistemas y tratamiento propuesto

**Todos los tratamientos siguientes son recomendaciones técnicas sujetas a P00**, salvo elecciones de producto ya aprobadas. Conservar no significa “validado sin cambios”; modificar significa adaptación incremental. Posponer no equivale a eliminar. LC = LOCALIZADO EN CÓDIGO; DOC = DOCUMENTADO; PC = PENDIENTE DE COMPROBAR en el contexto SCP. Ningún sistema figura como ejecutado/verificado.

| Dominio | PokéSurvivor observado y evidencia | Adaptación SCP / tratamiento técnico | Entrega | Evidencia |
|---|---|---|---|---|
| 1. Arquitectura/tecnología | `dev.html:518`, `js/main.js:3`, `tools/build.js:4`: scripts ordenados, G, bundle | Modificar datos/configuración y acoplamientos; conservar JS/Canvas como base. Sin framework nuevo aprobado | MVP | DOC+LC; PC integración |
| 2. Render/bucle | `js/game.js:445`: RAF; dt limitado a 1/30; cámara y dibujo Canvas | Modificar lo necesario para escena propia y orientación; medir estabilidad antes de cambiar motor | MVP | LC; PC rendimiento |
| 3. Movimiento/cámara/controles | `player.js`, `camera.js:19`, `input.js`, `touch.js`; viewport depende de pantalla | Modificar viewport equivalente, orientación cuerpo/arma, dos armas y habilidades | MVP | LC; PC ergonomía |
| 4. Colisiones | `world.js:287`, `world.js:327`, `combat.js:549`: mundo, obstáculos y proyectiles | Conservar primitivas y modificar para módulos/cobertura/avisos nuevos | MVP | LC; PC casos límite |
| 5. Combate/proyectiles | `combat.js:21`, `combat.js:86`, `projectile.js`: familias y cooldown | Modificar: cargadores, recarga, mods físicos, selección por amenaza/visión. No había cargador equivalente localizado | MVP | LC; PC combinación |
| 6. Enemigos/IA/spawn | `enemy.js:339`, `enemy.js:541`, `enemies.js`, `spawner.js:34`: carga, distancia, proyectiles, escalado por tiempo | Modificar con dos roles y dificultad por sector/oleada; reutilizar comportamientos aplicables | MVP | LC; PC balance |
| 7. XP/mejoras/progreso | `levelup.js:9`, `upgrades.js:5`, `progress.js`; cartas y mejoras compradas | Modificar para XP permanente, categorías, duplicados y mejoras temporales separadas | MVP | LC; PC persistencia |
| 8. Jefes/oleadas/eventos/arenas | `rift.js:102`, `enemy.js:409`, `spawner.js`: arena cerrada y aparición por tiempo | Modificar hacia objetivos, preparación, azar acotado y escape siempre disponible. Eventos no aprobados, pendientes | MVP / algunos pendientes | LC; PC huida |
| 9. Mundo/escenarios | `world.js:1`, `world.js:70`: terreno de ruido, chunks y arenas; no ensamblador de habitaciones localizado | Modificar incrementalmente generador y validar conectividad; no reconstrucción total aprobada | MVP | LC; PC viabilidad modular |
| 10. Sprites/animación/FX | `sprites.js:141`, `sprites.js:210`, `sprites-meta.js`: Animator, filas de ocho direcciones y anclaje al suelo | Modificar composición y anclajes; reemplazar arte temático por original. Arma separada | MVP | LC; PC recursos finales |
| 11. UI/menús | `js/ui/`, `css/`, HUD y botones de movimientos | Modificar flujos y controles; gacha/equipo/buzón/categorías necesitan adaptación | MVP | DOC+LC; PC visual |
| 12. Audio | `audio.js:23`, `audio.js:60`, `music.js`: Web Audio/síntesis y desbloqueo por interacción | Modificar ambientación conservando motor si cumple necesidades | MVP | LC; PC Safari/mezcla |
| 13. Guardado | `db.js:113`, `db.js:348`, `db.js:520`: caché, merge de colecciones y transacciones | Modificar con autoridad de servidor y modelo de copias perdibles; no reutilizar unión como inventario nuevo | MVP | LC; PC integridad |
| 14. Multijugador | `net.js`, `coop.js`: WebRTC, host, RTDB y TURN, hasta cuatro en original | Modificar cuando se autorice ampliación; preservar análisis y aislamiento mientras tanto | Posterior | DOC+LC; PC red |
| 15. Compatibilidad | `game.js:43`, `manifest.webmanifest:9`: limitación de orientación; controles móviles/teclado | Modificar para móvil horizontal/vertical, tres dispositivos; PC no descartado pero posterior sin alcance | MVP móvil | LC; PC dispositivos |
| 16. Rendimiento/carga | `settings.js:30`, `world.js`, `sprites.js`: calidad adaptativa, cachés y preload; `spawner.js` CAP 64 | Conservar técnicas útiles; medir límites propios. CAP original no es objetivo ni resultado del juego nuevo | MVP | LC; PC mediciones |
| 17. Servicios/dependencias | `firebase-config.js`, `db.js:32`, `functions/`, `cloudflare/`, `sw.js` | Modificar para instancias/configuración propias; revisar registro y cuotas independientes de coop | MVP / red posterior | DOC+LC; PC costes |
| 18. Pruebas/mantenibilidad | No suite/CI localizada; build en tools y emuladores declarados en firebase.json | Modificar herramientas donde sirvan e incorporar pruebas específicas con autorización; no asumir que quiz es test | Todas las etapas | LC del inventario; PC ejecución |

### 9.3 Hallazgos estáticos relevantes

| ID | Hallazgo y referencia | Consecuencia concreta |
|---|---|---|
| EST-001 | `db.js:113` une `owned`/`shiny` y toma máximos de progreso | Podría restaurar equipo perdido si se extrapola esa política a copias físicas; necesita otro contrato |
| EST-002 | `firestore.rules:19` valida propietario y estructura raíz, no toda la economía del mapa `save` | El modelo nuevo no puede confiar en escritura económica libre del cliente |
| EST-003 | `gacha.js:80` decide resultados y modifica tickets/colección en cliente | Reutilizar estructura/UI; ejecutar decisión/gasto persistentes en servidor según D-074 |
| EST-004 | `game.js:43` pausa/advierte en vertical táctil; manifiesto landscape | D-006 exige cambiar ambos y verificar cámara/touch |
| EST-005 | `camera.js:60` outerRadius depende del viewport y se usa al generar enemigos | Igualar solo tamaño de sprites no garantiza igual área visible ni aparición |
| EST-006 | `player.js:323` prioriza jefes/amenaza/distancia; helper nearest sin filtro de visión | La selección aprobada exige un filtro y prioridades explícitas |
| EST-007 | `sprites.js:210` dibuja por anclaje de suelo; no se localizaron anclajes de mano por frame | Arma separada necesita metadatos/composición adicional, no solo nueva imagen |
| EST-008 | `game.js:219` concede recompensas al terminar incluso si muere; equipo original es un único item | No equivale a extracción, mochila ni recuperación aprobadas |
| EST-009 | `game.js:454` limita dt; efectos a FPS bajos no medidos | Posible ralentización de simulación frente a reloj real; medir antes de afirmar defecto |
| EST-010 | `sw.js:15` elimina cachés de otros nombres del mismo origen | Planificar origen/cache propios y actualización; no probarlo junto a servicios reales del original |
| EST-011 | `guard.js` comprueba rangos localmente; `firestore.rules:99` comprueba tiempo/nivel/bajas acotados | No demuestra integridad completa de combate ni ranking competitivo |
| EST-012 | `signups.js:20`, `functions/index.js` y Worker usan dominio original para cuotas/altas además de TURN | Posponer coop no elimina por sí solo la dependencia de Cloudflare |
| EST-013 | Worker `Mau.fetch` cuenta actividad y bloquea altas nuevas al límite; otras altas de actividad pueden aumentar el contador | Ese mecanismo no acredita un límite rígido total de gasto; no reutilizar sus comentarios tarifarios como presupuesto |
| EST-014 | `upgrades.js` etiqueta cooldown como recarga, sin cargadores | Separar cadencia, cargador y habilidad en datos/UI para no aplicar un modificador al temporizador equivocado |

**Defectos reproducidos:** ninguno en esta planificación. **Hallazgos estáticos:** los anteriores. **Riesgos sin validación:** ver sección 12. Esta separación evita presentar una inferencia como fallo ejecutado.

## 10. Arquitectura propuesta y contratos a cerrar

Esta sección es propuesta de arquitectura incremental, no implementación lista para aplicar. Mantener JS/Canvas y adaptar los módulos existentes; no introducir motor, framework o capas nuevas sin necesidad. Separar configuración del contenido evita seguir utilizando tipos, generaciones e identificadores Pokémon como identidad del nuevo juego.

### 10.1 Responsabilidades

| Área | Responsabilidad propuesta | Qué falta aprobar/precisar |
|---|---|---|
| Catálogo | Definiciones de soldados, armas, mods, mochilas, enemigos, misiones y módulos del mundo | Identificadores estables, esquemas y ubicación en módulos existentes o nuevos |
| Simulación cliente | Movimiento, combate, render, orientación, cooldowns y estado local de oleada | Relojes, pausas y nivel de evidencia de eventos que recibe el servidor |
| Cuenta/servidor | Inventario, tickets, sorteos, reclamaciones, reciclaje, progreso, resultados persistentes | Transacciones, idempotencia, datos versionados y restricciones de reglas |
| Expedición | Semilla, sector/oleada, checkpoint, equipo comprometido, elegibilidad de ranking | Propiedad de sesión, transferencia y resolución de interrupciones |
| UI | Mostrar estado confirmado frente a operaciones pendientes; no repetir efectos por reintento | Flujos y textos concretos, controles móviles y accesibilidad |
| Ranking | Aceptar resultados válidos de la fórmula vigente, separar pruebas/oficial | Verificación competitiva, país, períodos, empates y protocolo de envío |
| Seguimiento | Leer evidencias y estado de trabajo registrado, sin intervenir en juego | Esquema persistente y automatización en otro hilo |

### 10.2 Entidades de información propuestas

No son nombres de colecciones ni firmas aprobadas. Sirven para detectar contratos faltantes antes de programar.

| Entidad conceptual | Información mínima | Invariantes que deben probarse |
|---|---|---|
| Cuenta | ID, alias, país según política, soldados, tickets separados, versión de datos | No mezclar cuentas por alias/correo; actualizaciones económicas confirmadas |
| Soldado | Modelo desbloqueado, XP/nivel permanente, niveles de las diez categorías | Límite diez por categoría; duplicado mejora al modelo correspondiente |
| Copia de equipo | ID de instancia, ID de modelo, ubicación/propietario, modificaciones asociadas | Una única ubicación; un mod no puede estar instalado y suelto a la vez |
| Expedición | ID, dueño de sesión, semilla, sector/oleada, checkpoint, estado, fórmula de score, clasificación válida/no válida | Una activa por cuenta; transiciones no repetidas |
| Resultado | ID de expedición, causa, puntaje, recompensas, pérdidas, recuperación sorteada, resolución | Sorteo/resolución persistidos una sola vez; no volver a sortear tras recarga |
| Entrega/buzón | ID, origen, contenido, estado, capacidad usada, vínculo al resultado/tirada | Reclamar una vez; movimiento al almacén atómico; no caducidad en MVP |
| Operación persistente | ID de solicitud, tipo, versión previa, resultado confirmado | Reintento devuelve el mismo resultado sin gastar/conceder de nuevo |
| Gacha | Tipo, grupo, coste, versión de tabla, contador de garantía y resultado | Garantía de médico correcta; resultado almacenado antes de mostrar confirmación final |
| Reciclaje | Componentes consumidos, versión de equivalencias, aporte y remanente | No reciclar dos veces ni convertir kit gratuito en fuente ilimitada |
| Registro de ranking | Fórmula, temporada/período si se aprueba, país, mejor resultado válido | No importar pruebas al oficial ni acreditar jefe vencido al huir |

Los comandos de gasto/entrega y transferencias deben comprobar estado vigente en servidor. La caché permite continuidad y presentación; no debe reponer objetos que el servidor ya retiró. El combate sigue en cliente: validar transacciones no prueba por sí solo que todas las bajas/objetivos declarados ocurrieron.

### 10.3 Aislamiento y presupuesto

- Conservar la copia de referencia intacta y preparar el repositorio activo elegido, `DETECO/SCPSurvivor`, cuando se autorice la tarea correspondiente. Su elección y la subida del roadmap no constituyen una copia de la base ni completan el aislamiento de servicios.
- Separar desarrollo, pruebas y producción; no heredar `.firebaserc`, endpoints, CNAME, dominios o cuotas originales.
- Diseñar pruebas contra emuladores o servicios propios autorizados. La existencia de emuladores declarados no significa que se hayan ejecutado ni que estén instalados.
- Firebase Auth/Firestore es el proveedor previsto. Functions u otra ejecución de servidor deben concretarse; funciones desplegadas requieren condiciones de facturación que no están autorizadas.
- El presupuesto objetivo de 20 USD/mes requiere escenarios de cuentas activas, sesiones, checkpoints, operaciones y tráfico. No hay previsión de uso aprobada ni gasto medido.
- Las cuotas gratuitas publicadas de Firestore consultadas el 12/10/2026 incluyen 1 GiB, 50.000 lecturas/día, 20.000 escrituras/día, 20.000 eliminaciones/día y 10 GiB de salida/mes, con condiciones por proyecto/base. Son referencia documental, no capacidad garantizada para nuestro diseño.
- Los avisos de presupuesto por sí solos no detienen el gasto. Comprobar las medidas de límite realmente compatibles con cada servicio y su efecto sobre los jugadores; no prometer un techo duro sin evidencia.
- El coste de la web de seguimiento se debe presupuestar por separado; no se ha establecido que esté incluido en los 20 USD.

## 11. Pruebas y criterios de aceptación

Actualmente solo hay lecturas y verificación documental. **La siguiente matriz es un plan de pruebas, no resultados.** Para cada ejecución registrar: tarea, versión/commit, fecha, equipo, sistema operativo, navegador y versión, orientación, resolución/escala, calidad, semilla/escenario, población y proyectiles, duración, procedimiento, resultado, métricas/artefactos y defectos vinculados.

| ID | Escenario | Criterio a demostrar | Etapa |
|---|---|---|---|
| VAL-01 | Arranque/build/carga | Cero módulos requeridos ausentes; configuración propia; navegación inicial recuperable ante error | P01/P11 |
| VAL-02 | Tráfico y aislamiento | Ninguna llamada del juego adaptado a servicios originales; escrituras solo a entornos autorizados | P01/P05/P11 |
| VAL-03 | Primera partida completa | Inicio → oleadas → mejoras → segundo sector → muerte/extracción → resumen → nueva partida | P02 |
| VAL-04 | Generación de escenarios | Conectividad y salidas válidas, enemigos/objetivos alcanzables y espacio de evasión en semillas acordadas | P03 |
| VAL-05 | Jefe y huida | Opción practicable de escapar; resultado evadido, sin recompensa/puntaje de victoria; siguiente sector conserva estado | P03/P08 |
| VAL-06 | Armas/mods | Dos armas, cargadores independientes, recarga inactiva, compatibilidad, no duplicados, perforación correcta y topes | P04 |
| VAL-07 | Soldados/progresión | Habilidades distintas, categorías persistentes, XP temporal separado y reset correcto de expedición | P04/P07 |
| VAL-08 | Recuperación | Cantidad/sorteo según regla, selección sin duplicados, unidad arma+mods, mochila independiente, casos 0/1/pocas unidades | P06 |
| VAL-09 | Equipamiento y kit | Capacidad exacta; no ubicaciones dobles; se puede volver a jugar tras perderlo todo; no producir tickets gratis mediante kit | P06/P07 |
| VAL-10 | Capacidad/overflow | Almacén lleno, buzón lleno, ambos llenos, entrega pendiente y reciclaje para resolver; ningún gasto sin entrega duradera | P06/P07 |
| VAL-11 | Gacha/hitos/reciclaje | Coste único, garantía del médico, duplicados al máximo, primer hito una vez, porcentajes visibles y equivalencias sin ciclos infinitos | P07 |
| VAL-12 | Cuenta/concurrencia | Dos pestañas/dispositivos, sesión transferida, pérdida de respuesta y reintento no duplican premio ni gasto | P05–P08 |
| VAL-13 | Cortes/cierre/pausa | Terminar oleada local, esperar confirmación, muerte offline pendiente, recuperar checkpoint y descalificar solo retroceso de combate correspondiente | P05/P06/P08 |
| VAL-14 | Ranking | Pruebas separadas; fórmula oficial, mejor marca, país/global, empates, penalizaciones y exclusiones concordantes | P08/P10 |
| VAL-15 | Demo | Contenido aprobado jugable y aviso claro; crear cuenta no transfiere progreso/premios de invitado | P08 |
| VAL-16 | Teléfonos/orientación | Safari iPhone 13/15 y Chrome Note 40 5G, ambos formatos, safe areas, misma extensión de combate y audio tras interacción | P09/P10 |
| VAL-17 | Carga y sesiones largas | Escenarios de población/FX aprobados, medición de frame time/FPS, memoria/carga y estabilidad; umbrales aún pendientes | P10 |
| VAL-18 | Integridad y gastos | Solicitudes manipuladas/repetidas, permisos, límites y proyección de operaciones/coste; riesgo competitivo explícitamente aceptado | P05/P10 |
| VAL-19 | Actualización/publicación | Build publicado identificado, caché actualizable, datos compatibles, rollback practicable y recorrido real en producción | P11 |

No se fija aún un percentil de frame time ni tamaño de población como si estuviese aprobado. Antes de P10 se seleccionarán esos valores. Las comparaciones de rendimiento con el original deberán mantener dispositivo, escenario/población comparable, navegador, resolución, calidad y duración equivalentes. No usar comentarios históricos del original sobre FPS o consumo como resultados propios.

### Cierre funcional de la primera versión

El cierre exige que las tareas P00–P11 estén CV con evidencias y que:

1. El catálogo aprobado y todos sus sistemas funcionan integrados, no solo el combate de prueba.
2. Las rutas de victoria, huida, extracción, muerte, reconexión y recuperación tienen resultados persistentes correctos.
3. Gacha, progresión, reciclaje, almacén y buzón respetan costes, capacidades y propiedad sin duplicación.
4. La clasificación oficial funciona tras su propia validación, separada de pruebas.
5. Los dispositivos/orientaciones acordados cumplen los umbrales aprobados; no quedan defectos bloqueantes.
6. Hay versión publicada, URL operativa, servicios propios, configuración de coste aprobada y pruebas de producción.
7. Se ha registrado la aceptación final del director y la entrega de operación/mantenimiento.

Los detalles de ampliaciones futuras no bloquean este cierre. Si se decide incorporarlos antes, se debe aprobar una nueva versión del alcance y de sus pesos.

## 12. Riesgos e incertidumbres

Impactos cualitativos; no se asignan probabilidades numéricas sin datos. “Por estimar” significa que no hay medición suficiente, no probabilidad cero.

| ID | Riesgo / evidencia | Impacto | Probabilidad | Mitigación propuesta y momento de validación |
|---|---|---|---|---|
| R-001 | Acoplamiento Pokémon en tipos, Dex, sprites, guardado y UI; módulos citados en sección 9 | Alto | Por estimar | Mapa de dependencias y adaptación incremental P00/P01; recorrer flujos al ampliar |
| R-002 | Configuración original activa en Firebase/Cloudflare/RTDB/TURN | Alto | Presencia confirmada; incidencia sin probar | Aislar antes de ejecutar; VAL-02 |
| R-003 | Procedencia distinta por código, tipografía, imágenes y narrativa | Alto para distribución | Por recurso | Matriz de recursos; cerrar solo los efectivamente usados antes de P11 |
| R-004 | Sin suite automatizada/CI localizada y sin ejecuciones autorizadas | Alto | Ausencia de evidencia confirmada | Plan de validación por tarea; no declarar estabilidad hasta medir |
| R-005 | Mayor mochila expone más objetos a pérdida | Medio | Regla de diseño conocida | Explicar riesgo y probar economía/capacidades P06/P07 |
| R-006 | Perder todo podría bloquear una nueva partida | Alto | Caso de diseño posible | D-015 kit básico y prueba de reinicio sin equipo |
| R-007 | Pasillos, pathing y objetivos generan bloqueos o evasión injusta | Alto | Por estimar | Semillas reproducibles, conectividad y salidas; P03/P10 |
| R-008 | Merge por unión/máximos restaura copias que se habían perdido | Alto | Incompatibilidad estática identificada | Contratos de propiedad/versionado y autoridad; P05/P06 |
| R-009 | Morir resultaría más rentable que extraer si solo se castiga extraer | Alto para diseño | Depende de fórmula | D-029 y tablas/pruebas de ranking/economía |
| R-010 | Acumulación de mejoras permanentes, mods y temporales anula dificultad | Alto | Por estimar | Topes, reglas de composición, casos extremos P04/P07/P10 |
| R-011 | Service worker/cachés interfieren con otras versiones/orígenes | Alto | Riesgo estático | Origen/nombres propios y actualización/rollback P01/P11 |
| R-012 | Orientación altera visión y distancia de spawn | Alto para equidad | Acoplamiento localizado | D-049, cámara/spawn desacoplados donde proceda y pruebas equivalentes |
| R-013 | Ocho direcciones y arma separada elevan trabajo de arte | Medio/alto | Requisito confirmado; esfuerzo sin estimar | Pipeline pequeño con referencias provisionales; P02 antes de producir catálogo final |
| R-014 | Autoapuntado elige objetivos tapados o cambia continuamente | Alto para control | Filtro ausente en bloque leído | D-067 y prioridades/histéresis; VAL-06 |
| R-015 | Gacha + reciclaje + compensaciones producen tiradas autosostenidas | Alto | Depende de equivalencias pendientes | Análisis de todas las rutas de conversión y pruebas P07-T05 |
| R-016 | Kit gratuito reciclable/reclamable ilimitadamente genera tickets | Alto | D-130 mitiga por diseño: aporte cero; implementación sin validar | Q-008: preservar origen por copia al mover/recuperar, controlar entrega y validar reciclaje repetido |
| R-017 | Topes antitrampa originales invalidan mejoras legítimas o aceptan fraude | Alto | Estático; alcance por comprobar | Derivar límites del catálogo nuevo y definir confianza de servidor; P05/P08 |
| R-018 | Almacén+buzón llenos dejan resultado pendiente imposible de resolver | Alto | Caso límite previsto | Acceso a reciclaje/gestión y transacciones recuperables; VAL-10/12/13 |
| R-019 | Objetivo 60 FPS no alcanzable con contenido/FX actuales propuestos | Alto | Sin datos | Presupuestos de escena, dispositivos reales y calidad; P02 línea base, P10 aceptación |
| R-020 | Confundir demo, documentos o código original con finalización del juego | Alto para seguimiento | Mitigado documentalmente | D-128 y pesos basados en tareas verificadas; publicación solo cierra con VAL-19 |
| R-021 | Láminas de referencia no son sprites listos ni originales archivados | Medio/alto | Confirmado visualmente | Recuperar fuentes cuando se autorice producción, normalizar transparencias/anclajes/ciclos |
| R-022 | Mezclar cambios futuros del original con el avance SCP | Alto para evidencia | Por controlar | Commit fijado, historial de actualizaciones y repositorios distinguidos |
| R-023 | 20 USD se exceden pese a alertas o cierre de altas | Alto | Sin carga prevista | Escenarios de coste, límites reales por servicio y plan de degradación aprobado |
| R-024 | Todas las categorías completas dejan XP/duplicados sin resolución consistente | Medio | Duplicados resueltos, XP pendiente | Q-004, compensación D-110 y pruebas de extremos |

## 13. Recursos, referencias visuales y procedencia

Registro operativo de las condiciones ya tratadas; no introduce una nueva decisión sobre el uso de SCP. Solo se reutilizarán componentes efectivamente identificados para la versión distribuida.

### ART-001 — Material gráfico del director

- Cuatro láminas adjuntas de aspecto pixel art, con **24 soldados y 24 criaturas**, numeradas en grupos 1–12 y 13–24.
- El director declara haberlas generado con creación de imágenes de OpenAI, usando únicamente instrucciones propias y sin imágenes de referencia externas.
- Uso autorizado como referencia y de algunos diseños para pruebas; no se aprobaron como arte final ni se añadieron todos al catálogo inicial.
- Referencias de H-001: soldado **13** (armadura oscura y visor rojo) y criatura **3** (humanoide alargado con rostro claro y elementos oscuros).
- Las vistas frontal/lateral/espalda/agachada de las láminas no constituyen ocho direcciones ni ciclos de animación completos.
- Antes de uso jugable: archivos fuente, transparencia, eliminación de fondo/números, escala, anclajes y animaciones. No se han realizado esas operaciones.
- La imagen de Vampire Survivors es referencia de categorías/legibilidad; no se han extraído ni autorizado sus gráficos para el juego.
- **Límite del archivo:** RoadmapSCP conserva esta descripción y decisiones, pero no incluye los binarios de las imágenes adjuntas. Para continuidad de producción se necesitarán los originales accesibles y un registro de su ubicación.

### Matriz resumida de componentes

| Componente / ubicación | Fuente y autoría | Condición/evidencia consultada | Uso/cambio previsto y pendientes |
|---|---|---|---|
| Código JS/CSS/HTML/tools y música declarada en LICENSE | JPTER78 / repositorio fijado | LICENSE declara MIT y copyright 2026 JPTER78 | Reutilizar/adaptar y conservar aviso; revisar otros subcomponentes cuando entren en distribución |
| Sprites Pokémon `assets/pokemon/` | SpriteCollab; autores en CREDITS | LICENSE/CREDITS del original declaran CC BY-NC 4.0; atribuciones por recurso | Sustituir por gráficos propios; no se han importado los binarios ausentes ni aprobado su uso en la publicación SCP |
| Tipografía `assets/fonts/PixelifySans.ttf` | Pixelify Sans | OFL 1.1 en `assets/fonts/OFL.txt` | Reutilización posible conservando condiciones; elección tipográfica final pendiente |
| Datos `js/data/pokedex.js` | PokeAPI y contenido Pokémon según documentación original | Fuente declarada en LICENSE | Sustituir catálogo temático; revisar helpers útiles independientemente de esos datos |
| Dependencias Firebase/Terser y paquetes de servidor | Proveedores respectivos | Versiones localizadas; revisión individual de licencias distribuibles pendiente | Registrar componentes realmente incluidos, no atribuirles automáticamente la licencia del juego |
| Historia/personajes de SCP-049/049-2 | Gabriel Jade; revisión conjunta con djkaktus según fuente | Artículo SCP-049, CC BY-SA 3.0 aplicable, revisión consultada 122 del 12/08/2026 | Adaptación libre, atribución y cambios a registrar; imágenes del artículo no adoptadas |
| Inspiración del atacante SCP-811 | Pig_catapult | Artículo, revisión 83 del 20/10/2022; condiciones de texto de la wiki consultadas | Adaptación de ataque biológico; diseños propios; registro de cambios/atribución |
| Otras entidades investigadas | SCP-058 y SCP-939, entre otras propuestas históricas | Fuentes listadas abajo; no forman automáticamente el catálogo aprobado | Solo referencias alternativas; cualquier incorporación requiere decisión |
| Inspiración Backrooms | Ambientación propia, consulta Level 0 como referencia | Página consultada y registrada; no se aprobó copiar un nivel canónico ni sus imágenes | Diseño modular original; documentar recursos que finalmente se utilicen |
| Ilustraciones ART-001 | Generación OpenAI declarada por el director | Procedencia declarada en conversación; no auditoría independiente de autoría | Referencia/provisional autorizadas; selección final pendiente |
| Capturas/novedades públicas | Versión real del juego o tarjeta de resultados comprobados | Cada imagen vinculada a tarea/versión y procedencia | Una imagen por novedad; sin hacer pasar conceptos por capturas implementadas |

## 14. Ampliaciones posteriores a la primera publicación

**Fuera del 100 % de la versión inicial por D-128.** Son decisiones de dirección futura, no tareas autorizadas ni paquetes de trabajo ya detallados. Sus pesos deberán aprobarse en una versión de ampliación separada; incorporarlos ahora alteraría el cierre acordado.

| ID | Ampliación | Dependencias y cuestiones por resolver | Estado |
|---|---|---|---|
| FUT-001 | Cooperativo | Auditoría host/sincronización; autoridad de botín, checkpoints, muerte/recuperación, abandono de host, coste de red y ranking | Posterior; diseño detallado pendiente |
| FUT-002 | Hardcore con muerte permanente y ranking propio | Identidad del soldado, reclutamiento, separación de almacén/progreso y reglas definitivas de eliminación | Posterior; concepto aprobado |
| FUT-003 | Canje de códigos | Origen/recompensas, límites de uso, caducidad si se elige, reclamación única y administración | Posterior; destino buzón aprobado |
| FUT-004 | Regalos del director a jugadores | Herramienta/permisos de administración, destinatarios, trazabilidad, tratamiento de capacidad y reclamación | Posterior; destino buzón aprobado |
| FUT-005 | Ampliación de soldados/criaturas/armas/mods/escenarios | Balance, producción artística, rendimiento y catálogo; las 48 referencias no constituyen compromiso de cantidad | Visión futura; alcance pendiente |
| FUT-006 | PC y compatibilidades adicionales | UX/controles/plataformas y pruebas; no eliminación de teclado original por defecto | Pendiente de alcance |
| FUT-007 | Otros sistemas complementarios | Nuevas misiones/eventos, social, ampliación de almacén, otras formas de contención y estilos de jefe | Solo explorar; ninguna función nueva queda aprobada por esta fila |

## 15. Web de seguimiento y coordinación entre hilos

La web es un proyecto independiente, desarrollado en otro hilo. El juego no depende de ella para arrancar, guardar o funcionar. Ninguna automatización puede modificar diseño, alcance, fases, prioridades o permisos. No usar `nilbuild/developer-roadmap` ni sus materiales.

### 15.1 Fuente compartida y estado actual

**Estado actual:** este Markdown local es el registro maestro. La fuente compartida prevista es `DETECO/SCPSurvivor/RoadmapSCP.md`, en la raíz de `main`, pero el archivo aún no está en GitHub: la integración rechaza la escritura con HTTP 403. El repositorio es público al comprobarlo el 12/10/2026. Cuando se complete y verifique la subida, ambos hilos deberán leer la revisión vigente de GitHub; no asumir memoria compartida automática. Subir el documento no crea la web ni activa su sincronización o automatización.

**Propuesta por aprobar:** una sola fuente editable de plan/tareas/decisiones en GitHub y documentos de novedades vinculados. Se debe decidir si RoadmapSCP será el origen editable con datos derivados, o si un registro estructurado generará esta vista. No mantener dos versiones editables que puedan divergir. Nombres y formato definitivo siguen en Q-035.

Repositorios que no deben confundirse:

1. Original: `JPTER78/pokesurvivor`, referencia upstream; sus commits no suman avance SCP.
2. Juego activo: `DETECO/SCPSurvivor`, destino aprobado para RoadmapSCP y todos los futuros cambios autorizados del juego. Contenido inicial inspeccionado; incorporación documental pendiente de permiso efectivo de escritura. No se ha implementado el juego.
3. Web/seguimiento: destino pendiente, lector del registro autorizado; no autoridad de diseño.

### 15.2 Contrato de datos propuesto

| Tipo de registro | Campos mínimos |
|---|---|
| Plan | ID/proyecto, versión, fecha, estado de aprobación, definición de alcance, autorizaciones, repositorio/commit de referencia |
| Etapa | ID estable, objetivo, peso derivado de tareas, dependencias, criterios de cierre |
| Tarea | ID, etapa, descripción, alcance, estado, peso, criterios de aceptación, dependencias, bloqueos y evidencias |
| Evidencia | Tipo documental/estático/ejecución, versión/commit, fecha, entorno, procedimiento, resultado y enlace accesible |
| Decisión | ID, estado, alternativa, alcance de aprobación, justificación, consecuencias y decisión sustituida si procede |
| Cambio de alcance | Versión anterior/nueva, motivo, autorización, efecto en tareas/pesos y porcentaje recalculado |
| Novedad | ID único, fecha, título, resumen, fase/tareas, evidencias, referencia de versión, una imagen y texto alternativo |
| Sincronización | Versión origen, resultado de validación, resultado de publicación, última sincronización correcta, error si lo hay |

Los porcentajes se calculan a partir de estados/evidencias y pesos, no se editan manualmente en una segunda lista. Solo CV aporta al cálculo. El sitio deberá distinguir planificación de implementación y mostrar “pendiente de definición” para un global oficial sin plan integral aprobado. El índice provisional documental, si se presenta, debe llevar esa etiqueta explícita.

### 15.3 Novedades e imágenes

- Publicar una novedad por avance significativo o conjunto coherente, no por cada commit.
- Avance visual: captura real de la versión correspondiente. Avance técnico: tarjeta basada en resultados comprobados.
- Exactamente una imagen por novedad y texto alternativo. Sin imagen o evidencia, la novedad queda pendiente aunque una tarea pueda cerrarse.
- Conceptos generados se identifican como conceptos, nunca como prueba de implementación. No reutilizar capturas antiguas para aparentar avance nuevo.
- Capturas automáticas requieren escena reproducible y ejecución autorizada; hoy no existe ninguna escena ejecutada.

### 15.4 Automatización prevista, todavía no activada

Flujo: registrar avance verificado → validar esquema/referencias/pesos → recalcular → preparar novedad si corresponde → comprobar imagen → publicar → registrar resultado real.

Antes de activarlo, aprobar evento de inicio, fuente, repositorios, permisos, destino, manejo de imágenes, condiciones de publicación, idempotencia y tratamiento de errores. GitHub Actions es la alternativa prevista, no una integración existente. Una vez autorizadas sus reglas, las actualizaciones ordinarias comprendidas en ellas no requerirán permiso individual.

Ante fallo, conservar la última información válida y mostrar cuándo se sincronizó correctamente. No actualizar el sello de éxito si falla el despliegue. No atribuir ejecución en segundo plano al hilo de conversación.

### 15.5 Tareas de la web — presupuesto de pesos independiente

Estos pesos suman 100 % **del proyecto web**, no del juego, y siguen siendo propuesta para ese hilo. Todas están pendientes y sin autorización de construcción/publicación.

| ID | Entregable | Peso web | Avance |
|---|---|---:|---:|
| WEB-T01 | Aprobar fuente única, esquema, reglas y permisos entre hilos | 20 % | 0 % |
| WEB-T02 | Preparar repositorio/alojamiento independiente autorizados | 15 % | 0 % |
| WEB-T03 | Mostrar fases/tareas, pesos, estados, bloqueos y progreso correctamente | 25 % | 0 % |
| WEB-T04 | Blog con evidencias y una imagen por novedad | 15 % | 0 % |
| WEB-T05 | Validación/sincronización automática autorizada y manejo de duplicados/errores | 15 % | 0 % |
| WEB-T06 | Publicar y verificar datos, última sincronización, recuperación y lectura móvil | 10 % | 0 % |

## 16. Fuentes y referencias de continuidad

### Repositorio fijado

- [Árbol del commit auditado](https://github.com/JPTER78/pokesurvivor/tree/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6).
- [README](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/README.md), [GDD](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/GDD.md), [LICENSE](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/LICENSE), [CREDITS](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/CREDITS.md).
- [Fuente HTML](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/dev.html), [build](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/tools/build.js), [game.js](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/js/game.js), [db.js](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/js/core/db.js), [gacha.js](https://github.com/JPTER78/pokesurvivor/blob/a1006e6e3d0cea9162238a90b0ffdd7fd38397b6/js/systems/gacha.js).
- El resto de rutas de la auditoría se resuelve contra ese mismo commit; no contra `main` futuro.

### Fuentes temáticas/visuales consultadas

| Fuente | Versión/fecha de referencia | Uso |
|---|---|---|
| https://scp-wiki.wikidot.com/scp-049 | Revisión 122, 12/08/2026, consultada durante esta planificación | Base de perseguidor reanimado y jefe; distinguir comportamiento del artículo de la mecánica inventada |
| https://scp-wiki.wikidot.com/scp-811 | Revisión 83, 20/10/2022 | Base del atacante a distancia; proyección de sustancia biológica, no asumir que la ficha describe nuestro proyectil simplificado |
| https://scp-wiki.wikidot.com/scp-058 | Revisión 61, 19/09/2026 | Alternativa investigada y no elegida para catálogo inicial |
| https://scp-wiki.wikidot.com/scp-939 | Revisión 39, 27/09/2026, según consulta previa registrada | Investigación anterior; no incorporación aprobada |
| https://scp-wiki.wikidot.com/security-clearance-levels | Revisión 8, 15/07/2022, según consulta previa | Referencia de funciones del personal; no fija una unidad MTF para el juego |
| https://scp-wiki.wikidot.com/task-forces | Revisión 1457, 06/10/2026, según consulta previa | Investigación de roles; sin unidad concreta seleccionada |
| https://backrooms-wiki.wikidot.com/level-0 | Revisión 50, 06/10/2026, según consulta previa | Inspiración de espacios; no aprobación de copiar ese nivel |
| ART-001 y captura Vampire Survivors | Adjuntos y declaraciones del director en esta conversación | Referencias de diseño; no pruebas ejecutadas ni recursos finales |

### Tecnología/dispositivos/costes

- Firebase: https://firebase.google.com/docs/firestore/quotas y https://firebase.google.com/docs/functions/get-started — consultas previas del 12/10/2026; revalidar condiciones antes de contratar/desplegar.
- Presupuestos: https://docs.cloud.google.com/billing/docs/how-to/budgets — distinguir avisos de límites efectivos de servicio.
- iPhone 15: https://support.apple.com/en-us/111831 ; iPhone 13: https://support.apple.com/en-la/111872 . Especificaciones no equivalen a rendimiento medido del juego.
- Infinix Note 40 5G: https://www.infinixmobility.com/note-40-5g . Se confirmó la variante **5G**, no la Note 40 4G.
- Procedencia tratada previamente: guía SCP https://scp-wiki.wikidot.com/licensing-guide y condiciones OpenAI https://openai.com/policies/terms-of-use/ . Conservar el registro; no reabrir decisiones ya resueltas sin evidencia relevante nueva.

## 17. Historial, verificación documental y resumen de traspaso

| Cambio | Fecha | Contenido | Autorización |
|---|---|---|---|
| CHG-001 | 2026-10-12 | Crear RoadmapSCP v0.1, consolidar decisiones, pendientes y ruta hasta publicación, asignar pesos a tareas/etapas | Solicitud expresa del director, A-002/D-127 |
| CHG-002 | 2026-10-12 | Confirmar que el global termina con primera versión completa publicada y ampliaciones van después | Respuesta expresa del director, D-128 |
| CHG-003 | 2026-10-12 | RoadmapSCP v0.2: registrar DETECO/SCPSurvivor como destino del roadmap y desarrollo futuro; autorizar subida documental y dejar constancia del bloqueo de acceso HTTP 404. Se mantienen pesos y porcentajes. | Solicitud expresa del director, A-008/D-129 |
| CHG-004 | 2026-10-12 | RoadmapSCP v0.3: comprobar repositorio público y lectura, inspeccionar contenido inicial y registrar el rechazo HTTP 403 a la subida por ambas conexiones. No hay commit ni fuente compartida subida. Pesos, alcance y avance de implementación permanecen iguales. | A-008/D-129; ajustes de acceso realizados por el director |
| CHG-005 | 2026-10-12 | RoadmapSCP v0.4: aprobar D-126 opción A, registrar probabilidades uniformes y resolver Q-001. Se conservan pesos y porcentajes; quedan 37 temas pendientes de los 38 identificadores originales. El director pospone la conexión del repositorio y retoma las decisiones del juego. | Respuesta expresa A del director; A-002/D-127 para mantener el registro |
| CHG-006 | 2026-10-12 | RoadmapSCP v0.5: aprobar D-130 opción A, reposición de emergencia y aporte cero al reciclaje del equipo gratuito. Q-008 parcialmente resuelta; 130 decisiones aprobadas, 37 temas aún pendientes, pesos y porcentajes sin cambios. | Respuesta expresa A del director; A-002/D-127 para mantener el registro |
| CHG-007 | 2026-10-12 | RoadmapSCP v0.6: aprobar D-131 opción A, reciclaje complementario; proponer tabla D-132 sin considerarla aprobada. Q-002 parcialmente resuelta; 131 decisiones aprobadas, 37 temas aún pendientes, pesos y porcentajes sin cambios. | Respuesta expresa A del director; A-002/D-127 para mantener el registro |
| CHG-008 | 2026-10-12 | RoadmapSCP v0.7: aprobar D-132, tabla/conversión/remanente; conservar validaciones pendientes de Q-002. Localizar misiones originales y presentar D-133 pendiente. 132 decisiones aprobadas, 37 temas abiertos, pesos y porcentajes sin cambios. | Respuesta expresa Sí del director; A-002/D-127 para mantener el registro |

**Verificación documental realizada el 12/10/2026:** comprobación de lectura del Markdown mediante Python, sin ejecutar programas del repositorio. Resultado: 132 decisiones aprobadas y D-133 pendiente; 12 etapas y 53 tareas de juego con identificadores únicos; pesos globales suman 100 y coinciden con cada etapa; porcentajes relativos correctos dentro del redondeo; avance provisional 3 %, planificación 30 % e implementación 0 %; 37 temas abiertos y Q-001 resuelta, con Q-002, Q-008, Q-030 y Q-035 parcialmente resueltos; seis tareas web con 100 puntos independientes. `git status --short` de la copia base no mostró cambios y HEAD sigue en el commit registrado. Esta comprobación es del registro; no acredita ejecución del juego ni revisión independiente de otro agente. Resolver una decisión aislada o subir el documento a GitHub no completa por sí solo una tarea ni suma avance de implementación.

### Resumen para continuar en otro hilo

- **Base:** JPTER78/pokesurvivor, `main`, commit `a1006e6e3d0cea9162238a90b0ffdd7fd38397b6`; lecturas 11–12/10/2026.
- **Repositorio del proyecto:** DETECO/SCPSurvivor, público y rama predeterminada `main`, comprobados por API; destino aprobado por D-129. No confundirlo con el original ni con el futuro repositorio de la web.
- **Estado:** planificación avanzada; código SCP no implementado, juego no ejecutado, servicios propios y publicación no realizados. Copia base intacta.
- **Meta:** primera versión completa del catálogo/sistemas aprobados, validada y publicada; la demo y H-001 son hitos intermedios.
- **Decisiones:** consultar sección 5; D-126 aprobada, probabilidades uniformes; D-130 aprobada, kit de emergencia con aporte cero de copias gratuitas; D-131 aprobada, reciclaje complementario; D-132 aprobada, tabla y remanente. D-133, estructura de misiones remuneradas, sigue pendiente. No reinterpretar las letras antiguas sin su pregunta; usar el registro consolidado y pedir aclaración solo ante contradicción relevante.
- **Autorizaciones:** lectura/investigación, este archivo y su subida/commit documental a DETECO/SCPSurvivor (A-008). No implementar, ejecutar juego/build/pruebas, escribir servicios del juego, publicar el juego/web ni automatizar sin autorización específica. No repetir la solicitud de permiso de subida.
- **Pendientes:** Q-002–Q-038; Q-001 se conserva como resuelta. Prioridad a bloqueantes de P00. Proponer bloques coherentes de valores para aprobación, sustentados en auditoría.
- **Riesgos:** no reutilizar merge de colecciones para equipo perdible; aislar servicios; prevenir dobles operaciones y reciclaje infinito; comprobar móvil y costes con evidencia.
- **Seguimiento:** 12 etapas del juego y tareas ponderadas; línea base oficial pendiente de aprobación. Índice documental provisional 3 %, implementación 0 %. Web tiene pesos separados y no está sincronizada.
- **Fuente persistente actual:** este archivo local. Destino compartido aprobado: `DETECO/SCPSurvivor/RoadmapSCP.md`, todavía sin subir por rechazo HTTP 403 de escritura de la integración. Al resolverlo, subir y verificar sin repetir la aprobación A-008. Los hilos no comparten memoria automáticamente. La web sigue sin sincronizar ni publicar.
- **Próximo paso de planificación:** resolver D-133/Q-003, estructura de misiones remuneradas; después concretar sus recompensas y compensaciones, completar análisis económico y detalles del kit Q-008, capacidades, combate y persistencia. El director ha pospuesto la conexión GitHub; conservar cambios locales pendientes de sincronizar.




