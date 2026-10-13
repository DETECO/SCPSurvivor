# RoadmapSCP

Registro maestro del juego, decisiones, pendientes, etapas, evidencias y seguimiento hasta la primera versión completa publicada.

**Versión:** 0.8 — borrador consolidado hasta D-275, actualizado el 13 de octubre de 2026 (America/Santiago).  
**Director:** el usuario. **Estado:** planificación avanzada; aprobación integral del plan y sus pesos pendiente. Ninguna fase concreta de implementación, ejecución o publicación autorizada. Preferencia vigente: entrega para subida manual a GitHub.  
**Copia local vigente:** `/workspace/RoadmapSCP.md`. **Destino aprobado:** [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), archivo raíz `RoadmapSCP.md` en `main`. **GitHub:** esta actualización no se ha subido; la última comprobación de escritura de la integración, el 12/10, devolvió HTTP 403. El director eligió continuar con subidas manuales. **Web:** sin publicar ni sincronizar.  
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
| A-002 | Guardar RoadmapSCP y asignar pesos | Autorización histórica para crear el registro inicial. Crear este archivo, consolidar lo visto, pendientes y etapas hasta publicación; comprobar la integridad del documento. |
| A-003 | Implementar el juego | No autorizado. Requiere identificar expresamente la fase o tarea que se permite implementar. |
| A-004 | Ejecutar juego, pruebas del repositorio, herramientas de build o instalar dependencias | No autorizado. Las verificaciones de texto de este registro no son pruebas del juego. |
| A-005 | Crear repositorios, ramas, commits; desplegar o escribir en servicios | No autorizado con carácter general. Excepción documental vigente: subida y commit de RoadmapSCP en el repositorio elegido, A-008. La copia original se conserva intacta. |
| A-006 | Construir/publicar la web y activar automatización | No autorizado; otro hilo. |
| A-007 | Pagar servicios o habilitar facturación | No autorizado. El objetivo de 20 USD/mes no constituye autorización de gasto. |
| A-008 | Guardar RoadmapSCP en DETECO/SCPSurvivor | Autorizado expresamente por el director. Inspeccionar el repositorio existente, conservar sus archivos, subir este registro mediante un commit documental y verificar el resultado. Los futuros desarrollos del juego se guardarán allí conforme se autoricen; esta elección de destino no autoriza a empezar a programar, copiar la base completa, desplegar, construir la web ni activar automatizaciones. |
| A-009 | Actualización documental solicitada el 13/10/2026 | El director indicó «actualiza el roadmap». Autoriza consolidar este Markdown, conservar v0.7, entregar una copia actualizada y comprobar su integridad. No autoriza implementar el juego, migrar todavía a la propuesta JSON, ejecutar build/pruebas del juego, configurar servicios, gastar ni publicar. |

**Preferencias vigentes:** decisiones claras de planificación a cargo del asesor por delegación D-182, usando la base como primera opción; consultar dudas relevantes; avanzar en bloques de diez previamente aceptados. Guardar el roadmap solo cuando lo solicite el director. Esta autorización cubre la actualización actual, no escrituras automáticas en cada respuesta. La copia descargable se ofrece para subida manual; A-008 es antecedente, no afirmación de subida realizada.

La copia local del archivo está fuera de la copia del juego para conservarla intacta. No se han guardado nuevos programas, parches, configuraciones ni recursos gráficos. Las ilustraciones adjuntas se describen en ART-001; sus originales no están incrustados en este Markdown.

**Acceso parcial y bloqueo de escritura, 12/10/2026:** las consultas iniciales devolvieron HTTP 404. Después de los ajustes del director, la API confirma `DETECO/SCPSurvivor` público y rama predeterminada `main`. Se inspeccionaron `README.md` y `LICENSE`, únicos archivos previos, en la revisión inicial `a8627fbcad05955702cc59c1efa42be14827b345`. Aunque la ficha del repositorio muestra `push: true`, los intentos de crear `RoadmapSCP.md` desde GitHub CLI y desde el conector fueron rechazados con HTTP 403, `Resource not accessible by integration`. Esos permisos de la ficha no prueban el permiso efectivo de escritura de la integración. No se ha subido el archivo ni creado un commit. La autorización documental A-008 se conserva en el historial, pero el director posteriormente eligió la entrega de archivos para subida manual. No reintentar subidas automáticamente como parte de esta actualización. El contenido actual del remoto no se ha vuelto a inspeccionar en este turno.

La aprobación de una decisión de diseño no autoriza implementación, pruebas, publicación ni automatización. Las autorizaciones se mantienen mientras no cambien sus condiciones. Cualquier cambio de alcance deberá versionar este registro y preservar la decisión sustituida.

## 3. Referencia técnica y límites de la investigación

| Campo | Referencia |
|---|---|
| Repositorio original | https://github.com/JPTER78/pokesurvivor |
| Web de referencia | https://pokesurvivor.com/ |
| Rama analizada | `main`, predeterminada visible al consultar el origen |
| Commit fijado | `a1006e6e3d0cea9162238a90b0ffdd7fd38397b6` |
| Fecha del commit | `2026-10-11T17:23:47+02:00` |
| Inspección | Lecturas 11–13 de octubre de 2026; HEAD reconfirmado el 13. La comprobación documental de esta actualización verificará también el estado de la copia original. |
| Copia local consultada | `/workspace/containment-survivor` |
| Estado real de esa copia | Copia del original; el nombre del directorio no demuestra una adaptación SCP implementada |
| Recursos locales | Copia selectiva; los sprites de `assets/pokemon/` no están completos localmente |
| Repositorio activo propio de SCP Survivor | [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), elegido por el director; público y rama predeterminada `main`, según última comprobación por API del 12/10/2026, no revalidada hoy. Contenido observado entonces: `README.md` y `LICENSE`; commit inicial `a8627fbcad05955702cc59c1efa42be14827b345`. |
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

Juego gratuito de navegador, inicialmente individual, para Safari en iPhone y Chrome en Android, en horizontal y vertical. Teléfonos de referencia: iPhone 13, iPhone 15 e Infinix Note 40 **5G**. Objetivo de 60 FPS; umbrales iniciales D-254: media mínima 55 FPS y 95 % de intervalos entre fotogramas menores de 25 ms en escenarios definidos. Son metas sin medición, no resultados.

El jugador mueve a su soldado, las armas apuntan y disparan automáticamente y las habilidades se activan manualmente. La expedición continúa entre sectores sin volver al menú. Los sectores contienen varias oleadas, con preparación inicial de 20 segundos entre ellas, dentro del intervalo aprobado de 5–30 s. La selección de mejoras pausa esa cuenta; la gestión ordinaria de equipo y reciclaje no. Hay habitaciones amplias, corredores y exploración opcional, construidos mediante módulos de escenario.

La expedición es infinita como estructura jugable. La dificultad progresa por sectores y oleadas. En algunos mapas aparecen opciones de extracción. Extraer termina la expedición conservando recompensas y penaliza su puntaje; morir tiene una penalización mayor y activa pérdida/recuperación del equipo. Escapar de un jefe permite avanzar a otro escenario sin recompensa por derrotarlo ni penalización adicional de puntaje.

### 4.2 Catálogo comprometido para esta entrega

| Componente | Cantidad y contenido |
|---|---|
| Soldados | 2: guardia básico con Sprint de emergencia; médico operativo con primeros auxilios instantáneos |
| Armas | 3 modelos: pistola, subfusil y escopeta; valores iniciales D-165/D-166, nombres definitivos pendientes |
| Modificaciones | 6, con compatibilidades y efectos indicados abajo |
| Mochilas | 2 modelos de 8 y 16 espacios; diferente capacidad como única diferencia inicial |
| Entorno | 1 ambientación modular propia inspirada en Backrooms, capaz de generar múltiples sectores |
| Enemigos normales | 2: perseguidor inspirado en SCP-049-2 y atacante a distancia inspirado en SCP-811 |
| Jefe | 1 inspirado en SCP-049; siempre existe una vía de escape |
| Categorías permanentes | 10 categorías por soldado, con 10 mejoras posibles por categoría |
| Modos de acceso | Cuenta con Google o correo real/contraseña; demo online de invitado sin transferencia de progreso |
| Persistencia y servicios | Caché local, guardado en nube, una expedición activa por cuenta, autoridad de servidor para operaciones persistentes |
| Economía | Tickets separados de reclutamiento y suministros, gacha, equipo físico, reciclaje, almacén y buzón de excedentes |
| Clasificación final | Global y por país, mejor expedición válida, fórmula D-222 y penalizaciones D-223, controles básicos del servidor D-225; habilitación oficial después de pruebas |

Los 24 soldados y 24 diseños de criaturas aportados son referencias y reserva de contenido. No equivalen a 48 personajes comprometidos para esta primera publicación. La aspiración de cientos de armas/modificaciones y miles de combinaciones es una dirección futura, sin cantidad ni plazo de entrega aprobado.

### 4.3 Modificaciones aprobadas

| Modelo de trabajo | Efecto | Coste o inconveniente | Compatibilidad |
|---|---|---|---|
| Empuñadura estable | −30 % de dispersión | Sin inconveniente directo aprobado | Pistola, subfusil, escopeta |
| Recarga asistida | −15 % de duración de recarga | Sin inconveniente directo aprobado | Las tres |
| Mecanismo reforzado | +15 % del daño base | Sin inconveniente directo aprobado | Las tres |
| Cargador ampliado | +50 % de capacidad | +15 % de duración de recarga | Las tres |
| Mecanismo rápido | −15 % de intervalo entre disparos | +30 % de dispersión | Pistola y subfusil |
| Munición perforante | +1 impacto adicional; hasta dos enemigos si no consume el presupuesto antes | −10 % del daño base por impacto | Pistola y subfusil; no atraviesa paredes ni obstáculos indestructibles |

Hay dos espacios genéricos por arma; no se repite una misma modificación en esa arma. Munición perforante es una modificación física, no munición consumible. Dos armas pueden estar equipadas y solo una activa; la recarga de la inactiva continúa en segundo plano. La reserva de munición es infinita, con cargadores y recarga automática. Cada modelo tiene características fijas, sin variantes estadísticas de calidad en el MVP.

### 4.4 Categorías permanentes

| Categoría | Incremento por mejora permanente | Máximo de categoría |
|---|---|---|
| Vitalidad | +5 % de vida base | +50 % |
| Protección | +2 puntos porcentuales de reducción | +20 puntos |
| Potencia | +3 % de daño base del arma | +30 % |
| Cadencia | −2 % de intervalo base entre disparos | −20 % |
| Recarga | −3 % de duración base de recarga de cargador | −30 % |
| Movilidad | +2 % de velocidad base | +20 % |
| Recolección | +10 % del radio base de recogida de XP | +100 % |
| Aprendizaje | +5 % de XP temporal; no aumenta XP permanente | +50 % |
| Recuperación | +0,1 de vida/s | +1 de vida/s |
| Especialización | −3 % de espera base de habilidad manual | −30 % |

D-155/D-156: los porcentajes del mismo atributo se suman sobre su base, sin composición multiplicativa. D-157: topes conjuntos de 70 % para protección y 60 % de reducción para intervalo, recarga y espera de habilidad. D-160: movilidad normal hasta +50 % de base, con Sprint adicional. D-213 precisa D-139/D-152: categorías aplicadas más puntos pendientes no superan 100; al reservar todos los espacios se detiene XP permanente y el duplicado sin espacio concede un ticket de suministros. No inventar un nivel general 100; las mejoras por duplicado no suben ese nivel.

