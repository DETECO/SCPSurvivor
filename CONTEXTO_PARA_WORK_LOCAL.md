# Relevo para Codex Local — SCP Survivor

**Pauta sincronizada con ESTRUCTURA — 0.22 (18/10/2026):** aplicar [reglas aprobadas](docs/ESTRUCTURA_REGLAS_APROBADAS.md) y [siguiente bloque de adaptación](docs/PLAN_DISENO_JUGABLE_V2.md). Iván aprobó los tipos de cofre, cuatro sorteos por mapa en 1:00/2:00/3:00/4:00, seis puntos alternativos y escala inicial de ensayo 160 × 100. Se conserva la prueba V2-trial-01; estos cofres y geometría aún no están implementados. No reintroducir extracción, accesorios físicos ni mochilas. No cambiar datos/cuentas ni conceder premios reales desde un ensayo local. Las reglas de armas, economía, grietas y saltos que siguen abiertas no se completan por inferencia.

**Primer prototipo disponible:** `?prueba=mapa-v2` y `&rapida=1`, solo local sin cuentas/guardado. Consultar [guía](docs/PRUEBA_MAPA_V2.md) e [informe](docs/V2-PRIMERA-PRUEBA-REPORT.md). Esta ejecución A-031 sustituye la frase anterior «entrega documental» para el recorrido de prueba; las demás funciones V2 siguen pendientes. P05 real no está cerrado.

**V2-ESTRUCTURA · 18/10/2026.** Leer primero PAUTA_DESARROLLO.md, docs/ESTRUCTURA_DECISIONES.md, docs/PLAN_CAMBIOS_ESTRUCTURA.md, AGENTS.md y PROMPT_MAESTRO.md. Iván pidió incorporar el chat ESTRUCTURA y preparar la adaptación; no reconstruir el juego.

Diseño vigente: mapas encadenados5min, monstruos propios con escalada, jefe obligatorio por mapa. A5:00 llega puerta blindada y soldados, cesa todo spawn enemigo y permanecen remanentes. Cruzar exige jefe derrotado, conserva vida/build de la partida y reinicia reloj. La puerta no ejecuta extracción de fin de partida.

Se retiran extracción voluntaria, accesorios físicos de armas y mochilas. Conservar armas/soldados, estadísticas y mejoras. Armas por familias y mejoras al azar por nivel; cofres, probabilidades, economía y detalles de grietas/saltos siguen abiertos según el registro. No seguir el inventario físico P06 anterior.

El código actual todavía contiene el diseño anterior. Esta entrega es documental, sin cambios de mecánicas. RoadmapSCP.json guarda activeDesignRevisionV2;53tareas/estados/pesos y52/100 son línea base histórica, avanceV2 sin calcular. Generar vistas con node tools/render-roadmap.js y verificar con --check.

P05 requiere aceptación real y compatibilidad V2 antes de implementar P06 replanteada. Mantener Firebase Spark sin facturación. Emuladores/correo ficticio no acreditan OAuth, correo o persistencia reales. Preparación local de servidor no equivale a despliegue. Mantener UID/revisión/sesión/requestId/recibos, una partida activa y cachés separadas; no sobrescribir guardados de otro contrato ni otorgar premios duplicados.

Repositorio: https://github.com/DETECO/SCPSurvivor, main. Subida de código/roadmap autorizada; no activar facturación. Stack HTML/CSS/JavaScript/Canvas2D y namespaceG. dev.html es fuente; build genera index.html/js/app.min.js. Conservar arte aprobado, crédito «Desarrollado por Ivan Vivanco», ZIPoriginales y sources/ de solo lectura.

Comandos de Windows en INSTALACION_WINDOWS.md. Resultados de implementación previos en informes P05/P06; plan futuro en PLAN_CAMBIOS_ESTRUCTURA.md. Mostrar diff, verificar cambios y distinguir implementación local, propuesta y aceptación real.
