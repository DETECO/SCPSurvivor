# Próxima prueba — V2 INFINITO 01

21/10/2026 · Roadmap0.29 · Estado: **T1A implementada y verificada automáticamente como prueba parcial; aceptación manual pendiente**.

[Jugar mapa completo](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2) · [Élite cerca del inicio](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=elite) · [Jefe desde4:30](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=jefe). [Resultados y límites](V2-T1A-REPORT.md).

## Objetivo de la primera entrega

Comprobar el recorrido **una arma inicial → premio de armamento → dos armas atacando simultáneamente**, sin perder el progreso de la primera ni duplicar premios. Se conservan mapa300s, jefe obligatorio, puerta, pausa y reglas compatibles de cofres.

El diseño está establecido por la [matriz de ESTRUCTURA](DECISIONES_INFINITO_2026-10-20.md). El [plan de desarrollo](PLAN_DESARROLLO_V2_INFINITO.md) separa T1A/T1B de los sistemas posteriores. No se exige repetir las66respuestas aceptadas ni la aceptación P05 para preparar este prototipo.

**Nueva prueba T1A:** empieza con una arma. Las prácticas rápidas contienen enemigos vivos: vence al élite o jefe y permanece3,5s junto al cofre. Elige la segunda arma con la acción detenida. Puedes elegir el mismo modelo. Las dos atacan automáticamente; no usesQ/E. El inicio de jefe adelanta el reloj a4:30 y no representa una expedición natural. B3 anterior sigue accesible con `?prueba=mapa-v2`.

## Alcance de T1A y límite con T1B

- Una sola arma elegida antes de empezar; segunda ranura vacía y sin daño oculto.
- Primer jefe garantiza segunda si falta; encuentro élite puede adelantarla mediante cofre de armamento. Ese cofre es independiente de la exploración de tickets.
- Al reclamar, elegir entre tres opciones compatibles desbloqueadas, con alternativas básicas válidas para una colección pequeña. Dos modelos iguales son instancias distintas.
- Si ya hay dos, el premio mejora una equipada elegible, sin tercera arma ni duplicado permanente.
- Ambas armas funcionan por objetivo, alcance, intervalo y recurso propios. No se necesita alternar botones.
- DesdeT1A se necesita el **estado mínimo por cuatro ramas5+extra** para representar una mejora compatible cuando la ranura ya está llena. No trasladar el nivel simple máximo5 deB3 como regla definitiva. T1B completa el menú arma/general/libre, sus fichas y la saturación.
- Preparar antes de implementar un catálogo pequeño de ensayo con efectos/topes explícitos. Valores sin ficha no se declaran aprobados. El catálogo no sustituye gráficos aprobados ni amplía todos los personajes/armas del proyecto.
- Sin cuentas reales, gacha real, compras reales ni premios persistentes. Mantener el ensayo aislado y el comportamiento anterior disponible para regresión.

## Preparación prevista

1. Guardar respaldo y versión del runtime previo; registrar semilla y modo de reglas.
2. Definir fichas mínimas de armas/rama y los modelos básicos que completan la elección. Comprobar si una familia utiliza cargador, energía, intervalo o ataque cercano; no imponer recargas balísticas a todas.
3. Añadir observación de ranuras/ID/modelo/ramas/extras, temporizadores de cada arma, evento de premio y resultado de reclamación. Nunca mostrar credenciales ni presentar datos ficticios como saldo de cuenta.
4. Preparar prácticas separadas de inicio normal, premio adelantado, premio de jefe y dos modelos iguales. Los accesos y sus consultas se crearán al implementar y llevarán un aviso si siembran progreso o adelantan el reloj.
5. Mantener pasos de tiempo controlados exclusivamente en QA. La práctica jugable de Iván debe funcionar con los controles normales.

## Pauta manual prevista para Iván

Cada fila está **NO EJECUTADA**. Al disponer de demo, registrar aprobado/fallo y observación; no convertir este listado en resultado automático.

