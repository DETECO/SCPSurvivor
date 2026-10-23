# Compañeros — personalidades y variantes femeninas V2

23/10/2026 · ESTRUCTURA · **Banco narrativo propuesto. No integrado.** Iván pide variedad de tonos y NPC femeninos; diseñará sus sprites de acompañantes. Añade nombre asignado al azar y una presentación del compañero. Esta entrega aporta texto y condiciones, sin crear sprites, locuciones ni sonidos.

Complementa los [102 diálogos V1](DIALOGOS_COMPANEROS_GRIETA_V1.md); no los reemplaza. Los nombres y recuerdos ALERCE/TORNO/FARO/BRUMA se conservan como biografías propuestas, sin mezclar parentescos o mascotas entre personajes.

## 1. Identidad, personalidad y emoción

**Presentación del NPC**, **biografía** y **personalidad** son campos separados. Cualquier tono puede pertenecer a una acompañante femenina o masculina: una soldado puede ser sarcástica, seria, cariñosa, enojada, entusiasta o analítica. El género no cambia armas, probabilidades, daño ni capacidades.

| Código | Personalidad propuesta | Distintivo al escribir |
|---|---|---|
| SARC | Sarcástica | Ironía seca sobre el lugar y las circunstancias; ayuda de verdad |
| ENOJ | Enojada | Frases cortas, fastidio y decisión; no maltrata al jugador |
| ENTU | Entusiasta | Energía y curiosidad; no niega el peligro |
| CARI | Cariñosa | Calidez y atención; trato adulto sin romance obligatorio |
| SIMP | Simpática | Conversación cercana y humor ligero |
| SERE | Serena | Habla poco, observa y mantiene el orden |
| NERV | Nerviosa | Dudas y pequeñas vacilaciones; sigue siendo competente |
| ANAL | Analítica | Describe hechos y equipo sin inventar datos ni exponer código |

Cada NPC conserva un tono base durante su aparición. Su emoción responde al peligro: en D5 todos sienten miedo y deseo de salir, expresados a su manera. No cambiar de personalidad con cada línea. Las frases enojadas, nerviosas o cariñosas no alteran puntería, obediencia, velocidad, curación o aggro.

Los perfiles previos pueden mantener sus tonos originales por defecto (ALERCE sereno, TORNO analítico, FARO cercano/nervioso, BRUMA reservada/cálida). Otras combinaciones son opciones de diseño, sin cambiar sus recuerdos. Vincularlos con los sprites femeninos cuando Iván los entregue; no declarar un catálogo visual terminado.

## 2. Disparadores comunes

Cada personalidad dispone de los mismos quince contextos para comparar sus reacciones. No son una conversación que deba recitarse en orden.

| Sufijo del ID | Condición obligatoria |
|---|---|
| 01 | Llegada, D1–D4 |
| 02 | Apoyo durante D1–D4, compañero operativo |
| 03 | Arma propia conocida: sustituir `{arma_npc}` |
| 04 | Una de las armas realmente equipadas por el jugador: `{arma_jugador}` |
| 05 | Ataque balístico observado del jugador |
| 06 | Papel amarillo visible en escenario actual |
| 07 | Pasillos repetidos observables en escenario actual |
| 08–09 | Calma D1–D4: recuerdos personales compatibles con la biografía |
| 10 | Vida baja real del jugador, sin repetir por cada golpe |
| 11 | Reserva finita de apoyo del NPC agotada |
| 12 | Ánimo D1–D4 con alias disponible; usar alternativa si falta |
| 13 | Llegada D5, miedo y deseo de irse |
| 14 | D5, miedo y apoyo; nunca huida automática |
| 15 | Victoria confirmada |

Las líneas 03–09 y 12 son comentarios ambientales para D1–D4 y contexto tranquilo cuando corresponda. En D5 seleccionar 10/11/13/14/15 si cumplen su evento; suprimir bromas y charla doméstica. Las líneas tácticas jamás sustituyen el aviso oficial de retirada o de ataques del jefe.

Se heredan burbujas de texto, control de repetición, prioridad de peligro, alias futuro y guardado del V1. Si un marcador no puede resolverse, elegir otra línea; no mostrar llaves ni inferir armas de la colección. Para el refuerzo exterior, filtrar por el escenario actual y contexto permitido; su mecánica sigue propuesta, no aprobada por este banco.

## 3. Banco por personalidad

### Sarcástica — SARC

