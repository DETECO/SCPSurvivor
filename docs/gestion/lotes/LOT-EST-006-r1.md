# LOT-EST-006 r1 — Montaje de armas faltantes aceptadas

25/10/2026 · Juanillo / ESTRUCTURA · Continuación técnica de INC-VIS-001 autorizada por Iván. **Encargado para implementación local; publicación coordinada después del recibo LOT005r2.**

## Fuente y alcance

ARMASR3 registra la aprobación directa «Aprobado. Ahora diseñas los poderes anomalos al matar una anomalia.», posterior a la entrega de ARM-FALTANTES-VIS-001/r1. Se comprobó en los tres turnos recientes de ARMAS: turno `01a1730a-6376-7d00-bbe5-8c02133ba167`, mensaje `01a1730a-66c3-70f2-815b-b958e20083d4`. Fuente exacta y límites: [aprobación del25/10](../../referencias/armas/armas-faltantes-v1/APROBACION_2026-10-25.md) y [pauta ARMASR3](../../PAUTA_ARMAS.md). La apariencia de48sprites está aceptada; agarres, montaje y animación son trabajo técnico que esta corrección debe comprobar. No hay nueva elección de diseño que pedir para aplicar esas imágenes sin editarlas.

Aplicar Subfusil/smg, Escopeta/shotgun y Porra/baton aprobados en16/32 y ocho vistas a las armas que el juego ya equipa. Mantener AF01, estadísticas, identidad, rarezas, colisiones, proyectiles y progresión. Comparten el renderer humano; incluir soldados y los apoyos masculinos/femeninosR3. El NPC solo sortea las tres balísticas ya aprobadas, no gana porra por esta entrega. Las diez propuestas de poderes ARM-POD-BIO-001/r1 no están elegidas y no se integran.

## Criterios técnicos

1. Leer catálogo/anclas y renderer existentes antes de editar. Calibrar agarre, apoyo y boca sobre los PNG sin sobrescribir originales; conservar procedencia y SHA256. Usar escala nativa proporcional al actor, sin el rectángulo legado sobredimensionado ni cambiar la cámara/física para ocultarlo.
2. Ocho direcciones,16/32, una/dos armas; un brazo por copia cuando son dos, dos manos coherentes cuando corresponde una. Disparo/retroceso/recarga y golpe de porra deben conservar la animación existente sin duplicar brazos, arma o FX. No prometer animaciones nuevas rasterizadas que no existen.
3. Montar el modelo realmente equipado/sorteado. Incapacitación no deja un arma flotante. Fallo/lentitud de recursos muestra respaldo identificado y se recupera sin detener el juego.
4. Pruebas enfocadas de correspondencia/anclas y navegador real: guardia/médico, apoyo masculino y tres femeninos, ocho vistas, dos resoluciones, disparo y pausa. Capturas para inspección de manos/escala; verificar daño y cadencia sin cambios. Compilar/check. No repetir backendP05: tiene cinco fallos conocidos de toolchain ya documentados.
5. Entregar informe local con recursos/hash, módulos, pruebas y límites. Juanillo concilia y publica tras cerrar el recibo actual; no se permiten escritores simultáneos en clon público, pauta/control/roadmap/recibos.

Implementador: PROGRAMACION, gpt-6.1-sol/alto bajo la autorización de Iván para coordinar hilos y elegir modelo/esfuerzo. No modifica pautas de otras áreas ni decide un poderA/B. Esta entrega no declara aceptación manual de montaje, teléfono físico o balance.

## Cierre de ejecución25/10/2026

**Publicado y comprobado para ensayo.** [Recibo](../LOT-EST-006_PUBLICACION.json), runtime4adf3be/bundlebe687713b2.279pruebas del juegoPASS;278hashes,352montajes y18combinacionesR3públicas con comprobaciones de incapacitación/animación/combate/recuperación. [Revisión de ESTRUCTURA](../REV-EST-0009_ARMAS.md). La revisión inicial de este contrato queda preservada en REV-EST-0009/fuentes. Aceptación visual del montaje y teléfono físico pendientes, sin una nueva elección de apariencia requerida para implementar.

**Aceptación posterior de Iván:**«Aprueba. Y continua», después de la entrega enPROGRAMACION. [Mensaje recuperado y alcance](../ACEPTACION_LOT006_2026-10-25.md). Se acepta el montaje entregado; no acredita teléfono físico o balance, ni elección de poderesA/B.