| ID | Acción del jugador | Resultado esperado |
| --- | --- | --- |
| M01 | Elegir arma y comenzar | Solo una equipada/atacando, ranura2 claramente vacía y sin selección inicial de segunda |
| M02 | Combatir sin cofre opcional y vencer primer jefe | Se puede vencer con una arma; su premio permite adquirir segunda |
| M03 | Superar élite y abrir su armamento antes del jefe | Ofrece segunda; no cambia los tickets ni consume el cupo de exploración |
| M04 | Con segunda adquirida, reclamar premio del jefe | Mejora compatible de una equipada; no aparece una tercera arma |
| M05 | Observar ambas armas contra enemigos cercanos y lejanos | Cada una ataca según alcance/función y ritmo; una recarga no bloquea a la otra |
| M06 | Llevar dos iguales y mejorar solo una | IDs y mejoras independientes; no se copia el progreso a la otra |
| M07 | Pausar durante combate o selección de premio | Relojes/apertura/recargas se congelan según estado; no hay disparos o entregas ocultas durante la pausa |
| M08 | Abrir dos premios consecutivos, manteniendo la primera arma mejorada | Cada uno se resuelve una vez usando equipo actual; conservar mejoras de la primera y no duplicar adquisición |
| M09 | Llegar a5:00 con jefe vivo y luego derrotarlo | Puerta no permite avance prematuro; remanentes siguen vivos y no aparecen enemigos nuevos; aliados no resuelven el jefe |
| M10 | Cruzar con XP o premio pendientes | Se resuelven una vez antes de salir; vida/equipo/progreso compatible se conserva y el mapa siguiente empieza en0 |
| M11 | Probar interfaz de escritorio y táctil | Se entiende ranura vacía, elección y ambas armas activas; sin mochilas/mods/extracción ni necesidad de alternar armas |

T1A no se da por aceptada por mostrar dos iconos: debe observarse daño real de ambas instancias y recursos independientes. Una imagen estática no prueba la mecánica.

## Comprobaciones automáticas previstas

| Grupo | Casos y límites | Criterio esperado |
| --- | --- | --- |
| Carga y ranuras | Una y dos instancias; vacía; IDs repetidos; modelo inexistente; máximo2 | Datos inválidos rechazados sin mutación; ninguna arma fantasma en ranura vacía |
| Simultaneidad | Diferentes intervalos/rangos; sin blanco; pared; arma recargando; jugador muerto | Cada arma válida produce daño dentro de su contrato; no compartir `shotWait`, objetivo ni munición; cero ataque tras muerte |
| Familias | Al menos comportamientos distintos del catálogo acotado | Solo cargador/recarga donde corresponda; no tratar melee como un proyectil balístico por omisión |
| Premio de armamento | Equipo1→2; equipo2→mejora; doble apertura; dos cofres; elección repetida/cancelada | Una entrega por ID; revalidación de ranuras al reclamar y opciones estables, sin tercera arma ni reroll de tickets |
| Progresión mínima | Rama0..5 y extra propio; copia ausente; cambio de modelo bajo mismoID; todas saturadas | Extra solo tras5 y una vez; no existe nivel6 permanente de ultimate; no mejorar copia ajena ni exceder el máximo |
| Cartas T1B | Arma/general/libre, categorías vacías, mismo modelo dos IDs, pendientes de varias subidas | Tres opciones válidas cuando exista catálogo suficiente; ninguna copia fuera del equipo; una elección por nivel; sin bloqueo al saturar |
| Director y aliados | 239,99/240/299,99/300/300,01s; jefe temprano/tardío; retirada única; autoría de bajas | Corte de todo spawn incluyendo refuerzos; jefe obligatorio; aliados sinXP/sin remate; un huido no reaparece al mover cámara |
| Recuperación | Después300s, pausa, cartas y efectos activos | Regeneración y cooldowns de habilidades congelados; armas/recargas siguen; duración de escudo/fantasma/área expira, no queda protección permanente |
| Transición | Premio pendiente, XP de suelo, cartas pendientes, permanecer sobre puerta | Resolver una vez, sin perder/doblar premio ni saltar dos mapas; no reaplicar XP por repetir intento |
| Aislamiento | Sin cuentas, almacenamiento heredado y servicios externos | No activarFirebase/Worker/economía ni restaurar schema1 que elimina remanentes. Reanudación exacta es un bloque propio, no se declara cumplida aquí |
| Navegador | Fuente/compilado × escritorio/táctil emulado | Sin errores JavaScript/HTTP, HUD legible y crédito visible; pruebas controladas distinguidas de aceptación humana |

