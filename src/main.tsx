import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import AuthProvider from './shared/providers/AuthProvider';

import { ThemeProvider } from './components/providers/theme-provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
