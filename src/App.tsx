import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes';
import './App.css';
import { Toaster } from 'react-hot-toast';
import GoogleAuthProvider from 'shared/providers/google-auth-provider';
import AuthProvider from 'shared/providers/AuthProvider';

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
      <AuthProvider>
        <GoogleAuthProvider>
          <div className="App h-screen bg-[#FFFEFC] scroll-smooth leading-1 ">
            <Router />
          </div>
          <Toaster position="bottom-center" reverseOrder={false} />
        </GoogleAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
