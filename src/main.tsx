import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import InAppBrowserGuard from './components/InAppBrowserGuard';
import { AuthProvider } from './auth/AuthContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InAppBrowserGuard>
      <AuthProvider>
        <App />
      </AuthProvider>
    </InAppBrowserGuard>
  </React.StrictMode>
);
