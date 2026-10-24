# Pauta vigente de SCP Survivor — revisión ESTRUCTURA

## Coordinación vigente — Juanillo / ESTRUCTURA · 23/10/2026

Iván activa las instrucciones de coordinación de este hilo: **EST-ORG-001 r1**. Esta pauta es la entrada maestra; [CONTROL_CAMBIOS.md](docs/gestion/CONTROL_CAMBIOS.md) registra revisiones examinadas, conflictos y lotes. Se registran las reglas generales aprobadas aquí y se respetan las decisiones/recursos de las especialidades. Al pedir consolidación se comparan revisiones y se leen cambios/dependencias; las conversaciones se consultan cuando falte evidencia, declarando cobertura real.

La consolidación conserva la intención aprobada, prepara lotes verificables y enlaza los informes de PROGRAMACION. No implementa ni publica. Las correcciones técnicas ya encargadas que restablecen un diseño aprobado no necesitan otra consolidación. **Activación acotada:** no configura otros hilos ni migra sus historiales; REV-EST-0001 es una revisión inicial parcial y todavía no prepara un lote nuevo.

### Índice de fuentes existentes

| Tema / responsable | Entrada documental |
|---|---|
| ESTRUCTURA — coordinación, revisiones y lotes | [Control de cambios](docs/gestion/CONTROL_CAMBIOS.md) |
| ESTRUCTURA — reglas aceptadas y antecedentes | [Decisiones V2 infinito](docs/DECISIONES_INFINITO_2026-10-20.md) |
| PERSONAJES — aprobación existente de diseños | [Registro 22/10](docs/PERSONAJES_APROBACION_2026-10-22.md); pauta/revisión posterior por identificar al consolidar |
| ARMAS | [Pauta de armas](docs/PAUTA_ARMAS.md) |
| NIVELES | [Pauta de escenarios R7.1](docs/PAUTA_CREACION_ESCENARIOS.md) |
| SONIDO | [Pauta SON-001](docs/PAUTA_SONIDO.md) |
| PROGRAMACION — alcance declarado de presentación 0.33 | [Informe de integración](docs/PRESENTACION_INTEGRADA.md) |
| MENUS — decisiones visuales aprobadas | [Pauta MENUS](docs/PAUTA_MENUS.md) · [recursos aprobados](design-proposals/menus/aprobados-20261022/) |
| ICONO APP | Referencias de entrega en el informe anterior; fuente propia pendiente de revisión para un lote nuevo |

Las notas fechadas que siguen son antecedentes de decisiones/entregas. Su fecha o posición no sustituye la fuente de aprobación ni amplía el alcance revisado en el control.

**Entrega 0.33 · 23/10/2026:** Presentación integrada: escenario inicial R7 Backrooms480×320 con profundidad visual2.5D, menús aprobados responsivos, icono3 con SCP, personajes16/32 y dos prácticas visibles. Seis apariencias de grieta en B3; nuevas mecánicas de azar/NPC/recinto separado documentadas y pendientes. [Jugar](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2) · [Alcance y límites](docs/PRESENTACION_INTEGRADA.md) · [ESTRUCTURA consultada](docs/ESTRUCTURA_SYNC_2026-10-23.md).


**Variedad de compañeros · 23/10/2026:** Iván solicita tonos sarcástico, enojado, entusiasta, cariñoso, simpático y otros, y diseñará sprites femeninos. Añade nombre aleatorio y diálogo de presentación. [Banco V2 por personalidades](docs/DIALOGOS_PERSONALIDADES_COMPANEROS_V2.md) incluye listas propuestas de nombres, presentación única y persistencia de identidad. Personalidad independiente del género; sin cambios de combate, sprites nuevos, audio hablado ni integración.

**Burbujas y refuerzo exterior · 23/10/2026:** Iván fija diálogos en burbujas de texto, sin locución; diseñará un sonido característico en «sonido». Plantea además que de una brecha salga un compañero para ayudar en el mapa. [Propuesta de refuerzo exterior](docs/PROPUESTA_BRECHA_REFUERZOS.md): evento separado recomendado, frecuencia/cupo pendientes; no modifica todavía las tasas de grietas ni del apoyo interior. Sin implementación.

