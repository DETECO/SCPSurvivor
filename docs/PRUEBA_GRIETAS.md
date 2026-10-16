# Prueba local de grietas dimensionales

Fecha16/10/2026. Prototipo autorizado por Iván para que él realice la siguiente prueba. **Aceptación manual de Iván pendiente.** Este documento describe el alcance preparado; no afirma que los escenarios hayan sido aprobados por el usuario ni sustituye el registro de pruebas automáticas.

## Abrir la prueba

Con el servidor local del juego abierto, utilizar:

- **Prueba directa:** [http://127.0.0.1:8000/?prueba=grieta](http://127.0.0.1:8000/?prueba=grieta). Iniciar la expedición: el primer sector comienza despejado y garantiza una grieta, para probarla sin completar varias oleadas.
- **Partida con apariciones:** [http://127.0.0.1:8000/?grietas=local](http://127.0.0.1:8000/?grietas=local). Desde el sector2, cada sector normal despejado tiene una probabilidad reproducible del25 % de ofrecer una grieta.

El prototipo solo se habilita en el computador local y **sin cuentas**. No añadir `cuentas=local` a estas direcciones. No requiere iniciar los emuladores de Firebase. Las grietas todavía no forman parte del checkpoint P05; recargar o cerrar esta partida no acredita conservación del encuentro.

Si el servidor está cerrado, abrir PowerShell en la carpeta `SCP-SURVIVOR` y ejecutar:

```powershell
npm.cmd run serve
```

Mantener esa ventana abierta mientras se juega.

## Qué probar primero

1. Abrir la prueba directa e iniciar la expedición. Comprobar que la aparición produzca una alerta sonora y un aviso visible en pantalla. El navegador puede necesitar la interacción inicial con el juego para permitir sonido.
2. Localizar la grieta mediante el indicador de dirección, distancia y tiempo restante. Debe existir también un marcador en su posición física, en un punto libre y alcanzable del escenario.
3. Caminar hasta tocar o cruzar la grieta activa. **La entrada es instantánea por contacto**, sin botón, tecla, confirmación ni espera. Permanecer cerca sin tocarla no debe activar el encuentro; el contacto debe iniciar una sola entrada. También se puede evitar e ignorar la grieta.
4. Al entrar, comprobar el aviso de llegada del Custodio dimensional de1,5 s. Ese aviso pertenece a su aparición y preparación de ataque, no retrasa la entrada en la grieta. Observar sus ataques habituales y el pulso adicional, cuyo aviso fija una zona en la posición que ocupaba el jugador: moverse debe permitir esquivarla.
5. Probar la retirada desde la salida. La interacción dura2 s y se cancela al moverse o recibir daño. Retirarse devuelve al sector despejado, sin avanzar un sector ni acreditar una victoria del jefe dimensional.
6. Repetir la prueba directa para intentar vencerlo. La victoria devuelve al sector despejado y permite continuar la expedición. No debe contabilizar dos veces ese sector ni alterar el calendario de jefes normales.

## Probar el cierre por tiempo

En otra partida de prueba, dejar la grieta sin utilizar. Debe permanecer abierta **45 s de tiempo activo** y desaparecer al agotarse el tiempo. Pausar el juego o estar eligiendo una mejora congela el contador. Comprobar que dirección, distancia y tiempo correspondan a la grieta visible y que el aviso sonoro de aparición no se repita continuamente.

Se puede ignorar la grieta y continuar por la salida normal. Si se entra mientras sigue abierta, el límite de45 s corresponde a la oportunidad de entrada, no a una cuenta atrás de derrota del combate.

## Parámetros provisionales

| Elemento | Prototipo local |
| --- | --- |
| Ubicación | Punto libre y alcanzable, al menos140 unidades del jugador y100 de la salida |
| Aparición ordinaria | 25 % reproducible al despejar un sector normal desdeS2 |
| Apertura | 45 s de juego activo; pausa y elección de mejora congelan el tiempo |
| Entrada | Instantánea al tocar o cruzar la grieta activa, con paso libre; radio22 más el radio del jugador (34 unidades con el radio normal12), una sola vez y sin controles adicionales |
| Arena | Mismo sector; no hay traslado a otra dimensión ni arena separada |
| Jefe | Custodio existente como variante provisional dimensional |
| Refuerzo | Vida×1,35 y daño×1,15 respecto al jefe del mismo sector; vida base810 frente a600 |
| Ataque adicional | Pulso cada6 s, aviso1,2 s, radio60 y centro fijado al comenzar el aviso |
| Retirada | Salida con interacción2 s cancelable por movimiento o daño |
| Victoria | 220 XP temporal habituales, sin recompensa especial persistente |

Estos valores permiten evaluar la idea; no constituyen balance final. «Dimensional» describe esta variante de prueba: no implica que exista un nuevo personaje con arte definitivo, una colección de jefes adicionales, botín especial, inventario o economía de servidor.

## Resultado que falta registrar

Después de la prueba de Iván, registrar por separado: localización y lectura del indicador, audio/aviso, cierre por tiempo, entrada, posibilidad de esquivar, retirada, victoria y continuidad de la expedición. Anotar errores reproducibles y preferencias de dificultad o presentación. Hasta entonces la aceptación manual permanece pendiente.

P09 conserva como requisito permanente la alerta sonora, el aviso visible y la localización legible; ver [OBSERVACIONES_VISUALES.md](OBSERVACIONES_VISUALES.md). El prototipo no modifica porcentajes del roadmap, no acepta Firebase real y no acredita rendimiento en teléfonos físicos, balance, audio final o persistencia de grietas.
