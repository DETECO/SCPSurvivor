# Plan de desarrollo vigente — SCP Survivor infinito

**Entrega vigente 0.29 · T1A, 21/10/2026 (A-039/D-335/EV-044):** T1A implementada como prueba parcial: una arma inicial, segunda por cofre de jefe o élite de práctica, hasta dos balísticas simultáneas con recursos propios. Cuatro ramas5+extra, cartas arma/general/libre y apoyo táctico temporal con valores de ensayo. Premios/XP resueltos antes de puerta, aliados sinXP/sin remate y congelación de recuperación a300s. Sin cuentas/guardado. Fusión, poderes, ultimate, terminales, otras familias, radar y economía siguen pendientes; no equivale aB4 completo. Aceptación de Iván pendiente. [Jugar T1A](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2) · [Práctica de élite](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=elite) · [Práctica de jefe](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=jefe) · [Resultados y límites](V2-T1A-REPORT.md). Esta entrega sustituye el estado «solo planificado» de0.28. B3 se conserva mediante `?prueba=mapa-v2`; la entrada pública sin consulta abreT1A. Mantener Spark sin facturación y servicios reales desactivados.

## Antecedentes de planificación 0.28


20/10/2026 · Roadmap 0.28 · Sincronización documental y próxima prueba planificada.

## Fuente, prioridad y estado real

Este plan incorpora la lectura directa de los últimos diez turnos completados de **ESTRUCTURA**, hasta `01a15a34-93e9-7a11-9597-6a2c37fb2570`. El corte alcanza `01a15409-96d6-72a1-a825-4038ce3a6007`, usado en la sincronización anterior. No es una exportación completa del hilo. [Corte verificable](ESTRUCTURA_CORTE_2026-10-20.json), [matriz de las 66 respuestas y aclaraciones](DECISIONES_INFINITO_2026-10-20.md), [cuestionario de referencia](CUESTIONARIO_MECANICAS_INFINITO_2026-10-20.md).

Iván aceptó todas las recomendaciones A salvo las excepciones registradas. No volver a preguntar por esas respuestas. Este documento planifica su implementación: no afirma que la demo actual ya las cumpla. La aceptación de P05 por el propietario permite avanzar el prototipo y preparar el diseño visual; servicios reales siguen diferidos e inactivos. No se alteran las 53 tareas, criterios, estados o pesos de la línea base histórica ni se convierte52/100 en avance V2.

La última demo probada es V2-trial-03/B3: todavía inicia con dos copias y alterna un arma activa; tiene nivel simple máximo5, aliados y grieta en el mismo mapa. No cuenta con ramas5+extra, dimensión separada, fusión, poderes, ultimates, tienda individual o radar nuevo. Su informe y recibo conservan su evidencia histórica.

## Contrato vigente que sustituye las propuestas anteriores