**SONIDO · 22/10/2026:** Iván elige **SON-001 rev. 1.0**, ambiente «Presencia en la oscuridad» para el menú inicial. Recurso y decisión aprobada en la [pauta de SONIDO](docs/PAUTA_SONIDO.md). La integración debe coordinarse con PROGRAMACION y su sistema de audio vigente; todavía no está integrada ni probada en el juego.

**Aceptación y diálogos del compañero · 22/10/2026:** Iván acepta las recomendaciones de su mecánica, incluido D4 Raro/Épico 50/50, ayuda limitada y arma no transferible. Pide reconocer armas propias/equipadas, recinto, recuerdos y casa, y más adelante el nombre del jugador. [Banco V1](docs/DIALOGOS_COMPANEROS_GRIETA_V1.md) con cuatro voces propuestas y condiciones de uso. Textos nuevos y parámetros de conversación pendientes de revisión; sin implementación ni audio.

**Compañero de grieta · 22/10/2026:** Iván fija aparición del 33% en D1–D3 con arma básica aleatoria, 33% en D4 con arma Rara o Épica y 10% en D5 con Legendaria. Habla y anima; en D5 expresa miedo y ganas de irse, sin huida mecánica aprobada. [Ficha de diseño](docs/COMPANERO_CONTENCION_GRIETAS.md). Sorteo separado del de peligrosidad. Recomendaciones de ayuda limitada y reparto Raro/Épico aceptadas posteriormente; cifras de combate y textos definitivos pendientes. Sin implementación.

**Grietas, revisión 2.2 · 23/10/2026:** Iván aprueba **EST-GRI-001 r1**: dado **50% sí / 50% no**, oportunidades a **1:00/2:00/3:00/4:00 activos desde el segundo mapa** y máximo **dos apariciones acumuladas por mapa**. Se conservan los pesos previos **50/32/8/7/3%** para el segundo sorteo de peligrosidad. [Ficha vigente](docs/GRIETAS_DADO_POR_MINUTO_V2.md) · [LOT-EST-001 r1](docs/gestion/lotes/LOT-EST-001-r1.md), director de sorteos listo documentalmente como núcleo aislado, sin ejecución ni publicación. Ubicación, catálogo de encuentros, recintos y NPC mantienen sus dependencias; esta aprobación no altera los seis estilos visuales ya integrados.

**Cierre de ARMAS aprobado · 23/10/2026:** Iván responde «acepto todo.» a [EST-ARM-001 r1](docs/CIERRE_ARMAS_PROGRESION_FUSION_V1.md): **una escala 1–5 + MAX por copia sustituye las cuatro ramas**, una fusión por expedición, estación desde mapa 2 y **CC04 + TE01 → F24 FINAL** como primera receta; perfiles de ensayo y contrato de animación aceptados. [LOT-EST-002 r1](docs/gestion/lotes/LOT-EST-002-r1.md) queda listo documentalmente para PROGRAMACION, con validación pendiente de agarres/poses, sala, confirmación y balance. ARM-VIS-001/R1 conserva su aprobación visual: nueve armas y F24, ocho vistas en 16/32 y 160 sprites. El ensayo anterior aún requiere adaptación de código; esta consolidación no implementa ni publica. Las otras 62 recetas y el resto del catálogo90 no se aprueban por extensión. [Evidencia y alcance REV-EST-0005](docs/gestion/CONTROL_CAMBIOS.md).

**Actualización 0.32 · PERSONAJES, 22/10/2026:** Personajes del hilo PERSONAJES incorporados al ensayo T1BC: seis actores en 32/16, selección gráfica, montaje humano modular y dos apoyos amarillos. PNG copiados sin edición; geometría, estadísticas, armas jugables y comportamiento aliado conservados. Diseños aprobados por Iván para implementación el 22/10/2026; no catálogo final 24+24 ni armas nuevas. [Aprobación](docs/PERSONAJES_APROBACION_2026-10-22.md). [Jugar 32](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=32) · [Jugar 16](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=16) · [Alcance](docs/PERSONAJES_INTEGRACION.md).


