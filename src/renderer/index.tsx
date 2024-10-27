import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../components/App';

console.log('[renderer] Initializing React app');






ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
