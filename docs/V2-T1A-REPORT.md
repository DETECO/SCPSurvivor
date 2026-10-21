# T1A — prueba jugable del modo infinito

**Publicación comprobada:** runtime `4ab58d4`; GitHub Pages sirvió índice, compilado y roadmap coincidentes. Seis recorridos online (escritorio/táctil emulado × inicio por defecto/jefe/élite) aprobados, sin errores ni servicios externos. [Recibo](V2-T1A-PUBLICACION.json). Sigue pendiente la prueba de Iván y un teléfono físico.

21/10/2026 · Roadmap 0.29 · A-039 / D-335 / EV-044.

Implementada y verificada automáticamente como **prototipo parcial**, pendiente de aceptación de Iván. No equivale a completar B4 ni todo el diseño infinito. La publicación se comprueba mediante el recibo `V2-T1A-PUBLICACION.json` cuando esté disponible.

## Probar ahora

- [Élite cerca del inicio](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=elite): empieza en 0:00 con una sola arma. Sigue el indicador del élite y derrótalo.
- [Jefe desde 4:30](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=jefe): el jefe empieza vivo; no se regala el premio por abrir el enlace.
- [Mapa completo](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2): jefe a 4:00 y puerta a 5:00, valores de ensayo.

Elige tu primera arma y comienza. Muévete con WASD/flechas o joystick táctil; el disparo es automático. Tras vencer al élite/jefe, permanece 3,5 segundos junto a su cofre. Elige entre las tres armas con la acción detenida. Puedes llevar dos pistolas: son copias independientes. Ambas disparan sin alternar Q/E. Si ya llevas dos, el cofre mejora una rama de una equipada; nunca añade una tercera. El premio y la XP pendientes se resuelven antes de cruzar la puerta.

Al subir de nivel hay hasta tres opciones: arma, general y una libre válida; categorías agotadas se rellenan. La primera arma conserva sus ramas al adquirir la segunda. Si todo está al máximo quedan apoyos tácticos finitos, sin moneda real.

## Cambios del código

- `field-combat.js`: admite una o dos copias en T1A, disparo/objetivo/cadencia/munición/recarga por copia, adquisición validada y snapshots de ramas independientes.
- `infinite-progression.js`, `field-stats.js`, `field-upgrades.js`: cuatro ramas 0–5 más extra, generales 5+extra, cartas revalidadas por ID/modelo/rango y apoyo táctico de 15 segundos activos.
- `armament-rewards.js`, `exploration-chests.js`: elección pausada y entrega única por evento; mejora si ambas ranuras están ocupadas. Revalidación al confirmar.
- `expedition.js`, `map-trial.js`, `field-abilities.js`, `game.js`: élite vivo de práctica, pausa de elección, premios/XP antes de puerta, aliados sin XP ni remate de jefe, huida única y corte de regeneración/cooldowns a 300 segundos. Las duraciones activas y las recargas de armas continúan después del corte.
- Interfaz: una selección inicial, segunda ranura vacía, elección de armamento e indicadores para ambas armas. Conserva el crédito «Desarrollado por Ivan Vivanco» y los recursos existentes.

Modo anterior conservado con `?prueba=mapa-v2`; la práctica antigua de grieta sigue en `?prueba=mapa-v2&premios=grieta`. La entrada pública sin consulta abre T1A. Se conserva también el alias histórico público `?premios=grieta` para B3. T1A no activa la grieta separada futura.

## Fichas de ensayo

Solo se utilizan las tres balísticas ya existentes. Daño de escopeta por perdigón, no por disparo completo. No se han añadido ni reinterpretado armas melee/energía como balísticas.

| Modelo | Daño | Intervalo | Cargador | Recarga | Alcance | Perdigones |
| --- | --- | --- | --- | --- | --- | --- |
| Pistola | 10 | 0,50 s | 12 | 1,50 s | 320 | 1 |
| Subfusil | 6 | 0,15 s | 24 | 1,80 s | 280 | 1 |
| Escopeta | 6 | 0,90 s | 6 | 2,20 s | 180 | 6 |

