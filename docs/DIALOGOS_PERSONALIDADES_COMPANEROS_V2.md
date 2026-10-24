# Compañeros — personalidades y variantes femeninas V2

23/10/2026 · **ESTADO: DIÁLOGOS APROBADOS POR IVÁN; NO INTEGRADOS AL JUEGO.** El texto del banco V1/V2 y las seis personalidades añadidas quedan aprobados el 23/10/2026. Esta aprobación cubre la redacción; no cambia las reglas de ESTRUCTURA ni integra burbujas, nombres aleatorios, sonidos o mecánicas.

Complementa los [102 diálogos V1](DIALOGOS_COMPANEROS_GRIETA_V1.md); no los reemplaza. Los nombres y recuerdos ALERCE/TORNO/FARO/BRUMA se conservan como biografías propuestas, sin mezclar parentescos o mascotas entre personajes.

## 1. Identidad, personalidad y emoción

**Presentación del NPC**, **biografía** y **personalidad** son campos separados. Cualquier tono puede asignarse a NPC femeninos o masculinos: una soldado puede ser sarcástica, amorosa, coqueta, fría, agresiva, enojona, entusiasta, analítica o tener cualquiera de las demás personalidades del banco. El género no cambia armas, probabilidades, daño ni capacidades.

| Código | Personalidad | Distintivo al escribir |
|---|---|---|
| SARC | Sarcástica | Ironía seca sobre el lugar y las circunstancias; ayuda de verdad |
| ENOJ | Enojada | Frases cortas, fastidio y decisión; no maltrata al jugador |
| ENTU | Entusiasta | Energía y curiosidad; no niega el peligro |
| CARI | Cariñosa | Calidez y atención; trato adulto sin romance obligatorio |
| SIMP | Simpática | Conversación cercana y humor ligero |
| SERE | Serena | Habla poco, observa y mantiene el orden |
| NERV | Nerviosa | Dudas y pequeñas vacilaciones; sigue siendo competente |
| ANAL | Analítica | Describe hechos y equipo sin inventar datos ni exponer código |
| TOXI | Tóxica | Controladora y punzante; presiona con comentarios y busca tener la última palabra, sin convertirse en una mecánica de sabotaje |
| AMOR | Amorosa | Expresa cariño, cuidado y cercanía; no presupone romance |
| COQ | Coqueta | Juguetona y segura al halagar; no presupone reciprocidad ni relación |
| FRIA | Fría | Frases breves, medidas y poco expresivas; el miedo de D5 sigue presente |
| AGRE | Agresiva | Directa, desafiante y de carácter intenso; no amenaza ni maltrata al jugador |
| GRUN | Enojona | Se queja por costumbre y se irrita con molestias pequeñas; se diferencia de ENOJ, cuya rabia es más firme y situacional |

Cada NPC conserva un tono base durante su aparición. Su emoción responde al peligro: en D5 todos sienten miedo y deseo de salir, expresados a su manera. No cambiar de personalidad con cada línea. Las frases enojadas, tóxicas, agresivas, coquetas o cariñosas no alteran puntería, obediencia, velocidad, curación o aggro.

Los perfiles previos pueden mantener sus tonos originales por defecto (ALERCE sereno, TORNO analítico, FARO cercano/nervioso, BRUMA reservada/cálida). Otras combinaciones son opciones de diseño, sin cambiar sus recuerdos. Vincularlos con los sprites femeninos cuando Iván los entregue; no declarar un catálogo visual terminado.

## 2. Disparadores comunes

Cada personalidad dispone de veinte variantes distribuidas en quince contextos compartidos; algunas son alternativas para eventos comunes. No son una conversación que deba recitarse en orden. Las seis personalidades añadidas mantienen estos mismos contextos y límites.

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
| 16 | Apoyo durante D1–D4, compañero operativo |
| 17 | Papel amarillo visible en el escenario actual, D1–D4 |
| 18 | Vida baja real del jugador, sin repetir por cada golpe |
| 19 | D5, miedo y apoyo; nunca huida automática |
| 20 | Victoria confirmada |

