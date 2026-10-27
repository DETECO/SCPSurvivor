# Mapas BIO C1-r2 — adaptación fiel al arte aprobado

26/10/2026 · NIVELES · **diseños visuales aprobados; implementación local; publicación y teléfono físico pendientes**.

Iván corrigió la primera adaptación: «continua, pero adapta los lvl tal cual me los presentaste ?. puedes replicarlos tal cual ....». Se sustituye el dibujo simplificado de cubos C1-r1 por arte derivado directamente de las cinco láminas C1 elegidas. [Aprobación y alcance](NIVELES_BIO_C1_APROBACION.md) · [Pauta vigente](PAUTA_CREACION_ESCENARIOS.md).

[Ver los cinco resultados y abrir las pruebas](../design-proposals/niveles/anomalias-compactas-c1-20261026/VISTA_IMPLEMENTADA.html) · [Diff de r1 a r2](../design-proposals/niveles/anomalias-compactas-c1-20261026/FIDELIDAD_R2.diff) · [Recursos y hashes](../assets/levels/bio-c1/MANIFEST.json).

**Aprobación visual posterior, 26/10/2026:** «aprobados, muy buen diseño.». [NIV-BIO-C1-APR-003: cinco C1-r2 y recursos exactos](NIVELES_BIO_C1_R2_APROBACION.md). Las verificaciones técnicas que siguen conservan su fecha y alcance.

## Qué se conserva de las imágenes

- **Cultivo invadido:** jardineras oblicuas, bancales, raíces y hongos, puestos de servicio, pilares, paredes y luz dorada.
- **Galería del fluido:** tanques murales, instrumental, consolas, equipos, bancos de laboratorio, suelo gris y luz cian/violeta.
- **Cámara de anclajes:** bases metálicas, pantallas industriales, mobiliario y equipo de mantenimiento, pilares, crecimiento tendinoso periférico y hormigón cálido.
- **Patio de contención:** defensas escalonadas, cajas, barriles, jaulas de equipo, señalización amarilla, espinas decorativas y paredes iluminadas.
- **Núcleo de cuarentena:** islas de mamparas, biombos, camas y equipos, pilares, membranas/cistos periféricos y luces cálidas.

Las cinco versiones de producción se obtuvieron con **imagegen**, usando cada original como entrada y solicitando retirar exclusivamente al guardia y a la anomalía móvil. Los originales aceptados permanecen intactos. En BIO-03 se retiró también la red central de la criatura, conservando sus estaciones metálicas; los crecimientos ambientales periféricos continúan como atrezo. Los recintos no incorporan nuevas anomalías enemigas.

La edición rellena las zonas que antes ocupaban los personajes; esas regiones reconstruidas no son una copia literal píxel por píxel. La arquitectura, distribución y lenguaje visual se mantienen como referencia directa. El título de presentación se excluye al dibujar en el juego. El guardia, la BIO y el apoyo son entidades animadas del juego, con sus recursos aprobados.

## Profundidad, colisiones y animación

El arte se dibuja con una escala uniforme de 0,625: marco visual de 960×640 unidades, dentro del fixture nominal 32×24 casillas. Se mantienen cámara vertical 512, radios y escalas de entidades. Se trazan **polígonos de apoyo sobre el suelo** para los objetos; la altura pintada no se convierte en una caja invisible completa.

Las superficies elevadas se vuelven a dibujar mediante máscaras en franjas estrechas, ordenadas según la base de cada tramo. Así una pared oblicua puede quedar delante o detrás del personaje según su posición. La capa que lo oculte se atenúa. Las sombras de contacto y las luces detalladas de las láminas se conservan; encima se añaden halos suaves y partículas animadas por ambiente, sin tapar las señales de los ataques.

El mismo contorno físico sirve para cuerpos y consulta de proyectiles. La navegación consulta las zonas transitables con radio de jugador. En persecución la BIO usa el navegador existente; saltos, embestidas, conos y zonas mantienen sus reglas aprobadas. Una pared no garantiza protección frente a todos los ataques de área.

La pausa congela el reloj ambiental. «Menos destellos» deja ocho partículas estáticas y atenúa el pulso luminoso, frente a un máximo de 32 partículas normales. El dibujo no cambia la geometría, el estado del combate ni el azar.

Se espera a que carguen tanto la BIO como el escenario antes de comenzar el combate. Un fallo de imagen vuelve al origen conservado, con aviso y sin premio; no deja al jugador luchando sobre un mapa invisible.

## Código y alcance

