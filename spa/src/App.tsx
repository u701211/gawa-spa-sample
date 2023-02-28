import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { getBatteryLevel, getQRCode, onPageEvent, onWillPop } from '../../gawa/react';
import env from './env';
import css from './App.module.scss';

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout, handleRedirectCallback } = useAuth0();
  const [batteryLevel, setBatteryLevel] = useState<number>()
  const [qRCode, setQRCode] = useState<string>()
  const [pageEvents, setPageEvents] = useState<{ date: Date, value: string }[]>([]);

  useEffect(() => {
    if (import.meta.env.MODE === 'gawa') {
      onWillPop(() => {
        return window.confirm('戻るボタンが押されました。アプリを出ますか？')
      });

      onPageEvent(state => {
        setPageEvents(bef => [{ date: new Date(), value: state }, ...bef]);
      })
    }
  }, [])

  const formatDate = (date: Date, format: string) => {
    format = format.replace(/yyyy/g, date.getFullYear().toString());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!!... {error.message}</div>;
  }

  return (
    <div className={css.root}>
      <div className={css.title}>
        <h1>SPA Application</h1>
        <h3>Version : 10</h3>
      </div>

      {isAuthenticated
        ? <>

          <div className={css.auth}>
            <div className={css.user}>{user!.name}</div>
          </div>

          <div className={css.function}>

            <button onClick={() => {
              setBatteryLevel(undefined);
              if (import.meta.env.MODE === 'spa') {
                alert('Mockモードです');
                setBatteryLevel(999);
              }
              else {
                getBatteryLevel(setBatteryLevel);
              }
            }}>
              <span>バッテリー残量</span>
              <span>{batteryLevel ?? '（未取得）'}</span>
            </button>

            <button onClick={() => {
              setQRCode(undefined);

              if (import.meta.env.MODE === 'spa') {
                alert('Mockモードです');
                setQRCode('DUMMY-XXXX-XXXX-XXXX');
              }
              else {
                getQRCode(setQRCode);
              }
            }}>
              <span>コードの読み取り</span>
              <span>{qRCode === undefined ? '（未取得）' : qRCode === '' ? '（キャンセル）' : qRCode}</span>
            </button>

            <a href="https://www.google.com/">google検索サイトへ</a>

            <button onClick={() => {
              logout({
                logoutParams: {
                  returnTo: `${window.location.origin}${env.VITE_AUTH0_RETURN_TO}`
                }
              })
            }}>
              <span>ログアウト</span>
            </button>

          </div>
        </>
        : <>
          <button onClick={() => {
            loginWithRedirect();
            // debugger
            // loginWithRedirect({
            //   appState: {
            //     returnTo: `${window.location.origin}/assets/index.html`
            //   },
            //   openUrl: async (url) => {
            //     debugger
            //     window.location.replace(url);
            //   },
            // })
          }}>
            <span>ログイン</span>
          </button>
        </>}

      <ul className={css.pageEvents}>
        {pageEvents.map(t => <li>
          <span className={css.date}>
            {`${formatDate(t.date, 'HH:mm:ss:SSS')}`}
          </span>
          <span className={css.value}>
            {`${t.value}`}
          </span>
        </li>)}
      </ul>
    </div >
  )
}

export default App
