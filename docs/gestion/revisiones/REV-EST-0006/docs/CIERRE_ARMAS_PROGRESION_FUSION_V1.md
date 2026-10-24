# Cierre de pendientes de armas — EST-ARM-001 r1 aprobada

23/10/2026 · ESTRUCTURA · **Diseño aprobado por Iván para el ensayo. Implementación y balance pendientes; sin código ni publicación en esta revisión.**

**Fuente de aprobación:** mensaje directo «acepto todo.» en ESTRUCTURA, posterior a la propuesta de cierre EST-ARM-001 r1. La aceptación abarca progresión, cifras de ensayo, fusión/F24 y contrato de animación/integración descritos aquí. Se conserva la [propuesta presentada](CIERRE_ARMAS_PROGRESION_FUSION_V1_PROPUESTA.md); el registro de evidencia es REV-EST-0005 en [CONTROL_CAMBIOS](gestion/CONTROL_CAMBIOS.md). El ID individual del mensaje no está expuesto. Cambios futuros de mecánica requieren otra revisión; esta aprobación no convierte parámetros de ensayo en balance probado.

Se resuelven progresión, primera fusión, contrato de animación y secuencia de integración. La aprobación alcanza AF01/CC04/TE01 y F24 como primer recorrido jugable; no todo el catálogo de 90 armas ni las 63 recetas. La aceptación de apariencia y las decisiones de combate mantienen su alcance propio.

## 1. Alcance ya aceptado y consolidado

La [pauta ARMAS R2](PAUTA_ARMAS.md) registra **ARM-VIS-001/R1**: Iván aprobó visualmente AF01, AR01, CC04, IN03, FR07, PE04, RU04, TE01 y AN09, más F24. Ocho direcciones por modelo en 16/32: **160 sprites**. [Aprobación](referencias/armas/armas-prueba-direccionales-v1/APROBACION.md) y [catálogo de recursos](referencias/armas/armas-prueba-direccionales-v1/catalogo.json).

Esta aceptación se consolida como alcance visual de ese lote, sin regenerar PNG ni generalizar a los 90 modelos. Los agarres estimados, animaciones, estadísticas e implementación no reciben aprobación retroactiva.

## 2. Progresión aprobada: una escala por copia

**Sustituir las cuatro ramas por 1 → 2 → 3 → 4 → 5 → MAX.** Cada arma se obtiene en nivel 1; necesita cinco mejoras para llegar a MAX, diez entre las dos. Las mejoras de arma pueden proceder de cartas o premios que ya concedan un ascenso temporal.

| Estado | Ascenso aprobado para ensayo |
|---|---|
| 1 | Comportamiento y estadísticas base del modelo |
| 2 | Daño base ×1,15 |
| 3 | Intervalo base entre ataques ×0,90; no acelera recargas automáticamente |
| 4 | Alcance base ×1,15; sin atravesar paredes ni ampliar el cupo de blancos |
| 5 | Daño base ×1,30 total; reemplaza el ×1,15 de nivel 2, no se multiplica sobre él |
| MAX | Extra propio del arma según su ficha; no aplica otro multiplicador genérico |

Son cifras concretas para ensayo, no balance probado. En futuras armas cuya mecánica no use un parámetro se redacta su ficha antes de habilitarla, sin ofrecer un ascenso que no haga nada. En las tres armas de la primera prueba se usan todos estos parámetros.

La progresión pertenece a cada **copia equipada**. Dos copias del mismo modelo suben independientemente. Reemplazar una copia comienza el arma nueva en nivel 1 y no transfiere ascensos. Lo permanente, dominio y gacha no se modifican con este cierre.

Poderes y mejoras generales conservan cinco niveles más su extra propio; ultimates, cinco permanentes. Los modificadores generales se aplican una vez sobre el resultado local del arma, también después de fusionar; no volver a aplicar dentro del compuesto los mismos bonos globales de sus componentes.

## 3. Cartas y segunda arma

