const C='day-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))))});
