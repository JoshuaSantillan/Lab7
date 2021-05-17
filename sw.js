// sw.js - Service Worker
// You will need 3 e listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
const CACHE_NAME = 'allowedCache';
const urlsToCache = 'https://cse110lab6.herokuapp.com/entries';

self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Cache is opened');
          return cache.add("https://cse110lab6.herokuapp.com/entries");
        })
    );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(clients.claim());
    const cacheAllowlist = ['allowedCache'];
    e.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheAllowlist.indexOf(cacheName) === -1) 
              return caches.delete(cacheName);
          })
        );
      })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) 
            return response;

          return fetch(e.request).then(
            function(response) {
              // Check for a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') 
                return response;
              
              var responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(e.request, responseToCache);
                });
              return response;
            }
          );
        })
      );
});