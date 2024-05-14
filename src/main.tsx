import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

import { ThemeProvider } from './shared/providers/theme-provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>,
);
