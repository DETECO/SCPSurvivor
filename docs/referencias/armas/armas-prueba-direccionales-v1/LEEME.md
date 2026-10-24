# Armas direccionales · Paquete inicial para aprobación

22/10/2026 · SCP Survivor · Revisión1.

## Abrir

Abrir index.html en un navegador. Funciona con archivos locales, sin cuentas, instalación ni servicios externos.

Elegir arma, resolución y orientación. Mover el puntero para apuntar; clic o botón para ver una representación del ataque. WASD/flechas desplazan el Guardia de referencia. Las ocho miniaturas permiten fijar una dirección. La casilla «Ver agarre y salida» marca los puntos que deben revisarse antes de integrar.

## Qué contiene

- **9 armas base:** una por categoría y con los cuatro tiers representados.
- **1 compuesto F24:** Hoja fotónica de contención, derivado de Katana + Emisor láser.
- **8 direcciones por modelo:** E, SE, S, SW, W, NW, N, NE.
- **2 resoluciones nativas verificadas:**16×16 y32×32. Son archivos de esas dimensiones, no solo etiquetas sobre una lámina.
- **160 PNG individuales:**144 de armas base y16 del compuesto.
- **20 hojas direccionales:**128×16 en modo16;256×32 en modo32.
- **Transparencia binaria y paleta limitada:**hasta12 colores opacos por sprite16 y20 por sprite32.
- APROBACION_16.png y APROBACION_32.png muestran las vistas ampliadas a escala entera con el mismo tamaño aparente.
- catalogo.json/catalogo.js registran rutas, orden, paletas, rectángulos, puntos de agarre y salida, categoría y tier.
- fuentes/ conserva sin cambios los tres atlas seleccionados de Image Gen. PROMPTS.json conserva las instrucciones y la corrección realizada.

## Modelos de prueba

| Categoría | Modelo | Tier |
| --- | --- | --- |
| Fuego | AF01 · Pistola de servicio | Normal |
| Arrojadiza | AR01 · Granada de fragmentación | Normal |
| Cuerpo a cuerpo | CC04 · Katana de contención | Raro |
| Incendiaria | IN03 · Lanzallamas de contención | Normal |
| Francotiradores | FR07 · Rifle Tres Eslabones | Épico |
| Pesadas | PE04 · Lanzamisiles de contención | Raro |
| Rústicas | RU04 · Ballesta de recuperación | Raro |
| Tecnológicas | TE01 · Emisor láser | Normal |
| Anómalas | AN09 · Reloj prestado | Legendario |
| Fusión de prueba | F24 · Hoja fotónica de contención | Raro |

Respecto de la primera lámina se cambió el Prisma por el Emisor láser, y el Fusil de cerrojo por el Rifle Tres Eslabones. Esto permite revisar una pareja compatible del catálogo y conservar presencia de los cuatro tiers, sin agregar otra categoría base.

## Orientación y montaje

El ángulo0 apunta a la derecha; aumenta hacia abajo en coordenadas de pantalla. El visor selecciona una de las ocho vistas y, en modo360°, aplica únicamente el ángulo residual respecto a ella. No vuelve a girar la vista por todo el ángulo de apuntado.

El cuerpo del Guardia conserva sus piezas y ocho vistas. Las piernas siguen el desplazamiento y el torso apunta al objetivo. El arma pasa detrás o delante del torso según orientación. Se reutilizan sin edición sus dos hojas de piezas.

**Los agarres y bocas/puntas son estimaciones sobre píxeles sólidos, pendientes de aprobación artística.** El visor permite verlos; que estén dentro del sprite no demuestra por sí solo que todos sean el punto anatómico ideal. Los brazos del banco son esquemáticos y no reemplazan la animación definitiva.

## Nivel, tier y fusión sin multiplicar dibujos

El tier es fijo para cada modelo; sus marcas no conceden daño por color. Los estados1–5+MAX reutilizan el mismo cuerpo del arma. La lista de nivel del visor es una ayuda visual de la propuesta previa, no aprobación de una nueva progresión ni una simulación completa de todos sus extras.

F24 tiene cuerpo propio de arma compuesta, ocupa una instancia en el banco y combina corte físico con proyección cian. Está disponible en el selector para revisarlo; el visor **no ejecuta una transacción de fusión, no consume armas y no prueba economía**.

## Optimización y procedencia

Tres generaciones agrupadas para A48/B48/C64 vistas y una corrección puntual del loteB. Cada arma tiene una fila de fuente simplificada para16 y otra refinada para32; el modo16 no se crea reduciendo los PNG finales del32.

La exportación técnica recorta y separa los dibujos, ajusta su escala, limita la paleta y convierte alfa a0/255. En16 se usa muestreo de área seguido de cuantización para conservar detalles finos; en32, vecino cercano. Las ampliaciones del visor y las láminas no suavizan los píxeles.

En la última fila deC, dos siluetas se solapaban en su proyección horizontal, aunque eran cuerpos separados. Se aislaron sus componentes2D para no mezclar piezas al recortar. No se inventó una vista girando otra ni se pintaron detalles nuevos con código.

## Estado honesto de las pruebas

**Entregado y verificable:**dimensiones,160 celdas no vacías,20 hojas, ocho direcciones por modelo, alfa binario, topes de paleta, fuentes preservadas, montaje local y representación inicial de salida de ataques.

**Aprobación visual registrada (22-10-2026):** nueve armas y la fusión F24, con ocho direcciones en 16×16 y 32×32. Confirmación del usuario: «aprobado.». Ver APROBACION.md.

**Pendiente técnico:** calibración de agarres y salidas durante la integración, y retoques manuales que resulten necesarios. La aprobación visual no acredita estos trabajos como realizados.

**No incluido como terminado:**animaciones finales de preparación, retroceso, recarga y recuperación de cada arma; combate con enemigos, hitboxes, balance, rendimiento de teléfono físico ni integración con la partida publicada. El banco muestra efectos ilustrativos sin daño real.

El juego, sus cuentas, guardados, economía, PNG originales y sources/ no se modificaron. Este paquete permite aprobar recursos y preparar la integración; no acredita una integración jugable del arsenal completo.
