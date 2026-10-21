# Wiki de diseño — mapas, armas y cofres

**Decisiones vigentes del 20/10/2026:** Iván aceptó las recomendaciones A del cuestionario con excepciones y notas. Se fija cinco niveles más un extra propio por rama, poder y mejora general; ultimates conservan cinco permanentes. Dos compañeros a 5:00, retirada de uno al ver al jefe vivo, ayuda limitada del otro y sin XP por bajas aliadas. Mapas procedurales y tickets universales gris ×1 / dorado ×5. La tienda permanente, escape de grieta, fusión y puntaje tienen los estados detallados en la [matriz de decisiones](DECISIONES_INFINITO_2026-10-20.md), que prevalece sobre las propuestas anteriores.

**Aclaraciones incorporadas:** sala de fusión dentro de alguno de los escenarios para combinar dos armas al máximo; una sola apertura de escape de grieta de cinco segundos entre 1:00 y 3:00 del encuentro; diez categorías permanentes individuales por soldado, compradas en la base con monedas recogidas en el escenario. Recetas/límite de fusión, ingresos/precios y efectos concretos siguen en la [lista de cierres pendientes](DECISIONES_INFINITO_2026-10-20.md).

Fecha base: 18/10/2026. Decisiones actualizadas: 20/10/2026.

Documento de trabajo del hilo de diseño de Iván. Distingue decisiones expresas del usuario, reglas anteriores del roadmap y propuestas para el rediseño. No acredita implementación, pruebas de balance ni cambios de estado en P05/P06/P07. No modifica RoadmapSCP.json ni su vista generada.

**Aprobación del 18/10/2026:** Iván indicó «Me guata tus recomendaciones. Establecelos continuemos con otro apartado». Quedan establecidos los tres tipos de cofre, los cuatro sorteos, la tabla inicial de exploración, las seis ubicaciones alternativas y la escala inicial de ensayo 160×100 con sus objetivos de recorrido. La aprobación establece reglas de diseño; no acredita su implementación ni convierte el tamaño de ensayo en tamaño final de todos los mapas. El alcance coincide con docs/ESTRUCTURA_REGLAS_APROBADAS.md y PAUTA_DESARROLLO.md.

## Decisiones expresas del hilo

