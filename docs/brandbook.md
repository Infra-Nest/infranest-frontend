# Brandbook Infranest / Odimetry

Fuente de verdad breve para las dos landings. Infranest es la startup; Odimetry es su primer producto. Las referencias Pantone son aproximadas para impresión: el HEX indicado manda en digital.

## Arquitectura de marca

- **Infranest**: marca corporativa que desarrolla productos tecnológicos propios y ofrece servicios puntuales para integrarlos en el entorno de cada cliente.
- **Odimetry**: primer producto de Infranest para evaluación externa de ciberseguridad sobre dominios y activos autorizados.
- Redacción recomendada: `Odimetry, un producto de Infranest`.
- Contacto corporativo: `info@infranest.es`.

## Posicionamiento corporativo

Infranest convierte problemas complejos en productos tecnológicos claros y útiles. La marca debe transmitir cercanía, claridad y flexibilidad: escucha a quienes utilizan sus soluciones, explica sus decisiones y adapta la integración y la puesta en marcha al contexto real.

El público prioritario son pymes y profesionales autónomos que necesitan resolver una tarea tecnológica concreta sin asumir un proyecto desproporcionado. Las empresas de mayor tamaño son un público secundario cuando alguno de los productos encaja con sus necesidades.

El modelo es híbrido: productos propios más servicios puntuales de integración, configuración y puesta en marcha. Una petición de cliente no se convierte automáticamente en funcionalidad; se evalúan su valor, repetibilidad y encaje.

## Paleta

| Token | HEX | RGB | Pantone de referencia aproximado |
| --- | --- | --- | --- |
| Ink / Midnight | `#17212B` | `23, 33, 43` | Pantone 433 C |
| Infranest teal | `#0FA9A0` | `15, 169, 160` | Pantone 7716 C |
| Odimetry teal | `#087E8B` | `8, 126, 139` | Pantone 7716 C |
| Warm amber | `#F2B544` | `242, 181, 68` | Pantone 1235 C |
| Paper | `#F5F7F8` | `245, 247, 248` | Pantone Cool Gray 1 C |
| White | `#FFFFFF` | `255, 255, 255` | Pantone White |
| Border | `#D8DEE3` | `216, 222, 227` | Pantone Cool Gray 2 C |
| Dark background | `#101D27` | `16, 29, 39` | Pantone 7546 C |

En digital, no se sustituyen estos HEX por equivalencias de impresión. El teal es la acción y el vínculo; el amber se reserva para señal, énfasis y estados destacados; Ink/Midnight y Dark background sostienen la legibilidad.

## Tipografías

- **Sora** para display, titulares y nombre de marca.
- **Manrope** para cuerpo, navegación, formularios y datos.
- Fallbacks: `Sora, sans-serif` y `Manrope, sans-serif`.

## Logos e isotipos

El isotipo code-native es [public/brand/infranest-mark.svg](../public/brand/infranest-mark.svg): una `N` teal construida como una red dentro de un rectángulo navy redondeado, con nodos ámbar en sus extremos. La `N` vincula el nombre Infranest con una infraestructura conectada; el nodo ámbar funciona como punto de conexión, idea o producto. Ese mismo asset se usa en header, footer y favicon.
El logotipo horizontal está disponible en `public/brand/infranest-wordmark.svg` para fondos claros y en `public/brand/infranest-wordmark-dark.svg` para fondos oscuros.

- Wordmark exacto: `Infranest`.
- Mantener el isotipo íntegro, sin recolorearlo ni separar la `N` de sus nodos.
- Área mínima recomendada: dejar alrededor un espacio libre equivalente al grosor del trazo exterior; en UI, no bajar de 32 px de lado.
- Sobre fondos claros usar el asset original; sobre fondos oscuros conservar el rectángulo navy para que el isotipo mantenga su unidad.
- No deformar, rotar, añadir sombras al asset ni usar capitalizaciones alternativas o `ODIMETRY` como sustitutos del wordmark.

Para Odimetry, el isotipo es `odimetry-frontend/public/brand/odimetry-mark.svg`: escudo teal con un radar ámbar en el centro. El logotipo horizontal de producto está en `odimetry-frontend/public/brand/odimetry-wordmark.svg`.

- Wordmark exacto: `Odimetry`.
- El escudo comunica visibilidad externa y alcance autorizado; no representa una garantía de protección total.
- El producto usa `#087E8B` como teal principal y comparte Ink/Midnight, Paper y Warm amber con Infranest.
- Tamaño mínimo recomendado para ambos isotipos: 32 px; en impresión, 12 mm.
- Mantener la relación `Odimetry, un producto de Infranest` en footer, informes y presentaciones cuando el contexto necesite explicar la arquitectura.

## Mensajes permitidos

- `Desarrollamos productos tecnológicos que convierten problemas complejos en herramientas claras y útiles.`
- `Evaluaciones externas de ciberseguridad para saber qué hay expuesto en Internet y qué medidas tomar.`
- `Odimetry, un producto de Infranest.`
- `Evaluación externa de ciberseguridad sobre dominios y activos autorizados`: identifica servicios expuestos, vulnerabilidades conocidas y configuraciones inseguras, y presenta un informe claro, priorizado y con próximos pasos orientativos.
- Para el estado del producto: `MVP técnico casi terminado; buscamos validar mercado, propuesta y canal de captación.`

Speech corporativo de 30 segundos: `En Infranest desarrollamos productos tecnológicos propios orientados a empresas y profesionales autónomos. Nuestro primer producto es Odimetry, una herramienta que realiza evaluaciones externas de ciberseguridad e identifica servicios expuestos, vulnerabilidades conocidas y configuraciones inseguras, presentando los resultados en un informe comprensible y accionable.`

No afirmar seguridad total, detección exhaustiva, certificación ISO, cumplimiento garantizado, resultados permanentes, remediación automática ni garantías de protección. No inventar clientes, tracción o capacidades no implementadas.

## Aplicación a la landing corporativa

La composición combina superficies claras con bloques navy. El motivo de nido
se extiende a una ilustración vectorial de marca, manteniendo intacto el isotipo.
Sora da protagonismo a los titulares; Manrope facilita la lectura de los textos.
El teal identifica las acciones y el ámbar se reserva para acentos pequeños.

La jerarquía editorial parte de los productos tecnológicos propios para pymes y
autónomos, presenta Odimetry como primer producto y explica el acompañamiento
para adoptar las herramientas. Los textos siguen las fichas de los fundadores:
cercanía, claridad y flexibilidad, sin presentar Infranest como consultoría.
El contacto público es `info@infranest.es`; no se publican teléfonos, clientes,
métricas ni plazos de respuesta sin verificar.

El dominio principal confirmado es `https://infranest.es/`. Los metadatos y datos
estructurados describen la empresa; la página entrega HTML prerenderizado para
que los contenidos y enlaces sean legibles antes de ejecutar JavaScript.

## Comandos locales

### Infranest

Desde `infranest-frontend`:

```bash
nvm use
npm ci
npm run dev
```

Si se ejecuta junto a Odimetry, esta landing usa el puerto 5173:

```bash
npm run dev -- --port 5173
```

### Odimetry

Desde `odimetry-frontend`:

```bash
nvm use
npm ci
npm run dev
```

Si se ejecuta junto a Infranest, usar otro puerto para evitar colisión, por ejemplo:

```bash
npm run dev -- --port 5174
```
