# Compañeras de contención — integración local R3

25/10/2026. Encargo directo de Iván: «Soluciona como implementar esto que tienes pendiente, quiero implementar las compañeras de contencion». Diseños delgada, fitness y curvy aprobados el 23/10; esta revisión implementa esas tres alternativas. **Implementado y comprobado en el juego local; no publicado con esta entrega.**

## Resultado

- Tres apariencias femeninas en 16×16 y 32×32, traje amarillo, máscara, visor, arnés y depósito dorsal. Ocho orientaciones, cuatro fases de caminar, reposo, montaje de ataque y postura de incapacitación.
- Cabeza/torso y piernas independientes de los dos brazos articulados. La AF01 apunta hacia el objetivo; las piernas siguen la dirección de desplazamiento. La incapacitada no porta el arma en pantalla.
- Nombre femenino elegido sin repetir mientras haya opciones; personalidad seleccionada independientemente del cuerpo. Se mantienen las catorce voces y los textos V2 aprobados, sin inventar biografía o romance según la apariencia.
- El apoyo masculino sigue disponible. En este ensayo, una vez sorteada la presencia, las cuatro apariencias tienen selección uniforme. Es una distribución visual de ensayo, no una nueva tasa canónica de género.
- Presencia 33% D1–D4 y 10% D5, rareza D4 50/50, vida45, velocidad95, AF01, munición finita, daño/cadencia existentes, imposibilidad de rematar al jefe y retirada al abandonar el recinto conservados.

## Probar en este computador

Con el servidor local en puerto8882, abrir y pulsar **Iniciar expedición**. La grieta se cruza caminando; estas URLs fuerzan presencia y apariencia exclusivamente en la práctica:

| Variante | 32×32 | 16×16 |
|---|---|---|
| Delgada | [Probar32](http://127.0.0.1:8882/index.html?prueba=combate-v2&ensayo=grietas&apoyo=si&companera=delgada&graficos=32) | [Probar16](http://127.0.0.1:8882/index.html?prueba=combate-v2&ensayo=grietas&apoyo=si&companera=delgada&graficos=16) |
| Fitness | [Probar32](http://127.0.0.1:8882/index.html?prueba=combate-v2&ensayo=grietas&apoyo=si&companera=fitness&graficos=32) | [Probar16](http://127.0.0.1:8882/index.html?prueba=combate-v2&ensayo=grietas&apoyo=si&companera=fitness&graficos=16) |
| Curvy | [Probar32](http://127.0.0.1:8882/index.html?prueba=combate-v2&ensayo=grietas&apoyo=si&companera=curvy&graficos=32) | [Probar16](http://127.0.0.1:8882/index.html?prueba=combate-v2&ensayo=grietas&apoyo=si&companera=curvy&graficos=16) |

Sin esos parámetros, la aparición sigue siendo aleatoria. La selección gráfica se conserva en Ajustes. La nueva composición femenina se implementa en los modos16/32, no en el comparador histórico `v1/clasicos`.

## Recursos y cambios

Los atlas R2 tenían defectos de recorte en las fuentes; arreglar el stride no los convertía en un rig utilizable. Se crearon fuentes modulares derivadas de los diseños aprobados, con piezas separadas y normalización por celda. No se reutilizan recortes defectuosos como cuerpos finales ni se sobrescriben R1/R2.

Paquete: `design-proposals/companeras-modulares-r3-20261025/` en la raíz del workspace. Contiene fuentes PNG, prompts, exportador, catálogo, auditoría y capturas del renderer real. La corrección de espalda de delgada solo aporta tres celdas del torso NE/N/NW. Las ocho poses de incapacitación de fitness se separan por mínimos de alfa entre los centros de columna, porque las siluetas fuente se tocan; la auditoría raster no sustituye la revisión visual.

Runtime: `assets/companeras-contencion-r3/` contiene36PNG y catálogo; `js/data/companion-characters.js` registra las tres apariencias. `personajes-art.js` utiliza las piezas propias y respaldo femenino de cuerpo completo si falla Partes.png. `rift-companion.js` fija apariencia/género/nombre al crear el NPC; `rift-expedition.js` restringe el parámetro de apariencia a la práctica. `dev.html` carga los datos antes del renderer. `index.html` y `js/app.min.js` fueron recompilados.

Respaldo previo de los cuatro fuentes y dos compilados: `development-backups/companeras-r3-20261025/`. Diff revisable en el paquete R3, `CAMBIOS.diff`; los compilados se derivan con `npm run build`.

## Evidencia y límites

- `node --test tests/companeras.test.js tests/rift-*.test.js tests/v2-personajes-art.test.js`: **27/27 PASS**. Presencia, rareza, personalidad independiente, selección automática, dos brazos, orientación, respaldo de misma apariencia, munición finita, no remate e incapacitación.
- `node tests/companeras-browser.cjs`: **seis casos PASS**, tres modelos por dos resoluciones, sobre `index.html` real en Edge. Entrada, seguimiento, disparos en ocho direcciones, diálogo, postura incapacitada sin arma, victoria y regreso con NPC eliminado. Caso adicional de fallo de piezas con respaldo femenino correcto. Viewports390×844 y1280×900; no equivalen a teléfono físico.
- `node ../design-proposals/companeras-modulares-r3-20261025/auditar.cjs`: **36PNG y1008celdas no vacías**, dimensiones/stride correctos, alfa binaria, paleta acotada y copias runtime idénticas por SHA256. Resultado en `verificacion/raster.json`; juego en `verificacion/browser.json` y PNG de sala/vistas/incapacitación.
- `npm run build` y `npm run build:check`: PASS;117scripts en orden, bundle e index coincidentes.

Los casos de navegador fuerzan posiciones, aparición, objetivo y daño para verificar comportamientos; no certifican balance natural ni frecuencias observadas. La aprobación previa del diseño no se convierte en aceptación del nuevo ZIP, de todos los dispositivos o de una publicación pública inexistente. Los dos aliados de la puerta del nivel conservan su evento anterior; esta entrega integra las compañeras del recinto de grieta.
