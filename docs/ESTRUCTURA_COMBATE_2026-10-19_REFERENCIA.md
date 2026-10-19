# Combate múltiple: reglas aprobadas y propuesta de ultimate

19/10/2026. Complementa WIKI_REDISENO_ROGUELITE.md. Los cupos 2 armas simultáneas + 3 poderes anómalos + 1 ultimate y el máximo de nivel 5 de las ultimates fueron establecidos por Iván. Los valores de cooldown, balance y costes siguientes siguen siendo propuestas. Este documento no modifica el ejecutable ni el roadmap.

## Petición del usuario

Combinar varios ataques distintos, incluyendo granadas, molotov, rayos y objetos orbitales; reducir la dependencia de una sola arma activa. Explorar habilidades especiales como premio de jefes y grietas, respetando el lore de SCP y con límites de balance. Iván aclaró que «logo» significaba «lore».

## Decisión posterior del usuario

Iván aprobó dos armas simultáneas y pidió hasta tres poderes anómalos con reemplazo al aparecer un cuarto. Añadió una habilidad ultimate poderosa con cooldown largo para limitar su uso, obtenible en el gacha junto a armas y skins de soldados; las ultimates tienen nivel máximo 5 y deben ser difíciles de mejorar.

## Composición establecida

| Componente | Cupo aprobado | Funcionamiento |
| --- | --- | --- |
| Armas principales | 2 | Elegidas antes de salir; ambas pueden atacar automáticamente cuando tienen objetivo válido y alcance |
| Poderes anómalos | Hasta 3 | Efectos de la build; al aparecer un cuarto, elegir si reemplaza uno de los tres |
| Ultimate | 1 | Habilidad potente de uso limitado mediante cooldown largo; obtención en gacha y nivel máximo 5 |

La configuración anterior de dos apoyos más un protocolo queda sustituida por estos tres poderes; no se suman otras dos ranuras gratuitas. La clasificación concreta de granadas y molotov como armamento arrojadizo o efectos de un poder queda por catalogar; todo ataque debe ocupar un componente del equipo definido.

Ejemplo de combinación: pistola y katana, un dispositivo orbital, una descarga limitada, un campo térmico y una ultimate de contención. Cada componente tiene su intervalo; simultaneidad significa que ambos armamentos funcionan en paralelo, no que todos deban dispararse en el mismo fotograma.

La relación entre ultimate y la habilidad manual previa del soldado queda por concretar. No retirar ni añadir otro botón por inferencia. La adquisición inicial y las probabilidades de poderes de jefe/grieta también requieren catálogo propio.

## Cartas y recompensas

- Mantener tres opciones aleatorias y elegir una; filtrar por armas y poderes realmente equipados, compatibilidad y rangos disponibles.
- Propuesta de mezcla: una mejora de arma principal, una de poder anómalo y una general del soldado, sustituyendo grupos sin candidatos por otras mejoras válidas. La distribución todavía requiere aprobación.
- Cofre de jefe ordinario: conservar la mejora garantizada ya aprobada. Ampliar su elegibilidad a poderes requiere definir ese cambio; no sustituir silenciosamente el premio establecido por una habilidad nueva.
- Recompensa de un poder nuevo: con menos de tres se incorpora; con tres, se puede rechazar o elegir qué poder reemplazar. La propuesta es pausar la acción durante esa decisión y retirar completamente los efectos del poder saliente. La herencia de rangos o reembolso al cambiar no se da por aprobada.
- Mejorar temporalmente un poder durante la expedición y mejorar permanentemente una ultimate en la cuenta son progresiones diferentes. Una carta de XP no concede automáticamente un nivel permanente de ultimate.
- Rareza, probabilidades, costes y premios de duplicados al alcanzar el máximo quedan por definir con la economía.

## Ejemplos de apoyos para probar

| Apoyo | Papel | Límite que debe tener |
| --- | --- | --- |
| Granadas | Daño en grupos | Enfriamiento propio, radio y número de explosiones simultáneas limitados |
| Molotov | Control de una zona | Duración y número de zonas de fuego limitados; sin propagación perpetua |
| Descarga eléctrica | Daño repartido entre varios blancos | Tope de objetivos y sin rebotar infinitamente entre los mismos enemigos |
| Dispositivos orbitales | Protección cercana mediante daño | Cantidad y frecuencia de daño por enemigo limitadas; no crean invulnerabilidad al contacto |

Propuesta para discutir: poderes anómalos con cinco rangos temporales escritos individualmente. El límite de tres es su número de ranuras, no un límite aprobado de rangos. El nivel máximo 5 confirmado por Iván se registra para ultimates; no convierte automáticamente todos los topes de estadísticas anteriores en reglas aprobadas.

## Ultimate: propuesta de uso y progresión

Reglas ya establecidas: una ultimate de alto impacto, cooldown largo, obtención por gacha, nivel máximo 5 y mejora difícil. Iván aclaró que son habilidades únicas: escudo, curación instantánea, modo fantasma, explosión, lluvia de meteoritos u otras; no se restringen a ataques de daño.

Cada ultimate tiene un efecto único y una progresión propia de cinco niveles.

