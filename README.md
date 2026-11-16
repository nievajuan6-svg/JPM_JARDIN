# Jardín Juana Paula Manso

Sitio web del Jardín Juana Paula Manso (Las Ensenadas, Unquillo, Córdoba).

Static HTML/CSS/JS, sin build. El contenido editable se guarda en `content/site.json` y `Jardín-informacion.md`; el panel de administración está en `/admin/`.

- **Ver:** abrir `index.html` en el navegador.
- **Fotos:** `images/webp/` (webp optimizadas).
- **Estilo:** acuarela, tipografías Caveat + Nunito, paleta verde/terracota/mostaza.

## Panel de administración

`/admin/` pide **usuario y contraseña** (pocas cuentas, definidas por el administrador; sin mails ni registro). Al guardar, el navegador llama a la función `netlify/functions/git.mjs`, que escribe en GitHub (`content/site.json`, `Jardín-informacion.md`, `images/uploads/`) y Netlify republica el sitio en 1-2 minutos. Ya no se usa Netlify Identity ni Git Gateway.

Configuración (una sola vez), en Netlify → Project configuration → Environment variables:

- `EDITORS`: usuarios del panel, formato `nombre:clave,nombre2:clave2` (ej. `maria:Sol2026,ana:Luna2026`). Cada guardado queda en GitHub con `(por nombre)`.
- `GITHUB_TOKEN`: token *fine-grained* de GitHub (Settings → Developer settings → Personal access tokens), solo para el repo `JPM_JARDIN`, permiso **Contents: Read and write**.
- `GITHUB_REPO` (opcional): por defecto `nievajuan6-svg/JPM_JARDIN`.

Después de cargarlas hay que volver a publicar (Deploys → Trigger deploy). Para agregar o cambiar personas: editar `EDITORS` y re-publicar. Probar localmente con `netlify dev` (CLI de Netlify).
