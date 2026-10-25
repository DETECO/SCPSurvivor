# PERSONAJES-GRIETAS-001 · Manifiesto para ESTRUCTURA

24/10/2026 · PERSONAJES · Revisión 1. Entrega documental solicitada por Juanillo para LOT-EST-005 r1. Sin cambios de código, maestro, CONTROL_CAMBIOS, arte original ni publicación. [Pauta del área](../../areas/PERSONAJES.md).

## Resultado y discrepancia

**Cantidad aclarada por Iván — EST-GRI-002 r1, 24/10:** «Mantener las cinco aprobadas; las diez eran sus variantes gráficas.» Verificado en [CONTROL_CAMBIOS](../CONTROL_CAMBIOS.md) y [LOT-EST-005 r1](../lotes/LOT-EST-005-r1.md), solo consultados. **Hay cinco identidades BIO aprobadas:** cinco seres × dos resoluciones = diez variantes gráficas. [La aprobación raster](../../ANOMALIAS_SPRITES_V1_APROBACION.md) enumera los cinco y conserva el ZIP aceptado. Discrepancia cerrada: integrar estas cinco, sin buscar ni inventar otras cinco.

Además existen tres enemigos anteriores aprobados: Perseguidor, Biológico y Custodio. Son otro conjunto de personajes, no BIO-06–10, ni cinco anomalías adicionales. No tienen reparto D1–D5 aprobado. El Custodio de práctica no sustituye silenciosamente al encuentro biológico elegido.

## Manifiesto de anomalías aprobadas

Raíz **B**, relativa al directorio padre de SCP-SURVIVOR: `design-proposals/anomalias/sprites-v1-20261023/`. [Catálogo exacto](../../../../design-proposals/anomalias/sprites-v1-20261023/catalogo.json) · [Entrega y aprobación](../../ANOMALIAS_SPRITES_V1_ENTREGA.md) · [Tres ataques y comportamiento](../../ANOMALIAS_BIOLOGICAS_ATAQUES_ANIMACION_V1.md).

| Identidad | ID en el catálogo | Tier / peso entre grietas | Attack1 / Attack2 / Attack3 |
|---|---|---|---|
| BIO-01 Esporario Blanco | `esporario` | D1 / 50% | Abanico de esporas / Brinco de raíz / Latigazo rasante |
| BIO-02 Larva de Vidrio | `larva` | D2 / 32% | Cápsula de fluido / Salto de resorte / Carrera de cuchillas |
| BIO-03 Malla Tendinosa | `malla` | D3 / 8% | Líneas de tensión / Salto de anclaje / Tijera orgánica |
| BIO-04 Portador de Espinas | `portador` | D4 / 7% | Salva en abanico / Embestida de hombro / Salto de estaca |
| BIO-05 Huésped de Cuarentena | `huesped` | D5 / 3% | Brote de cuarentena / Salto de masa / Barrido de membrana |

- Ruta corporal: `B/{16|32}/{id}/{acción}.png`. Columnas = fotogramas; filas = **S, SE, E, NE, N, NW, W, SW**. Frente = S. Cada celda es exactamente 16×16 o 32×32; mismo tamaño lógico de entidad entre modos.
- Secuencias: **Idle 6, Walk 8, Run 8, Jump 14, Attack1 12, Attack2 14, Attack3 12, Hurt 3, Death 8** fotogramas por dirección. Excepción: **Portador Attack3 tiene 14**, porque es su salto. Attack2 es el salto propio en los otros cuatro; Jump permite acceder a él por separado.
- Ancla corporal de catálogo: **16 → (8,14); 32 → (16,30)**. No usar el ancla de los personajes anteriores.
- Jump y los tres ataques incluyen `acción-FX.png`. Celdas FX **48×48 / 96×96**, anclas **(24,24) / (48,48)** sobre el mismo punto del suelo. No ampliar el cuerpo a ese tamaño ni convertir todo el rectángulo FX en daño.
- El salto ya lleva elevación rasterizada; `heightTimeline` la describe, no volver a sumarla al dibujar. Walk/Run son ciclos en el sitio: mover la entidad mediante su física. Las duraciones de catálogo son de previsualización, no balance ni señales jugables finales.
- **Disponibilidad verificada ahora:** 90 atlas corporales y 40 FX, dimensiones y hashes coincidentes con VERIFICACION.json. ZIP aceptado SHA-256 `7654794a6fed9cdc0b358a04795555f9ae81c49a7353e4d37f11a6124816e6bd`, sin cambios. [Comprobación acotada de esta entrega](PERSONAJES-GRIETAS-001-verificacion.json).

## Conjunto anterior conservado

