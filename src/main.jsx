// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';       // Import des styles Tailwind
import App from './App.jsx'; // Import du composant racine de l'app

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
