'use strict';

//  Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// List of files to cache here.
const FILES_TO_CACHE = [
    './',
    './css/style.css',
    './index.html',
];


self.addEventListener('install', async installEvent=>{
    console.log('[ServiceWorker] Install');

    const cache = await caches.open(CACHE_NAME);
    cache.addAll(FILES_TO_CACHE);
});

self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url);

    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.url){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(newtorkFirst(req));
    }
});

async function cacheFirst(req){
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function newtorkFirst(req){
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}
