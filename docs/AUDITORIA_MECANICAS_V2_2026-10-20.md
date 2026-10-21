# Auditoría de mecánicas V2 — revisión por categorías

**Cierre posterior de decisiones, 20/10/2026:** Iván aceptó las recomendaciones A del cuestionario con excepciones y notas. Los vacíos de esta auditoría describen el corte anterior a esa respuesta; consultar la [matriz vigente](DECISIONES_INFINITO_2026-10-20.md) para lo resuelto y lo que sigue pendiente. No volver a someter las 66 recomendaciones a aprobación general.

20/10/2026. Hilo ESTRUCTURA / wiki de diseño. Coordinación: Juanillo; tres revisiones paralelas Luna con razonamiento máximo.

Este documento analiza el diseño, sus cruces y sus casos límite. No cambia reglas aprobadas, no modifica el juego y no acredita pruebas de balance. Las recomendaciones son propuestas para revisar con Iván, una categoría cada vez. La prioridad de servicios locales se toma de AGENTS.md 0.27; no se considera el backend un impedimento para esta revisión.

## Decisiones vigentes usadas como base

- Recorrido infinito, confirmado por Iván el 20/10/2026, por mapas de cinco minutos activos. Jefe obligatorio por mapa.
- A 5:00 aparece puerta blindada con soldados; cesa toda aparición de enemigos nuevos. Los existentes permanecen. Para avanzar hay que vencer al jefe y cruzar la puerta.
- Inicio con **una** arma. Segunda por cofre especial o jefe; máximo dos, funcionando simultáneamente. Si ya tiene dos, ese premio se convierte en mejora de una equipada.
- Tres opciones aleatorias al subir de nivel; elegir una. Las mejoras de arma solo reconocen armas equipadas.
- Hasta tres poderes anómalos. Un cuarto permite reemplazo. Los jefes de grieta son la fuente de nuevos poderes; no está aprobada una entrega garantizada en toda victoria.
- Una ultimate, de efecto único, obtenible en su gacha, máximo nivel permanente 5 y progresión difícil. Su ensayo está aprobado; cada habilidad requiere su propia ficha.
- Exactamente tres tipos de gacha: **personajes, ultimates y armas**. Las skins no forman un cuarto tipo; su obtención concreta sigue abierta.
- Radar compacto aprobado; respeta descubrimiento de cofres y anomalías.
- Sin extracción para cerrar la partida, mochilas ni accesorios físicos de arma.
- Cofres de exploración: cuatro sorteos en 1:00/2:00/3:00/4:00; tabla y topes aprobados. Seis ubicaciones alternativas; escala de ensayo 160 × 100, no tamaño definitivo universal.

Fuentes vigentes: [wiki](WIKI_REDISENO_ROGUELITE.md), [combate](PROPUESTA_COMBATE_MULTIPLE.md), mensajes posteriores de Iván del 20/10 y [corte anterior de cofres](ESTRUCTURA_REGLAS_APROBADAS.md). Las decisiones posteriores sustituyen sus antecedentes incompatibles.

## Cómo leer los hallazgos

- **Vacío:** falta una regla para un estado que sí puede producirse.
- **Riesgo:** las reglas permiten un resultado indeseado si no se limita; no es un error observado en una partida.
- **Desfase documental:** un documento o prototipo conserva una versión anterior. No significa que Iván haya aprobado dos diseños incompatibles a la vez.
- **Propuesta:** recomendación todavía sin aprobar. No se convierte en contrato al aparecer aquí.

## Mapa de revisión