| Sistema | Decisión confirmada para desarrollar |
| --- | --- |
| Recorrido | Infinito; muerte a0 sin resurrección inicial. Se pierde progreso temporal y se conserva lo permanente confirmado. Abandonar desde pausa conserva lo confirmado y no publica marca competitiva |
| Suspensión | Reanudar exactamente el estado, con relojes detenidos durante el cierre. No restaurar V2 mediante el esquema antiguo que limpia enemigos |
| Mapas y puerta | Mapas normales300s; jefe a240s como ensayo. Puerta y dos aliados a300s; sin nuevos enemigos, con remanentes. Cruzar requiere vencer al jefe y resolver premio/XP/elecciones pendientes una sola vez |
| Recuperación al final | Desde5:00 se congelan regeneración y cooldowns de habilidades hasta cruzar; armas/recargas continúan. Los efectos ya activos siguen expirando: no congelar escudos o intangibilidad indefinidamente |
| Aliados | Ayuda limitada, sin rematar el jefe y sin XP por sus bajas. Si ambos ven al jefe vivo, uno huye por la puerta; el otro permanece. Conservar rutas y registrar la retirada una vez |
| Armamento | Una arma inicial; máximo dos simultáneas con objetivos/intervalos independientes. El primer jefe garantiza la segunda si falta; un encuentro de élite puede adelantarla. Elección entre tres modelos desbloqueados compatibles con alternativas básicas. Dos iguales permitidas como instancias temporales independientes |
| Reemplazo y premios | Sustituir solo en terminales opcionales; la entrante comienza sin sus mejoras temporales propias. Premio de armamento se resuelve al reclamar: segunda arma si falta, mejora compatible si ya hay dos. No entrega una tercera |
| Familias | Balística, energía, melee, explosivos y arrojadizas; etiquetas adicionales por función. Granadas/molotov son armas; orbitales anómalos son poderes. No heredar cargador/recarga a una familia que no los utiliza |
| Cartas y niveles | Tres ofertas: arma, general y libre, reemplazando categorías sin candidatas. Cuatro ramas por arma: Potencia, Ritmo, Manejo y Especialización. Cada rama, poder y mejora general tiene cinco niveles más un extra propio. Ultimates mantienen cinco niveles permanentes. Al saturar, bonificaciones tácticas breves; solo una activa |
| Fusión | Sala dentro de alguno de los escenarios; dos armas con todas sus ramas y extras completos se combinan en una y liberan una ranura. Recetas, herencia, frecuencia de sala y límite de fusiones todavía requieren su contrato; una fusión por expedición y no refundir el compuesto son recomendaciones, no decisiones aprobadas |
| Poderes | Proceden de jefes de grieta: primera victoria de cada expedición garantiza uno; después azar con garantía tras tres victorias sin poder. Elegir entre hasta tres compatibles. Máximo tres equipados; reemplazo pausado, sin heredar rangos y retirando efectos salientes. Activación automática por intervalos |
| Ultimate y soldado | Pasiva propia del soldado más una ultimate manual, sin sumar el botón anterior como otra habilidad independiente. Lista al comenzar, elegida antes de salir y fija durante la expedición; conserva cooldown entre mapas. Cooldown largo propio, sin reducción genérica. Cinco niveles permanentes, fragmentos de duplicado más material de desafíos; cantidades y valores pendientes de ficha |
| Grietas | Desde mapa2, como ensayo una por mapa entre1:30 y3:00;45s activos para entrar por contacto. Recinto separado y origen congelado. Una única retirada de5s entre1:00 y3:00 del encuentro; sin victoria no da premio ni otro intento. Tras victoria y reclamación se retorna al punto de entrada |
| Saltos | Destino y peligro anunciados; adelantan1–3 mapas sin cobrar lo omitido. Conservar el requisito de jefe obligatorio según el contrato del recorrido; definir el punto exacto de uso antes de integrar |
| Mapas procedurales | Ampliar generador por semilla con módulos temáticos; rutas de entrada/jefe/puerta/terminales/sala de fusión/cofres alcanzables. Escala útil medida, seis candidatos de exploración y variación sin repeticiones próximas |
| Monedas y tienda | Diez categorías independientes por soldado, compradas en la base con monedas recogidas. No son bonos globales ni se pagan con tickets. Cantidades/precios/efectos y relación con XP permanente/duplicados quedan por calibrar, sin duplicar el mismo aumento |
| Gachas y tickets | Exactamente personajes, armas y ultimates. Ticket gris=1 tirada; dorado=5; universales. Garantía propia por gacha. Skins cosméticas por dominio/contratos/eventos, sin cuarto gacha. Lote o conversión del dorado, fuentes y compensaciones requieren detalle |
| Cofres e hitos | Conservar cuatro sorteos60/120/180/240s y cuotas de exploración. Bono de diez minutos usa relojes normales hasta5:00 y afecta desde el siguiente sorteo. Hitos: primer jefe, llegada a mapa2 y llegada a mapa3, una vez por cuenta; ensayar con identidad ficticia hasta integración real |
| Radar | Circular pequeño y orientación fija; símbolos distintos, marcas en borde, adaptación móvil. Revelar anomalías por sensor y cofres al descubrirlos. Prioridad: peligro inmediato, grieta a punto de cerrar y puerta; agrupar el resto |
| Puntaje | Incluir tiempo, enemigos abatidos, jefes y grietas. La fórmula10T+2E+500J+750G y sus restricciones son una propuesta de calibración; no una regla aprobada ni una clasificación real implementada |

Los detalles se interpretan con la matriz original. No reintroducir extracción, mochilas, accesorios ni apoyos extra; no reconstruir el juego ni sustituir arte aprobado.

## Secuencia para avanzar rápido

Se recomienda entregar tramos verificables. Una integración completa antes de mostrar resultados acumularía demasiados cambios; producir todo el arte sobre el HUD antiguo generaría retrabajo. La ruta elegida de planificación es mecánicas por tramos y preparación visual en paralelo.