| ID | Texto |
|---|---|
| SARC-01 | «Qué sitio tan acogedor. Solo le falta cualquier cosa que lo haga acogedor.» |
| SARC-02 | «Bueno, al menos nos tenemos. El servicio de atención parece bastante ocupado.» |
| SARC-03 | «Me dieron {arma_npc}. La charla motivacional venía por separado.» |
| SARC-04 | «Mira, {arma_jugador}. Algo aquí tiene un nombre que reconozco.» |
| SARC-05 | «Eso sonó a disparo nuestro. Me conformo con pequeñas certezas.» |
| SARC-06 | «Este amarillo debe de salir baratísimo. No encuentro otra explicación.» |
| SARC-07 | «Otro pasillo idéntico. Se ve que aquí ahorraron en imaginación.» |
| SARC-08 | «En casa me quejaba de que las paredes eran aburridas. Retiro la queja.» |
| SARC-09 | «Quiero volver y pagar una cuenta de luz. Nunca pensé decir eso.» |
| SARC-10 | «Te queda poca vida. Por una vez, no tengo ningún comentario ingenioso.» |
| SARC-11 | «Sin munición de apoyo. El sarcasmo, lamentablemente, no sirve de proyectil.» |
| SARC-12 | «{nombre_jugador}, seguimos aquí. No les regalemos además el buen ánimo.» |
| SARC-13 | «No estoy bromeando ahora. Tengo miedo y quiero salir de aquí.» |
| SARC-14 | «Sigo contigo. Me gustaría tener algo mejor que decir, pero tengo miedo.» |
| SARC-15 | «Ganamos. Mi opinión sobre este lugar sigue siendo pésima.» |

Alternativa SARC-12 sin alias: «Seguimos aquí. No les regalemos además el buen ánimo».

### Enojada — ENOJ

| ID | Texto |
|---|---|
| ENOJ-01 | «Este sitio ya me tiene de mal humor. Vamos a hacer algo útil.» |
| ENOJ-02 | «Mi enfado es con este lugar. Contigo estoy haciendo equipo.» |
| ENOJ-03 | «Traje {arma_npc}. Ya era hora de encontrar algo que entiendo.» |
| ENOJ-04 | «Veo tu {arma_jugador}. Al menos no hemos venido con las manos vacías.» |
| ENOJ-05 | «Escuché tu disparo. Con todo este ruido cuesta distinguir lo nuestro.» |
| ENOJ-06 | «Si salgo de aquí, no quiero volver a ver una pared amarilla.» |
| ENOJ-07 | «El mismo pasillo otra vez. Hasta para perderse podrían poner algo de variedad.» |
| ENOJ-08 | «Tenía cosas pendientes en casa. Esto no estaba en la lista.» |
| ENOJ-09 | «Voy a disfrutar cerrar mi propia puerta y dejar todo esto fuera.» |
| ENOJ-10 | «Te queda poca vida. Ahora toca cuidar cada movimiento.» |
| ENOJ-11 | «Maldita sea. Se agotó mi munición de apoyo.» |
| ENOJ-12 | «{nombre_jugador}, sigo contigo. Este sitio no decide cómo nos tratamos.» |
| ENOJ-13 | «Tengo miedo, ¿sí? Quiero irme. El enfado no me está quitando el miedo.» |
| ENOJ-14 | «Odio sentirme así. Haré lo que pueda para seguir ayudando.» |
| ENOJ-15 | «Eso terminó. Todavía me queda enfado para un buen rato.» |

Alternativa ENOJ-12 sin alias: «Sigo contigo. Este sitio no decide cómo nos tratamos».

### Entusiasta — ENTU

