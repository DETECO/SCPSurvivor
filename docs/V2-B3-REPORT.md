# V2-trial-03: premios de jefe y práctica dimensional

20/10/2026 · B1/B2 revalidados y B3 implementado como prototipo. Aceptación manual de Iván pendiente; RC-10 permanece EC.

El jefe obligatorio genera un cofre separado del cupo de exploración. Su contenido fijo mejora en +1 nivel una copia equipada elegible, por ID/modelo, con el máximo 5 del prototipo. Revalida la copia al abrir y concede una única entrega. Si está saturada, muestra «Sin mejora compatible» sin compensación inventada; datos incompatibles bloquean también los tickets.

La práctica `premios=grieta` reutiliza el portal físico y el Custodio en el mismo escenario: apertura 45 segundos activos, sonido, alerta, localizador y contacto instantáneo. El reloj continúa; el jefe dimensional tiene una referencia independiente del obligatorio. Vencerlo no limpia enemigos ni desbloquea la puerta. Solo vencer y abrir el cofre otorga una mejora compatible y 2–3 tickets ficticios equiprobables, **parámetros provisionales del ensayo**, sin saldo real. No se entrega nada por entrar, expirar, abandonar o morir.

Los cofres comparten descubrimiento, apertura por proximidad 50 u sin pared durante 3,5 s y retroceso 1,5 s/s. Pausa global y cartas congelan el proceso. Los tickets se acumulan en memoria, separados de cuentas, `player.t1`, gacha y checkpoints. Nueva partida reinicia el registro.

## Verificación

Los resultados concretos y hashes se conservan en [V2-B3-VALIDACION.json](V2-B3-VALIDACION.json). Publicación online pendiente de comprobación al preparar este registro; el recibo posterior identifica el commit servido sin incorporar un SHA autorreferente antes del commit.

- B1/B2 publicados: revalidación inicial de dos escenarios online, escritorio/táctil emulado, sin errores ni solicitudes externas.
- Source: suite Node de 29 archivos, 172 casos, **171 aprobados, 1 omitido, cero fallos**. Se excluye la preparación Worker incompleta; se omite un caso que requiere emuladores activos.
- Publicación: suite Node de 29 archivos, 172 casos, **170 aprobados, 2 omitidos, cero fallos**. Además del emulador, un caso CORS exige dependencias de `functions` no instaladas en esta copia. Sin cambios en esos servicios.
- Build y build:check: aprobados en ambas copias, **88 scripts**; configuraciones de cuentas anteriores conservadas.
- Navegador source: cuatro escenarios B3 (fuente/compilado × escritorio/táctil), cada uno con jefe, grieta y cierre sin premio. Regresiones independientes: cuatro recorridos de cofres y cuatro de jefe/puerta.
- Revisión independiente: detectó que invocar refuerzos usaba el tope heredado64. Corregido con límite compartido24 y reserva para el jefe obligatorio. Prueba de regresión observada roja antes y verde después. El corte de nuevos enemigos a300s se conserva.
- Revisión visual: captura táctil del resultado del premio dimensional legible y separada de controles. Arte provisional.

El simulador mueve al jugador, concede invulnerabilidad y derrota al jefe con daño controlado. Usa pausa real, tiempo activo y proximidad para comprobar el premio. Se corrigieron dos supuestos del simulador: las cartas no cuentan como tiempo de apertura y permanecer sobre el lugar de muerte puede empezar a abrir el cofre automáticamente. No se quitaron las guardas del juego para hacer pasar las pruebas.

La versión de publicación también pasó cuatro escenarios B3, cada uno con jefe, grieta y expiración, más cuatro recorridos de regresión de cofres y cuatro de jefe/puerta. Total local: ocho escenarios B3 y dieciséis recorridos de regresión.

La versión de publicación se compila y comprueba por separado para conservar su configuración anterior de cuentas. Ningún resultado acredita balance, FPS, dispositivo físico o aceptación humana. La comprobación de sonido registra la emisión del evento; Iván debe confirmar su percepción en la prueba manual.

## Límites y continuidad

No hay viaje a otra dimensión, retorno, nueva aparición aleatoria V2 de grietas, persistencia, economía real ni cierre de P05. Firebase continúa Spark, sin facturación y con cuentas propias desactivadas. Las reglas 2+3+1 y radar aprobadas permanecen para B4 y siguientes bloques, sin implementarlas aquí. No se sustituyeron gráficos ni se reintrodujeron mochilas, accesorios o extracciones.

Las 53 tareas, estados, criterios y pesos históricos conservan52/100. Avance V2 sin calcular; B3 y RC-10 no se declaran aceptados. Originales Cloud, ZIPs y `sources/` intactos. Respaldo previo `development-backups/b3-20261020-antes.zip` fuera del repositorio. Se publican solo cambios de esta entrega; la preparación Worker no publicada permanece aislada.

[Guía manual](PRUEBA_PREMIOS_B3.md) · [Plan](superpowers/plans/2026-10-20-b3-premios.md) · [Diff](V2-B3-CAMBIOS.diff).
