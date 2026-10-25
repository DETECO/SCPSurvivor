# Compañero de contención en grietas

**Regla vigente posterior —25/10/2026 / EST-NPC-001 r1:** Iván exige **arma al azar y reserva ilimitada de munición**, igual que el jugador. Sustituye la reserva finita indicada en las notas históricas inferiores y la AF01fija del primer ensayo. Se conservan cargador/recarga/cadencia, tasas/rareza, ayuda temporal, incapacitación, sin remate/XP/transferencia. [Lote005r2 y pruebas](gestion/lotes/LOT-EST-005-r2.md) · [registro de decisión](gestion/CONTROL_CAMBIOS.md). Frases de agotamiento de reserva dejan de ser elegibles; no borrar el banco histórico. Implementado y publicado por relevo técnico de Juanillo; [recibo y límites](gestion/LOT-EST-005_PUBLICACION.json).

**Actualización local · 25/10/2026:** las tres compañeras delgada/fitness/curvy ya están integradas en16/32 mediante piezas R3 nuevas, con ocho vistas, dos brazos, AF01 orientada y nombres femeninos. Los límites del paquete R2 que siguen abajo son antecedentes conservados. [Implementación, accesos y pruebas](gestion/entregas/PERSONAJES-COMPANERAS-003.md). La publicación posterior del conjunto con reserva infinita se comprueba en el recibo LOT005r2; esta entrega histórica R3 conservaba AF01fija/reserva finita.

**Actualización de recursos · PERSONAJES, 24/10/2026:** se recuperó la aceptación directa de Iván de las tres alternativas femeninas (delgada, fitness y curvy) y el encargo de desarrollar sus modelos finales, mensaje `msg_01a1697b-bb4c-7cc0-b2a8-a72056e8cde0`, 23/10. Las fuentes y atlas ya existen; las menciones posteriores a «Iván diseñará los sprites» son antecedentes de esta producción. La revisión actual detecta 24 atlas multiframe con filas mezcladas que requieren reexportación, además de completar anclas y montaje del arma. No equivale a aceptación técnica de esos archivos ni a integración. [Manifiesto, contratos y evidencia](gestion/entregas/PERSONAJES-GRIETAS-001.md). Los textos aprobados se conservan sin cambios.

**Ampliación narrativa 23/10/2026:** Iván pide variedad de personalidades y acompañantes femeninos, cuyos sprites diseñará él. Añade asignar nombre al azar y una presentación al aparecer. [Banco por personalidades V2](DIALOGOS_PERSONALIDADES_COMPANEROS_V2.md), complemento del V1, con identidad persistida y listas propuestas de nombres. Presentación femenina/masculina, biografía y tono son independientes; no cambian estadísticas, equipo o tasas de aparición.

22/10/2026 · ESTRUCTURA · **Mecánica aceptada por Iván: «ya queda aceptado». Pendiente de implementación y balance.** La aceptación incluye las recomendaciones de la ficha: un NPC temporal por recinto, tirada única, armas básicas Normal, D4 Raro/Épico al 50/50, arma no transferible, reserva de apoyo finita, sin remate del jefe y posible incapacitación sin rescate obligatorio. Cantidades de daño/munición y valores de vida siguen por definir; no se aprueban por inferencia otras probabilidades del sistema de grietas.

**Encargo posterior:** ampliar reconocimiento de armas propias/del jugador, escenario, recuerdos y casa; reconocer en una fase posterior el nombre o alias del jugador. [Banco de diálogos V1 y condiciones](DIALOGOS_COMPANEROS_GRIETA_V1.md). El 23/10 Iván fija **burbujas de texto** y un sonido característico que diseñará en el hilo «sonido»; no habrá locuciones de las frases. Textos y perfiles nuevos pendientes de revisión e integración.