| Orden | Categoría | Principal cierre necesario | Momento |
| --- | --- | --- | --- |
| 01 | Ciclo de partida, victoria y muerte | Qué termina una expedición y qué conserva el jugador | Antes de cerrar el recorrido completo |
| 02 | Relojes, pausas y recuperación | Qué cuenta en mapa, grieta, cooldown y tiempo acumulado | Antes de integrar los sistemas |
| 03 | Jefes, puerta y aliados | Horario, cobertura, premios pendientes y salida | Antes de equilibrar el primer mapa |
| 04 | Armas y segunda ranura | Garantía, selección, duplicados y momento de resolución | Antes de probar el equipo definitivo |
| 05 | XP y cartas de nivel | Mezcla, topes, saturación y XP pendiente al cruzar | Antes de ajustar progresión |
| 06 | Poderes anómalos | Tabla de adquisición, funcionamiento y reemplazo | Antes de completar las grietas |
| 07 | Ultimates | Controles, cinco niveles, cooldown y habilidad del soldado | Antes del ensayo integrado |
| 08 | Soldados y entrenamiento permanente | Identidad, diez categorías heredadas y compatibilidades | Antes de equilibrar colección y gacha |
| 09 | Vida, daño, defensas y objetos de apoyo | Orden de cálculo, curación, contacto y acumulación | Antes de afirmar balance |
| 10 | Grietas | Recinto, reloj, retorno, retirada y premio | Antes de definir su versión final |
| 11 | Saltos dimensionales | Destinos y condiciones sin anular al jefe obligatorio | Antes de habilitar atajos |
| 12 | Mapas, monstruos y dificultad | Curva por tramo y variedad funcional | Antes de producir todos los mapas |
| 13 | Cofres y recompensas | Frecuencia efectiva, premio de armamento, topes e hitos | Antes de cerrar ritmo de recompensas |
| 14 | Tres gachas y economía | Tickets, ingresos, duplicados, garantías y progresión | Antes de conectar premios persistentes |
| 15 | Radar, avisos y controles | Descubrimiento, prioridades y lectura de los estados | Antes de cerrar el HUD |
| 16 | Continuidad, resultados y clasificación | Reanudación y recompensas únicas compatibles con V2 | Antes de conectar guardado o ranking |

## 01. Ciclo de partida, victoria y muerte

**Definido:** la puerta continúa la misma expedición; la vida y la build temporal siguen entre mapas. La extracción anterior no vuelve como cierre.

**Vacíos:**

- **Formato resuelto después de la auditoría:** Iván eligió recorrido infinito el 20/10/2026. Queda por resolver cómo se suspende o termina voluntariamente una expedición sin reintroducir extracción.
- Falta una tabla V2 de conservación por muerte, victoria, abandono y cierre de la aplicación. Debe separar colección, entrenamiento, nivel temporal, poderes adquiridos durante la expedición y premios confirmados.
- No están cerrados resurrección, reintentos ni eventual abandono con resultado. No se deducen del modo fantasma o de una ultimate curativa.

**Caso que debe resolverse:** después de siete mapas el jugador quiere terminar. Hoy no existe una regla final que determine si ha ganado, abandonado o simplemente suspendido la expedición.

**Dirección ya elegida:** modo infinito desde el inicio. Exige cerrar saturación, suspensión, recuperación y clasificación. La propuesta pendiente para muerte reiniciaría la build temporal sin eliminar personajes, armas o ultimates de la colección. Los recursos ya confirmados se tratarían según sus reglas de cuenta; no se promete conservar botín pendiente.

Fuente: wiki, decisiones O-05/O-11 y prioridad de mecánicas. D-040/D-212 son antecedentes de conservación de recursos confirmados; no resuelven todos los resultados V2.

## 02. Relojes, pausas y recuperación

**Definido:** cinco minutos activos por mapa; pausas y selección de cartas no generan sorteos de cofres. El reloj del mapa se reinicia al cruzar.

**Vacíos y riesgos:**

- Hay que distinguir reloj del mapa, tiempo activo acumulado, duración de apertura de grieta, duración del encuentro y cooldowns. No todos tienen por qué reiniciarse juntos.
- Tras 5:00 dejan de aparecer enemigos. Con regeneración, curación reutilizable y cooldowns, esperar en una zona despejada podría convertirse en la mejor estrategia para entrar siempre recuperado al mapa siguiente.
- Congelar solo la ultimate deja abierto el mismo problema con regeneración y primeros auxilios. Incluso la existencia de un enemigo aislado puede falsear una regla basada únicamente en «hay combate».
- El bono histórico de diez minutos no concreta aún cómo suma remanentes y grietas ni si el instante exacto modifica un sorteo que ya ocurrió.

**Caso:** dejar un enemigo atrapado, esperar a curarse y recargar todo, y cruzar después. Es una posibilidad de diseño que debe probarse, no una explotación verificada.

**Propuesta:** una tabla de estados que declare para cada reloj si avanza, se congela o se conserva. Evaluar una ventana explícita de transición, o límites de recuperación tras 5:00. Mantener el cese de apariciones; cualquier límite nuevo requiere aprobación. La transición no debería recargar gratuitamente una ultimate.