La composición y función de esas cinco mejoras se escriben por habilidad. Se retira la propuesta de escala común 100/105/110/115/120 %, que no define adecuadamente sus identidades distintas.

| Familia ilustrada por el usuario | Función | Propuesta de límite para desarrollar |
| --- | --- | --- |
| Escudo | Absorber daño durante una ventana crítica | Capacidad de absorción y duración finitas |
| Curación instantánea | Recuperar vida inmediatamente | Cantidad definida; resurrección solo si otra habilidad la define expresamente |
| Modo fantasma | Intangibilidad o evasión temporal | Duración breve; concretar daño, ataques y colisiones; conservar paredes, límites y puerta condicionada al jefe |
| Explosión | Daño de área para resolver una acumulación | Radio, daño e interacción con jefes definidos; sin muerte automática de todos los jefes |
| Lluvia de meteoritos | Ataques sucesivos sobre una zona | Número de impactos, duración y área limitados |

Estos límites son propuestas de diseño, no valores numéricos aprobados. Los nombres no atribuyen esas facultades a un SCP concreto: el catálogo deberá justificar cada habilidad según el lore o como tecnología original de la Fundación.

Recomendación pendiente de aprobación:

- Se elige antes de comenzar y se activa manualmente. Al obtenerla, el nivel 1 entrega su función completa.
- Asignar un cooldown largo propio a cada ultimate según su utilidad y condiciones. Los 120 segundos anteriores eran una referencia de prueba, no una cifra aprobada ni un cooldown universal. Conservar la recuperación entre mapas; la transición no concede una carga nueva.
- Escribir los cinco niveles individualmente: el escudo puede mejorar absorción, la curación su cantidad, el modo fantasma su ventana útil y los meteoritos su patrón o cantidad. No aumentar todos los parámetros a la vez. Excluir reducciones genéricas de cadencia y fijar límites propios si una ultimate mejora su cooldown.
- Proponer que la recuperación avance con combate activo y se congele en pausa, menús o espera en un mapa ya despejado. Debe definirse cómo cuenta el combate restante después de 5:00 y las grietas.
- Validar cada ultimate por su función: supervivencia, recuperación, movilidad/evasión, daño inmediato o control prolongado de una zona. Compartir rareza o nivel no significa compartir el mismo daño, duración o cooldown.
- Subidas garantizadas al reunir fragmentos específicos y un material escaso de desafíos. Coste creciente entre niveles; sin fijar cantidades antes de cerrar ingresos y duplicados del gacha. La dificultad de obtención no sustituye al límite de potencia.
- Los duplicados pueden aportar fragmentos; la equivalencia, obtención alternativa y tratamiento de duplicados a nivel 5 quedan pendientes.
- Recomendación: skins cosméticas, sin multiplicadores de combate. Que estén en el gacha está solicitado; su efecto puramente visual se propone, no se atribuye como aprobación del usuario.

No hay probabilidades de gacha, precios, cobros, tasas de fallo o premios reales aprobados ni implementados en esta sección.

## Adaptación del lore

Los artículos consultados describen propiedades de anomalías, no una transferencia automática de poderes por matarlas. Proponer equipo experimental, protocolos o contramedidas obtenidos al resolver un encuentro; algunos encuentros se superan conteniendo, sellando o forzando una retirada.

- [SCP-457](https://scp-wiki.wikidot.com/scp-457): entidad de fuego que depende de combustible. Adaptación original propuesta: protocolo térmico con un fogonazo breve y enfriamiento; no absorber la entidad ni reproducir su crecimiento sin límite.
- [SCP-106](https://scp-wiki.wikidot.com/scp-106): corrosión, tránsito a través de sólidos y dimensión de bolsillo. Adaptación original propuesta: campo corrosivo de área pequeña y duración limitada; no conceder intangibilidad permanente o acceso libre a su dimensión. La justificación del dispositivo debe escribirse como ficción propia del juego.
- [SCP-079](https://scp-wiki.wikidot.com/scp-079): IA contenida y aislada. Adaptación original propuesta: asistencia de sensores y marcado de objetivos desarrollada como contramedida, sin conectar al soldado con la entidad ni atribuirle ataques eléctricos canónicos.

Estos protocolos son interpretaciones jugables originales, no propiedades adicionales declaradas como canon de los artículos.

## Límites de balance y lectura

- Los ataques secundarios no vuelven a activar otros secundarios en cadena ilimitada.
- Cada sistema tiene intervalo mínimo, máximo de objetivos/zonas y reglas de acumulación explícitas.
- Los jefes tienen límites propios para ralentización, aturdimiento e interrupciones; evitar bloqueo permanente.
- Evitar daño porcentual ilimitado sobre la vida máxima del jefe y defensas que anulen de forma permanente sus ataques.
- Mantener visibles avisos de ataque, enemigos y suelo peligroso; acotar tamaño, opacidad y duración de efectos.
- Probar primero una combinación representativa antes de ampliar el catálogo o añadir más ranuras. No hay evidencia de balance o rendimiento por escribir esta propuesta.

La simultaneidad y los cupos ya están cerrados. Próximas decisiones: catálogo de poderes y ultimates, disponibilidad inicial, cooldown efectivo, relación con la habilidad del soldado, progresión y costes. La aprobación del diseño no acredita implementación ni balance.
