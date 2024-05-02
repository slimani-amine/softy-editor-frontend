import { useUpdateUserQuery } from '@/services/queries/auth.query';
import successImage from '../../../../public/documents.png';

import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'; // Changed import to react-router-dom

import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'shared/utils/isValidToken';

const Success = () => {
  const { user, setUser, myWorkspaces } = useAuthStore((state) => state);
  let [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get('token');

  const isValidToken = (token: string) => {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  };
  if (!token || !isValidToken(token)) {
    return <Navigate to="/login" />;
  }

  const decoded = jwtDecode(token as string) as any;
  const navigate = useNavigate();
  const {
    isLoading,
    mutateAsync: update,
    isError,
    error,
  } = useUpdateUserQuery();

  useEffect(() => {
    const updateUser = async () => {
      const data = {
        id: Number(user?.id),
        offer: { id: Number(decoded.offerId) },
      };
      const res = await update(data);
      console.log('🚀 ~ updateUser ~ res:', res);
      if (res) {
        setUser(res);
        navigate(`/workspaces/${myWorkspaces[0].id}/documents`);
      }
    };
    updateUser();
  }, [update]);

  return (
    <>
      <p>Loading...</p>
    </>
  );
};

export default Success;
