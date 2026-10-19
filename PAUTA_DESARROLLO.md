# Pauta vigente de SCP Survivor — revisión ESTRUCTURA

**Actualización vigente 0.25 · B1/B2, 19/10/2026 (A-035/D-331/EV-040):** B1/B2 implementados como prototipo aislado: geometría inicial 160 × 100 y seis nodos alternativos; cuatro intentos de exploración en 60/120/180/240 s con probabilidades/topes por tramo y tickets ficticios en memoria. RC-10 sigue EC, evidenceComplete=false. Aceptación manual y P05 real pendientes; combate 2+3+1, bono de diez minutos/hitos, cofres de jefe/grieta y economía persistente pendientes. [Guía de mapa y cofres](docs/PRUEBA_MAPA_COFRES_V2.md) · [Demo de práctica](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&cofres=prueba) · [Resultados y límites](docs/V2-B1-B2-REPORT.md). Publicación viva pendiente de verificar; consultar el informe antes de afirmar resultados.

**Publicación de la prueba existente (A-033):** disponible mediante [GitHub Pages](https://deteco.github.io/SCPSurvivor/) y [acceso rápido](https://deteco.github.io/SCPSurvivor/?rapida=1), con las mismas mecánicas V2-trial-01. La ampliación B1/B2 incorpora cofres ficticios de exploración y escala inicial 160 × 100; aceptación pendiente. Esta publicación no cierra P05 ni la aceptación completa de V2.

18/10/2026 · Diseño V2 · **Primer prototipo del recorrido disponible; adaptación completa y aceptación pendientes.**

Esta pauta incorpora el chat **ESTRUCTURA**, incluida su aprobación de cofres y escala inicial en el turno `01a15142-340f-7400-8660-f8d2502ce2aa`, y la instrucción posterior de Iván en PROGRAMACION. [Corte de reglas aprobadas](docs/ESTRUCTURA_REGLAS_APROBADAS.md). Sustituye las reglas incompatibles del diseño de extracción. El código actual se conserva como punto de partida; no se reconstruye el juego.

**Prueba V2-trial-01:** [guía manual](docs/PRUEBA_MAPA_V2.md). El recorrido de mapas300s, jefe y puerta con aliados está implementado como ensayo local sin guardado. Jefe240s y acceso rápido270s son parámetros provisionales de prueba. El corte original no implementaba cofres. B1/B2 añade exploración ficticia; familias/azar final, gacha, cofres de jefe/grieta, grietas nuevas y persistencia siguen pendientes. [Resultados](docs/V2-PRIMERA-PRUEBA-REPORT.md).

## Recorrido del juego

**Base → mapa de cinco minutos → jefe derrotado + puerta de la Fundación → siguiente mapa.**

Cada mapa tiene sus monstruos básicos/minions y un jefe obligatorio. La presión escala con el tiempo. Al llegar a **5:00 de juego activo**, se abre una brecha con una puerta blindada y salen soldados de la Fundación: llaman al jugador y disparan contra los enemigos restantes.

- Desde 5:00 dejan de aparecer enemigos nuevos en ese mapa. Esto incluye refuerzos del jefe; los soldados aliados sí pueden llegar.
- Los enemigos que ya estaban vivos permanecen. No se limpian automáticamente al abrir la puerta ni al derrotar al jefe.
- La puerta aparece a los cinco minutos aunque el jefe siga vivo. **Cruzar requiere derrotarlo**; mientras tanto, los soldados proporcionan cobertura.
- Derrotar al jefe antes no permite saltarse el tiempo restante. Es necesario esperar la puerta.
- Al cruzar se pasa al siguiente mapa, conservando las mejoras de esa partida y reiniciando el reloj del mapa.
- Esa puerta es una **transición de nivel**. No termina la partida ni ejecuta el antiguo resultado de extracción.

La hora exacta de aparición del jefe todavía no está fijada. Debe permitir cumplir la condición de avance sin depender de apariciones nuevas después de 5:00.

## Qué se retira y qué se conserva

| Elemento | Dirección vigente | Estado del código |
| --- | --- | --- |
| Extracción voluntaria para terminar y asegurar equipo | Retirar su calendario, opción, interacción y cierre de partida | Ausente en la prueba V2; conservada en el modo anterior |
| Accesorios/mods físicos de armas | Retirar objetos, instalación, compatibilidades y ranuras | No se usan en la prueba V2; código anterior conservado |
| Mochilas | Retirar tamaños, capacidad, equipamiento y gestión | Desactivado en V2; prototipo anterior conservado |
| Armas y soldados | Conservar; ampliar mediante catálogo revisado | Tres armas y dos soldados de prueba |
| Armas distintas, con estadísticas básicas propias | Mantener identidad por arma; organizar por familias | Categorías nuevas pendientes |
| Mejoras al subir de nivel | Mejorar armas al azar durante la partida | El sistema de cartas actual necesita adaptación |
| Gacha | Colección de soldados y armas; incorporar skins y ultimates según catálogo cerrado | Economía, tablas, duplicados y entrega real pendientes |
| Jefes | Un jefe obligatorio por mapa; encuentros dimensionales aparte | Implementado en ensayo V2; horario de 4:00 provisional; calendario anterior conservado fuera del ensayo |
| Grietas especiales | Desafíos opcionales difíciles con recompensas mayores | Existe un prototipo local limitado |
| Saltos dimensionales | Rutas/saltos entre niveles, inspirados en Backrooms | Diseño detallado e implementación pendientes |
| Cofres y recompensas del escenario | Exploración, jefe y grieta; sorteos y escala inicial aprobados | Exploración ficticia implementada como prototipo B1/B2; jefe/grieta/bono/hitos pendientes; cajas de campo sin botín |
| Arte, identidad visual, controles y crédito | Conservar recursos aprobados y «Desarrollado por Ivan Vivanco» | El acabado final sigue pendiente |
| Cuentas y guardado P05 | Conservar seguridad y adaptar contratos al nuevo recorrido | Aceptación con servicios propios pendiente |

Retirar accesorios **no elimina las mejoras de nivel ni las estadísticas de las armas**. Retirar mochilas **no autoriza borrar la colección persistente de soldados o armas**.

Almacén físico, buzón por falta de espacio, kit con mochila y recuperación aleatoria del equipo al morir dependían del diseño anterior. Se **replantean** antes de implementar P06; no se asumen aprobados para V2 y tampoco se borran datos por inferencia a partir de «etc.».

## Combate vigente: 2 armas + 3 poderes + 1 ultimate

Actualización de ESTRUCTURA del 19/10/2026: dos armas se eligen antes de empezar y atacan simultáneamente. Hasta tres poderes anómalos, con opción de reemplazo al aparecer un cuarto. Una ultimate única de efecto defensivo, curativo, evasivo u ofensivo, cooldown largo, máximo nivel 5 y progresión difícil; se obtiene en gacha, que también contempla armas y skins de soldados.

No se suman las dos ranuras extra de apoyo de una propuesta anterior. La relación con la habilidad manual del soldado todavía no está fijada. Catálogos, valores, costes, duplicados y efectos de skins permanecen abiertos. Estas funciones no están implementadas en la demo. [Detalle y tareas RC-07/RC-13/RC-14/RC-09](docs/ROADMAP_ACTUALIZACION_ESTRUCTURA_2026-10-19.md).

## Armas y progresión

Las familias mencionadas por Iván son **láser, cuerpo a cuerpo, a distancia, misiles y arrojadizas**. Es una dirección de catálogo; faltan la lista final, sus estadísticas y las reglas particulares de cada familia. No todas necesitan cargador, recarga o proyectiles iguales a una pistola.

El requisito vigente son **tres ofertas aleatorias**, con mejoras de arma que reconocen exclusivamente las **dos armas equipadas**. El ejemplo de Iván es pistola y katana. Se conserva la referencia de elegir una; mezcla exacta de grupos, categorías, rangos, saturación y probabilidades requieren contrato. No ofrecer un arma ajena ni aplicar una mejora a todo el arsenal. El nivel máximo 5 confirmado corresponde a ultimates; no aprueba automáticamente los topes propuestos de todas las ramas.

Soldados y armas obtenidos mediante gacha forman parte de la dirección solicitada. Rarezas, duplicados, probabilidades, recompensas por muerte y progresión permanente se cerrarán antes de implementar la economía. La propuesta de diez atributos nuevos de soldados no se considera aprobada por el hecho de aparecer en una respuesta del asistente.

## Grietas, puerta y saltos

Son tres funciones diferentes:

1. **Puerta blindada de la Fundación:** aparece al minuto cinco; avance normal condicionado al jefe.
2. **Grieta de anomalía:** desafío opcional, más difícil y con recompensa mayor. Conservar apertura temporal, ubicación alcanzable, indicador de dirección/distancia/tiempo, alerta en pantalla, sonido e **ingreso instantáneo por contacto, sin botón ni espera**.
3. **Salto dimensional:** salto/ruta entre niveles. Su destino, condiciones y relación con el jefe obligatorio requieren definición; no implementar un atajo que anule esa obligación sin una regla expresa.

El retorno desde la anomalía, la pausa del reloj del mapa al entrar, el tratamiento de 5:00 si hay una grieta abierta y los premios exactos siguen abiertos. El prototipo de Custodio en el mismo escenario no demuestra una dimensión separada ni recompensas persistentes.

## Cofres y tamaño de los mapas

Iván aprobó las recomendaciones del hilo ESTRUCTURA. Se conserva la base D-140–148/D-220/D-279 y se adapta el disparador a **cuatro oportunidades por mapa en 1:00, 2:00, 3:00 y 4:00 de juego activo**. No se sortea por fotograma ni durante la pausa.

| Cofre | Regla vigente para la adaptación |
| --- | --- |
| Exploración | Recursos de gacha. Mapas 1–3: 10 % por intento, máximo 1, 1–2 tickets; mapas 4–7: 15 %, máximo 2, 1–2 tickets; mapas 8+: 20 %, máximo 3, 1–3 tickets |
| Jefe | Garantizado al derrotarlo; una mejora temporal aleatoria compatible con las armas equipadas |
| Grieta | Solo al superar la anomalía difícil; premio superior, con tabla exacta todavía pendiente |

Los topes de exploración no garantizan premios. Abrir no libera cupo y el contenido se fija al aparecer. Jefe y grieta son eventos separados. Los tickets de cuenta requieren confirmación del servidor: el ensayo local no los acredita. Apertura/descubrimiento y reglas históricas compatibles permanecen en [la base de cofres](docs/COFRES_BASE_Y_ADAPTACION_V2.md); falta encajar hitos antiguos y detalles del reloj acumulado de diez minutos.

Se aprueba **160 × 100 casillas como escala inicial de prueba**, reservando **seis ubicaciones alternativas** de cofres, una zona amplia de jefe/puerta y circuitos para rodear hordas. Objetivos a medir: 30–45 segundos entre extremos útiles sin combate y 10–15 segundos de desvío hacia un punto opcional. El tamaño final, los recorridos, el balance y el rendimiento no se dan por validados.

**Prototipo B1/B2 actual:** cuatro sorteos de exploración, seis puntos y geometría inicial implementados; tickets ficticios en memoria. Cofres de jefe/grieta, bono e hitos siguen pendientes. Las `fieldCrate` actuales siguen siendo cajas sin botín. No importar premios genéricos de Pokesurvivor ni accesorios/mochilas. [Reglas aprobadas](docs/ESTRUCTURA_REGLAS_APROBADAS.md) · [Siguiente adaptación](docs/PLAN_DISENO_JUGABLE_V2.md).

## Orden para continuar

1. Usar esta pauta, el [corte aprobado de ESTRUCTURA](docs/ESTRUCTURA_REGLAS_APROBADAS.md) y el [plan de diseño jugable](docs/PLAN_DISENO_JUGABLE_V2.md); resolver solo las reglas abiertas necesarias para cada bloque.
2. Continuar los ensayos locales aislados del plan jugable: geometría, puntos de interés y después cofres ficticios. Conservar la prueba de cinco minutos y su aceptación pendiente.
3. Terminar P05 real y definir compatibilidad de guardados antes de conectar V2 a cuentas, economía o P06 replanteada. Mantener Spark sin facturación; el ensayo local no acredita ese cierre.
4. Adaptar armas/mejoras y retirar accesorios/mochilas con sus dependencias.
5. Replantear P06 para colección/equipamiento y adaptar P07 para gacha/recompensas; no continuar la lista anterior de inventario físico.
6. Integrar cofres, variantes de mapas, grietas y saltos con las reglas cerradas. Después completar arte, audio, controles y pruebas de integración.

**Estado:** primer prototipo del recorrido verificado automáticamente y pendiente de prueba de Iván. La adaptación completa V2 y P05/P06 siguen pendientes. El **52/100 pertenece a la línea base anterior**. El avance global del diseño V2 queda sin calcular hasta revisar alcance, aceptación y pesos; quitar funciones no produce avance automático.

Trazabilidad: [decisiones y pendientes de ESTRUCTURA](docs/ESTRUCTURA_DECISIONES.md), [plan técnico y pruebas](docs/PLAN_CAMBIOS_ESTRUCTURA.md), [roadmap](ROADMAP.md).