La experiencia permanente del soldado permite elegir una mejora de categoría por nivel. Un duplicado permite mejorar una categoría del soldado repetido, sin subir su nivel general. Si no queda espacio de mejora, contando puntos pendientes, concede un ticket de suministros. Los puntos y categorías temporales de la expedición son un sistema distinto y se reinician al terminarla.

### 4.5 Pérdida, recuperación y almacenamiento

Al morir se sortea un porcentaje entre 25 % y 50 % del número de unidades perdidas. Si el resultado contiene una fracción, esta es la probabilidad de recuperar una unidad adicional: 1,2 significa una unidad segura y 20 % de posibilidad de una segunda. Después se seleccionan las unidades aleatoriamente. En cantidades pequeñas se puede recuperar todo o nada; el rango corresponde al cálculo previo, no a una garantía exacta por resultado.

Un arma con sus modificaciones instaladas es una unidad para la recuperación; las modificaciones sueltas son unidades independientes. La mochila equipada es otra unidad y recuperarla no devuelve automáticamente su contenido. La recuperación se resuelve al cerrar el resultado de muerte y vuelve a la cuenta cuando el servidor la confirma. Se simula a los compañeros que encontraron el cuerpo; no exige NPC aliados ni cooperativo.

El almacén es compartido por cuenta, con 60 espacios; el buzón admite 30 objetos sin caducidad. Cada arma con sus mods instalados cuenta como una unidad; cada mod suelto y mochila de reserva ocupa un espacio. Las dos armas y la mochila equipadas no ocupan su interior. El buzón guarda excedentes de gacha, extracción y recuperación; tiene capacidad limitada y no caduca. Cuando ambos están llenos se bloquea el gacha antes de consumir tickets. Un resultado de expedición conserva su entrega pendiente y bloquea una nueva expedición hasta resolverla; solo hay uno por cuenta.

El equipo sobrante puede reciclarse. Cada modelo tiene su valor de reciclaje, acumulable hacia tickets de suministros. Cuando se recicla un arma con modificaciones instaladas se consume el conjunto y se suma el aporte de sus componentes. Las equivalencias iniciales están aprobadas en D-132; su equilibrio real y funcionamiento aún no se han probado.

**Papel del reciclaje, D-131:** fuente complementaria de tickets de suministros; las misiones son la fuente principal. Referencia inicial aprobada: unos cinco objetos comunes por ticket, con valores propios por modelo. Es un objetivo de diseño para calibrar, no una cadencia de recompensas medida. D-132 concreta la tabla inicial. Q-002 mantiene pendientes el análisis conjunto con recompensas y la validación.

**Kit básico, D-130:** reposición de emergencia por pieza: se entrega pistola básica cuando no hay ninguna arma disponible para comenzar, y mochila pequeña cuando no hay ninguna mochila disponible. Las copias de esa entrega gratuita tienen valor de reciclaje cero; las copias obtenidas jugando o mediante gacha mantienen el valor normal de su modelo. La distinción corresponde al origen de cada copia, no a bloquear el reciclaje de todas las pistolas o mochilas pequeñas. D-217 concreta disponibilidad por ubicaciones y reposición cuando no existe ninguna pieza válida; D-218 conserva origen al recuperar. La comprobación de esas reglas sigue pendiente en Q-008, sin reabrir la elección del kit. El aporte de modificaciones obtenidas normalmente sigue la suma por componentes D-124, sin atribuir valor al arma gratuita.

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
- Reclutamiento: un ticket por tirada, 50 % guardia y 50 % médico. Si el médico sigue bloqueado, la tercera tirada lo garantiza; obtenerlo antes desactiva esa garantía.
- Hitos iniciales de reclutamiento: primera oleada completada, alcanzar segundo sector y alcanzar tercer sector; un ticket por hito, una única vez por cuenta.
- Suministros: un ticket por objeto; se elige armas, modificaciones o mochilas antes de sortear el modelo.
- Suministros proceden de misiones, duplicados sin espacio de mejora y reciclaje. Reclutamiento procede de los tres hitos únicos y cofres aleatorios por oleada. Equipo físico procede de cofres y jefes vencidos, además del gacha y kit.
- Probabilidades de suministros aprobadas en D-126: distribución uniforme entre modelos de la categoría elegida. Con el catálogo inicial, cada arma tiene probabilidad exacta 1/3, cada modificación 1/6 y cada mochila 1/2. Son probabilidades por tirada, sin garantía de recibir todos los modelos tras un número determinado de intentos. No cambia la garantía del médico en reclutamiento.
- La concesión de tickets por hitos de avance no acredita una derrota de jefe si el encuentro fue evadido.

**LOCALIZADO EN CÓDIGO original:** `js/data/missions.js` define plantillas diarias/semanales; `G.Progress.ensure` en `js/systems/progress.js` crea tres misiones diarias y dos semanales, y `G.Progress.claim` concede premios al reclamarlas. `js/ui/goals-ui.js` muestra sus listas y reclamación. Se ha leído el código del commit fijado, sin ejecución. Las cantidades, recompensas, renovación y reglas de reclamación del original no se consideran aprobadas automáticamente para SCP Survivor.

**D-133–D-138 — diseño adoptado:** combinación de un contrato renovable, tres misiones diarias y dos semanales. Contrato: 1 ticket de suministros; diaria: 1 por misión; semanal: 3 por misión. Renovable: 50 bajas, 3 oleadas o 2 sectores; diaria: 150 bajas, 6 oleadas o 4 sectores; semanal: 750 bajas o 30 oleadas. Progreso parcial conservado entre expediciones dentro de su período. Premio automático tras confirmación; un contrato nuevo de tipo uniforme, sin repetir inmediatamente el anterior, empieza en cero. Calendario exacto y tratamiento de progreso sobrante siguen en CIE-007; no suponer reparto de excedentes.

### 4.7 Hitos intermedios que no son el final

**H-001 — Primera partida completa mínima:** guardia, pistola con recarga, Sprint, perseguidor, dos sectores sencillos enlazados, varias oleadas con preparación, experiencia y selección de mejoras, continuidad entre sectores, extracción/muerte y resumen. Arte provisional propio. Inventario completo, gacha, clasificación y servicios finales se incorporan después según dependencias. Este hito todavía no está implementado ni probado.

**MVP integrado:** el catálogo pequeño y los sistemas comprometidos funcionan juntos. Aún debe pasar aceptación, optimización, preparación y publicación. MVP significa primera versión mínima completa del alcance acordado; una demo aislada no satisface este objetivo.

**Primera versión publicada:** todas las etapas de juego cerradas con evidencia, clasificación oficial habilitada tras validación, servicios propios, URL pública y verificación de producción. Este es el cierre del global.

### 4.8 Parámetros iniciales vigentes de combate y recompensas

Estos valores son hipótesis adoptadas para implementar y probar; no pruebas de equilibrio ni resultados de ejecución. Las excepciones completas están en los IDs citados.

| Arma | Daño por proyectil | Proyectiles por disparo | Intervalo | Cargador | Recarga | Alcance | Velocidad de proyectil | Dispersión |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Pistola | 10 | 1 | 0,5 s | 12 | 1,5 s | 320 | 400 unidades/s | ±2° |
| Subfusil | 6 | 1 | 0,15 s | 24 | 1,8 s | 280 | 450 unidades/s | ±6° |
| Escopeta | 6 | 6 | 0,9 s | 6 cartuchos | 2,2 s | 180 | 350 unidades/s | Abanico total 30° |

D-165/D-166: reserva ilimitada, recarga automática al vaciarse, sin perforación base. D-168: cambio 0,2 s y espera del último disparo conservada. D-204: arma temporal nivel 1–5, +10 % de daño base por paso; D-215 conserva porcentaje de recarga al cambiar mods.

| Actor/habilidad | Parámetros iniciales |
|---|---|
| Soldados | Vida100, velocidad100, recogida XP78; categorías permanentes inicialmente0/10 |
| Sprint guardia | +60 % de velocidad base, 2 s; espera20 s desde activación |
| Primeros auxilios | 30 % vida máxima instantánea; espera30 s; no activar con vida completa |
| Perseguidor | Vida30, velocidad60, golpe10, aviso0,6 s, espera1,5 s; sin daño por contacto |
| Biológico | Vida24, velocidad50, proyectil12, aviso0,6 s, intervalo2,2 s, rango de ataque260, velocidad de proyectil190 |
| Jefe | Vida600, velocidad45; golpe30, radio64, aviso0,85 s, espera2,5 s; refuerzos2/8 s y máximo4 vivos; salida desde inicio, interacción2 s cancelable |

D-190/D-191/D-206: mapas normales3–5 oleadas equiprobables; primera neutralización, siguientes alternan resistencia60 s/neutralización; preparación20 s, Listo anticipado si es válido. D-207: primera oleada12 perseguidores; otras neutralizaciones16+4(s−1)+2(o−1), máximo60. D-208: cuatro apariciones iniciales y flujo0,55/s +0,06/sector +0,03/oleada, máximo2/s y CAP64 conjunto. Fuera de pantalla real y suelo transitable. Resistencia cesa generación a60 s y requiere eliminar restantes.

| Sector | Chance de cofre por oleada antes de 10 min | Máximo cofres/mapa | Tickets antes de 10 min | Desde 10 min de combate |
|---|---:|---:|---|---|
| 1–3 | 10 % | 1 | 1–2, uniforme | 15 %; 1–3 tickets |
| 4–7 | 15 % | 2 | 1–2, uniforme | 20 %; 1–3 tickets |
| 8+ | 20 % | 3 | 1–3, uniforme | 25 %; 1–4 tickets |

D-144/D-220: bonus de diez minutos una sola vez, contenido fijado al aparecer, abrir no libera cupo. Equipo adicional con50 % de chance, uniforme entre11 modelos; jefe vencido entrega uno. Enemigos normales no entregan equipo. Cofre tarda3,5 s; descubrimiento/flecha D-148. Hitos de reclutamiento y premios digitales nunca ocupan mochila.

XP temporal:14 por enemigo normal y220 total por jefe, Aprendizaje una vez; requisitos62/101/147… por fórmula D-189. Cartas D-195 y topes temporales D-253; XP del suelo reunida al cerrar oleada. XP permanente:5/normal,50/jefe,50/oleada,100/avance; costes100/125/150…; máximo100 espacios aplicados+pendientes por soldado.

### 4.9 Extracción, clasificación, guardado y publicación

- Primer jefe en sector4–6; después3–5 normales, sorteos fijados D-198. Evasión sigue a otro mapa con estado, sin premio de derrota ni penalización extra.
- Extracción en mapa normal desde sector3, chance25 %, garantizada cuarto mapa elegible consecutivo sin ella. Tras última oleada, confirmar y mantener interacción3 s; puede ignorarse. Contenido de mochila se descarga a almacén/buzón/resultado; mantener equipado.
- Score oficial bruto100×oleadas cumplidas+250×sectores superados+400×jefes derrotados. Extraer conserva90 %; morir75 %, piso entero; nunca bajar récord histórico. Ranking de pruebas usa tiempo activo con esos factores, separado del oficial. Mensual e histórico, global/país, mes UTC, mejor marca por jugador/tabla.
- D-225 A aprobada: servidor calcula score y controla coherencia, sesiones/deduplicación, combate sigue local. Puede aceptar fraude plausible; no prometer protección de torneo ni registrar simulación completa como alcance inicial.
- D-236–244: dueño UID, copias/ubicaciones únicas, checkpoint entre oleadas, operaciones/revisiones confirmadas, continuar oleada offline y esperar. Transferencia revoca otro dispositivo; rollback de combate invalida ranking. Acceso Google/correo real verificado; recuperación/vinculación explícitas.
- D-265: Firebase Hosting propio y .web.app inicial, sin dominio comprado. Objetivo20 USD/mes para todo el juego; estimaciones D-245 no garantizan gasto. Configuración, facturación y despliegue requieren autorización separada. La web de seguimiento continúa independiente.


