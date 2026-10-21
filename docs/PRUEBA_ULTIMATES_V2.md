# Pauta de pruebas — ultimates V2

19/10/2026. Estado: alcance aprobado; implementación y ejecución pendientes.

Iván aprobó incluir las ultimates discutidas en la fase de pruebas. Esta pauta prepara B4/RC-14 sin afirmar resultados, sin alterar los estados del roadmap y sin conceder progresión o premios reales.

## Alcance establecido

- Configuración de combate: dos armas simultáneas, hasta tres poderes anómalos y una ultimate.
- La ultimate es una habilidad única ofensiva, defensiva o de utilidad; no se limita a un ataque de daño.
- Familias iniciales para el ensayo: escudo, curación instantánea, modo fantasma, explosión y lluvia de meteoritos.
- Cada ultimate tiene cinco niveles propios como máximo y un cooldown largo ajustado a su efecto. Se conserva la dirección de obtención por gacha y progresión difícil.
- El ensayo usa selección y progresión ficticias para comprobar efectos y límites. La entrega real de gacha, duplicados, costes y niveles de cuenta corresponde a su integración posterior; no se simula como si estuviera aceptada por servidor.

## Preparación del ensayo

Antes de ejecutar, cada habilidad debe disponer de una ficha con efecto, objetivos válidos, límites, valores de sus cinco niveles, cooldown y condiciones de activación. Sus números serán parámetros de prueba identificados como tales. La antigua referencia universal de 120 segundos y la escala común 100–120 % no constituyen especificaciones aprobadas.

La relación de controles con la habilidad previa del soldado, la disponibilidad inicial y el comportamiento en grietas y cambios de mapa deben quedar explícitos en el prototipo. No resolver esas decisiones modificando silenciosamente otras mecánicas.

## Casos a comprobar cuando exista el prototipo

| Caso | Comprobación |
| --- | --- |
| Selección | Solo una ultimate equipada; no consume ni amplía las tres ranuras de poderes anómalos |
| Niveles | Comprobar niveles 1, 2, 3, 4 y 5; rechazar niveles fuera del rango y verificar que cada nivel produce exactamente su efecto definido |
| Activación | Una activación por orden válida; pulsaciones repetidas no duplican el efecto ni el gasto de carga |
| Escudo | Absorción finita, agotamiento y expiración correctos; sustitución o fin del efecto no deja protección permanente |
| Curación instantánea | Recuperación inmediata y tope de vida respetado; probar herido y con vida completa según la regla declarada; no introducir resurrección implícita |
| Modo fantasma | Comprobar duración, daño, capacidad de atacar y colisiones según su ficha; no eludir límites del escenario ni puerta bloqueada por jefe |
| Explosión | Radio, objetivos, daño e interacción con jefe acordes a la ficha; una sola aplicación por objetivo cuando corresponda |
| Meteoritos | Cantidad y duración finitas, áreas legibles y daño por impacto definido; ningún generador de impactos permanece activo al terminar |
| Cooldown | Recuperación según reloj y condiciones definidos; comprobar pausa, selección de cartas, cambio de mapa y encuentros de grieta |
| Combinaciones | Probar con ambas armas y tres poderes; evitar activaciones recursivas, control permanente del jefe y bonificaciones residuales |
| Interfaz | Botón, disponibilidad y cooldown legibles en escritorio y móvil; efectos no ocultan avisos del jefe ni la puerta |
| Progresión ficticia | Mejorar nivel en la prueba no cambia la cuenta, el saldo de tickets o la colección real; XP temporal no eleva el rango permanente |

## Evidencia y aceptación

Registrar versión, valores usados, entorno y resultado por caso cuando se ejecuten. Mantener separados resultados automatizados, revisión visual, prueba humana y balance. La aprobación del alcance no acredita que los casos pasen ni cierra RC-14, RC-09 o P05.

Referencia de diseño y lore: [combate múltiple y ultimates](PROPUESTA_COMBATE_MULTIPLE.md).