- Mantener una arma inicial y máximo dos simultáneas. Segundo hueco por premio y garantía del primer jefe si sigue vacío.
- Carta **Arma**: +1 ascenso a una copia equipada elegible, elegida al azar entre las que no estén MAX.
- Carta **General**: una mejora válida de su categoría conforme a las reglas existentes.
- Carta **Libre**: otra mejora válida del conjunto habilitado, sin duplicar una opción ya presentada. Las mejoras de poderes solo son elegibles si el poder ya se obtuvo por su fuente aprobada.
- Si se agota una categoría, rellenar con alternativas válidas; si la build está completamente saturada, aplicar la salida táctica ya definida, sin inventar armas nuevas por una carta de mejora.
- Cofre que dé un ascenso: elige una copia equipada que pueda subir. No ofrece mejorar un arma ausente ni desperdicia el premio sobre una MAX.

Para facilitar una fusión, la oferta de segunda arma incluye una pareja compatible cuando exista entre los modelos desbloqueados/elegibles. El jugador puede escoger otra. No conceder permanentemente un arma no desbloqueada ni garantizar fusión cuando la colección no contenga una pareja compatible. Mostrar esta disponibilidad antes de iniciar.

La práctica local de fusión habilitará CC04 y TE01 como equipo de ensayo, sin alterar colecciones reales. No se cambian aquí probabilidades ni fuentes del gacha.

## 4. Fusión: condiciones aprobadas

1. Dos modelos distintos, ambos **MAX**, con una receta jugable habilitada. Dos copias iguales pueden equiparse, pero no fusionarse en esta primera versión.
2. **Una fusión por expedición**, no una por mapa. Sin coste en monedas, tickets, duplicados o materiales. Esta condición queda aprobada por EST-ARM-001 r1; no se deduce de la apertura única de escape de grieta.
3. Operación sin azar ni fallo. Consume las dos copias temporales, produce un compuesto **FINAL** y libera una ranura. La colección permanente permanece disponible para otras expediciones.
4. Tier del resultado: mayor entre Raro y los tiers de los componentes. La etiqueta no multiplica daño por sí sola. La ficha F24 queda Rara, coincidiendo con el aspecto aprobado.
5. FINAL no vuelve a subir cinco niveles ni se refusiona. Sustituye extras de los componentes por el comportamiento compuesto; no acumula todas sus pasivas originales.
6. La siguiente recompensa de armamento elegible permite llenar el hueco con un arma de nivel 1. El siguiente jefe lo garantiza si sigue vacío, con registro de premio único; no regala una tercera arma MAX.
7. El compuesto continúa entre mapas hasta finalizar la expedición. Si se sustituye en un terminal, no recupera sus componentes ni el uso de fusión.

### Sala y confirmación

Desde mapa 2, reservar **una estación/sala accesible por mapa mientras quede el uso**. Está prevista al generar el mapa, no aparece repetidamente por esperar. Consultarla sin cumplir requisitos no consume nada. Al usar la fusión, las futuras estaciones dejan de ofrecer la operación durante esa expedición.

La vista previa muestra componentes, niveles, resultado, tier, comportamiento que sustituye los extras y hueco liberado. Confirmación con pausa de los relojes según la regla existente; cancelar no cura, recarga, cambia azar ni consume el uso. Registrar la transacción una sola vez. El uso posterior a 5:00 respeta las reglas vigentes de esa fase, sin recuperar cooldowns congelados.

La posición concreta la resuelve NIVELES dentro de un lugar transitable; no se altera su plano aprobado desde este documento. PROGRAMACION puede reutilizar la interacción de terminal como base, con identidad y operación de fusión separadas.

## 5. Primera receta jugable: F24

**CC04 Katana de contención MAX + TE01 Emisor láser MAX → F24 Hoja fotónica de contención FINAL.**

Es la única receta nueva aprobada para habilitar en el primer ensayo. Las otras 62 conservan su condición de catálogo propuesto. No exigir rareza Épica/Legendaria, copias de gacha ni condiciones ocultas.

F24 alterna un corte físico y una proyección luminosa corta. Parámetros aprobados para ensayo: ciclo de 0,72 s, corte al 60% y proyección al 40% de un daño combinado de 36. Eso equivale a 21,6 y 14,4 puntos antes de modificadores generales.

