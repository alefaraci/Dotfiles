// ==UserScript==
// @name         Instagram Hide Nav Items
// @match        https://www.instagram.com/*
// @run-at       document-idle
// ==/UserScript==

// CSS-targetable items
const style = document.createElement('style');
style.textContent = `
  a[href="/reels/"],
  a[href="/explore/"]{
    display: none !important;
  }
`;
document.head.appendChild(style);

// Text-based hiding (for items without unique hrefs)
const hideByText = ['Altro', 'Meta'];

function hideNavItems() {
  document.querySelectorAll('a[role="link"]').forEach(link => {
    const text = link.textContent.trim();
    if (hideByText.some(label => text.includes(label))) {
      link.closest('span, div')?.style.setProperty('display', 'none', 'important');
      link.style.setProperty('display', 'none', 'important');
    }
  });
}

// Run once + observe for SPA re-renders
hideNavItems();
new MutationObserver(hideNavItems).observe(document.body, {
  childList: true,
  subtree: true
});