Las líneas 03–09, 12 y 16–18 son comentarios ambientales para D1–D4 y contexto tranquilo cuando corresponda. En D5 seleccionar 10/11/13–15/19–20 solo si cumplen su evento; suprimir bromas y charla doméstica. Las líneas tácticas jamás sustituyen el aviso oficial de retirada o de ataques del jefe.

Se heredan burbujas de texto, control de repetición, prioridad de peligro, alias futuro y guardado del V1. Si un marcador no puede resolverse, elegir otra línea; no mostrar llaves ni inferir armas de la colección. Para el refuerzo exterior, filtrar por el escenario actual y contexto permitido; su mecánica sigue propuesta, no aprobada por este banco.

Los sufijos 16–20 son alternativas dentro de condiciones ya existentes. Comparten sus disparadores, prioridad y control de frecuencia; no crean eventos, intervenciones adicionales garantizadas ni cambios de comportamiento.

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

| Personalidad | Variante femenina aprobada | Variante masculina aprobada |
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

### Presentaciones por tono — textos aprobados

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

## 6. Ampliación de voz — variantes adicionales

23/10/2026 · **Textos aprobados por Iván.** Estas variantes hacen más reconocible el tono de cada perfil en momentos ya contemplados. Se pueden combinar con cualquier género y biografía, porque no añaden recuerdos personales ni cambian la identidad del NPC.

### Sarcástica — SARC

| ID | Condición | Texto |
|---|---|---|
| SARC-16 | Apoyo operativo D1–D4 | «Si algo sale mal, prometo quejarme después. Ahora sigamos juntos.» |
| SARC-17 | Papel amarillo visible D1–D4 | «Otra pared amarilla. Empiezo a sospechar que aquí nadie conocía otro color.» |
| SARC-18 | Vida baja real del jugador | «Oye, en serio: estás muy mal. Mira bien el siguiente paso.» |
| SARC-19 | Miedo y apoyo D5 | «No tengo una broma para esto. Tengo miedo, pero sigo aquí contigo.» |
| SARC-20 | Victoria confirmada | «Ganamos. Qué fastidio tener que admitir que trabajar en equipo sirve.» |

### Enojada — ENOJ

| ID | Condición | Texto |
|---|---|---|
| ENOJ-16 | Apoyo operativo D1–D4 | «Sigo aquí, haciendo mi parte. Concéntrate en la tuya.» |
| ENOJ-17 | Papel amarillo visible D1–D4 | «Otra pared amarilla. Cuando salgamos, no pienso volver a mirar pintura.» |
| ENOJ-18 | Vida baja real del jugador | «Estás al límite. Basta de arriesgar por orgullo.» |
| ENOJ-19 | Miedo y apoyo D5 | «Tengo miedo. No me gusta, pero sigo contigo. Vamos.» |
| ENOJ-20 | Victoria confirmada | «Se acabó. Todavía me queda enfado para rato.» |

### Entusiasta — ENTU

| ID | Condición | Texto |
|---|---|---|
| ENTU-16 | Apoyo operativo D1–D4 | «¡Seguimos juntos! Un paso atento cada vez.» |
| ENTU-17 | Papel amarillo visible D1–D4 | «Ya vi el amarillo. Voy a fijarme en algún detalle distinto.» |
| ENTU-18 | Vida baja real del jugador | «Te queda poca vida; cuidemos el siguiente paso.» |
| ENTU-19 | Miedo y apoyo D5 | «Tengo miedo. Voy a concentrarme en seguir contigo.» |
| ENTU-20 | Victoria confirmada | «¡Terminó! Esta sí es una noticia que voy a celebrar cuando salgamos.» |

### Cariñosa — CARI

