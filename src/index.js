import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Encontra o elemento root
const container = document.getElementById('root');

// Cria o root
const root = ReactDOM.createRoot(container);

// Renderiza o App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
