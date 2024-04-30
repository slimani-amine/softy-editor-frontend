import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes';
import './App.css';
import { Toaster } from 'react-hot-toast';
import GoogleAuthProvider from 'shared/providers/google-auth-provider';

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
        url: '/logo.svg',
        href: '/logo.svg',
      },
    ],
  },
};
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAuthProvider>
        <div className="App h-screen bg-[#FFFEFC] scroll-smooth leading-1 ">
          <Router />
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </GoogleAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
