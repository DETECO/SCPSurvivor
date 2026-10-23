# Ataques del arsenal · Color, forma y progresión visual · V1.1

22 de octubre de 2026. Aplicado al diseño de 90 armas y 63 compuestos; no al ejecutable.

## Qué se distingue

El pedido se refiere al ataque completo: bala, rayo, flecha/virote, golpe, estela e impacto. Antes se habían definido marcos de rareza, sin cerrar estos efectos por modelo. Esta revisión añade una ficha visual a cada arma y fusión.

| Información | Dónde se ve |
| --- | --- |
| Categoría/mecanismo | Forma y matiz principal del proyectil, golpe o efecto |
| Tier | Acento pequeño en punta, salida o impacto; marco y texto en la ficha |
| Nivel | Detalle y definición del mismo efecto; número 1–5 o MAX en interfaz |
| Fusión | Transformación visible de la receta, dos matices por fases y distintivo de eslabones |

La rareza no convierte una bala en láser ni multiplica daño. Una flecha conserva asta/punta; un misil conserva masa y escape; un golpe conserva su arco. Todos los efectos salen de la boca, punta o contacto de esa copia de arma y siguen su objetivo independiente.

## Colores de tier

| Tier | Color | Marca de apoyo |
| --- | --- | --- |
| Normal | gris plata #B8C0CC | círculo; brillo marfil breve |
| Raro | azul #60A5FA | rombo; muesca azul breve |
| Épico | violeta #C084FC | doble rombo; dos muescas violetas breves |
| Legendario | dorado #F4C76B | estrella; remate dorado breve |


El acento de tier ocupa como máximo 15% de la superficie del efecto cuando cabe sin deformarlo. En modo 16 puede ser un píxel puntual; en 32, dos. Si un proyectil pequeño no admite ese píxel, desplazar el acento al impacto final: seguirá siendo visible en el ataque completo. El marco y texto se conservan siempre en interfaz; no sustituyen al acento del ataque.

## Matices y formas por categoría

| Categoría | Matiz orientativo | Ataque reconocible |
| --- | --- | --- |
| Armas de fuego | champán #EBC67A | proyectil compacto y destello de boca |
| Armas arrojadizas | verde agua #7EC8AE | objeto físico y trayectoria corta legible |
| Armas cuerpo a cuerpo | marfil #DCE7F0 | arco de corte o frente de golpe |
| Armas incendiarias | naranja #F28C45 | calor con núcleo claro y borde naranja |
| Francotiradores | azul acero #90B7D4 | trazador fino y puntual, de aparición breve |
| Armas pesadas | bronce #B9937A | masa del proyectil e impacto anguloso |
| Armas rústicas | arena #C3AA7B | material opaco, polvo o roce contenido |
| Armas tecnológicas | cian #6AD3DF | línea o pulso geométrico controlado |
| Armas anómalas | lila #B79AE8 | eco o discontinuidad local contenida |


**El mecanismo prevalece sobre la categoría.** Una granada de Arrojadizas explota en champán; un cañón de riel de Pesadas usa cian; un remache de Rústicas es metálico; el guijarro anómalo sigue siendo piedra gris. El proyector criogénico usa azul hielo#B8E5FA. Los 90 modelos tienen su asignación específica en el catálogo.

## Nivel

| Nivel | Cambio visual |
| --- | --- |
| 1 | Forma y matiz base, sin aura ni partículas extra. |
| 2 | Borde central más definido; conserva exactamente el número de impactos. |
| 3 | Una muesca breve en la salida; el ritmo visible sigue la cadencia real. |
| 4 | Estela legible hasta el alcance real mejorado, sin dibujar daño fuera de él. |
| 5 | Remate de impacto más definido, sin agrandar la zona de colisión. |
| MAX | Marca geométrica breve; el efecto final especial solo aparece cuando su condición mecánica se cumple. |


El nivel no cambia el tier. Una Pistola Normal MAX mantiene marco gris y su bala física de matiz champán, con el rasgo MAX cuando corresponda. El rastro no crea disparos extra ni hace visible un alcance que no existe.

## Fusiones

Predomina el núcleo en forma y tono; el rasgo donante se reconoce en la fase en que realmente actúa. La proporción orientativa 70/30 es solo composición visual, no daño, tiempo ni probabilidad.

Máximo tres tonos simultáneos: principal, donante y acento de tier. Si se necesita un núcleo claro para leer el ataque, el acento de tier se desplaza al impacto final, sin sumar un cuarto tono. Si los componentes tienen el mismo matiz, cambian patrón y silueta, no aparece un color arbitrario nuevo.

Los compuestos muestran nombre propio y marca de dos segmentos enlazados. EstadoFINAL en interfaz, sin otra escalera 1–5 y sin afirmar que la fusión sea un quinto tier. El marco usa el tier de resultado definido en la receta.

Ejemplos:

- **F24, Hoja fotónica de contención:** corte marfil de katana y proyección láser cian. Acento azul del resultado Raro en el cierre del corte.
- **F46, Repulsor de Guardia:** bala champán y golpe próximo marfil. Acento azul Raro en el contacto, con marca enlazada breve; el barrido solo aparece si se activa.
- **F33, Misil de convergencia:** misil naranja y líneas convergentes cian. Remate dorado del resultado Legendario en el impacto; no un halo dorado permanente.

## Límites de lectura en 16/32

- Núcleo de estela de 1 px en 16 y 2 px en 32, con el mismo grosor aparente relativo al personaje. Sin estelas gigantes por ser Legendario.
- Persistencia visual después del paso:60–120 ms para proyectiles,90–150 ms para barridos y hasta 220 ms para polvo de impacto. Esto no acorta el ataque, láser, quemadura o zona funcional real.
- Máximo 4 partículas ordinarias o 6 de MAX/fusión por ataque en 16;6/8 en 32. Presupuesto conjunto de 12/16 con dos armas. Son topes de diseño, sin medición de rendimiento aún.
- Rellenos persistentes de suelo del jugador con opacidad máxima 15%, borde abierto y sin tapar avisos hostiles. El peligro enemigo conserva prioridad de dibujo; el fuego propio naranja no usa su mismo disco de advertencia.
- No estrobos, aura continua, flash de pantalla ni colores que se alternen rápidamente. Con movimiento reducido, reemplazar adorno por un fotograma de impacto legible.
- Las estelas no cambian hitboxes, número de blancos, velocidad, alcance, daño o frecuencia. El gráfico acompaña el comportamiento real.

## Aplicación y estado

Se añadieron fichas de ataque a 90 modelos y fichas visuales a 63 fusiones, junto con paletas, marcas y evolución de nivel. El catálogo y sus datos quedan actualizados. No se generaron ni editaron sprites, y el juego publicado conserva sus efectos actuales.

Las reglas visuales se aplican al diseño por este encargo. La progresión 1–5+MAX y las recetas anteriores siguen siendo propuestas pendientes de validación y decisión final; esta revisión de color no las convierte en mecánicas aprobadas.
