# INC-VIS-001 r1 — informe de PROGRAMACION

24/10/2026 · CONTROL_CAMBIOS 0.7 · estado: **corrección aplicada y verificada localmente; parcial por dependencia de recursos, publicación en comprobación**.

La revisión de origen REV-EST-0006 y los lotes r1 se conservan. La incidencia autoriza restablecer la presentación encargada; no amplía armas funcionales, progresión, servicios o economía. El recibo público b06d70b corresponde al estado anterior.

## Diagnóstico reproducido

- Acceso habitual público `?graficos=32`: modo expandido, una pistola, puente r1 desactivado, AF01 cargados **0/16**. En el enlace explícito `?prueba=combate-v2&armas=r1&graficos=32`, el puente está activo y hay **16/16**. ESTRUCTURA repitió esta comprobación con Chromium móvil contra Pages; evidencia local `migration-audit/inc-vis-001/coordinacion-basal` del directorio padre.
- La comparación de PROGRAMACION utiliza los bytes del clon público b06d70b mediante HTTPS virtual para mantener idéntico origen/rutas de ejecución, con Médico, enemigos controlados y arma orientada hacia el este/sureste. Capturas y datos en `migration-audit/inc-vis-001/before*`. No se conoce la URL exacta ni la versión que tenía cargada el iPhone original.
- Biológico regular y Custodio heredaban el mismo cuadro de dibujo de **128×128** antes del alfa, frente a la celda de referencia humana de 56. La física y los datos provisionales deben conservarse al separar la escala de dibujo.
- En B3 `?prueba=mapa-v2`, el modo es clásico, sin gráfico nativo; se reprodujo `6.6000000000000005`. El acceso expandido actual ya lo representa como `6.6`. Encontrar el helper compacto no solucionaba la rama anterior.
- `ARM-VIS-001/R1` contiene AF01 y otros nueve modelos, **no un Subfusil/smg**. AR01 es una granada y FR07 un rifle: no son sustitutos. Las hojas PERSONAJES Armas.png tampoco acreditan ese modelo. ESTRUCTURA coordina su búsqueda con ARMAS.

## Corrección aplicada

- AF01 nativo se precarga y monta en la entrada habitual y el enlace r1, con sus PNG originales y anclas G/A/S. Cargar arte no activa la progresión r1 ni cambia la identidad del modelo. Los respaldos y modelos sin correspondencia aprobada muestran un aviso explícito.
- Celda de dibujo nativa de regulares **56×56**, tomada del rig humano existente; Custodio conserva **128×128**. La celda es igual entre16/32 y las anclas vienen del catálogo. No se modifican w/h/ax/ay lógicos, bodyHeight/bodyRadius, daño, velocidad, r12/r14/r22, cámara512 o M01 240×160. Las barras, cifras y destellos emplean una altura visual separada. Si falla el PNG, el SVG conserva su geometría original.
- Daño numérico compacto en todas las entradas MapTrial V2, también B3: `6.6000000000000005` → `6.6`. Las pruebas llaman al `Enemy.hurt` real y comprueban la pérdida de HP original sin redondearla. Se respetan el ajuste de números, los avisos de texto y sus topes.
- HUD V2 en un flujo: personaje/reloj/pausa; vida/nivel/XP; objetivo/localizador. Munición y habilidades permanecen en sus controles. Se retiran reloj, armas y objetivo duplicados del texto técnico; el aviso de exploración genérico sólo aparece si hay información relevante. Alertas/grietas y cofres descubiertos se conservan. El radar se aparta del aviso de respaldo en vertical. La hoja CSS tiene una revisión en su URL para esta entrega, sin atribuir la captura previa a caché.

## Evidencia real y límites

Cinco regresiones nuevas fallaron antes de sus correcciones: precarga/montaje ordinarios de AF01, número antiguo V2, escala nativa y geometría de respaldo. Después, 30/30 casos focalizados y la suite de53 archivos: **303 pruebas,297 aprobadas,5 fallidas SQLite/P05 por compatibilidad workerd y1 omitida por emuladores**. Compilación y check:107scripts. Fuente y copia pública tienen bundles propios generados, con CSP pública previa conservada; no se supone igualdad byte a byte entre esos dos compilados.

Navegador local: **29/29** escenarios en HTTPS virtual, con fuentes/compilado, PC/vertical/horizontal,16/32, entrada habitual/r1 y regresiónB3. Cada escenario nativo normal recorre **32 poses reales en partida**: Guardia/Médico × una/dos copias de pistola × ocho direcciones; la segunda copia se adquiere por el sistema de premios con un disparador de QA. Se comprueban los recursos dibujados, estado físico conservado y golpes de6.6 reales. Fallos PNG AF01/piezas del Médico y carga demorada se inyectan explícitamente: el juego inicia y el respaldo se avisa; sus404 esperados no son errores ocultados. Cero errores JavaScript en los casos. Los escenarios de fallo no acreditan arte aprobado en el respaldo.

Regresiones adicionales de combate AF01: **8/8** escenarios con cartas, premio, MAX y paso al mapa2; inicio/pausa/aislamiento de cuentas: **2/2**. QA usa posiciones controladas, reloj muy lento y detiene sólo el tick de combate durante las poses visuales; no son partidas naturales ni pruebas de balance. La salida física de proyectil se conserva: los anclajes visuales no recalibran paredes o colisiones. Las capturas en partida fueron inspeccionadas por PROGRAMACION, sin declarar aprobación humana final.

Los tres agentes Luna máximo se detuvieron por límite de uso sin aportar cambios. La raíz implementó, revisó y ejecutó las comprobaciones; no se les acredita código o validación.

Comparativa controlada del estado público anterior, reproducido desde el clon verificado mediante HTTPS virtual, y esta corrección (fixtures comparables, distinto equipo después del premio de QA): [antes](../evidencias/inc-vis-001/antes-normal.png) · [después](../evidencias/inc-vis-001/despues-normal.png) · [fallo de PNG inyectado](../evidencias/inc-vis-001/despues-failed.png). Datos: [validación](../INC-VIS-001_VALIDACION.json) y [publicación](../INC-VIS-001_PUBLICACION.json).

## Pendientes materiales

Recurso aprobado de Subfusil: 8 vistas × 16/32, correspondencia inequívoca con `smg`, anclajes de agarre/apoyo/salida y contrato de tamaño. Escopeta/Porra del runtime anterior también requieren correspondencia aprobada propia para sustituir sus dibujos; no se equipan modelos de otra identidad. Si no aparece ese recurso, se conservará el comportamiento existente con su condición provisional visible y la incidencia seguirá parcial por esa dependencia.

CC04/TE01/F24 jugables, pose/animaciones compatibles y sala de fusión siguen fuera de esta corrección; gate cerrado. Sin aceptación manual de esta revisión, teléfono físico, balance o servicios reales.

### Fuentes concurrentes evaluadas

Se detectaron y revisaron dos actualizaciones concurrentes: INC-VIS-001 r1 incorpora la reproduccion publica independiente y la consulta a ARMAS; PAUTA_ARMAS R2.1 agrega ARM-SMG-REC-001 r1, carencia de sprite aprobado para smg y su minimo de recurso por producir/aceptar. No cambian combate, reglas o recursos implementados. Se integra esa evidencia documental sin sustituir silenciosamente las revisiones r1 de origen; diff y hashes conservados en migration-audit/inc-vis-001. [Ficha ARMAS](../../referencias/armas/inc-vis-001/ARM-SMG-REC-001-r1.md).
