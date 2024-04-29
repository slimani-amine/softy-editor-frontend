// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const metadata = {
  title: 'Jotion',
  description: 'The connected workspace where better, faster work happens.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg',
      },
    ],
  },
};
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App font-mono h-screen dark:bg-[#191919]">
        <Router />
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />{' '}
    </QueryClientProvider>
  );
}

export default App;
