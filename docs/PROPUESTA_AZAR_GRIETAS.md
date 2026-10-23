# Grietas — propuesta de aparición y azar

**ANTECEDENTE V1, reemplazado el 22/10/2026 por [Dado por minuto V2](GRIETAS_DADO_POR_MINUTO_V2.md).** Iván decide sorteo sí/no cada minuto, peligrosidad ponderada y máximo dos apariciones por mapa. La propuesta de 60% con garantía y sus porcentajes por avance que siguen debajo no están vigentes ni aprobados. Se conservan únicamente como historial.

22/10/2026 · ESTRUCTURA · **Propuesta pendiente de aprobación. Sin implementación ni publicación.**

Encargo trasladado desde escenarios: Iván pide definir aquí el azar y la frecuencia para que escenarios y expediciones varíen. Se plantea una clasificación de cinco niveles de peligrosidad. No ha elegido porcentajes ni confirmado escalado por profundidad. Las seis alternativas visuales Backrooms 2.5D que se elaboran en escenarios son estilos artísticos, no seis tiers; este documento no modifica ese catálogo.

## 1. Base vigente y alcance del cambio

Según [decisiones aceptadas, 45–48](DECISIONES_INFINITO_2026-10-20.md):

- Una grieta por mapa desde el segundo, aparición entre 1:30 y 3:00 como ensayo; entrar es opcional.
- Entrada instantánea por contacto. Ventana de entrada de 45 segundos activos.
- Encuentro en recinto separado; origen congelado y retorno al punto de entrada tras reclamar victoria.
- Una retirada anticipada de cinco segundos, una sola vez entre 1:00 y 3:00 del encuentro. Su momento y aviso exactos siguen pendientes. Cerrar la entrada no expulsa del recinto ni limita su duración.
- Primera victoria de grieta de la expedición garantiza un poder; las siguientes mantienen el azar y la garantía de la decisión 24A. Entrar, ignorar o retirarse sin victoria no concede premio.

La práctica B3 tenía un dimensional dentro del mismo mapa. No demuestra todavía el recinto separado, el guardado ni el sistema de azar descrito aquí.

## 2. Tres métodos posibles

| Alternativa | Frecuencia propuesta | Consecuencia |
|---|---|---|
| A: conservar frecuencia vigente | Una aparición en cada mapa elegible, 100% | Conserva 46A; varían hora, posición, anomalía y peligro. Menor incertidumbre sobre su presencia. |
| **B: oportunidad con garantía — recomendada** | Una oportunidad por mapa elegible: 60%; tras dos ausencias, siguiente oportunidad garantizada | Varía también la presencia, sin rachas largas sin acceso. Requiere cambiar la frecuencia de 46A. |
| C: intervalo por bloques | Exactamente una aparición en cada bloque de dos mapas elegibles, posición del bloque sorteada | Frecuencia controlada, pero se vuelve predecible tras una ausencia. También cambia 46A. |

**Recomendación B para probar**, con todas sus cifras pendientes de aprobación. Hasta aprobarla, A sigue siendo la frecuencia de diseño vigente. No convertir «una por mapa» en «como máximo una» sin registrar esa revisión.

## 3. Proceso recomendado por mapa

1. Al crear el mapa, reservar candidatos accesibles y decidir si es elegible. El primer mapa visitado queda excluido; se permite una oportunidad desde el segundo mapa realmente visitado. Un salto no crea oportunidades en mapas omitidos.
2. Tirar una sola vez para presencia: 60%, salvo garantía. Una ausencia aleatoria válida incrementa el contador; una aparición real lo reinicia, aunque el jugador no entre. Entrar no es requisito para reiniciarlo: ignorar grietas no debe forzar garantías adicionales.
3. Si habrá grieta, sortear su instante de apertura entre los segundos activos 90 y 180, ambos incluidos. Aviso a los cinco segundos previos; entrada disponible exactamente 45 segundos desde la apertura efectiva. Pausas, cartas, terminales y suspensión no consumen estos tiempos.
4. Sortear el nivel de peligrosidad con la tabla del apartado 4. Después elegir una anomalía compatible de ese nivel y su recinto, modificadores y recompensa conforme a sus fichas. Fijar estos resultados antes de mostrarlos; acercarse, pausar o recargar no vuelve a sortear.
5. Al abrir, seleccionar y registrar una ubicación válida según el apartado 5. Mostrar aviso, dirección/distancia y nivel de peligro. El contacto entra inmediatamente mientras la ventana siga abierta; no añadir canalización, tecla o espera obligatoria.
6. Al entrar, congelar el origen y usar el reloj independiente del recinto. Al volver, la oportunidad queda consumida: no hay segunda entrada ni nuevo sorteo en ese mapa. La entrada se considera consumida aunque aún le quedaran segundos.