| ID | Condición | Texto |
|---|---|---|
| CARI-16 | Apoyo operativo D1–D4 | «No tienes que decir nada; sigo aquí contigo.» |
| CARI-17 | Papel amarillo visible D1–D4 | «Ese amarillo cansa. Voy a buscar con la vista algo que cambie.» |
| CARI-18 | Vida baja real del jugador | «Te veo muy mal. Cuida el próximo movimiento, por favor.» |
| CARI-19 | Miedo y apoyo D5 | «Tengo miedo y quiero salir. Me ayuda saber que seguimos juntos.» |
| CARI-20 | Victoria confirmada | «Terminó. Respiremos un momento; yo también lo necesito.» |

### Simpática — SIMP

| ID | Condición | Texto |
|---|---|---|
| SIMP-16 | Apoyo operativo D1–D4 | «Me quedo contigo. Ya tendremos tiempo de hacer bromas malas cuando salgamos.» |
| SIMP-17 | Papel amarillo visible D1–D4 | «Este amarillo ya casi merece que le pongamos nombre. Casi.» |
| SIMP-18 | Vida baja real del jugador | «Oye, se te nota el desgaste. Cuida el siguiente paso.» |
| SIMP-19 | Miedo y apoyo D5 | «No encuentro un chiste para esto. Tengo miedo y quiero salir.» |
| SIMP-20 | Victoria confirmada | «¡Terminó! Ahora sí puedo tener una conversación aburridísima.» |

### Serena — SERE

| ID | Condición | Texto |
|---|---|---|
| SERE-16 | Apoyo operativo D1–D4 | «Sigo a tu lado. Mantengamos la atención.» |
| SERE-17 | Papel amarillo visible D1–D4 | «El amarillo no basta para orientarse. Seguiré observando.» |
| SERE-18 | Vida baja real del jugador | «Tu vida está baja. Decide con cuidado el próximo movimiento.» |
| SERE-19 | Miedo y apoyo D5 | «Tengo miedo. Quiero volver. Sigo aquí.» |
| SERE-20 | Victoria confirmada | «Terminó. Dejemos pasar un segundo antes de hablar.» |

### Nerviosa — NERV

| ID | Condición | Texto |
|---|---|---|
| NERV-16 | Apoyo operativo D1–D4 | «¿Sigues ahí? Perdona, te veo. Necesitaba comprobarlo en voz alta.» |
| NERV-17 | Papel amarillo visible D1–D4 | «Otra pared amarilla. O quizá solo me lo parece… no, sí, es amarilla.» |
| NERV-18 | Vida baja real del jugador | «Estás muy mal. Perdona, tenía que decírtelo.» |
| NERV-19 | Miedo y apoyo D5 | «Tengo miedo. Quiero salir. Voy a seguir ayudando, aunque me cueste.» |
| NERV-20 | Victoria confirmada | «¿Ya terminó? Creo que ahora sí puedo respirar un poco.» |

### Analítica — ANAL

| ID | Condición | Texto |
|---|---|---|
| ANAL-16 | Apoyo operativo D1–D4 | «La cooperación sigue siendo nuestra mejor opción disponible.» |
| ANAL-17 | Papel amarillo visible D1–D4 | «El papel amarillo persiste. Necesitamos otra referencia observable.» |
| ANAL-18 | Vida baja real del jugador | «Tu vida está baja. Cada siguiente movimiento cuenta.» |
| ANAL-19 | Miedo y apoyo D5 | «Tengo miedo y quiero volver. Sigo ayudando mientras pueda.» |
| ANAL-20 | Victoria confirmada | «La victoria está confirmada. Por fin hay un momento para bajar la tensión.» |

Estas frases no autorizan a narrar una acción no observada. En D5, las líneas 19 comunican miedo y deseo de volver, pero el personaje continúa con su conducta normal hasta el momento reglado. Si coincide un aviso de peligro o retirada, prevalece el aviso oficial; se aplica el mismo enfriamiento y selección que al resto del banco.

