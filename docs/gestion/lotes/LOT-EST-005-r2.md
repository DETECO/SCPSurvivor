# LOT-EST-005 r2 — Compañero con arma aleatoria y reserva infinita

25/10/2026 · REV-EST-0008 · EST-NPC-001 r1. **Autorizado; implementación y publicación por verificar.** Complementa [r1](LOT-EST-005-r1.md), cuyos contratos de salas, director, BIO, poderes y retorno se conservan. Su revisión anterior queda preservada en el [corte](../revisiones/REV-EST-0008/MANIFIESTO.json).

## Decisión nueva de Iván

«Ademas quiero que actives lo de los compañeros de contencion que habiamos visto, ojo que el compañero de contencion cuando me ayuda a luchar en la grieta sale con un arma al azar. Y tiene que tener munición ilimitada al igual que yo. Haz que esto funcione, te autorizo para hablar con los hilos que sea necesario, y deside en que modelo y nivel de esfuerzo deberian hacer lo que les mandes.»

Sustituye **la reserva finita de apoyo** del NPC y el modelo AF01 fijo del primer ensayo. El nuevo requisito es de ejecución, no solo documentación. Mantiene las tasas33%D1–D4/10%D5, rarezas por peligrosidad, ayuda temporal, vida/incapacitación, ausencia de XP/transferencia y prohibición de rematar al jefe.

## Contrato de ejecución

1. Una tirada de presencia por encuentro; solo si aparece se fija el modelo de arma y rareza, sin cambiar la tabla de peligrosidades ni volver a sortear al pausar/cambiar frase. D1–D3 Normal; D4 Rara/Épica50/50; D5 Legendaria. Los resultados duran todo ese encuentro.
2. Arma al azar entre **Pistola/pistol, Subfusil/smg y Escopeta/shotgun**, modelos balísticos ya funcionales y compatibles con el apoyo. Reparto uniforme inicial, explícito de ensayo; no abrir CC04/TE01/F24 ni el catálogo90 por este cambio. La rareza aplica un perfil de apoyo real y acotado, no solo un texto.
3. **Reserva infinita de munición**, con cargador, recarga y cadencia finitos por modelo, igual que el contrato que utiliza el jugador: disparar repetidamente nunca agota una reserva total. No limitar tiros, duración de ayuda o daño acumulado para recrear escondidamente el antiguo presupuesto de munición. No usar `Infinity` serializada como `null`: estado explícito de reserva ilimitada y contador finito del cargador.
4. Conservar patrones reales distintos: pistola individual, subfusil de mayor cadencia, escopeta de varios perdigones y menor alcance, con sus perfiles de ensayo versionados. Disparos deben respetar trayectoria/obstáculos, objetivos válidos y fases del jefe. El NPC no remata al jefe ni entrega XP por sus bajas; no consume munición del jugador.
5. El dibujo y la burbuja identifican el modelo realmente sorteado. Pistol usa AF01 aprobado; smg/shotgun conservan el dibujo legado identificado como provisional hasta aceptar los sprites nuevos de ARMAS R2.2. No cambiar de identidad ni aprobar por extensión esos recursos. Conservar rig amarillo y la integración femenina modularR3 posterior, encargada directamente por Iván en PERSONAJES: [suplemento y evidencia](../REV-EST-0008_COMPANERO.md). R2 sigue defectuoso y no debe confundirse con R3. Comprobar los tres modelos balísticos sobre los rigs existentes, sin sobrescribir los cambios concurrentes ni dar por aceptada artísticamente una revisión nueva.
6. No mostrar frases de «sin munición» cuando la reserva es infinita. Filtrar esos IDs sin borrar el banco aprobado. Puede informar recarga solo durante una recarga real; conservar presentación/nombre estable, personalidad, arma propia/equipada, contexto y recuerdo compatible, miedoD5 y burbujas sin voz. Pausas y elección de poder detienen recarga/ataques.
7. No modificar la reserva infinita del jugador para convertirla en disparo sin cargador. Verificar que su recarga siga funcionando y que entrar/salir no rellene gratis el cargador. El compañero desaparece al salir, morir o reiniciar; no se acumulan apoyos.

## Pruebas y salida

- Forzar cada modelo y rareza con QA declarado; límites exactos33/10 y50/50, selección de modelo independiente. Comparar patrón, alcance y recarga reales con el arma mostrada.
- Disparar **más de32veces** y atravesar varios cargadores con cada modelo. Debe seguir ayudando; mostrar recarga verdadera y reserva infinita, nunca una baja por falta de reserva. Probar pausa y duración del encuentro.
- Verificar sin remate/XP/transferencia, colisiones, incapacitación y limpieza al salir, manteniendo la nueva reserva infinita. No conservar pruebas que exijan agotar20/24/28/32tiros como regla vigente.
- Completar los pendientes de r1 ya encargados: alias de enlaces antiguos a la práctica nueva y recuperación ante atlasBIO404/lento sin transición indefinida, premio o reroll.
- Compilar, ejecutar regresiones pertinentes y publicar en la misma demo autorizada. Entregar informe/tabla de ensayo y recibo público con commit/bundle efectivo en REGISTRO_IMPLEMENTACION. Probar el NPC dentro de una sala, no solo un objeto de datos.

**Implementador:** PROGRAMACION con **gpt-6.1-sol / razonamiento alto**, elegido por Juanillo bajo la autorización directa de Iván para retomar la ejecución fallida y reducir retrabajo. ESTRUCTURA hace la revisión independiente y consolida resultados. No se requiere otra aceptación de las reglas ya indicadas para completar este lote.


## Seguimiento técnico25/10/2026

Tras systemError de PROGRAMACION y su agente NPC, Juanillo asume este encargo ya autorizado. No cambia el contrato del lote. [Resultado y cobertura](../informes/LOT-EST-005-r2-juanillo.md);270pruebas de juego y48casos/grupos locales aprobados. Publicación final en comprobación, sin aceptación humana o balance final.

**Cierre publicado25/10:**[recibo](../LOT-EST-005_PUBLICACION.json),55casos/grupos públicos y217/217hashes. Novedad posterior: ARMASR3 ya acepta las imágenes smg/shotgun/baton; su montaje se encarga en LOT006, sin modificar retroactivamente el código de este recibo.
