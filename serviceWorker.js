//  Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-v0.2';

// List of files to cache here.
let FILES_TO_CACHE = [
    './',
    './assets/font/BrandonGrotesque-Light.ttf',
    './assets/hanucards.json',
    './assets/HanumanTeacher.svg',
    './css/style.css',
    // './js/flashCards.js',
    './js/utilis.js',
    './index.html', "./assets/poses/1.jpg", "./assets/poses/10.jpg", "./assets/poses/11.jpg", "./assets/poses/12.jpg", "./assets/poses/13.jpg", "./assets/poses/14.jpg", "./assets/poses/15.jpg", "./assets/poses/16.jpg", "./assets/poses/17.jpg", "./assets/poses/18.jpg", "./assets/poses/19.jpg", "./assets/poses/2.jpg", "./assets/poses/20.jpg", "./assets/poses/22.jpg", "./assets/poses/23.jpg", "./assets/poses/24.jpg", "./assets/poses/25.jpg", "./assets/poses/26.jpg", "./assets/poses/27.jpg", "./assets/poses/28.jpg", "./assets/poses/29.jpg", "./assets/poses/3.jpg", "./assets/poses/30.jpg", "./assets/poses/31.jpg", "./assets/poses/32.jpg", "./assets/poses/33.jpg", "./assets/poses/34.jpg", "./assets/poses/35.jpg", "./assets/poses/36.jpg", "./assets/poses/37.jpg", "./assets/poses/38.jpg", "./assets/poses/39.jpg", "./assets/poses/4.jpg", "./assets/poses/40.jpg", "./assets/poses/41.jpg", "./assets/poses/42.jpg", "./assets/poses/43.jpg", "./assets/poses/44.jpg", "./assets/poses/45.jpg", "./assets/poses/46.jpg", "./assets/poses/47.jpg", "./assets/poses/48.jpg", "./assets/poses/49.jpg", "./assets/poses/5.jpg", "./assets/poses/6.jpg", "./assets/poses/7.jpg", "./assets/poses/8.jpg", "./assets/poses/9.jpg",
];


self.addEventListener('install', installEvent => {
    console.log('[ServiceWorker] Install');
    console.log(installEvent);

    installEvent.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url)

    event.respondWith(

        caches.match(event.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: '+event.request.url);
            return r || fetch(event.request).then(function(response) {
                return caches.open(CACHE_NAME).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: ' + event.request.url);
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })

    )
    // event.respondWith(fromCache(event.request))

});


const preCache = () =>
    caches.open(CACHE_NAME).then(
        cache => cache.addAll(FILES_TO_CACHE)
    )


const fromCache = async request => {
    const r = await caches.match(request)
    console.log('[Service Worker] Fetching resource: '+ request.url);

    return r || fetch(request)

}