### Tóxica — TOXI

El tono tóxico es una opción de caracterización deliberadamente áspera. Puede culpar, manipular o intentar controlar la conversación con palabras, pero no amenaza al jugador, no sabotea el combate ni bloquea ayuda. No se presenta como un trato deseable o romántico.

| ID | Condición | Texto |
|---|---|---|
| TOXI-01 | Llegada D1–D4 | «Soy {nombre_npc}. Procura no hacerme arrepentirme de compartir este sitio contigo.» |
| TOXI-02 | Apoyo operativo D1–D4 | «No te acostumbres a que tenga paciencia. Sigue haciendo tu parte.» |
| TOXI-03 | Arma propia conocida | «Me asignaron {arma_npc}. Al menos una de las dos cosas aquí está bajo mi control.» |
| TOXI-04 | Arma del jugador equipada | «Llevas {arma_jugador}. Espero que la elección haya sido tuya y no un impulso.» |
| TOXI-05 | Ataque balístico del jugador observado | «Vi ese disparo. No te voy a felicitar por hacer lo que se esperaba.» |
| TOXI-06 | Papel amarillo visible D1–D4 | «Otra pared amarilla. Hasta este lugar repite sus ideas.» |
| TOXI-07 | Pasillos repetidos observables | «Si volvemos a pasar por aquí, espero que al menos lo hayas notado.» |
| TOXI-08 | Calma D1–D4, recuerdo personal | «En casa nadie me pide explicaciones por cada minuto de silencio. Lo extraño.» |
| TOXI-09 | Calma D1–D4, recuerdo personal | «Quiero volver a mi espacio. Aquí todo el mundo exige algo.» |
| TOXI-10 | Vida baja real del jugador | «Estás en problemas. No me obligues a cargar también con tus errores.» |
| TOXI-11 | Reserva de apoyo agotada | «Se acabó mi munición de apoyo. No esperes que lo arregle con palabras.» |
| TOXI-12 | Ánimo D1–D4 con alias | «{nombre_jugador}, todavía podemos salir bien de esta. No lo arruines.» |
| TOXI-13 | Llegada D5, miedo y deseo de irse | «Soy {nombre_npc}. Tengo miedo y quiero irme. No confundas eso con confiar en ti.» |
| TOXI-14 | D5, miedo y apoyo | «Tengo miedo. Sigo ayudando porque dejarte aquí sería peor.» |
| TOXI-15 | Victoria confirmada | «Ganamos. No conviertas eso en una excusa para presumir.» |
| TOXI-16 | Apoyo operativo D1–D4 | «Haz lo que te toca y yo haré lo mío. No necesito que me lo agradezcas.» |
| TOXI-17 | Papel amarillo visible D1–D4 | «Ese amarillo ya cansa. No, no es una invitación a opinar.» |
| TOXI-18 | Vida baja real del jugador | «Mírame cuando te hablo: cuida el siguiente movimiento.» |
| TOXI-19 | D5, miedo y apoyo | «No me gusta necesitar compañía. Igual, no voy a dejar de ayudarte ahora.» |
| TOXI-20 | Victoria confirmada | «Terminó. Por una vez, no voy a discutir quién hizo más.» |

### Amorosa — AMOR

El cariño puede ser de compañera y amistad; las frases no dan por hecho una pareja ni una historia compartida.

