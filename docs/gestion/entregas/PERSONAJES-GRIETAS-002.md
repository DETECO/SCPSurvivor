# PERSONAJES-GRIETAS-002 · Reparación femenina R2

24/10/2026 · PERSONAJES. Encargo de Juanillo: reparar stride sin redibujar, conservar originales, crear revisión aparte, explicitar anclas y montaje de arma. No se ha escrito runtime, maestro o CONTROL_CAMBIOS ni publicado o enviado mensajes a otros hilos.

**Cierre de esta revisión: 25/10/2026.** [Paquete R2 para revisión](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024.zip). Incluye comparador portátil original/R2, 24 atlas reparados y seis Idle de control, copias idénticas de los 30 atlas anteriores para comparación, fuentes, contactos, diff y evidencia. La reproducción del exportador requiere la carpeta original adyacente; el visor no. No es aceptación artística final ni entrega integrada.

SHA-256 del ZIP R2: `274ca2eddc4aa1ce08509d67dc5c657db1131e195df7127cf86cdf57633cc726`.

## Entrega técnica y alcance

Raíz nueva: `design-proposals/companeras-contencion-modelos-finales-r2-20261024/`, en el directorio padre del juego. [LEEME](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/LEEME.md) · [Visor original/R2](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/index.html) · [Comparativa](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/COMPARATIVA-R2.png) · [Diff exacto del exportador](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/EXPORTADOR.diff).

**Stride corregido:** 24 hojas multiframe nuevas, sin sustituir las originales. Seis Idle idénticos como control. El cambio de código escribe cada scanline en `(filaDireccion*n+y)*(n*fotogramas)+fotograma*n`, en lugar de copiar el buffer de la celda como si el atlas tuviera ancho `n`. Las fórmulas se multiplican por cuatro canales RGBA.

[VERIFICACION.json](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/VERIFICACION.json) acredita 624 recortes iguales a los buffers normalizados recuperados del exportador original, 576 recortes anteriormente mal interpretados y una prueba de regresión con marcadores de píxel. Seis fuentes idénticas a los hashes declarados; los **44 archivos originales, incluido su ZIP, están intactos**. No se utilizaron nuevas imágenes ni dibujos.

Contrato nuevo explícito: celdas 16/32; fotogramas por columnas; ocho **casillas nominales** S/SE/E/NE/N/NW/W/SW por filas; anclas `(8,15)` y `(16,31)` en resolución y acción. Idle1/Walk4/Attack4/Hurt2/Neutralized2; tiempos anteriores conservados. No se cambia física, silueta o personalidad.

## Hallazgo adicional: vistas de origen no certificadas

**No está lista la integración completa de las compañeras.** La igualdad de 624 buffers prueba el arreglo del copiado, no la corrección artística de los recortes originales. Se inspeccionaron todas las casillas de las tres láminas de contacto, ambas resoluciones, y las fuentes originales.

| Fuente | Bandas de poses ocupadas observadas | Columnas observadas |
|---|---:|---:|
| Delgada16 | 8 | 13 |
| Delgada32 | 7 | 14 |
| Fitness16 | 7 | 13 |
| Fitness32 | 7 | 14 |
| Curvy16 | 7 | 14 |
| Curvy32 | 7 | 13 |

El exportador anterior asumía cuadrícula regular13×8 por divisibilidad de dimensiones. Eso corta algunas poses y mezcla fragmentos de vecinos antes de escribir el atlas. Las fuentes tienen márgenes/posiciones irregulares; cinco no muestran ocho bandas. El análisis de bandas no identifica por sí solo qué ángulo falta. **No se inventaron poses, no se espejaron ni rotaron cuerpos para llenar casillas.**

[CUADRICULAS-FUENTE.json](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/CUADRICULAS-FUENTE.json) guarda coordenadas de bandas y el límite; el catálogo declara `integrationReady=false`. [Delgada](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/CONTACTO-delgada.png), [fitness](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/CONTACTO-fitness.png) y [curvy](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/CONTACTO-curvy.png) conservan evidencia visual, incluidos los defectos restantes.

[Verificación del visor, 25/10](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/VERIFICACION-VISOR.json): tres modelos, seis lienzos, 60 atlas original/R2 cargados, cinco acciones y ocho casillas seleccionables, cambio de imagen al comparar, pausa y avance de un fotograma, ancho móvil390 sin desbordamiento y sin errores de página. No convierte las casillas en vistas válidas; documenta solo el funcionamiento de la herramienta de revisión.

La dependencia siguiente es revisar límites reales de las poses existentes y recuperar/completar las vistas que no están disponibles, con su procedencia. **Esta revisión cumple el arreglo exacto del stride; no afirma resolver la insuficiencia de las fuentes con ese cambio.**

## Arma con dos brazos reales

[Contrato y límites](../../../../design-proposals/companeras-contencion-modelos-finales-r2-20261024/MONTAJE-ARMA.md): los dos brazos están dibujados en el cuerpo. Se puede superponer un arma a una pose existente solo si su empuñadura y apoyo coinciden con esas manos. No hay coordenadas de manos verificadas, cuerpo sin brazos ni piezas femeninas independientes: no se entrega rig de apuntado continuo certificado.

No añadir los brazos masculinos encima del cuerpo completo, no duplicar brazos ni deformar cintura/torso para alcanzar el arma. Las anclas entregadas son de pies, no agarres. El apoyo masculino aprobado conserva su propio rig y puede avanzar por separado; no se reabre esa dependencia.

## Aprobaciones y estado

Se mantiene la aceptación de las tres siluetas y el encargo final del mensaje `msg_01a1697b-bb4c-7cc0-b2a8-a72056e8cde0`, 23/10. La revisión técnica R2 y su ZIP **no reciben aceptación artística final por inferencia**. La aceptación BIO no se aplica a estas compañeras. No se editan los originales ni se declara integración por crear esta carpeta.

Resultado: **reparación de stride verificada; anclas explícitas; validación visual completa NO aprobada por los defectos de entrada descritos; montaje articulado femenino incompleto.** Juanillo recoge esta entrega para coordinar el siguiente alcance sin detener las cinco BIO o el NPC masculino.
