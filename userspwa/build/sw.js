importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

workbox.routing.registerRoute(
    new RegExp('https://jsonplaceholder.typicode.com/users'),
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    new RegExp("https://fonts.googleapis.com"),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.precaching.precacheAndRoute([
  {
    "url": "css/main.css",
    "revision": "d3072ab3693c185313018e404e07d914"
  },
  {
    "url": "index.html",
    "revision": "538e2788e96f9cd7a0b00f9f6e0198e7"
  },
  {
    "url": "js/app.js",
    "revision": "5e43863ea242fce43eb312d26654b641"
  }
]);