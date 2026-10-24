# INC-VIS-001 r1 — Armas provisionales y proporciones en móvil

24/10/2026 · ESTRUCTURA · **Responsable de corrección: PROGRAMACION. Estado: diagnóstico y encargo; sin afirmar solución implementada.**

## Petición y autorización

Iván aporta captura de iPhone y pregunta por armas sin modelar/sprites y elementos sobredimensionados. Autoriza: «A lo que termines de identificar el area responsble. Te autorizo a decirle directamente que tiene qué soluciónar dondole la solucion y guia por tu parte hasta solucionarlo.»

Captura original conservada: `C:/Users/DELL/.codex/codex-remote-attachments/01a1457c-c051-73d2-9864-e7deb6435420/3C694C4A-F022-446C-A4DF-1D0E49DBCAF9/1-Imagen-pegada-1.jpg`.

## Evidencia y diagnóstico

1. La captura muestra Médico, Pistola y Subfusil, un arma de bloques grande respecto al cuerpo, enemigos muy grandes, varios paneles sobre el juego y textos de daño como `6.6000000000000005`. No permite leer la URL, el commit cargado ni los valores internos del canvas; no atribuirlo a caché o al teléfono sin comprobarlo.
2. [personajes-art.js](../../js/ui/personajes-art.js): `weapon()` aún dibuja pistol/smg/shotgun/baton con rectángulos. `armed()` usa AF01 PNG solamente si el modelo es pistol y `WeaponRevisionTrial.active()`; de lo contrario utiliza ese dibujo provisional. Que los PNG estén en la galería no demuestra que esa ruta los dibuje.
3. [weapon-revision-trial.js](../../js/systems/weapon-revision-trial.js): el puente aprobado se activa con `prueba=combate-v2&armas=r1` y admite AF01, no Subfusil. La captura no corresponde al equipo permitido de ese puente. Puede ser otra entrada/revisión; su URL y versión exactas no están comprobadas.
4. [content.js](../../js/data/content.js) mantiene metadatos provisionales: humanos/perseguidor 24×28, biológico y custodio 64×64. [trial-visuals.js](../../js/data/trial-visuals.js) cambia fuente y recorte 16/32 reutilizando la geometría lógica anterior. [sprites.js](../../js/core/sprites.js) dibuja a `m.w/m.h × PX × scale`, con PX=2. Así esos enemigos reciben un rectángulo de dibujo de 128×128 a escala 1; el rig humano usa una referencia de 56 unidades. El tamaño exacto visible depende del alfa del PNG. Esta diferencia está comprobada en fuentes, pero falta reproducir la composición concreta de la captura y validar proporciones por rol.
5. [fx.js](../../js/entities/fx.js) ya tiene un formateador compacto en la fuente local para el modo expandido. La captura con decimales largos obliga a comprobar rama ejecutada, bundle servido y llamadas a FX; no dar por arreglada la pantalla porque exista el helper ni redondear el daño real para ocultar el texto.

## Guía de corrección

- Reproducir entrada pública normal y enlace AF01 r1 con Médico, ambas resoluciones y móvil vertical/horizontal. Identificar qué modelo, renderer y revisión se ejecutan en cada entrada. Capturar el estado de carga de los PNG y las rutas de respaldo.
- Usar los recursos aprobados que correspondan al arma realmente implementada. Resolver la exposición de dibujos provisionales desde la entrada habitual. No sustituir el Subfusil por otra identidad ni declarar aprobado un modelo nuevo. Si faltan PNG o adaptación para un modelo, informar/revisar esa dependencia con ARMAS; no inventar arte ni equipar F24.
- Separar resolución de textura de tamaño visual de mundo y de geometría de combate. Revisar el tamaño heredado 64×64 de los regulares frente al rig humano; distinguir comunes y jefes. Conservar originales, colisiones, alcance, velocidad, daño, cámara y dimensiones de mapa aprobados. No corregir esta proporción con otro zoom global ni achicando todas las imágenes por un factor arbitrario.
- Calibrar agarre, dirección, salida del disparo y capas del arma sobre Guardia/Médico en 8 direcciones; una y dos copias compatibles. Validar tamaño del arma contra el cuerpo mediante capturas comparables, no solo que cargue `drawImage`.
- Conectar/verificar formato de daño compacto en la ruta afectada sin modificar cálculos de combate. Evitar textos largos, infinitos o ilegibles, respetando los controles de números de daño.
- Compactar la superposición técnica repetida del HUD para móvil conservando vida, tiempo, munición y acciones necesarias, dentro de la interfaz aprobada. MENUS participa si hace falta un cambio visual; una corrección técnica que restablece la legibilidad no necesita reaprobar reglas.

