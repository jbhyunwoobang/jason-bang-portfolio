(() => {
  const cursor = document.querySelector('.cursor-dot');
  if (cursor && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.documentElement.classList.add('has-dot-cursor');
    let frame = 0, x = 0, y = 0;
    addEventListener('pointermove', event => {
      x = event.clientX; y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0; cursor.style.left = `${x}px`; cursor.style.top = `${y}px`;
        cursor.classList.add('is-visible');
      });
    }, { passive: true });
    addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  }

  const dialog = document.querySelector('#lightbox, #bazaar-lightbox');
  if (!dialog) return;
  const image = dialog.querySelector('img');
  const close = dialog.querySelector('button');
  const open = (source, alt) => { image.src = source; image.alt = alt; dialog.showModal(); if (cursor) dialog.append(cursor); };
  document.querySelectorAll('.photo').forEach(button => button.addEventListener('click', () => {
    const thumb = button.querySelector('img'); open(thumb.src, thumb.alt);
  }));
  document.querySelectorAll('.images a').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); const thumb = link.querySelector('img'); open(thumb.src, thumb.alt);
  }));
  close?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if (cursor) document.body.append(cursor); });
})();