**Garantía propuesta:** con oportunidades válidas y lugares disponibles, nunca más de dos mapas elegibles consecutivos sin aparición. No garantiza victorias, poderes ni participación del jugador. No se acumula durante el mapa inicial, mapas omitidos o errores de generación.

Con 60% y esa garantía, la frecuencia media teórica es aproximadamente **64,1% de mapas elegibles**, no 60%: la garantía eleva la tasa efectiva. El intervalo medio es 1,56 mapas elegibles (1 + 0,4 + 0,16). Estas cifras describen el modelo, no resultados de una simulación o prueba jugable.

## 4. Cinco niveles: segundo sorteo, distinto de la aparición

Escala propia del juego: **D1 Bajo, D2 Moderado, D3 Alto, D4 Severo y D5 Extremo**. No equivale a rareza de arma, ni atribuye clases canónicas de SCP. Clasifica el encuentro concreto: anomalía, recinto, amenazas y reglas. Un tier alto no significa solo más vida o velocidad.

| Nivel | Diferencia de diseño a desarrollar en su ficha |
|---|---|
| D1 | Una amenaza principal, señales claras y pocos patrones simultáneos |
| D2 | Patrón adicional o restricción ambiental sencilla |
| D3 | Combinación de amenazas y mayor exigencia de desplazamiento |
| D4 | Fases coordinadas y menor margen para corregir errores; siempre con señales legibles |
| D5 | Encuentro excepcional con varias reglas coordinadas, rutas de salida verificadas y aviso explícito |

Dos opciones coherentes para el segundo sorteo:

- **Tabla fija:** 40 / 30 / 20 / 8 / 2%. Fácil de aprender, pero permite D5 muy temprano y varía menos la evolución de la expedición.
- **Tabla por avance real — recomendada para ensayo:** reduce el peligro extremo temprano y amplía las opciones al avanzar. Requiere aprobar tanto el escalado como sus cifras.

| Mapas realmente visitados, incluido el actual | D1 | D2 | D3 | D4 | D5 | Suma |
|---|---:|---:|---:|---:|---:|---:|
| 2–3 | 55% | 30% | 12% | 3% | 0% | 100% |
| 4–6 | 35% | 32% | 22% | 9% | 2% | 100% |
| 7 en adelante | 20% | 30% | 28% | 16% | 6% | 100% |

Esta tabla expresa **P(tier | apareció una grieta)**. La probabilidad de aparición se resuelve antes. Ejemplo sin garantía en el tramo 4–6: P(D5 y aparición) = 60% × 2% = **1,2%**; si hay garantía de aparición, es 2%. No sumar «sin grieta» a una tabla que ya reparte el 100% de las grietas.

El avance usa mapas visitados, no el número nominal del destino tras un salto; omitir tres escenarios no adelanta tres oportunidades ni los desbloqueos de esta tabla. La ficha del destino puede restringir anomalías compatibles, pero no aumentar el tier en secreto. El escalado normal de enemigos debe ajustarse con límites: no duplicar sin medida el multiplicador de profundidad y el de peligrosidad.

## 5. Momento y ubicación alcanzable

La hora programada varía dentro de 1:30–3:00. No se vincula al mismo cofre, sala o baja en todas las partidas. Para una misma semilla y versión, la planificación es reproducible.

El escenario genera varios candidatos de grieta conectados al área transitable. Al abrir, se filtran según el estado real y se elige con azar determinista:

- Fuera de colisiones, recintos cerrados, puertas, premio del jefe, terminales y rutas críticas de aliados.
- Sin solaparse con el jugador ni obligarlo a tocarla al aparecer. Propuesta: recorrido mínimo de tres segundos caminando desde su posición.
- Propuesta: recorrido máximo de doce segundos a velocidad base, calculado por ruta transitable, para dejar margen dentro de los 45 segundos. No usar distancia recta ni exigir mejoras de velocidad.
- Distribuir candidatos en distintas zonas y evitar el mismo sector que la grieta del escenario anterior cuando existan alternativas válidas. No prometer siempre la posición más cercana.

La posición elegida se fija al aparecer; no persigue al jugador. La planificación temporal no cambia por quedarse quieto o abrir menús. La selección espacial sí depende de su posición al abrir para evitar un acceso injustamente lejano; ese dato y el candidato elegido quedan registrados.

Si no hay candidato válido, **no abrir una grieta inaccesible**. Registrar fallo técnico y conservar el contador previo: no contar ausencia aleatoria ni gastar garantía. Sin reintentos cada segundo ni premio compensatorio. La garantía es una exigencia para el generador, no una excusa para colocar un portal inválido; debe comprobarse antes de publicar la mecánica.

El radar muestra la dirección de la grieta abierta y su cierre, junto con aviso sonoro/visual. Los cinco tiers se identifican con número y símbolo; los colores concretos se coordinan después con arte. No revelar cofres desconocidos ni cambiar la detección por proximidad de anomalías comunes. No confundir la grieta opcional con la puerta obligatoria de avance a 5:00.

## 6. Variedad y control de repeticiones

- Nueva expedición: nueva semilla, aun con el mismo soldado y escenario inicial. No se garantiza una secuencia matemáticamente única; una semilla distinta puede coincidir en algunos resultados.
- Cada mapa combina hora, zona, recinto, identidad de anomalía y patrones permitidos. No sortear estadísticas arbitrarias que contradigan la identidad de la anomalía.
- El tier se sortea con la tabla publicada sin prohibir repeticiones de tier. Así sus porcentajes conservan el significado anunciado; dos D2 seguidos pueden contener encuentros diferentes.
- Dentro del tier, excluir las dos últimas identidades de anomalía aparecidas en la expedición cuando el catálogo compatible lo permita. Si el conjunto queda vacío, liberar primero la más antigua y después la más reciente. Si existe un solo encuentro compatible, permitir repetirlo y registrar la limitación del catálogo.
- Pesos iniciales iguales entre anomalías elegibles del mismo tier. Una futura afinidad temática puede cambiar sus pesos internos, publicando la tabla normalizada; no altera por sí sola el sorteo del tier.
- Para escenarios consecutivos con pocos recintos, variar variantes de distribución y patrón solo si ya están diseñadas y validadas. No llamar «nuevo encuentro» al mismo jefe con otro color.
- No excluir anomalías por dar un poder ya equipado: el jugador conserva la decisión de mejorar/reemplazar según las reglas de poderes. El generador no inspecciona el gacha para empeorar resultados.

**Catálogo incompleto:** antes de usar una tabla, todo tier de peso positivo necesita al menos un encuentro compatible validado para ese escenario. Si falta, usar una tabla alternativa explícita: poner a cero esos tiers y normalizar los restantes a 100%, registrando la tabla efectiva. Si no queda ninguno, ese mapa es técnicamente inelegible, no un fallo de suerte. No sortear D5 y entregar D2 ocultamente. Para un primer prototipo con pocos jefes, anunciar la tabla reducida y no afirmar que ya se probaron cinco peligrosidades.

Las seis alternativas visuales de escenarios no entran en estos pesos. Cuando se elija una dirección artística, su representación podrá adaptarse a cada peligrosidad conservando señales legibles; no crear seis tipos de recompensa por disponer de seis bocetos.

## 7. Semilla, suspensión y reanudación

Propuesta de contrato de guardado, todavía sin implementación:

