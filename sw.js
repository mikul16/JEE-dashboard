const C='day-v7';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)));
  await clients.claim();
  const cs=await clients.matchAll({type:'window'});
  cs.forEach(c=>{try{c.navigate(c.url)}catch(e){}});
})()));
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))))});
