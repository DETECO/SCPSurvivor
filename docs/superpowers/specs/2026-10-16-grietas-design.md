# Grietas dimensionales: prototipo local autorizado

Iván autorizó agregar la propuesta de grietas opcionales, preparar una prueba que realizará él y conservar sonido/alerta para P09. Añadió ubicación física, tiempo limitado de apertura y un indicador para encontrarlas. No se requiere otra consulta para ejecutar ese alcance.

## Comportamiento

- Prototipo optativo en loopback, sin cuentas: `?grietas=local`. Al despejar un sector normal desde S2, sorteo independiente reproducible del 25%; una oportunidad por sector. No consume el azar de jefes/extracción.
- Prueba directa `?prueba=grieta`: S1 despejado, una grieta garantizada. No acredita oleadas completadas ni modifica guardados; reiniciar permite repetir la prueba.
- Posición libre y alcanzable del escenario, al menos 140 unidades del jugador y 100 de la salida. Marcador en mundo e indicador permanente de dirección, distancia en unidades del juego y segundos restantes.
- Apertura 45 segundos de juego activo. Pausa/menú de mejoras detienen el reloj; no se castiga cambiar de ventana. Al agotarse, se cierra y no reaparece en ese sector.
- Sonido de apertura sintetizado y aviso en pantalla una vez; el aviso no depende del volumen. Respetar silencio/volumen y no tapar controles. El indicador permanece aunque termine el aviso.
- Entrada instantánea por contacto (radio22 más radio del jugador), con línea libre, sin botón, tecla, confirmación ni espera; conserva movimiento. Decisión posterior de Iván A-023/D-311. El Custodio dimensional emerge allí con 1,5 segundos de aviso sin atacar.
- Reutilizar el arte provisional existente: vida ×1,35, daño ×1,15 y pulso adicional cada 6 segundos que fija la posición del jugador, avisa 1,2 segundos y permite apartarse de un radio de 60. Respetar paredes.
- Combatir o huir por salida durante 2 segundos; movimiento/daño cancelan la retirada. Victoria o retirada devuelven el sector despejado, sin avanzar dos veces ni cambiar calendario de jefes normales. XP habitual de 220 al vencer; ninguna recompensa especial/persistente.
- P05 queda excluido del prototipo hasta diseñar y validar persistencia de aparición, expiración y resultado. Combinar `cuentas=local` con opciones de grietas las desactiva. No modificar esquema de checkpoints ni servicios reales.

## Diseño final y aceptación

Sonido de aparición, alerta visible y localizador con cuenta regresiva son requisitos permanentes para P09. El aspecto de grieta, señales, mezcla sonora y jefe se revisará allí; este prototipo no aprueba arte ni balance. Iván realiza la aceptación manual. Los ensayos internos solo comprueban funcionamiento técnico.

El aplazamiento D-260 sigue aplicando a arena aparte, catálogo adicional y recompensas especiales. Esta autorización habilita el prototipo descrito, no esos subsistemas ni publicación externa.
