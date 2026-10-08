const C='mamalik-v23';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'].map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.pathname.endsWith('version.json'))return;
 if(u.origin!==location.origin){e.respondWith(fetch(r).then(x=>{try{const y=x.clone();caches.open(C).then(c=>c.put(r,y))}catch(_){}return x}).catch(()=>caches.match(r)));return}
 e.respondWith(fetch(r.url,{cache:'reload'}).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r,{ignoreSearch:true})))});
