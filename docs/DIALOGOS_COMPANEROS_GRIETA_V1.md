# Diálogos de compañeros de grieta — banco V1

**Ampliación 23/10/2026:** [personalidades y variantes femeninas V2](DIALOGOS_PERSONALIDADES_COMPANEROS_V2.md), con tonos sarcástico, enojado, entusiasta, cariñoso, simpático, sereno, nervioso y analítico. Iván diseñará los sprites femeninos. La personalidad no queda ligada al género; se conservan las biografías y condiciones de este V1.

22/10/2026 · Actualización 23/10/2026 · ESTRUCTURA. **Diseño y texto propuestos; no integrados.** Iván aceptó la mecánica del compañero y pidió variedad: reconocer armas propias y del jugador, escenario, casa y recuerdos. Añadió reconocimiento futuro del nombre del jugador.

**Formato elegido por Iván el 23/10:** diálogo mediante **burbujas de texto del NPC**, sin locuciones de las frases. Un sonido característico acompañará sus intervenciones; Iván lo diseñará posteriormente en el hilo **«sonido»**. Esta entrega no crea ni elige ese sonido. «Voces» significa personalidad y manera de escribir, no actores de voz.

Las voces y sus biografías siguientes son propuestas originales para NPC de apoyo. No sustituyen soldados del catálogo, no alteran sus estadísticas y no se presentan como personajes canónicos de SCP.

## 1. Cuatro voces persistentes

| Voz propuesta | Forma de hablar | Referencias personales coherentes |
|---|---|---|
| ALERCE | Veterano sereno, frases sencillas y prácticas | Casa con patio; su madre cultiva romero |
| TORNO | Técnico observador; se fija en equipo y sonidos | Departamento; aprendió a reparar radios en el taller de su padre |
| FARO | Recluta cercano y algo nervioso, sin caricatura | Hogar costero; perro llamado Bruno |
| BRUMA | Sanitaria reservada, escucha y cuida el tono | Vive con su hermana; tienen películas pendientes |

La voz se elige y fija al generar el NPC. No mezclar una casa de ALERCE con el perro de FARO. El rol narrativo de BRUMA no concede curación: no promete habilidades ausentes. Todos pueden expresar miedo en D5 sin huir mecánicamente.

## 2. Reglas de reconocimiento

- **Armas:** usar ID real de cada copia equipada, nombre localizado, familia y tier. Con dos armas, alternar el objeto comentado. Una guardada en colección pero no equipada no es elegible. Para comentar un disparo o efecto, debe haberse observado ese ataque, no basta con poseerlo.
- Reconocer el modelo exacto solo si existe una línea compatible. Si no, usar su mecanismo/familia validada; después una frase neutra. No convertir todo en «rifle» ni llamar balas a los rayos. No inferir lanzallamas a partir de cualquier arma tecnológica.
- Una fusión ocupa una ranura: comentar la identidad del compuesto, no decir que lleva dos componentes separados. No deducir MAX, mejoras o efectos sin comprobar su estado real.
- **Escenario:** usar rasgos del recinto actual observables: papel amarillo, agua visible, maquinaria, luces, etc. Un tag del mapa de origen no describe automáticamente la grieta. El R7 aprobado no acredita que todos los recintos tengan esas características.
- Las asociaciones personales no son pruebas físicas ni instrucciones de combate. Si no existe un disparador válido, guardar silencio o usar una frase general.
- **Nombre del jugador, requisito futuro:** usar exclusivamente su nombre visible/alias de perfil o el elegido para la partida, nunca el nombre interno del soldado como sustituto. No solicitar el nombre ahora. Si falta o no es apto para presentación, emplear una versión completa sin nombre; no mostrar llaves vacías.
- El alias se muestra como texto literal de interfaz, sin interpretar etiquetas o instrucciones. Resolver los marcadores antes de medir duración y espacio; no cortar ni deformar el nombre para hacerlo encajar. Si no cabe, elegir la versión sin nombre.
- El nombre aparece dentro de la burbuja como texto, con alternativa sin alias. No requiere pronunciación, síntesis de voz ni grabaciones. El sonido característico no tiene que pronunciar nombres ni reproducir las frases.

## 3. Frecuencia y prioridades propuestas

Avisos del juego y de la retirada única tienen prioridad. Después: peligro inmediato, entrada/salida, reacción a equipo y conversación personal. Una línea informativa caducada se descarta; no se reproduce una cola de avisos antiguos tras el combate.

