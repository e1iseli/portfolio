'use strict';
// Presentation gate only. GitHub Pages serves the underlying demo files publicly.
const isSystem = new URLSearchParams(location.search).get('view') === 'design-system';
const title = isSystem ? 'Haven Design System' : 'Haven Platform';
document.title = title + ' — Portfolio preview';
document.getElementById('preview-title').textContent = title;
document.getElementById(isSystem ? 'system-link' : 'platform-link').setAttribute('aria-current', 'page');
let opened = false;
function openPreview() {
  if (opened) return;
  opened = true;
  document.getElementById('gate').hidden = true;
  const frame = document.createElement('iframe');
  frame.title = title;
  frame.src = isSystem ? './design-system/' : './platform/#/';
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  const preview = document.getElementById('preview');
  preview.hidden = false;
  preview.append(frame);
}
try { if (sessionStorage.getItem('unlocked-haven') === 'true') openPreview(); } catch {}
document.getElementById('unlock-form').addEventListener('submit', event => {
  event.preventDefault();
  if (document.getElementById('password').value !== '2048') {
    document.getElementById('error').textContent = 'Incorrect password. Please try again.';
    return;
  }
  try { sessionStorage.setItem('unlocked-haven', 'true'); } catch {}
  document.getElementById('password').value = '';
  openPreview();
});
