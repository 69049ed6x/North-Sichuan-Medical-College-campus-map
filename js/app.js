(() => {
  const locations = window.CAMPUS_LOCATIONS;
  const collections = window.CAMPUS_COLLECTIONS;
  const viewport = document.querySelector('#mapViewport');
  const canvas = document.querySelector('#mapCanvas');
  const layer = document.querySelector('#hotspotLayer');
  const placesList = document.querySelector('#placesList');
  const panel = document.querySelector('#placesPanel');
  const mobileButton = document.querySelector('#mobilePlacesButton');
  const tooltip = document.querySelector('#mapTooltip');
  const gallery = document.querySelector('#gallery');
  const galleryTitle = document.querySelector('#galleryTitle');
  const galleryCategory = document.querySelector('#galleryCategory');
  const galleryImage = document.querySelector('#galleryImage');
  const galleryCounter = document.querySelector('#galleryCounter');
  let selectedLocation = null, galleryImages = [], galleryIndex = 0;
  let scale = 1, x = 0, y = 0, drag = null, pinchDistance = 0;
  const warmedImages = new Set();

  function warmImage(source) {
    if (!source || warmedImages.has(source)) return;
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = 'low';
    image.src = source;
    warmedImages.add(source);
  }

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const categories = {
    'outdoor-pool': ['运动场地', 'sports'], 'yuqiu-center': ['运动场地', 'sports'], 'second-track-field': ['运动场地', 'sports'], 'first-track-field': ['运动场地', 'sports'],
    'east-lake': ['景观广场', 'landscape'], 'west-lake': ['景观广场', 'landscape'], 'north-lake': ['景观广场', 'landscape'], 'hongyi-square': ['景观广场', 'landscape'], 'botanical-garden': ['景观广场', 'landscape'],
    'east-gate': ['校园入口', 'entrance'], 'west-gate': ['校园入口', 'entrance'], 'north-gate': ['校园入口', 'entrance'],
    'school-clinic': ['生活服务', 'service'], 'ruiyuan-basketball-court': ['运动场地', 'sports'], 'talent-apartment': ['住宿生活', 'residence'], 'graduate-apartment': ['住宿生活', 'residence'], 'keyuan-restaurant': ['餐饮服务', 'dining'], 'yayuan-restaurant': ['餐饮服务', 'dining'], 'ruiyuan-restaurant': ['餐饮服务', 'dining'],
    'siyuan-building': ['教学建筑', 'academic'], 'administration': ['行政服务', 'service'], 'affairs-center': ['行政服务', 'service']
  };
  const categoryFor = location => categories[location.id] || ['教学建筑', 'academic'];
  function fitMap() {
    const rect = viewport.getBoundingClientRect();
    scale = Math.min(rect.width / 3308, rect.height / 1080) * .93;
    x = (rect.width - 3308 * scale) / 2;
    y = (rect.height - 1080 * scale) / 2;
    renderMap();
  }
  function renderMap() { canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`; }
  function setActive(id) { document.querySelectorAll('.place-item').forEach(item => item.classList.toggle('active', item.dataset.id === id)); }
  function hideTooltip() { tooltip.hidden = true; setActive(null); }
  function moveTooltip(event, force = false) {
    if (tooltip.hidden && !force) return;
    const gap = 14, padding = 10;
    let left = event.clientX + gap, top = event.clientY + gap;
    tooltip.style.left = `${left}px`; tooltip.style.top = `${top}px`;
    tooltip.hidden = false;
    const rect = tooltip.getBoundingClientRect();
    if (rect.right > innerWidth - padding) left = event.clientX - rect.width - gap;
    if (rect.bottom > innerHeight - padding) top = event.clientY - rect.height - gap;
    tooltip.style.left = `${Math.max(padding, left)}px`;
    tooltip.style.top = `${Math.max(padding, top)}px`;
  }
  function showTooltip(location, event) {
    warmImage(location.images?.[0]);
    tooltip.textContent = location.name;
    setActive(location.id);
    moveTooltip(event, true);
  }
  function openGallery(location) {
    selectedLocation = location;
    galleryImages = location.images || [];
    galleryIndex = 0;
    galleryTitle.textContent = location.name;
    galleryCategory.textContent = galleryImages.length ? '校园实景' : '暂无实景照片';
    renderGalleryImage();
    gallery.showModal();
  }
  function renderGalleryImage() {
    const imagePath = galleryImages[galleryIndex];
    document.querySelector('.gallery-image-wrap').classList.toggle('empty', !imagePath);
    galleryImage.hidden = !imagePath;
    galleryImage.loading = 'eager';
    galleryImage.decoding = 'async';
    galleryImage.fetchPriority = 'high';
    galleryImage.src = imagePath || '';
    galleryImage.alt = imagePath ? `${selectedLocation.name} 实景照片 ${galleryIndex + 1}` : '';
    galleryCounter.textContent = imagePath ? `${galleryIndex + 1} / ${galleryImages.length}` : '图片区暂为空';
    document.querySelectorAll('[data-action="previous-image"],[data-action="next-image"]').forEach(button => { button.hidden = galleryImages.length < 2; });
  }

  locations.forEach(location => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('hotspot'); group.dataset.id = location.id;
    group.innerHTML = `<rect class="area" x="${location.x}" y="${location.y}" width="${location.width}" height="${location.height}"></rect>`;
    group.addEventListener('pointerenter', event => showTooltip(location, event));
    group.addEventListener('pointermove', moveTooltip);
    group.addEventListener('pointerleave', hideTooltip);
    group.addEventListener('click', event => { event.stopPropagation(); hideTooltip(); openGallery(location); });
    layer.append(group);

    const item = document.createElement('button');
    item.type = 'button'; item.className = 'place-item'; item.dataset.id = location.id;
    const [category, categoryClass] = categoryFor(location);
    item.dataset.category = categoryClass;
    item.innerHTML = `<span>${location.name}</span><small>${category}</small>`;
    item.addEventListener('pointerenter', event => showTooltip(location, event));
    item.addEventListener('pointermove', moveTooltip);
    item.addEventListener('pointerleave', hideTooltip);
    item.addEventListener('focus', () => setActive(location.id));
    item.addEventListener('blur', hideTooltip);
    item.addEventListener('click', () => { hideTooltip(); openGallery(location); panel.classList.remove('open'); mobileButton.setAttribute('aria-expanded', 'false'); });
    placesList.append(item);
  });

  function zoomAt(clientX, clientY, nextScale) {
    const rect = viewport.getBoundingClientRect(), oldScale = scale;
    scale = clamp(nextScale, .12, 2.5);
    const px = clientX - rect.left, py = clientY - rect.top, ratio = scale / oldScale;
    x = px - (px - x) * ratio; y = py - (py - y) * ratio; renderMap();
  }
  viewport.addEventListener('wheel', event => { event.preventDefault(); zoomAt(event.clientX, event.clientY, scale * (event.deltaY < 0 ? 1.14 : .88)); }, { passive: false });
  viewport.addEventListener('pointerdown', event => {
    if (event.target.closest('.hotspot')) return;
    drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x, y };
    viewport.setPointerCapture(event.pointerId); viewport.classList.add('dragging');
  });
  viewport.addEventListener('pointermove', event => { if (!drag || drag.id !== event.pointerId) return; x = drag.x + event.clientX - drag.startX; y = drag.y + event.clientY - drag.startY; renderMap(); });
  const endDrag = () => { drag = null; viewport.classList.remove('dragging'); };
  viewport.addEventListener('pointerup', endDrag); viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('touchstart', event => { if (event.touches.length === 2) pinchDistance = Math.hypot(event.touches[0].clientX - event.touches[1].clientX, event.touches[0].clientY - event.touches[1].clientY); }, { passive: true });
  viewport.addEventListener('touchmove', event => {
    if (event.touches.length !== 2) return;
    event.preventDefault();
    const distance = Math.hypot(event.touches[0].clientX - event.touches[1].clientX, event.touches[0].clientY - event.touches[1].clientY);
    zoomAt((event.touches[0].clientX + event.touches[1].clientX) / 2, (event.touches[0].clientY + event.touches[1].clientY) / 2, scale * distance / pinchDistance); pinchDistance = distance;
  }, { passive: false });
  document.querySelector('[data-action="zoom-in"]').addEventListener('click', () => { const r = viewport.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, scale * 1.25); });
  document.querySelector('[data-action="zoom-out"]').addEventListener('click', () => { const r = viewport.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, scale / 1.25); });
  document.querySelector('[data-action="reset"]').addEventListener('click', fitMap);
  document.querySelector('[data-collection="dining"]').addEventListener('click', () => openGallery(collections.dining));
  document.querySelector('[data-collection="residence"]').addEventListener('click', () => openGallery(collections.residence));
  mobileButton.addEventListener('click', () => { const opened = panel.classList.toggle('open'); mobileButton.setAttribute('aria-expanded', String(opened)); });
  document.querySelector('#mobilePanelClose').addEventListener('click', () => { panel.classList.remove('open'); mobileButton.setAttribute('aria-expanded', 'false'); });
  document.querySelectorAll('[data-action="close-gallery"]').forEach(button => button.addEventListener('click', () => gallery.close()));
  document.querySelector('[data-action="previous-image"]').addEventListener('click', () => { if (galleryImages.length < 2) return; galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length; renderGalleryImage(); });
  document.querySelector('[data-action="next-image"]').addEventListener('click', () => { if (galleryImages.length < 2) return; galleryIndex = (galleryIndex + 1) % galleryImages.length; renderGalleryImage(); });
  galleryImage.addEventListener('load', () => {
    const nextImage = galleryImages[(galleryIndex + 1) % galleryImages.length];
    if (galleryImages.length > 1) warmImage(nextImage);
  });
  galleryImage.addEventListener('error', () => { galleryImage.hidden = true; galleryCounter.textContent = '图片区暂为空'; });
  window.addEventListener('resize', fitMap); fitMap();
})();
