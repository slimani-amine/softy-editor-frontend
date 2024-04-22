import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes';
import './App.css';
import { Toaster } from 'react-hot-toast';
import GoogleAuthProvider from 'shared/providers/google-auth-provider';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAuthProvider>
        <div className="App h-screen bg-[#FFFEFC] scroll-smooth ">
          <Router />
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </GoogleAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