| ID | Condición | Texto |
|---|---|---|
| AMOR-01 | Llegada D1–D4 | «Soy {nombre_npc}. Me alegra encontrarte; no tienes que pasar esto sin compañía.» |
| AMOR-02 | Apoyo operativo D1–D4 | «Estoy aquí contigo. Vamos con calma, paso a paso.» |
| AMOR-03 | Arma propia conocida | «Me asignaron {arma_npc}. Voy a cuidarla y a hacer mi parte.» |
| AMOR-04 | Arma del jugador equipada | «Veo que llevas {arma_jugador}. Me alegra que hayas encontrado algo que te acomode.» |
| AMOR-05 | Ataque balístico del jugador observado | «Escuché tu disparo. Me tranquiliza saber que seguimos en equipo.» |
| AMOR-06 | Papel amarillo visible D1–D4 | «Tanto amarillo… ojalá pudiera ofrecerte una vista más amable.» |
| AMOR-07 | Pasillos repetidos observables | «Se parecen mucho. Me fijaré en lo que sí cambie.» |
| AMOR-08 | Calma D1–D4, recuerdo personal | «Echo de menos llegar a casa y poder preguntar cómo estuvo el día.» |
| AMOR-09 | Calma D1–D4, recuerdo personal | «Quiero volver a compartir una comida tranquila con la gente que quiero.» |
| AMOR-10 | Vida baja real del jugador | «Te veo con poca vida. Cuídate; me importa que sigas aquí.» |
| AMOR-11 | Reserva de apoyo agotada | «Mi munición de apoyo se agotó. Quería decírtelo con tiempo.» |
| AMOR-12 | Ánimo D1–D4 con alias | «{nombre_jugador}, me alegra que estemos haciendo esto en equipo.» |
| AMOR-13 | Llegada D5, miedo y deseo de irse | «Soy {nombre_npc}. Tengo mucho miedo y quiero volver. Me quedaré contigo.» |
| AMOR-14 | D5, miedo y apoyo | «Tengo miedo. No puedo quitarlo, pero sí acompañarte mientras sigamos aquí.» |
| AMOR-15 | Victoria confirmada | «Terminó. Me alegra que podamos pensar en volver.» |
| AMOR-16 | Apoyo operativo D1–D4 | «Si necesitas silencio, está bien. Sigo aquí contigo.» |
| AMOR-17 | Papel amarillo visible D1–D4 | «Ese papel no hace más amable el lugar. Al menos puedo observarlo contigo.» |
| AMOR-18 | Vida baja real del jugador | «Por favor, ve con cuidado. No tienes que demostrarme nada.» |
| AMOR-19 | D5, miedo y apoyo | «Quiero salir de aquí. Mientras tanto, no estás pasando el miedo a solas.» |
| AMOR-20 | Victoria confirmada | «Lo logramos. Me gustaría que pudiéramos descansar un momento.» |

### Coqueta — COQ

El coqueteo es ligero y opcional en el tono, nunca una señal de relación, consentimiento o respuesta recíproca del jugador.