## 5. Registro de decisiones y propuestas

**D-001–D-132 son el registro histórico de aprobaciones hasta v0.7.** Sus anotaciones de «pendiente» describen ese momento; las concreciones actuales se encuentran en D-133–D-275 y en la tabla Q actualizada. No interpretar anotaciones históricas como nuevas preguntas ni sustituir una decisión aprobada por su propuesta anterior.

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

### Consolidación de decisiones D-133–D-275

Las filas conservan identificadores estables y distinguen aprobación expresa, adopción por delegación y propuesta pendiente. Todos los valores de combate/economía/rendimiento son iniciales y requieren las pruebas previstas; no son comportamiento implementado o equilibrio demostrado. Las decisiones propuestas D-266/D-268/D-272 no se convierten en aprobadas por solicitar guardar este archivo. D-245 contiene estimaciones y avisos propuestos, no contratación ni límite de gasto probado.

**Sustituciones/precisiones:** D-213 precisa D-139 y sustituye la condición de cierre de D-152 para contar puntos pendientes; se conservan ambas anteriores. D-215 completa D-172. D-225 fue pendiente durante la comparación A/B/C y posteriormente el director aprobó expresamente A; reproducción o simulación de combate no entran en primera versión. D-265 fue pendiente hasta aprobación expresa de Firebase Hosting.

