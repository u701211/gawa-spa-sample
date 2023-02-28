import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App'
import env from './env';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain={env.VITE_AUTH0_DOMAIN}
    clientId={env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: (() => {
        const redirect_uri = `${window.location.origin}${env.VITE_AUTH0_RETURN_TO}`;
        return redirect_uri
      })(),
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
)
