var cacheName = 'cmc2';

var filesToCache = [
    '/cmc2',
    '/cmc2/about.html',
    '/cmc2/apple-touch-icon.png',
    '/cmc2/bootstrap.min.css',
    '/cmc2/bootstrap.min.js',
    '/cmc2/confusion-matrix-calculator.js',
    '/cmc2/favicon.ico',
    '/cmc2/icon-192x192.png',
    '/cmc2/icon-512x512.png',
    '/cmc2/index.html',
    '/cmc2/jquery-3.5.1.slim.min.js',
    '/cmc2/maskable_icon_x192.png',
    '/cmc2/maskable_icon_x512.png',
    '/cmc2/popper.min.js',
    '/cmc2/style.css'
];

self.addEventListener('install', function(event) {
  console.log('ServiceWorker installing');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Service Worker caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('Service Worker removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('Service Worker fetching ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