## Criterios de cierre y evidencia

1. Comparativa antes/después de la escena con Médico, arma, enemigos regulares y jefe; identificar URL y revisión. Probar Guardia también, 16/32, móvil vertical/horizontal y escritorio.
2. El arma implementada muestra el recurso aprobado con agarre/escala correctos; no retorna silenciosamente al bloque provisional. Comprobar ambas entradas y carga fallida/lenta de recursos.
3. Igual tamaño de mundo entre 16/32, sin nueva modificación de hitboxes/estadísticas. Registrar límites visuales y anclas; normales y jefe comprobados por separado.
4. Sin cadenas de precisión flotante en daño ni solapamiento excesivo de paneles. Una cifra como `6.6000000000000005` se muestra como `6.6`, conservando el daño interno.
5. Pruebas focalizadas y de regresión reales; las comprobaciones de carga o un visor estático no bastan para aceptar el montaje en partida.
6. Registrar informe y resultados en [REGISTRO_IMPLEMENTACION](REGISTRO_IMPLEMENTACION.md), enlazando esta incidencia. Para la misma demo de GitHub Pages ya autorizada, conservar su alcance de publicación y comprobar el bundle efectivo y los flujos públicos; no presentar un cambio local como visible en el teléfono.

PROGRAMACION coordina la solución técnica; ARMAS aporta recursos/agarres si faltan y PERSONAJES valida compatibilidad del rig. ESTRUCTURA mantiene seguimiento de esta corrección hasta contar con evidencia. No cambia escala/progresión/fusión, no abre el gate CC04/TE01 y no sustituye aprobaciones de arte.

**Derivación confirmada:** encargo enviado al hilo PROGRAMACION `01a13aeb-020a-7d62-8256-3d42a6e61877`, con imagen, causas comprobadas, hipótesis pendientes y criterios. [Mensaje exacto y confirmación](INC-VIS-001_DERIVACION.json). Enviar el encargo no acredita todavía una corrección verificada.

### Reproducción pública independiente de ESTRUCTURA

**Dependencia consultada a ARMAS:** autorizado por el mensaje directo de Iván, se envía al hilo ARMAS `01a164ea-cca2-74b2-a034-5f6a7c949cbd` una búsqueda acotada del recurso aprobado para el Subfusil/smg. ARM-VIS-001/R1 no lo identifica y LEEME de PERSONAJES describe otras seis armas en Armas.png. Se pide ruta/procedencia/variantes si existe o ficha de carencia si no; sin código, cambios de identidad ni aprobación de un modelo nuevo. PROGRAMACION continúa con las partes independientes.

Chromium móvil emulado 390×844, 24/10/2026. Entrada habitual `?graficos=32`: puente r1 inactivo, 0/16 PNG AF01 cargados. Entrada explícita AF01: puente activo y 16/16 cargados. Ambas conservan rectángulo de dibujo biológico 128×128; sin errores de página en este arranque. Evidencia: `migration-audit/inc-vis-001/coordinacion-basal/resultado.json`, `habitual.png` y `af01.png` en el directorio padre del juego. La comparación de arranque no reproduce la partida completa ni su ángulo de disparo; se indicó a PROGRAMACION probar también Médico, dirección este/sureste y dos armas. La reproducción confirma la diferencia de rutas, no una causa de caché.
