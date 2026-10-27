# LOT-EST-008 r1 — corrección de experiencia jugable

26/10/2026 · Juanillo / ESTRUCTURA · REV-EST-0012 · Encargo de implementación de Iván.

## Objetivo y autoridad

Iván pide corregir acompañantes, variedad de grietas/anomalías, tamaño de cámara, dificultad, poderes elegidos y cristales de experiencia. Confirma que colores, formas y tamaños se refieren a **los cristales de XP**. Su instrucción actual «Trabaja en todos estos puntos» autoriza ejecutar este lote y sustituye la desaparición del compañero al salir. No requiere volver a pedir esas decisiones.

Se conserva la ruta expresamente fijada en ARMAS R6: **área entrega → ESTRUCTURA consolida → PROGRAMACION implementa y publica**. PROGRAMACION es el único escritor del runtime durante este lote. Juanillo revisa/consolida y comprueba el corte. No tocar `sources/`, activar cuentas/economía, publicar el visor privado ni integrar ARM-JUG-001/12 armas/fusión por extensión.

Base pública acreditada: `ca2e2f0478c4b8392fee4f68337ee04505aa501a`, runtime `8cdac5846ec7cf7c0b9fa95c226120b723644e2e`, bundle `92026cde30`, demo0.39. La fuente local añade un candidato C1-r2 de NIVELES y no equivale a una publicación posterior.

## Fuentes nuevas consolidadas

- ARMAS R4/R6, ARM-POD-SEL-001 r1: **BIO01 A / BIO02 A / BIO03 A / BIO04 A / BIO05 B**. Pulso de esporas, Cápsula vítrea, Látigo tendinoso, Corona de espinas y Membrana de rechazo. Cita recuperada del mensaje humano `01a17593-fdd0-7263-acb4-af41b5a82370`, turno `01a17593-fb54-7f93-8033-8f4e87492498`. Fichas y diez FX exactos en `docs/referencias/armas/poderes-anomalos-v1/SELECCION_PODERES_2026-10-26.{md,json}`. Sus cifras son de ensayo; seleccionar no acredita integración.
- NIVELES R7.7 / NIV-BIO-C1-APR-001: cinco salas C1 aprobadas y encargo 2.5D en mensaje `01a177c6-8f02-7153-ba1d-7a785a5d29f6`. Solicitud posterior de fidelidad a las imágenes, mensaje `01a17825-ce34-72b3-81ca-4cc1c6a45c56`. Leer `docs/NIVELES_BIO_C1_APROBACION.md`, `NIVELES_BIO_C1_IMPLEMENTACION.md`, fuentes/PNG C1 y candidato `js/world/rift-room-art.js` + `assets/levels/bio-c1/*-clean-r2.png`. La última sesión del área falló: **revisar y completar C1-r2**, no atribuirle automáticamente las pruebas de C1-r1.
- Seis estilos de **portal** GRIETAS-V1/NIV-GRI-009 ya aprobados; son distintos de las cinco **salas** y cinco identidades BIO. Mantener catálogo y probabilidades 50/32/8/7/3. No retirar un estilo por confundir estas cantidades.
- PERSONAJES-PROPORCIONES-004 ya entregada y pública; conservar humanos y montajes aprobados. El pedido de escala actual afecta cámara, no vuelve a estirar cuerpos ni armas.

## Diagnóstico comprobado en código

1. `rift-expedition.js`: práctica sin `grado` fija D1; `technical-ui.js` fija semilla1337. La combinación repite anomalía/recinto y el estilo sorteado. La partida ordinaria sí usa los pesos, pero los accesos de prueba no muestran esa variedad.
2. `leave()` limpia `RiftCompanion`; su actualización solo existe dentro del recinto y su puntería solo busca al jefe. Es el comportamiento anterior, ahora sustituido.
3. `camera.js`: vertical512 solo para `NIV-ESC-008-A-r1`; mapas posteriores sin esa revisión vuelven a768, mientras la sala vuelve a512. Es una diferencia de encuadre entre zonas.
4. Público: BIO500/700/950/1200/1600HP, cuerpo96u y recuperación prolongada; falta calibración de dificultad. Normales con apenas+5%HP por minuto, daño sin crecimiento temporal y cap local24.
5. `rift-powers.js` sigue usando cinco poderes de ensayo anteriores, distintos de la elección R4 en BIO03–05, sin sus diez atlas FX; el HUD solo los enumera dentro del inspector. Hay que integrar comportamiento y presentación, no solo cambiar nombres.
6. `Content`: Perseguidor y Biológico dan14XP. `Enemy.die()` de contención emite siempre `drop('xp',...)`, por lo que incluso220XP se dibuja como cristal pequeño. `pickup.js` solo tiene dos apariencias y su compactación fuerza `xpBig`.

## Contrato de ejecución

### A. Cristales y valor de XP — ensayo conservador