Una sola frase del compañero a la vez. Propuesta inicial: separar comentarios ambientales 20–35 segundos activos, máximo tres por minuto y una historia de casa por recinto. Los avisos tácticos usan su propio control de repetición por evento, sin tapar señales críticas. Son parámetros para ensayo, no nuevos valores aprobados.

La burbuja se vincula visualmente al NPC y se mantiene dentro de pantalla. Su posición debe evitar ocultar al jugador, ataques, indicadores y controles; legibilidad y duración se ajustarán al texto real. El sonido acompaña la aparición de la intervención, sin dispararse por cada letra ni repetirse al mover cámara o reanudar. Su timbre, variantes y volumen quedan para «sonido»; ese detalle de activación es recomendación de integración. Las frases deben entenderse con el sonido silenciado.

Casa y recuerdos solo en D1–D4, con compañero operativo, sin jefe atacando ni peligro inmediato. En D5 suprimir charla relajada, bromas y entusiasmo por la rareza: usar miedo, concentración y deseo de volver. No repetir literalmente una frase durante la expedición hasta agotar sus alternativas elegibles. Variar también categorías: no encadenar tres comentarios sobre armas.

Propuesta para el alias: como máximo una intervención con nombre cada 60 segundos activos y dos por encuentro; no añadirlo por rutina a todas las líneas. La presentación del NPC y la línea personal no requieren una respuesta del jugador ni menú de diálogo.

Guardar voz, historial, enfriamientos, relato personal usado y eventos disparados al suspender; reanudar no repite la bienvenida ni inventa otra biografía. El nombre mostrado puede actualizarse entre encuentros desde el perfil; una frase ya visible conserva su texto hasta terminar.

## 4. Banco de frases

Cada ID identifica una variante, no una secuencia obligatoria. Los textos con condición solo se habilitan si esta se cumple. Las frases de equipo y escenario son ejemplos de reconocimiento, no una aprobación de armas nuevas o de geometrías aún sin integrar.

### Llegada y compañía

| ID | Condición | Texto |
|---|---|---|
| LLE-01 | Entrada D1–D3 | «Contención en posición. Ya tienes compañía en esto.» |
| LLE-02 | Entrada D1–D3 | «Te vi cruzar. Pensé que vendría bien otra persona aquí.» |
| LLE-03 | Entrada D1–D3 | «Vamos paso a paso. Primero, entender dónde estamos.» |
| LLE-04 | Entrada D1–D3 | «Mantén tu espacio. Yo intentaré cubrir el mío.» |
| LLE-05 | Entrada D4 | «Esto es serio. No nos confiemos por llevar buen equipo.» |
| LLE-06 | Entrada D4 | «Estoy contigo. Si ves algo extraño, no lo pierdas de vista.» |

### Su propia arma

| ID | Condición | Texto |
|---|---|---|
| PRO-01 | NPC con pistola | «Mi pistola es sencilla. Prefiero conocerla bien que presumir del equipo.» |
| PRO-02 | NPC con pistola | «Una pistola de servicio. Es lo que pude traer.» |
| PRO-03 | NPC con subfusil | «Traje el subfusil. Voy a cuidar las ráfagas.» |
| PRO-04 | NPC con subfusil | «Con este gasto munición rápido. No pienso desperdiciarla.» |
| PRO-05 | NPC con escopeta | «Llevo escopeta. Si me ves acercarme, es por eso.» |
| PRO-06 | NPC con escopeta | «Me gusta esta escopeta. El ruido, bastante menos.» |
| PRO-07 | NPC con arma Rara, D4 | «Esta requisición era rara de ver en el depósito. Espero aprovecharla.» |
| PRO-08 | NPC con arma Épica, D4 | «Hoy me autorizaron equipo especial. Ojalá no sea una mala señal.» |
| PRO-09 | NPC con balística | «La revisé antes de entrar. Aun así, voy contando los disparos.» |
| PRO-10 | NPC con emisor energético | «Voy vigilando el emisor. No quiero sorpresas también en mis manos.» |
| PRO-11 | NPC con arma, nombre localizado disponible | «Me asignaron {arma_npc}. Ya veremos cómo nos entendemos aquí dentro.» |
| PRO-12 | Reserva de apoyo del NPC agotada | «Me quedé sin munición de apoyo. El arma no va a sacarnos de esta sola.» |

### Armas del jugador

Los IDs AF/CC/TE remiten al catálogo de ARMAS: [datos de referencia](referencias/armas/armas-v1/DATOS_DISENO_ARMAS_V1.json). Las condiciones deben mapearse a IDs del runtime antes de integrar.

