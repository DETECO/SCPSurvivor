# Corrección de carga pública — LOT008

26/10/2026 · Juanillo / ESTRUCTURA · **AD02 técnica; no cambia diseño ni balance**.

El primer despliegue0.40 (`b542e8348d7a8ac2b7d5ae91a5f047c8fa34b724`, bundle público `2598b62fda`) sirve los recursos correctos, pero su matriz pública quedó incompleta por espera de imagen. Juanillo completó D1–D3 y agotó la espera de combate en D4; PROGRAMACION observó `asset_timeout` en D3/32. Los grados variables y los archivos publicados correctos apuntan al ciclo de carga, no a una sala o atlas ausente. No se declara el conjunto público aprobado a partir de los casos que sí pasaron.

El código pedía la lámina al generar cada recinto, guardaba su imagen por instancia geométrica y cancelaba la entrada a los diez segundos activos. La lámina de producción ronda2,5MB. El correctivo autorizado por Juanillo adelanta la solicitud al aparecer el portal, reutiliza la imagen por recurso y amplía la espera técnica máxima a **30segundos activos**, con aviso desde10. Un fallo explícito sigue devolviendo al origen; no se dibuja una sala genérica ni se entrega premio por cargar mal.

Este límite sustituye únicamente la guarda técnica10s descrita en LOT008 y documentos anteriores. La autorización deriva del encargo vigente de corregir la experiencia y comprobar su funcionamiento público. No altera tiempos de combate, pausa del origen, probabilidades, encuentros, arte, peligrosidad, recompensas, compañeros o retirada. Los PNG aprobados se conservan exactos.

PROGRAMACION conserva la escritura e implementación. Debe demostrar: solicitud antes del contacto, reutilización sin duplicar imágenes, carga lenta de15s que termina correctamente con origen congelado, archivo fallido y espera30s con retorno seguro sin premio; después, repetir los diez encuentros públicos y la comprobación independiente de Juanillo en secuencia para no sumar tráfico de dos matrices simultáneas. Las pruebas de dificultad y combate anteriores conservan su alcance; este ajuste no añade una aceptación humana.

El diagnóstico inicial incompleto se conserva en `migration-audit/revision-jugabilidad-008/publica-040/INTENTO_INCOMPLETO.json`. El informe y recibo final de PROGRAMACION, junto a la [revisión de Juanillo](informes/LOT-EST-008-juanillo.md), deben acreditar el correctivo antes del cierre; esta adenda registra autoridad y criterios, no afirma por sí sola su verificación pública.