- Cuatro apariencias según **valor real almacenado**: 1–12 verde pequeño/fragmento;13–29 cian/cristal;30–99 violeta/racimo;100+ ámbar/núcleo grande. Forma y tamaño complementan el color; sin confundirlos con monedas/tickets. CeroXP no crea recogible.
- Ensayo: Perseguidor12, Biológico20; proporción actual3:1 conserva promedio14. Élite de armamento84 y jefe normal220. BIO conserva su premio de poder y0XP mientras no haya otra regla aprobada. No aumentar XP por mera escala visual.
- Conservar exactamente el valor al compactar, repartir o recoger. No redondear por cristal ni perder el único cristalXP al llegar al cap420. Preservar imán, pausas, retorno, crédito único, multiplicador una vez y exclusión deXP por bajas de aliados.
- Archivos: `js/data/content.js`, `js/entities/enemy.js`, `js/entities/pickup.js`, XP de élite en `js/systems/expedition.js`; pruebas propias acotadas. No reutilizar drops heredados de tickets/objetos para resolver este cambio.

### B. Compañero que regresa vivo

- Un acompañante de contención activo: al salir con vida, transferir **la misma instancia** con nombre, apariencia, personalidad, arma, vida, cargador, recarga y contadores. No curarlo, rerrollearlo, duplicarlo ni volver a presentarlo como otra persona.
- Sigue al jugador en el mapa, dispara contra enemigos válidos y recibe daño de cuerpos/proyectiles/áreas que correspondan. HP0 significa muerte: deja de seguir/disparar, sin resurrección al salir, cambiar de mapa o entrar a otra grieta. Mostrar vida y estado sin llenar la pantalla.
- Mientras vive, entra al siguiente recinto con el jugador; no se sortea un segundo NPC. Si no hay acompañante vivo, conservar las tasas33%D1–D4/10%D5 y rarezas existentes. Distinguirlo de los dos soldados de puerta, cuyo contrato no cambia.
- Conservar reserva ilimitada con cargador/recarga, sinXP por sus bajas y sin remate de jefe según regla vigente. La frase «matemos con mi compañero» no obliga a quitar esos límites.
- Pausa, elección, transición de carga y muerte/fin de partida congelan/limpian según corresponda. El fallo técnico restaura el origen y su acompañante anterior; no concede un NPC gratis de una sala que no cargó.
- Archivos: `rift-companion.js`, `rift-expedition.js`, `expedition.js`, `game.js` y colisión de proyectiles solo donde sea necesario. Añadir transferencia explícita/suspensión; evitar dos simulaciones de la misma entidad.

### C. Cámara y variedad de la práctica

- Mantener el encuadre de grieta actual en todos los mapas de la expedición: ancho512 en móvil vertical; misma escala antes/dentro/después y al cambiar de mapa. Conservar el comportamiento horizontal, tamaño físico, velocidad y HUD. Regresión390×844/844×390/1280×900 y giro de pantalla.
- La práctica genérica debe permitir probar las cinco BIO y seis portales sin editar URLs. Añadir selección explícita de encuentro/estilo o variante aleatoria/rotación de práctica sin repetir en una ronda; las opciones `grado`/`estilo` de QA siguen deterministas.
- La partida normal mantiene dado50/50, minutos1–4 desde mapa2, máximo2apariciones y peligrosidad50/32/8/7/3. No forzar D5 ni garantizar cada encuentro en la partida natural para solucionar el acceso de prueba.
- Archivos: `camera.js`, `technical-ui.js`, `operations-menu.js`, `rift-expedition.js` y estilos/UI mínimos coherentes con MENUS. No rediseñar los seis portales aprobados.

### D. Cinco salas C1 fieles y BIO más exigentes

- Completar el candidato C1-r2 con las cinco imágenes aprobadas como referencia; su derivado sin personajes debe conservar composición y tener colisiones/profundidad coherentes. Nada de otro suelo genérico para los cinco encuentros. Conservar originales.
- Probar que entrada, jefe y regreso estén libres para sus radios; que el jefe rodee obstáculos, señales se correspondan al impacto, coberturas detengan proyectiles y la retirada sea alcanzable. Atlas/sala fallidos o10s activos de carga: regreso seguro sin premio; no dejar fuera de pantalla una colisión grande invisible.
- Ensayo inicial BIO: cuerpo visual128/136/144/152/160u por D1–D5, sin deformar atlas; HP800/1300/2000/3000/4400 y crecimiento por mapa explícito moderado. Conservar tres ataques y sus avisos. Incrementar presión mediante navegación y menor recuperación, manteniendo reacción justa; no solo inflarHP. Ajustar radios únicamente tras validar pasillos y área visible.
- Los números son **ENSAYO-JUG-002 r1**, ajustables con evidencia antes de publicar; no balance final aprobado. Registrar tiempo de derrota con arma inicial, dos armas y apoyo, sin invulnerabilidad para medir daño/defensa. Un daño letal inyectado solo prueba la rama de premio, nunca dificultad.
- Archivos: candidato NIVELES y `rift-anomalies.js`; no mezclar la restauración de ARM-JUG-001 con estos cambios. Respaldo previo completo del corte antes de trabajar.