Fuente: wiki, apartados de recorrido/cofres; combate, recomendaciones de ultimate; decisiones O-06/O-08/O-13.

## 03. Jefes, puerta y aliados

**Definido:** un jefe obligatorio; puerta y soldados a 5:00 aunque siga vivo. Si muere antes, continúa la supervivencia hasta 5:00. No hace falta eliminar a todos los remanentes para que el jefe cuente como vencido.

**Vacíos y riesgos:**

- El horario 4:00 es provisional. Deben definirse aparición, posición alcanzable y tiempo de enfrentamiento con el equipo previsto.
- Falta decidir si aliados atacan al jefe, pueden atraerlo, morir o bloquear el paso; también a quién pertenecen XP y bajas de sus ataques.
- Si la cobertura puede resolver el jefe, esperar al equipo podría sustituir el desafío obligatorio.
- Vencer genera un cofre, pero reclamarlo exige 3,5 segundos en B3. Cruzar por contacto podría dejar atrás el premio, incluida la segunda arma, si no hay una regla específica.
- Un jefe con fase de invocación posterior a 5:00 debe seguir siendo vencible respetando el cierre de apariciones. Los ataques/proyectiles no equivalen automáticamente a enemigos nuevos: hay que catalogarlos.

**Caso:** el jefe cae a 4:59, el jugador pisa la salida a 5:00 y pierde su premio antes de abrirlo.

**Propuesta:** aliados como cobertura contra minions, sin resolver por sí solos el jefe; premio principal de jefe resuelto antes de completar el cruce, conservando la transición por contacto. Elegir explícitamente entre entrega automática del premio principal o impedir la transición mientras se reclama. No extender ese tratamiento a todos los cofres de exploración sin decidirlo.

Fuente: wiki, recorrido/cofres; PRUEBA_PREMIOS_B3.md; decisiones O-01/O-10.

## 04. Armas y segunda ranura

**Definido:** una al comienzo; hasta dos simultáneas. La segunda se obtiene por premio de jefe o cofre especial. Con dos, ese premio mejora una equipada.

**Vacíos y riesgos:**

- La garantía del primer jefe es recomendación, no aprobación. Sin ella, puede quedar indeterminado cuánto dura la fase de una sola arma.
- Falta elegir si el premio ofrece una selección, una tirada o un modelo fijo, y si usa solo colección desbloqueada. Una cuenta inicial necesita opciones válidas sin depender de una tirada previa de gacha.
- Dos modelos iguales, sustitución posterior y tratamiento de duplicados equipados siguen abiertos.
- No está decidido si granada/molotov ocupan arma o poder. «A distancia» se solapa con láser/misil/arrojadiza si todas se usan como categorías excluyentes; conviene separar familia funcional y etiquetas de daño/alcance.
- La propuesta de resolver armamento al abrir difiere de la regla general de contenido fijo al aparecer. Requiere una excepción expresa para la segunda arma, sin volver a sortear tickets.

**Caso:** aparecen dos premios mientras solo hay un arma; si ambos fijan una segunda arma al generarse, podrían intentar conceder tres al abrirlos consecutivamente.

**Propuesta:** primer jefe garantiza la segunda si falta; cofre opcional permite adelantarla. Volver a comprobar el equipo al reclamar para transformar el segundo premio en mejora. Segunda arma a progreso temporal base, sin copiar mejoras específicas de la primera; esto sigue pendiente de aprobación.

Fuente: combate, «Segunda arma»; wiki, «Armas equipadas».

## 05. XP y cartas de nivel

**Definido:** tres opciones, elegir una; mejoras de arma únicamente para equipadas. Ninguna carta puede mejorar una ranura vacía.

**Vacíos y riesgos:**

- Conviven dos propuestas de mezcla: arma/general/libre y arma/poder/general. No son dos reglas aprobadas; falta escoger la distribución y su sustitución si no hay poderes.
- Rangos propuestos 5/3 para ramas de arma no están aprobados. El máximo 5 confirmado es de ultimates. El límite 5 de copias del prototipo tampoco define el sistema final.
- Falta fijar curva de XP, frecuencia esperada de elecciones, coste de diversificar y saturación de toda la build.
- La antigua recogida automática de XP al cerrar oleada necesita equivalente: cruzar, derrotar al jefe o recoger físicamente. Decir «conservar XP» no determina qué pasa con orbes que siguen en el suelo.
- Vida, arma o poder pueden cambiar entre generar una oferta y elegirla; una carta inválida no debe consumirse ni aplicarse al sustituto equivocado.