| ID | Condición | Texto |
|---|---|---|
| JUG-01 | AF01, Pistola de servicio equipada | «Esa es la Pistola de servicio. Al menos traemos algo familiar.» |
| JUG-02 | AF02, Subfusil de pasillo equipado | «Un Subfusil de pasillo. El nombre empieza a tener sentido aquí.» |
| JUG-03 | AF03, Escopeta de guardia equipada | «Veo tu Escopeta de guardia. Intentaré no cruzarme delante.» |
| JUG-04 | CC01, Porra de seguridad equipada | «¿Una Porra de seguridad? Vas a tener que acercarte mucho.» |
| JUG-05 | CC04, Katana de contención equipada | «Reconozco esa Katana de contención. Nunca me acostumbré a verla en servicio.» |
| JUG-06 | TE01, Emisor láser equipado | «Llevas el Emisor láser. Me interesa verlo funcionando.» |
| JUG-07 | Jugador lanza granada observada | «Vi la granada. Voy a prestar atención a dónde las lanzas.» |
| JUG-08 | Jugador usa lanzallamas observado | «Ese lanzallamas se reconoce incluso sin mirarlo.» |
| JUG-09 | Ataque de ballesta observado | «¿Una ballesta? No era lo primero que esperaba encontrar aquí.» |
| JUG-10 | Fusil de precisión equipado | «Traes precisión. Yo procuraré no estorbarte la vista.» |
| JUG-11 | Jugador con arma Legendaria, D1–D4 | «Ese equipo no lo entregan todos los días. Igual, cuidado con confiarse.» |
| JUG-12 | Modelo equipado conocido, otra línea específica no disponible | «Veo que llevas {arma_jugador}. Yo no he trabajado con ese modelo.» |

### Parejas, fusión y cambios reales

| ID | Condición | Texto |
|---|---|---|
| EQU-01 | Pistola y katana equipadas | «Pistola y katana. Se nota que preparaste dos formas de responder.» |
| EQU-02 | Dos copias de la misma arma equipadas | «Llevas dos del mismo modelo. Espero que te entiendas bien con él.» |
| EQU-03 | Balística y emisor energético equipados | «Una de balas y otra de energía. No suena a un equipo aburrido.» |
| EQU-04 | Compuesto fusionado equipado | «Esa fusión no se parece al equipo que me enseñaron a revisar.» |
| EQU-05 | Jugador alcanza MAX real con compañero presente | «Acabas de llevar esa arma a su máximo. Buen momento para conocer sus límites.» |
| EQU-06 | Cambio de arma real y observado, si existe en ese recinto | «Cambiaste de equipo. Tendré que acostumbrarme al nuevo ritmo.» |

### Recinto observado

| ID | Condición visible en recinto actual | Texto |
|---|---|---|
| ESC-01 | Papel mural amarillo | «Ese papel amarillo… ya me cansé de verlo y acabamos de llegar.» |
| ESC-02 | Zumbido de fluorescentes audible | «Escucho el zumbido incluso cuando intento ignorarlo.» |
| ESC-03 | Alfombra húmeda visible | «Esa alfombra parece empapada. No quisiera saber desde cuándo.» |
| ESC-04 | Pasillos repetidos visibles | «Dos pasillos casi iguales. Voy a fijarme en las marcas.» |
| ESC-05 | Sala amplia visible | «Por fin algo de espacio. Me estaba cansando de las esquinas.» |
| ESC-06 | Maquinaria visible | «Mi padre llamaría a eso una reparación larga. Yo ni sabría por dónde empezar.» |
| ESC-07 | Agua visible | «No me gusta no ver qué hay bajo esa agua.» |
| ESC-08 | Tubos o conductos visibles | «Tantos conductos y ninguna señal de quién los mantiene.» |
| ESC-09 | Señalización contradictoria comprobada | «Los letreros no se ponen de acuerdo. No voy a confiarles nuestra salida.» |
| ESC-10 | Ventana sin exterior observable | «Esa ventana no me ayuda a entender dónde estamos.» |
| ESC-11 | Restos de oficina visibles | «Escritorios, carpetas… casi parece un sitio donde alguien trabajaba.» |
| ESC-12 | Rasgos insuficientes para línea específica | «Estoy intentando quedarme con algún detalle que no se repita.» |

ESC-06 solo para TORNO, coherente con su padre y el taller; las demás son compatibles con cualquier voz. Las frases no prueban que el recinto sea seguro ni que las anomalías obedezcan esas observaciones.

### Casa y recuerdos — solo con calma D1–D4

