self.addEventListener('install', (event) => {
  debugger;
  console.debug(`【SW : install】#9`);
  // 即時にactive(動作前)とする
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  debugger;
  console.debug(`【SW : activate】#9`);
  // 即時にactive(動作前)->active(動作中)とする
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // debugger;
  console.debug(`【SW : fetch】`, event.request.url);
});

self.addEventListener('sync', (event) => {
  debugger;
  console.debug(`【SW : sync】`);
});

self.addEventListener('push', (event) => {
  debugger;
  console.debug(`【SW : push】`);

  const dataText = event.data.text();
  const title = 'Push Test';
  const options = { body: dataText };

  if ('registration' in self
    && 'showNotification' in self.registration) {
    event.waitUntil(self.registration.showNotification(title, options));
  }
  else {
    console.warn(`【SW : push】self.registration.showNotification() がありません`);
  }
});

self.addEventListener('notificationclick', (event) => {
  debugger;
  event.notification.close();
  event.waitUntil(clients.openWindow('https://www.nttdata.com'));
});

self.addEventListener('message', (event) => {
  debugger;
  console.debug(`【SW : message】`);
});
