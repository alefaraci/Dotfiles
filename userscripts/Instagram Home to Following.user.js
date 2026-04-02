// ==UserScript==
// @name         Instagram Home to Following
// @match        https://www.instagram.com/*
// @run-at       document-idle
// ==/UserScript==

function patchHomeLinks() {
  document.querySelectorAll('a[href="/"]').forEach(link => {
    if (link.dataset.patched) return;
    link.dataset.patched = 'true';
    link.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = 'https://www.instagram.com/?variant=following';
    }, true);
  });
}

patchHomeLinks();
new MutationObserver(patchHomeLinks).observe(document.body, {
  childList: true,
  subtree: true
});