[Aceptación explícita 22/10](../../PERSONAJES_APROBACION_2026-10-22.md): Guardia, Médico, Apoyo amarillo, Perseguidor, Biológico y Custodio. La primera exploración `personajes-v2-20261022` y la exportación `personajes-pixel-16-32-20261022` representan esos mismos actores; no suman otro catálogo de seres.

Raíz **L**: `design-proposals/personajes-pixel-16-32-20261022/`; copia de juego existente `SCP-SURVIVOR/assets/personajes-20261022/`. [Catálogo](../../../../design-proposals/personajes-pixel-16-32-20261022/catalogo.json) · [Integración previa y límites](../../PERSONAJES_INTEGRACION.md).

| Actor / identidad histórica | ID de atlas | Uso recuperado |
|---|---|---|
| Perseguidor / pursuer01 | `perseguidor` | Enemigo regular; sin tier de grieta asignado |
| Biológico / biological01 | `biologico` | Enemigo regular distinto de las cinco BIO |
| Custodio / warden01 | `custodio` | Jefe y sustituto de ensayo anterior, no nueva BIO |
| Apoyo amarillo / support01 | `apoyo` | Aspecto aprobado de apoyo masculino; dos instancias en puerta no son dos modelos |

Contrato L: `L/{16|32}/{id}/{acción}.png`; **Idle(1), Walk(4), Attack(4), Hurt(2), Neutralized(2)**, ocho filas direccionales en el mismo orden. Anclas **(8,15)/(16,31)**. El apoyo incluye `Partes.png` y metadatos de piezas para brazos y arma independiente; no pintar una pistola fija sobre el cuerpo. Guardia y Médico también están aprobados, pero no son anomalías ni aumentan el catálogo de grietas.

## Compañeras: aprobación recuperada y bloqueo técnico real

Fuente humana concreta de PERSONAJES: mensaje **`msg_01a1697b-bb4c-7cc0-b2a8-a72056e8cde0`**, 23/10/2026 15:57:58.988 UTC: **«acepto estos diseños, tener las 3 alternativas disponibles, puedes desarrollar el diseño final de cada modelo.»** Se verificó en el registro local de este hilo. Acepta las tres siluetas y encarga producirlas; no se encontró una aceptación posterior específica de su ZIP final en esta consulta. La aceptación raster BIO no se extiende a ellas.

Raíz **F**: `design-proposals/companeras-contencion-modelos-finales-20261023/`; modelos **delgada, fitness, curvy**. [LEEME y alcance](../../../../design-proposals/companeras-contencion-modelos-finales-20261023/LEEME.md) · [catálogo](../../../../design-proposals/companeras-contencion-modelos-finales-20261023/catalogo.json). Fuentes generadas y 30 atlas existentes: `F/{modelo}/{16|32}/{acción}.png`, ocho direcciones y las cinco acciones de L. No son anomalías ni personalidades adicionales.

**No marcar los atlas animados F como integrables todavía.** Inspección de `delgada/32/Walk.png` y lectura del exportador: en `exportar-modelos.cjs`, línea 26, `tile.copy(...)` copia la celda completa como bloque contiguo en un atlas cuyo ancho contiene varios fotogramas, sin intercalar cada fila según ese ancho. El resultado mezcla franjas dentro de las celdas. Afecta **24 hojas**: Walk, Attack, Hurt y Neutralized × tres modelos × dos resoluciones. Las seis Idle, con una columna, no sufren este error. Tener dimensiones correctas o cuatro hashes diferentes no demuestra siluetas correctas.

Las fuentes intactas permiten reexportar; esta entrega **no repara** generadores ni reemplaza PNG. Además falta un ancla explícita en el catálogo F y un contrato de agarres/piezas del arma: el exportador alinea la base en `n−1`, pero esa derivación técnica debe verificarse al corregirlo, no confundirse con metadatos ya entregados. No hay `Partes.png` equivalente al apoyo masculino en F. No ligar complexión a daño, personalidad o probabilidades.

Las frases «Iván diseñará los sprites» de COMPANERO y bancos V1/V2 son un estado anterior: se añaden notas de actualización con este hallazgo, sin borrar el historial. Falta corrección y validación de los atlas femeninos, **no todos sus dibujos de origen**. El NPC amarillo anterior puede avanzar sin este bloqueo.

## NPC de grieta y bancos de diálogos

[Reglas del compañero aceptadas](../../COMPANERO_CONTENCION_GRIETAS.md): máximo un NPC temporal por recinto y tirada única **33% D1–D4 / 10% D5**. D1–D3 arma Normal básica compatible; D4 Rara/Épica 50/50; D5 Legendaria compatible. Reserva finita, arma no transferible, sin remate del jefe, posible incapacitación sin rescate obligatorio; no llevarlo al origen. No confundirlo con los dos apoyos de la puerta o la brecha exterior propuesta.

