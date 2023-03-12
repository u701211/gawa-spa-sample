import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission)

  // const registerPushNotification = async () => {
  //   debugger;
  //   if (navigator.serviceWorker && window.PushManager) {
  //     const swRegistration = await navigator.serviceWorker.register('/sw.js');
  //     console.log(`【SWクライアント】ServiceWorker is registered`, swRegistration);

  //     // サーバから渡された公開鍵をバイト配列に変換します
  //     // const applicationServerKey = urlB64ToUint8Array(publicKey);
  //     const applicationServerKey = `applicationServerKey`;
  //     await swRegistration.pushManager.getSubscription();
  //     const params = { userVisibleOnly: true, applicationServerKey };
  //     // この段階でブラウザからプッシュ通知の許可ウィンドウが表示されます。
  //     const subscription = await swRegistration.pushManager.subscribe(params);
  //     // プッシュ通知に必要な情報が subscription に入っています。（不許可の場合は何も入っていません）
  //     console.log(`【SWクライアント】'User is subscribed`, subscription);
  //   }
  // };

  const setNotification = async () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(function (permission) {
        setNotificationPermission(Notification.permission);
        if (permission === 'granted') {
          console.log('通知が許可されました');
        } else {
          console.log('通知が拒否されました.');
        }
      });
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>


        {/* <button onClick={registerPushNotification}>Pushレジスト</button> */}
        <button onClick={setNotification}>通知受信 ({`${notificationPermission}`})</button>


      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