Los casos de aliados/recuperación/transición deben integrarse en la nueva línea antes de declarar recorrido completo compatible con el contrato aceptado. Si solo está lista la simultaneidad, identificar la entrega como práctica parcialT1A y enumerar lo pendiente; no declararB4 completa.

## Tramos posteriores de la misma ruta

| Tramo | Nueva práctica prevista | Casos de aceptación que habrá que añadir |
| --- | --- | --- |
| T1B | Cartas y progresión completa | Cuatro ramas por arma5+extra; generales/poderes5+extra cuando estén presentes; relleno de categoría y apoyo táctico único al saturar |
| T2 | Sala/receta de fusión y primera variación procedural | Dos armas realmente completas, receta válida y operación voluntaria; no consumir sin receta; compuesto libera ranura y premio posterior la rellena. Semillas/rutas de sala/jefe/puerta/cofres conectadas |
| T3 | Grieta separada y poderes | Origen congelado/restaurado sin limpiar enemigos;45s de entrada; único escape5s entre60–180s; retirada sin premio ni reintento, retorno tras victoria; primer poder garantizado, garantía tras3sin poder y reemplazo del cuarto retirando efectos/rangos |
| T4 | Pasiva y ultimate manual | Lista al inicio; fija durante expedición; cinco niveles propios por habilidad; cooldown conservado entre mapas; curar a vida completa no consume; fantasma conserva paredes/puerta; daño→reducción→escudo→vida; expiraciones finitas |
| T5 | Monedas/tienda por soldado y resultado de ensayo | Diez categorías aisladas por soldado, compra en base con monedas ficticias, no doble estadística por XP/duplicado; score con cuatro componentes visibles y pesos etiquetados como ensayo |
| R | Radar y HUD | Orientación fija, símbolos y borde; no revelar cofres sin descubrir; priorizar peligro/grieta/puerta. Conservar sonido y alerta además del radar |

El número máximo de fusiones, receta/herencia y frecuencia de sala no están aprobados. Antes de ejecutarT2 escribir esos parámetros como propuesta de ensayo y distinguirlos de la sala ya confirmada. Igual para precios, daños, instante de escape y pesos de score. Nada de ello bloquea prepararT1A.

## Cuándo comenzar el diseño visual

Puede prepararse **desde ahora** dirección de arte, módulos de escenario y distribución deHUD para una ranura vacía/hasta2armas,3poderes y1ultimate. La primera integración visual debe usar los estados funcionales deT1, manteniendo avisos de jefe, cofres, grietas y espacio de controles.

No se espera a finalizar gacha, backend, score competitivo ni toda la economía para producir diseño visual. Tampoco se reemplazan sprites/diseños aprobados por nuevos conceptos. Separar aprobación de una imagen, prueba funcional y balance.

## Registro de resultados que acompañará a la implementación

Para cada caso: versión/commit, semilla, modo de reglas, catálogo y parámetros usados, entorno, resultado, captura cuando aporte y limitación. Métodos automatizados deben declarar daño/posición/invulnerabilidad/tiempo controlados. Registrar aparte la prueba manual de Iván y el móvil físico; una emulación táctil no es un teléfono probado.

Resultados automáticos registrados en [V2-T1A-REPORT.md](V2-T1A-REPORT.md) y [validación](V2-T1A-VALIDACION.json). La tabla manual sigue NO EJECUTADA: no representa aceptación de Iván. El catálogo actual solo incluye tres balísticas; melee/energía/explosivos/arrojadizas, terminales y sistemas posteriores siguen pendientes.

Consultar el recibo de publicación para la comprobación online. No declarar completo el diseño infinito por entregar esta prueba acotada.