| ID | Voz | Texto |
|---|---|---|
| CASA-01 | ALERCE | «El romero de mi madre se huele desde la puerta del patio.» |
| CASA-02 | ALERCE | «En casa, mi madre sigue cuidando el romero. No sé cómo le dura tanto.» |
| CASA-03 | ALERCE | «Mi patio es pequeño. Igual alcanza para sentarse sin escuchar una radio.» |
| CASA-04 | ALERCE | «En casa limpio el equipo despacio. Aquí siempre parece faltar tiempo.» |
| CASA-05 | ALERCE | «Echo de menos sentarme fuera sin tener que vigilar cada sombra.» |
| CASA-06 | ALERCE | «Mi madre dice que riego demasiado el romero. Tiene razón, seguramente.» |
| CASA-07 | TORNO | «Mi padre guardaba radios rotas en el taller. Así aprendí a repararlas.» |
| CASA-08 | TORNO | «Dejé una taza junto al fregadero del departamento. Ahora hasta eso extraño.» |
| CASA-09 | TORNO | «En el taller siempre sobraban piezas. Menos la que necesitábamos.» |
| CASA-10 | TORNO | «A veces llego al departamento y dejo la radio encendida, aunque no escuche.» |
| CASA-11 | TORNO | «Mi padre podía encontrar una estación clara entre puro ruido.» |
| CASA-12 | TORNO | «Tengo una radio a medio reparar en casa. Me gustaría terminarla.» |
| CASA-13 | FARO | «En la costa reconocía el tiempo por el olor del aire.» |
| CASA-14 | FARO | «Bruno le ladra al mar. Todavía cree que alguna ola le va a responder.» |
| CASA-15 | FARO | «Dejé la correa de Bruno junto a la puerta, como siempre.» |
| CASA-16 | FARO | «Echo de menos volver con arena en los zapatos. Esto es bastante peor.» |
| CASA-17 | FARO | «Cuando vuelva, a Bruno le toca un paseo largo. Me vendrá bien a mí también.» |
| CASA-18 | FARO | «Bruno busca sombra incluso cuando está nublado. No le discuto.» |
| CASA-19 | BRUMA | «Mi hermana y yo tenemos una lista de películas que nunca terminamos.» |
| CASA-20 | BRUMA | «En casa a veces no hablamos. Nos sentamos juntas y basta.» |
| CASA-21 | BRUMA | «Nos toca elegir película por turnos. Siempre acabamos discutiendo igual.» |
| CASA-22 | BRUMA | «Mi hermana guarda sitio en el sofá aunque llegue tarde.» |
| CASA-23 | BRUMA | «La próxima película la elegí yo. No pienso perdérmela.» |
| CASA-24 | BRUMA | «Echo de menos escuchar a alguien quejarse de un final malo.» |

### Apoyo y estados reales de combate

| ID | Condición | Texto |
|---|---|---|
| COM-01 | Compañero inicia ataque válido | «Estoy contigo. Sigue atento a lo tuyo.» |
| COM-02 | Jugador recibe daño, sin repetir por cada golpe | «Te alcanzó. No hace falta recuperarlo todo de una vez.» |
| COM-03 | Vida baja real del jugador | «Te veo mal. Cuida el siguiente movimiento.» |
| COM-04 | Recarga real del NPC | «Estoy recargando.» |
| COM-05 | Jefe entra en fase nueva observada | «Cambió el patrón. No demos nada por hecho.» |
| COM-06 | Enemigo efectivamente derrotado por jugador | «Uno menos. Mantén la atención.» |
| COM-07 | Compañero queda incapacitado | «No puedo seguir combatiendo. Tendrás que terminarlo.» |
| COM-08 | Jugador elude ataque detectado por el sistema | «Bien esquivado. Sigue así.» |

No habilitar COM-08 sin un evento de esquiva fiable. COM-04 no se usa para armas sin recarga; PRO-12 requiere la reserva agotada. No inventar escudos, curación, rutas seguras o acciones cooperativas para justificar una frase.

### Miedo D5

| ID | Voz | Texto |
|---|---|---|
| MIE-01 | ALERCE | «Quiero volver al patio de casa. Tengo miedo, pero sigo aquí contigo.» |
| MIE-02 | TORNO | «Quiero salir de aquí. Me cuesta admitirlo, pero tengo miedo.» |
| MIE-03 | FARO | «Quisiera estar en la costa con Bruno. Esto me supera… pero te ayudo.» |
| MIE-04 | BRUMA | «Quiero volver a casa con mi hermana. Tengo miedo. Vamos a concentrarnos.» |
| MIE-05 | Cualquiera, llegada D5 | «Ni con esta arma me siento preparado. No quiero quedarme aquí.» |
| MIE-06 | Cualquiera, D5 | «Me están temblando las manos. Sigo contigo, solo… no me dejes atrás.» |
| MIE-07 | Cualquiera, D5 | «Tengo equipo de primera y solo pienso en irme. Eso debería decirnos algo.» |
| MIE-08 | Cualquiera, D5 | «Quiero que esto termine. Voy a seguir ayudando mientras pueda.» |