| ID | Texto |
|---|---|
| ENTU-01 | «¡Contención presente! Qué bueno encontrar a alguien con quien hacer equipo.» |
| ENTU-02 | «Vamos paso a paso. Todavía podemos entender lo que está pasando.» |
| ENTU-03 | «Me asignaron {arma_npc}. Tenía ganas de conocer mejor este equipo.» |
| ENTU-04 | «¡Llevas {arma_jugador}! Después quiero saber qué te ha parecido.» |
| ENTU-05 | «¡Vi el disparo! Voy a fijarme bien en cómo usas esa arma.» |
| ENTU-06 | «Tanto amarillo acaba llamando la atención. Yo habría elegido otro color.» |
| ENTU-07 | «Podemos buscar diferencias entre pasillos. Algún detalle habrá que los distinga.» |
| ENTU-08 | «Tengo ganas de llegar a casa y hacer planes que no sean de emergencia.» |
| ENTU-09 | «Cuando vuelva quiero preparar algo rico, aunque deje la cocina hecha un desastre.» |
| ENTU-10 | «Te queda poca vida. Ahora bajemos el ritmo de los riesgos.» |
| ENTU-11 | «Se acabó mi munición de apoyo. Tengo que contar con eso.» |
| ENTU-12 | «¡Vamos, {nombre_jugador}! Todavía estamos haciendo nuestra parte.» |
| ENTU-13 | «Ya no siento entusiasmo. Tengo miedo y quiero volver a casa.» |
| ENTU-14 | «Me cuesta encontrar ánimo aquí. Igual voy a seguir ayudando mientras pueda.» |
| ENTU-15 | «¡Lo conseguimos! Necesitaba una buena noticia.» |

Alternativa ENTU-12 sin alias: «¡Vamos! Todavía estamos haciendo nuestra parte».

### Cariñosa — CARI

| ID | Texto |
|---|---|
| CARI-01 | «Qué bueno encontrarte. Me alegra que podamos acompañarnos aquí.» |
| CARI-02 | «No hace falta hablar. También podemos hacernos compañía así.» |
| CARI-03 | «Llevo {arma_npc}. Voy a hacer mi parte con cuidado.» |
| CARI-04 | «Veo que llevas {arma_jugador}. Me gustaría saber por qué la elegiste.» |
| CARI-05 | «Escuché tu disparo. Me tranquiliza reconocer algo de nuestro lado.» |
| CARI-06 | «Ese amarillo me resulta cansador. Ojalá tuviéramos un paisaje más amable.» |
| CARI-07 | «Los pasillos se parecen mucho. Voy a intentar recordarlos contigo.» |
| CARI-08 | «Echo de menos una taza caliente entre las manos y tiempo para terminarla.» |
| CARI-09 | «Quiero llegar a casa y dejar de escuchar cada ruido como una amenaza.» |
| CARI-10 | «Te veo con poca vida. Cuida el siguiente paso; no hace falta apresurarse.» |
| CARI-11 | «Ya no tengo munición de apoyo. Quería que lo supieras enseguida.» |
| CARI-12 | «{nombre_jugador}, me alegra estar haciendo equipo contigo.» |
| CARI-13 | «Tengo miedo y quiero irme. Me ayuda tu compañía.» |
| CARI-14 | «No sé qué decir para aliviar esto. Voy a seguir ayudando mientras pueda.» |
| CARI-15 | «Me alegra que lo hayamos conseguido. Ojalá ahora podamos descansar un poco.» |

Alternativa CARI-12 sin alias: «Me alegra estar haciendo equipo contigo».

### Simpática — SIMP

| ID | Texto |
|---|---|
| SIMP-01 | «Por fin alguien de nuestro lado. Ya empezaba a extrañar una conversación normal.» |
| SIMP-02 | «Tú sigue con lo tuyo. Yo intentaré aportar algo más que conversación.» |
| SIMP-03 | «Me tocó {arma_npc}. Hemos tenido mejores primeras citas.» |
| SIMP-04 | «Veo tu {arma_jugador}. Después me cuentas qué tal te resulta.» |
| SIMP-05 | «Ese disparo sí lo reconocí. Todavía me acuerdo de las prácticas.» |
| SIMP-06 | «¿Amarillo otra vez? A alguien le hicieron precio por comprar mucha pintura.» |
| SIMP-07 | «Este pasillo y yo ya nos conocemos. O tiene un gemelo muy convincente.» |
| SIMP-08 | «Echo de menos abrir una puerta y saber qué habitación viene después.» |
| SIMP-09 | «Cuando vuelva a casa voy a disfrutar hasta tener que ordenar.» |
| SIMP-10 | «Te veo mal. Dejemos la charla para después.» |
| SIMP-11 | «Se acabó mi munición de apoyo. Ojalá las palabras también sirvieran para esto.» |
| SIMP-12 | «Vamos, {nombre_jugador}. Todavía estamos haciendo equipo.» |
| SIMP-13 | «Esta vez no se me ocurre ningún chiste. Tengo miedo y quiero irme.» |
| SIMP-14 | «Voy a seguir ayudando. Solo necesito saber que sigues aquí.» |
| SIMP-15 | «Ahora sí me vendría bien una conversación completamente aburrida.» |