| Banco / recurso | Contenido y aceptación | Contrato conservado |
|---|---|---|
| [V1](../../DIALOGOS_COMPANEROS_GRIETA_V1.md) | 102 IDs únicos; redacción aprobada el 23/10 | Arma propia/equipada/ataque observado, escenario real, peligro, victoria, recuerdos y alternativa sin alias |
| [V2](../../DIALOGOS_PERSONALIDADES_COMPANEROS_V2.md) | 280 IDs de personalidad + 12 PRES = **292 IDs únicos**; redacción y presentaciones aprobadas | SARC, ENOJ, ENTU, CARI, SIMP, SERE, NERV, ANAL, TOXI, AMOR, COQ, FRIA, AGRE, GRUN; no ligarlas al género |

Son **394 IDs entre ambos bancos**, más alternativas redactadas fuera de tablas. No tratar las líneas como una secuencia obligatoria ni contar una personalidad como otro NPC. Las cuatro biografías propuestas ALERCE/TORNO/FARO/BRUMA no son cuatro skins o capacidades; conservar sus recuerdos sin mezclarlos.

Burbujas de texto ligadas al NPC, sin locución; prioridad de ataques/retirada, identidad y personalidad estables, marcadores resueltos. Si falta alias o condición de arma/escenario, usar alternativa compatible sin inventar hechos. D5 usa miedo/deseo de volver, **no huida mecánica**. Una presentación ocupa la llegada, no añadir otra bienvenida inmediatamente.

## Pendientes y datos de ensayo, sin convertirlos en reglas finales

- **Cantidad resuelta por EST-GRI-002 r1:** conectar las cinco BIO; no crear BIO-06–10, normalizar una tabla nueva ni sustituir el tier por un enemigo anterior. Los perfiles numéricos pendientes pueden concretarse como ENSAYO versionado para cumplir LOT-EST-005, sin pedir reaprobar las mecánicas ya aceptadas.
- **BIO:** vida, daño, radios, velocidades, intervalos, tiempos jugables, duración de charcos/filamentos y geometría de salas. Fijar perfiles versionados de ensayo y comprobar rutas de evasión. No derivar física del tamaño de textura, ni el golpe del fotograma de un GIF sin contrato de combate.
- **NPC:** lista concreta de armas compatibles y perfiles reales de cada rareza, daño/munición finita, vida, aggro e incapacitación. No anunciar Legendaria solo mediante texto ni reutilizar las estadísticas de un arma del jugador sin límite.
- **Femeninos:** reexportar las 24 hojas defectuosas, validar sus recortes/siluetas, completar anclas y montaje de arma. Diseños aprobados y fuentes recuperados; uso directo de los atlas actuales bloqueado por el fallo descrito.
- **Texto:** hay bancos Markdown aprobados, no un selector de diálogos o JSON de runtime certificado. Nombres aleatorios/presentación son requisitos; las listas exactas, sorteo y cadencias permanecen como propuestas/ensayo. V1 propone 20–35 s, máximo tres ambientales/minuto y un recuerdo/recinto; alias 60 s/dos por encuentro. No elevar esos números a norma final por esta entrega. FARO/Bruno requiere conservar la distinción persona/perro.
- **Sonido del NPC:** recurso característico todavía no entregado; no bloquea burbujas silenciosas ni autoriza añadir locuciones. Consultar SONIDO para el estado posterior.
- **Recinto, retorno, ventana de retirada y premios/poderes:** responsabilidad del lote de ESTRUCTURA y PROGRAMACION; no quedan implementados ni parametrizados aquí.

## Cobertura y entrega

Se leyeron fichas BIO/aceptación/entrega/ataques, catálogos y recursos actuales, aprobación de los seis personajes previos, bancos V1/V2 y reglas del NPC, LEEME/catálogo/exportador femeninos, índice maestro y LOT-EST-005 solo como referencia. Se recuperó el mensaje humano concreto de aceptación femenina. No es una revisión completa de todos los historiales ni una comprobación de la demo pública.

Se comprobaron ahora dimensiones y hashes de los 130 atlas BIO, hash del ZIP aceptado y dimensiones de los 30 atlas F; se detectó el fallo de montaje F que la dimensión no revela. El [JSON de evidencia](PERSONAJES-GRIETAS-001-verificacion.json) conserva el alcance y hashes de catálogos/textos. Se añadieron notas de actualización histórica a COMPANERO y bancos V1/V2, sin reescribir sus diálogos; [patch documental](PERSONAJES-GRIETAS-001.patch). No se ejecutó ni modificó el runtime, no se publicaron archivos y no se enviaron mensajes a otros hilos. Juanillo recoge esta entrega.
