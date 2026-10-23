# Pauta de armas — sincronización del hilo ARMAS

Actualizado: 22/10/2026. Documento de diseño; no incorpora nuevas armas al juego.

Fuente: hilo **ARMAS**, `01a164ea-cca2-74b2-a034-5f6a7c949cbd`, cinco turnos accesibles, hasta `01a165d1-7960-7f11-b81e-57fe593b0f0d`. Se preservan las decisiones de ESTRUCTURA mientras una propuesta posterior no tenga aprobación expresa.

## Requisitos pedidos por Iván

- Nueve categorías de catálogo, con al menos diez modelos por categoría.
- Cuatro tiers: **Normal, Raro, Épico y Legendario**.
- Ataques distinguibles: bala, rayo, flecha, golpe, llama y demás efectos propios de cada arma. Aplicar identidad visual por mecanismo, tier, nivel y fusión.
- Armas con representación adecuada para los distintos ángulos de disparo.
- Simplificar la dificultad para alcanzar el máximo y fusionar. La escala concreta propuesta abajo todavía requiere aprobación.

## Equipamiento y categorías

Se conserva: una arma inicial, segunda mediante recompensa y garantía del primer jefe si falta; máximo dos armas simultáneas, tres poderes anómalos y una ultimate. Cada arma conserva su funcionamiento y recursos. Las ofertas reconocen las armas equipadas; no mejoran modelos ausentes. Un arma anómala ocupa una ranura de arma: no concede un cuarto poder.

| Categoría del catálogo | Modelos propuestos |
|---|---:|
| Armas de fuego | 10 |
| Armas arrojadizas | 10 |
| Armas cuerpo a cuerpo | 10 |
| Armas incendiarias | 10 |
| Francotiradores | 10 |
| Armas pesadas | 10 |
| Armas rústicas | 10 |
| Armas tecnológicas | 10 |
| Armas anómalas | 10 |

Estas nueve secciones complementan las cinco familias mecánicas existentes: **Balística, Energía, Melee, Explosivos y Arrojadizas**. Cada modelo tiene una familia principal; no recibe bonos duplicados por aparecer en una sección temática.

El catálogo propone 90 modelos y distribución de 27 Normal, 27 Raro, 18 Épico y 18 Legendario. Los modelos, su reparto y sus cifras son propuestas; la petición de nueve categorías y cuatro tiers sí procede del usuario. La rareza no incorpora por sí sola un multiplicador de daño. Sin mochilas ni accesorios físicos nuevos.

## Progresión: decisión vigente y alternativa pendiente

| Estado | Regla | Inversión temporal por arma |
|---|---|---:|
| Aprobado en ESTRUCTURA; utilizado en el ensayo T1BC | Cuatro ramas, cada una con cinco mejoras y un extra propio | 24 elecciones |
| Propuesta posterior de ARMAS | Una escala única **1 → 2 → 3 → 4 → 5 → MAX**, adquirida en nivel 1 | 5 elecciones |

**Recomendación de ARMAS pendiente de aprobación:** usar la escala única. Dos armas requerirían diez elecciones de mejora de arma para alcanzar MAX, frente a 48 del esquema de ramas. No equivale a diez niveles del jugador: también aparecen mejoras generales y poderes. Potencia, ritmo, manejo y especialización pasan a describir los ascensos, sin cuatro barras separadas.

No se cambia silenciosamente el ensayo ni las reglas aprobadas. Los poderes y mejoras generales mantienen sus cinco niveles más extra propio; las ultimates, sus cinco niveles permanentes. Los porcentajes ilustrativos del catálogo y el objetivo de primera fusión entre mapas 2–3 necesitan prueba de ritmo y balance.

## Fusión

**Aprobado previamente:** una sala dentro de algún escenario combina dos armas al máximo en una sola y libera una ranura. El resultado se conserva entre mapas durante la expedición.

**Desarrollo propuesto en ARMAS, pendiente de aprobación:**

- 63 recetas explícitas; ambos modelos distintos, compatibles y MAX. Tier mínimo **Normal**. Dos copias iguales pueden equiparse, pero no tienen receta en esta versión.
- Resultado único, sin fallo; tier igual al mayor entre Raro y los tiers de sus componentes, sin multiplicador automático de daño.
- Una fusión por expedición, sin monedas, tickets, materiales ni consumo de la colección permanente. Este límite es una propuesta nueva: la «apertura única» aprobada en ESTRUCTURA corresponde al escape de grieta.
- Compuesto en estado **FINAL**, sin nueva escalera ni refusión. Sustituye los extras originales por su comportamiento compuesto; no acumula todos sus efectos anteriores.
- La siguiente recompensa de armamento elegible ofrece llenar la ranura libre con un arma de nivel 1. No entrega otra arma MAX automáticamente.
- Sala accesible propuesta desde mapa 2 hasta utilizar la fusión; consulta previa sin consumir el uso y confirmación con pausa. Reemplazar el compuesto no devuelve componentes ni recupera el uso.

