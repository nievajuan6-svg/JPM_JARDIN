(() => {
  const GATEWAY = '/.netlify/git/github/contents/';
  const BRANCH = 'main';
  const JSON_PATH = 'content/site.json';
  const INFO_PATH = 'Jardín-informacion.md';
  const DATA_LABELS = {
    textos: 'Textos del sitio y navegación',
    inicio: 'Portada principal',
    jardin: 'El jardín',
    proyectos: 'Proyectos',
    familias: 'Familias',
    contacto: 'Contacto e inscripciones',
    galeria: 'Carrusel de fotos',
    pie: 'Pie de página',
    referencias: 'Artículos y referencias',
  };
  const FIELD_LABELS = {
    seoTitulo: 'Título para buscadores',
    seoDescripcion: 'Descripción para buscadores',
    nombre: 'Nombre del jardín',
    marca: 'Nombre corto del menú',
    marcaSubtitulo: 'Subtítulo del menú',
    navInicio: 'Enlace: Inicio',
    navJardin: 'Enlace: El jardín',
    navProyectos: 'Enlace: Proyectos',
    navFamilias: 'Enlace: Familias',
    navInformacion: 'Enlace: Información',
    navInscripciones: 'Enlace: Inscripciones',
    jardinTitulo: 'Título de la sección',
    proyectosTitulo: 'Título de la sección',
    familiasTitulo: 'Título de la sección',
    contactoTitulo: 'Título de la sección',
    galeriaTitulo: 'Título de la galería',
    botonMapa: 'Texto del botón del mapa',
    botonWhatsapp: 'Texto del botón de WhatsApp',
    etiquetaDireccion: 'Etiqueta de la dirección',
    etiquetaWhatsapp: 'Etiqueta de WhatsApp',
    etiquetaHorario: 'Etiqueta del horario',
    etiquetaResponsable: 'Etiqueta del contacto',
    textoInscripciones: 'Texto de consultas e inscripciones',
    tituloMapa: 'Descripción del mapa',
    titulo: 'Título',
    lema: 'Lema',
    ubicacion: 'Ubicación breve',
    foto: 'Foto',
    fotoAlt: 'Descripción de la foto',
    introduccion: 'Texto introductorio',
    bloques: 'Bloques del jardín',
    texto: 'Texto',
    pie: 'Texto que acompaña la foto',
    items: 'Elementos',
    desc: 'Descripción',
    img: 'Foto',
    alt: 'Descripción de la foto',
    firma: 'Firma (opcional)',
    direccion: 'Calle y dirección',
    barrio: 'Barrio o paraje',
    localidad: 'Localidad y provincia',
    distancia: 'Referencia de distancia',
    responsable: 'Persona de contacto',
    whatsappNumero: 'Número de WhatsApp (solo números)',
    whatsappTexto: 'Número de WhatsApp para mostrar',
    horario: 'Horario de atención',
    mapaInsertar: 'Enlace para mostrar el mapa',
    mapaEnlace: 'Enlace para abrir el mapa',
    institucion: 'Texto institucional',
    url: 'Enlace web',
    fuente: 'Fuente',
  };
  const SECTION_LABELS = {
    'textos.nav': 'Menú',
    'textos.seo': 'Buscadores',
    'contacto.whatsapp': 'WhatsApp',
    'contacto.mapa': 'Mapa',
  };

  const app = document.getElementById('editor');
  const access = document.getElementById('acceso');
  const accessText = document.getElementById('acceso-texto');
  const statusBox = document.getElementById('estado');
  const tabs = document.getElementById('secciones');
  const jsonPanel = document.getElementById('panel-json');
  const markdownPanel = document.getElementById('panel-markdown');
  const fieldsRoot = document.getElementById('campos-json');
  const saveBar = document.getElementById('barra-guardado');
  const saveButton = document.getElementById('guardar');
  const markdownEditor = document.getElementById('markdown');
  const identity = window.netlifyIdentity;
  const requestedSection = new URLSearchParams(location.search).get('section');
  const state = {
    user: null,
    token: null,
    json: null,
    jsonSha: null,
    markdown: '',
    markdownSha: null,
    selectedTab: requestedSection === 'informacion' ? 'informacion' : 'inicio',
    dirtyJson: false,
    dirtyMarkdown: false,
    saving: false,
  };

  function showStatus(message, type = '') {
    statusBox.textContent = message;
    statusBox.className = `aviso${type ? ` ${type}` : ''}`;
  }

  function showAccess(message) {
    app.hidden = true;
    access.hidden = false;
    accessText.textContent = message;
    document.getElementById('ingresar').hidden = !identity;
  }

  function showEditor() {
    access.hidden = true;
    app.hidden = false;
    document.getElementById('salir').hidden = false;
    document.getElementById('usuario').textContent = state.user?.email || '';
  }

  function setDirty(message = 'Tenés cambios sin guardar.') {
    if (state.selectedTab === 'informacion') state.dirtyMarkdown = true;
    else state.dirtyJson = true;
    saveBar.hidden = false;
    showStatus(message);
  }

  function setClean(message) {
    state.dirtyJson = false;
    state.dirtyMarkdown = false;
    saveBar.hidden = true;
    showStatus(message, 'ok');
  }

  function updateSaveButtonVisibility() {
    saveBar.hidden = !state.dirtyJson && !state.dirtyMarkdown;
  }

  function encodePath(path) {
    return path.split('/').map(encodeURIComponent).join('/');
  }

  async function requestGit(path, options = {}) {
    if (!state.user) throw new Error('La sesión venció. Volvé a ingresar al panel.');
    const token = await state.user.jwt();
    const response = await fetch(`${GATEWAY}${encodePath(path)}${options.query || ''}`, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    });

    const responseText = await response.text();
    let result;
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(`El servicio de guardado devolvió una respuesta inesperada (HTTP ${response.status}).`);
    }
    if (!response.ok) {
      const detail = typeof result.message === 'string' ? result.message : response.statusText;
      if (response.status === 401 || response.status === 403) {
        throw new Error('No se pudo autorizar el guardado. Revisá que Git Gateway esté habilitado y que tu cuenta tenga permiso.');
      }
      if (response.status === 404) {
        if (/site configuration|git gateway/i.test(detail)) {
          throw new Error('Git Gateway no está habilitado para este sitio. Activá el servicio Git Gateway en Netlify y volvé a probar.');
        }
        throw new Error(`No se encontró “${path}” en el repositorio.`);
      }
      throw new Error(`No se pudo guardar “${path}” (HTTP ${response.status}): ${detail}`);
    }
    return result;
  }

  function decodeBase64(content) {
    const binary = atob(content.replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodeBytesBase64(bytes) {
    let binary = '';
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return btoa(binary);
  }

  function encodeBase64(text) {
    return encodeBytesBase64(new TextEncoder().encode(text));
  }

  async function readFile(path) {
    const result = await requestGit(path, { query: `?ref=${encodeURIComponent(BRANCH)}` });
    if (!result || typeof result.content !== 'string' || typeof result.sha !== 'string') {
      throw new Error(`No se pudo leer “${path}” desde el repositorio.`);
    }
    return { text: decodeBase64(result.content), sha: result.sha };
  }

  async function writeFile(path, text, sha, message) {
    const result = await requestGit(path, {
      method: 'PUT',
      body: {
        message,
        content: encodeBase64(text),
        sha,
        branch: BRANCH,
      },
    });
    if (!result.content?.sha) throw new Error(`El servicio no confirmó el guardado de “${path}”.`);
    return result.content.sha;
  }

  function labelFor(key) {
    return FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, character => character.toUpperCase());
  }

  function listLabel(path, key) {
    const parent = path.slice(0, -1).join('.');
    if (key === 'galeria') return 'Fotos del carrusel';
    if (parent === 'jardin') return 'Bloques con fotos y texto';
    if (parent === 'proyectos') return 'Proyectos';
    if (parent === 'familias') return 'Textos para Familias';
    if (parent === 'referencias') return 'Enlaces y referencias';
    return labelFor(key);
  }

  function valueAt(path) {
    return path.reduce((current, key) => current[key], state.json);
  }

  function setAt(path, value) {
    const parent = path.slice(0, -1).reduce((current, key) => current[key], state.json);
    parent[path[path.length - 1]] = value;
  }

  function needsTextarea(key, value) {
    return ['texto', 'desc', 'introduccion', 'seoDescripcion', 'lema'].includes(key) ||
      (typeof value === 'string' && value.length > 115);
  }

  function isImageField(key, value) {
    return typeof value === 'string' && ['foto', 'img'].includes(key);
  }

  function createImageControl(key, value, path) {
    const wrapper = document.createElement('div');
    wrapper.className = 'campo';
    const label = document.createElement('span');
    label.className = 'campo-label';
    label.textContent = labelFor(key);
    wrapper.append(label);

    if (value) {
      const image = document.createElement('img');
      image.className = 'foto-previa';
      image.src = value.startsWith('/') ? value : `/${value}`;
      image.alt = 'Foto seleccionada';
      image.loading = 'lazy';
      wrapper.append(image);
    }

    const fileLabel = document.createElement('label');
    fileLabel.className = 'boton boton-secundario seleccionar-foto';
    fileLabel.textContent = value ? 'Cambiar foto' : 'Subir foto';
    const input = document.createElement('input');
    input.className = 'foto-archivo';
    input.type = 'file';
    input.accept = 'image/*';
    input.setAttribute('aria-label', `${value ? 'Cambiar' : 'Subir'} ${labelFor(key).toLowerCase()}`);
    fileLabel.append(input);
    wrapper.append(fileLabel);

    if (value) {
      const remove = document.createElement('button');
      remove.className = 'boton boton-secundario boton-peligro';
      remove.type = 'button';
      remove.textContent = 'Quitar foto';
      remove.addEventListener('click', () => {
        setAt(path, '');
        renderSelectedTab();
        setDirty('Se quitó la foto. Guardá para publicar el cambio.');
      });
      wrapper.append(remove);
    }

    const help = document.createElement('p');
    help.className = 'ayuda';
    help.textContent = 'Elegí una imagen de tu dispositivo. Se sube al sitio al seleccionarla.';
    wrapper.append(help);

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      input.disabled = true;
      showStatus('Subiendo la foto…');
      try {
        const uploadedPath = await uploadImage(file);
        setAt(path, uploadedPath);
        renderSelectedTab();
        setDirty('Foto subida. Guardá los cambios para que aparezca en la web.');
      } catch (error) {
        showStatus(error.message, 'error');
        input.disabled = false;
      }
    });
    return wrapper;
  }

  async function imageAsWebp(file) {
    if (!('createImageBitmap' in window)) {
      return { blob: file, extension: file.name.split('.').pop()?.toLowerCase() || 'img' };
    }
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', .82));
    if (!blob) throw new Error('No se pudo preparar la foto. Probá con otro archivo.');
    return { blob, extension: 'webp' };
  }

  async function uploadImage(file) {
    if (!file.type.startsWith('image/')) throw new Error('Elegí un archivo de imagen.');
    const { blob, extension } = await imageAsWebp(file);
    const safeName = file.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'foto';
    const path = `images/uploads/${Date.now()}-${safeName}.${extension}`;
    const content = encodeBytesBase64(new Uint8Array(await blob.arrayBuffer()));
    await requestGit(path, {
      method: 'PUT',
      body: {
        message: `Subir foto del sitio: ${safeName}`,
        content,
        branch: BRANCH,
      },
    });
    return path;
  }

  function createScalarField(key, value, path) {
    if (isImageField(key, value)) return createImageControl(key, value, path);
    const wrapper = document.createElement('div');
    wrapper.className = 'campo';
    const id = `campo-${path.map(String).join('-').replace(/[^a-zA-Z0-9_-]/g, '-')}`;
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelFor(key);
    const input = needsTextarea(key, value)
      ? document.createElement('textarea')
      : document.createElement('input');
    if (input instanceof HTMLInputElement) input.type = 'text';
    input.id = id;
    input.value = value ?? '';
    input.addEventListener('input', () => {
      setAt(path, input.value);
      setDirty();
    });
    wrapper.append(label, input);

    if (['fotoAlt', 'alt'].includes(key)) {
      const help = document.createElement('p');
      help.className = 'ayuda';
      help.textContent = 'Contá brevemente qué aparece en la imagen.';
      wrapper.append(help);
    }
    if (key === 'whatsappNumero') {
      const help = document.createElement('p');
      help.className = 'ayuda';
      help.textContent = 'Escribilo con código de país, sin espacios ni signos. Ejemplo: 5493516506866.';
      wrapper.append(help);
    }
    return wrapper;
  }

  function itemName(item, index) {
    if (item && typeof item === 'object') {
      return item.titulo || item.pie || item.texto || item.nombre || `Elemento ${index + 1}`;
    }
    return String(item || `Elemento ${index + 1}`);
  }

  function makeEmptyItem(path) {
    const location = path.join('.');
    if (location === 'galeria') return { img: '', alt: '', pie: '' };
    if (location === 'jardin.bloques') return { titulo: '', texto: '', foto: '', fotoAlt: '', pie: '' };
    if (location === 'proyectos.items') return { titulo: '', desc: '', img: '', alt: '', pie: '' };
    if (location === 'familias.items') return { texto: '', firma: '' };
    if (location === 'referencias.items') return { titulo: '', url: '', fuente: '' };
    return '';
  }

  function emptyLike(template) {
    if (Array.isArray(template)) return [];
    if (template && typeof template === 'object') {
      return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, emptyLike(value)]));
    }
    return typeof template === 'string' ? '' : template;
  }

  function renderObject(value, path, title, depth = 0) {
    const wrapper = document.createElement('section');
    wrapper.className = depth === 0 ? 'grupo' : 'grupo';
    const heading = document.createElement(depth === 0 ? 'h2' : 'h3');
    heading.textContent = title || 'Contenido';
    wrapper.append(heading);

    Object.entries(value).forEach(([key, child]) => {
      const childPath = [...path, key];
      if (child && typeof child === 'object' && !Array.isArray(child)) {
        wrapper.append(renderObject(child, childPath, labelFor(key), depth + 1));
      } else if (Array.isArray(child)) {
        wrapper.append(renderArray(child, childPath, key));
      } else {
        wrapper.append(createScalarField(key, child, childPath));
      }
    });
    return wrapper;
  }

  function renderArray(items, path, key) {
    const wrapper = document.createElement('section');
    wrapper.className = 'grupo';
    const heading = document.createElement('h3');
    const listTitle = listLabel(path, key);
    heading.textContent = listTitle;
    const explanation = document.createElement('p');
    explanation.className = 'ayuda';
    explanation.textContent = 'Podés cambiar el texto, reemplazar la foto, agregar elementos o quitar los que ya no se usan.';
    const list = document.createElement('div');
    list.className = 'lista';

    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'elemento';
      const cardHeader = document.createElement('div');
      cardHeader.className = 'elemento-cabecera';
      const name = document.createElement('strong');
      name.textContent = itemName(item, index);
      const actions = document.createElement('div');
      actions.className = 'elemento-acciones';

      if (index > 0) {
        const up = document.createElement('button');
        up.className = 'boton boton-secundario boton-mini';
        up.type = 'button';
        up.setAttribute('aria-label', `Mover ${name.textContent} hacia arriba`);
        up.textContent = '↑';
        up.addEventListener('click', () => {
          [items[index - 1], items[index]] = [items[index], items[index - 1]];
          renderSelectedTab();
          setDirty();
        });
        actions.append(up);
      }
      if (index < items.length - 1) {
        const down = document.createElement('button');
        down.className = 'boton boton-secundario boton-mini';
        down.type = 'button';
        down.setAttribute('aria-label', `Mover ${name.textContent} hacia abajo`);
        down.textContent = '↓';
        down.addEventListener('click', () => {
          [items[index + 1], items[index]] = [items[index], items[index + 1]];
          renderSelectedTab();
          setDirty();
        });
        actions.append(down);
      }

      const remove = document.createElement('button');
      remove.className = 'boton boton-secundario boton-peligro';
      remove.type = 'button';
      remove.textContent = 'Quitar';
      remove.addEventListener('click', () => {
        items.splice(index, 1);
        renderSelectedTab();
        setDirty();
      });
      actions.append(remove);
      cardHeader.append(name, actions);
      card.append(cardHeader);

      if (item && typeof item === 'object' && !Array.isArray(item)) {
        Object.entries(item).forEach(([childKey, childValue]) => {
          card.append(createScalarField(childKey, childValue, [...path, index, childKey]));
        });
      } else {
        card.append(createScalarField(key, item, [...path, index]));
      }
      list.append(card);
    });

    const add = document.createElement('button');
    add.className = 'boton boton-secundario';
    add.type = 'button';
    add.textContent = `+ Agregar ${listTitle.toLowerCase()}`;
    add.addEventListener('click', () => {
      items.push(items.length ? emptyLike(items[0]) : makeEmptyItem(path));
      renderSelectedTab();
      setDirty();
    });
    wrapper.append(heading, explanation, list, add);
    return wrapper;
  }

  function drawTabs() {
    tabs.replaceChildren();
    const names = [...Object.keys(state.json), 'informacion'];
    names.forEach(key => {
      const button = document.createElement('button');
      button.className = 'pestana';
      button.type = 'button';
      button.role = 'tab';
      button.setAttribute('aria-selected', String(state.selectedTab === key));
      button.textContent = key === 'informacion' ? 'Información institucional' : (DATA_LABELS[key] || labelFor(key));
      button.addEventListener('click', () => {
        state.selectedTab = key;
        renderSelectedTab();
      });
      tabs.append(button);
    });
  }

  function renderSelectedTab() {
    if (state.selectedTab === 'informacion') {
      document.getElementById('titulo-pagina').textContent = 'Información institucional';
      tabs.hidden = false;
      drawTabs();
      jsonPanel.hidden = true;
      markdownPanel.hidden = false;
      updateSaveButtonVisibility();
      return;
    }

    document.getElementById('titulo-pagina').textContent = 'Editar contenidos';
    document.getElementById('titulo-seccion').textContent = DATA_LABELS[state.selectedTab] || labelFor(state.selectedTab);
    tabs.hidden = false;
    drawTabs();
    markdownPanel.hidden = true;
    jsonPanel.hidden = false;
    fieldsRoot.replaceChildren(renderObject(state.json[state.selectedTab], [state.selectedTab], DATA_LABELS[state.selectedTab], 0));
    updateSaveButtonVisibility();
  }

  function inlineMarkdown(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue.replace(/([\\`*_{}\[\]<>#+.!|])/g, '\\$1');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const text = [...node.childNodes].map(inlineMarkdown).join('');
    switch (node.tagName) {
      case 'STRONG':
      case 'B': return `**${text}**`;
      case 'EM':
      case 'I': return `*${text}*`;
      case 'A': return `[${text}](${node.getAttribute('href') || ''})`;
      case 'BR': return '  \\n';
      default: return text;
    }
  }

  function blockMarkdown(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue.trim();
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    if (node.tagName === 'UL' || node.tagName === 'OL') {
      return [...node.children].map((item, index) => {
        const prefix = node.tagName === 'OL' ? `${index + 1}. ` : '- ';
        return `${prefix}${[...item.childNodes].map(inlineMarkdown).join('').trim()}`;
      }).join('\n');
    }
    if (node.tagName === 'BLOCKQUOTE') {
      return [...node.children].map(blockMarkdown).join('\n\n').split('\n').map(line => `> ${line}`).join('\n');
    }
    const content = [...node.childNodes].map(inlineMarkdown).join('').trim();
    if (!content) return '';
    if (/^H[1-6]$/.test(node.tagName)) return `${'#'.repeat(Number(node.tagName[1]))} ${content}`;
    return content;
  }

  function markdownFromEditor() {
    return [...markdownEditor.children].map(blockMarkdown).filter(Boolean).join('\n\n').trim() + '\n';
  }

  async function saveCurrent() {
    if (state.saving || (!state.dirtyJson && !state.dirtyMarkdown)) return;
    state.saving = true;
    saveButton.disabled = true;
    showStatus('Guardando los cambios…');
    try {
      if (state.dirtyJson) {
        const json = `${JSON.stringify(state.json, null, 2)}\n`;
        state.jsonSha = await writeFile(JSON_PATH, json, state.jsonSha, 'Actualizar contenido del sitio');
        state.dirtyJson = false;
      }
      if (state.dirtyMarkdown) {
        const markdown = markdownFromEditor();
        state.markdownSha = await writeFile(INFO_PATH, markdown, state.markdownSha, 'Actualizar información institucional');
        state.markdown = markdown;
        state.dirtyMarkdown = false;
      } else {
        showStatus('Guardando los cambios…');
      }
      updateSaveButtonVisibility();
      if (!state.dirtyJson && !state.dirtyMarkdown) {
        showStatus('¡Listo! Los cambios quedaron guardados y Netlify va a publicar la nueva versión.', 'ok');
      }
    } catch (error) {
      showStatus(error.message, 'error');
    } finally {
      state.saving = false;
      saveButton.disabled = false;
    }
  }

  async function loadContents() {
    showStatus('Cargando el contenido del jardín…');
    const [jsonFile, markdownFile] = await Promise.all([readFile(JSON_PATH), readFile(INFO_PATH)]);
    state.json = JSON.parse(jsonFile.text);
    state.jsonSha = jsonFile.sha;
    state.markdown = markdownFile.text;
    state.markdownSha = markdownFile.sha;
    markdownEditor.innerHTML = DOMPurify.sanitize(marked.parse(state.markdown));
    renderSelectedTab();
    document.getElementById('salir').hidden = false;
    document.getElementById('usuario').textContent = state.user.email || '';
    setClean('Contenido cargado. Cuando termines, guardá los cambios para publicarlos.');
  }

  document.getElementById('guardar').addEventListener('click', saveCurrent);

  markdownEditor.addEventListener('input', () => setDirty());
  document.querySelectorAll('[data-format]').forEach(button => {
    button.addEventListener('mousedown', event => event.preventDefault());
    button.addEventListener('click', () => {
      markdownEditor.focus();
      document.execCommand(button.dataset.format, false, button.dataset.value || null);
      setDirty();
    });
  });

  document.getElementById('ingresar').addEventListener('click', () => {
    if (identity) identity.open('login');
  });
  document.getElementById('salir').addEventListener('click', () => identity?.logout());

  if (!identity) {
    showAccess('No se pudo conectar con el acceso. Verificá que Netlify Identity esté habilitado.');
    return;
  }

  let loaded = false;
  async function onIdentity(user) {
    state.user = user || null;
    if (!user) {
      loaded = false;
      document.getElementById('salir').hidden = true;
      showAccess('Iniciá sesión con la cuenta invitada para editar los contenidos del jardín.');
      return;
    }

    showEditor();
    if (loaded) return;
    loaded = true;
    try {
      await loadContents();
    } catch (error) {
      loaded = false;
      showStatus(error.message, 'error');
    }
  }

  identity.on('init', onIdentity);
  identity.on('login', onIdentity);
  identity.on('logout', () => onIdentity(null));
  identity.on('error', () => showStatus('No se pudo completar el acceso. Revisá tu invitación o intentá ingresar otra vez.', 'error'));
})();