| ID | Tema | Estado y origen de aprobación | Alternativa, magnitudes y consecuencias |
|---|---|---|---|
| D-133 | Misiones combinadas | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Un contrato renovable, diarias y semanales; sustituye el pendiente D-133 de v0.7. |
| D-134 | Cantidad y premios de misiones | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Un contrato activo da 1 ticket de suministros; tres diarias dan 1 cada una; dos semanales dan 3 cada una. |
| D-135 | Progreso de misiones | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Las metas parciales sobreviven a muerte/extracción y nuevas expediciones dentro de su período vigente. |
| D-136 | Metas iniciales | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Renovable: 50 bajas, 3 oleadas o 2 sectores; diaria: 150 bajas, 6 oleadas o 4 sectores; semanal: 750 bajas o 30 oleadas. Evasión del jefe cuenta para avance, no para victoria. |
| D-137 | Recompensa confirmada | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Premio automático tras confirmación de servidor y aviso; renovar contrato. Tickets digitales no entran en mochila. |
| D-138 | Renovación del contrato | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Tipos equiprobables; sin repetir el inmediatamente anterior y nuevo progreso cero. Excedentes y calendario todavía CIE-007. |
| D-139 | Duplicado al completar entrenamiento | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Un ticket de suministros si no hay mejora disponible; en otro caso mejora categoría del soldado repetido. Precisado después por D-213, incluidos puntos pendientes. |
| D-140 | Reclutamiento en cofres | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Cofres aleatorios según combate y sector además de tres hitos únicos de un ticket: primera oleada, llegar a sector 2 y a sector 3. No aprobar una bonificación recurrente cada diez sectores. |
| D-141 | Reloj de cofres | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Tiempo acumulado de combate activo de la expedición, entre mapas; excluye preparación, pausas y menús. |
| D-142 | Momento de sorteo de cofres | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Un intento al completar cada oleada; como máximo aparece un cofre por intento exitoso. |
| D-143 | Oleadas por mapa normal | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Entre 3 y 5; distribución equiprobable concretada en D-190. |
| D-144 | Tabla de cofres | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Sectores 1–3: 10 % por oleada, máximo 1 cofre/mapa, 1–2 tickets; 4–7: 15 %, máximo 2, 1–2; 8+: 20 %, máximo 3, 1–3. A 10 minutos de combate: una vez +5 puntos de probabilidad y +1 al máximo de tickets. Abrir no libera cupo y el contenido se fija al aparecer. |
| D-145 | Salida tras última oleada | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Queda disponible para recoger y salir cuando el jugador quiera; sin traslado forzado. La salida del jefe conserva disponibilidad desde el inicio. |
| D-146 | Apertura de cofre | Aprobada/adoptada; respuesta o delegación D-182 según conversación | 3,5 segundos de proximidad; continúa el disparo automático y alejarse hace retroceder el progreso. Radio y velocidad de pérdida pendientes CIE-004. |
| D-147 | Entrega de tickets del cofre | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Van directamente a cuenta tras confirmación; no quedan en suelo ni se pierden con mochila. |
| D-148 | Descubrimiento de cofre | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Antes de verlo en pantalla solo aviso de cofre sin descubrir; flecha una vez descubierto. Sin minimapa o niebla de guerra añadidos por esta decisión. |
| D-149 | Fuentes de XP permanente | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Neutralizaciones y bonos por oleada/avance; independientes de XP temporal. |
| D-150 | Coste progresivo de nivel permanente | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Requisitos crecientes; cifras D-153 y límite de puntos D-213. |
| D-151 | Elección permanente en preparación | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Elegir categoría entre oleadas; el efecto se aplica también a la expedición vigente una vez confirmado. |
| D-152 | Entrenamiento máximo | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Al completar las categorías cesan XP/niveles permanentes y continúa XP temporal. D-213 sustituye la condición simple: también cuenta los puntos pendientes que reservan todos los espacios. |
| D-153 | XP permanente inicial | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Enemigo común 5; jefe 50; oleada 50; avance de sector 100, acumulables si aplican. Huir del jefe da avance, sin XP de su derrota. Costes adicionales de nivel: 100, 125, 150, 175… con +25 y sobrante conservado. |
| D-154 | Aprendizaje | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Solo multiplica XP temporal, nunca XP permanente. |
| D-155 | Composición de porcentajes | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Bonificaciones de un atributo sumadas sobre su valor base; no multiplicación sucesiva. |
| D-156 | Diez categorías permanentes | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Diez pasos/categoría: Vitalidad +5 %; Protección +2 pp; Potencia +3 %; Cadencia −2 %; Recarga −3 %; Movilidad +2 %; Recolección +10 %; Aprendizaje +5 % temporal; Recuperación +0,1 vida/s; Especialización −3 % de espera de habilidad. |
| D-157 | Topes combinados | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Protección 70 %; reducción de intervalo, recarga de cargador y espera de habilidad hasta 60 % de su base. |
| D-158 | Cambio de vida máxima permanente | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Aumentar vida actual por el incremento de vida máxima, sin curación completa. |
| D-159 | Regeneración | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Activa en combate y preparación temporizada; detenida en pausa y exploración libre tras completar sector. |
| D-160 | Movilidad | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Velocidad normal hasta +50 % de base; Sprint añade su propio bonus de base y puede superar ese límite. |
| D-161 | Habilidades iniciales | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Sprint +60 % de velocidad base por 2 s y espera 20 s desde activación. Médico cura 30 % de vida máxima y espera 30 s; con vida completa no activa ni consume espera. |
| D-162 | Estados de habilidades | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Sprint en combate, preparación y exploración; curación solo combate/preparación. Tiempos corren en esas fases activas, se congelan en pausa y se conservan al cambiar de sector. |
| D-163 | Bases de soldados | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Guardia y médico comparten estadísticas iniciales, diferenciados por habilidad y mejoras propias. |
| D-164 | Soldado inicial | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Nivel permanente 1, XP cero, categorías 0/10; vida 100, velocidad 100 unidades/s, radio de recogida XP 78, protección y regeneración cero. Unidades de mundo, no píxeles CSS. |
| D-165 | Pistola | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Daño 10, un proyectil, intervalo 0,5 s, cargador 12, recarga 1,5 s, alcance 320, velocidad de bala 400 unidades/s, desviación ±2°, sin perforación, reserva infinita y recarga automática al vaciarse. |
| D-166 | Subfusil y escopeta | Aprobada expresamente por el director | Subfusil: daño 6, intervalo 0,15 s, cargador 24, recarga 1,8 s, alcance 280, bala 450 unidades/s, desviación ±6°. Escopeta: seis perdigones de daño 6, intervalo 0,9 s, seis cartuchos, recarga 2,2 s, alcance 180, velocidad 350, abanico total 30°. Un cartucho/disparo; varios perdigones pueden impactar al mismo enemigo. Sin perforación base, reserva infinita. |
| D-167 | Copias del mismo modelo | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Dos copias físicas del mismo modelo equipables; una activa y estados independientes de mods, munición y recarga. |
| D-168 | Cambio y tiempos de arma | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Cambio 0,2 s; conservar espera compartida del último disparo para impedir alternar copias y saltarse la cadencia. Recarga inactiva continúa. Tiempos avanzan en combate/preparación/exploración y se congelan en pausa; se conservan entre sectores. |
| D-169 | Seis mods iniciales | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Empuñadura −30 % dispersión; asistida −15 % recarga; reforzado +15 % daño; ampliado +50 % capacidad y +15 % recarga; rápido −15 % intervalo y +30 % dispersión; perforante +1 impacto y −10 % daño. Primeros cuatro para las tres armas; últimos dos para pistola/subfusil. Dos slots, sin duplicar el mismo mod por arma. Ampliados: 18/36/9 disparos. |
| D-170 | Gestión de mods | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Gratis y sin tiempo añadido en base/preparación; aplicar tras confirmar y devolver la misma copia retirada si hay espacio. |
| D-171 | Precisión de estadísticas | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Daño y vida conservan fracciones en cálculo; redondear solo la presentación. |
| D-172 | Cambio de capacidad | Aprobada/adoptada; respuesta o delegación D-182 según conversación | No rellena cargador; conserva munición limitada al nuevo máximo. 8/12 → 8/18 y 16/18 → 12/12. Progreso de recarga precisado en D-215. |
| D-173 | Unidad de inventario | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Arma, mod suelto y mochila de reserva: un espacio por copia, sin apilado. Mods instalados integran el arma; dos armas y mochila equipadas no ocupan el interior de mochila. |
| D-174 | Mochilas | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Capacidades 8 y 16, sin penalización de movilidad. |
| D-175 | Almacén y buzón | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Almacén compartido de 60 espacios y buzón de 30 objetos, sin caducidad; arma con mods una unidad también en buzón. |
| D-176 | Recogida física | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Botón Recoger por proximidad, hacia mochila y sin equipar automáticamente. Si no cabe, sigue en suelo con aviso. XP permanece automática. |
| D-177 | Reciclaje durante expedición | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Disponible en base, resultado/entrega pendiente y entre oleadas. Puntos confirmados sobreviven a la muerte; decisión expresa del director. |
| D-178 | Temporizador de preparación | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Se pausa al elegir mejoras; sigue al gestionar equipo/reciclaje. Pausa congela regeneración y tiempos de habilidad/arma. |
| D-179 | Preparación agotada | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Cerrar gestión opcional y descartar selecciones sin confirmar; las confirmadas pendientes de servidor se resuelven en espera técnica antes de otra oleada. |
| D-180 | Equipo en suelo | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Permanece hasta salir del escenario o terminar expedición, sin caducidad temporal. Lo no recogido se abandona, no se envía al buzón. |
| D-181 | Botín físico de expedición | Aprobada/adoptada; respuesta o delegación D-182 según conversación | Además de tickets, equipo desde cofres y jefes vencidos; no desde enemigos normales. |
| D-182 | Delegación de planificación | Aprobada expresamente por el director | El director autoriza adoptar decisiones claras usando primero la base y preguntar solo dudas relevantes. No autoriza código, ejecución, servicios, publicación o guardado automático. |
| D-183 | Probabilidad de equipo | Aprobada expresamente por el director | Conservar la referencia de cofre grande: 50 % de un objeto físico; jefe vencido entrega siempre uno. Tickets del cofre son independientes. |
| D-184 | Modelos del botín | Aprobada expresamente por el director | Elección uniforme entre once modelos iniciales: tres armas, seis mods y dos mochilas. Armas nuevas sin mods instalados. |
| D-185 | Sustituir mod con mochila llena | Aprobada expresamente por el director | Confirmar intercambio directo; el mod retirado ocupa el espacio liberado por el nuevo, sin pérdida automática. |
| D-186 | Cambiar mochila | Aprobada expresamente por el director | Solo si el contenido final cabe; rechazar una reducción incompatible, sin tirar objetos automáticamente. |
| D-187 | Entrega de excedentes | Aprobada expresamente por el director | Llenar almacén y después buzón; lo restante queda en resultado único pendiente que bloquea otra expedición hasta resolverlo. Retorno equipado precisado en D-216. |
| D-188 | Mejoras temporales | Adoptada por delegación D-182; planificación | Tres cartas distintas y elegir una; niveles acumulados se resuelven en preparación con reloj pausado. |
| D-189 | Curva de XP temporal | Adoptada por delegación D-182; planificación | Conservar Player.xpFor(L)=floor((8+6L+1,6×L^1,75)×4): primeros requisitos 62, 101, 147. Distinta de XP permanente. |
| D-190 | Cantidad de oleadas normal | Adoptada por delegación D-182; planificación | Tres, cuatro o cinco con igual probabilidad. |
| D-191 | Preparación inicial | Adoptada por delegación D-182; planificación | 20 segundos, con Listo anticipado cuando las mejoras se resuelvan y no haya operaciones pendientes. |
| D-192 | Población de combate | Adoptada por delegación D-182; planificación | Máximo global inicial 64 enemigos activos, incluido jefe y refuerzos; unificar todas las rutas de aparición. No acredita FPS. |
| D-193 | Navegación | Adoptada por delegación D-182; planificación | Conservar BFS existente primero y validar salas/pasillos; adaptar solo con evidencia de necesidad. |
| D-194 | Bajas reales | Adoptada por delegación D-182; planificación | Eliminar/recolocar por atasco no concede XP, baja ni avance de neutralización. |
| D-195 | Cartas de atributo temporales | Adoptada por delegación D-182; planificación | Vitalidad +20 vida máxima/actual; Potencia +10 % de daño base; Movilidad +7 % base; Cadencia −8 % de intervalo; Protección +6 pp; Recuperación +0,9 vida/s; Recolección +30 % radio base; Aprendizaje +12 % XP temporal; Curación hasta 45 % de vida máxima si falta vida. Excluir cartas sin efecto por topes; D-253 completa límites. |
| D-196 | Enemigos normales iniciales | Adoptada por delegación D-182; planificación | Perseguidor: vida 30, velocidad 60, golpe 10, aviso 0,6 s, espera 1,5 s, detenerse y fijar dirección al preparar. Biológico: vida 24, velocidad 50, proyectil 12, aviso 0,6 s, intervalo 2,2 s, rango de ataque 260 y bala 190 unidades/s sin seguimiento. Sin daño por contacto; cada neutralización 14 XP temporal y 5 permanente. |
| D-197 | Jefe inicial | Adoptada por delegación D-182; planificación | Vida 600, velocidad 45; golpe de área 30, radio 64, aviso 0,85 s, espera 2,5 s. Invocar dos perseguidores cada 8 s, aviso 1 s y máximo cuatro refuerzos vivos, todos dentro de CAP 64. Bajo 50 % de vida: +15 % velocidad, espera de golpe 2 s, sin acortar avisos. Respeta paredes. Derrota: 220 XP temporal, XP/recompensa física acordadas. Huida desde inicio: interacción 2 s, cancelada por movimiento/daño. Refuerzos restantes pendientes CIE-005. |
| D-198 | Calendario de jefes | Adoptada por delegación D-182; planificación | Primeros tres sectores normales; primer jefe en sector 4, 5 o 6 equiprobables. Después de vencer/evadir: tres a cinco sectores normales antes del siguiente. Sorteos persistidos, sin repetir al reanudar. |
| D-199 | Extracción | Adoptada por delegación D-182; planificación | En mapas normales desde sector 3: 25 % por mapa elegible y garantía en cuarto elegible consecutivo sin extracción. Anuncio al entrar, habilitada tras última oleada; confirmar e interactuar 3 s, moverse cancela. Puede ignorarse; no confundir con huida del jefe. |
| D-200 | Escalado inicial | Adoptada por delegación D-182; planificación | Para sector s/oleada o: vida ×(1+0,15(s−1)+0,05(o−1)); daño ×(1+0,08(s−1)); velocidad +2 % por sector hasta +20 %. Jefe usa sector sin incremento de oleada. Sustituir escalado temporal y no acumular multiplicadores originales. Hipótesis pendiente de equilibrio. |
| D-201 | Autoapuntado | Adoptada por delegación D-182; planificación | Filtrar vivos, alcance y paredes/indestructibles para las tres armas. Priorizar enemigo a menos de 80 unidades, luego jefe, luego cercano. Conservar objetivo válido; cambiar por prioridad superior o candidato de igual prioridad al menos 20 % más cerca. |
| D-202 | Colisiones y perforación | Adoptada por delegación D-182; planificación | Una bala no repite daño al mismo enemigo; perdigones independientes. Pared/indestructible bloquea; sólido destructible consume presupuesto. Comprobar trayecto y ordenar impactos por distancia. Conservar protección tras daño 0,45 s y evitar que avisos la anulen. |
| D-203 | Geometría inicial | Adoptada por delegación D-182; planificación | Conservar cuadrícula/chunks/caché/BFS. Corredores/puertas principales cuatro casillas de ancho y salas de combate mínimo 12×12; rutas conectadas y salida del jefe accesible desde inicio, sin decoración bloqueante. Validar radios reales. |
| D-204 | Nivel temporal de arma | Adoptada por delegación D-182; planificación | Nivel 1 a 5, +10 % de daño base por paso, ligado a copia durante expedición. Cambiar no borra; copia nueva nivel 1. Sin rellenar cargadores ni reiniciar tiempos. Peso de carta arma 8 y atributo 7. Sin creación gratuita de armas ni evolución inicial. |
| D-205 | Pausa móvil | Adoptada por delegación D-182; planificación | Ocultar aplicación pausa combate, preparación y exploración, congela tiempos/regeneración/interacciones y limpia entradas. Volver requiere Continuar. Rotación adapta interfaz y conserva estado sin forzar horizontal. Recarga de página: checkpoint; rollback de combate invalida ranking. |
| D-206 | Objetivos de oleada | Adoptada por delegación D-182; planificación | Neutralizar grupo o resistir 60 s; primera oleada de cada mapa normal neutralización, siguientes alternan. Adaptar controlador aprovechando reloj/aparición. |
| D-207 | Cuotas y composición | Adoptada por delegación D-182; planificación | Primera oleada de primera expedición: 12 perseguidores. Otras neutralizaciones: 16+4(s−1)+2(o−1), máximo 60. Desde segunda oleada, aproximadamente 75 % perseguidores/25 % biológicos. |
| D-208 | Aparición gradual | Adoptada por delegación D-182; planificación | Cuatro enemigos iniciales; después 0,55/s +0,06 por sector y +0,03 por oleada, máximo 2/s, limitado por cuota y CAP 64. Puntos transitables fuera de vista real. |
| D-209 | Fin de combate normal | Adoptada por delegación D-182; planificación | Neutralización al derrotar grupo; resistencia deja de generar a 60 s y requiere eliminar restantes. Entonces preparación 20 s. Sin aparición en pausa/preparación/exploración de sector cerrado; jefe independiente. |
| D-210 | Objetivos inaccesibles | Adoptada por delegación D-182; planificación | Tras 10 s activos confirmado inaccesible y fuera de pantalla, intentar recolocar con identidad/vida. Si falla, reponer objetivo en cola sin bajas/XP falsas. Prueba de bloqueo obligatoria. |
| D-211 | XP temporal exacta | Adoptada por delegación D-182; planificación | Recoger automáticamente XP del suelo al cerrar oleada antes de cartas. Aprendizaje aplicado una sola vez. Orbes del jefe suman 220 exactos. Bonos 50/100 de oleada/avance son solo permanentes. |
| D-212 | XP permanente confirmada | Adoptada por delegación D-182; planificación | Bajas provisionales durante combate; confirmar al cerrar oleada o resolver muerte/extracción con eventos únicos. Confirmado persiste al morir; coherencia de servidor no prueba combate. |
| D-213 | Puntos pendientes y máximo | Adoptada por delegación D-182; planificación | Puntos guardados por soldado hasta elegir. Mejoras aplicadas más puntos pendientes no superan 100; al reservar todo se detiene XP permanente, duplicado sin espacio da 1 ticket. Precisa D-139 y sustituye condición simple D-152. |
| D-214 | Cartas elegibles | Adoptada por delegación D-182; planificación | Tres distintas si existen, o las disponibles. Identificar mejora por copia física; excluir nivel de arma 5, atributo al tope o cura con vida completa. Si no hay opción, guardar elección pendiente sin bloquear preparación. |
| D-215 | Mods y recarga en curso | Adoptada por delegación D-182; planificación | Conservar porcentaje completado al cambiar duración. Capacidad no rellena munición; solo recarga terminada llena. Mantener tiempos de disparo/cambio. |
| D-216 | Retorno al extraer | Adoptada por delegación D-182; planificación | Conservar armas/mods y mochila equipados; contenido al almacén/buzón/resultado pendiente, mochila vacía para siguiente preparación. Identidad/origen conservados. |
| D-217 | Kit y disponibilidad | Adoptada por delegación D-182; planificación | Antes de empezar comprobar equipo, mochila, almacén, buzón y entregas; resolver primero resultado pendiente. Pistola solo si no existe arma disponible y mochila pequeña solo si no existe mochila. Origen gratuito mantiene aporte cero; mods normales su valor. |
| D-218 | Sorteo de recuperación | Adoptada por delegación D-182; planificación | Porcentaje uniforme 25–50 %, redondeo probabilístico y selección uniforme de unidades, sin sesgo por precio. Arma+mods una unidad; mochila/contenido separados. Un resultado persistido por servidor, sin reroll. |
| D-219 | Probabilidades de reclutamiento | Adoptada por delegación D-182; planificación | 50 % guardia/50 % médico; tercera tirada garantiza médico solo si no se obtuvo; duplicados según mejoras/compensación. |
| D-220 | Tickets equiprobables por cofre | Adoptada por delegación D-182; planificación | Cantidades enteras uniformes. Sectores 1–3 y 4–7: 1–2 antes de 10 min, 1–3 después; 8+: 1–3 y 1–4. Contenido fijo al aparecer, independiente del 50 % de equipo. |
| D-221 | Reclamación y resultado pendiente | Adoptada por delegación D-182; planificación | Espacio y confirmación para mover mismo objeto. Ambos depósitos llenos impiden gastar en gacha. Resultado único sin caducidad; liberar espacio o reciclar con confirmación; nueva expedición bloqueada hasta resolverlo. |
| D-222 | Fórmula oficial inicial | Adoptada por delegación D-182; planificación | Bruto=100×oleadas cumplidas+250×sectores superados+400×jefes derrotados, cada objetivo una vez. Sector normal al cerrar última oleada, encuentro de jefe al vencer o evadir. Evasión sin oleada/victoria de derrota. Sin puntos por tiempo, bajas sueltas o tareas diarias. |
| D-223 | Penalización de resultado | Adoptada por delegación D-182; planificación | Extraer conserva 90 % del bruto; morir 75 %, piso entero, sin reducir récords previos. Evasión del jefe sin penalización adicional. Ranking de pruebas: mismos factores sobre tiempo activo; pausas/preparación/espera técnica excluidas. |
| D-224 | Tablas y país | Adoptada por delegación D-182; planificación | Mensual e histórica, global/país; diaria/semanal pospuestas. Mejor expedición por cuenta/tabla; mes de cierre confirmado UTC. País declarado antes de primera marca, sin verificación de nacionalidad ni cambios ordinarios iniciales. Empate oficial: más sectores, menor tiempo activo, aceptación más antigua. |
| D-225 | Verificación competitiva A | Aprobada expresamente por el director | APROBACIÓN EXPRESA: combate local, puntuación calculada por servidor, sesión única, coherencia de avances/tiempos y prevención de duplicados; solo actualizar mejores marcas. Riesgo aceptado: partidas falsas con cifras plausibles o invulnerabilidad local pueden pasar. Sin simulación/reproducción completa inicial ni garantía de ausencia de trampas. No autoriza servicios/gasto. |
| D-226 | Vista y áreas seguras | Adoptada por delegación D-182; planificación | Combate cuadrado inicial 768×768 unidades, misma extensión en ambas orientaciones; sobrante para controles/HUD. Respetar muescas y barras. |
| D-227 | HUD | Adoptada por delegación D-182; planificación | Vida, munición, habilidad, sector/oleada/objetivo; diferenciar nivel permanente y temporal. Reloj de preparación solo en preparación. |
| D-228 | Joystick | Adoptada por delegación D-182; planificación | Conservar flotante, analógico, tamaños existentes y dos dedos para moverse/usar habilidad; separar zonas de botones. |
| D-229 | Botón de habilidad | Adoptada por delegación D-182; planificación | Mínimo 60 píxeles CSS; icono/tiempo restante. Médico con vida llena no consume habilidad. |
| D-230 | Botones de arma | Adoptada por delegación D-182; planificación | Dos copias con munición/recarga y área mínima 48×48 píxeles CSS; mantener restricciones temporales. |
| D-231 | Interacciones UI | Adoptada por delegación D-182; planificación | Recoger equipo por botón contextual con nombre; cofre por proximidad/barra; salidas con acción y tiempo. Aviso de cofre desconocido sin ubicación. |
| D-232 | Inventario UI | Adoptada por delegación D-182; planificación | Selección abre detalle y acciones permitidas; sin necesidad de arrastrar. Mostrar capacidad; confirmar reciclaje con componentes consumidos. |
| D-233 | Cartas UI | Adoptada por delegación D-182; planificación | Apiladas en vertical, columnas con espacio; efecto y copia afectada/resultante. Reabrir conserva oferta sin reroll. |
| D-234 | Legibilidad y calidad | Adoptada por delegación D-182; planificación | Avisos con contorno/animación además de color; conservar calidad automática, números opcionales y efectos reducidos. Menos decoración nunca oculta ataques/proyectiles/interacciones. |
| D-235 | Audio e idioma | Adoptada por delegación D-182; planificación | Motor y volúmenes separados conservados; audio de partida pausado en segundo plano. Primera versión español, infraestructura inglesa conservada para después; ajustes por dispositivo. |
| D-236 | Información de cuenta | Adoptada por delegación D-182; planificación | UID Firebase Auth como dueño; perfil público separado de datos privados, inventario y expedición. XP/categorías/puntos por soldado; tickets/misiones/reciclaje/almacén de cuenta. |
| D-237 | Identidad y ubicación | Adoptada por delegación D-182; planificación | Copia única con modelo/origen/ubicación; un mod instalado en una arma. Operaciones confirmadas sustituyen merge de máximos/uniones para objetos consumibles/perdibles. |
| D-238 | Checkpoint | Adoptada por delegación D-182; planificación | Sector/oleada, semilla/cambios del mapa, vida/posición, armas/munición/recargas, tiempos de habilidad, XP/mejoras/ofertas, botín/interacciones, avance y validez. Sin imágenes/cachés gráficas ni guardado continuo de combate. |
| D-239 | Operaciones idempotentes | Adoptada por delegación D-182; planificación | ID estable y revisión esperada; confirmar conjuntamente checkpoint/XP/misiones/recompensas. Reintento aceptado devuelve resultado sin repetir; comandos viejos/incompatibles sin nuevos efectos. |
| D-240 | Red y confirmación | Adoptada por delegación D-182; planificación | Acabar oleada local al perder conexión, esperar antes de otra; mostrar Pendiente/Guardado. Reintentos crecientes y al reconectar. Recarga con rollback invalida ranking, conserva confirmado. |
| D-241 | Propietario de expedición | Adoptada por delegación D-182; planificación | Una por cuenta, dispositivo autorizado en servidor. Otra pestaña/teléfono no crea segunda. Cerrar navegador/inactividad no resuelve muerte automática. |
| D-242 | Transferencia de dispositivo | Adoptada por delegación D-182; planificación | Confirmar Continuar aquí, revocar permiso anterior y recibir último confirmado. Preparación guardada conserva validez; rollback de combate excluye ranking y avisa actividad no confirmada. |
| D-243 | Acceso | Adoptada por delegación D-182; planificación | Google o correo real/contraseña con alias separado; correo verificado antes de expediciones, recuperación Firebase Auth, mínimo inicial 8 caracteres. Vincular exige acceso a métodos; mismo correo no fusiona inventarios. No correos ficticios heredados. |
| D-244 | Versiones | Adoptada por delegación D-182; planificación | Datos, reglas y score versionados; migración/caché con nombres propios. Migraciones persistentes en servidor sin reiniciar progreso; evitar recarga forzada en combate. Checkpoint incompatible conservado hasta migración validada. |
| D-245 | Escenarios de coste | Adoptada por delegación D-182; planificación | Supuesto 30 oleadas/jugador/día y 4 lecturas+4 escrituras/checkpoint. 50/200/1000 activos: 1500/6000/30000 checkpoints y 6000/24000/120000 lecturas y escrituras/día. Excluye menús/economía/ranking/reintentos/Auth/tráfico/hosting. Avisos propuestos 10/15/18 USD, no corte efectivo ni garantía del objetivo 20. Sin gasto autorizado; actuación CIE-009. |
| D-246 | Escala gráfica | Adoptada por delegación D-182; planificación | PX=2 unidades por píxel; tiles 16×16 de arte. Marcos transparentes iniciales 64×64 soldados/normales, 96×96 jefe; sin suavizado. Marcos no fijan tamaño de colisión. |
| D-247 | Radios | Adoptada por delegación D-182; planificación | Soldado/perseguidor 12, biológico 14, jefe 22 unidades, anclados en pies y sujetos a paredes; validar pasos/esquinas/cobertura. |
| D-248 | Animaciones | Adoptada por delegación D-182; planificación | Ocho direcciones: reposo 2, caminar 4, atacar/disparar 2, preparar 2, daño 1, caída 3 fotogramas/dirección iniciales; avisos coinciden con preparación. Cuatro poses de láminas no equivalen a animación completa. |
| D-249 | Capa de arma | Adoptada por delegación D-182; planificación | Anclaje por dirección/pose, dibujo delante/detrás y fogonazo en boca; no generar balas al otro lado de una pared por offset visual. |
| D-250 | Seis módulos | Adoptada por delegación D-182; planificación | Entrada, sala amplia, sala con cobertura, corredor recto, intersección, salida; rotación/decoración para variedad. Jefe reutiliza sala amplia. Cofres/extracción en puntos válidos sin bloquear rutas. |
| D-251 | Ambiente visual | Adoptada por delegación D-182; planificación | Beige desaturado/gris industrial y oscuridad moderada; iluminación simple Canvas. Luces complejas pospuestas; avisos/enemigos/salidas legibles y áreas representadas con geometría real. |
| D-252 | Ambiente sonoro | Adoptada por delegación D-182; planificación | Motor existente para ventilación/fluorescentes/maquinaria, armas e impactos/anomalías. Avisos peligrosos reconocibles y con prioridad; equivalentes visuales para jugar sin audio. |
| D-253 | Topes temporales adicionales | Adoptada por delegación D-182; planificación | Vitalidad +200 vida; Potencia +100 % base; Recuperación +4,5 vida/s; Recolección +150 % radio base; Aprendizaje +120 % XP temporal. Conservar topes conjuntos previos; carta parcial muestra/concede solo resto. Niveles de arma separados. |
| D-254 | Metas de rendimiento | Adoptada por delegación D-182; planificación | 60 FPS objetivo; media ≥55 y 95 % de intervalos de frame <25 ms en tres teléfonos/ambas orientaciones. Sesiones 30 min y carga controlada hasta 64 enemigos/128 proyectiles; 128 es ensayo, no tope para borrar disparos. Revisar memoria; pantalla inicial utilizable ≤5 s bajo 10 Mbps/100 ms. Todo pendiente de ejecución/medición. |
| D-255 | Aceptación integrada | Adoptada por delegación D-182; planificación | Recorridos de combate/mejoras/sectores, victoria/huida/extracción/muerte, inventario lleno/gacha/reciclaje/red/dispositivo. Sin defectos conocidos que bloqueen partidas o dupliquen/pierdan objetos confirmados, corrompan puntuación o inutilicen control; verificar producción. |
| D-256 | Inicio y selección | Adoptada por delegación D-182; planificación | Guardia concedido al crear cuenta; selección de soldados desbloqueados adaptada. Test de personalidad pospuesto, sin condicionar acceso/atributos. |
| D-257 | Tipos iniciales | Adoptada por delegación D-182; planificación | Conservar puntos de cálculo con multiplicador por tipo ×1; protección/mods activos. Resistencias específicas futuras; biológico es descripción sin ventaja oculta. |
| D-258 | Evoluciones y fusiones | Adoptada por delegación D-182; planificación | Ratificar D-204: subir arma temporalmente, no transformarla ni crear otra. Código de referencia/evoluciones pospuestos. |
| D-259 | Clima y eventos | Adoptada por delegación D-182; planificación | Reutilizar ambiente visual compatible; cambios climáticos de daño/velocidad y eventos dorados/rescates/duendes pospuestos. Mantener misiones diarias/semanales/renovables. |
| D-260 | Grietas y arenas | Adoptada por delegación D-182; planificación | Reutilizar geometría para sala jefe; grietas/combate aparte/retorno con vida/premios especiales pospuestos, no eliminados de referencia. |
| D-261 | Rarezas y variantes | Adoptada por delegación D-182; planificación | Modelos de estadísticas fijas, sin calidad aleatoria ni shiny inicial. Colección sirve a soldados desbloqueados; ventajas por variantes futuras no aprobadas. |
| D-262 | Social mínimo | Adoptada por delegación D-182; planificación | Alias/perfil necesarios para cuenta/ranking; amigos/presencia/invitaciones/salas/logros extra pospuestos con coop. Excluir enlaces y mensajes de apoyo ajenos de nuestra interfaz. |
| D-263 | Demo invitada | Adoptada por delegación D-182; planificación | Guardia/pistola/Sprint, dos sectores normales de tres oleadas; termina al completar o tras 10 min de combate activo. XP/mejoras temporales, sin ranking/gacha/progreso persistente ni transferencia; aviso previo. No meta final. |
| D-264 | Copia/build propios | Adoptada por delegación D-182; planificación | DETECO/SCPSurvivor, trazabilidad al commit fijado, JS/Canvas/orden de módulos conservados; configurar rutas/recursos/servicios propios. Editar dev.html, generar distribución con versión exacta futura del Terser ya usado; sin ejecutar ahora. |
| D-265 | Alojamiento del juego | Aprobada expresamente por el director | APROBACIÓN EXPRESA: Firebase Hosting en proyecto propio, dirección inicial .web.app sin compra de dominio; tráfico dentro de presupuesto 20 USD. No autoriza configuración, billing ni despliegue; web de seguimiento independiente. |
| D-266 | Fuente de seguimiento propuesta | Propuesta; aprobación/activación pendiente | RoadmapSCP.json como única fuente editable y RoadmapSCP.md generado; diseño/decisiones/fases/tareas/riesgos/evidencias/novedades en repo del juego. Propuesta registrada, transición todavía no realizada ni asumida por la petición actual. |
| D-267 | Fases y dependencias | Adoptada por delegación D-182; planificación | Conservar P00–P11 e IDs; partida mínima, sistemas, validación del juego, ranking oficial, comprobación final y publicación. Demo no cierra global. |
| D-268 | Pesos por aprobar con plan | Propuesta; aprobación/activación pendiente | Conservar 53 tareas con suma 100; fases 10/8/10/12/12/6/10/10/4/8/6/4. Propuesta de cumplimiento, no de duración. Aprobación integral de línea base pendiente. |
| D-269 | Evidencia de finalización | Adoptada por delegación D-182; planificación | Criterios completos más versión/procedimiento/resultado/referencia. Solo CV aporta; documentación no acredita función jugable. Separar planificación/implementación. |
| D-270 | Versionado y reaperturas | Adoptada por delegación D-182; planificación | Guardar versiones/motivo/aprobación de cambios; regresión reabre y reduce aporte. Bloqueo con causa/dependencia/condición de resolución. No retirar pendientes para subir porcentaje. |
| D-271 | Novedades verificadas | Adoptada por delegación D-182; planificación | Una por avance significativo, evidencia y versión, una imagen+alt. Captura real para visual; tarjeta basada en hechos para técnico. Sin evidencia/imagen, pendiente de publicación. |
| D-272 | Automatización propuesta | Propuesta; aprobación/activación pendiente | GitHub Actions con validación/cálculo/publicación de web; manual y comprobación cada 30 min si se aprueba. Sin puntualidad garantizada; conservar última válida y fecha correcta ante fallo. Repo/destino/credenciales de web pendientes; nada activado. |
| D-273 | Candidato y publicación | Adoptada por delegación D-182; planificación | Commit/version identificados; preview con servicios de prueba, no aislamiento automático por URL. Tras aceptación y autorización, producción/recorridos/score oficial desde cero; nadie publicó por aprobar diseño. |
| D-274 | Recuperación de publicación | Adoptada por delegación D-182; planificación | Conservar al menos tres versiones de Hosting y referencias de código. Separar rollback de frontend, funciones y reparación de datos; frontend anterior no revierte inventario. Respaldo protegido y ensayo compatible con presupuesto antes de publicar; destino/retención por concretar. |
| D-275 | Cierre todavía pendiente | Adoptada por delegación D-182; planificación | No declarar plan listo: cerrar CIE-001…010 y consolidar contratos/evidencias. Aprobación del plan, implementación, pruebas, gasto y publicación continúan separadas. |

