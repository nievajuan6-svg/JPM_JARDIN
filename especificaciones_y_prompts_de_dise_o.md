# Guía de Replicación Visual: Estilo Lauke.lt para Sitio Escolar

Esta guía contiene la arquitectura, paleta visual, código CSS base y un sistema detallado de prompts para que puedas generar todos los assets visuales (fondos de títulos tipo acuarela, botones orgánicos, ilustraciones) usando **Google Gemini / Imagen 3**.

---

## 1. Identidad Visual y Estilo General

El sitio `lauke.lt` (Lauko Mokykla / Escuela de Naturaleza) utiliza una estética orgánica, cálida y de aprendizaje basado en la naturaleza.

### Características Clave:
* **Paleta de Colores:** Verdes musgo, terracota, amarillo mostaza, tonos calidos de papel, beige suave.
* **Tipografías:**
  * *Títulos / Títulos manuscritos:* Google Fonts como `Caveat`, `Patrick Hand` o `Amatic SC`.
  * *Texto base:* `Nunito` o `Quicksand` (fuentes sans-serif redondas y legibles).
* **Elementos Gráficos:**
  * Fondos de título estilo mancha de acuarela (*watercolor splashes/blobs*).
  * Bordes orgánicos, irregulares y redondeados (`border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;`).
  * Iconografía dibujada a mano.

---

## 2. Paleta de Colores SUGERIDA (CSS)

```css
:root {
  --color-verde-bosque: #2D5A27;
  --color-verde-suave: #8FBC8F;
  --color-terracota: #C86D51;
  --color-mostaza: #E0A93B;
  --color-fondo-papel: #FDFBF7;
  --color-texto: #333333;
}
```

---

## 3. Sistema de Prompts para Google Gemini (Generación de Imágenes)

Para replicar los botones, títulos e ilustraciones usando Gemini (Gemini Advanced / Imagen 3), utiliza la estructura exacta que se muestra a continuación.

### A. Botones Orgánicos y Texturas de Acuarela
Genera manchas sueltas para colocar detrás del texto o usarlas como fondo de botones.

* **Prompt para Botón Acuarela Verde:**
  > "A clean, isolated single watercolor brush stroke splash, organic soft badge shape, organic edges, soft pastel sage green and moss green tones, transparent or pure white background, minimal vector aesthetic, high resolution, no text."

* **Prompt para Botón Acuarela Terracota / Cálido:**
  > "An isolated warm terracota color watercolor splash stain, irregular oval button shape, subtle paint texture with soft wet edges, pure white background, flat lay vector style, high quality, no text."

### B. Encabezados y Banners Escolares
* **Prompt para Banner de Bienvenida Escolar:**
  > "Children's outdoor nature school banner background, gentle watercolor illustration of trees, green hills, leaves, and soft sun rays, pastel watercolor aesthetic, warm and friendly, plenty of blank central space for text overlay, high quality, vector style."

### C. Iconos Dibujados a Mano
* **Prompt para Set de Iconos Estilo Dibujo Escolar:**
  > "Set of hand-drawn minimalist icons for an eco-friendly school: a green leaf, a backpack, an open book, a tree, a paintbrush. Pencil and soft watercolor fill style, friendly warm colors, isolated on white background."

---

## 4. Estructura HTML & CSS Recomendada

A continuación se muestra una estructura básica con CSS embebido para simular la apariencia de bordes de acuarela y tipografía hecha a mano.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Escuela en la Naturaleza</title>
  
  <!-- Tipografías de Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

  <style>
    body {
      background-color: #FDFBF7;
      color: #333;
      font-family: 'Nunito', sans-serif;
      margin: 0;
      padding: 0;
    }

    h1, h2, .titulo-manuscrito {
      font-family: 'Caveat', cursive;
      color: #2D5A27;
    }

    /* Efecto de título sobre mancha de acuarela */
    .titulo-acuarela {
      display: inline-block;
      position: relative;
      font-size: 3rem;
      padding: 10px 30px;
      margin-bottom: 20px;
    }

    .titulo-acuarela::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #8FBC8F;
      opacity: 0.35;
      z-index: -1;
      /* Borde orgánico simula trazado manual */
      border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
      transform: rotate(-1.5deg);
    }

    /* Botones estilo acuarela/orgánico */
    .btn-acuarela {
      font-family: 'Caveat', cursive;
      font-size: 1.5rem;
      text-decoration: none;
      color: #ffffff;
      background-color: #C86D51;
      padding: 12px 28px;
      display: inline-block;
      border: none;
      border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
      box-shadow: 3px 3px 0px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-acuarela:hover {
      transform: scale(1.05) rotate(1deg);
      background-color: #B25A40;
    }

    /* Tarjetas de contenido */
    .card {
      background: #ffffff;
      border: 2px solid #E0E0E0;
      border-radius: 20px 10px 25px 15px/15px 25px 10px 20px;
      padding: 24px;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
  </style>
</head>
<body>

  <header style="text-align: center; padding: 60px 20px;">
    <h1 class="titulo-acuarela">Nuestra Escuela de Campo</h1>
    <p style="font-size: 1.2rem;">Un espacio para aprender y crecer en la naturaleza.</p>
    <a href="#contacto" class="btn-acuarela">Inscripciones Abiertas</a>
  </header>

</body>
</html>
```

---

## 5. Pasos para Implementar la Web

1. **Definir la estructura de navegación:**
   * Inicio
   * Proyecto Educativo / Metodología
   * Galería / Salidas de Campo
   * Contacto e Inscripciones
2. **Generar Assets en Gemini:** Usar los prompts incluidos arriba para obtener fondos, manchones de acuarela y elementos decorativos aislados (con fondo blanco o transparente).
3. **Subir tipografías:** Importar `Caveat` para encabezados y `Nunito` para textos de lectura continua.
4. **Armado en WordPress / Webflow / Código directo:** Utilizar clases de CSS con bordes irregulares (`border-radius` asimétricos) para emular el trazado orgánico sin recargar el sitio con demasiadas imágenes.