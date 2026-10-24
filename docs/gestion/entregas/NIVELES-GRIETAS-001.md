# NIVELES-GRIETAS-001 r1 — recinto, transición y retorno

**24/10/2026 · NIVELES · Entrega documental de implementación para LOT-EST-005 r1.**
Estado: lista para construir y probar; PROGRAMACION es el único integrador del runtime.
No es arte final nuevo aprobado ni evidencia de una corrección ya ejecutada.

## 1. Encargo, decisiones y alcance

Solicitud directa de Iván en NIVELES: «Quiero que soluciones un error con las grietas. Al entrar en una, no nos mete en ella. Tiene que haber un animacion de entrar, dependiendo de la grieta que nos aparzca. El errror es que trato de entrar pero noz me dirije a ningun lado solo hace aparecer un monstruo. Que ademas no es de los aprobado de anomalias».

La coordinación [REV-EST-0007](../REV-EST-0007_GRIETAS.md) y [LOT-EST-005 r1](../lotes/LOT-EST-005-r1.md) encargan completar la experiencia, con parámetros versionados de ensayo. Esta ficha concreta NIVELES sin escribir JavaScript, otras pautas, maestro o control, ni enviar mensajes.

**Aclaración EST-GRI-002 r1:** «Mantener las cinco aprobadas; las diez eran sus variantes gráficas.» La fuente es el registro de ESTRUCTURA citado, no una nueva lectura de todo su hilo. Son cinco identidades BIO, cada una en 16/32. No se buscan ni inventan otras cinco.

| Elemento | Autoridad vigente | Estado de esta entrega |
|---|---|---|
| Seis apariencias y animación ambiental de portal | [NIV-GRI-009 r1 aprobada](../../NIVELES_APROBACION_GRIETAS_ANIMACION_009.md) | Conservar; la transición de absorción de esta ficha es nueva propuesta de ensayo autorizada por el encargo. |
| Cinco BIO, aspecto, animaciones y repertorio de 15 ataques | [Aprobación raster V1](../../ANOMALIAS_SPRITES_V1_APROBACION.md), [ataques V1](../../ANOMALIAS_BIOLOGICAS_ATAQUES_ANIMACION_V1.md) | Integrar los recursos reales, sin sustituirlos por Custodio. El balance requiere perfiles de PROGRAMACION. |
| D1–D5, 50/32/8/7/3; 50/50 en minutos 1–4, desde mapa 2, cap 2 | [Grietas 2.2](../../GRIETAS_DADO_POR_MINUTO_V2.md) | No se alteran ni se convierten en una garantía. |
| Recinto separado, origen congelado, retorno tras reclamar victoria; retirada única de 5 s entre 1–3 min | LOT-EST-005 y grietas 2.2 | Contrato que debe cumplir la corrección. |
| M01 240×160 y cámara vertical 512 | [NIV-ESC-008-A / EST-ESC-001 r1](../lotes/LOT-EST-003-r1.md) | Conservar en el origen y restaurar su perfil de cámara. No reabrir la elección A/B. |
| Tamaño, obstáculos de las cinco salas, transición de 0,70 s e instante/posición de escape | Recomendaciones concretas de esta ficha | **ENSAYO NIVELES-GRIETAS-001 r1**: ajustables tras prueba, no aprobación artística final ni balance final. |

## 2. Causa recuperada y recursos existentes

En el corte local examinado el 24/10, [Expedition.useRift](../../../js/systems/expedition.js) añade G.Content.boss en las coordenadas de la grieta y lo llama Custodio dimensional. [DimensionalRifts.enter](../../../js/systems/dimensional-rifts.js) cambia el estado y muestra el aviso de encuentro en ese mismo mapa. No intercambian el mundo por un recinto propio ni seleccionan BIO-01–05. Esto explica el síntoma; animar solo el dibujo del portal no corrige ese flujo.

Inventario revisado: fichas de grietas y anomalías, cuatro entregas de escenarios de NIVELES y [recursos R7](../../../assets/scenarios/m01-r7/CONTRATO_MODULAR_R7.json). Se localizaron el plano R7 y su arena integrada en el mapa, sus familias y materiales; **no se localizó en estas fuentes un paquete aprobado de cinco recintos independientes de anomalía**. La arena histórica de G.Rift es una mecánica anterior y no acredita estas salas ni el roster BIO.