### Últimas decisiones y siguiente bloque

D-225 opción A y D-265 Firebase Hosting aprobadas expresamente. D-266–D-275 preparan el cierre documental y de publicación, sin aprobar el plan integral. El bloque siguiente propuesto es CIE-001–CIE-010. La última solicitud del director fue actualizar este registro; no equivale a contestar o autorizar ese siguiente bloque ni a empezar a programar.

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

### 6.2 Indicadores de la actualización v0.8

| Indicador | Estado |
|---|---|
| Avance global oficial del alcance final | **Pendiente de definición y aprobación final**: todavía hay decisiones bloqueantes y este desglose de pesos no es un plan integral aprobado |
| Índice provisional documental del roadmap v0.8 | **3 %**, exclusivamente por registro documental (2 puntos) y revisión panorámica estática (1 punto); resolver decisiones aisladas no completa por sí solo una tarea ponderada |
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
| P00-T01 | Consolidar decisiones, límites, alcance, pendientes y continuidad en RoadmapSCP. Evidencia: registro D-001–D-275, adopciones y propuestas diferenciadas; archivo legible y verificado documentalmente. | 2 % | 20 % | CV | 100 % |
| P00-T02 | Fijar versión y revisión panorámica con estructura y los 18 dominios. Evidencia: HEAD/estado de la copia y referencias del inventario; clasificar expresamente límites de acceso. No exige auditoría profunda ni ejecución. | 1 % | 10 % | CV | 100 % |
| P00-T03 | Completar análisis crítico de persistencia, economía, control de servicios, mundo modular, render/móvil y procedencia. Aceptación: cada riesgo crítico tiene evidencia, alternativas y método de validación. | 2 % | 20 % | EC | 0 % |
| P00-T04 | Resolver decisiones bloqueantes y aprobar catálogo, parámetros iniciales, balance, UX y reglas de misión/extracción. Aceptación: ningún pendiente de producto necesario para implementar queda implícito. | 2 % | 20 % | EC | 0 % |
| P00-T05 | Consolidar y aprobar arquitectura incremental, contratos, pruebas, escenarios de coste y especificación de seguimiento. Aceptación: responsabilidades cliente/servidor, datos y permisos definidos; riesgos residuales aceptados. | 2 % | 20 % | EC | 0 % |
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
| P03-T02 | Director de sectores/oleadas con objetivos, preparación inicial 20 s y dificultad por avance D-200. Probar fin de objetivo, condiciones de contingencia y continuidad de expedición. | 3 % | 25 % | P | 0 % |
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
| P08-T02 | Implementar fórmula oficial D-222/D-223, país/global y verificación básica A D-225. Se ejecuta después de P10-T01/T02, conforme a D-030; probar sus casos nuevos antes de publicar. | 1 % | 25 % | P | 0 % |
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
| P11-T02 | Preparar Firebase Hosting propio con .web.app inicial, servicios separados, permisos mínimos, controles de coste, respaldo y rollback aprobados; dominio comprado no incluido. Verificar configuración antes de solicitar autorización final de despliegue. | 1 % | 25 % | P | 0 % |
| P11-T03 | Publicar la versión autorizada y habilitar ranking oficial desde cero. Evidencia: URL, versión/commit y resultado de despliegue, sin conexiones a servicios originales. | 1 % | 25 % | P | 0 % |
| P11-T04 | Verificar producción: acceso, cuenta, partida, persistencia, gacha, almacén/buzón, clasificación, actualización y móviles. Registrar aceptación del director, incidencias residuales y entrega operativa. | 1 % | 25 % | P | 0 % |