| ID | Condición | Texto |
|---|---|---|
| COQ-01 | Llegada D1–D4 | «Soy {nombre_npc}. Qué manera tan peculiar de conocernos, ¿no?» |
| COQ-02 | Apoyo operativo D1–D4 | «No te distraigas por mí. Bueno… no demasiado.» |
| COQ-03 | Arma propia conocida | «Me tocó {arma_npc}. Tiene su encanto; yo también, dicen.» |
| COQ-04 | Arma del jugador equipada | «Esa {arma_jugador} te queda bien. Casi tanto como la seguridad con que la llevas.» |
| COQ-05 | Ataque balístico del jugador observado | «Buen disparo. Iba a decir que me impresionaste, pero no quiero que te acostumbres.» |
| COQ-06 | Papel amarillo visible D1–D4 | «Este amarillo no le favorece a nadie. Menos mal que no vinimos a un desfile.» |
| COQ-07 | Pasillos repetidos observables | «Otro pasillo igual. Si me pierdo, al menos tendré compañía interesante.» |
| COQ-08 | Calma D1–D4, recuerdo personal | «En casa extraño las conversaciones largas. Aquí cuesta encontrar el momento.» |
| COQ-09 | Calma D1–D4, recuerdo personal | «Quiero volver a arreglarme sin pensar si combina con una emergencia.» |
| COQ-10 | Vida baja real del jugador | «Oye, quédate conmigo. Todavía me debes una conversación tranquila.» |
| COQ-11 | Reserva de apoyo agotada | «Se acabó mi munición de apoyo. Mi encanto tampoco es infinito.» |
| COQ-12 | Ánimo D1–D4 con alias | «{nombre_jugador}, procura seguir así. Me gusta tenerte cerca en el equipo.» |
| COQ-13 | Llegada D5, miedo y deseo de irse | «Soy {nombre_npc}. Tengo miedo y quiero salir. Ya habrá tiempo para conocernos mejor.» |
| COQ-14 | D5, miedo y apoyo | «Tengo miedo. Ahora necesito que nos concentremos en salir de esta.» |
| COQ-15 | Victoria confirmada | «Ganamos. Admito que haces buena compañía bajo presión.» |
| COQ-16 | Apoyo operativo D1–D4 | «Una buena compañía mejora cualquier pasillo. Este sigue siendo espantoso.» |
| COQ-17 | Papel amarillo visible D1–D4 | «Si el lugar intenta impresionarme con ese color, tendrá que esforzarse más.» |
| COQ-18 | Vida baja real del jugador | «No te me adelantes con riesgos; todavía te debo una conversación.» |
| COQ-19 | D5, miedo y apoyo | «Tengo miedo. El coqueteo puede esperar; ahora sigamos juntos.» |
| COQ-20 | Victoria confirmada | «Terminó. Tal vez la próxima vez podamos conocernos en un sitio menos horrible.» |

### Fría — FRIA

| ID | Condición | Texto |
|---|---|---|
| FRIA-01 | Llegada D1–D4 | «{nombre_npc}. Estoy contigo. Observemos antes de movernos.» |
| FRIA-02 | Apoyo operativo D1–D4 | «Sigo aquí. Mantén la atención.» |
| FRIA-03 | Arma propia conocida | «Mi arma es {arma_npc}. Conozco su funcionamiento.» |
| FRIA-04 | Arma del jugador equipada | «Veo {arma_jugador}. Tomo nota.» |
| FRIA-05 | Ataque balístico del jugador observado | «Disparo observado. No asumiré que el área está despejada.» |
| FRIA-06 | Papel amarillo visible D1–D4 | «Papel amarillo. Sin otra referencia, no aporta orientación.» |
| FRIA-07 | Pasillos repetidos observables | «Diseño repetido. No confirma que sea el mismo pasillo.» |
| FRIA-08 | Calma D1–D4, recuerdo personal | «En casa, el silencio no requería vigilancia. Lo echo de menos.» |
| FRIA-09 | Calma D1–D4, recuerdo personal | «Quiero volver a una rutina que no dependa de esta misión.» |
| FRIA-10 | Vida baja real del jugador | «Tu vida está baja. Ajusta el siguiente movimiento.» |
| FRIA-11 | Reserva de apoyo agotada | «Munición de apoyo agotada. No cuentes con más disparos míos.» |
| FRIA-12 | Ánimo D1–D4 con alias | «{nombre_jugador}, sigo contigo. Mantén el foco.» |
| FRIA-13 | Llegada D5, miedo y deseo de irse | «{nombre_npc}. Tengo miedo. Quiero salir.» |
| FRIA-14 | D5, miedo y apoyo | «Siento miedo. Continúo ayudando hasta que podamos irnos.» |
| FRIA-15 | Victoria confirmada | «Victoria confirmada. El peligro de este encuentro terminó.» |
| FRIA-16 | Apoyo operativo D1–D4 | «No hace falta hablar. Mantén la atención.» |
| FRIA-17 | Papel amarillo visible D1–D4 | «El color se repite. Buscaré una diferencia verificable.» |
| FRIA-18 | Vida baja real del jugador | «Estás en una condición crítica. Evita un riesgo innecesario.» |
| FRIA-19 | D5, miedo y apoyo | «Quiero salir. Tengo miedo. Sigo aquí.» |
| FRIA-20 | Victoria confirmada | «Terminó. Podemos bajar la tensión.» |

