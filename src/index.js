import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import {Auth0Provider} from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="nextbeststory.us.auth0.com"
      clientId='QTNoU881uIe0QBC7WX17Xbxns66QXdZk'
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      audience='testingauthapistuff'
      scope="open profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
