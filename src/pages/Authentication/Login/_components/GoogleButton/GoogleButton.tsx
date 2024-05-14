import React, { useEffect } from 'react';
import { Button } from 'shared/components/ui/button';
import { usegoogleLoginQuery } from '@/services/queries/auth.query';
import toast from 'react-hot-toast';
import { exchangeCodeForIdToken } from '@/services/api/auth.service';
import useAuthStore from '@/store/useAuthStore';
import { useGoogleLogin } from '@react-oauth/google';
import { setTokens } from '@/lib/utils/token';
import GoogleIcon from 'shared/components/Shared/Icons/googleIcon';
import { useGetMyWorkSpacesQuery } from '@/services/queries/workspace.query';
import { useNavigate } from 'react-router';

const GoogleButton: React.FC = () => {
  const {
    isLoading,
    mutateAsync: loginWithGoogle,
    isError,
    error,
  } = usegoogleLoginQuery();

  const {
    isLoading: getMyWorkspacesLoading,
    mutateAsync: getMyWorkspaces,
    isError: isErrorForGetMyWorkspaces,
    error: errorForGetMyWorkspaces,
  } = useGetMyWorkSpacesQuery();

  const { setIsAuthenticated, setUser, setToken, setMyWorkspaces } =
    useAuthStore((state: any) => state);

  const navigate = useNavigate();

  const onSuccess = async (tokenResponse: any) => {
    const idToken = await exchangeCodeForIdToken(tokenResponse?.code);
    if (idToken) {
      const res = await loginWithGoogle({ idToken });

      if (res) {
        const { token: accessToken, refreshToken, user } = res;
        setTokens(accessToken, refreshToken);
        setToken(accessToken);
        setUser(user);
        const myWorkspaces = await getMyWorkspaces(accessToken);
        setIsAuthenticated(true);
        if (myWorkspaces && myWorkspaces.length > 0) {
          setMyWorkspaces(myWorkspaces);
          navigate(`/workspaces/${myWorkspaces[0]?.id}/documents`);
        } else {
          navigate('/onboarding');
        }
        setIsAuthenticated(true);
      } else {
        toast.error('something went wrong');
      }
    }
  };

  const Googlelogin = useGoogleLogin({
    onSuccess,
    onError: (error) => console.log(error),
    flow: 'auth-code',
  });

  return (
    <div className="w-full flex items-center justify-center mb-2">
      <Button
        variant={'empty'}
        className="w-full items-center justify-center h-9 px-2 py-1 border flex border-color rounded-[5px] text-slate-700  hover:border-slate-400  hover:text-slate-900 hover:shadow transition duration-150"
        onClick={Googlelogin}
      >
        <GoogleIcon />
        <span className=" text-black ">Continue with Google</span>
      </Button>
    </div>
  );
};

export default GoogleButton;
