# Pauta vigente de SCP Survivor — revisión ESTRUCTURA

18/10/2026 · Diseño V2 · **Pauta actualizada; cambios del juego pendientes de implementar.**

Esta pauta incorpora el chat **ESTRUCTURA** y la instrucción posterior de Iván en PROGRAMACION. Sustituye las reglas incompatibles del diseño de extracción. El código actual se conserva como punto de partida; no se reconstruye el juego.

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
| Extracción voluntaria para terminar y asegurar equipo | Retirar su calendario, opción, interacción y cierre de partida | Todavía existe en el prototipo |
| Accesorios/mods físicos de armas | Retirar objetos, instalación, compatibilidades y ranuras | Todavía existen |
| Mochilas | Retirar tamaños, capacidad, equipamiento y gestión | Existe un prototipo local temporal |
| Armas y soldados | Conservar; ampliar mediante catálogo revisado | Tres armas y dos soldados de prueba |
| Armas distintas, con estadísticas básicas propias | Mantener identidad por arma; organizar por familias | Categorías nuevas pendientes |
| Mejoras al subir de nivel | Mejorar armas al azar durante la partida | El sistema de cartas actual necesita adaptación |
| Gacha | Orientarlo a soldados y armas | Economía/entrega real pendientes |
| Jefes | Un jefe obligatorio por mapa; encuentros dimensionales aparte | El calendario actual de jefes entre sectores necesita cambio |
| Grietas especiales | Desafíos opcionales difíciles con recompensas mayores | Existe un prototipo local limitado |
| Saltos dimensionales | Rutas/saltos entre niveles, inspirados en Backrooms | Diseño detallado e implementación pendientes |
| Cofres y recompensas del escenario | Definir antes del tamaño final de mapas | Hay sistemas heredados y cajas de campo; reglas V2 abiertas |
| Arte, identidad visual, controles y crédito | Conservar recursos aprobados y «Desarrollado por Ivan Vivanco» | El acabado final sigue pendiente |
| Cuentas y guardado P05 | Conservar seguridad y adaptar contratos al nuevo recorrido | Aceptación con servicios propios pendiente |

Retirar accesorios **no elimina las mejoras de nivel ni las estadísticas de las armas**. Retirar mochilas **no autoriza borrar la colección persistente de soldados o armas**.

Almacén físico, buzón por falta de espacio, kit con mochila y recuperación aleatoria del equipo al morir dependían del diseño anterior. Se **replantean** antes de implementar P06; no se asumen aprobados para V2 y tampoco se borran datos por inferencia a partir de «etc.».

## Armas y progresión

Las familias mencionadas por Iván son **láser, cuerpo a cuerpo, a distancia, misiles y arrojadizas**. Es una dirección de catálogo; faltan la lista final, sus estadísticas y las reglas particulares de cada familia. No todas necesitan cargador, recarga o proyectiles iguales a una pistola.

El requisito más reciente es que las mejoras de nivel suban armas **al azar**. Falta concretar qué armas pueden salir, si el jugador sigue eligiendo entre cartas, las probabilidades y los topes. No conservar por defecto el supuesto de que una carta mejora todo el arsenal ni imponer el antiguo límite de dos armas o nivel cinco como regla definitiva de V2.

Soldados y armas obtenidos mediante gacha forman parte de la dirección solicitada. Rarezas, duplicados, probabilidades, recompensas por muerte y progresión permanente se cerrarán antes de implementar la economía. La propuesta de diez atributos nuevos de soldados no se considera aprobada por el hecho de aparecer en una respuesta del asistente.

## Grietas, puerta y saltos

Son tres funciones diferentes:

1. **Puerta blindada de la Fundación:** aparece al minuto cinco; avance normal condicionado al jefe.
2. **Grieta de anomalía:** desafío opcional, más difícil y con recompensa mayor. Conservar apertura temporal, ubicación alcanzable, indicador de dirección/distancia/tiempo, alerta en pantalla, sonido e **ingreso instantáneo por contacto, sin botón ni espera**.
3. **Salto dimensional:** salto/ruta entre niveles. Su destino, condiciones y relación con el jefe obligatorio requieren definición; no implementar un atajo que anule esa obligación sin una regla expresa.

El retorno desde la anomalía, la pausa del reloj del mapa al entrar, el tratamiento de 5:00 si hay una grieta abierta y los premios exactos siguen abiertos. El prototipo de Custodio en el mismo escenario no demuestra una dimensión separada ni recompensas persistentes.

## Cofres y tamaño de los mapas

En ESTRUCTURA se está revisando este punto. **Sí hay una base aprobada anterior:** D-140–148/D-220/D-279 fijan sorteos por oleada, probabilidades/topes, tickets, apertura y descubrimiento. Se conserva íntegra en [cofres: base y adaptación](docs/COFRES_BASE_Y_ADAPTACION_V2.md). Falta adaptar el disparador por oleadas a mapas de300s; no hay presupuesto/distribución V2 cerrados. Las cajas de campo actuales no dan botín y no son esos cofres.

Antes de fijar dimensiones finales: revisar sobre esa base los tipos de cofre, apertura, frecuencia, premio, relación con jefes y si su contenido mejora la partida o la colección. Después probar mapas con rutas alternativas, desplazamiento útil y salida alcanzable entre enemigos. No trasladar premios de accesorios o mochilas a V2 ni importar sin revisión los premios genéricos de Pokesurvivor.

## Orden para continuar

1. Usar esta pauta y resolver las reglas abiertas en el [plan de cambios](docs/PLAN_CAMBIOS_ESTRUCTURA.md).
2. Terminar P05 y definir compatibilidad de guardados con V2. Mantener Firebase Spark sin facturación; no declarar cierre por emuladores o preparación local.
3. Implementar primero un mapa completo: cinco minutos, jefe, puerta, soldados y transición. Retirar la extracción del recorrido V2.
4. Adaptar armas/mejoras y retirar accesorios/mochilas con sus dependencias.
5. Replantear P06 para colección/equipamiento y adaptar P07 para gacha/recompensas; no continuar la lista anterior de inventario físico.
6. Integrar cofres, variantes de mapas, grietas y saltos con las reglas cerradas. Después completar arte, audio, controles y pruebas de integración.

**Estado:** esta entrega actualiza planificación, no implementa V2 ni termina P05/P06. El **52/100 pertenece a la línea base anterior**. El avance global del diseño V2 queda sin calcular hasta revisar alcance, aceptación y pesos; quitar funciones no produce avance automático.

Trazabilidad: [decisiones y pendientes de ESTRUCTURA](docs/ESTRUCTURA_DECISIONES.md), [plan técnico y pruebas](docs/PLAN_CAMBIOS_ESTRUCTURA.md), [roadmap](ROADMAP.md).
