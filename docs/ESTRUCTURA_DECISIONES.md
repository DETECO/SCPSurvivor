# Registro de decisiones — chat ESTRUCTURA

Consulta y relectura: 18/10/2026. Chat accesible: **ESTRUCTURA**, ID `01a1457c-c051-73d2-9864-e7deb6435420`, mismo directorio del proyecto. Se revisaron sus diez turnos disponibles mediante lectura del historial. El último estaba en curso: la discusión de cofres todavía podía continuar. Una actualización del asistente precisó que el roadmap sí contiene reglas de cofres anteriores aprobadas; se comprobaron directamente D-140–148/D-183/D-220/D-279 y se conservan en [la base de cofres](COFRES_BASE_Y_ADAPTACION_V2.md). Este documento registra el corte consultado, no una exportación íntegra ni aprobación de todas las recomendaciones del asistente.

La instrucción más reciente en PROGRAMACION pide actualizar la pauta, retirar extracciones, accesorios de armas y mochilas, y preparar los cambios antes de continuar. Tiene prioridad sobre decisiones incompatibles anteriores.

## Confirmado por intervenciones del usuario

| ID | Regla | Evidencia |
| --- | --- | --- |
| E-01 | Pasar del objetivo de extracción al avance por varios mapas | ESTRUCTURA: turno `01a15055-d621-7a21-8f1a-7e80c7cab1dc`; retirada expresa en PROGRAMACION el 18/10 |
| E-02 | Cada mapa tiene un jefe final para pasar al siguiente | ESTRUCTURA: turno `01a15061-05ac-7642-a20b-6d123d1e3f01` |
| E-03 | Monstruos/minions básicos propios de cada nivel y escalada con el tiempo | Mismo turno; mensajes posteriores del usuario |
| E-04 | A cinco minutos aparece brecha/puerta blindada y soldados que llaman y combaten a los enemigos restantes | Mismo turno: «no spawnean mas a llegar a los 5 min, solo lo que quedan» |
| E-05 | La puerta llega a los cinco minutos y el jefe debe estar derrotado para avanzar | El usuario respondió «Si» en `01a15094-b621-7043-9863-09f2246a79a9` a la pregunta de mantener al jefe como requisito |
| E-06 | Armas distintas con estadísticas básicas; familias láser, cuerpo a cuerpo, a distancia, misil y arrojadizas; mejoras por nivel al azar | ESTRUCTURA: `01a150d7-62e0-7d23-9b6a-f8a5091d7839` |
| E-07 | Quitar mochilas | Petición expresa en ese turno y reiteración en PROGRAMACION |
| E-08 | Quitar accesorios físicos de armas y la extracción como opción de cierre | Petición expresa en PROGRAMACION, 18/10/2026 |
| E-09 | Grietas con anomalías difíciles y premios mayores; saltos entre niveles; variedad de mapas y monstruos inspirados en SCP | ESTRUCTURA: `01a15061-05ac-7642-a20b-6d123d1e3f01` |
| E-10 | Dirección de gacha: soldados y armas | Petición del usuario en `01a15055-d621-7a21-8f1a-7e80c7cab1dc`; tablas y duplicados sin cerrar |
| E-11 | Aclarar cofres antes de dimensionar mapas | Última petición del usuario en `01a150d7-62e0-7d23-9b6a-f8a5091d7839`; el turno siguiente seguía investigando |

La continuidad de vida/mejoras entre mapas y el reinicio del reloj se incorporan al recorrido descrito tras la aceptación E-05. Los detalles nuevos de recuperación, economía y fin definitivo de una partida requieren contratos propios, no se deducen de esa aceptación.

## Requisitos previos compatibles que se conservan

- Contacto instantáneo al entrar en la grieta opcional, sin botón, tecla ni espera: A-023/D-311 del proyecto.
- Grieta localizada en el escenario, tiempo abierto limitado, indicador de dirección/distancia/tiempo y aviso sonoro y visual: solicitudes previas de Iván.
- Recursos visuales aprobados, arquitectura HTML/CSS/JavaScript/Canvas2D y crédito exacto «Desarrollado por Ivan Vivanco».
- Firebase Spark sin facturación; completar aceptación real de P05 antes de continuar implementación P06. No publicar secretos, sobrescribir guardados ni reconstruir el juego.

## Propuestas o parámetros todavía abiertos

| ID | Pendiente | Qué no se debe asumir |
| --- | --- | --- |
| O-01 | Hora de aparición del jefe | El minuto cuatro fue propuesta del asistente, no valor final aprobado |
| O-02 | Objetivo aleatorio de cada mejora, cartas, elegibilidad, topes y probabilidades | No imponer mejora automática ni bono global a todas las armas |
| O-03 | Límite de armas y catálogo por familia | Las dos armas y nivel cinco del prototipo no fijan V2 |
| O-04 | Atributos definitivos de soldados, rarezas y duplicados | Diez atributos nuevos, cinco rarezas y habilidades propuestas no son aprobación del usuario |
| O-05 | Colección, recompensas, muerte y fin de partida | No importar pérdida del 25–50 %, kit con mochila, almacén60/buzón30 ni asegurar moneda al morir |
| O-06 | Grieta: retorno, reloj, cierre y premio | Pausar reloj y regresar al origen fueron propuestas; el prototipo usa el mismo escenario |
| O-07 | Saltos: destinos, desbloqueo, jefe obligatorio y recompensas | No permitir saltarse jefes o cobrar niveles omitidos sin definir reglas |
| O-08 | Adaptar cofres aprobados por oleada a mapas300s: cadencia, presupuesto y premios compatibles | Conservar la base D-140–148/D-220/D-279; no hay presupuesto V2 cerrado ni se importa la tabla genérica de Pokesurvivor |
| O-09 | Tamaño final y densidad de mapas | Se dimensionan después de O-08 y de probar recorridos con enemigos |
| O-10 | Puerta: contacto/entrada y comportamiento de soldados | La entrada instantánea aprobada para grietas no fija por sí sola todos los detalles de la puerta |
| O-11 | Alcance de progresión permanente y desbloqueo de mapas | No fijar cantidad total de mapas, último jefe ni final de campaña por una sugerencia del asistente |

Los documentos antiguos y las decisiones anteriores se conservan para trazabilidad. Cuando contradicen E-01–E-11, no constituyen instrucciones vigentes de implementación. La lista «etc.» no se usa como autorización para descartar otras funciones sin identificar la dependencia concreta.

Aplicación: [pauta vigente](../PAUTA_DESARROLLO.md) y [plan de cambios](PLAN_CAMBIOS_ESTRUCTURA.md). No se cambió el código del juego con esta revisión documental.
