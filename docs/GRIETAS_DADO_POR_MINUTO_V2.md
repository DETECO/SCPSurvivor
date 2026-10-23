# Grietas — dado interno por minuto

Revisión 2.1 · 22/10/2026 · ESTRUCTURA. **Mecanismo y reparto de peligrosidad elegidos por Iván; horarios y probabilidad del sí/no siguen recomendados, pendientes de aprobación. Sin implementación.**

## Decisión nueva de Iván

- Un sorteo interno cada minuto pregunta «1: sí / 2: no» para decidir la aparición.
- Si sale sí, un segundo sorteo ponderado elige entre cinco niveles de peligrosidad. A mayor peligro, menor probabilidad; el último debe ser muy infrecuente.
- **Máximo dos grietas por mapa**, no dos garantizadas.

Esta instrucción reemplaza la frecuencia anterior de una por mapa (46A). La propuesta previa de 60% por mapa con garantía tras dos ausencias nunca fue aprobada y deja de ser la recomendación. Iván elige posteriormente los porcentajes del segundo dado: **50%, 32%, 8%, 7% y 3%**, de menor a mayor peligrosidad. La probabilidad exacta del sí/no sigue sin confirmación expresa.

Las cinco peligrosidades son niveles de encuentro. Las seis alternativas visuales de escenarios son propuestas artísticas independientes; no se modifican aquí.

**Decisión posterior — compañero de contención:** D1–D3, 33% de aparición con arma básica aleatoria y diálogo de ánimo; D4, 33% con arma Rara o Épica; D5, 10% con Legendaria y diálogo de miedo/deseo de irse. Es un sorteo adicional condicionado al tier, sin cambiar la tabla 50/32/8/7/3. [Reglas y recomendaciones de balance](COMPANERO_CONTENCION_GRIETAS.md). Pendiente de implementación; expresar miedo no equivale a huida aprobada.

## Base conservada

Desde el segundo mapa, entrando opcionalmente por contacto instantáneo, con ventana de entrada de 45 segundos activos. El primer mapa sigue excluido mientras no se decida cambiarlo.

Recinto separado y origen congelado. Una retirada anticipada de cinco segundos, una sola vez entre 1:00 y 3:00 del recinto, cuyo momento, aviso y posición exactos siguen pendientes. El retorno por victoria se conserva como evento diferente. La práctica B3 dentro del mismo mapa no acredita todavía este recinto separado ni continuidad.

Primera victoria de grieta de cada expedición garantiza un poder; siguientes victorias conservan azar y garantía de 24A. El nuevo dado no cambia esa garantía de premio ni el máximo de tres poderes. Ignorar, entrar, retirarse sin victoria o morir no concede premio de victoria. Estas grietas no entregan ultimates del gacha.

## Horarios y funcionamiento recomendados

**Propuesta:** tirar en **1:00, 2:00, 3:00 y 4:00 del mapa**, sin tirada en 0:00 ni a partir de 5:00. Es un cambio respecto de la franja de ensayo anterior 1:30–3:00; estos horarios concretos requieren aprobación.

1. Al alcanzar un minuto elegible, comprobar si ya aparecieron dos grietas. Si es así, no seguir sorteando.
2. Con cupo disponible, lanzar una sola vez el sí/no. Recomiendo **50% sí / 50% no**, la lectura natural de un dado de dos caras iguales.
3. Si sale no, esperar al siguiente minuto elegible. Si sale sí, sortear peligrosidad, encuentro y una ubicación válida; abrir y sumar una aparición.
4. La entrada permanece 45 segundos activos. Ignorarla, dejarla expirar, superarla o retirarse sigue consumiendo una de las dos apariciones.
5. Cada grieta admite una entrada. Regresar no la reactiva ni devuelve cupo. Tras la primera puede aparecer otra en un minuto posterior si todavía queda cupo.

El máximo es **acumulado por mapa**, no dos portales simultáneos. Una grieta ignorada cierra a los 45 segundos, dejando 15 antes de la siguiente tirada. Una apertura a 4:00 cerraría a 4:45, antes de la puerta. Si coincide con el jefe del escenario, mantenerla opcional y con avisos distintos; no alterar el jefe ni subir la peligrosidad por esa coincidencia.

