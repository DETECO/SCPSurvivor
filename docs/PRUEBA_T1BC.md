# Prueba combinada T1B + T1C

21/10/2026 · Paquete autorizado por Iván después de probar T1A: «funciona bien el demo» y «YA AVANCEMOS CON LO SIGUIENTE». T1C nombra el nuevo tramo de interfaz/radar. Esta pauta describe resultados esperados; consultar `V2-T1BC-REPORT.md` para resultados realmente ejecutados y limitaciones.

## Accesos

- [Mapa completo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2): una arma inicial, segunda por armamento; terminal cercano al inicio de cada mapa.
- [Terminal y reemplazo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=terminal): dos armas preparadas; Potencia2 en la primera, resto sin ramas.
- [Una arma al máximo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=maximos): primera con cuatro ramas/extras completos, segunda sin ramas; generales sin mejoras.
- [Saturación](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=saturacion): dos armas y generales al máximo, esfera de XP preparada para abrir la elección táctica.
- [Cuerpo a cuerpo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=melee): porra de ensayo y objetivo vivo cercano. Sin invulnerabilidad de jugador ni daño simulado en la práctica jugable.

La disponibilidad pública de esta entrega se confirma con el recibo de publicación. Los modos rápidos llevan un aviso: el equipo preparado no representa progreso conseguido naturalmente ni desbloqueos de cuenta. Los accesos anteriores siguen en `?prueba=infinito-v2` y `?prueba=mapa-v2`.

## Controles y recorrido

Muévete con WASD/flechas o joystick táctil. El ataque de ambas armas es automático. Toca una tarjeta de arma para pausar y consultar sus cuatro ramas, estadísticas y generales; luego continúa. P/R/M/E significa Potencia/Ritmo/Manejo/Especialización; 5+ señala el extra.

Sigue T en el radar hasta el terminal. Acércate y pulsa **Abrir terminal**: se detienen partida, enemigos, proyectiles y temporizadores. Elige la ranura que sale y el modelo que entra. **Confirmar reemplazo** crea una copia nueva sin ramas propias; la otra arma y las mejoras generales se conservan. **Cancelar y continuar** no cambia el equipo. El terminal no añade una tercera arma ni compra/desbloquea nada permanente. Es reutilizable como parámetro de este ensayo; no se fija una economía definitiva.

El radar mantiene el norte arriba y muestra símbolos distintos. Los cofres solo se muestran tras descubrirlos; abrirlos los retira del radar. Los objetivos lejanos se indican en el borde. La leyenda está al pausar. No es un mapa completo del escenario ni revela todos sus recursos.

La porra tiene daño18, intervalo0,7s, alcance64u y arco90°; golpea hasta3 enemigos con línea libre, sin balas ni recarga. Manejo amplía el arco4° por rango y10° extra; Especialización mantiene sus bonos de alcance y añade un blanco al extra. Potencia/Ritmo usan las reglas de ramas existentes. Son valores provisionales de prueba, no balance final.

## Pauta manual de Iván

Todos los casos siguientes quedan **PENDIENTES** hasta que Iván los pruebe. Su comentario positivo anterior corresponde a T1A en general; no se extrapola a este paquete.

| Caso | Acción | Resultado esperado |
| --- | --- | --- |
| BC01 | Empezar mapa normal | Una arma, sin ramas o generales regaladas; menú ofrece cuatro modelos |
| BC02 | Abrir/cancelar terminal | Acceso solo cerca y con línea libre; cancelación sin pérdida de equipo |
| BC03 | Reemplazar primera mejorada | Copia entrante con ID nuevo y ramas0; segunda y generales conservados |
| BC04 | Reemplazar segunda o mismo modelo | Solo cambia la ranura elegida; dos modelos iguales siguen independientes |
| BC05 | Esperar con terminal abierto o pausa | No avanza reloj, recarga, efecto, daño, aparición, XP o apertura de cofre |
| BC06 | Reanudar sobre terminal | Movimiento limpio, sin elección repetida ni tercera arma |
| BC07 | Probar porra contra enemigo cercano/lejano/pared | Golpe solo en alcance/arco/línea libre; sin proyectiles ni cargador; otra arma sigue atacando |
| BC08 | Mejorar Manejo/Especialización de porra | Cartas describen arco/blancos y sus efectos; sin bonos de recarga ficticios |
| BC09 | Probar máximos y saturación | Cartas válidas para lo que falta; saturación permite apoyo único15s activos, sin moneda real |
| BC10 | Consultar radar y HUD | Ramas/recargas legibles, norte fijo, cofre desconocido oculto y descubierto visible |
| BC11 | Cruzar al segundo mapa | Conserva equipo y generales; renueva terminal/mapa, resuelve XP y armamento pendientes una vez |
| BC12 | Probar escritorio y teléfono físico | Controles utilizables y sin superposición que impida jugar; emulación automática no acredita el teléfono real |

## Alcance posterior

Se mantienen arte y recursos aprobados, identidad negro/blanco/rojo de los nuevos indicadores y crédito exacto «Desarrollado por Ivan Vivanco». El acabado completo de personajes, escenarios, animaciones y efectos sigue pendiente. La reserva de distribución para3poderes+1ultimate es informativa; no muestra habilidades nuevas activas.

Fusión/receta/herencia, nuevas topologías, grieta separada con origen congelado, poderes, pasiva/ultimate, economía y guardado real siguen en sus tramos posteriores. Esta demo no activa servicios ni billing. El avance de V2 no se convierte en52/100 ni cierra las tareas históricas por publicar código.
