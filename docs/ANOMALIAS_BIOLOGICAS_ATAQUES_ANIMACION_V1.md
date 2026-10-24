# Anomalías biológicas — ataques y animación V1

23/10/2026 · PERSONAJES · Diseño V1 aprobado por Iván; sprites y animaciones raster V1 producidos en 16×16/32×32. Integración al juego pendiente.

## Aprobación y alcance

Iván aprueba la apariencia de las cinco anomalías con «ya, apruebo» y encarga diseñar ataques elaborados y animados, con carreras y saltos. Se conserva la lámina aceptada en [original aprobado](../../design-proposals/anomalias/biologicas-v2-20261023/01-conceptos-aprobados.png).

**Aprobación posterior de ataques, 23/10/2026:** Iván confirma «ya aprobados.» en PERSONAJES, hilo `01a160be-4bf0-7883-b313-604e7ce76652`, en respuesta al repertorio de 15 ataques y su storyboard. Quedan aprobados los tres ataques por criatura, sus movimientos, encadenamientos, señales, recuperación y pautas de animación V1. Las identidades y apariencias ya estaban aprobadas. Los tiempos orientativos y cantidades de poses se conservan como guía de producción y prueba; no equivalen a balance final ni a validación de evasión en el juego.

La lámina original y el storyboard siguen siendo conceptos ilustrados. **Producción posterior, por encargo directo de Iván («hazlos ahora»):** ya existen los sprites nativos y animaciones raster V1: cinco anomalías, dos tamaños, ocho direcciones, nueve secuencias por modelo y capas de efectos. [Entrega, visor y verificación](ANOMALIAS_SPRITES_V1_ENTREGA.md). PROGRAMACION integra y publica; la creación de recursos no acredita combate integrado.

## Reglas conservadas y referencias consultadas

- [Perfiles biológicos seleccionados](ANOMALIAS_GRIETAS_VERSION_2_BIOLOGICA.md): se mantienen sus ataques principales; los nuevos los complementan.
- [Dado de grietas 2.2](GRIETAS_DADO_POR_MINUTO_V2.md): D1–D5, pesos condicionales 50/32/8/7/3%; sin cambios del dado de apertura, cupos, duración de entrada, premios o retirada.
- [Compañero](COMPANERO_CONTENCION_GRIETAS.md): no se alteran sus tasas, incapacitación ni prohibición de rematar al jefe.
- Hilo ESTRUCTURA `01a1457c-c051-73d2-9864-e7deb6435420`, tres turnos recientes consultados el 23/10, hasta `01a169fd-446f-7701-b6bd-25c456f15599`: especialidad diseña, ESTRUCTURA consolida, PROGRAMACION integra/publica. No se declara lectura completa del historial.
- [Corte previo de reglas](ESTRUCTURA_SYNC_2026-10-23.md).

No se asignan clases SCP oficiales: BIO-01–05 son identificadores originales del juego. D1–D5 indican peligrosidad del encuentro.

## Lenguaje de animación común

Cada ataque tiene **anticipación → compromiso → ejecución → recuperación**. Durante la anticipación se muestra la futura zona dañina; en el compromiso se fija dirección o destino; después no sigue al jugador. La recuperación deja una oportunidad visible de contraataque.

El jugador puede esquivar caminando/corriendo con su movimiento existente: nunca exigir salto, bloqueo, dash o arma concreta. El salto de una criatura no otorga invulnerabilidad automática. Su sombra y marca de aterrizaje permanecen visibles. La altura dibujada y el punto de contacto con el suelo se manejan por separado.

Direcciones propuestas: ocho orientaciones de cuerpo y apuntado libre de proyectiles, conos y trayectorias. La pose, la boca, las espinas y el origen del efecto deben coincidir con el ataque en las ocho direcciones. Para seres asimétricos, dibujar las vistas correspondientes; no espejar indiscriminadamente las placas o el lóbulo grande.

Los efectos se dibujan en capas separadas: preparación bajo la criatura, cuerpo, proyectil/filamento/nube e impacto. La hitbox dañina cabe dentro de la zona visible; ningún brillo decorativo añade daño. Las señales combinan forma, contorno y pulsos, sin depender solo del color.

