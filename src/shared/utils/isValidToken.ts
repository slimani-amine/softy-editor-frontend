import { jwtDecode } from 'jwt-decode';
<<<<<<< HEAD
=======

>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
export interface JwtPayload {
  exp: number;
}

export const isValidToken = (token: string) => {
  const decoded: JwtPayload = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};
