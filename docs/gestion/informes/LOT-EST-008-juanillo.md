# Revisión independiente de LOT-EST-008 — Juanillo

26/10/2026 · REV-EST-0012 + AD01 · **Corte local conforme; publicación autorizada a PROGRAMACION, comprobación pública pendiente.**

Se resolvieron las causas reproducidas en 0.39: práctica fijada en D1/semilla repetida, cámara distinta entre zonas, compañero eliminado al regresar, XP idéntica de regulares, poderes anteriores a la selección R4 y presión insuficiente. Se integran las cinco salas C1-r2 visualmente aprobadas; [AD01](../REV-EST-0012_ADENDA_C1_R2.md) cierra CON-NIV-08 preservando el corte anterior.

[Entrega técnica](../entregas/PROGRAMACION-JUGABILIDAD-008-CORTE-LOCAL.md) · [Contrato del lote](../lotes/LOT-EST-008-r1.md) · [Evidencias propias](../evidencias/LOT-EST-008-juanillo/MANIFIESTO.json).

## Contraste efectuado

- Manifiesto técnico final `4f00850913b7e7fe3c567994f0d38e00fa5785249dbc7557fd16a085f8d19b2e`: **68/68 archivos coinciden**, incluidos los diez FX y cinco PNG C1-r2. Se incorporaron al traslado cuatro pruebas ya existentes y se corrigió la descripción documental del Custodio; no hubo deriva del runtime frente a mi QA independiente. Las lecturas anteriores64/64 y65/65 quedan conservadas en las evidencias. No se modificaron fuentes históricas para atribuirles las pruebas nuevas.
- Navegador independiente: cinco entradas, victorias, premios y regresos. El apoyo conserva nombre, aspecto, arma y sus **38/45 HP** tras herirlo; no se cura al cambiar de zona. El poder obtenido corresponde a cada BIO. La muerte del apoyo fuera se conserva. Sin errores JS ni cambios de fuente durante la prueba.
- Escala antes/dentro/después: **0,76171875** en vertical390×844 y **0,9285714286** en horizontal844×390. La cámara compacta se centra sin agrandar el personaje. Inspección visual de salas y FX; sin rediseñar humanos, armas o los seis portales.
- XP real de muertes mediante `Enemy.die()`: Perseguidor12, Biológico20 y Custodio220, recogibles con total exacto. El Custodio de la expedición tiene `containment:true` y deja **un núcleo220 ámbar**. La explosión histórica de14orbes pertenece a la ruta no-contención y no describe este jefe. Cuatro colores, formas y tamaños dibujados por el código real, además del control de valor cero/compactación del implementador.
- Regresión propia de HUD completa en **cuatro formatos**, incluida pausa, controles, cartas, recarga y grieta. Regresión de humanos/armas: **352 montajes, 64 poses de incapacitación, 24 animaciones y ocho casos de combate**, en16/32. Todas aprobadas; sin errores JS ni deriva del corte.
- Se leyeron los resultados nuevos de PROGRAMACION: **316/316 pruebas Node**, build/check125scripts, diez encuentros BIO×16/32 distribuidos entre cuatro formatos, rotación/selector de práctica, tres patrones por BIO, compañero fuera/reentrada/mapa siguiente/muerte y dos fallos técnicos sin premio. Los diez poderes dibujan los atlas elegidos y causan daño; HUD de tres poderes/cuarto reemplazable en ocho capturas. Es cobertura propia del implementador contrastada, no se suma a la independiente como si fueran pruebas distintas.

## Dificultad y límites

Los quince combates del bot usan armas/recargas/daño/vida reales, sin invulnerabilidad, curación ni daño letal inyectado. Con pistola+SMG básicas vence D1–D4; D5 derrota al bot. Su atasco de488frames en D5 impide concluir que sea imposible para una persona. El radio físico D5 se redujo32→30 tras una prueba de conectividad, manteniendo cuerpo visual160 y PNG aprobados. Los cinco radios reales tienen ruta.

Las cifras de BIO, XP, oleadas y poderes son **ensayo técnico**, no balance final aceptado por Iván. Las pruebas de flujo sí inyectan posición, HP o daño para recorrer estados y no prueban dificultad natural. No se probaron teléfono físico, Safari real ni todas las40combinaciones BIO×formato×resolución. Las cinco salas C1 son fijas; variantes interiores procedurales pendientes.

Se autoriza a PROGRAMACION publicar el corte y verificar Pages/recursos/recorridos públicos, conservando SDK/config/CSP del clon. Fusión/ARM-JUG-001, ultimate, gachas, cuentas, persistencia y servicios reales conservan sus estados anteriores; no se activan mediante este lote. La publicación y el cierre documental se acreditarán con sus recibos nuevos.

## Correctivo R2 de carga — verificación adicional

El primer despliegue0.40 se publicó, pero las matrices públicas quedaron incompletas por `asset_timeout` variable de las salas. Se conserva ese intento como evidencia parcial y no se contabiliza como matriz aprobada. [AD02 técnica](../REV-EST-0012_ADENDA_CARGA.md) autoriza corregir la carga sin cambiar diseño ni balance. [Entrega R2](../entregas/PROGRAMACION-JUGABILIDAD-008-CARGA-R2.md).

Revisión del correctivo: **14/14 archivos coinciden** con el manifiesto `f7fd7fda8a7c67144ecb16a8e24841799fb0c3ecbeea5e3e5a740359348dbd2c`. Se adelanta la petición al portal, se comparte la imagen por recurso y se avisa a10s con guarda30s. PROGRAMACION comprueba318/318 pruebas Node y trece grupos de navegador en fuente y clon, incluidas rutas de fallo; no se repite el balance porque no cambia combate.

Prueba independiente adicional en navegador local: una respuesta PNG retenida **15,17 segundos reales**, una única solicitud y reutilización al generar otra geometría. A los11s la entrada seguía esperando; después comenzó combate sin perder HP del jugador/compañero ni tiempo del origen. Sin invulnerabilidad, curación, salto de reloj ni daño letal para este caso; solo contacto forzado para entrar. Sin errores JS ni deriva. [Registro exacto](../evidencias/LOT-EST-008-juanillo/carga-lenta-real-15s.json). Pendiente la nueva matriz pública secuencial y su recibo para cerrar0.40.1.

## Cierre público posterior a la revisión local

PROGRAMACION publicó el correctivo0.40.1 en `main` (`72969306342e84c2d012f2f3941a600c295d0250`) y comprobó13 grupos de navegador,12 de poderes y24/24 archivos críticos en Pages. La revisión independiente posterior de Juanillo terminó **PASS** para las cinco grietas: recompensas correspondientes, XP/cristales exactos, regreso del apoyo con HP/arma conservados, muerte del apoyo y escala constante, sin errores JavaScript. [Evidencia independiente](../evidencias/LOT-EST-008-juanillo/publica-0401/contratos.json) · [validación consolidada](../LOT-EST-008_VALIDACION.json) · [recibo técnico](../LOT-EST-008_PUBLICACION.json). Estos resultados sustituyen el pendiente público señalado arriba; el balance humano y el teléfono físico aún no se han aceptado/probado.