### Agresiva — AGRE

La agresividad se expresa como intensidad y desafío; las frases no autorizan daño entre aliados ni modifican el comportamiento del NPC.

| ID | Condición | Texto |
|---|---|---|
| AGRE-01 | Llegada D1–D4 | «Soy {nombre_npc}. No pienso dejar que este lugar nos intimide.» |
| AGRE-02 | Apoyo operativo D1–D4 | «¡Seguimos en equipo! No aflojes ahora.» |
| AGRE-03 | Arma propia conocida | «Traigo {arma_npc}. Ya sé cómo manejarla.» |
| AGRE-04 | Arma del jugador equipada | «Veo tu {arma_jugador}. Úsala con decisión.» |
| AGRE-05 | Ataque balístico del jugador observado | «¡Ese disparo sí se hizo notar!» |
| AGRE-06 | Papel amarillo visible D1–D4 | «Otra pared amarilla. Ya me cansé de que este lugar intente imponerse.» |
| AGRE-07 | Pasillos repetidos observables | «Otra vez un pasillo igual. No voy a dejar que me haga dudar.» |
| AGRE-08 | Calma D1–D4, recuerdo personal | «En casa también discutía por tonterías. Al menos allí podía cerrar la puerta.» |
| AGRE-09 | Calma D1–D4, recuerdo personal | «Extraño tener una tarde libre y decidir yo qué hacer con ella.» |
| AGRE-10 | Vida baja real del jugador | «¡Estás mal! Deja de regalarle oportunidades al próximo golpe.» |
| AGRE-11 | Reserva de apoyo agotada | «Sin munición de apoyo. Tendré que medir mejor lo que queda.» |
| AGRE-12 | Ánimo D1–D4 con alias | «{nombre_jugador}, sigamos firmes. Este sitio no va a decidir por nosotros.» |
| AGRE-13 | Llegada D5, miedo y deseo de irse | «Soy {nombre_npc}. Tengo miedo y quiero irme. No voy a fingir lo contrario.» |
| AGRE-14 | D5, miedo y apoyo | «Tengo miedo. Aun así, sigo aquí y voy a hacer mi parte.» |
| AGRE-15 | Victoria confirmada | «¡Eso es! Terminó este encuentro.» |
| AGRE-16 | Apoyo operativo D1–D4 | «No te quedes mirando. Seguimos juntos; haz tu parte.» |
| AGRE-17 | Papel amarillo visible D1–D4 | «El amarillo no me impresiona. Sigamos atentos.» |
| AGRE-18 | Vida baja real del jugador | «¡Cuida el siguiente paso! No quiero verte caer por apurarte.» |
| AGRE-19 | D5, miedo y apoyo | «Quiero salir tanto como tú. Mientras sigamos aquí, no aflojo.» |
| AGRE-20 | Victoria confirmada | «Se acabó. Que quede claro: el miedo no nos detuvo.» |

### Enojona — GRUN

GRUN se irrita a menudo por inconvenientes pequeños y lo comenta con fastidio. ENOJ mantiene un enojo más firme y enfocado; no son la misma voz.

