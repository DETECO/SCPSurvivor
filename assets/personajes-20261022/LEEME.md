> Copia del LEEME de la entrega de diseño. El estado de integración actual está en [PERSONAJES_INTEGRACION.md](../../docs/PERSONAJES_INTEGRACION.md); el apartado Estado de abajo describe la entrega original del visor.

# SCP Survivor — personajes y animaciones en 16×16 y 32×32

22 de octubre de 2026. Entrega local para revisión de Iván. Abrir `index.html` con doble clic o en el navegador. No requiere instalar dependencias para usar el visor.

## Incluido

- Seis actores en cada modo: Guardia, Médico, Apoyo de contención amarillo, Perseguidor, Biológico y Custodio.
- Cada variante contiene `Idle.png`, `Walk.png`, `Attack.png`, `Hurt.png` y `Neutralized.png`.
- Ocho direcciones por animación: frente, diagonal frontal derecha, derecha, diagonal posterior derecha, espalda, diagonal posterior izquierda, izquierda y diagonal frontal izquierda.
- En las hojas exportadas, cada fila corresponde a una dirección y cada columna a un fotograma. Cada celda mide exactamente 16×16 o 32×32, según carpeta.
- Reposo: 1 fotograma. Paso: 4. Ataque base: 4. Impacto: 2. Neutralización/caída: 2. Hay poses y transiciones reutilizadas; estas cifras no significan dibujos únicos para cada instante.
- Humanos con `Partes.png`: torso, piernas, cuatro fases seleccionadas de paso, componentes de brazos/manos y pose de caída, junto con sus rectángulos en los metadatos.
- Dos hojas `Armas.png` con las seis representaciones de prueba: pistola, porra, katana, pistola láser, escopeta y lanzamisiles. El cuerpo no lleva una pistola fija.
- Galería comparativa y escena de apuntado a 360 grados con ambos ayudantes amarillos junto a una puerta de referencia.
- `catalogo.json` y `catalogo.js`: geometría, anclas, filas, fotogramas, duraciones, paletas y rutas. `motor-pixel.js` demuestra el montaje modular sin cambiar el juego.
- GIF de caminar y ataque que recorren las ocho direcciones para cada variante, y `COMPARACION.png` como vista estática ampliada.

## El apoyo amarillo

Se incorpora el aspecto pedido por Iván: traje de protección amarillo, capucha, máscara de gas negra, guantes y botas negras y equipo de aire en la espalda. Es un modelo de apoyo instanciado dos veces, identificado como A1/A2 en el visor; no se añade por inferencia un nuevo soldado jugable o habilidad.

La escena ilustra la llegada de los dos apoyos. Al activar «Jefe visible», uno regresa por la puerta y el otro permanece. Esto representa la regla consultada en ESTRUCTURA y el comportamiento de `map-trial.js`. El ensayo no ejecuta el combate real ni valida daño, XP, remate, rutas, balance o rendimiento.

## Resolución, estilo y origen

Se generaron doce fuentes independientes mediante Image Gen: una por actor y por modo. El modo 16 tiene su propia fuente simplificada; no se obtiene reduciendo el PNG final de 32. Las fuentes de alta resolución se conservan sin modificar en `fuentes/16` y `fuentes/32`, con su procedencia en `SOURCES.json` y sus instrucciones exactas en `PROMPTS.json`.

Después se hizo una exportación técnica: selección de celdas, muestreo por vecino más cercano, ensamblado modular, transparencia binaria y paleta limitada. Los PNG de personaje usan como máximo 12 colores opacos en 16 y 20 en 32, además de transparencia. Esta conversión asegura dimensiones y píxeles discretos; no equivale a una limpieza artística manual aprobada.

Algunas fuentes tienen siete filas en lugar de las ocho solicitadas. Se identificaron sus límites reales; cuando falta una fase de paso se reutiliza una pose neutra dentro del ciclo. Los metadatos registran la selección. Las poses de las criaturas siguen siendo propuestas y pueden necesitar corrección de lateralidad, consistencia de volumen y silueta. La neutralización utiliza una postura baja o de caída; no representa necesariamente una muerte y no atribuye reglas nuevas a SCP concretos.

## Armas y movimiento

Las piernas siguen el desplazamiento y el torso tiene ocho vistas. El arma y sus agarres se orientan con un ángulo continuo; los brazos se enlazan entre hombros y manos. La escena muestra seis familias de arma y conserva el mismo tamaño aparente al cambiar entre 16 y 32.

El ataque de las hojas humanas es una pose base sin arma pintada. Los golpes y disparos de cada familia se muestran mediante el montaje del visor. No se incluyen todavía recargas finales por arma ni toda la combinación de dos armas simultáneas establecida en ESTRUCTURA; esta escena revisa una instancia de arma por actor. No cambia ese límite ni los comportamientos del ejecutable.

## Referencias consultadas

- Hilo PROGRAMACION `01a13aeb-020a-7d62-8256-3d42a6e61877`, dos turnos recientes consultados el 22/10/2026.
- Hilo ESTRUCTURA `01a1457c-c051-73d2-9864-e7deb6435420`, tres turnos recientes consultados el 22/10/2026. Reglas de apoyo: dos compañeros; ante jefe vivo visible, uno huye y otro ayuda sin remate; bajas aliadas sin XP.
- `SCP-SURVIVOR/AGENTS.md`, `js/systems/map-trial.js`, documentación de arte y decisiones de la copia local.
- Rediseños detallados de `personajes-v2-20261022`, conservados como referencias de identidad.
- Instrucción actual de Iván: resolución 16/32 y ayudantes con traje amarillo de estilo Backrooms.

Se conservan los tres enemigos originales del juego sin asignarles números SCP. Arte asistido por IA para revisar el videojuego; no preparado para publicar en SCP Wiki.

## Estado

Recursos y visor local entregados. Pendientes la aceptación visual, la limpieza manual final de píxeles, las poses específicas de cada arma y la integración con el juego y su configuración gráfica. No se modificaron fuentes del ejecutable, colisiones, estadísticas, cuentas, progresión ni publicación de GitHub. `sources/` del proyecto permanece como referencia de solo lectura.

`exportar-pixel.cjs` permite reproducir la exportación en el entorno local de Codex usado para esta entrega. Los PNG y el visor funcionan sin ese entorno. La verificación de dimensiones, alfa, paletas, recortes y ZIP se conserva en `VERIFICACION.json`.