Ejemplo del catálogo: **F46, Pistola de servicio + Porra de seguridad → Repulsor de Guardia**, Raro. La identidad precisa de cada componente y las restantes recetas están en el catálogo enlazado. Solo son compatibles las parejas listadas; no hay fusión universal.

Los ataques secundarios comparten el presupuesto de daño del ciclo compuesto: no añaden ciclos completos por cada rebote, eco o campo. Sin cadenas recursivas, ejecuciones de jefes, intangibilidad permanente ni acceso que evite puertas. El techo de eficacia de ensayo de +5% frente a la suma de los dos MAX y los límites numéricos de control son objetivos propuestos, todavía sin validación jugable.

## Pauta visual

La forma y el color principal identifican el mecanismo del ataque. El tier añade un acento pequeño y una marca reconocible; no recolorea toda bala, llama o golpe. Los niveles refinan esa identidad; MAX muestra su extra cuando realmente se activa.

| Tier | Acento propuesto | Marca |
|---|---|---|
| Normal | Plata `#B8C0CC` | Círculo |
| Raro | Azul `#60A5FA` | Rombo |
| Épico | Violeta `#C084FC` | Rombo doble |
| Legendario | Dorado `#F4C76B` | Estrella |

La guía V1.1 documenta los ataques de los 90 modelos y los efectos de las 63 fusiones. Máximo propuesto de tres colores simultáneos por efecto; evitar ocultar enemigos y señales de peligro. El reparto visual núcleo/donante 70/30 no representa reparto de daño. Las dimensiones gráficas no alteran alcance ni colisiones.

**Direcciones:** el usuario pidió cubrir los ángulos de disparo. ARMAS recomienda ocho vistas por arma, puntería fina de 360°, puntos de agarre y salida del ataque, y orden de dibujo delante/detrás del soldado. Ocho vistas es recomendación, no una cantidad ya aprobada. La muestra de nueve modelos en dos resoluciones requeriría 144 vistas base bajo esa pauta, antes de animaciones.

Trabajar versiones nativas de 16 y 32 píxeles con el mismo tamaño aparente en el mundo. Mantener arma separada del cuerpo y resolver poses y agarres de las dos armas, especialmente las que requieren dos manos. La lámina disponible es **conceptual**, no un atlas nativo ni una entrega de ocho direcciones. No acredita animaciones, colisiones ni aprobación final de arte.

## Recursos preservados

- [Catálogo completo y condiciones de fusión](referencias/armas/armas-v1/CATALOGO_ARMAS_Y_FUSIONES_V1.md).
- [Lista rápida: 90 armas y 63 fusiones](referencias/armas/armas-v1/LISTA_RAPIDA_90_ARMAS_63_FUSIONES.md).
- [Datos de diseño](referencias/armas/armas-v1/DATOS_DISENO_ARMAS_V1.json).
- [Guía visual de ataques V1.1](referencias/armas/armas-v1/GUIA_VISUAL_ATAQUES_V1.1.md).
- [Muestra conceptual y alcance](referencias/armas/armas-16-32-muestra/LEEME.md).
- [Procedencia y huellas de los originales](referencias/armas/PROCEDENCIA_Y_HASHES.json).

Son copias de referencia sin edición. La propuesta usa tecnología y anomalías inspiradas en el contexto SCP; sus efectos de juego no convierten cada modelo inventado en un objeto canónico de la wiki SCP.

Verificación documental independiente con Luna: 90 IDs únicos, nueve categorías de diez modelos y 63 parejas sin duplicados ni referencias rotas; concordancia de IDs y conteos entre catálogo y JSON. Los nueve archivos copiados conservan sus huellas SHA-256. El JSON es una referencia de diseño: no contiene todas las reglas globales ni es una configuración ejecutable validada.

## Estado jugable y próximos cierres

El ensayo T1BC dispone de pistola, subfusil, escopeta y porra, con cuatro ramas y arte provisional. Este documento no integra los otros modelos, fusiones, poderes ni ultimates.

1. Aprobar o ajustar el cambio de cuatro ramas a la escala única 1–5 + MAX.
2. Revisar las 63 recetas, el uso único por expedición, frecuencia de sala y reposición de la ranura libre.
3. Seleccionar las primeras armas para prototipo, fijar sus estadísticas y medir tiempo hasta MAX/fusión, daño, control y rendimiento con hordas.
4. Resolver las vistas y agarres de cada modelo elegido; entregar y probar sprites nativos y efectos. La lámina conceptual no sustituye esta fase.
5. Definir desbloqueos y duplicados de gacha sin exigir rareza alta para acceder a la fusión. Economía real y persistencia permanecen fuera de este cambio documental.

La pauta se sincroniza con el diseño de escenarios vigente: no altera el M01 R5 aprobado ni acredita su integración.