| Tramo | Entrega jugable prevista | Qué permite probar | Dependencias propias |
| --- | --- | --- | --- |
| T1A — Una a dos armas | Inicio con una; premio de armamento adquiere segunda o mejora elegible; dos ataques automáticos independientes | Ritmo inicial, primer jefe superable con una, adquisición única y simultaneidad | Fichas pequeñas de armas, soporte de ranura vacía y estado mínimo de cuatro ramas5+extra para resolver mejora con dos armas. No requiere fusión, poderes, gacha ni tienda |
| T1B — Cartas y ramas | Mezcla arma/general/libre, cuatro ramas5+extra, saturación y reemplazo por terminal | Instancias iguales independientes, rangos, elegibilidad al cambiar equipo y XP recogida antes de cruzar | Efectos y topes explícitos por rama/modelo, identificados como parámetros de ensayo. No universalizar un sexto nivel de arma |
| T2 — Fusión y procedural inicial | Primera sala y receta acotada; variación por semilla con nodos conectados | Requisito completo, ranura liberada, nuevo premio que la rellena, ruta y variedad | Cerrar receta/herencia/límite/frecuencia antes de habilitar la operación. Puede probarse sala sin fusión activa mientras se cierra |
| T3 — Grieta y poderes | Recinto separado, origen congelado, única retirada y retorno; premios de poder y reemplazo | Diferencia entrada/escape, relojes, garantías y máximo3 poderes | Preservación completa de origen; fichas de al menos cuatro poderes de ensayo; parámetro explícito de instante/aviso/posición de escape |
| T4 — Ultimate y defensas | Pasiva+ultimate manual; cinco familias de ultimate con niveles propios de fixture; daño→reducción→escudo→vida | Un botón, cooldown, pausas, expiraciones, curación a vida completa y colisiones fantasma | Ficha de cada habilidad con cinco niveles, sin economía real; no introducir resurrección |
| T5 — Base y resultado de ensayo | Monedas ficticias y diez compras por soldado; resumen de componentes de puntaje; hitos/bono | Aislamiento entre soldados, compra única y conservación temporal/permanente diferenciada | Precios/efectos/score manifiestos como ensayo; no duplicar aumentos por XP/duplicados ni presentar saldo como servidor |
| R — Radar y HUD funcional | Ranura2 vacía/adquirida,3poderes,ultimate,ramas/extras,puerta/grieta y alertas legibles | Composición visual y controles desde T1, completando indicadores por tramo | No requiere terminarT5 o gacha. Arte aprobado y sonido/localizador se conservan |

T1A es la **primera próxima prueba entregable**; T1B sigue dentro de la misma línea de combate. T2–T5 son la secuencia posterior planificada y no se incluyen de golpe en esa primera entrega. Se pueden inspeccionar estados máximos en prácticas claramente marcadas sin atribuir a una expedición natural el progreso sembrado para QA.

T1B completa menú, mezcla y fichas de cartas; no significa que T1A pueda volver al nivel simple5 deB3. La representación por ramas y un avance elegible por copia son requisitos mínimos del premio cuando ya hay dos armas. Si solo se termina la simultaneidad, entregar una práctica parcial identificada y no afirmar que cumple todo el recorridoT1A.

## Rutas técnicas para T1A/T1B

Mantener HTML/CSS/JavaScript/Canvas2D y namespaceG. Editar fuentes; `index.html` y `js/app.min.js` se generan. Versionar el modo de reglas nuevo para conservar los ensayos anteriores y sus resultados; la consulta pública y la URL nuevas se fijarán al implementar, no están disponibles en este documento.

| Archivo existente | Cambio necesario y contrato a comprobar |
| --- | --- |
| `js/systems/map-trial.js` | Separar modo de ensayo nuevo del B3 anterior; mismo control de origen autorizado y sin parámetro `cuentas` |
| `js/data/field-catalog.js`, `js/systems/field-stats.js` | Fichas por familia y ramas; mantener progresión temporal distinta de entrenamiento por soldado y nivel permanente de ultimate |
| `js/systems/field-combat.js` | `reset` admite una o dos instancias solo en modo nuevo; `tick` usa objetivo/intervalo/munición/recarga por instancia. Conservar ruta anterior para regresión. `getstate/exportData/restoreData` describen ranura vacía y ambas armas sin compartir temporizadores |
| `js/ui/field-loadout.js`, `js/ui/technical-ui.js`, `dev.html` | Elegir una arma al inicio, mostrar ranura2 bloqueada/vacía, presentar tres candidatas al adquirir y reflejar ambas activas. No añadir selección de segunda arma inicial ni botón de alternancia obligatorio |
| `js/systems/event-rewards.js`, `exploration-chests.js` | Quitar la suposición rígida de dos copias para la nueva versión. Resolver estado de ranuras al reclamar, contenido y semilla de premio estables, identidad del evento y entrega única; no volver a sortear tickets ni duplicar adquisición al abrir dos cofres |
| `js/systems/field-upgrades.js` | Filtrar instancias equipadas, agrupar arma/general/libre, ramas5+extra y relleno de categorías vacías; revalidar una carta si se reemplazó/fusionó su copia. Saturación explícita sin moneda de cuenta |
| `js/systems/expedition.js`, `map-trial.js` | Primer jefe garantiza segunda si falta; resolver premio y XP pendiente antes de cruzar, respetar pausas, aliados sinXP/sin remate y retirada única, congelar recuperación desde300s conservando expiraciones |
| `js/systems/run-checkpoint.js`, `run-continuity.js` | Durante el primer tramo nuevo continuar sin persistencia real. Reanudar exacto requiere esquema propio con enemigos, proyectiles, efectos, RNG, relojes y recibos; no habilitar capture/restore heredados |