### E. Poderes elegidos y visibilidad

- Implementar las cinco fichas R4 tal cual: pulso próximo; cápsula hacia posición fijada con charco; látigo en arco/cupo/pared; corona radial8espinas; membrana que empuja una vez a regulares, casi nada o nada a jefes. Las secuencias y niveles5+extra propios están en JSON seleccionado. No conservar cadena, abanico frontal o brote por cambiarles solo el nombre.
- Usar únicamente los diez atlas16/32 elegidos y cotejarSHA256. Animación y daño deben compartir reloj activo; el dibujo no hace daño, no consume azar y no altera la simulación. Reemplazar retira proyectiles, áreas, ecos y FX pendientes del anterior.
- Conservar primer premio garantizado, después25% y garantía tras3victorias vacías, un solo cobro por encuentro, máximo3 y cuarto con reemplazo/rechazo pausados. Mensajes veraces si no hay premio; no prometer «elige tu poder» cuando no existe oferta.
- Mostrar hasta3 indicadores compactos de poder/nivel/cooldown, aviso de adquisición y su activación visible. Al adquirir uno, dejarlo listo para su primera oportunidad válida; informar que es automático. No añadir botón deultimate ni activar efectos cuando no hay blanco compatible.
- Archivos: `rift-powers.js`, nuevo renderer/datos FX si conviene, `rift-ui.js`/HUD, integración mínima en `game.js` y muerte/colisión. Preservar MEN-005-A y avisos prioritarios.

### F. Presión progresiva de oleadas

- Crear una única tabla/función de ensayo para minuto0–4 y mapa. Objetivo inicial de aparición por segundo0.70/0.95/1.25/1.60/1.90; añadir0.10por mapa y tope3.4. Caps18/22/28/34/40 más2por mapa, extra máximo12 y siempre dentro del límite global64/reserva de jefe.
- HP regulares `(1+.25*(mapa-1))*(1+.15*minuto)`; daño `(1+.12*(mapa-1))*(1+.07*minuto)`; velocidad incremental acotada por debajo de la del jugador base. No aplicar ciegamente esta curva al jefe normal/BIO ni reescalar cada enemigo ya vivo.
- Spawn fuera de pantalla, cercano/alcanzable y repartido; no aparecer encima, detrás de paredes ni eternamente en la esquina lejana. No acumular deuda que estalle al liberar el cap.
- Tiempo activo congelado en pausa/cartas/grieta; cierre exacto300s, jefe obligatorio240s de ensayo, puerta/dos aliados y remanentes conservados. Cambiar de mapa aumenta dificultad; entrar/salir de grieta no reinicia ola ni baja la presión.
- Archivos: `expedition.js` y módulo de parámetros puro si facilita la prueba. No rehacer el spawner histórico/cooperativo ni el sistema de mejoras.

## Plan breve y evidencia requerida

1. Respaldar y fijar corte: hash de fuentes, C1-r2 y diezFX; comparar con público0.39 y separar el candidatoARM-JUG-001 retirado. Confirmar no hay escritores concurrentes.
2. Reproducir los fallos con pruebas antes del cambio: repeticiónD1, salto768→512, NPC eliminado al salir, cristal220 pequeño, poderes elegidos ausentes. Guardar los resultados rojos en `tests/artifacts/lot-est-008/`.
3. Implementar A/B/C por bloques y probarlos. Después D/E/F con las dependencias ya identificadas. Mantener un solo escritor de `expedition`, `rift-expedition` y HUD.
4. Ejecutar pruebas del juego pertinentes y build/check; toda la suite de juego sin `p05-*` al cerrar. No atribuir el fallo conocido deworkerd a este lote ni activar servicios para arreglarlo.
5. Navegador real: cinco encuentros×16/32, seis estilos reconocibles, cuatro formatos; C1/colisiones/ataques/regreso, mismo tamaño de actor, compañero vivo/herido/muerto dentro/fuera/mapa siguiente/reentrada, cinco poderes activados con daño/FX, cuarto reemplazo, XP por tipo y compactación, minutos/mapas crecientes y cierre300s. Verificar sin invasión del HUD ni scroll/zoom.
6. Entrega PROGRAMACION con diff, recursos, hashes, resultados y límites. No declarar todas las combinaciones cubiertas por probar únicamenteD2 o una victoria con daño inyectado.
7. Juanillo revisa el corte y consolida resultados; PROGRAMACION publica la demo autorizada y verifica Pages/código/recursos/casos públicos. Mantener SDK/config/CSP públicos. Las capturas/documentos del juego tienen autorización expresa previa; no copiar el visor privado o archivos personales.

Estado inicial: **lote preparado para ejecutar, no implementado ni publicado por crear este archivo**. Cobertura: revisión incremental de código0.39, ARMAS R4/R6, NIVELES R7.7/C1 y entrega PERSONAJES004; no relee todos los historiales.
