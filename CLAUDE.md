# JARDIN JPM

Sitio del **Jardín Juana Paula Manso** (Las Ensenadas, Unquillo, Córdoba).

- **Qué es:** HTML/CSS a mano, sin build. `index.html` es el mockup que aplica el estilo visual de `especificaciones_y_prompts_de_dise_o.md` (estilo lauke.lt: acuarela, bordes orgánicos, Caveat + Nunito, verdes/terracota/mostaza). Ese `.md` es la fuente de specs y de los prompts para Gemini; los assets de imagen todavía no existen (los fondos de acuarela del mockup son SVG/CSS puros). `index_gemini.html` es una versión previa hecha con Gemini; `index.html` la supera y es el archivo vivo.
- **Orientación pedagógica:** el jardín NO es Waldorf declarado; tiene esa orientación. Los textos dan la intención (naturaleza, ritmo, juego libre, arte, materiales nobles, comunidad) sin nombrar ninguna corriente. No agregar "Waldorf" textual.
- **Secciones:** `#inicio` (hero + post-it de inscripciones), `#jardin` (4 pilares), `#proyectos` (carrusel), `#testimonios` (Familias), `#contacto` (datos + mapa). Botón flotante de WhatsApp; nav con "Familias" e "Inscripciones".
- **Datos cargados:** dirección (Rosario Vera Peñaloza, Las Ensenadas S/N), horario (cierra 16:30), teléfono 03543 48-7963, plus code QM94+JH con link a Google Maps. El `openingHours` L-V y geocoords del JSON-LD son estimados (Gemini): confirmar con Juan.
- **Fotos reales:** no existen todavía; van dentro de `.hero-fondo` (hero) y de cada `.foto` (bloques, carrusel) como `<img>` con object-fit cover. Hay un `.foto-pie` (Caveat, gris) bajo cada marco con el tipo de foto que va ahí. Mientras tanto, placeholders beige con ícono de cámara.
- **Testimonios:** textos de ejemplo, pendientes de reemplazar por reales de las familias.
- **Animaciones:** JS puro sin dependencias — header sticky con clase `scrolled`, apariciones al scroll (IntersectionObserver + `.reveal`), trazos SVG de pincel con `stroke-dasharray` (`.trazo`), carrusel infinito por clones, grano de papel por data-URI. Todo respeta `prefers-reduced-motion` y funciona sin JS (contenido visible por defecto; `.js` se agrega en el head).
- **Codificación:** el archivo es UTF-8. Editarlo con las herramientas `Read`/`Edit`/`Write`; NO usar `Set-Content -Encoding UTF8` de PowerShell sobre él (duplica la codificación de los acentos).
- **Qué NO tocar:** `especificaciones_y_prompts_de_dise_o.md` sin que Juan lo pida.
- **Cómo probar:** abrir `index.html` en el navegador.