- Corte: arco de 140°, alcance 83 unidades, máximo tres blancos por ciclo.
- Proyección: frontal, hasta 124 unidades desde el ataque y máximo dos blancos, después del corte; respeta obstáculos.
- Máximo cuatro enemigos distintos entre ambas fases. Un enemigo recibe como máximo un corte y una proyección de ese ciclo: tope 36 antes de modificadores generales.
- No hay ecos recursivos, nuevos ataques por cada impacto ni acumulación del cuarto corte de la katana y la cuarta emisión del láser originales.

El reparto es de **daño**, no el 70/30 visual núcleo/donante. Los cupos limitan los contactos de área; no se describen como una bolsa global de daño distribuida entre todos los enemigos. Esta especificación hace explícita esa semántica para F24; no reinterpreta las otras 62 recetas.

La referencia inicial de blanco único ronda 50 de daño/segundo antes de modificadores, próxima a los 50,56 de los dos componentes MAX de ensayo. Es un cálculo teórico: distancias, animación, paredes y reparto de contactos requieren pruebas. El objetivo es conservar eficacia y transformar el ataque; la ganancia de capacidad llega al rellenar la ranura liberada. No afirmar balance validado por ese cálculo.

## 6. Estadísticas suficientes para la primera prueba

Se aprueban AF01, CC04, TE01 y F24 como recorrido jugable inicial de este lote. Las otras seis armas visualmente aceptadas pueden verse en el visor de montaje, pero no se anuncian funcionales por cargar sus PNG.

| Modelo | Perfil base de ensayo |
|---|---|
| AF01 | Conservar la pistola actual: daño 10, intervalo 0,5 s, cargador 12, recarga 1,5 s, alcance 320; enlazar su ID al recurso AF01 |
| CC04 | Daño 14, intervalo 0,8 s, alcance 72, arco 140°, máximo cuatro blancos; sin cargador ni recarga de munición |
| TE01 | Daño 14, intervalo completo de emisión 0,8 s, alcance 288, haz breve 0,12 s incluido en ese intervalo, primer blanco válido; sin cargador, con pausa energética propia |
| F24 FINAL | Ciclo y límites del apartado 5, sin nueva escalera de niveles |

Extras MAX para esta práctica:

- AF01: primer disparo tras recargar añade un tiro a los 0,12 s, con 40% del daño local del arma; una vez por cargador y sin descontar otra bala de la reserva. No genera más secundarios.
- CC04: cada cuarto corte usa 180° y hasta cinco blancos; no lanza ondas ni desplaza al soldado.
- TE01: cada cuarta emisión puede alcanzar un segundo enemigo alineado; termina en él.

Son parámetros aprobados de ensayo, todavía sin balance probado. No alterar por ello las estadísticas de las otras armas, el combate histórico o los documentos de dominio/duplicados. PROGRAMACION debe identificar esta revisión experimental y conservar las regresiones relevantes del comportamiento anterior.

## 7. Animaciones: contrato mínimo y dependencias

La puntería conserva **360° reales**. El sprite usa la más cercana de las ocho vistas aprobadas; el proyectil o ataque conserva el vector real, no se fuerza a ocho trayectorias. El límite de cambio de vista necesita estabilidad visual, sin modificar el ángulo de combate.

Calibrar por modelo/dirección agarre principal, apoyo y salida del ataque. El catálogo ya ofrece anclajes estimados; no confundirlos con agarres verificados. Mantener tamaño de mundo, colisiones y alcance equivalentes entre 16 y 32.

| Familia/acción | Contrato mínimo aprobado |
|---|---|
| Pistola/ballesta/rifle | Preparación, disparo, retroceso, recuperación y recarga real cuando corresponda |
| Melee | Preparación, tramo de contacto y recuperación; un impacto por objetivo y ciclo salvo ficha explícita |
| Lanzamiento/misil | Preparación, liberación en punto correcto y recuperación; el efecto sigue al proyectil real |
| Emisión energética/fuego | Inicio, emisión sincronizada y enfriamiento; ticks de daño limitados por la ficha |
| F24 | Corte, proyección y recuperación compartidos, sin mostrar los extras viejos |

