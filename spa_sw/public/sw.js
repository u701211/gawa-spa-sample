self.addEventListener('install', (event) => {
  debugger;
  console.debug(`【SW : install】#3`);
  // 即時にactive(動作前)とする
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  debugger;
  console.debug(`【SW : activate】#3`);
  // 即時にactive(動作前)->active(動作中)とする
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // debugger;
  console.debug(`【SW : fetch】`, event.request.url);
});

self.addEventListener('push', (event) => {
  debugger;
  console.debug(`【SW : push】`);

  const dataText = event.data.text();
  const title = 'Push Test';
  const options = { body: dataText };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('message', (event) => {
  debugger;
  console.debug(`【SW : message】`);
});


self.addEventListener('sync', (event) => {
  debugger;
  console.debug(`【SW : sync】`);
});
