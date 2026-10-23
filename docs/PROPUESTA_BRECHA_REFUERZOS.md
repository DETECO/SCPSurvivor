# Propuesta: brecha de refuerzos en el mapa

23/10/2026 · ESTRUCTURA · **Idea planteada por Iván y desarrollo recomendado; pendiente de aprobación. Sin implementación.**

Iván propone que el compañero pueda aparecer fuera del recinto: en vez de una entrada para luchar contra una anomalía, de la brecha sale un soldado que ayuda en el escenario actual.

## Recomendación

Crear un evento **brecha de refuerzos**: aviso visible, apertura breve y salida de un único NPC; la abertura se cierra después. El jugador continúa en el mapa con su reloj normal. No es una entrada que se pueda cruzar, no abre un recinto ni pausa el mundo, y no entrega un poder por sí sola.

Tiene valor como sorpresa positiva y permite conocer al compañero durante el recorrido. Las burbujas pueden comentar el escenario de origen y el equipo que el jugador lleva allí, con más oportunidades para recuerdos durante momentos tranquilos.

Mantener las grietas de anomalía como fuente de poderes y el apoyo dentro de ellas ya aceptado. La propuesta de apoyo exterior no elimina automáticamente ese sistema.

## Dos maneras coherentes de incorporarla

| Opción | Método | Consecuencia |
|---|---|---|
| **A — recomendada** | Evento de refuerzo separado del dado de grietas | Conserva las oportunidades actuales de buscar poderes; añade su propia frecuencia, pendiente de definir |
| B | Tras un sí del dado, sortear si la brecha es anomalía o refuerzo | Produce más incertidumbre, pero sustituye algunas oportunidades de anomalía y reduce acceso a poderes; exige revisar tabla y máximo de dos |

Iván todavía no ha elegido entre A y B, ni sus porcentajes. Con B, el orden sería sí/no → tipo de brecha → peligrosidad si es anomalía. No añadir refuerzos como un sexto tier a la tabla de peligro 50/32/8/7/3.

Con A, el máximo aceptado de dos corresponde a grietas de anomalía y el refuerzo necesita un cupo propio. **Recomendación nueva:** como máximo una aparición exterior de refuerzo por mapa, aun si se pierde el NPC; máximo un NPC de refuerzo exterior activo. Ese cupo y su probabilidad requieren aprobación. No transferir silenciosamente el 33%/10%: esas tasas se eligieron para apoyo condicionado al tier de una grieta, y el escenario exterior no tiene ese mismo tier definido.

## Límites propuestos

- Un único soldado temporal, con ayuda limitada, arma no transferible, reserva de apoyo finita y sin remate del jefe, siguiendo el contrato ya aceptado para el NPC de recinto. No se convierte en un desbloqueo de gacha.
- Su selección de armas requiere tabla propia por etapa del recorrido; no otorgar automáticamente una legendaria por aparecer en un mapa profundo. Tampoco asignar el diálogo de miedo D5 sin una condición de peligro exterior definida.
- Su llegada no modifica el jefe obligatorio, la XP de bajas aliadas ni la garantía de poderes por victoria de grieta. Medir el tiempo y la progresión que puede ahorrar al jugador.
- Reservar ubicación conectada, fuera del cuerpo del jugador, colisiones y rutas críticas. El portal de refuerzo necesita símbolo/aviso distinto del de anomalía para que el jugador entienda que no puede entrar.
- Si el jugador entra después a una grieta de anomalía, el refuerzo exterior queda con el origen congelado; no entra con él ni se suma al compañero que pueda aparecer en el recinto. Al volver conserva su estado, sin recargar ni curarse por la transición.
- Al terminar el mapa no continúa al siguiente. Para evitar sumar un tercer apoyo a los dos aliados de la puerta a 5:00, recomendar su retirada coordinada antes de ese evento. Su llegada debe programarse con margen; horarios y ruta de salida aún pendientes. No sustituir ni recrear los dos aliados del evento obligatorio.
- No crear nuevas oleadas ni otro refuerzo tras 5:00. No usar esta abertura para saltar mapas, extraer, curar gratuitamente o repetir recompensas.

## Diálogos y sonido

Reutilizar voces, biografías y comentarios del [banco V1](DIALOGOS_COMPANEROS_GRIETA_V1.md) con filtros para el contexto exterior. Las líneas sobre entrada a recinto, retirada de grieta o victoria de su jefe no se habilitan por aparecer en el mapa. Habla en **burbujas de texto**. El sonido característico se diseñará en el hilo «sonido»; no se requiere audio hablado ni mensajes a ese hilo desde esta entrega.

Dos ejemplos nuevos propuestos, no incorporados al conteo de 102 variantes del banco: «Refuerzo de contención. Vi tu señal y crucé» solo si realmente existe una señal emitida; alternativa independiente de ese sistema: «Refuerzo de contención. Voy a acompañarte un tramo». Otra: «Me tocó salir por aquí. Prefiero encontrar a alguien de nuestro lado».

## Continuidad y pendientes

Persistir semilla/versión, oportunidad consumida, aparición, identidad, arma, munición, posición, estado y retirada. Cargar no vuelve a sortear ni duplica al NPC. Distinguir este evento de grietas y de los aliados de 5:00 en sus registros.

Antes de implementar: elegir A o B, probabilidad y horario, confirmar cupo exterior, asignar armas, concretar retirada antes de 5:00 y validar rutas/rendimiento. Esta propuesta no cambia aún las probabilidades aceptadas de grietas ni del compañero de recinto.