Dentro de una grieta, el reloj de origen permanece congelado: no tirar cada minuto del recinto ni acumular oportunidades por ese tiempo. Al regresar, el mapa continúa desde su mismo instante. Pausa, cartas, terminales, carga y suspensión tampoco cuentan. Saltar escenarios no crea tiradas de los mapas omitidos.

## Segundo dado: peligrosidades elegidas

Recomiendo empezar con una **tabla fija**, sin añadir aún escalado de probabilidades por profundidad. Así se puede evaluar el sistema y mantener el último peligro muy raro. Ese escalado no fue aprobado.

| Nivel de peligro del encuentro | Probabilidad si aparece grieta | Resultados de un sorteo de 1 a 1.000 |
|---|---:|---|
| D1 — Bajo | 50% | 1–500 |
| D2 — Moderado | 32% | 501–820 |
| D3 — Alto | 8% | 821–900 |
| D4 — Severo | 7% | 901–970 |
| D5 — Extremo | **3%** | 971–1.000 |
| **Total** | **100%** | **1.000 resultados** |

Son cifras elegidas por Iván, sin validación de balance todavía. Sustituyen la recomendación anterior 50/28/15/6,5/0,5. Las 1.000 caras representan pesos internos, sin exigir un dado visible. Las categorías clasifican el encuentro completo (anomalía, recinto, amenazas y reglas), no rarezas de armas ni clases canónicas de SCP. Mayor peligro necesita patrones más exigentes y señales legibles; no solo más vida o velocidad.

La tabla expresa **P(tier | apareció grieta)**. Con sí/no al 50% como supuesto de ensayo, una oportunidad elegible tiene **1,5%** de probabilidad de abrir D5: 50% × 3%, siempre que quede cupo y existan encuentro y lugar válidos.

Con cuatro tiradas independientes al 50%, máximo dos apariciones y sin fallos técnicos:

| Apariciones por mapa elegible | Probabilidad |
|---|---:|
| Ninguna | 6,25% |
| Una | 25% |
| Dos | 68,75% |

Media: **1,625 grietas por mapa elegible**. Con la tabla elegida y tiers independientes, la probabilidad de al menos una D5 en un mapa elegible es aproximadamente **4,813%**, bajo el supuesto de cuatro tiradas al 50%. Son cálculos del modelo, no resultados de una demo. El 3% representa una D5 cada 33,3 apariciones en promedio a largo plazo, sin garantía de periodicidad. Si aparecen dos grietas, la probabilidad de que alguna sea D5 es **5,91%**.

Análisis del reparto: 82% de las grietas son D1–D2 y 18% son D3–D5; las probabilidades disminuyen con el peligro y suman 100%. D3 y D4 serán casi igual de frecuentes (8% y 7%). D5 sigue siendo la menos frecuente, pero su tasa por aparición es seis veces la antigua recomendación del 0,5%: pasa de excepcional a rara y perceptible. Se conserva la elección del usuario; no se reduce en secreto ni se convierte en una garantía.

## Análisis y mejoras

Los dos dados separan bien cantidad y peligrosidad. El límite contiene la frecuencia, pero cuatro tiradas al 50% dan dos grietas en casi siete de cada diez mapas elegibles. Es una buena base para probar un juego centrado en poderes; las grietas no serían un evento escaso. Hay que medir el tiempo adicional de los recintos, porque no consume los cinco minutos del origen.

| Alternativa para el primer dado | Media con cuatro tiradas y máximo dos | Probabilidad de dos |
|---|---:|---:|
| **50% sí / 50% no — recomendada inicialmente** | 1,625 | 68,75% |
| 35% sí / 65% no, solo si el ensayo muestra exceso | 1,259 | 43,702% |

No añadir por ahora garantía de aparición ni de D5: modificaría el azar solicitado y sus tasas. La garantía ya aceptada de poder tras victorias es otro sistema y se conserva.