Alternativa SIMP-12 sin alias: «Vamos. Todavía estamos haciendo equipo».

### Serena — SERE

| ID | Texto |
|---|---|
| SERE-01 | «Te acompaño. Primero miremos dónde hemos llegado.» |
| SERE-02 | «Una cosa cada vez. No tenemos que responder a todo al mismo tiempo.» |
| SERE-03 | «Llevo {arma_npc}. Voy a trabajar con lo que conozco.» |
| SERE-04 | «Reconozco tu {arma_jugador}. Tendré presente cómo la usas.» |
| SERE-05 | «Escuché tu disparo. Sigo observando lo que hay alrededor.» |
| SERE-06 | «El papel es amarillo. Voy a buscar otro detalle para orientarme.» |
| SERE-07 | «Los pasillos se parecen. No voy a asumir que son el mismo.» |
| SERE-08 | «En casa puedo sentarme un rato sin buscar la siguiente salida.» |
| SERE-09 | «Me gustaría pasar una tarde mirando por una ventana de verdad.» |
| SERE-10 | «Tu vida está baja. Ahora importa el próximo movimiento.» |
| SERE-11 | «Mi munición de apoyo se agotó. No cuentes con más disparos.» |
| SERE-12 | «{nombre_jugador}, estoy aquí. Mantén la atención.» |
| SERE-13 | «Tengo miedo. Quiero salir de aquí, aunque procure hablar con calma.» |
| SERE-14 | «No voy a ocultarte lo que siento. Tampoco voy a dejar de ayudar.» |
| SERE-15 | «Terminó. Podemos dejar de anticipar el siguiente ataque.» |

Alternativa SERE-12 sin alias: «Estoy aquí. Mantén la atención».

### Nerviosa — NERV

| ID | Texto |
|---|---|
| NERV-01 | «Ah, bien, eres tú. Necesitaba ver a alguien de nuestro lado.» |
| NERV-02 | «Estoy pendiente. Si me quedo en silencio, es que intento concentrarme.» |
| NERV-03 | «Traje {arma_npc}. Revisé el equipo antes de cruzar. Dos veces.» |
| NERV-04 | «Esa es tu {arma_jugador}, ¿verdad? Me ayuda reconocer algo aquí.» |
| NERV-05 | «Escuché el disparo. Por un momento no sabía de dónde venía.» |
| NERV-06 | «Ese amarillo… Creo que voy a tardar en olvidarlo.» |
| NERV-07 | «¿No acabamos de ver otro pasillo igual? Puede que solo se parezcan.» |
| NERV-08 | «Dejé una cosa por hacer en casa. Ahora no me parece ninguna molestia.» |
| NERV-09 | «Echo de menos preocuparme por algo que pueda resolver al llegar a casa.» |
| NERV-10 | «Te veo con poca vida. Voy a dejarte espacio para moverte.» |
| NERV-11 | «No, espera… se acabó mi munición de apoyo. Tenía que avisarte.» |
| NERV-12 | «{nombre_jugador}, sigo aquí. Estoy intentando no hablar demasiado.» |
| NERV-13 | «No quiero estar aquí. Tengo mucho miedo y quiero volver.» |
| NERV-14 | «Me cuesta concentrarme, pero sigo ayudando. No te he perdido de vista.» |
| NERV-15 | «¿Terminó de verdad? Bien. Necesitaba que terminara.» |

Alternativa NERV-12 sin alias: «Sigo aquí. Estoy intentando no hablar demasiado».

### Analítica — ANAL

| ID | Texto |
|---|---|
| ANAL-01 | «Estoy observando el entorno. Cuantos menos supuestos hagamos, mejor.» |
| ANAL-02 | «Voy a fijarme en lo que cambia, no solo en lo que parece amenazante.» |
| ANAL-03 | «Mi equipo es {arma_npc}. Prefiero informar antes que presumir.» |
| ANAL-04 | «Tu {arma_jugador} es reconocible. Observaré su patrón antes de moverme cerca.» |
| ANAL-05 | «Vi el disparo. El sonido ayuda a distinguirlo del resto del combate.» |
| ANAL-06 | «El papel amarillo se repite. Por sí solo no sirve como referencia.» |
| ANAL-07 | «Los pasillos comparten diseño. Eso no confirma que lleven al mismo sitio.» |
| ANAL-08 | «En casa sé qué hay al otro lado de cada pared. Lo echo de menos.» |
| ANAL-09 | «Me gustaría volver a hacer planes que no dependan del siguiente minuto.» |
| ANAL-10 | «Tu vida está baja. Conviene reducir riesgos ahora.» |
| ANAL-11 | «Reserva de apoyo agotada. Mis disparos ya no son una opción.» |
| ANAL-12 | «{nombre_jugador}, sigo pendiente del entorno.» |
| ANAL-13 | «No puedo asegurar que salgamos. Tengo miedo y quiero volver.» |
| ANAL-14 | «El miedo no me aporta información. Aun así, está ahí. Sigo ayudando.» |
| ANAL-15 | «La victoria está confirmada. Ahora podemos pensar en volver.» |

