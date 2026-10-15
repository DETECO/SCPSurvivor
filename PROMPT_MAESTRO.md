# Prompt maestro de continuidad — SCP Survivor

Síntesis de registros accesibles del repositorio y paquetes de Iván; no es transcripción de las otras sesiones, excluidas del alcance.

Continúa el juego existente de esta carpeta. Responde en español y revisa código antes de editar. Lee AGENTS.md, CONTEXTO_PROYECTO.md, docs/P05-REPORT.md, ROADMAP.md y RoadmapSCP.json. Instrucciones actuales de Iván tienen prioridad; conserva IDs y trazabilidad de decisiones anteriores.

## Arquitectura y diseño permanentes

HTML/CSS/JavaScript/Canvas2D, namespaceG, estructura y orden en dev.html. Editar fuentes; npm.cmd run build genera SDKFirebase local y compilado. No migrar a otro motor, React, Expo o Supabase por instrucciones de otros proyectos. Conservar avisos y licencias.

Mantener identidad visual y recursos aprobados, sin sustituirlos ni completar24+24 por inferencia. El arte en esta alfa es provisional; catálogo/faltantes en DISENOS_Y_RECURSOS.md. docs/historial-local/alfa-0.4 conserva el prompt anterior y RoadmapSCP.json contiene decisiones completas.

## Mecánicas aprobadas

Velocidad165. Una mejora inmediata por nivel y XP sobrante después de elección, D-306/D-214. Dos copias físicas independientes con munición/recarga/nivel/mods, hasta dos mods compatibles sin duplicados; cambiar capacidad no rellena y cambiar duración conserva porcentaje de recarga. Fórmulas aditivas y topes compartidos; cartas conceden solo margen restante. Arma orientada independientemente del cuerpo, paredes bloquean balas/perforación.

Sectores normales3/4/5 reproducibles y equiprobables según D-143/D-190; primera neutralización, pares resistencia60s e impares neutralización. Preparación20s; Listo anticipado. Semilla de tamaño independiente de calendariojefe/extracción y apariciones. Escapar de jefe no concede victoria. Resultado único para muerte/extracción; no duplicar recompensas ni propiedad.

## Alcance vigente P05

Iván autorizó avanzar y preparar/probar localmente y reiteró terminar sin más consultas. Después creó manualmente scp-survivor en Firebase; config/firebase-public.json está conservado e inactivo. Firebase Auth/Firestore/Functions oficiales emulados, demo-scp-survivor, hosts127.0.0.1. Solo ?cuentas=local en localhost; modo normal aislado. Guardas globales heredadas siguen desactivadas; no usar servicios originales.

UID del token, revisión esperada, requestId, sesión autorizada y recibos persistentes. Operaciones transaccionales; mismoID/contenido devuelve recibo, contenido diferente rechaza. Recibo antes de revisión/sesión para recuperar respuesta perdida. Firestore cliente cerrado. UnaexpediciónporUID; transferencia explícita revocaoldsession. Sin mezcla por unión/máximos ni economía libre del cliente.

Checkpointversionado en preparación/exploración e iniciooleada/jefe; nada de enemigosavanzados serializados. Conservarlo confirmado. Retroceder combate excluye clasificación irreversiblemente; preparación recuperable según estado confirmado. Desconexión/confirmación fallida detiene partida hasta resolver. Caché y comando pendiente porUID no sustituyen servidor. Sin contraseñas en caché propia/código/ZIP.

El combate sigue local: P05 no acredita economía/inventario P06/P07, antitrampas completo o ranking oficial. AuthGoogle ycorreo emulados no son servicios reales ni publicación. No declarar P05 completo por pruebas locales si faltan criterios reales/dependencias.

## Autonomía y límites

Completar implementación/pruebas locales autorizadas sin volver a pedir lo mismo. Iván autorizó subir esta entrega P05 y el roadmap a DETECO/SCPSurvivor/main el15/10; ver A-021 y docs/PUBLICACION_GITHUB.md. Base39344e77/alfa0.4, actualización P05-local-01/roadmapv0.12. La ejecución sigue local/emulada: esta subida no activa servicios externos, facturación ni despliegue. Preservar ZIPoriginal, backup y fuentesCloud. sources/ del padre es solo lectura.

## Verificación

Pruebas pertinentes y resultados actuales en docs/P05-REPORT.md; diferencias en docs/P05-CAMBIOS.diff. No confundir informes P01–P04/migración con aceptación nueva. No extrapolar a dispositivos físicos, Safari, FPS, memoria, costes o producción. Mantener ambos lockfiles y comandosWindows.

RoadmapSCP.json es canónico: mismos IDs/pesos/criterios, solo CV aporta. Vista con node tools/render-roadmap.js. Registrar autorización, evidencia y límites, sin porcentaje parcial inventado. Próximo trabajo: servicios propios/aceptación P05 y después P06 conforme a dependencias y alcance aprobado.
