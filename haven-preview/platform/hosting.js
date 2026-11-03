// Keep original root-relative page links inside the hash-router demo on Pages.
document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href]');
  const href = link?.getAttribute('href');
  if (!href || !href.startsWith('/') || href.startsWith('//')) return;
  if (/\.[a-z0-9]+(?:[?#]|$)/i.test(href)) return;
  event.preventDefault();
  location.hash = '#' + href;
}, true);