| ID | Condición | Texto |
|---|---|---|
| GRUN-01 | Llegada D1–D4 | «Soy {nombre_npc}. Y sí, también me molesta que nos conozcamos aquí.» |
| GRUN-02 | Apoyo operativo D1–D4 | «Aquí sigo. No me hagas repetirlo, por favor.» |
| GRUN-03 | Arma propia conocida | «Me dieron {arma_npc}. Podrían haberme avisado antes, pero bueno.» |
| GRUN-04 | Arma del jugador equipada | «Llevas {arma_jugador}. Espero que no tenga otro problema escondido.» |
| GRUN-05 | Ataque balístico del jugador observado | «Ese disparo retumbó muchísimo. Sí, ya sé que era necesario.» |
| GRUN-06 | Papel amarillo visible D1–D4 | «Amarillo otra vez. Como si el lugar no tuviera ya suficientes problemas.» |
| GRUN-07 | Pasillos repetidos observables | «Otro pasillo igual. Qué sorpresa tan poco sorprendente.» |
| GRUN-08 | Calma D1–D4, recuerdo personal | «Extraño quejarme en casa por cosas que sí tenían arreglo.» |
| GRUN-09 | Calma D1–D4, recuerdo personal | «Quiero volver a mi cama. Esta pausa de pie no cuenta como descanso.» |
| GRUN-10 | Vida baja real del jugador | «Estás mal. No me gusta tener que repetir que vayas con cuidado.» |
| GRUN-11 | Reserva de apoyo agotada | «Se acabó mi munición de apoyo. Sí, ya sé, qué momento.» |
| GRUN-12 | Ánimo D1–D4 con alias | «{nombre_jugador}, sigamos. Quejarme no va a sacarnos de aquí.» |
| GRUN-13 | Llegada D5, miedo y deseo de irse | «Soy {nombre_npc}. Tengo miedo y quiero irme. Encima, tenía que ser aquí.» |
| GRUN-14 | D5, miedo y apoyo | «Tengo miedo. No me pidas que me guste; sigo ayudando igual.» |
| GRUN-15 | Victoria confirmada | «Terminó. Bien. Ya puedo quejarme con menos urgencia.» |
| GRUN-16 | Apoyo operativo D1–D4 | «No estoy de mal humor contigo. Bueno, no especialmente. Sigamos.» |
| GRUN-17 | Papel amarillo visible D1–D4 | «Si veo otra pared amarilla, voy a poner los ojos en blanco. Otra vez.» |
| GRUN-18 | Vida baja real del jugador | «No me hagas preocuparme más. Cuida ese siguiente movimiento.» |
| GRUN-19 | D5, miedo y apoyo | «Quiero salir. Tengo miedo. Y sí, sigo contigo aunque refunfuñe.» |
| GRUN-20 | Victoria confirmada | «Sobrevivimos. Ahora solo quiero una silla y cinco minutos sin ruido.» |

Estas seis voces se pueden asignar a modelos femeninos sin vincular sus rasgos a la silueta o al cuerpo. AMOR no exige romance; COQ no presupone reciprocidad; TOXI caracteriza una conducta áspera sin otorgarle poder sobre el jugador; AGRE transmite intensidad sin agresión entre aliados; FRIA siente miedo en D5 aunque lo exprese con pocas palabras; GRUN es una voz gruñona cotidiana, distinta de ENOJ.

## 7. Revisión previa a integración

El V2 reúne **280 frases en total**, veinte por cada una de las catorce personalidades, más **12 variantes de presentación** y ocho pares de concordancia femenina/masculina. Se suma al banco V1 de 102 variantes; las alternativas sin alias no se cuentan como nuevos IDs.

Comprobar coherencia entre tono y biografía, ausencia de promesas de acciones no disponibles, condiciones de arma/entorno, versión sin alias y miedo D5 sin huida automática. Las expresiones «prestar atención» o «me cuesta concentrarme» son narrativas, no bonificaciones o penalizaciones.

Comprobar además nombres fijos, lista compatible, ausencia de duplicados mientras haya alternativas, caso FARO/Bruno, alias ausente, una presentación por aparición y preservación al suspender. El requisito de asignar nombre y mostrar una presentación se conserva; la lista de nombres y las reglas para sortearlo siguen como propuestas. El texto de diálogos y presentaciones está aprobado, pero su integración continúa pendiente.

Los sprites femeninos los diseñará Iván. El sonido identificativo se resolverá en «sonido»; puede acompañar la burbuja sin pronunciar texto. Este banco no asigna timbres por género ni crea locuciones.
