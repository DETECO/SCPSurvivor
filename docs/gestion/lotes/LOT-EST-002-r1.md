# LOT-EST-002 r1 — Progresión y primera fusión de armas

23/10/2026 · Juanillo / ESTRUCTURA · **Listo documentalmente para PROGRAMACION por fases. Implementación, pruebas y publicación no realizadas por esta consolidación.**

## Decisiones y revisiones fijadas

- **EST-ARM-001 r1:** aprobada por Iván mediante «acepto todo.» después de presentar el cierre. [Reglas completas aprobadas](../../CIERRE_ARMAS_PROGRESION_FUSION_V1.md), apartados 2–9. Este lote conserva esas reglas; no las sustituye por una ficha posterior sin revisar el efecto del cambio.
- **ARM-VIS-001/R1**, observada en [pauta ARMAS R2](../../PAUTA_ARMAS.md): nueve armas y F24 aprobadas visualmente. No equivale a aceptar nueve armas funcionales.
- **REV-EST-0005**, [registro de consolidación](../CONTROL_CAMBIOS.md). [Propuesta r1 conservada](../../CIERRE_ARMAS_PROGRESION_FUSION_V1_PROPUESTA.md), SHA-256 `03ab0d512e07ed3a97252c988512e42c831cd82c4cd7033075b612ec97dd1c2a`.

## Resultado de juego esperado

Una arma inicial, hasta dos simultáneas con progreso independiente por copia. Escala **1 → 2 → 3 → 4 → 5 → MAX**, cinco ascensos desde la adquisición; sustituye las cuatro ramas de armas. Poderes/generales siguen 5 + extra y ultimates cinco permanentes.

La estación accesible se reserva desde mapa 2, una por mapa mientras quede el único uso de expedición. Dos modelos distintos compatibles MAX se consumen sin coste adicional ni fallo; el compuesto FINAL ocupa una ranura, libera la otra y no puede subir otra escala ni refusionarse. Una recompensa elegible repone un arma nivel 1, con garantía del siguiente jefe si falta y premio único. Reemplazar el compuesto no restaura componentes ni uso.

Primera receta: **CC04 Katana MAX + TE01 Emisor láser MAX → F24 Hoja fotónica FINAL**. Solo esta receta nueva se habilita en el ensayo. Se mantienen rareza Rara, daño combinado 36, ciclo 0,72 s, reparto de daño 60/40 y límites de alcance, objetivos y contacto del apartado 5 del cierre. Los perfiles base y extras AF01/CC04/TE01 están fijados en su apartado 6; no usar las ramas antiguas para completarlos por inferencia. Los bonos generales se aplican una sola vez.

## Recursos exactos

- [Catálogo direccional 1.0](../../referencias/armas/armas-prueba-direccionales-v1/catalogo.json) y [aprobación visual](../../referencias/armas/armas-prueba-direccionales-v1/APROBACION.md).
- Modelos AF01, AR01, CC04, IN03, FR07, PE04, RU04, TE01, AN09 y F24: ocho direcciones × 16/32, **160 PNG aprobados**. Conservar originales; las rutas de recurso son las del catálogo citado.
- [Datos de diseño V1](../../referencias/armas/armas-v1/DATOS_DISENO_ARMAS_V1.json): referencia de identidad y arte. Ante reglas de progresión/fusión previas incompatibles, prevalece EST-ARM-001 r1; no importar las otras 62 recetas como aprobadas.

## Dependencias y orden de trabajo

| Paso | Entrega | Dependencia o límite |
| --- | --- | --- |
| A | Visor de los diez modelos, ocho vistas y ambas resoluciones; calibración de agarre, apoyo y salida | ARMAS/PERSONAJES conservan sus recursos. Los anclajes estimados no acreditan agarres comprobados |
| B | AF01/CC04/TE01, escala única, cartas y recompensas válidas, dos copias independientes | Puntería real 360°, sprite más próximo entre ocho; no alterar el combate histórico por inferencia |
| C | Práctica: Katana nivel 1, láser como segunda recompensa, ambas MAX, estación desde mapa 2 y F24 | NIVELES resuelve lugar transitable dentro del escenario; MENUS resuelve vista previa, pausa y confirmación |
| D | Recorrido completo, reposición del hueco, verificación 16/32 e informe | No habilitar una pareja que requiera una pose aún no disponible; solicitar recurso a PERSONAJES/ARMAS. Las otras seis armas jugables se incorporan después por familia con su ficha |

Dos armas siguen atacando de forma independiente, con objetivo, intervalo, munición y progreso propios. No justificar la segunda con cuatro brazos, mochilas, arnés o un poder gratuito. Las parejas con poses nuevas necesitan ese recurso antes de habilitarse; esto no cambia el máximo global a una sola arma activa.

## Criterios de prueba

1. Cada arma adquirida empieza en 1 y llega a MAX tras cinco ascensos. Comprobar reemplazo y dos copias iguales con progreso independiente; no fusionar modelos iguales.
2. Ofertas reconocen exclusivamente copias/poderes equipados y sus topes. No repetir una opción, ofrecer ausentes/MAX ni desperdiciar un ascenso de cofre; comprobar saturación y categoría agotada.
3. Fusión solo con dos modelos compatibles MAX. Sin requisito de duplicados, moneda o azar. Vista previa informa el resultado y efectos sustituidos; cancelar no consume, cura, recarga ni cambia azar. Respetar congelaciones vigentes después de 5:00.
4. Confirmación procesa una sola transacción. Verificar doble activación, cambio de mapa y reemplazo de F24 sin recuperar el uso; FINAL sin nueva escala/refusión. Conservar la colección permanente.
5. Reposición del hueco a nivel 1, con garantía de jefe si sigue vacío y sin duplicar su premio. Las cartas no mejoran ranuras vacías ni componentes consumidos.
6. Daños, intervalos, extras y alcances coinciden con los apartados 2, 5 y 6 del cierre. F24 respeta paredes, cupos y máximo un corte más una proyección por enemigo/ciclo; no acumula extras antiguos ni duplica bonos globales.
7. Revisar montaje/ataques y tamaño de mundo en 16/32. No declarar una pareja lista si requiere una pose pendiente. Registrar el ritmo real hasta MAX y rendimiento; alcanzar una fusión en mapas 2–3 es objetivo a medir, no garantía de balance.

## Evidencia de salida

PROGRAMACION debe entregar informe con revisión implementada, pasos cubiertos, pruebas realizadas y resultados, pendientes de poses/sala/interfaz, limitaciones y URL solo si existe publicación autorizada y comprobada. Enlazar ese informe desde CONTROL_CAMBIOS al recibirlo. [Presentación 0.33](../../PRESENTACION_INTEGRADA.md) es antecedente y no evidencia este lote.

No se amplía a cuentas, gacha real, compras, guardado de expedición ni balance definitivo. **LOT-EST-001 r1 de grietas es independiente.** Esta entrega no envía instrucciones a otros chats ni modifica sus recursos.