Alternativa ANAL-12 sin alias: «Sigo pendiente del entorno».

## 4. Presentación femenina y concordancia

Los textos anteriores evitan en general adjudicar género al jugador o al NPC. Para presentaciones que sí lo expresan, las variantes se eligen según la identidad configurada del acompañante, no por el género del alias ni por su personalidad.

| Personalidad | Variante femenina propuesta | Variante masculina propuesta |
|---|---|---|
| Sarcástica | «Preparada. Entusiasmada con este lugar, bastante menos.» | «Preparado. Entusiasmado con este lugar, bastante menos.» |
| Enojada | «Estoy harta de este sitio. Vamos a concentrarnos.» | «Estoy harto de este sitio. Vamos a concentrarnos.» |
| Entusiasta | «Lista para ayudar. Vamos paso a paso.» | «Listo para ayudar. Vamos paso a paso.» |
| Cariñosa | «Tranquila no estoy, pero me alegra poder acompañarte.» | «Tranquilo no estoy, pero me alegra poder acompañarte.» |
| Simpática | «Encantada de encontrar compañía en un sitio tan poco acogedor.» | «Encantado de encontrar compañía en un sitio tan poco acogedor.» |
| Serena | «Estoy preparada. Voy a mantener la atención.» | «Estoy preparado. Voy a mantener la atención.» |
| Nerviosa | «Estoy nerviosa. Igual voy a hacer mi parte.» | «Estoy nervioso. Igual voy a hacer mi parte.» |
| Analítica | «Estoy concentrada en lo que podemos observar.» | «Estoy concentrado en lo que podemos observar.» |

Se usan como alternativas de presentación D1–D4, no todas seguidas ni en D5. Si no se configura concordancia, conservar las frases generales del banco. No inferir biografía, vínculo romántico o capacidad de combate a partir de un sprite femenino.

## 5. Nombre aleatorio y presentación — requisito de Iván

Asignar **un nombre al generar cada compañero** y una presentación al aparecer por primera vez. Usar un sorteo propio para nombres, separado de aparición, arma, peligrosidad y personalidad; no cambia las probabilidades aceptadas del NPC.

El nombre, presentación, biografía y tono forman una identidad persistida. No renombrarlo al cargar, mover la cámara, regresar al origen o elegir otra frase. Los indicativos ALERCE/TORNO/FARO/BRUMA identifican perfiles biográficos propuestos, no sustituyen el nombre personal. Mostrar, por ejemplo, **Valeria · ALERCE**, si se usa indicativo; la presentación puede decir solo Valeria.

### Listas iniciales propuestas

| Presentación del NPC | Nombres disponibles para sorteo |
|---|---|
| Femenina | Valeria, Camila, Elena, Paula, Antonia, Daniela, Sofía, Lucía, Martina, Renata, Natalia, Emilia, Julia, Inés, Laura, Andrea, Beatriz, Clara, Isabel, Teresa |
| Masculina | Gabriel, Tomás, Mateo, Nicolás, Diego, Martín, Andrés, Sebastián, Daniel, Lucas, Samuel, Joaquín, Rafael, Benjamín, Felipe, Bruno, Manuel, Vicente, Rodrigo, Esteban |

Son nombres narrativos propuestos, no personas reales ni soldados canónicos. Elegir uniformemente dentro de la lista compatible con la identidad configurada del NPC. La personalidad no decide el nombre: Valeria puede ser sarcástica, enojada o serena. Evitar nombres ya usados en la expedición mientras existan opciones; al agotar la lista, permitir repetición sin bloquear apariciones. La probabilidad marginal depende de los nombres restantes, no de peligrosidad o rareza.