Reutilizar [materiales-r7-v1.png](../../../assets/scenarios/m01-r7/materiales-r7-v1.png), su [procedencia](../../../assets/scenarios/m01-r7/materiales-procedencia.json), paleta y paredes bajas 2.5D. No editar sus originales ni presentar los planos nuevos como ya aprobados por la validación R7. Las salas de abajo son cinco composiciones de ensayo con materiales existentes.

Verificación documental de entrega, 24/10: existen las rutas de los 90 atlas de cuerpo y 40 atlas FX del catálogo 16/32; el ZIP conserva la huella SHA-256 aceptada 7654794a6fed9cdc0b358a04795555f9ae81c49a7353e4d37f11a6124816e6bd. Esta comprobación acredita disponibilidad/procedencia de recursos, no combate ni colisiones.

## 3. Catálogo de encuentro: correspondencia inequívoca

| Peligro / peso condicionado | Anomalía aprobada | Clave de atlas V1 | Recinto de ensayo |
|---|---|---|---|
| D1 / 50% | BIO-01 — Esporario Blanco | esporario | GR-01 / Sala de cultivo |
| D2 / 32% | BIO-02 — Larva de Vidrio | larva | GR-02 / Galería de observación |
| D3 / 8% | BIO-03 — Malla Tendinosa | malla | GR-03 / Cámara de anclajes |
| D4 / 7% | BIO-04 — Portador de Espinas | portador | GR-04 / Patio de contención |
| D5 / 3% | BIO-05 — Huésped de Cuarentena | huesped | GR-05 / Cámara de cuarentena |

**Claves contrastadas con catalogo.json el 24/10:** esporario, larva, malla, portador y huesped coinciden con nombres y D1–D5 de la tabla. Ambos modos, 16 y 32, contienen Idle, Walk, Run, Jump, Attack1, Attack2, Attack3, Hurt y Death en los cinco modelos. [Catálogo original V1](../../../../design-proposals/anomalias/sprites-v1-20261023/catalogo.json) y [LEEME de recorte](../../../../design-proposals/anomalias/sprites-v1-20261023/LEEME.md). No deducir rutas solo del nombre mostrado; PROGRAMACION conserva sus claves, anclas y duraciones.

Dos ejes independientes:
- portalStyleId: 1–6 elige aspecto y transición.
- dangerTier/anomalyId: D1–D5 / BIO-01–05 elige encuentro y recinto.

Cualquier apariencia puede llevar a cualquiera de los cinco peligros. No asignar por orden la cicatriz a D1 ni convertir la apariencia 6 en D6. Fijar y conservar ambos resultados al generar la grieta; no volver a sortear al tocarla, pausar, entrar o retornar. Mostrar nombre/peligro antes del contacto mediante las señales coordinadas con MENUS.

Si falta un atlas, una IA compatible o un destino válido, registrar un fallo técnico y no generar una sustitución silenciosa ni cambiar los pesos. Validar los cinco destinos antes de ofrecer el sistema completo; una práctica reducida debe identificarse como tal.

## 4. Entrada: contacto → transición → recinto

**Un único contacto confirmado inicia el traslado lógico inmediatamente**, sin botón, confirmación, barra de canalización o exigencia de permanecer quieto. La animación presenta ese traslado; no vuelve a decidir si la entrada es válida.

1. Resolver solapamiento real y línea libre con la grieta abierta. Comprobar destino y recursos antes de consumir la entrada.
2. Marcar la entrada como consumida y bloquear una segunda activación. Congelar el origen en ese mismo tick, antes de actualizar enemigos, disparos o premios del mapa.
3. Iniciar transición según portalStyleId conservado. Propuesta común: **0,70 s de tiempo de transición**, pausables, sin sumar al reloj del mapa ni al del combate del recinto.
4. Recomendación de composición: 0–0,22 s absorción; 0,22–0,48 s máscara de cruce; intercambio de mundo en 0,35 s; 0,48–0,70 s revelado. Al acabar, aparece el nombre BIO y el peligro, y empieza el reloj del recinto.
5. Conservar vida, armas, munición, mejoras y controles del jugador. Mantener la intención del joystick/tecla sostenidos al terminar, sin exigir volver a pulsarlos. Durante la transición no hay desplazamiento ni combate; no es una invulnerabilidad utilizable en el mapa.
6. El personaje aparece sobre suelo libre y con espacio de giro. Anomalía y amenazas no ejecutan ataques antes de terminar el revelado. La primera señal empieza después, con anticipación comprobable.