- La expedición avanza por varios mapas, con monstruos básicos propios de cada nivel y dificultad creciente durante el combate. El 20/10/2026 Iván eligió expresamente el modo infinito: no se fija un último mapa ni una victoria global que cierre el recorrido. Muerte, abandono y suspensión se concretarán con sus reglas propias.
- Cada mapa tiene un jefe final. Derrotarlo es requisito para avanzar.
- Al minuto 5 aparece una brecha con puerta blindada y salen soldados de la Fundación, que llaman al jugador y proporcionan cobertura contra los enemigos que quedan en la zona.
- Desde el minuto 5 dejan de aparecer enemigos nuevos. Los vivos permanecen. La puerta aparece aunque el jefe siga vivo; avanzar exige derrotarlo.
- Si el jefe muere antes del minuto 5, el jugador espera la llegada del equipo mientras continúa la fase de supervivencia.
- Las grietas especiales ofrecen encuentros opcionales difíciles y recompensas mayores.
- Los jefes de grieta son la fuente de nuevos poderes anómalos. Por 24A, la primera victoria de grieta de cada expedición garantiza uno; después hay azar con garantía tras tres victorias sin poder. La tabla y probabilidad numérica entre garantías requieren balance. Los jefes de nivel/cofres de armamento dan segunda arma o mejora; las ultimates se obtienen en su gacha.
- Saltos dimensionales aprobados por 49A: tras vencer al jefe actual y llegar a 5:00, adelantar entre uno y tres mapas con destino y peligro anunciados. Los omitidos no dan victorias, premios, XP ni hitos.
- Hay exactamente tres gachas: personajes, ultimates y armas. La nota posterior de 57 fija dos denominaciones universales: gris equivale a una tirada y dorado a cinco. Duplicados y garantías siguen las respuestas A aceptadas; costes, tasas y cantidades finales requieren tabla propia.
- Cada arma conserva identidad y pocas estadísticas básicas. Por 16A se organiza en familia principal balística, energía, melee, explosivos o arrojadizas, con etiquetas adicionales para láser, misil, alcance o área. Granadas/molotov son armas y los orbitales anómalos ocupan poder, según 17A.
- Revisión solicitada por Iván el 20/10/2026: comenzar con una sola arma elegida antes de salir; obtener la segunda durante la partida mediante un cofre especial o un jefe. Se conserva el máximo de dos y ambas funcionan simultáneamente cuando están equipadas. Esta revisión sustituye el inicio con dos armas del 19/10.
- Si el premio de segunda arma se obtiene cuando ya lleva dos, mejora una equipada; no añade una tercera. Por 11A el primer jefe garantiza la segunda si falta, y por 12A se elige entre tres modelos desbloqueados, completando opciones básicas cuando sea necesario. 13A permite dos modelos iguales con mejoras independientes; 14B permite reemplazo en terminales opcionales a progreso temporal base.
- Hasta tres poderes, con reemplazo o rechazo pausado al cuarto y retirada de los efectos salientes. Cada poder y mejora general llega a cinco niveles más un extra propio. La ultimate mantiene máximo permanente 5 y cooldown largo propio. Por 62A las skins son cosméticas, obtenibles mediante dominio/contratos/eventos, sin gacha adicional.
- Iván precisó que las ultimates son habilidades únicas, ofensivas o de utilidad: escudo, curación instantánea, modo fantasma, explosión, lluvia de meteoritos u otras. Cada una requiere efectos, niveles y límites propios; queda retirada la propuesta de una escala común de potencia para todas.
- El 19/10/2026 Iván aprobó expresamente incluir esas ultimates en la fase de pruebas. Se establece una pauta de ensayo para sus efectos únicos, cinco niveles, cooldown propio y límites; los valores numéricos se ajustarán durante el prototipo. Pauta: [PRUEBA_ULTIMATES_V2.md](PRUEBA_ULTIMATES_V2.md). Estado: alcance aprobado; implementación y ejecución pendientes.
- Al subir nivel se elige una de tres ofertas: una de arma, una general y una libre entre candidatas válidas; los poderes adquiridos entran en la libre. Las ofertas reconocen exclusivamente armas/poderes equipados, compatibilidad y topes. Categorías sin candidatas se sustituyen por opciones válidas.
- Las mochilas quedan fuera del nuevo diseño. Este documento no elimina el prototipo anterior ni presume que la colección de armas también se elimina.
- Las diez categorías permanentes se compran desde la base con monedas recogidas en los escenarios y se guardan por soldado. Una compra para uno no mejora a los demás. La XP temporal, los tickets de gacha y las monedas son conceptos distintos; el destino de XP permanente y duplicados debe encajar en una sola progresión para evitar aumentos duplicados.
- La fusión se realiza en una sala de alguno de los escenarios, con dos armas completamente mejoradas, para obtener un compuesto que ocupa una ranura. No ocurre en la tienda de mejoras permanentes. Aparición de sala, recetas, herencia y límite de fusiones siguen pendientes de fijar.
- El escape anticipado de grieta abre una sola vez durante cinco segundos activos, entre 1:00 y 3:00 del encuentro. Si no se usa, hay que vencer o morir; la victoria conserva el retorno ya aprobado. La ubicación, momento exacto y aviso previo requieren ficha.
- El 19/10/2026 Iván aprobó implementar un radar táctico compacto según las recomendaciones del hilo: jugador centrado, orientación fija, puntos importantes y marcas de dirección en el borde; cofres y anomalías respetan sus reglas de descubrimiento. Ver el apartado de radar para el alcance establecido.

## Qué existe en las referencias y en la partida actual

### Base Pokesurvivor

La referencia local es JPTER78/pokesurvivor, conservada en docs/upstream-reference/. Su GDD describe un mundo abierto infinito con cofres rompibles y cofres con candado; estos últimos se abren permaneciendo cerca durante 3,5 segundos.

El código heredado genera ambos tipos como objetos del terreno mediante hashes por casilla. Los cofres normales dan monedas, un apoyo de curación o imán, experiencia y una posibilidad de objeto temporal. Los de candado entregan monedas, tickets, experiencia y posibles premios adicionales. Los jefes tienen su propio bloque de recompensas.

Fuentes locales: docs/upstream-reference/GDD.md.txt, sección 4; js/world/world.js, placeProps y destroyProp; js/systems/interact.js.

### Vampire Survivors

Los cofres habituales proceden de jefes o enemigos fuertes y mejoran objetos de la partida. Algunos cofres permiten evoluciones cuando se cumplen sus requisitos. Los objetos colocados en el escenario y los destructibles son sistemas diferentes.

Las condiciones habituales de evolución y los horarios de cofres especiales dependen del escenario. No se trasladan automáticamente los umbrales de 10 minutos o los horarios de Arcanas a un mapa de 5 minutos.

