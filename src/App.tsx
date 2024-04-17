import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App font-mono h-screen bg-[#FFFEFC]">
        <Router />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