Si el perfil es FARO, excluir **Bruno** como nombre del soldado: es el nombre de su perro en los recuerdos ya diseñados. Evitar también que el nuevo NPC tenga el mismo nombre visible del jugador, si se conoce y quedan alternativas; no modificar el alias del jugador. No inventar apellidos, rangos ni parentescos al asignar el nombre.

### Presentaciones por tono — propuestas nuevas

| ID | Personalidad / condición | Burbuja |
|---|---|---|
| PRES-01 | Sarcástica, llegada D1–D4 | «Soy {nombre_npc}. Un gusto conocerte en este lugar tan encantador.» |
| PRES-02 | Enojada, llegada D1–D4 | «Me llamo {nombre_npc}. Estoy de mal humor, pero vengo a ayudar.» |
| PRES-03 | Entusiasta, llegada D1–D4 | «¡Soy {nombre_npc}! Me alegra encontrarte. Vamos a hacer equipo.» |
| PRES-04 | Cariñosa, llegada D1–D4 | «Me llamo {nombre_npc}. Qué bueno encontrar compañía. Estoy contigo.» |
| PRES-05 | Simpática, llegada D1–D4 | «Soy {nombre_npc}. La próxima presentación podría ser en un sitio más agradable.» |
| PRES-06 | Serena, llegada D1–D4 | «Soy {nombre_npc}, de contención. Te acompaño.» |
| PRES-07 | Nerviosa, llegada D1–D4 | «Me llamo {nombre_npc}. Perdona, necesitaba decir algo normal. Voy contigo.» |
| PRES-08 | Analítica, llegada D1–D4 | «Soy {nombre_npc}. Estoy observando el entorno; te iré diciendo lo que vea.» |
| PRES-09 | Cualquier tono, llegada D5 | «Soy {nombre_npc}. Tengo miedo y quiero salir, pero voy a ayudarte.» |
| PRES-10 | Cualquier tono, llegada D5 | «Me llamo {nombre_npc}. Ojalá nos hubiéramos conocido en otro lugar. Tengo miedo.» |
| PRES-11 | Cualquier tono, D1–D4 y alias de jugador disponible | «Soy {nombre_npc}. {nombre_jugador}, estoy contigo.» |
| PRES-12 | Alternativa sin alias de jugador | «Soy {nombre_npc}. Estoy contigo.» |

Al aparecer, escoger **una sola presentación** compatible; ocupa la intervención de llegada, sin encadenar inmediatamente otra bienvenida. D5 usa las variantes de miedo y conserva su tono mediante el resto del banco. El indicativo no equivale a una profesión o capacidad adicional.

La burbuja se identifica con el nombre del hablante para que se entienda quién habla, y puede usar el sonido característico pendiente de «sonido». No repetir la presentación en cada mensaje ni disparar nuevamente el sonido por cada letra del nombre. Si el jugador está bajo un aviso crítico, posponer brevemente o usar una presentación corta cuando sea legible; descartar comentarios antiguos antes que crear una cola de charla.

Guardar nombre y estado `presentación realizada` al mostrarla, con identidad del encuentro; si se suspende antes, la presentación sigue pendiente y el nombre no cambia. Si ya se mostró, no repetirla al cargar. Una frase ya visible puede restaurarse con su tiempo restante sin presentarse como evento nuevo.

## 6. Revisión previa a integración

El V2 reúne **120 frases por personalidad**, quince por cada uno de los ocho tonos, más **12 variantes de presentación** y ocho pares de concordancia femenina/masculina. Se suma al banco V1 de 102 variantes; las alternativas sin alias no se cuentan como nuevos IDs.

Comprobar coherencia entre tono y biografía, ausencia de promesas de acciones no disponibles, condiciones de arma/entorno, versión sin alias y miedo D5 sin huida automática. Las expresiones «prestar atención» o «me cuesta concentrarme» son narrativas, no bonificaciones o penalizaciones.

Comprobar además nombres fijos, lista compatible, ausencia de duplicados mientras haya alternativas, caso FARO/Bruno, alias ausente, una presentación por aparición y preservación al suspender. El nombre aleatorio y la presentación son requisitos expresos; listas y redacciones concretas son propuestas.

Los sprites femeninos los diseñará Iván. El sonido identificativo se resolverá en «sonido»; puede acompañar la burbuja sin pronunciar texto. Este banco no asigna timbres por género ni crea locuciones.
