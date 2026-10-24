# LOT-EST-001 r1 — Director de sorteos de grietas

23/10/2026 · ESTRUCTURA · **Diseño del núcleo listo para un encargo de implementación. Código no implementado por esta entrega.**

Este lote acota la planificación y el resultado de los sorteos. No declara listo el sistema completo de encuentros, poderes o NPC. La aprobación de diseño no ejecuta el lote ni autoriza publicación por sí sola.

## Fuente y revisión fijada

- **Decisión nueva:** EST-GRI-001 r1, aprobada por mensaje directo de Iván en ESTRUCTURA, hilo `01a1457c-c051-73d2-9864-e7deb6435420`, el 23/10/2026.
- **Cita:** «Apruebo el dado 50/50, con tiradas del minuto 1 al 4 desde el segundo mapa y máximo dos grietas.»
- **Decisión previa conservada:** pesos de peligrosidad elegidos por Iván: 50/32/8/7/3%, de D1 a D5. Está documentada en la [ficha 2.2](../../GRIETAS_DADO_POR_MINUTO_V2.md) y la matriz de decisiones; no es parte de una tabla visual de seis estilos.
- **Snapshot de alcance:** las reglas siguientes son la base de este lote r1. Cambios posteriores requieren registrar su efecto y conservar esta revisión; no sustituirla silenciosamente por la última edición de la ficha.

## Núcleo que se puede implementar y comprobar de forma aislada

1. Primer mapa excluido. Desde el segundo, oportunidades a **60, 120, 180 y 240 segundos activos del mapa**.
2. Cada oportunidad se resuelve una sola vez. Antes de tirar, consultar el contador de apariciones acumuladas del mapa; con dos, no crear más oportunidades efectivas.
3. Primer sorteo: **50% sí / 50% no**. Un no deja el contador de apariciones intacto.
4. Un sí selecciona D1/D2/D3/D4/D5 con pesos **50/32/8/7/3**. La tabla es condicional al sí, no otro reparto de la probabilidad de aparición.
5. El límite cuenta apariciones, no entradas o victorias. Un portal que ya apareció sigue consumiendo cupo aunque se ignore, expire o se complete. Reiniciar el contador solo al comenzar otro mapa.
6. No sortear en 0:00 ni desde 5:00. Usar el reloj activo de origen: pausa y tiempo dentro de un recinto con origen congelado no producen oportunidades adicionales.
7. No añadir garantía de aparición, compensaciones ni ajuste por rareza del soldado/gacha. Cero grietas sigue siendo un resultado válido.

Una forma válida de probar los pesos es un entero uniforme 1–100: D1 1–50, D2 51–82, D3 83–90, D4 91–97 y D5 98–100. El algoritmo concreto de azar lo elige PROGRAMACION conforme al proyecto; esos rangos ejemplifican el reparto, no fuerzan una dependencia nueva.

## Dependencias y recursos

- Entrada del núcleo: identidad del mapa, elegibilidad desde el segundo, reloj activo, oportunidades consumidas y apariciones ya confirmadas.
- La salida del núcleo debe permitir solicitar una aparición con su tier; un adaptador confirma que el portal se abrió. La propuesta concreta para fallos de ubicación sigue por definir fuera de este lote: no contabilizar una solicitud fallida como una aparición realizada ni sustituir su tier silenciosamente.
- Los seis estilos de NIVELES **GRIETAS-V1 / 01–06** ya se usan en la práctica visual. Este lote no cambia su arte ni asigna automáticamente cada estilo a un tier.
- Mantener módulos y código existentes como punto de partida; el prototipo de práctica usa reglas heredadas que no acreditan este nuevo director. Las herramientas internas de prueba deben identificar qué reglas están activas.

## Criterios verificables

- Mapa 1: ninguna oportunidad. Mapa 2: cuatro oportunidades posibles; ninguna a 0 o 300 segundos.
- Secuencia no/no/no/no: cero apariciones. Sí/sí: máximo dos confirmadas; no continuar sorteando para una tercera.
- Sí/no/sí: dos apariciones, sin devolver cupo por ignorar la primera. Si una solicitud no puede materializarse, identificar el fallo del adaptador sin afirmar aparición.
- No repetir una oportunidad al seguir procesando el mismo instante o reanudar un estado de prueba. Evaluar el cruce de cada umbral, no depender de igualdad exacta entre tiempos de fotogramas.
- Pausa y reloj de origen congelado: sin avance de oportunidades. Volver del recinto conserva el contador del mapa.
- Pesos: suma 100%; comprobar límites 50/51, 82/83, 90/91 y 97/98. Los ensayos de distribución son apoyo, no sustituyen comprobar los límites ni demuestran balance jugable.
- El modo/práctica visual anterior mantiene su alcance identificado; una prueba aislada del director no se presenta como el sistema completo integrado.

## Fuera del lote y pendientes de integración completa

- Catálogo jugable compatible con los cinco tiers y balance de sus encuentros.
- Ubicación alcanzable y tratamiento definitivo de fallos; la cifra de recorrido 3–12 segundos sigue propuesta.
- Recinto separado, retorno, retirada única, poderes, premios y compañeros con sus burbujas.
- Guardado de expedición y migración de versiones; el diseño futuro debe conservar resultados, sin anunciar persistencia por probar un estado simulado.
- Saltos de escenarios y su integración con el calendario; servicios reales y publicación.

Estos puntos no bloquean una implementación aislada y comprobable del director; sí impiden presentar ese trabajo como integración jugable completa de las grietas nuevas.

## Entrega esperada de PROGRAMACION

Cuando Iván encargue este lote, registrar IDs/revisiones utilizadas, adaptación técnica elegida, comprobaciones ejecutadas y qué sigue sin conectar. Enlazar su informe en CONTROL_CAMBIOS. La aceptación de los porcentajes no implica que ya existan cinco jefes o recintos listos.
