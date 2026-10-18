# Prompt maestro de continuidad — SCP Survivor

**Demo web autorizada (A-033, 18/10/2026):** la primera prueba V2 también se publica en [GitHub Pages](https://deteco.github.io/SCPSurvivor/). En HTTPS `deteco.github.io/SCPSurvivor/` se activa por defecto; `?rapida=1` inicia en 4:30. Esta petición amplía el antiguo límite de loopback solo a ese destino. Mantener cuentas, guardado, economía y premios reales desactivados. Fuera de ese origen/ruta, conservar la prueba local explícita. No cambiar las mecánicas ni adelantar cofres/geometría todavía pendientes. [Alcance y verificación](docs/GITHUB_PAGES.md).

**Pauta sincronizada con ESTRUCTURA — 0.22 (18/10/2026):** aplicar [reglas aprobadas](docs/ESTRUCTURA_REGLAS_APROBADAS.md) y [siguiente bloque de adaptación](docs/PLAN_DISENO_JUGABLE_V2.md). Iván aprobó los tipos de cofre, cuatro sorteos por mapa en 1:00/2:00/3:00/4:00, seis puntos alternativos y escala inicial de ensayo 160 × 100. Se conserva la prueba V2-trial-01; estos cofres y geometría aún no están implementados. No reintroducir extracción, accesorios físicos ni mochilas. No cambiar datos/cuentas ni conceder premios reales desde un ensayo local. Las reglas de armas, economía, grietas y saltos que siguen abiertas no se completan por inferencia.

**A-031/V2-trial-01:** Iván pidió comenzar la adaptación para su primera prueba. El ensayo local de mapa300s/jefe/puerta/aliados está implementado; conservarlo y leer docs/PRUEBA_MAPA_V2.md e informe antes de modificar. Su horario de jefe240s es provisional. No presentar cartas anteriores como nuevo azar por armas, ni cerrar P05, P06 o V2 con este prototipo.

Síntesis del repositorio, paquetes de Iván y decisiones accesibles del chat ESTRUCTURA, incorporado expresamente el18/10/2026. No se afirma haber recuperado materiales inaccesibles.

**Prioridad V2-ESTRUCTURA:** leer [PAUTA_DESARROLLO.md](PAUTA_DESARROLLO.md), [plan de cambios](docs/PLAN_CAMBIOS_ESTRUCTURA.md) y [registro](docs/ESTRUCTURA_DECISIONES.md). El ensayo V2-trial-01 ya permite probar el recorrido; esta sincronización documental prepara los siguientes bloques sin cambiar el ejecutable.

Continúa el juego existente de esta carpeta. Responde en español y revisa código antes de editar. Lee AGENTS.md, CONTEXTO_PROYECTO.md, docs/P05-REPORT.md, ROADMAP.md y RoadmapSCP.json. Instrucciones actuales de Iván tienen prioridad; conserva IDs y trazabilidad de decisiones anteriores.

## Arquitectura y diseño permanentes

HTML/CSS/JavaScript/Canvas2D, namespaceG, estructura y orden en dev.html. Editar fuentes; npm.cmd run build genera SDKFirebase local y compilado. No migrar a otro motor, React, Expo o Supabase por instrucciones de otros proyectos. Conservar avisos y licencias.

Mantener identidad visual y recursos aprobados, sin sustituirlos ni completar24+24 por inferencia. El arte en esta alfa es provisional; catálogo/faltantes en DISENOS_Y_RECURSOS.md. docs/historial-local/alfa-0.4 conserva el prompt anterior y RoadmapSCP.json contiene decisiones completas.

## Diseño vigente y código que se conserva

Mapas encadenados de cinco minutos con escalada de monstruos propios y un jefe obligatorio por mapa. A5:00 aparece brecha/puerta blindada y soldados que llaman y cubren al jugador. Desde ese momento no hay nuevas apariciones enemigas; los remanentes sobreviven. La puerta aparece aunque el jefe viva, pero cruzar exige derrotarlo. La transición conserva vida/mejoras de partida y reinicia el reloj del mapa; no termina la partida por extracción.

Retirar del diseño extracción de fin de partida, accesorios físicos de armas y mochilas. No retirar las armas, sus estadísticas o mejoras temporales ni borrar la colección de soldados/armas. Armas distintas por familias (láser, cuerpo a cuerpo, distancia, misiles, arrojadizas) y mejoras de armas al azar por nivel. Candidatos, cartas, topes y catálogo final siguen abiertos; no imponer automáticamente las dos armas o el nivel5 del prototipo como regla V2.

Conservar grietas opcionales difíciles y de mayor recompensa, apertura limitada, ubicación/localizador, sonido/aviso y contacto instantáneo sin botón. Los cofres y la escala inicial de ensayo siguen las reglas aprobadas de ESTRUCTURA 0.22. Retorno/reloj de grietas, saltos, tablas pendientes de premios y dimensiones finales requieren reglas explícitas. Gacha orientado a soldados/armas; atributos nuevos, rarezas y duplicados propuestos por el asistente no equivalen a aprobación.

El código actual todavía contiene sectores/oleadas, extracción, mods y mochila de prueba. Conservarlo hasta adaptar y validar por el plan RC-01–RC-12. No reconstruir, borrar historial ni continuar el inventario físico anterior P06. Replantear colección, kit, pérdida/recuperación, almacén/buzón y economía según V2; no descartarlos todos por inferencia.

Las fórmulas y controles no afectados siguen siendo referencia del prototipo: velocidad165, orientación cuerpo/arma independiente, paredes que bloquean disparos, recargas coherentes y efectos temporales sin duplicación. Revisarlos cuando una familia nueva lo requiera; ninguna propuesta autoriza cambiar balance sin documentarlo.

## Alcance vigente P05

Iván autorizó avanzar y preparar/probar localmente y reiteró terminar sin más consultas. Después creó manualmente scp-survivor en Firebase; config/firebase-public.json está conservado e inactivo. Firebase Auth/Firestore/Functions oficiales emulados, demo-scp-survivor, hosts127.0.0.1. Solo ?cuentas=local en localhost; modo normal aislado. Guardas globales heredadas siguen desactivadas; no usar servicios originales.

UID del token, revisión esperada, requestId, sesión autorizada y recibos persistentes. Operaciones transaccionales; mismoID/contenido devuelve recibo, contenido diferente rechaza. Recibo antes de revisión/sesión para recuperar respuesta perdida. Firestore cliente cerrado. UnaexpediciónporUID; transferencia explícita revocaoldsession. Sin mezcla por unión/máximos ni economía libre del cliente.

Checkpointversionado en preparación/exploración e iniciooleada/jefe; nada de enemigosavanzados serializados. Conservarlo confirmado. Retroceder combate excluye clasificación irreversiblemente; preparación recuperable según estado confirmado. Desconexión/confirmación fallida detiene partida hasta resolver. Caché y comando pendiente porUID no sustituyen servidor. Sin contraseñas en caché propia/código/ZIP.

El combate sigue local: P05 no acredita economía/inventario P06/P07, antitrampas completo o ranking oficial. AuthGoogle ycorreo emulados no son servicios reales ni publicación. No declarar P05 completo por pruebas locales si faltan criterios reales/dependencias.

## Autonomía y límites

Completar implementación/pruebas locales autorizadas sin volver a pedir lo mismo. Iván autorizó subir esta entrega P05 y el roadmap a DETECO/SCPSurvivor/main el15/10; ver A-021 y docs/PUBLICACION_GITHUB.md. Base39344e77/alfa0.4, actualización P05-local-01/roadmapv0.12. La ejecución sigue local/emulada: esta subida no activa servicios externos, facturación ni despliegue. Preservar ZIPoriginal, backup y fuentesCloud. sources/ del padre es solo lectura.

## Verificación

Pruebas pertinentes y resultados actuales en docs/P05-REPORT.md; diferencias en docs/P05-CAMBIOS.diff. No confundir informes P01–P04/migración con aceptación nueva. No extrapolar a dispositivos físicos, Safari, FPS, memoria, costes o producción. Mantener ambos lockfiles y comandosWindows.

RoadmapSCP.json es canónico. `activeDesignRevision` contiene V2; las53tareas/criterios/pesos y52/100 son la línea base histórica, no aceptación del diseño nuevo. AvanceV2 sin calcular. Generar vistas con node tools/render-roadmap.js. Próximo trabajo: completar la adaptación según los bloques del plan jugable, con geometría y cofres locales aislados como siguiente ensayo. Cerrar reglas necesarias, contrato V2 y aceptación real P05 antes de conectar cuentas, economía o P06 replanteada. El primer recorrido RC-03–RC-06 ya tiene prototipo y conserva aceptación pendiente. Registrar evidencia sin inventar porcentajes.