**Salida y 100 %:** primera versión completa funcionando y publicada, pruebas finales documentadas y aceptación de cierre. Un despliegue fallido o una URL que solo muestra la demo mantiene tareas pendientes. La duración de observación en producción se debe fijar antes de esta etapa.

### Dependencias principales

P00 → P01 → P02 → P03/P04. P05 puede avanzar desde P01 una vez aprobados contratos. P04 + P05 habilitan P06; P05 + P06 habilitan P07. P03 + P05 + P07 habilitan P08 inicial. P09 acompaña el desarrollo y se cierra para P10. El cierre de P08/P10 sigue la secuencia especial indicada. P11 es la última etapa obligatoria.

El orden no autoriza ejecución paralela por agentes ni implementación automática. Cada tarea debe señalar sus dependencias reales antes de iniciarse. La validación es parte de cada entrega, no se aplaza toda hasta P10.

## 8. Lo que falta definir antes de programar y antes de publicar

**C** requiere decisión del director sobre alternativas fundamentadas. **T** requiere investigación/propuesta técnica del asesor; no se pregunta al director un dato comprobable leyendo código. **V** requiere ejecución/medición autorizada. Los temas se pueden agrupar coherentemente para aprobación; no es necesario convertir cada cifra en una pregunta aislada.

**Prioridad 1:** bloquea el diseño o el inicio de la tarea dependiente. **Prioridad 2:** bloquea integrar el MVP completo. **Prioridad 3:** bloquea publicar. Toda referencia a una propuesta significa pendiente, no aprobación tácita.