**Caso:** segunda arma recién equipada, ningún poder y varias ramas al máximo; el reparto fijo exige una carta de poder que no existe.

**Propuesta:** sortear entre candidatos realmente válidos, sin repetir la misma mejora sobre el mismo objetivo. Definir reemplazos de categorías vacías y una salida explícita al agotamiento completo, sin convertir XP excedente en moneda de cuenta por inferencia. Ajustar topes junto con longitud de expedición.

Fuente: wiki, propuestas de categorías y saturación; combate, cartas; Roadmap D-189/D-211 como antecedentes.

## 06. Poderes anómalos

**Definido:** hasta tres; proceden de jefes de grieta. Al obtener un cuarto hay opción de reemplazo.

**Vacíos y riesgos:**

- No hay tabla final por jefe, frecuencia de poder, garantía tras varios fallos ni regla de poder repetido. «Pueden dar» no establece 100 %.
- Falta determinar cuáles se activan automáticamente, por intervalo, por condición o manualmente. El número de controles depende de esa decisión.
- Los cinco rangos temporales son propuesta. Al reemplazar faltan nivel inicial, herencia, reembolso y tratamiento de un poder idéntico.
- Retirar un poder debe resolver sus orbitales, zonas, proyectiles, marcas y bonificaciones, evitando duplicaciones o efectos residuales.
- Cada poder requiere límites de objetivos, acumulación y activación de otros efectos. Tres poderes con activaciones recursivas pueden multiplicar el daño mucho más de lo previsto por sus ranuras.

**Caso:** se reemplaza un campo defensivo y su reducción de daño permanece; el nuevo poder se suma como un cuarto efecto real.

**Propuesta:** ficha propia por poder, nuevos poderes solo en premio de grieta y mejoras temporales mediante cartas elegibles. Al cuarto: decisión pausada de conservar o reemplazar, con retirada completa del saliente. Resolver por separado qué ocurre con sus rangos; no asumir herencia.

Fuente: combate, composición/cartas/límites; wiki, aclaración de poderes del 20/10.

## 07. Ultimates

**Definido:** una equipada; efecto único, no solo daño; gacha; niveles permanentes 1–5 propios de cada ultimate; cooldown largo; ensayo aprobado.

**Vacíos y riesgos:**

- Elegir antes de la partida y activar manualmente son recomendaciones por confirmar. Debe resolverse la convivencia con Sprint o primeros auxilios del soldado.
- Falta disponibilidad al inicio, posibilidad de cambiarla, cooldown por habilidad y estado al cambiar de mapa o entrar en grieta.
- Cada nivel necesita una función concreta. La rareza y la dificultad de mejorar no limitan por sí solas una habilidad que anula encuentros.
- «Especialización» y reducciones generales de cooldown heredadas podrían convertir una ultimate larga en uso frecuente si se aplican sin distinguir componentes.
- Curación a vida completa, activación durante muerte, intangibilidad contra daño persistente y ataques durante modo fantasma necesitan regla.

**Caso:** médico con primeros auxilios y ultimate de curación, ambas reducidas por entrenamiento, puede superar la presión prevista o competir por el mismo control.

**Propuesta:** ficha por ultimate con cinco niveles, objetivos, duración/capacidad, cooldown, condiciones y controles. Mantener cooldown al cruzar y excluirlo de cadencia de armas; cualquier reducción deberá estar prevista en esa ficha. No usar 120 segundos ni una escala común como valores aprobados.

Fuente: combate, ultimate; PRUEBA_ULTIMATES_V2.md; antecedentes D-078/D-079 y cálculo heredado FieldStats.

## 08. Soldados y entrenamiento permanente

**Definido:** personajes/soldados se obtienen en su gacha. Atributos finales y efectos de skins no están cerrados para V2.

**Antecedente que debe conservarse al revisar:** sí existen diez categorías históricas y diez mejoras por categoría (D-106/D-109), con un máximo conjunto de cien entre mejoras aplicadas y puntos pendientes por soldado (D-213). No corresponde afirmar que nunca se definieron. El prototipo usa vida, protección, potencia, cadencia, recarga, movilidad, recolección, aprendizaje, recuperación y especialización. Esto no aprueba automáticamente una tabla nueva ni su traslado íntegro al combate V2.

