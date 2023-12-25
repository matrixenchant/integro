import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AppProvider } from './contexts/AppContext.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <AppProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AppProvider>
  </React.StrictMode>
);