| Apariencia aprobada | Movimiento de entrada propuesto para el ensayo | Profundidad y legibilidad |
|---|---|---|
| 01 Cicatriz carmesí | El desgarro se ensancha; filamentos y chispas convergen al núcleo; la silueta del actor se estrecha al cruzar. | Sombra de pies permanece anclada; borde delantero tapa progresivamente al actor. Sin fogonazo rojo de pantalla. |
| 02 Pliegue amarillo | Las caras del papel se abren hacia lados opuestos y se cierran tras el actor; el recinto se revela entre ambos pliegues. | Cara lateral oscura, cara frontal iluminada; suelo y sombra conservan orientación. |
| 03 Fractura prismática | Los fragmentos se apartan en diferentes profundidades y vuelven a converger detrás del actor. | Fragmentos traseros/delanteros; ninguna esquirla decorativa causa daño ni se confunde con proyectiles. |
| 04 Fisura orgánica | Las fibras se separan mediante una contracción lenta y cierran el paso detrás del actor. | Cuerpo de fibra, luz interior y sombra de base separados; sin recolorear el sprite del personaje. |
| 05 Horizonte negro | Órbitas se curvan hacia el óvalo, comprimen gradualmente la silueta y revelan el recinto desde el centro. | Lente vertical con elipse de contacto en el suelo; sin mover la cámara de forma brusca. |
| 06 Interferencia espectral | Bandas discretas desplazan partes de la máscara de cruce y recomponen al actor al otro lado. | Desfase localizado del umbral; no deformar todo el HUD, no estrobo ni pérdida de avisos críticos. |

Con menos destellos, reducir desplazamiento, partículas y contraste; preferir un fundido suave de 0,35 s conservando la misma atomicidad. No añadir audio nuevo no aprobado: SONIDO decide el recurso, y su ausencia no bloquea el traslado. El retorno reutiliza el motivo del portal en sentido inverso.

## 5. Cinco recintos: geometría concreta de ensayo

**Convención común r1:** 48×36 casillas de 32 unidades, origen (0,0) arriba a la izquierda. Límites sólidos de dos casillas; suelo interior x=2…45, y=2…33. Las coordenadas siguientes son casillas; un punto (tx,ty) se coloca en el centro, ((tx+0,5)×32, (ty+0,5)×32).

- Entrada del jugador: **(24,29)**. Centro inicial de la anomalía: **(24,12)**.
- Retorno de victoria: **(24,29)**, inactivo durante el combate y habilitado solo al confirmar el premio. No reciclarlo como retirada anticipada siempre abierta.
- Mantener libres la aproximación de llegada x=20…28/y=26…32 y el eje de lectura inicial. Un NPC, si corresponde, ocupa un punto válido cercano que no obstruya esa aproximación.
- Los sólidos se expresan como [x,y,ancho,alto]; ocupan x…x+ancho−1 y y…y+alto−1.
- Paredes bajas y objetos de borde; nada de decoración sólida adicional dentro del corredor reservado.
- Ancho nominal mínimo de seis casillas en los pasos laterales de estos planos. PROGRAMACION debe comprobar el barrido del jugador, cuerpo real de cada BIO y formas de ataque: estas cifras no certifican navegación física.

| Sala / revisión | Sólidos interiores exactos | Diferenciación con recursos existentes |
|---|---|---|
| GR-01 r1 | [8,8,2,2]; [38,8,2,2]; [8,26,2,2]; [38,26,2,2] | Plaza de cultivo con cuatro pilares bajos, alfombra marfil y luz amarilla tenue; restos decorativos de raíces solo en el borde. |
| GR-02 r1 | [9,10,3,8]; [36,18,3,8] | Dos módulos de observación alternados y centro amplio. Material gris verdoso de servicios; contraste suficiente para ver la cápsula y el charco. No introducir cristal sólido invisible. |
| GR-03 r1 | [9,8,2,2]; [37,8,2,2]; [9,26,2,2]; [37,26,2,2] | Cuatro bases de anclaje y perímetro marcado; iluminación lateral. Los nodos de los ataques son independientes de estos pilares y no se convierten en paredes. |
| GR-04 r1 | [8,10,2,6]; [38,20,2,6] | Tabiques de borde escalonados y recta central larga para leer carrera/frenado. Paredes ocres, sombras más marcadas, centro sin mobiliario. |
| GR-05 r1 | [8,8,3,3]; [37,8,3,3]; [8,25,3,3]; [37,25,3,3] | Cuatro islas periféricas y cámara central amplia; materiales de contención gris/ocre. Reutilizar luz/sombra existente; símbolos de peligro de brotes deben destacar sobre el suelo. |