El temblor expresado no añade penalización de puntería. Estas frases no activan huida, otra puerta ni una retirada antes del momento reglado. Una línea de llegada puede expresar miedo; el resto sigue la frecuencia y prioridad del sistema.

### Final y retirada

| ID | Condición | Texto |
|---|---|---|
| FIN-01 | Victoria confirmada, NPC operativo | «Terminó. Necesitaba escuchar otra cosa que disparos.» |
| FIN-02 | Victoria confirmada, D1–D4 | «Lo hiciste. Ahora sí puedo respirar un poco.» |
| FIN-03 | Victoria confirmada, D5 | «Por favor, volvamos. Ya tuvimos bastante.» |
| FIN-04 | Ventana de retirada realmente abierta | «La retirada está abierta. Si vas a salir, este es el momento.» |
| FIN-05 | Jugador usa retirada, NPC operativo | «Nos vamos. No voy a discutir esa decisión.» |
| FIN-06 | Retorno por victoria confirmado | «Nos vemos fuera. Esta vez quiero decirlo en serio.» |

FIN-04 no sustituye el aviso oficial ni prolonga sus cinco segundos. FIN-05 solo después de activar la retirada, sin inventar un resultado de victoria. Un incapacitado no pronuncia líneas que impliquen que sigue disparando.

### Nombre del jugador — requisito para fase posterior

| ID | Disparador | Con alias | Alternativa sin alias |
|---|---|---|---|
| NOM-01 | Llegada D1–D4 | «{nombre_jugador}, contención en posición. Estoy contigo.» | «Contención en posición. Estoy contigo.» |
| NOM-02 | Arma conocida equipada | «{nombre_jugador}, veo que llevas {arma_jugador}.» | «Veo que llevas {arma_jugador}.» |
| NOM-03 | Vida baja real | «{nombre_jugador}, cuida el siguiente paso.» | «Cuida el siguiente paso.» |
| NOM-04 | Esquiva confirmada | «Bien hecho, {nombre_jugador}. Sigue atento.» | «Bien hecho. Sigue atento.» |
| NOM-05 | Calma D1–D4 | «{nombre_jugador}, cuando salgamos, quiero escuchar algo de tu casa.» | «Cuando salgamos, quiero escuchar algo de tu casa.» |
| NOM-06 | D5 | «{nombre_jugador}, tengo miedo. No quiero quedarme aquí.» | «Tengo miedo. No quiero quedarme aquí.» |
| NOM-07 | Victoria confirmada | «Lo conseguimos, {nombre_jugador}.» | «Lo conseguimos.» |
| NOM-08 | Retirada efectivamente abierta | «{nombre_jugador}, la retirada está abierta.» | «La retirada está abierta.» |

NOM-05 es una invitación narrativa; no abre un menú ni presupone que el jugador ya contó su historia. No inferir parentescos, domicilio o nombre real del usuario a partir del alias. El alias se escribe en la burbuja; el sonido identificativo pendiente de «sonido» no necesita pronunciarlo.

## 5. Cierre de diseño y comprobaciones

Validar modelos y familias frente al equipamiento real, comentarios de ambas ranuras, fusión sin componentes ficticios, rasgos del recinto actual y fallback de modelos desconocidos. Comprobar cuatro biografías sin mezcla, calma para recuerdos, miedo en D5 y prioridad absoluta de avisos de peligro/escape.

Probar alias ausente, largo o con signos, sustitución sin marcadores visibles y lectura completa en burbujas con sonido silenciado. Revisar longitud, ubicación y legibilidad en pantalla pequeña tras sustituir nombres. El sonido identificativo y las pruebas de integración siguen pendientes; no se requieren grabaciones de las frases.

El banco contiene **102 variantes con ID único**, incluidas ocho con nombre y alternativa sin nombre; no hay obligación de decirlas todas. La redacción, nombres de NPC, frecuencia y vínculo final con modelos visuales son propuestas para revisión. La aceptación de la mecánica anterior no aprueba automáticamente cada frase nueva.