**Propuesta posterior, aún sin aprobar:** [brecha de refuerzos en el mapa](PROPUESTA_BRECHA_REFUERZOS.md), por la que sale un NPC en lugar de entrar a un recinto. Sus probabilidades y cupos no están elegidos; las tasas 33/10 de este documento siguen correspondiendo al compañero dentro de la grieta.

## Reglas pedidas por Iván

Un compañero de contención puede aparecer dentro de una grieta para apoyar al jugador. Habla durante el encuentro y su tono cambia según el peligro.

| Peligrosidad de la grieta | Probabilidad de compañero | Arma | Tono solicitado |
|---|---:|---|---|
| D1 | 33% | Básica, elegida al azar | Apoyo y ánimo |
| D2 | 33% | Básica, elegida al azar | Apoyo y ánimo |
| D3 | 33% | Básica, elegida al azar | Apoyo y ánimo |
| D4 | 33% | Rara o épica | Apoyo; matiz de tensión recomendado |
| D5 | **10%** | **Legendaria** | Expresa miedo y que quiere irse |

El miedo de D5 es una decisión de diálogo. **Iván no ha pedido que huya, abandone al jugador, falle disparos o pierda su arma.** No importar automáticamente la huida de uno de los dos aliados de la puerta del escenario: corresponde a otro evento.

## Sorteo y alcance aceptados

- Máximo un compañero propio por recinto de grieta. Es un NPC temporal, no un personaje desbloqueado, gacha adicional ni una ranura del jugador.
- Una sola tirada de presencia por encuentro. Aplicar 33% como 33 de 100, no aproximarlo a un tercio. Para D5, 10 de 100.
- Fijar el resultado junto con el encuentro y revelarlo al entrar: si corresponde, aparece en un lugar seguro próximo al punto de llegada, sin bloquear el paso. No concederlo simplemente por acercarse al portal del mapa.
- En una expedición con dos grietas, cada recinto tiene su propio resultado; pueden tener compañero ambas, una o ninguna. No añadir garantía de aparición ni volver a tirar cuando quede poca vida.
- Orden: aparición de grieta → peligrosidad → encuentro compatible → presencia del compañero → rareza/modelo de su arma. Usar sorteos separados y persistidos para que matar enemigos, pausar o cargar no cambie esos resultados.
- El apoyo permanece solo en ese recinto. Termina al volver, retirarse, morir o finalizar el encuentro; no se acumula en el mapa de origen ni atraviesa escenarios con el jugador.

Las probabilidades son **condicionadas al tier del recinto**, no al minuto ni a todas las partidas. Con la tabla de peligro 50/32/8/7/3, y si se entrara a todas las grietas, la media esperada sería un compañero en 32,31% de los encuentros. La combinación D5 + compañero sería 3% × 10% = **0,3% de las grietas**. Las decisiones de entrada del jugador pueden cambiar esas frecuencias observadas.

## Selección de armas — dirección aceptada, valores pendientes

Interpretar «básicas» como **tier Normal**, con una lista de armas aptas para el NPC: pistola, subfusil y escopeta de servicio, por ejemplo. No asumir que cualquier arma del catálogo ya está animada o programada para aliados.

Para D1–D3, elegir uniformemente entre los modelos básicos compatibles. Para D4, primero 50% Raro / 50% Épico y después azar uniforme entre los modelos compatibles de ese tier, reparto aceptado junto con las recomendaciones. Para D5, seleccionar una legendaria compatible al azar; si solo hay una validada, no anunciar variedad inexistente.

Mantener la identidad del arma elegida (patrón, proyectil, cadencia y efecto) con un perfil de daño de apoyo. Su tier no multiplica automáticamente el daño ni entrega al NPC todas las mejoras, extras MAX, fusiones o poderes del jugador. No escalar su potencia sin límite con el arma equipada por el jugador.

Su arma es equipamiento de servicio temporal: no se transfiere, no cae como premio al morir ni entra en el inventario/gacha. Esta restricción aceptada evita convertir al compañero legendario en otra fuente de armas permanentes.