**Actualización 0.31 · Arte de ensayo V1, 21/10/2026:** Arte de ensayo V1 aplicado sobre T1BC: cinco actores locales con siluetas y animación más detalladas, cuatro armas distinguibles y comparación clásica. No reemplaza el catálogo final ni cambia colisiones, estadísticas, cámara o recorrido. Fusión, nueva geometría, poderes y ultimate siguen pendientes. [Jugar](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2) · [Ver modelos](https://deteco.github.io/SCPSurvivor/prueba-visual-v1.html) · [Alcance](docs/ARTE_ENSAYO_V1.md). Iván aceptó T1BC en general; no todas las pruebas/dispositivos. El nuevo arte aún no tiene aprobación final.


**Entrega vigente 0.30 · T1B + T1C, 21/10/2026 (A-040/D-336/EV-045):** T1B + T1C implementados como ensayo: terminal voluntario con reemplazo de una copia y pausa completa; ramas/cartas revisadas por familia; cuarta arma, porra de corto alcance sin munición; HUD de ramas/recargas y consulta de equipo; daño compacto y radar circular fijo sin revelar cofres desconocidos. Cuatro prácticas explícitas: terminal, máximos, saturación y melee. Sin cuentas/guardado/economía real. Arte y balance provisionales; fusión, grieta separada, poderes y ultimate pendientes. [Práctica de terminal](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=terminal) · [Mapa completo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2) · [Guía](docs/PRUEBA_T1BC.md) · [Resultados](docs/V2-T1BC-REPORT.md). Iván informó que T1A funciona bien: aceptación general de esa demo, sin extrapolar a todas las pruebas/dispositivos ni a esta entrega nueva. La entrada pública por defecto abre T1BC; se conservan accesos anteriores. Spark sin facturación; servicios reales desactivados.


**Entrega vigente 0.29 · T1A, 21/10/2026 (A-039/D-335/EV-044):** T1A implementada como prueba parcial: una arma inicial, segunda por cofre de jefe o élite de práctica, hasta dos balísticas simultáneas con recursos propios. Cuatro ramas5+extra, cartas arma/general/libre y apoyo táctico temporal con valores de ensayo. Premios/XP resueltos antes de puerta, aliados sinXP/sin remate y congelación de recuperación a300s. Sin cuentas/guardado. Fusión, poderes, ultimate, terminales, otras familias, radar y economía siguen pendientes; no equivale aB4 completo. Aceptación de Iván pendiente. [Jugar T1A](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2) · [Práctica de élite](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=elite) · [Práctica de jefe](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=jefe) · [Resultados y límites](docs/V2-T1A-REPORT.md). Esta entrega sustituye el estado «solo planificado» de0.28. B3 se conserva mediante `?prueba=mapa-v2`; la entrada pública sin consulta abreT1A. Mantener Spark sin facturación y servicios reales desactivados.


**Plan vigente 0.28 · ESTRUCTURA, 20/10/2026 (A-038/D-334):** ESTRUCTURA sincronizada hasta 01a15a34-93e9-7a11-9597-6a2c37fb2570 (20/10/2026): modo infinito; una arma inicial y segunda por premio/primer jefe; máximo dos simultáneas. Cuatro ramas5+extra por arma, poderes/generales5+extra y ultimate5permanentes. Fusión en sala, mejoras permanentes por soldado con monedas, tres gachas con gris1/dorado5, procedural y radar. Próxima prueba V2-INFINITO-01/T1A planificada, todavía sin implementación ni nueva URL. P05 aceptado por el propietario para avanzar; servicios reales diferidos. Agentes Luna máximo bajo coordinación de raíz. [Plan actual](docs/PLAN_DESARROLLO_V2_INFINITO.md) · [Pauta próxima prueba](docs/PRUEBA_V2_INFINITO_01.md) · [Decisiones aceptadas](docs/DECISIONES_INFINITO_2026-10-20.md). Esta instrucción posterior sustituye inicio con dos armas, nivel simple máximo5, mezcla de cartas sin cerrar y requisitos P05 que bloqueaban el prototipo. Conservar diferencias de la demo B3 como antecedentes; no presentarla como la nueva prueba. Usar **Luna con razonamiento máximo** al delegar; prevalece sobre la preferencia previa Sol medio.


**Prioridad vigente 0.27 · 20/10/2026 (A-037/D-333):** Iván da por aceptado lo pendiente de P05 para continuar y prioriza llegar al diseño visual. Aceptación del propietario registrada; las comprobaciones técnicas de servicios reales no ejecutadas se difieren, sin declararlas aprobadas. P05 deja de bloquear el prototipo local B4 y la preparación visual. Cuentas propias, economía persistente y facturación siguen desactivadas. [Mecánicas pendientes y ruta al diseño](docs/PRIORIDAD_MECANICAS_Y_DISENO.md). Esta instrucción posterior sustituye el bloqueo anterior por aceptación P05 para esos trabajos locales; no autoriza activar servicios reales ni reintroducir mochilas, accesorios o extracciones.


**Actualización vigente 0.26 · B3, 20/10/2026 (A-036/D-332/EV-041):** B1/B2 conservados y revalidados online en dos escenarios; aceptación manual pendiente. B3 implementado como prototipo aislado: cofre de jefe con +1 nivel temporal de una copia equipada elegible (máximo 5 heredado), y práctica explícita de grieta con Custodio separado en el mismo mapa. Solo tras vencer y abrir el cofre durante 3,5 s se entrega el premio; la grieta añade 2–3 tickets ficticios de tabla provisional. Sin premio por entrar, expirar o morir; saturación sin compensación adicional, salvo tickets base de grieta. RC-10 sigue EC/evidenceComplete=false; P05 real, B4, combate 2+3+1, bono de diez minutos/hitos, economía persistente y aceptación completa pendientes. [Guía B3](docs/PRUEBA_PREMIOS_B3.md) · [Resultados y límites B3](docs/V2-B3-REPORT.md). Build/check y navegador B3 aprobados en ambas copias; demo publicada y verificada online. Aceptación humana pendiente; consultar el informe y recibo.

**Publicación de la prueba existente (A-033):** disponible mediante [GitHub Pages](https://deteco.github.io/SCPSurvivor/) y [acceso rápido](https://deteco.github.io/SCPSurvivor/?rapida=1), con las mismas mecánicas V2-trial-01. La ampliación B1/B2 incorpora cofres ficticios de exploración y escala inicial 160 × 100; aceptación pendiente. Esta publicación no cierra P05 ni la aceptación completa de V2.

18/10/2026 · Diseño V2 · **Primer prototipo del recorrido disponible; adaptación completa y aceptación pendientes.**

Esta pauta incorpora el chat **ESTRUCTURA**, incluida su aprobación de cofres y escala inicial en el turno `01a15142-340f-7400-8660-f8d2502ce2aa`, y la instrucción posterior de Iván en PROGRAMACION. [Corte de reglas aprobadas](docs/ESTRUCTURA_REGLAS_APROBADAS.md). Sustituye las reglas incompatibles del diseño de extracción. El código actual se conserva como punto de partida; no se reconstruye el juego.

**Prueba V2-trial-01:** [guía manual](docs/PRUEBA_MAPA_V2.md). El recorrido de mapas300s, jefe y puerta con aliados está implementado como ensayo local sin guardado. Jefe240s y acceso rápido270s son parámetros provisionales de prueba. El corte original no implementaba cofres. B1/B2 añade exploración ficticia y B3 incorpora premios de jefe y práctica de grieta en el mismo mapa; familias/azar final, gacha, dimensiones nuevas y persistencia siguen pendientes. [Resultados](docs/V2-PRIMERA-PRUEBA-REPORT.md).

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
| Cofres y recompensas del escenario | Exploración, jefe y grieta; sorteos y escala inicial aprobados | Exploración ficticia B1/B2 y premios temporales de jefe/grieta B3 implementados como prototipos; bono/hitos y economía final pendientes; cajas de campo sin botín |
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