Para 16×16 y 32×32 se mantienen tiempos, desplazamientos y zonas de daño idénticos. Cambia la cantidad de detalle. Un personaje cabe en su celda de cuerpo; espinas extendidas, estelas y efectos pueden ocupar capas externas con origen coherente. No encoger silenciosamente al jefe para confundir resolución de textura con tamaño físico.

## BIO-01 — Esporario Blanco · D1 · 50%

**Movimiento:** se desancla y avanza con pasos cortos de raíces; los tres sacos se balancean con retraso. Permanece bajo y compacto. No tiene carrera humana.

| Ataque | Secuencia de movimiento y efecto | Lectura y evasión |
|---|---|---|
| E1. Abanico de esporas | Los sacos se inclinan al objetivo, se hinchan por turnos y expulsan tres pulsos de nube dentro del mismo cono. Se desinflan y quedan caídos. | El cono completo aparece antes del primer pulso y conserva dirección. Salir por cualquiera de sus lados; las nubes se disipan sin perseguir. |
| E2. Brinco de raíz | Retrae raíces, comprime los sacos y se impulsa en un salto corto hacia un punto señalado. Aterriza aplastándose y expulsa un pequeño anillo local de polvo. Luego vuelve a erguirse. | Marca circular y sombra visible. Salir del círculo antes de aterrizar. El polvo fuera de ese círculo es decorativo. |
| E3. Latigazo rasante | Un haz de raíces se recoge detrás del cuerpo y barre un sector corto del suelo; las raíces se arrastran de vuelta al núcleo. | Sector anunciado, sin giro posterior. Apartarse del sector o alejarse del alcance. No es un barrido de 360°. |

**Ritmo D1:** un ataque cada vez, recuperación completa entre ataques; sin encadenamientos. Tres animaciones le dan personalidad sin convertirlo en el encuentro más difícil.

**Poses clave E2:** reposo → raíces recogidas → compresión → impulso → vuelo con sombra → contacto aplanado → rebote pequeño → reposo.

## BIO-02 — Larva de Vidrio · D2 · 32%

**Movimiento:** onda de contracción desde cola a cabeza; las patas se alternan. Al acelerar, la onda se estrecha y los órganos internos se desplazan con retraso.

| Ataque | Secuencia de movimiento y efecto | Lectura y evasión |
|---|---|---|
| L1. Cápsula de fluido | Se arquea, el fluido luminoso avanza por el abdomen y la boca dispara una cápsula en arco. Impacta en el punto anunciado, se rompe y deja un charco. El cuerpo se relaja después del esfuerzo. | Destino fijado al escupir; marca hasta impacto y borde visible mientras el charco daña. Nunca corregir el vuelo para alcanzar al jugador. |
| L2. Salto de resorte | Se enrolla como un muelle y salta hacia un punto marcado. Se estira durante el vuelo, cae con la cabeza adelantada y recoge la cola. | Círculo de llegada anunciado; sombra separada del cuerpo. Salir de la zona marcada. El salto no daña un corredor invisible durante el vuelo. |
| L3. Carrera de cuchillas | Placas del lomo se levantan, patas aceleran y corre en una línea corta. Frena arrastrando la cola y repliega las placas. | Corredor visible antes de arrancar. Esquivar lateralmente; no gira durante la carrera ni deja fragmentos dañinos no anunciados. |

**Ritmo D2:** puede usar L1 para crear presión de suelo y luego L3, pero debe volver a anunciar el corredor y elegir una línea que deje una salida libre. No correr y saltar simultáneamente.

**Poses clave L2:** avance → enrollado parcial → muelle comprimido → despegue → cuerpo extendido → contacto cabeza/patas → cola recogida → recuperación.

## BIO-03 — Malla Tendinosa · D3 · 8%

**Movimiento:** suelta un anclaje, contrae un tendón y arrastra el núcleo hasta volver a fijarse. El orden de las contracciones permite entender qué extremo se moverá.

| Ataque | Secuencia de movimiento y efecto | Lectura y evasión |
|---|---|---|
| M1. Líneas de tensión | Despliega nodos, forma líneas flojas, ilumina su orden y las tensa por turnos. Cada línea vibra al cortar y después vuelve a quedar floja. | Líneas previas visibles, con una abertura transitable durante cada corte. No activar toda la red a la vez. |
| M2. Salto de anclaje | Recoge tres extremos, tensa los otros y catapulta el núcleo a un punto marcado. Los tendones lo siguen como cintas flojas; vuelve a anclarse al tocar suelo. | Marcar llegada. Los tendones de traslado son decorativos; la contracción no barre a ciegas el recinto. |
| M3. Tijera orgánica | Dos brazos de tendón se abren dibujando una V, se contraen hacia dos trazos de corte y vuelven a abrirse. | Ambos trazos se muestran antes del cierre. Mantener un paso libre fuera de las líneas; no encerrar al jugador entre nodos y pared. |

