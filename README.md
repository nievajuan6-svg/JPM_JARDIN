# Jardín Juana Paula Manso

Sitio web del Jardín Juana Paula Manso (Las Ensenadas, Unquillo, Córdoba).

Static HTML/CSS/JS, sin build. El contenido editable se guarda en `content/site.json` y `Jardín-informacion.md`; el panel de administración está en `/admin/`.

- **Ver:** abrir `index.html` en el navegador.
- **Fotos:** `images/webp/` (webp optimizadas).
- **Estilo:** acuarela, tipografías Caveat + Nunito, paleta verde/terracota/mostaza.

## Panel de administración

El acceso y el editor propio del jardín están en `/admin/`. La pantalla permite ingresar con una cuenta invitada y editar el contenido del sitio con una interfaz personalizada, sin abrir Decap ni el dashboard de Netlify. Netlify Identity autentica a las personas autorizadas y Git Gateway guarda los cambios en el repositorio.

Una vez conectado el repositorio con Netlify:

1. En el panel de Netlify, habilitar **Identity** para el sitio.
2. En Identity, configurar el registro como **Invite only** e invitar a las personas autorizadas.
3. Habilitar **Git Gateway** en los servicios de Identity.
4. Esperar a que Netlify publique la versión que contiene `admin/`, y abrir `https://jpmjardin.netlify.app/admin/`.

En `/admin/`, ingresá con tu cuenta invitada y elegí **Editar la portada** o **Editar información**. El editor permite actualizar textos, títulos, datos de contacto y horarios; subir o reemplazar fotos; y agregar, quitar o reordenar proyectos, bloques y fotos del carrusel. Las imágenes se guardan en `images/uploads/` y se optimizan a WebP. La información institucional se edita en un área visual con formato de títulos, párrafos, negrita, cursiva y listas. Los cambios se guardan en `content/site.json` o `Jardín-informacion.md` y Netlify publica la nueva versión.

Los cambios se guardan como commits en `main` y Netlify vuelve a publicar el sitio. Al quitar una foto de una lista se borra su referencia del contenido; el archivo de imagen puede seguir guardado en el repositorio, aunque deja de mostrarse en la web. No habilitar el registro público de cuentas.

Para previsualizar localmente el sitio y la pantalla personalizada del panel, ejecutar `python -m http.server 8000` desde la carpeta del proyecto y abrir `http://localhost:8000/` o `http://localhost:8000/admin/`. El acceso y el guardado real requieren la configuración de Netlify descrita arriba y publicar los cambios; el servidor local por sí solo solo muestra el panel.
