# REV-EST-0012 — jugabilidad, grietas y decisiones nuevas

**Actualización del encargo:** [corte implementado y revisado localmente](informes/LOT-EST-008-juanillo.md), publicación0.40 autorizada a PROGRAMACION y pendiente de recibo público. [AD01](REV-EST-0012_ADENDA_C1_R2.md) incorpora la aprobación posterior C1-r2/APR-003. El registro inicial y sus fuentes preservadas que siguen conservan su momento y alcance.

26/10/2026 · Juanillo / ESTRUCTURA · Control0.14. **Decisiones consolidadas y LOT008 encargado; implementación/publicación pendientes de evidencia nueva.**

Iván confirma cristales deXP diferenciados y encarga seis correcciones de experiencia jugable. Su nueva instrucción cambia la permanencia del compañero: el que sobrevive regresa con el jugador, conserva vida/equipo y puede morir. El tamaño de cámara de la grieta se mantiene en todos los mapas. Se solicita más dificultad progresiva, variedad y poderes elegidos perceptibles. [Lote completo](lotes/LOT-EST-008-r1.md).

Se recuperan dos entregas posteriores al corte0.39: **ARMAS R4/R6** eligió los poderes01A/02A/03A/04A/05B y fija área→ESTRUCTURA→PROGRAMACION. **NIVELES R7.7** contiene cinco salasC1 aceptadas y un candidatoC1-r2 aún sin cierre; debe completarse y probarse, no heredar la evidencia deC1-r1. Se conservan seis estilos de portal aprobados, cinco salas y cinco identidadesBIO como cantidades distintas. PERSONAJES004 cierra documentalmente su reparación ya publicada.

Causas localizadas: práctica sin grado fijaD1 y semilla1337; cámara768 en mapas sin la revisiónM01 frente a512 en sala; salida eliminaNPC y no hay simulación suya fuera; contenido usa14XP para ambos regulares y la muerte de contención fuerza el cristal pequeño; runtime conserva poderes de ensayo anteriores, sin los diezFX seleccionados; cap24 y crecimientoHP mínimo explican parte de la presión insuficiente. La dificultad natural necesita medición propia, no se deduce de matar al jefe medianteQA.

Se cotejaron las diez huellasFX elegidas. Los tres agentes de auditoría fallaron por límite de uso; sus revisiones no se atribuyen como completadas. Juanillo continuó la revisión directa. [Fuentes preservadas y cobertura](revisiones/REV-EST-0012/MANIFIESTO.json) · [decisiones/IDs humanos](revisiones/REV-EST-0012/DECISIONES.json).

PROGRAMACION recibe LOT008 con un solo escritor, pruebas rojas/verdes, integración por bloques y publicación después de revisión deJuanillo. Se eligió6.1/alto ante el límite deLuna, conforme a la autorización deIván para elegir modelo/esfuerzo. ARM-JUG-001/12armas y fusión se conservan para revisión posterior; sus cifras/código no se aprueban por esta consolidación. No se activaultimate, gacha, guardado ni servicios reales.

Cobertura real: cinco turnos recientesARMAS, dosNIVELES, dosPERSONAJES y dosPROGRAMACION; revisión de los nuevos archivos y dependencias. SONIDO/MENUS/ICONO conservan sus cortes previos, sin afirmar otra lectura completa. La demo pública acreditada sigue0.39 hasta que exista recibo nuevo. Se conserva el historial y no se altera el52/100histórico ni se inventa avanceV2.