Reutilizar los PNG con movimientos locales y efectos; no pintar nuevas poses dentro de imágenes aprobadas. Si una pose nueva es necesaria para que un arma funcione visualmente, preparar una revisión de recurso con PERSONAJES/ARMAS y conservar el original.

**Dos armas siguen operando de forma independiente.** Cada copia conserva objetivo, intervalo, recarga y progreso. Para montaje, validar una pose de pareja: no añadir cuatro brazos, un arnés, mochila o un poder gratuito para justificar un arma secundaria.

El primer ensayo usa solo parejas cuyo agarre pueda calibrarse con los actores existentes. Las combinaciones que necesiten dos manos o poses compuestas requieren una pose compatible de PERSONAJES antes de habilitarlas en juego; no se sustituyen por un sistema de una sola arma activa ni se restringe permanentemente el diseño global a armas de una mano. Esta es una dependencia de arte concreta para la integración, no una mecánica nueva de penalización.

## 8. Lote preparado: LOT-EST-002 r1

**Listo documentalmente para PROGRAMACION**, con EST-ARM-001 r1 y ARM-VIS-001/R1 aceptadas. [Lote con fuentes, dependencias y criterios de prueba](gestion/lotes/LOT-EST-002-r1.md). La aceptación del diseño no ejecuta el lote ni publica el juego. La validación de agarres y poses condiciona qué parejas se habilitan; sala y confirmación requieren integración de sus áreas.

Orden de entrega para PROGRAMACION:

1. **Montaje:** visor técnico de los diez modelos, ocho vistas y ambas resoluciones; conservar los 160 PNG y revisar anclajes. El visor no promete nueve armas jugables.
2. **Combate y progresión:** AF01/CC04/TE01 con perfil de ensayo, escala única, cartas válidas y dos copias independientes. GENERAL/poderes/ultimate mantienen sus reglas.
3. **Práctica de fusión:** comenzar con una Katana nivel 1; obtener el Emisor láser mediante la recompensa de segundo hueco del ensayo; subir ambos a MAX; usar sala desde mapa 2; comprobar F24 y rellenar hueco.
4. **Cierre:** prueba de pareja de sprites y coordinación con PERSONAJES, flujo completo, pruebas focalizadas, límites y resultados. Las otras seis armas se incorporan después por familia con sus fichas, sin bloquear la validación de progresión/fusión.

Criterios: cinco ascensos por arma, sin cartas para ausentes/MAX, reposición válida, receta solo con dos compatibles MAX, cancelación sin consumo, fusión sin duplicación, una por expedición, FINAL sin refusión, nuevo hueco a nivel 1, daño/cupos/obstáculos correctos y presentación consistente 16/32.

No recuperar la progresión temporal de componentes consumidos, duplicar efectos generales ni permitir un segundo uso al reemplazar F24. Sin gacha real, compras, cuentas o guardado de expedición concedidos por este ensayo. MENUS dispone la confirmación, NIVELES resuelve la sala y PROGRAMACION integra/prueba; este documento no modifica sus recursos.

## 9. Aprobación registrada y comprobaciones restantes

Iván acepta conjuntamente **escala única, ascensos de ensayo, condiciones de fusión, F24 inicial y contrato/orden de integración** mediante «acepto todo.». EST-ARM-001 r1 sustituye expresamente las cuatro ramas como diseño vigente de armas. El ensayo existente conserva su implementación anterior hasta que PROGRAMACION lo adapte y documente resultados; esta revisión no afirma haberlo modificado. No exige reaprobar los sprites ya aceptados ni aprueba el catálogo completo por inferencia.

La dificultad, ritmo hasta MAX y rendimiento se medirán en el ensayo. El objetivo de alcanzar una primera fusión en mapas 2–3 es una meta a evaluar, no una garantía encubierta ni motivo para regalar niveles.