**Verificación prevista, todavía no ejecutada:** añadir tests de una/dos ranuras, doble entrega, cartas y límites en `tests/v2-infinite-combat.test.js`, `tests/v2-infinite-rewards.test.js`, `tests/v2-infinite-upgrades.test.js`; recorrido en `tests/v2-infinite-browser.py`. Esos nombres son archivos por crear. La pauta manual y resultados esperados se detallan en [PRUEBA_V2_INFINITO_01.md](PRUEBA_V2_INFINITO_01.md).

Comandos previstos en PowerShell, una vez que existan las pruebas:

```powershell
node --test tests/v2-infinite-combat.test.js tests/v2-infinite-rewards.test.js tests/v2-infinite-upgrades.test.js
node --test tests/v2-map-director.test.js tests/v2-exploration-chests.test.js tests/v2-event-rewards.test.js tests/v2-map-trial.test.js
npm.cmd run build
npm.cmd run build:check
node tools/render-roadmap.js --check
```

Esperado: cero fallos en los casos nuevos y regresión pertinente; documentar cualquier prueba dependiente de emuladores que no se ejecute. Navegador sobre fuente/compilado y escritorio/táctil emulado; al publicar, comprobar commit de Pages y hashes servidos. No anunciar prueba nueva publicada antes de que exista y pase sus verificaciones.

## Pendientes concretos que no reabren decisiones aceptadas

- Fichas de armas, cuatro ramas y extras, generales, poderes y cinco niveles de cada ultimate: magnitudes, objetivos, duración y cooldown. Preparar catálogo pequeño con parámetros de ensayo identificados.
- Primera receta de fusión, resultado/herencia, frecuencia de sala y límite de operaciones. La sala y liberar ranura ya están aprobados; «una sola vez» del último mensaje se refiere a escape, no al límite de fusión.
- Instante de la única retirada entre60–180s, aviso y posición alcanzable. No volver a preguntar si hay una o varias ventanas ni si el origen se congela.
- Ingresos/precios por soldado, destino deXP permanente/duplicados sin duplicar las diez compras; comportamiento operativo del dorado, garantías/fuentes y calibración del score.
- Detalle de saltos que preserve al jefe y no premie mapas omitidos. No bloquearT1A por decisiones de sistemas posteriores.

## Puerta de entrada al diseño visual

Preparar ya dirección visual, escala de personajes, módulos de escenarios y composición del HUD. Integrar el primer acabado sobre el comportamientoT1 y sus estados reales; continuar en paralelo los sistemas posteriores. No es necesario terminar cuentas, gacha, clasificación ni economía de producción para comenzar diseño visual. La aceptación de un concepto gráfico no demuestra colisión, balance o funcionamiento.

En la pauta visual conservar: números de daño proporcionados y formateados, identidad negro/blanco/rojo, recursos aprobados, radar discreto, estados de ranura vacía, ramas/extras, cooldown de ultimate y alertas/sonido/localizador de grieta. No crear aquí diseños sustitutos. Crédito exacto: «Desarrollado por Ivan Vivanco».

## Entrega y control

Esta revisión solo sincroniza documentación y planificación. RuntimeB3, configuraciones, dependencias, servicios reales y datos previos permanecen sin cambios. Al ejecutar cada tramo: respaldo, prueba roja/verde pertinente, revisión por raíz, build/check y evidencia dentro de su alcance; actualizar roadmap sin otorgar puntos por planificar. Si se delega, usar **Luna con razonamiento máximo**, por instrucción actual de Iván; raíz coordina e integra.
