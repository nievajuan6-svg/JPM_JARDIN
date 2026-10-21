# Jardín Juana Paula Manso

Sitio web del Jardín Juana Paula Manso (Las Ensenadas, Unquillo, Córdoba).

Static HTML/CSS/JS, sin build. El contenido editable se guarda en `content/site.json` y `Jardín-informacion.md`; el panel de administración está en `/admin/`.

- **Ver:** abrir `index.html` en el navegador.
- **Fotos:** `images/webp/` (webp optimizadas).
- **Estilo:** acuarela, tipografías Caveat + Nunito, paleta verde/terracota/mostaza.

## Panel de administración

El acceso propio del jardín está en `/admin/`: muestra una pantalla sencilla, inicia sesión con Netlify Identity y permite elegir qué contenido editar. El editor de contenidos usa **Decap CMS** con Git Gateway; Static CMS, indicado en un borrador anterior del plan, está archivado y sin mantenimiento.

Una vez conectado el repositorio con Netlify:

1. En el panel de Netlify, habilitar **Identity** para el sitio.
2. En Identity, configurar el registro como **Invite only** e invitar a las personas autorizadas.
3. Habilitar **Git Gateway** en los servicios de Identity.
4. Esperar a que Netlify publique la versión que contiene `admin/`, y abrir `https://jpmjardin.netlify.app/admin/`.

En `/admin/` aparece el panel propio del jardín. Ingresá con tu cuenta invitada y elegí **Editar la portada** o **Editar información**; cada acceso abre directamente ese contenido en el editor. Netlify Identity se usa solo para verificar la cuenta y Git Gateway para guardar los cambios: la pantalla `/admin/` no lleva al dashboard de Netlify. En el editor se pueden actualizar textos de portada, bloques con fotos, proyectos, Familias, contacto/inscripciones, galería, pie y referencias. Las listas permiten agregar, borrar y reordenar elementos; las fotos se suben al repositorio en `images/uploads/` y se optimizan a WebP. La colección **Información institucional** permite editar los títulos, listas y textos largos de `Jardín-informacion.md`; esa misma fuente se muestra en `informacion.html`.

Los cambios se guardan como commits en `main` y Netlify vuelve a publicar el sitio. Al eliminar una foto de una lista se quita su referencia del contenido; el archivo de imagen ya guardado en el repositorio puede borrarse por separado desde la biblioteca multimedia si ya no se usa. No habilitar el registro público de cuentas.

Para previsualizar localmente el sitio y la pantalla personalizada del panel, ejecutar `python -m http.server 8000` desde la carpeta del proyecto y abrir `http://localhost:8000/` o `http://localhost:8000/admin/`. El acceso real, la autenticación y el guardado requieren la configuración de Netlify descrita arriba y publicar los cambios.
