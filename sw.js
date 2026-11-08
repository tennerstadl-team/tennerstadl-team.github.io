// Minimaler Service Worker: macht die Seite installierbar (Android/Windows), cached nur die Hülle.
var C = 'tenn-shell-v3';
self.addEventListener('install', function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png']); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request); }));
});