Estas cinco salas no son M01 reducidos ni alteran sus dimensiones. Dentro del recinto puede usarse un perfil propio de cámara que conserve las proporciones del actor y permita leer los avisos; al volver restaurar el perfil del origen, incluido móvil vertical 512. La resolución 16/32 cambia la textura, no las colisiones ni el tamaño de mundo.

Si un cuerpo real no cabe con margen en un paso de seis casillas, PROGRAMACION debe ampliar ese paso/recinto de ensayo y registrar la revisión; no encoger al BIO, hacerlo atravesar la pared ni alterar M01 para ocultar el problema.

### Respuesta espacial a los quince ataques

| Sala | Requisitos para sus tres ataques aprobados |
|---|---|
| GR-01 / Esporario | E1: cono con salida lateral por ambos lados. E2: círculo de llegada no toca toda la anchura útil; raíces de vuelo decorativas. E3: sector corto, con arco exterior libre. Atacar de uno en uno, recuperación completa. |
| GR-02 / Larva | L1: charco limitado y ruta lateral fuera de su contorno. L2: círculo de salto distinto de los charcos activos. L3: corredor fijado y dos opciones laterales; pared termina la carrera. Una galería no puede quedar cerrada simultáneamente por charco y sólido. |
| GR-03 / Malla | M1: líneas por turnos con abertura transitable; nunca una malla que cierre todo. M2: llegada no ocupa la ruta libre de M1; tendones de traslado decorativos. M3: ambos trazos anunciados, paso libre fuera de la V. Los cuatro pilares no son excusa para obligar al jugador a cruzar una línea activa. |
| GR-04 / Portador | P1: huecos entre espinas suficientemente anchos para el cuerpo real. P2: eje central y freno antes de la pared; evasión lateral hacia ambos lados. P3: círculo/sector marcado sin cerrar el único rodeo del tabique; recuperación con mano clavada. |
| GR-05 / Huésped | H1: brotes numerados por turnos y una ruta continua entre ellos. H2: aterrizaje fuera de brotes aún activos, sombra visible y sin salto fuera de cámara. H3: abanico limitado y sector de escape libre. Posponer el siguiente ataque si la combinación encierra al jugador. |

Regla comprobable de evasión: desde la posición al fijar el aviso, debe existir una ruta a suelo seguro, inflada por el radio real del jugador, cuya longitud a velocidad base más margen de reacción sea inferior a la anticipación efectiva. Para ensayo se recomienda **margen de reacción de 0,25 s**, sujeto a prueba en móvil. Si no hay ruta, acortar/posponer el ataque o elegir otro destino; no conceder daño inevitable ni exigir sprint, salto, arma o poder concreto.

No se fijan aquí HP, daño, velocidad final, alcance de ataque ni duración de charco. PROGRAMACION debe versionarlos en su perfil de ensayo y revisar la desigualdad anterior junto con PERSONAJES; no heredar el pulso del Custodio bajo un sprite BIO.

### Comprobación nominal ejecutada para esta ficha

Recorrido BFS de cuatro vecinos sobre las casillas libres, sin ataques ni actores, con los rectángulos anteriores y borde sólido de dos casillas:

| Recinto | Casillas libres | Alcanzables desde entrada | Zonas aisladas | Casillas libres con menos de dos vecinos |
|---|---:|---:|---:|---:|
| GR-01 | 1.392 | 1.392 | 0 | 0 |
| GR-02 | 1.360 | 1.360 | 0 | 0 |
| GR-03 | 1.392 | 1.392 | 0 | 0 |
| GR-04 | 1.384 | 1.384 | 0 | 0 |
| GR-05 | 1.372 | 1.372 | 0 | 0 |

