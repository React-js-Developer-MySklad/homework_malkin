import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContragentProvider } from './app/main/contragents/context/ContragentProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ContragentProvider>
    <App></App>
  </ContragentProvider>
);