| Rama por copia | Cada rango 1–5 | Extra tras rango 5 |
| --- | --- | --- |
| Potencia | +8% daño base de rama | +20% adicional |
| Ritmo | −4% intervalo | −8% adicional |
| Manejo | −5% recarga y −3% dispersión | −10% recarga y −5% dispersión adicionales |
| Especialización | +3% alcance | +10% adicional y +1 perforación |

Bonificaciones de rama se suman dentro de la rama; luego se aplican a las estadísticas generales. Intervalo y recarga nunca bajan del 25% de la base del modelo. El extra se representa internamente con 6, pero no es un sexto nivel permanente de ultimate.

Generales: vida +20 por rango y +40 extra; protección +6 puntos y +12 extra; potencia +10% y +20% extra; cadencia −8% y −12% extra; movilidad +7% y +10% extra; recolección +20% y +50% extra; aprendizaje +12% y +30% extra; regeneración +0,6 vida/s y +1,5 extra. Se conservan topes globales: protección 70%, movilidad general +50%, cadencia general 60%, regeneración temporal 4,5 vida/s, recolección +150%, aprendizaje +120%, potencia temporal +100% y vida temporal +200. La habilidad Sprint provisional conserva su efecto adicional.

Apoyos de saturación: potencia +25% daño, movilidad +15 puntos porcentuales o protección +15 puntos, estos dos sujetos a sus topes. Duran 15 segundos activos, se sustituyen y no se acumulan. Un cofre de armamento saturado concede potencia táctica; no concede tickets/cuenta. Parámetros de ensayo, no balance final ni economía aprobada.

## Verificación realizada

[Resultados estructurados y hashes](V2-T1A-VALIDACION.json).

- Fuente: 32 archivos de pruebas Node, 185 casos aprobados, cero fallos y uno omitido por requerir emuladores reales.
- Copia de publicación: 32 archivos, 184 aprobados, cero fallos y dos omitidos: emuladores reales y manejador Functions sin dependencias instaladas en esa copia.
- Los tests `p05-worker*` de preparación no publicada se excluyeron; no hay modificación ni despliegue de backend en esta entrega.
- Build y comprobación de 90 scripts aprobados en ambas copias. Se conservaron sus diferencias de configuración/CSP; no se copió la preparación Worker.
- Navegador T1A: fuente y compilado × escritorio y táctil emulado × inicio normal/jefe/élite: doce recorridos por copia. Elección real de carta de nivel y segunda arma, conservación de ramas, pausa de elección, entrega única, dos modelos iguales y daño real de proyectiles de ambas copias.
- Regresión B3: doce recorridos por copia, con jefe/grieta/cierre sin premio. Sin errores JavaScript/HTTP ni intentos de servicios externos en los recorridos comprobados.
- Capturas de elección y HUD táctil revisadas. El ensayo usa posición, invulnerabilidad, daño letal al encuentro, XP y tiempo controlados. No demuestra dificultad de una partida natural, balance, rendimiento ni funcionamiento en teléfono físico.

## Pendientes

La pauta manual de Iván sigue pendiente en [PRUEBA_V2_INFINITO_01.md](PRUEBA_V2_INFINITO_01.md). Ajustar T1B y fichas con su prueba; faltan terminales de reemplazo, familias adicionales, fusión/receta/herencia, nuevas topologías, grieta separada y poderes, pasiva/ultimate definitiva, radar, monedas/tienda/gachas y reanudación exacta. La habilidad anterior del soldado sigue provisional hasta T4; no es una ultimate nueva.

Diseño visual definitivo puede prepararse en paralelo: no se sustituyó arte aprobado ni se añadieron diseños nuevos. Guardado/cuentas/economía reales permanecen desactivados; Firebase Spark sin facturación. Ningún resultado automático marca aceptado el juego ni concede puntos a las 53 tareas históricas (52/100); avance V2 sin calcular.

Respaldo previo local: `development-backups/t1a-20261021-antes.zip`, con manifiesto separado en `migration-audit/t1a-before.json`. Fuentes Cloud, ZIP originales y `sources/` no modificados.