La ruta nominal entrada→centro inicial de BIO tiene 17 pasos/544 unidades en los cinco planos. No es una prueba de partida, capacidad de hordas, dos caminos disjuntos, colisiones de cuerpos grandes ni evasión con peligros. La comprobación geométrica real y las capturas pertenecen a PROGRAMACION.

## 6. Mundo de origen congelado y restauración íntegra

Guardar una instancia aislada antes de entrar, no llamar a una regeneración del mapa al volver:

- Identidad del mapa/semilla/revisión, terreno, sólidos, decoración rota/dañada, fixture y perfil de cámara.
- Enemigos vivos, cadáveres todavía visibles, IDs, HP, posiciones, IA, temporizadores, avisos y minions; no borrar la horda del origen ni recrearla con HP completo.
- Proyectiles, efectos y peligros activos con edad/tiempo restante congelados; no avanzarlos usando la hora de pared al retornar.
- Cofres, premios, descubrimiento, progreso de apertura, terminales y objetos recogibles.
- Reloj del mapa, aparición de jefe, puerta/apoyos, enfriamientos/contadores del origen y estado exacto del director: oportunidades consumidas y cupo de grietas. Sin tiradas desde el reloj del recinto.
- Posición de entrada del jugador y puntos libres de retorno comprobados al entrar. El portal usado conserva su consumo.

La vida, munición, armas, poderes y consecuencias legítimas del combate del jugador dentro del recinto se conservan al volver: no restaurar una copia anterior del jugador para curarlo o recuperar balas. Separar esa continuidad del estado inmóvil del mundo de origen. No restaurar el reloj global de forma que duplique efectos o revierta tiempos del jugador; usar un reloj propio de encuentro.

El stash heredado de EnemyMgr es una referencia técnica, no prueba de cumplimiento: la versión revisada descartaba cadáveres y no guardaba por sí sola proyectiles, pickups o terreno. PROGRAMACION elige el mecanismo y comprueba todos los grupos anteriores. Reiniciar, salir al menú o morir debe limpiar también el origen suspendido para no recuperarlo en otra partida.

## 7. Retirada anticipada y retorno de victoria

Regla aprobada: una única retirada anticipada con ventana de **5 s** entre los minutos **1 y 3 del recinto**. No añadir huida permanente ni botón de abandono gratuito.

**Recomendación mínima r1:** anunciar a t=117 s del reloj activo del recinto, abrir a t=120 s y cerrar a t=125 s. Es un parámetro de ensayo nuevo; si el combate termina antes no es obligatorio esperar esa ventana para reclamar victoria.

El aviso de t=117 s anuncia la proximidad de la ventana, sin fijar aún una coordenada. **Al abrir a t=120 s**, elegir una casilla libre por camino real de hasta **192 unidades desde la posición actual**, con radio del jugador y margen del umbral incluidos. Así un sprint entre aviso y apertura no deja la salida atrás. Probar primero candidatos a 128–192 unidades; si no hay, ampliar la búsqueda hacia posiciones más próximas seguras. Fijar esa posición durante los cinco segundos; el portal no sigue al jugador.

Reservar acceso y entorno del portal desde su apertura hasta el cierre: no colocar allí sólidos, NPC ni un ataque nuevo. Elegir fuera de peligros ya activos y no generar una pared de peligros entre jugador y salida. Si no se encuentra un punto seguro/reachable, registrar defecto de construcción y corregirlo antes de validar el recinto; no mostrar un portal inaccesible ni inventar una segunda ventana. La prueba debe incluir zonas ocupadas/peligrosas, no solo un cuarto vacío.

- Tocar el portal durante [120,125) inicia retorno sin botón; consume definitivamente la única retirada. Sin premio de victoria.
- Ignorar la ventana la consume al expirar. Pausa/cartas no acortan sus cinco segundos.
- Vencer a la anomalía habilita su recompensa según ESTRUCTURA. El retorno de victoria se inicia **después de confirmar la reclamación**, conservando el sistema real de entrega y elección; no dar premio por entrar ni por tocar el portal.
- Propuesta de presentación de victoria: al confirmar la reclamación, el umbral de llegada se reactiva visualmente y ejecuta la transición inversa con retorno automático. No obligar a encontrar un segundo portal lejano después de reclamar. Es comportamiento de ensayo explícito, no una extracción de fin de partida.
- Retornar al punto de contacto guardado o, si no es físicamente válido, al punto libre más próximo de sus candidatos guardados. Sin salto al inicio del mapa, sin cambiar de sector ni reactivar la grieta.
- Muerte termina la expedición. No regresar vivo ni conceder el premio. Victoria/retirada no duplican cofres, poderes o tickets; repetir un evento debe devolver el mismo resultado.

