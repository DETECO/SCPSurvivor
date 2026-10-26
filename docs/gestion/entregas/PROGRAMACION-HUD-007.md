# PROGRAMACION — MEN-005-A / LOT-EST-007 r1

Inicio25/10/2026 · cierre local26/10/2026 · **HUD implementado y comprobado localmente. Publicación nueva pendiente de coordinación.**

## Fuentes y autorización

REV-EST-0010, CONTROL0.12, LOT-EST-007r1 y MEN-005-A r1. La aprobación de la dirección visual es el mensaje `01a1730f-9ef3-7d11-abf2-81923ddf65f4` deMENUS («Apruebo la opción1por ahora .»). La continuación dePROGRAMACION conserva el mensaje `01a17533-e1b4-7003-af6e-17ef3c353c4e` («Aprueba. Y continua»). No se interpreta como una aceptación física o aprobación de nuevos poderes, números o categorías.

Se leyeron pauta/ficha/láminaA, lote y código existente. [Respaldo previo](../../../development-backups/lot-est-007-r1/MANIFIESTO.json). Se comunicó aESTRUCTURA la ejecución y aPERSONAJES la reserva limitada de `drawBubble`. No se editaron masters/roadmap/control, pautas de otras áreas, `sources/` ni el clon público.

## Resultado

- Barra superior con vida real, tiempo del mapa/recinto, nivel y XP; radar en la esquina derecha. Cápsulas separadas para mapa, nombre/gradoBIO, objetivo, localizador y alertas. Vida de anomalía con ancho visible.
- Dos ranuras existentes en el centro inferior, munición/cuerpo a cuerpo, progresión y progreso real de recarga. Consulta de equipo conserva su acción de pausa.
- Habilidad del soldado en la esquina inferior derecha; aro calculado con el enfriamiento real deSprint/Primeros auxilios. No se añade una ultimate.
- Referencia visual de movimiento a la izquierda en táctil. El joystick sigue siendo flotante y conserva su zona de uso, fuerza, radio y multitáctil; la referencia desaparece mientras se arrastra.
- Mejoras/poderes en columnas en horizontal, conservando ofertas, categorías y acciones reales. «Continuar» y «Volver al menú» quedan visibles antes del inspector extenso de equipo. Ese inspector conserva desplazamiento interno; la página no se desplaza.
- Avisos inferiores se apilan. Las burbujas se colocan respecto a los límites reales deHUD/radar/controles; se omiten si no caben o hay una alerta prioritaria. El diálogo, su selección y sus temporizadores se conservan.

Durante la revisión se corrigió un ancho de2px en la barraBIO causado por la combinación de `width:auto` y margen automático. También se corrigió el recorte previo de acciones de pausa al abrir una consulta larga.

## Código y diferencias

Módulos propios nuevos: `js/ui/corner-hud.js`, `css/corner-hud.css`. Integración pequeña en `technical-ui.js`, `expanded-ui.js`, `main.js`, `dev.html` y una llamada opcional de colocación en `rift-companion.js`. `index.html` y `js/app.min.js` se regeneraron. Pruebas: `tests/corner-hud.test.js` y `tests/hud-007-browser.py`.

[Diff propio](PROGRAMACION-HUD-007/CAMBIOS_HUD.diff) · [archivos, fuentes y dependencia concurrente](PROGRAMACION-HUD-007/CAMBIOS_Y_FUENTES.json). El diff excluye expresamente la inserción ajena de `character-proportions.js`; se conserva en la fuente compartida. No se mezclan sus cambios con la autoría deHUD.

## Comprobaciones reales

- Suite de juego:54archivos, **285/285PASS**, sin fallos/omisiones. P05 excluida: esta entrega no cambia servicios y sus limitaciones conocidas siguen vigentes. [Log](PROGRAMACION-HUD-007/node-tests.log).
- Navegador Chromium real:844×390,932×430,390×844 y1280×900;32/16alternados yGuardia/Médico. Entrada normal, una/dos ranuras, munición y recarga, habilidad, movimiento táctil flotante, equipo/pausa, mejora, recintoD2conNPC, nombre/vidaBIO, retirada, poder y regreso. Reemplazo del cuarto poder en844×390y390×844; opciones alcanzables y tiempo congelado. Límites de burbuja comprobados contra cajas reales. [Resultado y hashes del corte](PROGRAMACION-HUD-007/browser.json).
- Sin desbordamiento de página ni colisión entre HUD/radar/armas/habilidad/referencia de movimiento. Botones esenciales≥44px; pausas, mejora y elección conservan relojes/munición/enfriamientos/posición.
- Build reproducible y `npm.cmd run build:check` aprobados:120scripts;SDK local227131bytes. La comprobaciónSDK requirió ejecutar fuera del aislamiento por bloqueo de lectura de directorios superiores deesbuild. No requirió cambios de SDK/credenciales/servicios.
- Capturas examinadas de combate, equipo, mejora, recinto, retirada y reemplazo. [Horizontal](PROGRAMACION-HUD-007/844x390-normal.png) · [vertical](PROGRAMACION-HUD-007/390x844-normal.png) · [recinto](PROGRAMACION-HUD-007/390x844-recinto.png) · [pausa/equipo](PROGRAMACION-HUD-007/844x390-equipo.png) · [reemplazo](PROGRAMACION-HUD-007/844x390-reemplazo.png).

La prueba usa inyecciones declaradas de equipo/HP/XP/posición/grado/presenciaNPC, avance de tiempo y premio garantizado para alcanzar las ramas de interfaz. No acredita dificultad natural, probabilidades ni teléfono físico. La primera prueba del cuarto poder encontró una victoria legítima sin poder; se corrigió el escenarioQA para garantizar esa rama sin cambiar la regla del juego.

## Cambio de fuentes durante la ejecución

PERSONAJES añadió `js/data/character-proportions.js` y su entrada en `dev.html` después del respaldo. Se conservó; se regeneró el compilado de120scripts y se repitió el navegador con hashes de todos los scripts/CSS/HTML antes y después, sin deriva durante la prueba final. Esto prueba elHUD con ese corte local; no declara terminada la reparación de piernas ni sustituye la validación dePERSONAJES. Renderer/datos de personajes y módulos de combate/habilidad/grieta/poderes/táctil respaldados se mantienen sin edición propia; el manifiesto distingue los cambios reales.

## Pendientes materiales

Conciliar entrega dePERSONAJES y publicación conESTRUCTURA, manteniendo las diferencias locales/públicas deSDK/CSP. Aceptación del montajeHUD y teléfono físico pendientes. FusiónLOT002 sigue aislada y debe repetir sus384poses con el rig corregido antes de integrarse; ultimates, poderesA/B sin elegir, gacha/guardado reales conservan su estado anterior.

Esta entrega no cambia el recibo público0.38 ni acredita una nuevaURL hasta que exista el recibo de publicación correspondiente.