**Ritmo D3:** M1 → descanso corto → M2 para reposicionarse → anuncio independiente de M3. Antes de decidir M3, comprobar las líneas y peligros que aún quedan activos.

**Poses clave M2:** red abierta → tres nodos recogidos → tendones de impulso tensos → núcleo elevado → tendones siguiendo el vuelo → llegada → nodos extendidos → red relajada.

## BIO-04 — Portador de Espinas · D4 · 7%

**Movimiento:** carrera pesada de seis poses clave, hombros alternos y placas retrasadas respecto al tronco. Se inclina al acelerar; frena con dos pasos amplios. El pie de apoyo se fija visualmente al suelo.

| Ataque | Secuencia de movimiento y efecto | Lectura y evasión |
|---|---|---|
| P1. Salva en abanico | Hombros retroceden, placas se abren como pétalos, espinas apuntan y salen en una salva. El tórax retrocede y las placas vuelven a cerrarse. | Arco de salida visible, con separación legible entre proyectiles. Espinas orientadas a su trayectoria; sin rotación hacia el jugador tras disparar. |
| P2. Embestida de hombro | Baja la cabeza, carga peso en una pierna, corre por el corredor señalado y frena clavando una mano. Espinas vibran al detenerse. | Corredor fijado al arrancar, sin curva ni giro instantáneo. Bloqueo con pared termina el avance; no atraviesa obstáculos. |
| P3. Salto de estaca | Flexiona ambas piernas, recoge el brazo largo, salta y golpea el suelo en el punto marcado. Abre placas en el impacto y tarda en liberar la mano. | Círculo de llegada y sector frontal de impacto señalados desde antes del salto. No genera una segunda onda fuera de lo anunciado. |

**Ritmo D4:** P1 → nueva preparación de P2 → frenada vulnerable. P3 es una alternativa de aproximación, no un tercer golpe obligatorio. Nunca encadenar sin mostrar la preparación del siguiente ataque.

**Poses clave P2:** erguido → hombro recogido → apoyo trasero → primer paso explosivo → carrera inclinada → paso de frenado → mano al suelo → regreso a guardia.

## BIO-05 — Huésped de Cuarentena · D5 · 3%

**Movimiento:** alterna masas de apoyo y arrastra la membrana; el lóbulo alto oscila con retraso. En vez de una carrera humana, avanza en una oleada pesada de contracciones.

| Ataque | Secuencia de movimiento y efecto | Lectura y evasión |
|---|---|---|
| H1. Brote de cuarentena | Ancla el cuerpo, las marcas de los lóbulos laten en orden y aparecen varias zonas numeradas en el suelo. Las zonas se contraen y brotan en el mismo orden. Cada brote termina antes de que su señal desaparezca. | Patrón completo previo, pulso destacado en la próxima zona activa y espacio libre continuo. No hacer aparecer una marca ya dañina bajo el jugador. |
| H2. Salto de masa | Toda la membrana se hunde, los lóbulos se comprimen y un impulso orgánico eleva el cuerpo. Aterriza extendiéndose dentro del área señalada y se recoge lentamente. | Área de impacto visible, sombra creciendo al descender. Sin teletransporte, salto fuera de cámara ni invulnerabilidad gratuita. |
| H3. Barrido de membrana | Retrae una lámina hacia un costado y la despliega por un sector amplio. La membrana llega al límite marcado y se repliega en pliegues. | Abanico claramente limitado, con un sector libre de salida. La retracción es recuperación sin daño adicional. |

**Ritmo D5:** H1 → H2 hacia una zona libre de los brotes que aún estén activos → recuperación → preparación de H3. Es el patrón más complejo, pero cada fase deja una ruta. Si la combinación no tiene salida, posponer el siguiente ataque hasta que se libere espacio.

**Poses clave H2:** cuerpo anclado → lóbulos hundidos → membrana tensada → impulso → vuelo con lóbulos reunidos → contacto expandido → repliegue → reposo pulsante.