- Identificador de expedición y semilla; versión del generador, reglas de azar, tabla de peligro y catálogo de encuentros. Mantener disponibles esas versiones al reanudar.
- Número de mapas realmente visitados y destino nominal por separado; mapa actual y geometría/candidatos necesarios para reproducirlo.
- Contador de ausencias, últimas dos anomalías aparecidas y decisiones ya tomadas: presencia, instante, tier, anomalía, recinto, tabla efectiva y ubicación cuando ya se haya elegido.
- Estado de la grieta: sin oportunidad / programada / ausente / abierta / dentro / consumida / expirada / fallo técnico. Guardar tiempo activo restante y resultado de entrada, escape, victoria y recompensa con identificadores únicos.
- Si la suspensión ocurre dentro, guardar tanto el origen congelado como el recinto y su reloj; conservar el instante de la única retirada anticipada y si ya se usó o pasó.
- Usar sorteos separados por propósito (presencia, hora, tier, identidad, ubicación y recinto), identificados por expedición/mapa/versión. Obtener botín o disparar no debe mover el siguiente sorteo de grieta.

Reanudar recupera el estado persistido; no genera una semilla nueva ni consume otra oportunidad. No reconstruir usando la posición nueva del jugador si la ubicación ya quedó fijada. Evitar duplicar premios o portales al cargar. Si falta la versión necesaria, bloquear la reanudación o migrar mediante un procedimiento explícito probado; no regenerar silenciosamente otra expedición.

Guardar al producir cada decisión evita que cerrar y cargar sea un método autorizado para volver a tirar. La protección contra manipulación de archivos locales no queda resuelta por este documento. El ensayo sin guardado actual no acredita continuidad.

## 8. Coherencia con combate y premios

La peligrosidad anuncia lo que exige el encuentro; no promete una ultimate o arma de gacha. Los jefes de grieta conservan el papel de fuente de poderes anómalos. No añadir una nueva moneda o una tabla económica real aquí.

Los tiers superiores deberían aumentar recompensa de forma acotada una vez aprobada su tabla, sin multiplicar la garantía de poder ni permitir superar tres poderes. La retirada sin victoria no concede premio. El instante del escape, sus avisos y la ubicación alcanzable necesitan una ficha propia; no se decide su valor al definir el azar de entrada.

## 9. Verificación necesaria antes de implementar

- Presencia: mapa inicial excluido, máximo una oportunidad por mapa, garantía tras dos ausencias válidas, ignorar consume aparición y fallos técnicos no consumen garantía.
- Porcentajes: cada tabla y alternativa normalizada suma 100%; medir presencia y tier por separado, distinguiendo la tasa base de la efectiva con garantía.
- Repetición: mismas entradas y versión reproducen la secuencia; distintas semillas producen variedad estadística sin exigir que nunca coincidan. Catálogo reducido no bloquea el juego.
- Rutas: candidatos válidos en cada escenario/semilla y dentro del tiempo de acceso; incluir el escenario inicial R7 vigente y sus futuras variantes, sin modificar sus archivos visuales.
- Relojes: ventana exacta de 45 segundos activos, sin consumir tiempo en pausa, suspensión o recinto separado; retorno sin nueva entrada.
- Continuidad: suspender antes/después del sorteo, durante el aviso, con portal abierto, dentro, tras escape y tras victoria. Ningún caso cambia tier, repite recompensa o restaura un uso consumido.
- Balance: tiempo entre poderes, porcentaje de grietas ignoradas, entradas y victorias por tier, distribución espacial y concentración de fallos. Las probabilidades matemáticas no prueban dificultad ni diversión.

## 10. Qué aprobar para avanzar

Recomendación concreta para ensayo: **B, 60% por mapa elegible con garantía tras dos ausencias; tabla por avance real del apartado 4; una oportunidad, aparición entre 1:30–3:00 y entrada de 45 segundos; control de repetición por identidad.**

Requiere aprobar el cambio de frecuencia respecto de 46A, el escalado y sus porcentajes, los cinco niveles y los límites de ubicación propuestos. Entrada por contacto, recinto separado, origen congelado y escape ya acordado se conservan. No hay implementación autorizada por esta entrega documental ni se declara aprobado el nuevo azar.