| ID | Estado actual y trabajo restante | Tipo/prioridad | Dependencias y bloqueo |
|---|---|---|---|
| Q-001 | Diseño resuelto D-126: suministros uniformes por grupo. Implementación/pruebas permanecen P07-T03. | Diseño resuelto | P07; no decisión bloqueante |
| Q-002 | Tablas y fuentes D-132/D-134/D-183/D-220 definidas. Pendiente validar economía conjunta, coste por sesión, duplicados/reciclaje y rutas repetidas; no cambiar cifras aprobadas sin nueva decisión. | Validación / 2 | P06/P07/P10 |
| Q-003 | Estructura/metas/premios/reclamación definidos D-133–138; calendario y excedentes CIE-007 pendientes. | Parcial / 2 | P07; CIE-007 |
| Q-004 | XP/costes/confirmación/límite de puntos definidos D-149–154/D-212/D-213. Pendiente implementación y casos límite de varios niveles/duplicados. | Diseño resuelto; validación / 2 | P04/P07 |
| Q-005 | Incrementos, acumulación y topes D-155–160/D-195/D-253 definidos como iniciales. Pendiente validar extremos y equilibrio. | Diseño inicial; validación / 1 | P04/P07/P10 |
| Q-006 | Tres armas, cambio, recargas y estados D-165–168/D-172/D-215. Pendiente probar; no inventar nuevas magnitudes. | Diseño resuelto; validación / 1 | P02/P04 |
| Q-007 | Seis mods/capacidades/gestión/intercambio definidos D-169–170/D-185/D-215; falta verificar todas las combinaciones y topes. | Diseño resuelto; validación / 1 | P04/P06 |
| Q-008 | Kit/origen/disponibilidad D-130/D-217 definidos. Pendiente comprobar reposición, pérdida/recuperación, mods y ubicaciones sin duplicados. | Diseño resuelto; validación / 1 | P06/P07 |
| Q-009 | Mochilas 8/16, almacén 60, buzón 30, unidades D-173–175/D-216/D-221 definidos. Pendiente concurrencia/overflow. | Diseño resuelto; validación / 1 | P05/P06 |
| Q-010 | Recogida/gestión/reciclaje/suelo/retorno D-176–187/D-216/D-232 definidos; guardar/salir/abandonar CIE-006 pendiente. | Parcial / 1 | P03/P06; CIE-006 |
| Q-011 | Porcentaje uniforme y selección D-218, regla D-100/D-101 definidos. Pendiente ensayo de distribuciones, grupos y respuesta perdida. | Diseño resuelto; validación / 1 | P05/P06 |
| Q-012 | Jefe inicial/patrones/huida D-197 definidos; refuerzos al derrotarlo y cierre exacto CIE-005 pendientes. | Parcial / 1 | P03/P08 |
| Q-013 | Primer jefe sectores 4–6; luego 3–5 normales, sorteo persistido D-198. Pendiente comprobar contador al vencer/evadir/reanudar. | Diseño resuelto; validación / 1 | P03/P08 |
| Q-014 | Objetivos/cuotas/ritmo/preparación D-190–191/D-206–210. Pendiente cierre del jefe CIE-005 y tratamiento de salida CIE-006. | Parcial / 1 | P02/P03 |
| Q-015 | Extracción desde sector 3, 25 %/garantía cuarto elegible, activación final y canalización 3 s D-199. Validar accesibilidad y resultado; H-001 de dos sectores requiere caso de ensayo específico, sin alterar reglas normales. | Diseño inicial; adaptación del ensayo / 1 | P02/P03/P06 |
| Q-016 | Escalado D-200 y CAP 64 D-192 definidos; 128 proyectiles es carga de prueba D-254, no tope jugable. Pendiente estabilidad de expediciones largas y memoria. | Validación / 1 | P03/P04/P10 |
| Q-017 | Autoapuntado/histéresis/visión/perforación/trayectoria D-201/D-202 definidos; validar sólidos/propiedades CIE-003. | Diseño inicial; validación / 1 | P02/P04 |
| Q-018 | Geometría/módulos/radios/navegación/atascos D-193/D-203/D-210/D-247/D-250. Semillas y conjuntos reproducibles concretos se fijarán al preparar pruebas; comprobar que rayos/volúmenes corresponden. | Validación y fixtures / 1 | P02/P03 |
| Q-019 | Paleta/escala/marcos/ciclos/anclajes D-246–251 definidos como iniciales. Falta producir y aprobar recursos finales desde originales accesibles; nombres visuales definitivos pendientes. | Producción/validación / 1 | P02/P09/P11; Q-038 |
| Q-020 | Audio/legibilidad/efectos reducidos D-234/D-235/D-252 definidos; falta producir avisos/ambiente y probar mezcla/desbloqueo. | Producción/validación / 2 | P09/P10 |
| Q-021 | Vista/HUD/táctil/inventario/cartas/español D-226–235 definidos; falta pruebas reales en safe areas/ambas orientaciones. | Diseño inicial; validación / 1 | P02/P09 |
| Q-022 | Acceso Google/correo/verificación/recuperación/vinculación D-243 definidos. Eliminación/retención CIE-008 pendiente; registrar versiones OS/navegador reales antes de ensayos. | Parcial / 1 | P05/P11 |
| Q-023 | Sesión/dispositivo/checkpoints/red D-238–242 definidos; salida/abandono CIE-006 pendiente y pruebas de carreras/respuestas perdidas necesarias. | Parcial / 1 | P05/P06/P08 |
| Q-024 | Identidad/revisión/operaciones/autoridad D-236–239/D-244 definidos. Contratos concretos de campos/validaciones y conservación de recibos se concretarán en CIE-010/P05 antes de implementarlos; no heredar merge de equipo. | Contrato pendiente / 1 | P05–P08 |
| Q-025 | D-225 A aprobada expresamente, riesgo residual aceptado; sin reproducción de combate en servidor. Implementar coherencia, sesiones, cálculo de puntuación y deduplicación; rechazo/revisión de sospechosos sin castigos económicos automáticos por un mero indicio. | Decisión resuelta; validación / 1 | P05/P08/P10 |
| Q-026 | Fórmula/penalizaciones/tablas/país/empates D-222–224 definidos. Falta comprobar y cerrar episodios de jefe CIE-005/salida CIE-006; revisión del límite de 6 h original necesaria para expedición infinita, no adoptado como duración máxima. | Diseño inicial; integración / 2 | P08/P10 |
| Q-027 | Demo online D-263: dos sectores×tres oleadas, límite 10 min activos, sin persistencia/gacha/ranking/transferencia. Verificar límites y comunicación. | Diseño resuelto; validación / 2 | P08-T03 |
| Q-028 | Pausas/tiempos/red D-159/D-162/D-168/D-178/D-205/D-240 definidos; preparar casos de cierre en preparación/combate CIE-006. | Parcial; validación / 1 | P02/P05/P08 |
| Q-029 | Test/tipos/evoluciones/clima/eventos/grietas/shiny/social tratados D-256–262. Objetos especiales y pickups heredados CIE-001–003 aún pendientes; posponer no elimina referencia. | Parcial / 1 | P01–P04 |
| Q-030 | Repo propio D-129 y arquitectura/build D-264; aún sin copia adaptada ni build probado. Manual upload preferido; última integración 403 el 12/10. Primera tarea y runtime/dependencias exactas CIE-010, sin instalación actual. | Preparación pendiente / 1 | P01/P05 |
| Q-031 | Escenarios/avisos D-245 y Hosting D-265; son estimaciones. Comportamiento al acercarse a 20 USD CIE-009 pendiente; medir consumo total y aprobar billing/controles antes de activar. | Parcial / 1 | P05/P10/P11 |
| Q-032 | Objetivos D-254 definidos: 60 FPS, media ≥55, p95 <25 ms, 30 min, carga 64/128 y carga inicial 5 s con red controlada. Sin resultados; procedimiento/memoria/semillas se concretan en ensayos. | Objetivos fijados; medición / 1 | P02/P10 |
| Q-033 | VAL-01–19 y aceptación D-255 definidos; preparar pasos/semillas/datos ficticios y autorizaciones de ejecución por tarea. No afirmar pruebas de juego realizadas. | Preparación de ensayo / 1 | Todas las fases de ejecución |
| Q-034 | Hosting D-265/preview D-273/rollback D-274; sin dominio comprado. Falta nombre público final, política de datos/retención CIE-008, respaldo protegido/destino/ensayo y aceptación de producción P11. | Parcial / 3 | P11 |
| Q-035 | D-266 fuente JSON y MD generado es propuesta, no migración aprobada/realizada. D-268 pesos a aprobar con plan. Source en repo juego; web/repo/permisos/destino pendientes de otro hilo; entrega manual vigente. | Propuesta / 1 | P00-T05/T06; no arranque del juego |
| Q-036 | Evidencias/novedades/una imagen y alt D-269/D-271 definidos; implementar solo tras autorización, no existen capturas ni entradas publicadas del juego. | Diseño resuelto; ejecución futura / 2 | Seguimiento independiente |
| Q-037 | Original functions/index.js llama turn.pokesurvivor.com/mau/new y db.js invoca Signups.report; no reutilizar endpoint, secreto o cuota originales. No activar portero heredado de altas; propia política de gasto CIE-009 y prueba de aislamiento P01-T03. | Hallazgo estático; adaptación / 1 | P01/P05 |
| Q-038 | Láminas de chat de 24+24 referencias, no originales ni sprites archivados. Solicitar materiales necesarios al comenzar producción autorizada; definir rutas/manifest y validar transparencias/anclajes/ciclos. | Producción pendiente / 1 | P02/P09/P11 |

### Bloque de cierre propuesto: diez casos todavía sin respuesta

Esta cola resume trabajos de Q-001–Q-038; no añade funciones aprobadas ni duplica pesos. Se propuso al terminar D-275. El director pidió guardar el roadmap antes de contestar si continúa con este bloque. Mantener pendiente esa aceptación; la solicitud de actualización no la sustituye.

| ID | Tema | Referencias | Criterio para resolver |
|---|---|---|---|
| CIE-001 | Altares, manantiales y trampas heredados | Q-029; P03/P04 | Conservar/adaptar/posponer con efectos y premios explícitos; no activarlos sin diseño. |
| CIE-002 | Recogibles de curación, imán y bomba | Q-029; P03/P04/P07 | Acordar disponibilidad, probabilidad, efecto y relación con habilidad/XP. |
| CIE-003 | Destructibles y cobertura | Q-010/Q-017; P03/P04 | Modelos, vida, bloqueo, daño y consumo de perforación; no asumir árboles/rocas/cofres destructibles originales. |
| CIE-004 | Proximidad y retroceso al abrir cofres | D-146; P03/UI | Fijar radio/velocidad de pérdida y efecto de pausas/transición, preservando 3,5 s y disparo activo. |
| CIE-005 | Refuerzos y cierre tras derrotar jefe | Q-012/Q-014/Q-026; P03/P08 | Estado de refuerzos, fin de oleada, preparación, salida y premio sin doble cómputo. |
| CIE-006 | Guardar, salir y abandonar | Q-010/Q-023/Q-028; P05/P06/P08 | Distinguir pausa, cierre temporal, rollback, abandono definitivo, muerte y extracción. |
| CIE-007 | Calendario y excedentes de misiones | Q-003; P07 | Zona horaria, reinicio diario/semanal y progreso sobrante entre contratos/recompensas. |
| CIE-008 | Eliminación y retención de cuenta | Q-022/Q-034; P05/P11 | Confirmaciones, expedición pendiente, datos privados/ranking/alias, recibos y conservación legal/operativa sin inventar plazos. |
| CIE-009 | Actuación ante presupuesto mensual | Q-031/Q-037; P05/P10/P11 | Límites operativos, reservas para operaciones en curso y recuperación del servicio. Las alertas no garantizan tope monetario. |
| CIE-010 | Primera tarea de desarrollo | P00/P01/Q-024/Q-030 | Alcance concreto, aislamiento, contratos de entrada/salida, dependencias/fixtures y verificación. Requiere autorización aparte después de preparar propuesta revisable. |

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

### Auditoría incremental del 13/10/2026

**LOCALIZADO EN CÓDIGO, sin ejecución:** Enemy.bossStart/bossCast/summon y Hazards aportan avisos/invocaciones reutilizables; Player apunta actualmente a jefe antes de amenaza para ataques a distancia. Combat usa hits por proyectil y barrido para enemigos, pero el bloqueo de pared/props se consulta en posición y el daño por contacto sigue activo. World es arena abierta/chunks de ruido, no un ensamblador interior terminado. Pathing usa BFS de radio 28 y 57×57 casillas, reconstruido a intervalos; jefes flying lo omiten. LevelUp/Moves aplican mejoras multiplicativas originales, distintas de D-155. Game.pause solo pausa playing en el original y obliga horizontal; Settings/Audio/Touch ofrecen controles reutilizables. DB.merge usa máximos/uniones y entrada por nombre con correo ficticio, incompatibles con equipo perdible y correo real. Ranking recibe marcas del cliente; firestore.rules impone límites amplios de tiempo/nivel/bajas, no prueba combate. functions/index.js es portero de altas hacia endpoint Cloudflare original, no backend de validación de inventario. No confundir existencia de ese paquete con operaciones propias implementadas.

Estas observaciones sustentan adaptación incremental en los módulos existentes. No se declara sustitución de motor, framework nuevo, benchmark realizado o defecto reproducido. Ver riesgos R-025–R-032.

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

D-192 y D-254 fijan objetivos iniciales de población/frame time; falta prepararlos y medirlos, no aprobarlos otra vez como si estuvieran sin definir. Las comparaciones de rendimiento con el original deberán mantener dispositivo, escenario/población comparable, navegador, resolución, calidad y duración equivalentes. No usar comentarios históricos del original sobre FPS o consumo como resultados propios.