## Pauta de producción de fotogramas

[Lámina de seis poses por criatura](../../design-proposals/anomalias/biologicas-v2-20261023/02-movimientos-storyboard-v1.png). Filas 1–5: E2, L2, M2, P2 y H2, respectivamente. Se lee de izquierda a derecha. Generada con imagegen integrado usando la apariencia aceptada como referencia; [prompt exacto](../../design-proposals/anomalias/biologicas-v2-20261023/PROMPT-ATAQUES-V1.txt). Revisión visual: cinco filas y seis poses diferenciadas por fila; identidades reconocibles y sombras de salto. Hay pequeñas variaciones de anatomía entre poses que deben corregirse al producir los sprites finales. No es un atlas recortable ni una animación reproducible.

Los siguientes números son una **propuesta de arte**, no estadísticas aceptadas ni velocidad final del combate.

| Secuencia por criatura | 16×16: poses únicas por dirección | 32×32: poses únicas por dirección |
|---|---:|---:|
| Reposo / respiración | 4 | 6 |
| Desplazamiento propio | 6 | 8 |
| Cada ataque terrestre | 8 | 12 |
| Cada ataque con salto | 10 | 14 |
| Recibir impacto | 2 | 3 |
| Derrota | 6 | 8 |

Para efectos simétricos se puede reutilizar orientación; para anatomía asimétrica se necesita revisión de cada vista. El storyboard muestra seis momentos explicativos del movimiento, no sustituye estas cantidades ni obliga a que cada momento dure lo mismo.

Propuesta inicial de reproducción: animación a 10–12 poses por segundo, conservando algunas poses de anticipación más tiempo. El motor puede renderizar a otra frecuencia. Repetir o mantener una pose nunca debe acelerar el ataque ni cambiar sus hitboxes.

Como punto de partida de revisión, anticipaciones de 0,8–1,2 s para salto/carrera y recuperación de 0,6–1,0 s. No trasladar esos valores directamente al juego: el recinto, alcance y velocidad reales deben demostrar una evasión posible antes de fijarlos. No se asignan aquí vida, daño, velocidad final, frecuencia de ataques o duración de charcos.

## Control de legibilidad y evasión antes de integrar

1. En ambos tamaños se reconoce reposo, anticipación, golpe y recuperación sin depender del color. Ver a escala nativa y ampliada sin suavizado.
2. Probar ocho orientaciones: la boca/raíz/espina coincide con el origen del ataque; diagonales sin posiciones imposibles.
3. Ver sombra y destino durante todo salto; la marca permanece hasta finalizar el impacto.
4. Probar cada ataque y cada combinación cerca de paredes y esquinas, también con charcos o filamentos activos. Debe quedar una ruta alcanzable desde la posición real del jugador con movimiento normal.
5. Separar fallo de geometría de decisión de ataque: si no hay una ruta posible, cancelar esa combinación y volver a una preparación nueva.
6. Pausa congela preparación, vuelo, proyectiles, zonas y recuperación. Reanudar no adelanta un impacto.
7. Una animación de recibir daño no borra el anuncio de ataque ni lo reinicia para duplicar impactos. La regla de interrupción efectiva debe fijarse en balance; el arte no concede aturdimiento.
8. Al morir, cancelar nuevos ataques, terminar hitboxes de la criatura y retirar señales/effects del encuentro conforme al contrato que defina PROGRAMACION. No conceder premios por una mera animación.

## Revisión interna

Se conservan las cinco identidades, sus ataques principales y la tabla 50/32/8/7/3. Se distinguen movimiento de cuerpo, efectos y daño. D1 no encadena; D2 combina de forma simple; D3–D5 suman lectura espacial con preparación visible. No se añaden requisitos de salto para el jugador, enemigos invocados, premios, cambios de compañero o clases SCP oficiales.

Producido V1: cuerpos nativos en 16×16 y 32×32, efectos, animaciones reproducibles y ocho direcciones por secuencia. Pendiente: limpieza artística adicional si se necesita, consolidación de ESTRUCTURA e integración/balance/pruebas de PROGRAMACION. No se entrega rig esquelético editable; se entregan atlas raster y metadatos. [Evidencia de producción](ANOMALIAS_SPRITES_V1_ENTREGA.md).
