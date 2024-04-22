import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  googleClientId,
} from 'shared/config';

function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  ) : (
    children
  );
}

export default GoogleAuthProvider;
