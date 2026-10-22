# Personajes del hilo PERSONAJES

22/10/2026 · Roadmap 0.32 · Integración de recursos existentes, sin regenerar ni editar PNG.

## Jugar

- [32×32, opción inicial](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=32).
- [16×16](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=16).
- [Apoyos, partida desde 4:30](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&rapida=1&graficos=32): la puerta y los dos apoyos siguen apareciendo a 5:00, según el recorrido existente.
- [Personajes y animaciones](https://deteco.github.io/SCPSurvivor/assets/personajes-20261022/index.html): visor de referencia; sus seis armas ilustradas no habilitan nuevas armas en el combate.

El selector «Gráficos de personajes» del menú cambia resolución y recarga la demo conservando el modo de práctica. Ambas resoluciones tienen el mismo tamaño aparente y la misma física; no se cambia la resolución del mapa/cámara. Se conservan `graficos=v1` para el arte SVG anterior y `graficos=clasicos`. La configuración se representa en la URL; no depende de cuentas ni guardado real.

## Archivos incorporados

Paquete `design-proposals/personajes-pixel-16-32-20261022`, del hilo `01a160be-4bf0-7883-b313-604e7ce76652`: Guardia, Médico, Apoyo amarillo de contención, Perseguidor, Biológico y Custodio. Se copiaron 68 PNG idénticos al paquete: cinco hojas por actor/modo, piezas de los tres humanos y dos hojas de armas de referencia. Se añade además la imagen COMPARACION.png del mismo paquete, sin edición. Metadatos en `assets/personajes-20261022/catalogo.json` y hashes en `procedencia.json`. Las fuentes de alta resolución y originales del paquete siguen conservadas fuera de la copia ejecutable, sin modificación. No se incorporan rutas privadas del generador al runtime.

Cada actor/modo dispone de Idle(1), Walk(4), Attack(4), Hurt(2) y Neutralized(2), con ocho direcciones. Son 104 celdas por actor, con reutilización de poses. No se afirma que todas sean dibujos únicos ni arte limpiado manualmente. El modo16 tiene su propia fuente/exportación, no se obtiene reduciendo el32 durante el juego.

Los humanos separan torso, piernas, brazos/manos y arma. Las piernas siguen el movimiento; las armas usan sus objetivos por copia y ángulo continuo. Se conservan las cuatro armas jugables existentes: pistola, subfusil, escopeta y porra. Katana, láser y lanzamisiles permanecen como ilustraciones del visor, sin mecánicas habilitadas. El ataque humano se representa mediante arma y brazos; los enemigos usan sus estados de animación existentes. No se fija una pistola al cuerpo.

Los dos apoyos reciben `support01` y el aspecto amarillo con máscara de gas. No son una nueva clase seleccionable. Su llegada, retirada de uno ante jefe visible, daño, límites de remate, rutas y ausencia de XP por sus bajas se conservan. El apoyo no cambia una puerta normal por una dimensión nueva.

Se conserva geometría física y se separa tamaño fuente PNG de marcos lógicos de animación. Faint referencia Neutralized; Charge/Shoot mantienen fallback. Si falla una hoja nativa, se intenta el SVG original con su geometría y extensión originales. Si no están listas las piezas, se usa el atlas completo disponible y el dibujo anterior de arma; no se bloquea el inicio.

## Alcance de la lectura y aprobaciones

**Aprobación posterior de Iván, 22/10/2026:** «ME GUSTAN LOS PERSONAJES QUE HICISTE, LOS APRUEBO. PARA IMPLEMENTAR.». Los seis diseños y sus variantes 16/32 quedan aprobados para implementación. [Registro y alcance](PERSONAJES_APROBACION_2026-10-22.md). Esta decisión sustituye la aceptación visual pendiente de estos recursos; la revisión de la partida integrada y las comprobaciones técnicas conservan su propio alcance. Los párrafos y recibos siguientes documentan la situación anterior a esta aprobación.

Se localizaron el hilo PERSONAJES y sus archivos. `read_thread` rechazó incluso un turno por tamaño; se consultaron los mensajes humanos accesibles en su registro local y la documentación/metadatos de ambas entregas del22/10. ESTRUCTURA se contrastó con tres turnos recientes y sus reglas locales. Es una lectura verificable parcial, no una exportación completa de conversaciones.

La petición «implementa los personajes» autoriza incorporar estos recursos al ensayo; no equivale a aprobación artística final de todos los recortes o de un catálogo24+24. La propuesta detallada de `personajes-v2-20261022` permanece como referencia: no se anuncia un tercer modo raster completo cuando sus animaciones no tienen el mismo contrato. Se conserva toda la capa visual previa y los originales Cloud/ZIP/`sources/`.

## Comprobación

Build/check aprobados en ambas copias con 98 scripts. Suite Node: 222 casos por copia; fuente 221 aprobados/1 omitido, publicación 220 aprobados/2 omitidos, cero fallos. Las omisiones corresponden a emuladores reales y, en publicación, al manejador Functions sin sus dependencias; no se probaron servicios reales. Navegador local por copia: ocho recorridos nativos (624 recortes por recorrido, seis actores y dos apoyos), cuatro de combate ampliado con cinco prácticas, cuatro V1 y cuatro por ensayo T1A/B3 con tres prácticas cada uno. Se inspeccionaron capturas nativas en escritorio y vista móvil. Los resultados y hashes se conservan en `PERSONAJES_VALIDACION.json`; la publicación se verifica por separado. Los recorridos visuales usan posiciones/tiempo/objetivos controlados y no acreditan balance, rendimiento, teléfono físico o arte definitivo. Servicios reales, economía y facturación siguen desactivados. Fusión, poderes y ultimate no se implementan en esta operación.

Revisión: root comparó MapTrial con el respaldo y confirmó cambios únicamente de identificación/dibujo de los apoyos. Luna revisó metadatos, recortes y fallback; root implementó finalmente el módulo de brazos/armas y sus pruebas tras recuperar esa tarea. Las reglas de daño, XP, llegada y huida no cambiaron.

Publicación verificada en main/Pages: cuatro recorridos nativos públicos (16/32, escritorio/móvil simulado), dos de combate con cinco prácticas y visor con doce variantes cargadas. Hashes del ejecutable, índice, roadmap y 68 PNG coinciden. El primer recorrido ampliado online registró ERR_NETWORK_IO_SUSPENDED de Chromium sin errores HTTP; se repitió diagnóstico de cinco prácticas y después la suite completa sin cambiar código ni filtrar errores: ambas pasaron. Recibo en `PERSONAJES_PUBLICACION.json`. Luna realizó además revisión estática final del módulo y su prueba, sin bloqueantes; no equivale a aprobación artística final.
