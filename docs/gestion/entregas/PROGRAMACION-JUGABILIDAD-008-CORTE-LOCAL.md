# PROGRAMACION — LOT-EST-008 r1, corte local

26/10/2026 · REV-EST-0012 · **Implementado y comprobado localmente; no publicado.** Base pública anterior 0.39, runtime `8cdac584`, bundle `92026cde30`; nuevo bundle local `dcc443cb5c`, 125 scripts. Respaldo previo `development-backups/lot-est-008-r1/CORTE_ANTES_008.zip` y SHA de 718 archivos. Sólo PROGRAMACION escribió runtime/tests/bundle.

## Fuentes y cambios durante el trabajo

Encargo directo de Iván «Trabaja en todos estos puntos», LOT-EST-008 r1, ARM-POD-SEL-001 r1 (BIO01A/02A/03A/04A/05B), NIVELES R7.7/C1-r2, PERSONAJES004 y MEN-005-A. Durante la ejecución llegaron **ENSAYO-POD-002 r1** (cifras técnicas autorizadas por Juanillo, no balance final elegido por Iván) y **NIV-BIO-C1-APR-003** (Iván aprobó visualmente las cinco salas C1-r2). Leí sus cambios contra el respaldo: APR-003 no cambia PNG ni runtime; ESTRUCTURA recibió aviso para consolidar CON-NIV-08. No sustituí silenciosamente REV-EST-0012. La fusión, ARM-JUG-001/12 armas, cuentas y servicios permanecen fuera del corte.

## Resultado por bloque

- **XP:** cuatro apariencias por valor almacenado (1–12 verde, 13–29 cian, 30–99 violeta, 100+ ámbar); cero XP omitido; reparto y compactación exactos, incluso al cap420 y en la sincronización anfitrión/invitado. Perseguidor12, biológico20, élite84 y BIO0. El Custodio del ensayo V2 es de contención y deposita un núcleo de220XP (ámbar); la ruta histórica de jefes sin contención divide220XP en14orbes de15/16XP (cian). Imán, crédito y multiplicador al recoger conservados.
- **Acompañante:** misma instancia viva al salir, cambiar mapa y reentrar, conservando identidad/arma/HP/cargador/recarga/contadores. Sigue y dispara contra regulares fuera; recibe daño corporal, de proyectil y de área. Muerte permanente para esa instancia. Fallo de sala restaura apoyo anterior o su ausencia; no regala el nuevo. Reserva ilimitada, sin XP por bajas aliadas ni remate aliado de jefe.
- **Cámara/práctica:** 512 unidades verticales en todos los mapas. Sala compacta centrada en el eje excedente y limitada al recinto en el otro; giro de pantalla comprobado. Horizontal y escritorio conservados. La práctica genérica recorre cinco BIO/seis portales sin editar URL; `grado`/`estilo` siguen deterministas. Director natural, pesos y ventana sin cambios.
- **C1-r2/BIO:** cinco composiciones y contornos/depth aprobados. Cuerpos visuales 128/136/144/152/160; HP800/1300/2000/3000/4400, crecimiento por mapa de ensayo limitado a ×2,5; persecución y recuperación ajustadas con tres señales/ataques. Una prueba nueva de radio físico real detectó que D5 con 32u no podía recorrer spawn→entrada; se redujo **sólo su radio físico a30u**. Visual160/PNG/geometría intactos; los cinco radios 24/24/26/28/30 tienen ruta. Imagen fallida o espera10s activos retorna sin premio.
- **Poderes R4:** pulso próximo, cápsula fijada en suelo, látigo en arco/cupo/LOS, corona radial y membrana con un empuje a regulares. Los diez atlas seleccionados16/32 conservan SHA; eventos/MAX comparten un presupuesto por ciclo con ENSAYO-POD-002. El renderer es de sólo lectura. Adquisición lista ante blanco válido; máximo3 y reemplazo/rechazo del cuarto limpiando efectos anteriores. HUD compacto con nombre, nivel, cooldown y aviso subordinado a alertas de peligro.
- **Presión:** tabla única .70/.95/1.25/1.60/1.90 por minuto0–4, +.10/mapa hasta3.4; caps18/22/28/34/40 más hasta12 y reserva bajo límite64. HP/daño/escalado de velocidad se fijan al crear regulares; spawn cercano, libre, alcanzable y fuera de vista, sin deuda de cap. Jefes fuera de curva; corte300s, jefe240s, puerta y dos soldados conservados.

## Evidencia

**316/316** pruebas Node del juego sin `p05-*` (`tests/artifacts/lot-est-008/node-full-final.log`). `npm run build:check` aprobado: SDK local227131bytes, 125scripts y sintaxis válida. Bundle `dcc443cb5c` tras el ajuste D5.

Navegador local: **10 encuentros BIO×16/32**, cuatro formatos distribuidos y giro vertical/horizontal; seis estilos en una ronda, ruta del jefe y tres patrones, escala/origen/compañero/regreso; dos fallos técnicos (imagen y10s) sin premio. En el primer caso se verificó misma instancia tras pasar de mapa2 a3, fuego/daño/muerte fuera. Un cristal de12XP con bonificación real de entrenamiento ×1,5 acreditó18XP una sola vez. Registro y capturas: `tests/artifacts/lot-est-008/browser/`. QA fuerza contacto, invulnerabilidad y daño letal sólo para identidad/flujo/ramas.

Poderes: **10 combinaciones seleccionadas** causaron daño y dibujaron sus atlas; el dibujo no cambió estado y los ciclos terminaron. HUD de tres poderes y sustitución del cuarto: cuatro formatos en16 y32, **8 capturas**. Registro `tests/artifacts/lot-est-008/powers/browser.json`.

Dificultad: **15 combates** con HP, daño, recarga y proyectiles reales, sin invulnerabilidad ni golpe letal. Pistola / pistola+SMG / dos armas+apoyo, respectivamente: D1 derrota65,7s / victorias24,6s y21,2s; D2 victorias86,7s/33,2s/24,6s; D3 derrota144,5s/victorias50,6s/41,1s; D4 derrota143,3s/victorias81,6s/76,2s; D5 tres derrotas43,9s. El bot simple se detuvo488frames en D5: esto **no demuestra imposibilidad para una persona** ni valida balance final. Datos `tests/artifacts/lot-est-008/difficulty/measurements.json`.

**Límites:** no hubo teléfono físico ni aceptación humana de jugabilidad/HUD. La matriz de navegador son diez encuentros distribuidos entre cuatro formatos, no40combinaciones. P05/workerd (cinco fallos de compatibilidad y un emulador omitido) sigue fuera de esta suite y sin servicios activados. D5 requiere prueba manual por el atasco del bot.

## Próximo paso de publicación

Congelar manifiesto y hashes, revisión conjunta con ESTRUCTURA incorporando APR-003, trasladar únicamente este corte al clon de GitHub preservando SDK/CSP/config público y verificar Pages/archivos/escenarios. Este informe **no acredita commit ni URL pública de LOT008**.
