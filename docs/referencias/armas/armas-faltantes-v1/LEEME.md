# Armas faltantes — propuesta visual r1

24/10/2026 · ARM-FALTANTES-VIS-001/r1 · **Apariencia aprobada por Iván el25/10/2026. Integración y calibración pendientes.**

Respuesta a «Haz los sprite y modelos, de las armas faltantes». El alcance comprende las tres armas legadas del ensayo que carecen de correspondencia visual aprobada en ARM-VIS-001/R1: Subfusil, Escopeta y Porra. Se conservan sus identidades `smg`, `shotgun` y `baton`. No se agrega un arma jugable ni se asignan rarezas, estadísticas o recetas nuevas.

| Propuesta identificable | Arma existente | Forma |
|---|---|---|
| ARM-SMG-VIS-001/r1 | Subfusil / smg | Receptor compacto de acero, culata oliva y cargador recto corto |
| ARM-SHOTGUN-VIS-001/r1 | Escopeta / shotgun | Cañón largo y recto, culata y corredera de madera |
| ARM-BATON-VIS-001/r1 | Porra / baton | Vara recta de grafito, empuñadura oliva y collar de acero |

## Entrega

- 48 PNG individuales: tres modelos × ocho direcciones × dos resoluciones.
- Seis hojas `16/<modelo>/direcciones.png` y `32/<modelo>/direcciones.png`, de 128×16 y 256×32 respectivamente.
- Orden: E, SE, S, SW, W, NW, N, NE. Ángulos de pantalla 0°,45°,90°,135°,180°,225°,270°,315°; x a la derecha, y hacia abajo.
- Láminas `REVISION_16.png` y `REVISION_32.png`; `index.html` permite compararlas sin instalar dependencias.
- `catalogo.json` / `catalogo.js` incluyen correspondencia de modelo legado, recortes y anclas estimadas de agarre, apoyo y salida. En Porra se registra la punta de golpe, no una boca de disparo.
- `VERIFICACION.json` guarda dimensiones, alfa binario, colores, márgenes y hashes por sprite. `SHA256.txt` permite comprobar el paquete.

## Producción y límites

Un único atlas generado con Image Gen contiene los tres modelos en ocho orientaciones, con filas separadas para16 y32. La fuente original se conserva sin cambios en `fuentes/atlas-faltantes-v1.png`; no se editan originales aprobados. `PROMPTS.json` guarda el prompt exacto, referencia y método.

La exportación técnica separa dibujos y filas, ajusta su escala, limita la paleta a12/20 colores y normaliza el alfa a0/255. Las dos resoluciones parten de sus propias filas del atlas, no de reducir el PNG final de32. El visor amplía por vecino cercano. Esto no acredita limpieza artística manual terminada.

Los sprites tienen ocho **poses base de orientación**. No son ciclos completos de disparo, retroceso, recarga o golpe. Sus anclas se estiman sobre píxeles sólidos y requieren calibración real sobre Guardia/Médico y las combinaciones de dos armas. `supportRequired` es nulo en las armas de fuego hasta resolver las poses; no presupone manos disponibles.

El tamaño de celda no fija el tamaño del arma en el mundo ni modifica hitboxes. La misma escala de presentación se usa en16/32, pero el factor de montaje definitivo debe validarse con el rig. No se cambia el origen físico de proyectiles.

La carencia de INC-VIS-001 queda **atendida con una propuesta**, no cerrada como recurso aprobado: falta la aceptación de esta revisión y la evidencia técnica de PROGRAMACION. Los estados de implementación y publicación se consultan en `docs/gestion/REGISTRO_IMPLEMENTACION.md` y el informe de INC-VIS-001, sin duplicar su lista aquí.

No se generaliza la aceptación previa de nueve armas/F24 a este lote. EST-ARM-001 r1 conserva sus reglas de progresión y fusión. No se tocaron código de combate, estadísticas, personajes originales, economía, gacha, recetas ni archivos sincronizados.


## Aceptación posterior

Ver APROBACION_2026-10-25.md. Sustituye el estado de revisión de esta ficha. Las láminas conservan su texto histórico de propuesta; los PNG no se editan al registrar la aceptación.