Referencias comunitarias: [Treasure Chest](https://vampire-survivors.fandom.com/wiki/Treasure_Chest), [Stages](https://vampire-survivors.fandom.com/wiki/Stages), [Arcanas](https://vampire-survivors.fandom.com/wiki/Arcanas).

### SCP Survivor ejecutable

G.Expedition instala un fixture de SectorMaps. En ese modo, World coloca únicamente las cajas fieldCrate del fixture; estas se rompen con efectos visuales, sin botín. No son cofres de reclutamiento.

Los enemigos activos SCP entregan experiencia y las mejoras de nivel pasan por FieldUpgrades. La existencia del código heredado de cofres no demuestra que sus premios estén activos en esta ruta.

Fuentes locales: js/systems/expedition.js, js/world/sector-maps.js, js/world/world.js, js/entities/enemy.js y js/systems/field-upgrades.js.

## Cofres ya definidos en el roadmap anterior

RoadmapSCP.json, decisiones D-140 a D-148, D-250 y D-279:

| Sector | Probabilidad por intento al completar oleada | Máximo de cofres aleatorios por mapa | Tickets por cofre |
| --- | --- | --- | --- |
| 1–3 | 10 % | 1 | 1–2 |
| 4–7 | 15 % | 2 | 1–2 |
| 8 en adelante | 20 % | 3 | 1–3 |

- Se hace un intento por oleada completada, con como máximo un cofre por intento exitoso.
- A los 10 minutos acumulados de combate activo de la expedición se añaden, una sola vez, 5 puntos porcentuales a la probabilidad y 1 al máximo de tickets. Ese contador continúa entre mapas y excluye preparación, pausas y menús.
- El contenido queda fijado al aparecer el cofre; abrirlo no libera cupo.
- Apertura por proximidad de 3,5 segundos, radio de 50 unidades y sin pared intermedia. Alejarse reduce el progreso a 1,5 segundos por segundo; el daño por sí solo no lo cancela y el disparo continúa.
- Los tickets se acreditan directamente a cuenta tras confirmación. No requieren mochila.
- Antes de verlo solo se avisa de un cofre sin descubrir; la flecha aparece después de descubrirlo.
- Los puntos deben ser alcanzables y no bloquear rutas. R-027 exige sustituir el sorteo heredado por ruido incompatible con estas cuotas.

Estas son reglas históricas de referencia. La adaptación conserva la tabla inicial y sustituye el disparador por cuatro momentos del reloj. 54A cuenta solo el tiempo normal de mapa hasta 5:00 para el bono de diez minutos, aplicado desde el siguiente sorteo; 55A adapta los tres hitos a primer jefe/primera llegada a mapas 2 y 3. Existen prototipos B1/B2/B3 con premios ficticios y mejoras temporales; no implementan todavía toda la economía o las nuevas decisiones. Consultar sus informes para evidencia actual.

## Cofres: reglas aprobadas para mapas de cinco minutos

1. Cofre de exploración: se conserva inicialmente la tabla de tickets y sus topes. El cierre de oleada se sustituye por cuatro oportunidades de sorteo en los minutos activos 1, 2, 3 y 4 de cada mapa. Cada oportunidad ocurre una sola vez; pausar o abrir menús no provoca intentos adicionales.
2. Cofre de jefe: premio garantizado separado de exploración. Primer jefe entrega segunda arma si falta; con dos, mejora temporal compatible. Sin candidata, 56A usa una bonificación táctica del sistema de saturación. 9A resuelve el premio principal pendiente antes de completar el cruce. No se conceden simultáneamente arma y mejora adicional por inferencia.
3. Recompensa de grieta: solo tras superar el encuentro, en recinto separado con origen congelado según 45A. La primera victoria de grieta garantiza un poder y las siguientes siguen azar con garantía tras tres victorias sin poder; tabla exacta pendiente. Su espacio de premio y retorno no se confunden con la ventana de escape de cinco segundos solicitada después.
4. Las recompensas se aplican o acreditan directamente según su tipo. Las temporales duran la expedición; los recursos de cuenta se confirman por el sistema correspondiente. No existe transporte mediante mochila en este rediseño.

El máximo de 1/2/3 cofres es un límite, no una cantidad garantizada. La recompensa de jefe y la de grieta son eventos distintos de los sorteos ordinarios.

## Escala inicial de ensayo aprobada

La cantidad de cofres determina puntos de interés; el tamaño necesita además un presupuesto de desplazamiento, espacio para hordas y rutas de retirada.

Para el primer bloque de prueba aprobado:

- Reservar seis ubicaciones alternativas para cofres de exploración, aunque solo se activen hasta 1/2/3 según el nivel. Variar cuáles se usan en cada expedición.
- Colocarlas en zonas laterales conectadas con circuitos amplios, con espacio de maniobra alrededor y sin ocupar accesos, puntos de salida ni el paso principal.
- Reservar una zona amplia para el jefe y anclajes accesibles de llegada de la puerta y los soldados. El premio del jefe ocupa esa zona y no exige añadir otra sala entera.
- Probar un desvío de aproximadamente 10–15 segundos de desplazamiento para alcanzar un punto opcional desde un circuito principal. Es una meta de prueba, no una medición actual.
- Apuntar a un recorrido entre extremos útiles de aproximadamente 30–45 segundos caminando sin combate. La disposición de paredes y obstáculos debe medirse sobre rutas transitables, no por distancia recta.
- Como referencia inicial de escala, probar 160×100 casillas del mundo actual. A 32 unidades por casilla y velocidad base 165, cruzar 160 casillas en línea recta requiere aproximadamente 31 segundos. El trayecto real con obstáculos y enemigos será mayor.
- Validar esta geometría antes de producir arte final: hordas, frecuencia de niveles, descubrimiento de cofres, combate del jefe, llegada de soldados y recorrido a la puerta. La escala no acredita rendimiento ni balance.

Quedan establecidos el disparador de cofres por reloj, sus tipos y la escala de ensayo. La tabla exacta de grietas, los detalles pendientes de premios y el tamaño final necesitan su propia definición o validación. Las instrucciones históricas incompatibles no recuperan vigencia por conservarse como referencia.

## Radar táctico compacto — aprobado

Estado: diseño aprobado el 19/10/2026; implementación y validación pendientes.

La aprobación expresa fue «decidido esto se implementara, segun tus recomendaciones». Se establece un radar circular pequeño, centrado en el jugador, con orientación fija y situado en una esquina. Su tamaño se adapta a móvil sin tapar controles o avisos importantes. La primera versión representa puntos de interés, sin dibujar paredes o el plano detallado del escenario.

| Indicador | Condición para mostrarlo |
| --- | --- |
| Grieta | Mientras esté abierta; mostrar el tiempo restante |
| Jefe | Desde que comienza su encuentro |
| Puerta de la Fundación | Desde 5:00; distinguir si sigue bloqueada por el jefe o permite avanzar |
| Anomalía especial | Después de su detección o revelación |
| Cofre | Únicamente después de descubrirlo |

Los puntos elegibles que estén fuera del alcance del radar se representan con marcas en el borde que indican su dirección. Esa regla no revela cofres o anomalías que todavía deban permanecer ocultos. Los monstruos comunes no se representan individualmente.

Cada tipo usa un símbolo reconocible además de color. Se conservan los avisos visuales y sonoros de grietas. El radar complementa esas señales y no las reemplaza.

Para aceptar la implementación habrá que comprobar descubrimiento de cofres, aparición/cierre de grietas y su reloj, jefe y puerta antes/después de 5:00, bloqueo, dirección exterior y lectura en escritorio/móvil. 64A fija detección de anomalías por sensor de proximidad; los cofres siguen requiriendo descubrimiento visual. 65A prioriza peligro inmediato, grieta próxima a cerrar y puerta. Alcance en unidades y píxeles exactos se ajustarán en la prueba.

## Armas equipadas y ofertas de nivel

**Dirección actual del usuario, 20/10/2026:** un arma inicial y una segunda durante el recorrido, hasta dos. Tres ofertas aleatorias que reconocen solo equipo válido; ninguna mejora la ranura vacía. Mezcla y topes aceptados con modificaciones se recogen a continuación y en la matriz vigente.

Las dos armas actúan simultáneamente. 13A permite dos del mismo modelo con mejoras independientes; 14B permite sustitución solo en terminales opcionales, con el reemplazo en progreso temporal base. La segunda se adquiere mediante premio, no carta de nivel. La fusión solicitada por Iván y sus límites propuestos figuran en la [matriz vigente](DECISIONES_INFINITO_2026-10-20.md).

La ubicación de fusión ya está confirmada: una sala dentro de alguno de los escenarios. El compuesto libera una ranura; las condiciones adicionales propuestas no se consideran aprobadas por el solo hecho de elegir esa ubicación.

## Categorías aceptadas y topes modificados el 20/10/2026

### Composición de las tres opciones

18A aceptada: una oferta de arma, una general y una tercera libre entre las mejoras elegibles restantes, incluidos poderes adquiridos. El azar decide arma y efecto; el jugador elige una. Garantizar grupos solo mientras existan candidatas válidas.

- La oferta de arma apunta a una de las dos armas equipadas y muestra su nombre y el rango antes/después.
- Cada modelo dispone de una lista explícita de mejoras compatibles, apoyada en su familia. La pistola puede mejorar recarga; la katana no puede recibir esa mejora.
- La tercera opción puede dar una segunda alternativa de arma o una segunda general. No repetir la misma mejora para el mismo objetivo dentro de la selección.
- Una familia organiza compatibilidades; no concede por sí sola una bonificación a toda la colección ni a todas las armas de esa familia.

La alternativa considerada es sortear las tres cartas sin garantizar grupos: ofrece mayor variación, pero puede dejar varias subidas seguidas sin opciones de arma. Se recomienda la composición mixta.

### Mejoras de cada arma

| Rama | Función | Rangos vigentes |
| --- | --- | --- |
| Potencia | Daño base del arma seleccionada | 0–5 + extra propio |
| Ritmo | Frecuencia de ataque, compatible con el funcionamiento concreto del arma | 0–5 + extra propio |
| Manejo | Un efecto definido por modelo: recarga, precisión, alcance de corte o control del disparo | 0–5 + extra propio |
| Especialización | Rasgo propio del arma: por ejemplo penetración, radio de explosión, sangrado o rebote si el modelo lo admite | 0–5 + extra propio |

Los topes son por rama y por arma. El rango 0 es la base sin mejoras: se adquieren cinco niveles y un extra final propio para cada rama, según la aclaración de Iván. Cada modelo debe definir Manejo, Especialización y sus extras; no conceden a la vez todos los ejemplos. Las ultimates mantienen cinco niveles permanentes.

Si se muestra un nivel global del arma, solo resume el progreso: no añade otro multiplicador de estadísticas. Rareza, duplicados y desarrollo permanente por gacha se definirán por separado.

### Mejoras generales del soldado durante la expedición

| Categoría | Función | Rangos vigentes |
| --- | --- | --- |
| Vitalidad | Vida máxima | 0–5 + extra propio |
| Protección | Reducción de daño, sujeta a un límite conjunto todavía por balancear | 0–5 + extra propio |
| Movilidad | Velocidad de desplazamiento | 0–5 + extra propio |
| Recuperación | Regeneración de vida | 0–5 + extra propio |
| Recolección | Radio de recogida de experiencia | 0–5 + extra propio |
| Aprendizaje | Experiencia temporal obtenida | 0–5 + extra propio |

Estas son categorías de cartas temporales, no una aprobación del catálogo de atributos permanentes del soldado. Sus cantidades por rango y topes efectivos combinados con estadísticas base requieren balance. Los bonos de la expedición continúan entre mapas y se distinguen del progreso permanente de la colección.

Las diez categorías permanentes usan otra ficha de compra: cada soldado tiene sus propios niveles y las mejoras se adquieren fuera de la expedición con monedas recogidas del escenario. Catálogo mantenido: vida, protección, potencia, cadencia, recarga, movilidad, recolección, aprendizaje, recuperación y especialización. Los precios y efectos se definirán junto con los ingresos de moneda, respetando los topes conjuntos.

### Saturación y validación necesarias

Una rama al máximo sale del sorteo. Si solo un arma sigue siendo elegible, las ofertas de arma apuntan a ella. Si ambas se completan, se usan los candidatos generales restantes, sin prometer una oferta de arma imposible.

21A y 56A aceptadas: al agotar ramas, ofrecer tres bonificaciones tácticas breves y universales, con solo una activa, sin nuevas ranuras ni tickets permanentes; el premio de armamento sin candidata usa ese catálogo. Efectos concretos, duración y valores requieren ficha. No presentar cartas vacías ni superar topes silenciosamente.

La referencia anterior 5/3 queda reemplazada por cinco niveles más un extra propio por rama, poder y mejora general. La frecuencia de XP determinará en cuántos mapas se alcanzan. 21A permite tres apoyos tácticos breves al saturar, con solo uno activo, sin nuevas ranuras o moneda permanente. La fusión solicitada se evalúa por separado en la matriz vigente; este documento no modifica el ejecutable.