**Vacíos y riesgos:**

- Recarga y cadencia deben servir o sustituirse de forma explícita para melee, rayos y efectos sin cargador. Especialización necesita aclarar qué habilidad modifica.
- Falta fijar identidad del soldado: estadísticas, pasiva, habilidad manual o combinación, y su relación con ultimate independiente.
- XP permanente y duplicados daban puntos históricos. Su adaptación a tres gachas, al máximo y a nuevas familias sigue abierta.
- Las mejoras permanentes se podían aplicar entre oleadas. Sin ese descanso, falta dónde se eligen y si alteran la expedición ya iniciada.

**Caso:** entrenar recarga en un personaje equipado con katana y un rayo puede consumir progreso sin dar efecto útil.

**Propuesta:** revisar primero utilidad y compatibilidad de las diez categorías, sin añadir más por obligación. Separar ficha base del personaje, entrenamiento permanente y cartas temporales. Considerar que una expedición use una configuración permanente fijada al comenzar; cambiar esa regla histórica requiere aprobación.

Fuente: RoadmapSCP.json D-104–110/D-151/D-213; js/systems/field-stats.js; decisiones O-04.

## 09. Vida, daño, defensas y apoyos

**Definido:** hay mejoras temporales y habilidades defensivas/curativas. Los topes heredados no sustituyen el balance del conjunto nuevo.

**Vacíos y riesgos:**

- Falta un orden común: daño bruto, resistencias, reducción, escudo, invulnerabilidad y vida. Debe determinarse qué puede coincidir y qué tiene prioridad.
- Regeneración permanente, temporal, primeros auxilios, ultimate y objetos del suelo pueden acumularse. Revisarlos aisladamente no limita la supervivencia conjunta.
- Subir vida máxima puede aumentar también vida actual en el prototipo; hay que especificar ese efecto para que no sea una curación escondida al elegir carta.
- Contacto enemigo, proyectiles, áreas persistentes, esquiva, atravesar cuerpos y repeticiones de daño necesitan reglas compatibles con melee y orbitales.
- Hay antecedentes de curación/imán desde enemigos y jefe (D-277), y cajas decorativas sin premio (D-278). No confundirlos con cofres de tickets ni eliminarlos silenciosamente.

**Caso:** reducción aplicada después del escudo produce una absorción efectiva distinta de aplicarla antes; la misma ficha puede rendir varias veces más según el orden.

**Propuesta:** una regla compartida de daño y una tabla de acumulación para defensas/curas; topes conjuntos y excepciones por efecto. Ninguna curación implica revivir salvo ficha expresa. Revisar la curación segura junto con categoría 02.

Fuente: wiki, mejoras; pauta de ultimates; FieldStats como referencia heredada; Roadmap D-253/D-277/D-278.

## 10. Grietas

**Definido:** opcionales, difíciles, con mayor recompensa; localización alcanzable, duración de apertura, alertas y entrada instantánea por contacto. Nuevo poder posible solo al vencer su jefe y reclamar el premio.

**Vacíos y riesgos:**

- Falta decidir si el combate ocurre en recinto separado o mismo escenario, y su frecuencia/momento de aparición. Los 45 segundos de apertura del prototipo no definen por sí solos el tiempo disponible para vencer.
- Deben separarse cierre del portal de entrada y expulsión/fin de un encuentro que ya comenzó.
- Reloj del mapa, retorno, retirada, muerte y puerta de 5:00 pueden coincidir. La prueba actual en el mismo mapa no resuelve una dimensión separada.
- Una frecuencia muy baja de grietas combinada con baja probabilidad de poder puede dejar vacías las tres ranuras durante demasiada partida; falta un objetivo de disponibilidad.

**Caso:** entrar a 4:59 y seguir combatiendo cuando el mapa alcanza 5:00; hay que decidir dónde está el jugador, qué enemigos pueden aparecer y cómo vuelve.

**Propuesta:** para la versión definitiva, evaluar recinto separado con estado del mapa de origen conservado, reloj de ese mapa congelado y retorno definido; como alternativa simple, mantener mismo mapa y describir expresamente el combate simultáneo. En ambos casos, un fallo no concede premio y una victoria no se cobra dos veces.

