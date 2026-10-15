# P04-local-01 · alfa 0.4

14 de octubre de 2026. Fase autorizada por el director al pedir avanzar después de P03/0.3.2. Juego web local: no configura servicios, cuentas, facturación ni publicación. El roadmap canónico conserva su versión anterior hasta que el director solicite guardarlo.

## Resultado y aceptación

| Tarea | Comportamiento implementado | Evidencia |
| --- | --- | --- |
| P04-T01 | Guardia: Sprint +60% de velocidad base durante 2 s, espera 20 s. Médico: cura 30% de vida máxima, espera 30 s; vida completa no consume habilidad. Estadísticas base iguales y habilidades separadas de los relojes de armas. | p04-abilities.test.js y P04-validation.json |
| P04-T02 | Pistola, subfusil y escopeta según los valores aprobados. Dos copias, incluido mismo modelo; cargadores, recargas, mods y niveles independientes. Cambio 0,2 s y espera compartida del último disparo. Recarga inactiva, reserva infinita. | p04-weapons.test.js y navegador |
| P04-T03 | Seis mods, dos por copia, compatibilidad y sin duplicados. Edición en menú/preparación, confirmación y vista de efectos calculados. Cambiar capacidad no rellena; cambiar duración conserva porcentaje de recarga. Paredes siempre detienen perforación. | p04-stats.test.js, p04-weapons.test.js, p04-collisions.test.js y editor en navegador |
| P04-T04 | Amenaza cercana, jefe y cercanía; retención hasta mejora de distancia del 20% o prioridad superior. Línea de visión, orientación cuerpo/arma separada y capas delante/detrás. Destructibles como alternativa sin enemigo válido. | Armas, colisiones, props y movimiento lateral en navegador |
| P04-T05 | Fórmulas aditivas desde base, diez categorías permanentes como entrada de cálculo y ocho mejoras temporales. Topes conjuntos, fracciones, cartas parciales y por copia. Fin de expedición elimina efectos y niveles temporales después del resultado. | Estadísticas, regresión de niveles y cierre de partida en navegador |

La selección de equipo facilita pruebas locales. No crea propiedad persistente, soldados desbloqueados por cuenta ni economía de reclutamiento. Obtener, almacenar y equipar objetos reales se conectará en P06/P07. El soldado conserva velocidad base 165 unidades/s, por la instrucción posterior del director.

## Reutilización

Continúan Canvas 2D, JavaScript y los módulos World, Path, Player, EnemyMgr, Projectiles, Combat, Pickups, FX, Sprites y Game. Se añaden FieldCatalog, FieldStats, FieldAbilities y FieldLoadout; evolucionan FieldCombat, FieldUpgrades, Expedition y TechnicalUI. No se añade motor, framework ni dependencia. Los datos y fórmulas tienen una fuente común para cálculo y presentación.

Solo los proyectiles etiquetados como armas de campo utilizan impactos barridos ordenados por entrada en cada círculo. Los ataques heredados conservan su ruta anterior. Una bala no vuelve a dañar al mismo objetivo; los seis perdigones son independientes. Las cajas propias de vida 34/radio 12 reutilizan colisión, chunks y destrucción; su destrucción no concede botín. El mapa sitúa estas cajas en esquinas libres, fuera de accesos y puntos de aparición.

El cuerpo sigue el desplazamiento y el arma sigue el objetivo. El fogonazo utiliza la boca dibujada; el proyectil nace cerca de los pies, sin atravesar paredes por un desplazamiento visual. Los SVG del médico son una variación de los recursos geométricos propios del guardia; no representan el arte final. Se conserva la procedencia en los avisos existentes.

## Niveles y preparación

Se mantiene la instrucción más reciente: un nivel abre una sola elección inmediatamente durante combate; una carta continúa sin confirmar Listo. La XP sobrante se procesa después, con su bonificación fijada al recogerla. Pausa y levelup congelan movimiento, enemigos, proyectiles, regeneración y relojes.

Si todas las mejoras están al máximo y no hay curación elegible, D-214 conserva una única elección pendiente sin bloquear preparación; no concede otro nivel sin resolverla. Una lesión vuelve a ofrecer curación. Se prueba este caso en el director.

El descanso ordinario dura 20 s y permite confirmar mods sin detener su cuenta atrás. Conservamos el comportamiento de 0.3.2: si la recogida al cerrar una oleada abre una elección, resolver la última continúa automáticamente. Esto puede saltar el resto de ese descanso. La edición sin confirmar se descarta al cambiar de fase; Espacio tampoco activa habilidades dentro del editor.

## Verificación y límites

- Node: módulos P04 de estadísticas, habilidades, armas, colisiones y props; regresiones de P02 y P03. Incluye daño, orden de impactos, perforación, independencia de copias, capacidad sin relleno, topes, generación y rutas con semillas 0–127.
- Navegador: fuente y compilado, escritorio y táctil emulado. Selección real de equipo, habilidades, teclado/botones de arma, áreas mínimas 48×48, editor con cuenta atrás, congelación por pausa, orientación y conservación entre sectores. Cierre elimina datos temporales.
- Niveles: ambos HTML conservan una elección inmediata por nivel, bonificación de XP una sola vez, protección contra doble clic/tecla sostenida y teclado numérico.
- Integración: dos recorridos completos de semilla 1337 hasta extracción en sector 10 y 27 oleadas normales. Fuente: 1 jefe evadido, 1.128 bajas. Compilado: 1 jefe vencido, 1.135 bajas. Reinicio y muerte también comprobados.
- Revisión estática por subagentes Luna, supervisada por el agente principal; no equivale a ejecución. Se corrigieron coeficientes temporales, doble aplicación de Empuñadura, identificación de copias, vista parcial de cartas, capas/fogonazo y bloqueo de habilidad durante edición. No quedan hallazgos importantes identificados en esta revisión.

Los recorridos completos preceden a los últimos ajustes de bloqueo de Espacio en editor y colocación del efecto contra pared; esos ajustes tienen comprobación focalizada en el compilado final y las colisiones. No se afirma repetir recorridos completos después de esos ajustes.

Entorno: Chromium/Linux, Node 24.19.0, npm 11.9.0 y Terser 5.51.2. El autoplay usa módulos de producción y paso fijo, con reloj virtual de caché coherente, sin elevar artificialmente vida/daño en los recorridos ganadores. Las comprobaciones aisladas de estado, muerte y fronteras de XP incluyen inyecciones controladas, identificadas en los tests.

No se han probado Safari ni iPhone/Infinix físicos, ni medido FPS sostenidos, memoria o carga de servidores. El equilibrio y el arte definitivo siguen pendientes. No se ha subido el paquete a GitHub ni publicado el juego. La siguiente fase del plan es P05: cuentas, autoridad de servidor y continuidad; su configuración externa necesita autorización propia.

Evidencias: [navegador P04](P04-validation.json), [niveles](P04-level-validation.json), [integración](P04-integration-validation.json) y [cambios de fuentes](P04-source-delta.json). Los comandos para repetir las comprobaciones figuran en README.md.