## Ayuda útil sin resolver el encuentro — dirección aceptada

El compañero cubre al jugador, contiene enemigos menores y contribuye contra el jefe. No puede dar el golpe final al jefe ni completar objetivos obligatorios, activar la retirada o reclamar premios por el jugador. Sus ataques deben respetar fases invulnerables y reglas de la anomalía.

**No basta con impedir el remate:** con disparos infinitos el jugador aún podría esperar hasta que el NPC dejara al jefe a un golpe. Se recomienda una reserva finita de munición de apoyo por encuentro, sin regeneración ni consumo de recursos del jugador. Los valores se calibran por arma y tier, especialmente las legendarias; sin cifras de daño, tiempo o munición aprobadas todavía.

Aplicar el contrato general ya aceptado de aliados: sus bajas no entregan XP temporal al jugador. Evitar diseñarlo como eliminador masivo de minions que quite al jugador su progresión; medir apoyo efectivo y XP perdida antes de validar su potencia. No modificar aquí el puntaje, los premios de victoria ni la garantía de poder.

Recomendación para supervivencia: puede quedar incapacitado y dejar de combatir, sin reaparición ni tirada nueva. No exigir rescate ni penalizar al jugador por perderlo; no convertir la grieta en una escolta obligatoria. Su presencia y daño recibido deben ser legibles, sin absorber indefinidamente al jefe ni bloquear rutas. El aggro, vida y tratamiento definitivo de su baja quedan por definir en la prueba.

## Diálogo y lectura

Mostrar frases breves al llegar y ante eventos del combate mediante burbujas de texto, con frecuencia limitada y sin tapar patrones de ataque. Acompañar con el sonido característico pendiente de diseño en «sonido», sin locución. Sin mensajes continuos ni pausas forzadas. No prometer acciones que el NPC no pueda realizar; no repetir por mover la cámara o reanudar.

Ejemplos propuestos, no catálogo final aprobado:

| Contexto | Frase |
|---|---|
| D1–D3, llegada | «Contención en posición. Te cubro.» |
| D1–D3, avance del combate | «Aguanta. Sigue moviéndote.» |
| D4, llegada | «Esto es serio. Mantén distancia; yo cubro.» |
| D5, llegada | «Tengo miedo… quiero salir de aquí. Te cubro, pero no te detengas.» |

El contraste entre arma legendaria y miedo refuerza la peligrosidad de D5: el buen equipo no elimina la amenaza. El diálogo no revela información secreta del jefe ni significa que el personaje abra otra salida. Avisos de jefe y de la retirada única tienen prioridad sobre las frases de ánimo.

## Continuidad y verificación

Guardar presencia, arma, posición, estado de combate/incapacitación, munición y frases ya disparadas junto con la versión de reglas y el recinto. Reanudar conserva el mismo compañero; no lo revive, recarga o cambia de tier gratuitamente. No modificar el sorteo de peligrosidad al generar al aliado.

Verificar antes de aceptar implementación: tirada única 33/10; arma en tier correcto; ausencia de transferencia y reroll; apoyo sin remate ni desgaste infinito; progresión del jugador; rutas y lectura de ataques; prioridad de avisos; retirada y victoria sin NPC persistente; suspensión antes/después de aparecer o incapacitarse. Los ensayos sin compañero de grieta no acreditan estos resultados.

**Pendiente para la ficha de prueba:** lista final de modelos, cantidad de munición y daño de apoyo, vida/aggro y realización de la incapacitación, textos definitivos, burbujas y vínculo con perfiles visuales. El sonido característico se diseñará en «sonido»; no se requiere locución. Normal para básicas, reparto Raro/Épico 50/50 y límites de ayuda ya están aceptados. El reconocimiento futuro del nombre se define en el banco V1, sin asumir que existe ya un perfil persistente integrado.