No prohibir repetir tier, porque cambiaría sus probabilidades. Sí variar la identidad de la anomalía y el recinto dentro del mismo tier. Mostrar la peligrosidad antes del contacto permite decidir si aceptar el riesgo; evitar entradas accidentales.

## Ubicación, identidad y fallos

- Usar candidatos del escenario procedural conectados por rutas transitables, sin colisiones ni solapamiento con jugador, puertas, terminales o premios.
- Propuesta: entre tres y doce segundos de recorrido a velocidad base desde la posición del jugador al abrir, por camino real. Así quedan márgenes dentro de los 45 segundos y no se exige mejorar velocidad.
- Elegir aleatoriamente entre lugares válidos, fijarlos al abrir y evitar el sector de la grieta anterior si hay alternativas. No perseguir al jugador ni aparecer sobre él.
- Tras sortear tier, elegir una anomalía compatible. Evitar las dos últimas identidades aparecidas en la expedición cuando el catálogo lo permita; si no hay opciones, liberar primero la exclusión más antigua. Este filtro cambia identidades, no pesos de tier.
- Todo tier de peso positivo necesita un encuentro compatible validado. Un prototipo con menos tiers debe anunciar una tabla reducida normalizada; no sortear D5 para entregar D2 ocultamente.
- Si no hay encuentro o lugar válido, registrar fallo técnico: consumir la oportunidad de ese minuto, sin gastar cupo de aparición ni volver a tirar hasta el minuto siguiente. Sin premio compensatorio. Distinguirlo de un no aleatorio en los registros.
- Radar y aviso señalan portal, peligro, dirección y cierre. Colores y forma final se coordinan con escenarios; sus seis propuestas artísticas no son seis niveles mecánicos. No revelar cofres desconocidos ni confundirlo con la puerta de avance.

## Semilla, suspensión y reanudación

Contrato recomendado para la futura implementación con guardado:

- Semilla e identificador de expedición/mapa y versiones de reglas, generador, tabla y catálogo. Nueva expedición usa nueva semilla; distintas semillas pueden coincidir en resultados.
- Registrar cada minuto de sorteo consumido, el próximo pendiente y el contador acumulado 0–2. La carga no devuelve cupos ni vuelve a tirar.
- Guardar sí/no, tier, anomalía, recinto, ubicación y tiempo restante ya decididos. Separar sorteos por propósito para que botín o disparos no desplacen los de grieta.
- Persistir posición elegida e historial; no recalcular una grieta abierta con la posición del jugador al reanudar.
- Dentro del recinto, guardar origen congelado, reloj del encuentro, estado de la retirada única, victoria y premio reclamado con identificadores de uso único.
- Mantener las versiones necesarias para reanudar o usar una migración explícita probada; nunca generar silenciosamente otra grieta.

El ensayo actual sin persistencia no acredita esto. Guardar resultados evita nuevas tiradas en una carga normal; no resuelve por sí solo la manipulación de archivos locales.

## Verificación antes de integrar

1. Una tirada por minuto elegible; ninguna por pausa o tiempo dentro de grieta. Cruzar el mismo instante al cargar no repite el sorteo.
2. Probar cero, una y dos apariciones; ignorar consume cupo y nunca aparece una tercera. Volver de la primera no impide una segunda posterior.
3. Comprobar suma 100% y límites 500/501, 820/821, 900/901 y 970/971. Medir presencia y tiers por separado; una muestra pequeña no valida bien un evento del 3%.
4. Validar rutas y ausencia de entrada accidental, incluido el escenario R7 vigente y sus variantes; una lámina no prueba geometría jugable.
5. Suspender antes/después de tirar, con portal abierto, dentro y tras victoria: mismos resultados, contador y premios, sin duplicados.
6. Medir entradas, victorias, abandonos, ritmo de poderes, tiempo añadido y rendimiento por tier. Dos apariciones no limitan por sí solas la duración de los recintos.

**Estado:** mecanismo de dos dados, máximo dos por mapa y reparto de peligrosidad **50/32/8/7/3 elegidos por Iván**. Horarios 1:00–4:00 y sí/no 50/50 siguen como recomendaciones pendientes de aprobación. No se ha cambiado código, publicado juego ni editado el catálogo visual.