### Metas iniciales y condiciones de ensayo D-254

- Dispositivos físicos: Safari iPhone 13/15 y Chrome Infinix Note 40 5G; ambas orientaciones. Registrar OS/navegador exactos, calidad, resolución/DPR, temperatura/estado inicial y versión.
- Objetivo 60 FPS; aceptación inicial media ≥55 y 95 % de intervalos entre fotogramas <25 ms, en escenarios reproducibles. Sesión de 30 min con juego normal y carga controlada hasta 64 enemigos/128 proyectiles. No eliminar proyectiles para hacer pasar el ensayo.
- Red de carga controlada 10 Mbps/100 ms: pantalla inicial utilizable ≤5 s; definir condición de caché fría y separar tiempo humano de login al preparar ensayo.
- Medir estabilidad de memoria/superficies/cachés durante sesiones y transiciones; umbral cuantitativo de memoria/semillas queda al preparar el ensayo. No se afirma RAM ni FPS alcanzados.
- Comparación del original solo bajo condiciones equivalentes y con copia realmente arrancable autorizada. Actualmente no existe esa comparación.
- Antes de producción: validación de requests repetidas/manipuladas, inventario perdido/duplicado, costes totales y riesgo competitivo A; preparar fixture de extracción para H-001 sin alterar el modo normal.

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
| R-024 | Categorías y puntos pendientes pueden dejar XP/duplicados sobrantes | Medio | Diseño precisado D-213; sin ejecución | Contar espacios aplicados/reservados, un ticket sin espacio; probar límites P07 |
| R-025 | Combate local permite fraude con cifras plausibles incluso calculando score en servidor | Alto para confianza competitiva | No cuantificada; límite arquitectónico confirmado | Riesgo aceptado D-225 A; controles/ensayos VAL-18, sin prometer simulación o ausencia de trampas |
| R-026 | Jefes originales flying=true, daño por contacto y Hazards reinicia invulnerabilidad | Alto para reglas aprobadas | Hallazgos estáticos, sin reproducción | Adaptar Enemy/Combat/Hazards para D-196/D-197/D-202; P03/P04 y pruebas de avisos/paredes |
| R-027 | Props/chests originales se generan por ruido, fuera de cuotas de cofres por oleada | Alto para economía | Hallazgo estático world.placeProps | Adaptar puntos de contenido y desactivar sorteo heredado incompatible; P03/P07 |
| R-028 | Pickup.push elimina el objeto más antiguo si supera MAX y no hay XP; puede perder equipo físico | Alto para integridad | Hallazgo estático pickup.js | Separar o proteger presupuesto de equipo; conservar objetos D-180 y validar saturación P06/P10 |
| R-029 | Boss dropXp usa ceil(value/14) y puede aumentar la recompensa total | Medio | Hallazgo estático, no prueba ejecutada | Reparto exacto del total 220, sin duplicar Aprendizaje; D-211/VAL-07 |
| R-030 | H-001 de dos sectores no alcanza extracción normal desde sector 3 | Medio para prueba temprana | Diferencia de alcance entre D-047 y D-199 | Preparar fixture aislado o resolver recorrido de ensayo en CIE-010; no cambiar silenciosamente reglas normales |
| R-031 | Preview de Hosting puede seguir usando Auth/Firestore de producción | Alto | Dependencia por configuración, no por URL | Configuración/proyecto de prueba explícitos y tráfico revisado antes de ejecutar; D-273/VAL-02 |
| R-032 | Copia parcial sin sprites originales ni app.min.js; el nombre de directorio no acredita juego adaptado arrancable | Alto para P01 | Ausencias localizadas; no se inició el juego | Contenido propio mínimo y build reproducible bajo autorización, sin descarga masiva de sprites originales |

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

**D-266 — propuesta de transición, todavía no realizada:** `RoadmapSCP.json` será la única fuente editable del diseño/decisiones/fases/tareas/riesgos/evidencias/novedades; `RoadmapSCP.md` una vista generada. Versión de esquema separada de versión del plan. Cada tarea conserva ID, fase, peso, estado, criterios, dependencias y evidencia. No mantener dos fuentes normativas editables. La petición actual solo actualiza este Markdown; no aprueba ni construye generador o web. Hasta que se acepte y prepare la transición, este archivo es la única fuente documental persistente vigente.

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

Antes de activarlo, aprobar evento de inicio, fuente, repositorios, permisos, destino, manejo de imágenes, condiciones de publicación, idempotencia y tratamiento de errores. D-272 propone GitHub Actions con ejecución manual y comprobación cada 30 minutos cuando se apruebe el flujo; no es integración existente ni garantía de puntualidad. Lectura del registro del juego; permisos de publicación limitados a web. Repo/destino/credenciales de web siguen pendientes y no se aprueban por elegir Hosting para el juego. Una vez autorizadas sus reglas, las actualizaciones ordinarias comprendidas en ellas no requerirán permiso individual.

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

### Fuentes técnicas adicionales consultadas el 13/10/2026

- Firestore precios/cuotas: https://firebase.google.com/docs/firestore/pricing — 50.000 lecturas y 20.000 escrituras diarias gratuitas de la base elegible; no garantizan coste total cero del juego.
- Functions cuotas/facturación: https://firebase.google.com/docs/functions/quotas — requiere plan Blaze, costes a validar antes de activar.
- Functions callable: https://firebase.google.com/docs/functions/callable ; App Check: https://firebase.google.com/docs/app-check — autenticación/atestación no demuestran combate ni eliminan todo abuso; App Check no se ha incorporado como nueva dependencia.
- GitHub Pages límites: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits — referencia de comparación; alojamiento final elegido Firebase Hosting, sin afirmar prohibición absoluta de todo frontend con proveedor externo.
- Hosting consumo: https://firebase.google.com/docs/hosting/usage-quotas-pricing — incluir tráfico/almacenamiento en presupuesto compartido, sin compra de dominio inicial.
- Hosting versiones/rollback: https://firebase.google.com/docs/hosting/manage-hosting-resources — releases del canal live pueden permitir rollback; preview no equivale a backend aislado y no sustituye respaldo de datos.

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
| CHG-009 | 2026-10-13 | RoadmapSCP v0.8: consolidar D-133–D-275, aprobaciones A/ranking y Hosting, escenarios/reglas iniciales, cola CIE-001–010, Q revisadas, riesgos/auditoría/objetivos y traspaso. Conservar v0.7, fuente JSON como propuesta y pesos/indicadores oficiales pendientes. Copia para subida manual, sin GitHub/web actualizados. | Petición expresa «actualiza el roadmap», A-009; decisiones expresas y delegación D-182 |

**Verificación histórica de v0.7 realizada el 12/10/2026 (no describe el estado de v0.8):** comprobación de lectura del Markdown mediante Python, sin ejecutar programas del repositorio. Resultado: 132 decisiones aprobadas y D-133 pendiente; 12 etapas y 53 tareas de juego con identificadores únicos; pesos globales suman 100 y coinciden con cada etapa; porcentajes relativos correctos dentro del redondeo; avance provisional 3 %, planificación 30 % e implementación 0 %; 37 temas abiertos y Q-001 resuelta, con Q-002, Q-008, Q-030 y Q-035 parcialmente resueltos; seis tareas web con 100 puntos independientes. `git status --short` de la copia base no mostró cambios y HEAD sigue en el commit registrado. Esta comprobación es del registro; no acredita ejecución del juego ni revisión independiente de otro agente. Resolver una decisión aislada o subir el documento a GitHub no completa por sí solo una tarea ni suma avance de implementación.

### Verificación de la actualización v0.8

Verificación documental realizada el 13/10/2026 mediante lectura y análisis del registro con Python: 275 IDs de decisión únicos y consecutivos; 38 áreas Q y diez pendientes CIE; 53 tareas únicas, 12 fases y 100 puntos; porcentajes relativos y estados 0/100 coherentes. Solo P00-T01/T02 están CV: tres puntos documentales provisionales, sin nueva implementación. D-225/D-265 constan aprobadas expresamente; D-266/D-268/D-272 como propuestas. Copia entregable idéntica al maestro. La copia original devuelve git status vacío y mantiene a1006e6e3d0cea9162238a90b0ffdd7fd38397b6. No se ejecutaron programas del repositorio, build o juego; no es verificación independiente ni evidencia de funcionamiento.

### Resumen para continuar en otro hilo

- **Base:** JPTER78/pokesurvivor, rama main, commit a1006e6e3d0cea9162238a90b0ffdd7fd38397b6; commit de 11/10/2026 y lecturas hasta 13/10/2026. Copia /workspace/containment-survivor: referencia original, no SCP implementado.
- **Proyecto activo:** DETECO/SCPSurvivor, destino del juego y documentación; último remoto inspeccionado el 12/10, no actualizado por este turno. Subida manual elegida por director; no afirmar commits remotos ni cambios de visibilidad actuales sin revisar.
- **Estado:** planificación avanzada con 275 IDs de decisión, incluidos tres registros expresamente propuestos D-266/D-268/D-272. Plan completo y pesos aún no aprobados. No se ha ejecutado/adaptado/publicado el juego ni construido la web.
- **Aprobaciones recientes:** D-225 A con riesgo competitivo limitado aceptado; D-265 Firebase Hosting propio .web.app inicial, sin autorizar servicios/billing/deploy. D-182 permite decidir puntos claros usando base primero; consultas en bloques de diez aceptados.
- **Reglas centrales:** dos soldados/tres armas/seis mods/dos mochilas; mundo modular propio, dos normales/un jefe escapable; olas 3–5, preparación 20 s, XP temporal/permanente separadas; gacha y equipo físico, almacén60/buzón30; recuperación25–50 %; clasificación100×olas+250×sectores+400×jefes con extracción90 %/muerte75 %; secciones 4/5 detallan modelos y excepciones.
- **Autorizaciones vigentes:** lectura/análisis y esta actualización documental A-009. Ninguna fase concreta de implementación, ejecución de juego/build/pruebas o instalación autorizada; tampoco creación de servicios, facturación, publicación o automatización. La aprobación de plan no las implica.
- **Persistencia:** guardar RoadmapSCP solamente cuando lo indique el director; no en cada respuesta. Maestro actual /workspace/RoadmapSCP.md v0.8; copia entregable /workspace/entregables/RoadmapSCP.md. v0.7 preservada en historial. No JSON creado: su fuente única/MD generado sigue propuesta D-266.
- **Pendientes:** CIE-001–010 y remanentes Q-001–038 por validación/contratos/materiales/publicación. El bloque CIE se propuso pero no ha recibido aceptación para continuar: último mensaje solicita actualizar roadmap.
- **Riesgos:** merge de inventario, aislamiento de endpoints originales, contactos/jefes voladores, pérdida de pickups al saturar, redondeo XP de jefe, acceso a fuentes gráficas, discrepancia de ensayo H-001/extracción sector3, rendimiento/costes no medidos y fraude plausible aceptado en A.
- **Seguimiento:** 12 fases/53 tareas/100 puntos propuestos; P00 documental30 % y global3 % exclusivamente provisionales, implementación0 %. Oficial pendiente de aprobación. Repositorio/alojamiento/permisos de web siguen pendientes; última sincronización correcta ninguna.
- **Siguiente paso:** revisar/aceptar CIE-001–010, resolverlos por delegación o pregunta importante, consolidar contratos y plan final para aprobación; después preparar propuesta concreta y pedir autorización de primera tarea. No dar por aprobadas futuras ampliaciones ni sus pesos.
