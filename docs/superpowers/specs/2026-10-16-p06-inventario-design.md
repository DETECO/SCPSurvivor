# P06 — primera entrega local de inventario

Iván autorizó comenzar la siguiente fase después de la entrada instantánea de grietas. La fase P06 contiene cinco tareas; esta primera entrega aborda P06-T01 y prepara el modelo necesario para las restantes. No acredita P06 completa ni supera dependencias de P05 todavía EV.

## Reglas existentes que se implementan

D-167/D-168: copias físicas de armas con identidad y estado independiente; cambiar equipamiento no rellena cargador ni elimina recarga/espera. D-173: arma, mod suelto o mochila de reserva ocupan un espacio sin apilar; mods instalados forman parte del arma. Dos armas y mochila equipadas no consumen su interior. D-174: mochilas8/16 sin penalización de velocidad. D-175: almacén compartido60 (buzón30 se implementará en P06-T04). D-170/D-178/D-179/D-185/D-186: gestión en base/preparación, confirmar cambios, descanso sigue corriendo; no descartar objetos al reducir capacidad, intercambio de mod al estar llena reutiliza el hueco.

## Alcance concreto de esta primera entrega

- Modelo de inventario con cada copia referenciada una sola vez: dos armas equipadas, una mochila, mochila interior, almacén y mods instalados. Transferencias atómicas; rechazar operaciones inválidas sin cambios.
- Prototipo optativo `?inventario=local` y acceso directo de prueba `?prueba=inventario`, solo loopback sin cuentas. Equipo de ejemplo claramente ficticio, sin guardado ni economía. No sustituye inventario confirmado por servidor ni se añade a checkpointsP05.
- Gestión mediante panel en el menú y entre oleadas; muestras reales de IDs/modelos/ocupación, equipar/intercambiar armas y mochila, instalar/retirar mods disponibles, mover objetos mochila↔almacén solo en base.
- Aplicar únicamente al confirmar; durante preparación el reloj continúa y al agotarse descarta borrador. Sin permiso en combate, subida de nivel o pausa. Conservar munición, recarga, nivel temporal y espera compartida al confirmar en la expedición.
- Prueba directa empieza en preparación para probar el panel sin completar oleadas; no acredita victorias/oleadas. Modo normal y P05 no cambian.

P06-T02 kit gratuito, P06-T03 muerte/recuperación, P06-T04 buzón y P06-T05 resultados pendientes no se dan por implementados. Tampoco hay botín físico/gacha nuevo ni persistencia del prototipo. La integración transaccional con cuentas es la siguiente parte de P06-T01 y requisito para cerrar su aceptación.