Fuente: decisiones O-06; PRUEBA_PREMIOS_B3.md; combate, fuente de poderes.

## 11. Saltos dimensionales

**Definido:** existen saltos entre niveles inspirados en Backrooms. No están fijados destinos ni desbloqueo.

**Vacío central:** saltar desde un mapa que sigue con jefe vivo contradice la obligación de vencerlo si el salto permite avanzar sin otra condición. Los mapas omitidos también plantean experiencia, premios y dificultad de llegada.

**Caso:** entrar en un salto del mapa 2 al 5 sin haber resuelto el jefe del 2 y cobrar premios de 3/4 sin jugarlos.

**Propuesta:** habilitar saltos después de resolver el jefe del mapa actual y mediante una transición autorizada. Los niveles omitidos no concederían victorias, cofres ni XP; el destino aplicaría su dificultad. Si se quieren excepciones, deben ser reglas expresas de una ruta alternativa, no un comportamiento implícito.

Fuente: wiki, saltos; decisiones O-07; pauta, distinción puerta/grieta/salto.

## 12. Mapas, monstruos y dificultad

**Definido:** básicos/minions propios de cada nivel y escalada con el tiempo; variedad SCP. Escala inicial y objetivos de recorrido aprobados para ensayo.

**Vacíos y riesgos:**

- Falta una curva de cantidad, vida, daño, velocidad y composición por minuto y por mapa. Escalar todo a la vez puede invalidar armas cortas o hacer irrelevante la esquiva.
- Falta fijar si progreso/tiempo/mapa o equipo del jugador dirigen la dificultad. Escalar automáticamente al poder adquirido puede anular el beneficio de mejorar.
- La variedad necesita comportamientos, amenazas y contrajuego, además de apariencia: perseguidores, proyectiles, zona, protección u otras funciones que se cataloguen.
- Cada plantilla necesita espacios para esquivar, acceso garantizado a jefe/puerta/premios y límites de enemigos/efectos. Un número de ranuras no limita por sí solo el coste de sus proyectiles y áreas.
- Una victoria de encuentro SCP debe especificar si significa abatir, contener o neutralizar su amenaza, según la adaptación del juego. No atribuir poderes nuevos al lore sin revisar su ficha y fuente.

**Caso:** una ruta que solo permite huir en línea recta puede ser válida para pistola y fallar con katana, aunque ambas tengan un daño medio parecido.

**Propuesta:** catálogo inicial acotado con roles distintos, tabla de ensayo por minuto/mapa y fichas de encuentro. Validar rutas con builds de corto alcance y de área; no convertir la escala 160 × 100 en obligación para todos los escenarios.

Fuente: wiki, escala/decisiones; prioridad de mecánicas; propuesta de combate, adaptación del lore.

## 13. Cofres y recompensas

**Definido:** exploración, jefe y grieta son fuentes distintas. Sorteos y cuotas de exploración no garantizan cofres; abrirlos no libera cupo. Premios de cuenta requieren confirmación.

**Vacíos y riesgos:**

- El «cofre especial de armamento» solicitado no tiene aún aparición, riesgo, aspecto ni relación final con los tres tipos existentes. No debe descontar cupo de tickets por suposición.
- Falta resolver saturación: con dos armas al máximo, un premio garantizado de mejora puede acabar sin efecto. B3 lo muestra sin compensación; es alcance provisional, no resolución aprobada para todo V2.
- Bonos/hitos por oleadas antiguas deben trasladarse a eventos V2 sin duplicarse por reintento, reinicio o salto.
- «Premio de grieta mayor» necesita una comparación definida: valor, opción táctica, recursos o probabilidad. No implica sumar siempre todos los tipos de premio.
- Falta qué sucede con cofres sin abrir al cruzar, con los ocultos y con los premios que no se pueden aplicar.

**Frecuencia efectiva calculada:** en el primer mapa, con cuatro intentos independientes del 10 %, la probabilidad de ningún cofre de exploración es 0,9^4 = **65,61 %**; al menos uno, **34,39 %**. Es un cálculo de la tabla base, sin bono acumulado de diez minutos, no una medición de juego. Por tanto seis ubicaciones alternativas no equivalen a seis puntos de recompensa activos. No se modifican estas tasas por esta auditoría.

