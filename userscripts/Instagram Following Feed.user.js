// ==UserScript==
// @name         Instagram Following Feed
// @match        https://www.instagram.com/
// @run-at       document-start
// ==/UserScript==

if (window.location.search !== '?variant=following') {
    window.location.replace('https://www.instagram.com/?variant=following');
}