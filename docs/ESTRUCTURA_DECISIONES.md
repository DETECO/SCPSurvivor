# Registro de decisiones — chat ESTRUCTURA

Consulta actualizada: 18/10/2026. Chat accesible **ESTRUCTURA**, ID `01a1457c-c051-73d2-9864-e7deb6435420`, mismo directorio. Se releyeron los diez turnos accesibles. El nuevo turno `01a15142-340f-7400-8660-f8d2502ce2aa` contiene la aprobación de las recomendaciones anteriores de cofres y escala inicial. Seguía en curso: no se atribuye aprobación a nuevas respuestas aún no leídas.

La petición actual en PROGRAMACION exige usar esa pauta para diseño y actualización de estructura. [Reglas aprobadas y alcance del corte](ESTRUCTURA_REGLAS_APROBADAS.md). Se conserva la primera prueba V2-trial-01. Las decisiones incompatibles del diseño de extracción no recuperan vigencia por permanecer en archivos históricos.

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
| E-11 | Aclarar cofres antes de dimensionar mapas | Petición en `01a150d7-62e0-7d23-9b6a-f8a5091d7839`; recomendaciones posteriores aprobadas en E-12–E-15 |
| E-12 | Tres tipos: exploración para recursos gacha; jefe garantizado con mejora temporal aleatoria compatible; grieta superada con premio superior | Aprobación de recomendaciones en `01a15142-340f-7400-8660-f8d2502ce2aa` |
| E-13 | Cuatro intentos de exploración a 1:00/2:00/3:00/4:00 activos; conservar tabla 10/15/20 %, topes 1/2/3 y tickets 1–2/1–2/1–3 | Misma aprobación; tablas exactas en el corte de reglas |
| E-14 | Reservar seis ubicaciones alternativas y circuitos amplios; zona de jefe/puerta | Misma aprobación; no son seis cofres garantizados |
| E-15 | Ensayar escala 160 × 100 casillas; medir recorridos 30–45 s y desvíos 10–15 s | Misma aprobación; escala inicial y objetivos, no tamaño final ni mediciones realizadas |

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
| O-08 | Parcialmente resuelto por E-12/E-13: tipos, cuatro intentos y topes; faltan hitos, reloj acumulado y detalles de premios | No reabrir lo aprobado; no acreditar tickets reales ni inventar tabla de grieta o candidatos de mejora |
| O-09 | Escala inicial y seis puntos aprobados por E-14/E-15; tamaño final/densidad pendientes de medición | 160 × 100 es el primer ensayo; 30–45 s y 10–15 s son objetivos, no resultados de juego |
| O-10 | Acabado y comportamiento final de aliados; contacto de puerta ya implementado en primer ensayo | Conservar contacto inmediato de V2-trial-01; no confundir cobertura provisional con IA/voz finales |
| O-11 | Alcance de progresión permanente y desbloqueo de mapas | No fijar cantidad total de mapas, último jefe ni final de campaña por una sugerencia del asistente |

Los documentos antiguos y las decisiones anteriores se conservan para trazabilidad. Cuando contradicen E-01–E-15, no constituyen instrucciones vigentes de implementación. La lista «etc.» no se usa como autorización para descartar otras funciones sin identificar la dependencia concreta.

Aplicación: [pauta vigente](../PAUTA_DESARROLLO.md) y [plan de cambios](PLAN_CAMBIOS_ESTRUCTURA.md). Esta sincronización 0.22 no cambia el código; el primer ensayo V2 ya existe y conserva su aceptación pendiente.