**Propuesta:** separar visualmente exploración/tickets de armamento y premio de jefe; explicar claramente su función. Revisar si la escasez de cofres de tickets encaja con el resto de fuentes y el coste de una tirada antes de cambiar probabilidades. Definir un desenlace útil y acotado para saturación, sin inventar moneda permanente.

Fuente: wiki, cofres; COFRES_BASE_Y_ADAPTACION_V2.md; PRUEBA_PREMIOS_B3.md; combate, segunda arma.

## 14. Tres gachas y economía

**Definido:** personajes, ultimates y armas. No hay un cuarto gacha de poderes ni de skins.

**Vacíos y riesgos:**

- No está resuelta la adaptación de los dos tickets históricos —reclutamiento y suministros— a tres tipos. No se puede asumir una moneda universal ni crear una tercera automáticamente.
- Cada catálogo requiere coste, probabilidades, disponibilidad, garantías, duplicados y tratamiento al máximo. Las antiguas tasas de guardia/médico no definen el futuro catálogo ampliado.
- Hay que aclarar si armas son modelos desbloqueados reutilizables o copias consumibles. Quitar mochila no decide por sí solo el modelo de colección.
- La progresión difícil de ultimate requiere conocer ingresos y duplicados; sin ellos no puede estimarse el tiempo hasta nivel 5. La dificultad de obtención tampoco garantiza equilibrio de potencia.
- El equipo inicial debe permitir jugar y superar el primer jefe sin depender de conseguir un premio gacha concreto.
- Falta integrar skins en personajes u otra vía de adquisición; que sean solo cosméticas sigue siendo recomendación.

**Caso:** un duplicado de un personaje entrenado al máximo compensaba con ticket de suministros. Ese ticket ahora no tiene un destino inequívoco entre armas y ultimates.

**Propuesta:** diseñar primero catálogo inicial, duplicados e ingresos por expedición; después costes/garantías. Mantener modelos con estadísticas fijas como referencia simple, sin inventar rarezas aleatorias. Revisar y aprobar de forma expresa la equivalencia de tickets y compensaciones históricas.

Fuente: combate, tres gachas; Roadmap D-103/D-110/D-139/D-213/D-219/D-261; decisiones O-14.

## 15. Radar, avisos y controles

**Definido:** radar circular compacto, orientación fija, jugador centrado, símbolos y marcas exteriores; solo cofres descubiertos, anomalías reveladas, jefe desde encuentro, grieta abierta y puerta desde 5:00. Sin puntos individuales de monstruos comunes ni plano de paredes.

**Vacíos y riesgos:**

- Falta definir descubrimiento de anomalías y alcance del radar; para cofres existe la base de verlo en pantalla, que no debe cambiar por variar el zoom sin revisar esa consecuencia.
- Puerta/grieta/salto necesitan símbolos y textos distintos: comparten aspecto de portal, pero tienen consecuencias diferentes y algunos se activan al contacto.
- Falta prioridad cuando varios indicadores coinciden en una dirección, y señalización de portal bloqueado, cofre reclamado o encuentro ya cerrado.
- Dos armas, tres poderes y ultimate no equivalen automáticamente a seis botones. Depende de qué efectos sean automáticos y de la habilidad propia del soldado.
- Avisos de jefe y áreas peligrosas deben seguir visibles bajo orbitales, fuego, meteoritos y soldados aliados.

**Caso:** una grieta y la puerta final están en la misma dirección; el jugador sigue la marca equivocada y entra involuntariamente al desafío.

**Propuesta:** fijar prioridad de señales, formas distintas y estado textual breve. Cerrar controles en categoría 07 antes de dibujar la distribución definitiva del HUD; probar lectura con la combinación de efectos más cargada, también en móvil.

Fuente: wiki, radar; pauta de ultimates; decisiones de ingreso por contacto.

## 16. Continuidad, resultados y clasificación

**Definido:** continuar mapas conserva la expedición. Los recursos de cuenta se confirman una sola vez. Los ensayos aislados no entregan economía real.

**Vacíos y riesgos:**

- El guardado anterior suponía fronteras seguras por oleada. Frente a la puerta V2 puede seguir habiendo enemigos y un jefe vivo; restaurar limpiando la zona alteraría el resultado.
- Falta una frontera de reanudación que preserve jefe, cierre de apariciones, premios, cartas pendientes, cooldowns y poderes reemplazados sin repetir concesiones.
- Si se reanuda un combate desde un punto anterior, hay que aplicar la política de clasificación y recompensas ya confirmadas. No se debe resolver mediante recarga que vuelva a sortear cofres.
- Clasificar solo por tiempo puede premiar la espera tras 5:00 o chocar con saltos y rutas. La métrica definitiva necesita separar avance, dificultad y tiempo válido.