## 8. Contrato mínimo de datos para el integrador

Una aparición fija: encounterId único, originMapId/seed/revision, portalStyleId(1–6), dangerTier(D1–D5), anomalyId(BIO-01–05), roomId(GR-01–05), roomRevision(r1), retorno/puntos válidos, sorteo NPC/equipo ya resuelto y estado de consumo.

Una sesión de recinto mantiene: relojActivoPropio, fase(entrada/combate/recompensa/retorno/terminada), transición visual con motivo fijo, HP/estado real del BIO, retirada(programada/abierta/consumida/expirada), premio e idempotencia. No guardar un nuevo tier a partir de la resolución 16/32.

La vuelta debe conservar el mismo encounterId consumido. Una segunda grieta posterior requiere otra aparición válida y cupo; nunca reusar el umbral del primer encuentro como otra oportunidad.

NPC: conservar tasas y límites de [COMPANERO_CONTENCION_GRIETAS](../../COMPANERO_CONTENCION_GRIETAS.md); posición segura próxima a la entrada, fuera de la ruta del jugador. No llevarlo al origen ni sustituirlo por un minion enemigo. Burbujas y sonido se coordinan con MENUS/SONIDO, sin detener la creación del recinto.

## 9. Pruebas que exige la entrega de PROGRAMACION

1. Contacto real desde la entrada habitual: una activación, transición específica, fixture distinto y BIO identificado. No aceptar solo cambio de texto/filtro o un enemigo aparecido en el origen.
2. Matriz de **6 apariencias × 5 peligros × 2 resoluciones** con controles QA explícitos: 60 combinaciones. El forzado de prueba no cambia los pesos naturales ni crea D6.
3. Para cada BIO, verificar sus tres patrones y señales con sus atlas aprobados. Ningún Custodio, sprite heredado o IA genérica debe sustituirlo silenciosamente.
4. Snapshot del origen antes/después de combate, retirada y victoria: misma horda/HP/timers, disparos, cofres, director, jefe/puerta y reloj; solo cambian los consumos/premios legítimos del encuentro.
5. Entrada inmediata a 44,99 s, expiración de 45 s, contacto repetido/mantenido, intento de segunda entrada, pausa durante la transición y antes/después del intercambio de mundo.
6. Retirada [120,125), proximidad y accesibilidad reales, expiración única, victoria antes de 120 s, muerte y reinicio. Premio único y retorno solo tras reclamación confirmada.
7. Comprobar rutas de evasión reales con obstáculos, peligros y NPC presentes, en móvil vertical/horizontal y PC; sin avisos ocultos ni colisiones transparentes.
8. Recurso faltante: no reemplazar por Custodio, no hacer reroll del tier y no fingir éxito. Registrar el fallo con encounterId y recurso.
9. Restaurar escala M01 240×160/cámara vertical 512 y proporciones de actor. Volver a la coordenada guardada, no a una plantilla nueva.
10. Actualizar la práctica B3 que antes mostraba Custodio y sus tests/avisos: debe atravesar el mismo flujo del juego habitual. Los tests antiguos de permanencia en el mismo mapa son regresión de la limitación sustituida, no requisitos que deban conservarse.

## 10. Consumo, pendientes y evidencia

**Implementador único: PROGRAMACION**, coordinado por Juanillo. NIVELES entrega esta especificación y enlaza resultados desde [REGISTRO_IMPLEMENTACION](../REGISTRO_IMPLEMENTACION.md). No mantiene otra lista de qué está implementado/publicado.

Pendientes de ensayo: aceptación visual de las nuevas composiciones/transiciones cuando se muestren, ajuste de geometría a los cuerpos y ataques, validación de retorno/retirada y magnitudes de combate versionadas por PROGRAMACION. Ninguno requiere reaprobar contacto, independencia de apariencias/tiers, roster de cinco BIO o congelación del origen.

Esta entrega no modifica runtime, no ejecuta partidas y no publica el juego. El cierre del error requiere la evidencia del juego navegable exigida por LOT-EST-005.