- [rift-room-art.js](../js/world/rift-room-art.js): arte por BIO, contornos, máscaras, carga, colisión y efectos ambientales.
- [rift-rooms.js](../js/world/rift-rooms.js): conserva la API de las sesiones y de los tests.
- [world.js](../js/world/world.js): delegación a contornos solamente cuando el fixture contiene `riftArt`. El resto de escenarios sigue usando el sistema anterior.
- [rift-expedition.js](../js/systems/rift-expedition.js): carga del ambiente, capas de dibujo y espera de entrada; retorno y origen suspendido se conservan.
- [rift-anomalies.js](../js/systems/rift-anomalies.js): navegador existente durante persecución, sin redirigir ataques comprometidos.
- `dev.html` carga el nuevo módulo; `index.html` y `js/app.min.js` se regeneran desde las fuentes.

No cambian M01, los cinco atlas BIO 16/32, seis estilos de grieta, probabilidades, transición 0,5 s, retirada única 90–95 s, recompensas o acompañantes. Se conserva el portal temporal de retorno en una zona central libre para respetar la retirada de cinco segundos; la puerta inferior pintada pertenece al ambiente. No se crea otra mecánica de salida por la ilustración.

La línea base publicada se consulta en [PROGRAMACION/Juanillo, LOT-EST-005-r2](gestion/informes/LOT-EST-005-r2-juanillo.md). Este informe acredita la modificación local C1-r2 y no una publicación posterior.

## Evidencia ejecutada

- [Pruebas pertinentes](../tests/artifacts/rift-rooms-c1/unit-tests.txt): **40/40 aprobadas**. Los cinco recintos tienen entrada, apoyo, BIO y retorno libres; geometría conectada para radio 12; desplazamiento y colisión; director, sesión, ataques, poderes, apoyo y conservación de objetos del origen.
- La malla de verificación usa pasos de ocho unidades, consulta los contornos reales y evita cortar esquinas. Recorrido máximo al portal central a velocidad 165: **3,25 / 3,14 / 3,10 / 3,38 / 3,18 segundos**, respectivamente BIO-01…05. Es una medida geométrica sin enemigos; no acredita la facilidad de esquivar bajo presión.
- [Regresión de World/M01](../tests/artifacts/rift-rooms-c1/world-regression.txt): **21/21 aprobadas**, incluidas las dos de navegación también presentes en el conjunto anterior. Comprueba sectores, props, R7, M01 240×160 y su cámara. No se suman esas dos como pruebas únicas adicionales.
- [Navegador real](../tests/artifacts/rift-rooms-c1/browser.json): **10/10 combinaciones BIO×16/32**, con `index.html`/`dev.html`, Edge sin interfaz, escritorio 1280×900 y móvil emulado 390×844. Entrada, carga, spawns, estructuras, disparo enemigo detenido, movimiento ambiental, modo calmado, pausa, tres ataques, elección del poder y retorno conservando referencias y estado del origen.
- Diez comprobaciones adicionales de persecución alrededor de una estructura. **Cinco retiradas reales** durante su ventana, sin premio. **Un fallo de carga de escenario** provocado en QA vuelve correctamente al origen sin recompensa.
- Capturas de las cinco salas revisadas visualmente. Ninguna excepción de página ni aviso de consola en los diez casos finales. PNG de producción 1536×1024 y hashes de las cinco referencias comprobados.
- Build generado y comprobación de orden/sintaxis ejecutada; el recibo con hashes de las fuentes/bundle se conserva junto a los resultados.

La QA fuerza posición, tiempo, invulnerabilidad y daño para recorrer los estados, y resistencia del jefe para alcanzar la retirada. No acredita una partida natural, equilibrio final, rendimiento en un teléfono físico ni servicios/cuentas ajenos a esta entrega. [Script reproducible de navegador](../tests/rift-rooms-c1-browser.cjs).

## Decisiones pendientes e historial

**CON-NIV-08** queda visible en la pauta para consolidación en ESTRUCTURA. PROGRAMACION dispone de esta evidencia para revisión y publicación. La revisión visual de las cinco C1-r2 queda aceptada mediante APR-003. Siguen pendientes la comprobación jugable en teléfono físico y los demás límites técnicos indicados. No se han enviado mensajes a otros hilos ni se ha publicado por este encargo.

Estas son cinco composiciones fijas fieles a C1. La producción procedural de variantes queda pendiente; no se promete permutar muebles sobre una imagen estática sin producir sus módulos correspondientes.

[Historial de r1 y pauta R7.7](historial-niveles/BIO-C1-r1-antes-fidelidad-20261026/) · [Estado anterior a las cinco aprobaciones](historial-niveles/BIO-C1-antes-implementacion-20261026/).
