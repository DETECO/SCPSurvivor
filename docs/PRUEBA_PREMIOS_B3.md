# Prueba de premios B3

20/10/2026 · Roadmap 0.26 · Tu aceptación manual sigue pendiente.

## Accesos

- [Mapa y cofre de exploración garantizado](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&cofres=prueba).
- [Cofre del jefe: comenzar en 4:30](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&premios=jefe).
- [Grieta: comenzar en 0:00](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&premios=grieta).

Pulsa el botón de inicio del menú. Si tienes la demo anterior abierta, recarga con Ctrl+F5. No agregues `cuentas` a estas direcciones. Para probar localmente, usa las mismas consultas sobre el servidor indicado en INSTALACION_WINDOWS.md.

## 1. Recorrido y exploración

1. Inicia la práctica de cofres. Explora alrededor de los obstáculos, comprueba el espacio para esquivar y acércate al cofre.
2. El indicador de ubicación debe aparecer cuando lo descubras. Permanece a 50 unidades o menos, sin pared entre ambos, durante 3,5 segundos activos para abrirlo.
3. Aléjate durante la apertura: pierde 1,5 segundos de progreso por segundo. Pausar y elegir cartas detiene la apertura.
4. Anota si el mapa, las distancias, el indicador y los controles son cómodos. Este cofre está forzado para probarlo; en una partida normal puede no aparecer ninguno.

## 2. Premio del jefe

1. Inicia la práctica del jefe. Comienza cerca del Custodio vivo en 4:30. Derrótalo jugando; las pruebas automáticas usan daño controlado, pero esta demo no te concede una victoria automática.
2. Aparece su cofre en el lugar donde murió. No consumes el cupo de cofres de exploración.
3. Descúbrelo y permanece cerca 3,5 segundos. Entrega **+1 nivel temporal de una copia de arma equipada elegible**, una sola vez. El contenido se fija al aparecer, sin volver a sortearlo al abrir.
4. El límite 5 se conserva del prototipo anterior. Si no existe una mejora compatible o la copia elegida ya llegó al máximo, lo indica sin inventar curación ni moneda compensatoria.
5. A 5:00 llega la puerta con aliados y termina la aparición de enemigos. El jefe obligatorio debe estar derrotado para cruzar; los remanentes siguen vivos.

## 3. Grieta y premio dimensional

1. Inicia la práctica dimensional. La grieta está físicamente en el mapa, con sonido de aparición, alerta y flecha de dirección/distancia. Se mantiene abierta **45 segundos activos**.
2. Camina sobre ella para entrar **al instante**, sin botón ni espera. Aparece el Custodio dimensional en este mismo escenario; el ensayo todavía no viaja a otro mapa.
3. Entrar no entrega premio. El reloj del mapa sigue avanzando y los enemigos presentes permanecen.
4. Vence al Custodio y abre su cofre por proximidad durante 3,5 segundos. La tabla provisional del ensayo entrega una mejora temporal compatible y **2–3 tickets ficticios**, equiprobables. Si las armas están al máximo, conserva solo esos tickets base.
5. El dimensional no sustituye al jefe obligatorio ni desbloquea su puerta. Dejar cerrar la grieta, abandonar el mapa o morir no concede premio.
6. Repite sin entrar y comprueba que desaparezca al agotarse el tiempo, sin premio.

## Pauta para Iván

Registrar cada punto como aprobado o describir el problema; todavía no hay resultados manuales registrados:

- [ ] Desplazamiento, espacio y distancias del mapa cómodos.
- [ ] Cofre descubierto, indicador, apertura, retroceso y pausa comprensibles.
- [ ] Jefe vencido genera un cofre; mejora visible y sin duplicarse.
- [ ] Grieta localizada antes del cierre; sonido y alerta perceptibles.
- [ ] Contacto instantáneo sin botón, incluso con enemigos alrededor.
- [ ] Dimensional y jefe obligatorio independientes; remanentes conservados.
- [ ] Cofre dimensional entrega mejora compatible y tickets ficticios una sola vez.
- [ ] Grieta expirada no permite ingreso ni entrega premio.

Los tickets existen solo en memoria durante esta partida. No son saldo, gacha ni guardado de cuenta. El aspecto, audio y balance son provisionales; P09 debe conservar sonido, alerta y localizador al desarrollar los efectos definitivos. La aparición aleatoria V2, dimensión/retorno, economía, radar, dos armas simultáneas, tres poderes y ultimate quedan pendientes. Ver [informe](V2-B3-REPORT.md).