**Caso:** reclamar cofre de jefe, cerrar y recuperar un estado anterior con el mismo cofre puede repetir el premio si no está identificado como ya entregado.

**Propuesta:** versionar el contrato V2 y usar resultados/premios únicos. Elegir recuperación de encuentro o continuidad exacta y explicitar su efecto en clasificación; no prometer ambas sin diseñarlas. Estas decisiones no bloquean la revisión visual ni los ensayos ficticios locales.

Fuente: PLAN_CAMBIOS_ESTRUCTURA.md, riesgo de guardado; Roadmap D-069/D-076/D-241/D-291; prioridad 0.27.

## Desfases documentales detectados

No son nuevos desacuerdos de diseño. No se modifican en esta auditoría los registros canónicos o archivos que mantiene PROGRAMACION.

| Asunto | Criterio vigente | Referencias anteriores que necesitan sincronización |
| --- | --- | --- |
| Equipo inicial | Un arma; segunda durante la expedición | E-16, PAUTA_DESARROLLO.md, revisión 19/10 del roadmap y algunas guías del prototipo |
| Tres gachas | Personajes, ultimates, armas | Filas antiguas armas/soldados/skins/ultimates y antiguo reclutamiento/suministros |
| Fuente de poderes | Jefes de grieta | Referencia de combate del 19/10 y pendientes que aún dicen jefe/grieta o adquisición abierta sin esta aclaración |
| Estado de cofres | Existen prototipos B1/B2/B3; no economía final | Párrafos históricos de wiki/reglas que aún dicen «cofres con premio no implementados» |
| Topes de mejoras | Ultimate máximo 5; ramas de arma todavía propuestas | No convertir el máximo heredado 5 de copias B3 en regla final de todas las categorías |
| Entrenamiento de soldado | Hay diez categorías históricas; adaptación V2 abierta | No confundirlas con nuevas listas de atributos todavía sin aprobar |

## Casos mínimos para cerrar los cruces

Son escenarios de aceptación propuestos, no pruebas ejecutadas ni resultados.

1. Superar primer mapa y jefe con una sola arma, sin cofre opcional ni premio gacha necesario.
2. Abrir dos premios de armamento seguidos: conseguir segunda y después mejora; nunca tercera arma.
3. Matar jefe antes de 5:00 sin limpiar artificialmente remanentes ni adelantar la puerta.
4. Llegar a 5:00 con jefe vivo: sin nuevos enemigos, jefe vencible y cobertura aliada según regla.
5. Cruzar con cofre de jefe u orbes pendientes: aplicar exactamente la política elegida, una vez.
6. Esperar tras 5:00 con o sin un enemigo aislado: recuperación y cooldown no producen una estrategia dominante por accidente.
7. Entrar a grieta a 4:59: relojes, puerta, retorno y premios conservan estados coherentes.
8. Reemplazar poder mientras tiene zonas/orbitales/bonos activos: retirar lo definido sin ganar una cuarta ranura real.
9. Subir nivel sin poderes, con una arma y ramas al tope: ofertas útiles sin objetivos inexistentes.
10. Probar ultimate con habilidad del médico, defensas y entrenamiento máximos: cada límite se respeta.
11. Usar un salto: no anular jefe requerido ni cobrar mapas omitidos.
12. Reanudar tras premio confirmado: no repetir concesión, revivir jefe con premio nuevo ni limpiar remanentes gratuitamente.

## Primera revisión recomendada

**Actualización posterior:** recorrido infinito elegido por Iván el 20/10/2026. La revisión continúa con muerte, suspensión y conservación de progreso; después hay que cerrar la saturación de mejoras y el escalado sin límite de mapas. No volver a preguntar por el formato finito/infinito.

Después: categoría 02 y 03 juntas para cerrar el tramo de 5:00; luego 04–09 para el combate. Grietas/saltos y economía se resuelven usando esos acuerdos. No hace falta decidir todos los números o completar servicios reales antes de avanzar con la prueba y su diseño visual.
