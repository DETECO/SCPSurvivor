# Arte de ensayo V1

21/10/2026 · Roadmap 0.31 · A-041/D-337/EV-046.

Primera capa visual provisional solicitada por Iván para probar sobre personajes más definidos. No es el catálogo final de 24 soldados/24 criaturas, ni supone aprobación final de estos modelos. Los conceptos de iconos y escenarios se conservan como referencias; no se presentan como sprites recuperados.

- [Jugar con la capa nueva](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2).
- [Galería comparativa](https://deteco.github.io/SCPSurvivor/prueba-visual-v1.html).
- [Práctica de porra](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=melee).
- [Comparar con gráficos anteriores](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=clasicos).

## Recursos aplicados

| Actor | Presentación provisional |
| --- | --- |
| Guardia | Casco segmentado, visor ámbar, respirador, placas, guantes, rodilleras y botas |
| Médico | Misma familia de equipo, armadura clara, visor frío y brazalete rojo |
| Perseguidor | Postura encorvada, brazos y manos largos, cara hundida |
| Biológico | Masa asimétrica, ojo central, mandíbula y extremidades |
| Custodio | Coraza pesada, núcleo rojo y pasos articulados |

Diez SVG nuevos en `assets/actors-demo-v1/`: Idle y Walk por actor, ocho filas de dirección y cuatro pasos para caminar. Muestreo al doble de resolución, manteniendo marcos lógicos/anclas y radios anteriores. Animaciones provisionales: frontal/perfil/espalda y reflejos laterales; las diagonales son variantes simplificadas, no animación final independiente. No se incluyen animaciones exclusivas de ataque, muerte o daño; se conserva fallback Idle y destello de daño existente.

`tools/build-trial-art.py` reproduce las hojas y su manifiesto de hashes. Se adaptaron los recursos SVG nativos mediante código; no se usó generación raster ni paquetes externos. Los diez SVG originales en `assets/actors/` se conservan byte por byte. Los recursos nuevos son originales de esta pasada; no copian criaturas concretas ni usan arte externo atribuido incorrectamente. Se conservan licencias/créditos del proyecto.

Pistola, subfusil, escopeta y porra reciben dibujo distinguible, con anclaje ajustado a las manos de los nuevos actores; el origen físico de proyectiles y ataques se conserva. Se muestran ambas copias equipadas, sin cambiar objetivos, daño, cadencia o recursos. La porra no usa fogonazo de pistola. No son accesorios equipables.

Solo T1BC activa esta capa. T1A/B3 y cuentas conservan su presentación anterior; `graficos=clasicos` permite comparar en T1BC. Si una hoja nueva no carga, se intenta el archivo original con sus filas/fotogramas originales. El menú identifica el arte como ensayo y conserva «Desarrollado por Ivan Vivanco».

## Validación y límites

Consultar el registro de validación/publicación adjunto cuando exista. Una captura de galería comprueba presentación, no combate. Las pruebas de navegador usan una alineación congelada de actores para revisar recortes y la demo normal para regresión; no acreditan balance, rendimiento o teléfono físico.

Iván informó que T1BC funciona bien: aceptación general del recorrido anterior; no se convierten BC01–BC12 en pruebas ejecutadas ni se aprueba esta nueva capa de arte por inferencia. Escenarios y efectos definitivos, sonido, catálogo completo y aprobación visual siguen pendientes. T2 fusión/procedural, T3 grieta separada/poderes y T4 ultimate siguen en el plan, sin implementación nueva en esta entrega.

## Resultados locales ejecutados

- source: 215 casos Node, 214 aprobados, 0 fallos, 1 omitidos.
- publication: 215 casos Node, 213 aprobados, 0 fallos, 2 omitidos.
- Build/check aprobados en ambas copias, 96 scripts. Omisiones: servicios P05/emuladores reales; además dependencias Functions ausentes en la copia pública. Worker no publicado.
- Cada copia: cuatro escenarios visuales ×160 poses, 20 recorridos T1BC, 12 T1A y 12 B3 aprobados. Escritorio/táctil emulado, fuente/compilado. Comparación clásica y geometría comprobadas.
- Root inspeccionó la galería y capturas de escena compilada en escritorio/táctil; son alineaciones congeladas para QA, no encuentros naturales.
- Luna max entregó dibujo de armas y prueba, integrados/revisados por root. Otra Luna revisó muestreo/fallback y armas; señaló riesgo condicional de perder animaciones adicionales. Se verificó que los cinco actores existentes solo tienen Idle/Walk, por lo que ninguna animación existente se elimina. Root añadió cobertura de destello y alpha.
- Originales, configuración, dependencias, física y 53 tareas históricas conservados; sin credenciales privadas nuevas. [Registro y hashes](ARTE_ENSAYO_V1_VALIDACION.json).

Publicación: pendiente de recibo verificable de Pages; no inferir despliegue del resultado local.
