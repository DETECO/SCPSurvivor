# Integración PERSONAJES

- [x] Leer referencias accesibles y paquete; diseño acotado en `../specs/2026-10-22-personajes-design.md`.
- [x] Respaldo y manifest de fuente/publicación antes de editar runtime.
- [x] Copiar PNG/metadatos existentes sin editar imágenes; comprobar hashes y dimensiones. Crear `G.CharacterCatalog` con metadatos de ambas resoluciones.
- [x] Root: modo gráfico y selector, metadatos/fallback fuente PNG y hooks visuales, apoyos amarillos, preservación de física.
- [x] Root (tarea inicialmente delegada a Luna max, recuperada sin archivos): `js/ui/personajes-art.js` + `tests/v2-personajes-art.test.js`, montaje modular cuerpo/brazos/dos armas, flash/alpha y objetivos propios. Root integra/revisa.
- [x] Root: pruebas rojas/verdes de instalación, alias Neutralized, sampling PNG y fallback clásico; navegador de ambas resoluciones y apoyos reales.
- [x] Verificación fuente/publicación, casos de fallo, build/check/regresión, revisión y documentación. Roadmap0.32, sin alterar 53 tareas/52 histórico/V2 sin porcentaje.
- [ ] Publicar main autorizado y comprobar hashes/Pages/recorridos públicos; entregar enlaces y límites.

Contrato de integración: `G.TrialVisuals.mode` será `16|32|v1|clasicos`; `enabled` es true solo expanded y no clásico. `G.TrialVisuals.install` instala metadatos tras Content.install. En modos nativos, m.characterId identifica catálogo (`guardia`, `medico`, `apoyo`, `perseguidor`, `biologico`, `custodio`), m.characterSize es16/32, m.a contiene lógica original w/h/ax/ay más sourceW/sourceH, n/r/d y file. G.CharacterCatalog.modes[size][id] contiene catálogo original; assets en `assets/personajes-20261022/{size}/{id}`. API `G.PersonajesArt.draw(ctx,anim,x,y,opts)` devuelve true si manejó cuerpo humano sin brazos; false para criatura/fallback/disabled y usa fuente estándar. `drawWeapons(ctx,pl,options,weapons)` y `drawAlly(ctx,ally)` devuelven booleanos para su render visual; ninguna mutación de combate. Sheet de piezas puede precargarse con `G.PersonajesArt.preload()`.
