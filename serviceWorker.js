//  Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-v1.1.0';

// List of files to cache here.
let FILES_TO_CACHE = [
    "index.html",
    "assets/HanumanTeacher.svg",
    "assets/font/BrandonGrotesque-Light.ttf",
    "css/style.css",
    "js/utilis.js",
    "js/flashCard.js",
    "js/main.js",
    "icon/maskable_icon.png",
    "icon/maskable_icon_196x19",
    "icon/android-chrome-192x192.png",
    "icon/android-chrome-512x512.png",
    "icon/apple-touch-icon.png",
    "icon/favicon-16x16.png",
    "icon/favicon-32x32.png",
    "icon/mstile-150x150.png",
    "manifest.json",
    "assets/poses/10.png", "assets/poses/11.png", "assets/poses/12.png", "assets/poses/13.png", "assets/poses/14.png", "assets/poses/16.png", "assets/poses/17.png", "assets/poses/19.png", "assets/poses/2.png", "assets/poses/20.png", "assets/poses/22.png", "assets/poses/23.png", "assets/poses/26.png", "assets/poses/27.png", "assets/poses/28.png", "assets/poses/29.png", "assets/poses/3.png", "assets/poses/32.png", "assets/poses/34.png", "assets/poses/35.png", "assets/poses/36.png", "assets/poses/38.png", "assets/poses/39.png", "assets/poses/4.png", "assets/poses/40.png", "assets/poses/41.png", "assets/poses/42.png", "assets/poses/43.png", "assets/poses/44.png", "assets/poses/45.png", "assets/poses/46.png", "assets/poses/47.png", "assets/poses/5.png", "assets/poses/50.png", "assets/poses/56.png", "assets/poses/57.png", "assets/poses/59.png", "assets/poses/60.png", "assets/poses/61.png", "assets/poses/62.png", "assets/poses/64.png", "assets/poses/66.png", "assets/poses/69.png", "assets/poses/7.png", "assets/poses/8.png"
];


self.addEventListener('install', installEvent => {
    console.log('[ServiceWorker] Install');
    installEvent.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url)

    event.respondWith(
        caches.match(event.request).then(r => {
            console.log('[Service Worker] Fetching resource: ' + event.request.url);
            return r || fetch(event.request).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    console.log('[Service Worker] Caching new resource: ' + event.request.url);
                    cache.put(event.request, response.clone()).then(console.log);
                    return response;
                })
            })
        })
    )

});

const preCache = () =>
    caches.open(CACHE_NAME).then(
        cache => cache.addAll(FILES_TO_CACHE)
    ).catch(e => console.error("PreCache ging was schief" + e))
