# Anomalías — entrega de sprites y animaciones V1

23/10/2026 · PERSONAJES · Encargo directo de Iván: «cuando te de el aceptado, tu tienes que hacer altiro los sprite reales. hazlos ahora».

## Recursos producidos

**Aceptación de recursos V1, 23/10/2026:** Iván confirma «aceptado.» después de recibir el visor, la vista animada y el paquete ZIP. Quedan aceptados para integración los sprites 16×16/32×32, sus ocho direcciones, nueve secuencias por modelo y efectos. [Registro y hash del paquete aceptado](ANOMALIAS_SPRITES_V1_APROBACION.md). La integración y el balance del juego siguen pendientes en PROGRAMACION.

Ubicación: [paquete local](../../design-proposals/anomalias/sprites-v1-20261023/LEEME.md). [Abrir visor](../../design-proposals/anomalias/sprites-v1-20261023/index.html) · [GIF de conjunto](../../design-proposals/anomalias/sprites-v1-20261023/PREVIEW.gif) · [Comparación](../../design-proposals/anomalias/sprites-v1-20261023/COMPARACION.png) · [ZIP](../../design-proposals/anomalias/sprites-v1-20261023.zip).

Cinco modelos aprobados: Esporario Blanco, Larva de Vidrio, Malla Tendinosa, Portador de Espinas y Huésped de Cuarentena. Dos tamaños exactos, 16×16 y 32×32; ocho direcciones S/SE/E/NE/N/NW/W/SW. Nueve secuencias por modelo: reposo, caminar, correr, salto, tres ataques, daño y derrota.

- **90 atlas PNG de cuerpo**, con **6.832 celdas de fotograma**. Incluyen poses sostenidas y reutilizadas; no son 6.832 dibujos únicos.
- **40 atlas PNG de efectos**, separados del cuerpo: tres ataques y salto por modelo/tamaño.
- Diez láminas de poses base, 180 GIF de secuencias (frente y recorrido de ocho direcciones), un GIF de conjunto y visor interactivo.
- Catálogo JSON/JS con tiempos, anclas, direcciones, correspondencia de efectos y elevación rasterizada. Fuentes intactas y prompts de imagegen integrado conservados.

Es la producción raster del [diseño de ataques V1 aprobado](ANOMALIAS_BIOLOGICAS_ATAQUES_ANIMACION_V1.md). Las vistas provienen de poses direccionales generadas; las animaciones combinan poses con deformación y desplazamiento discretos. No se entrega rig de articulaciones editable ni nuevas mecánicas de combate.

## Comprobación efectuada

[Informe de archivos](../../design-proposals/anomalias/sprites-v1-20261023/VERIFICACION.json): dimensiones de todas las celdas, alfa 0/255, paletas de hasta 12/20 colores, celdas no vacías, margen libre, ocho secuencias direccionales distintas, cambios visibles por animación, GIF y hashes de las fuentes. Resultado: cero fallos.

[Informe del visor](../../design-proposals/anomalias/sprites-v1-20261023/VERIFICACION-VISOR.json): cinco tarjetas, diez lienzos, 130 atlas cargados, selección de nueve acciones y ocho direcciones, pausa, fotograma individual, lienzos con contenido y ancho móvil 390 sin desbordamiento ni errores de página. Navegador Edge automatizado, sin prueba en dispositivo físico. Capturas [escritorio](../../design-proposals/anomalias/sprites-v1-20261023/VISOR-ESCRITORIO.png) y [móvil](../../design-proposals/anomalias/sprites-v1-20261023/VISOR-MOVIL.png) revisables.

Revisión visual local: siluetas y colores reconocibles en ambos tamaños, con frentes y espaldas diferenciados. El arte generado conserva pequeñas variaciones entre poses susceptibles de limpieza. La comprobación de hashes y dimensiones no sustituye el juicio artístico.

## Próximo consumidor

ESTRUCTURA puede consolidar estos recursos; PROGRAMACION integra y publica. Consultar LEEME.md para recorte, anclas, capas y advertencias de doble elevación. Los GIF son vistas de inspección, no archivos que deban controlar las hitboxes del juego.

No se modificó el ejecutable, ni se publicó esta entrega, ni se contactó otros hilos. Daño, colisiones, trayectorias del mundo, duración de peligros y evasión deben validarse en la futura integración. Se conservan las probabilidades 50/32/8/7/3 y las reglas existentes.

Se actualizan los estados de producción en las dos fichas de anomalías; el [patch exacto](../../design-proposals/anomalias/sprites-v1-20261023/ACTUALIZACION-DOCS.patch) conserva los cambios documentales.
