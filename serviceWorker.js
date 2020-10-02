'use strict';
//  Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v0.1';

// List of files to cache here.
let FILES_TO_CACHE = [
    // './',
    './assets/font/BrandonGrotesque-Light.ttf',
    './assets/hanucards.json',
    './assets/HanumanTeacher.svg',
    './css/style.css',
    // './js/flashCards.js',
    './js/utilis.js',
    './index.html'
];


self.addEventListener('install', async installEvent=>{
    console.log('[ServiceWorker] Install');
    console.log(installEvent);
    const posesFile = (await (await fetch('posesPath.txt')).text()).split(",")
    console.log(posesFile)
        // .then(response => response.text())
        // .then(text => console.log(text))
    // FILES_TO_CACHE = [...FILES_TO_CACHE, ...posesFile]
    console.log(FILES_TO_CACHE)

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
