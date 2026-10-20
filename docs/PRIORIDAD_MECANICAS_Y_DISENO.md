# Mecánicas pendientes y ruta al diseño visual

20/10/2026 · Roadmap 0.27 · A-037 / D-333.

## Aceptación y prioridad de Iván

> si da por aceptado lo pendiente de p05 quiero avanzar rapido para comenzar con el diseño visual. que nos queda sobre las mecanicas ??

Se registra la aceptación del propietario de lo pendiente de P05 para continuar. No se exige repetir esa aprobación. La comprobación técnica de servicios reales no ejecutados se conserva como diferida: no se afirma que Google, correo, aislamiento de cuentas, concurrencia o recuperación real hayan pasado nuevas pruebas. Las tres tareas históricas P05 permanecen EV/0 de6 conforme a su evidencia, sin alterar sus criterios ni sumar puntos ficticios. La aceptación del usuario y la ejecución de pruebas son registros distintos.

Esta decisión posterior permite avanzar el prototipo local B4 y preparar diseño visual sin esperar el backend. No habilita cuentas propias, escrituras reales, premios persistentes, billing ni cambios de plan. Mantener Spark. B5 tendrá que resolver autoridad y guardado antes de conectar datos reales. No confundir esta aceptación P05 con una prueba manual ejecutada de B1/B2/B3.

## Qué falta de mecánicas

| Bloque | Trabajo pendiente | Estado y orden recomendado |
| --- | --- | --- |
| Armas y mejoras | Dos armas disparando simultáneamente; comportamiento por familia, estadísticas y mejoras independientes; tres ofertas compatibles; casos sin candidatos y al máximo | Primer tramo B4. Actualmente existe selección entre armas, no simultaneidad completa. Los rangos y probabilidades finales siguen abiertos; identificarlos como parámetros de ensayo cuando proceda |
| Poderes anómalos | Hasta tres equipados; adquisición, catálogo y efectos; reemplazo al cuarto retirando el efecto anterior | Segundo tramo B4/RC-13, sin agregar ranuras de apoyo |
| Ultimate | Una equipada; escudo, curación, fantasma, explosión y meteoritos en el ensayo; cinco niveles, controles y cooldown por habilidad | Tercer tramo B4/RC-14. Valores de prueba explícitos; sin inventar costes/gacha ni resolver silenciosamente la relación con habilidad del soldado |
| Cierre y continuidad de partida | Dejar explícitos muerte, resultado, qué progreso temporal termina y qué se conserva; premios y mejoras coherentes en cambios de mapa | Necesario para una demo jugable completa; guardado real y economía siguen separados |
| Grietas y saltos definitivos | Modalidad de aparición V2, recinto/destino, reloj, retorno y restricciones del jefe obligatorio | La prueba actual funciona en el mismo escenario. No afirmar que existe una dimensión nueva ni resolver saltos por inferencia. Se puede producir diseño visual del portal con su contrato actual mientras se cierra esta regla |
| Ajuste del combate y señalización | Vida/daño/ritmo de enemigos y jefes, experiencia, recargas, cooldowns, avisos y controles; radar según pauta aprobada | Ensayo e iteraciones sobre mecánicas implementadas; no equivale a producir todo el arte o medir FPS físicos |

## Qué ya tiene prototipo probado

Mapas de cinco minutos, jefe obligatorio, puerta y aliados, corte de apariciones a5:00 con remanentes conservados, transición de mapa, cofres de exploración, cofre de jefe y práctica dimensional con premio único. B3 fue probado localmente y online según V2-B3-REPORT.md. Aceptación humana B1/B2/B3 permanece tal como estaba; este turno no describe haberlos jugado.

## Ruta corta recomendada

1. Completar B4 por tramos: armas/mejoras → poderes → ultimate.
2. Cerrar las reglas mínimas de muerte/resultado y modalidad de grieta para la demo; comprobar que funcionan juntas.
3. Empezar el diseño visual de la demo, con HUD dimensionado para2 armas+3 poderes+1 ultimate, controles, personajes, escenarios, daño, cofres y grietas. Puede prepararse dirección visual y distribución del HUD mientras se estabiliza B4; no hace falta terminar gacha o backend para ello.

Gacha, colección permanente, guardado entre dispositivos, economía y ranking no se eliminan: quedan para su integración posterior con criterios propios. No reconstruir el proyecto, sustituir diseños aprobados ni reintroducir extracción, mochilas o accesorios.

Documentos base: [plan jugable](PLAN_DISENO_JUGABLE_V2.md), [decisiones](ESTRUCTURA_DECISIONES.md), [ultimates](PRUEBA_ULTIMATES_V2.md), [estado técnico P05](CIERRE_P05.md). Este cambio es documental; no implementa B4 ni nuevas pruebas del juego.
