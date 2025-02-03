// // public/sw.js
// const CACHE_NAME = "code-clarity-cache-v1";
// const BASE_URL = "https://code-clarity.insitechinternational.com";

// // Assets to cache immediately
// const STATIC_ASSETS = [
//   "/",
//   "/index.html",
//   "/static/css/main.chunk.css",
//   "/static/js/main.chunk.js",
//   "/static/js/bundle.js",
//   "/manifest.json",
//   "/favicon.ico",
//   // Add other static assets
// ];

// // Routes to cache when visited
// const DYNAMIC_ROUTES = ["/about", "/contact", "/terms", "/privacy", "/search"];

// // Cache static assets on install
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(STATIC_ASSETS);
//     })
//   );
// });

// // Clean up old caches on activate
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((name) => name !== CACHE_NAME)
//           .map((name) => caches.delete(name))
//       );
//     })
//   );
// });

// // Network-first strategy for API calls, Cache-first for static assets
// self.addEventListener("fetch", (event) => {
//   const url = new URL(event.request.url);

//   // Handle API requests
//   if (url.origin === BASE_URL) {
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => {
//           // Clone the response before caching
//           const responseToCache = response.clone();

//           if (response.ok) {
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, responseToCache);
//             });
//           }

//           return response;
//         })
//         .catch(() => {
//           return caches.match(event.request);
//         })
//     );
//     return;
//   }

//   // Handle navigation requests
//   if (
//     event.request.mode === "navigate" ||
//     (event.request.method === "GET" &&
//       event.request.headers.get("accept").includes("text/html"))
//   ) {
//     event.respondWith(
//       fetch(event.request).catch(() => {
//         return caches.match("/index.html");
//       })
//     );
//     return;
//   }

//   // Handle other static assets
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       }

//       return fetch(event.request).then((response) => {
//         // Don't cache non-successful responses
//         if (!response || response.status !== 200) {
//           return response;
//         }

//         // Clone the response before caching
//         const responseToCache = response.clone();
//         caches.open(CACHE_NAME).then((cache) => {
//           cache.put(event.request, responseToCache);
//         });

//         return response;
//       });
//     })
//   );
// });

// // Handle offline analytics
// self.addEventListener("sync", (event) => {
//   if (event.tag === "sync-analytics") {
//     event.waitUntil(syncAnalytics());
//   }
// });

// // Optional: Add push notification support
// self.addEventListener("push", (event) => {
//   if (event.data) {
//     const options = {
//       body: event.data.text(),
//       icon: "/icon-192x192.png",
//       badge: "/badge-72x72.png",
//     };

//     event.waitUntil(
//       self.registration.showNotification("Code Clarity", options)
//     );
//   }
// });
