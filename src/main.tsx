import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import AuthProvider from './services/providers/AuthProvider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
