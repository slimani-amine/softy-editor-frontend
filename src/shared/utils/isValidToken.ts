import jwtDecode from 'jwt-decode'

export interface JwtPayload {
  exp: number
}

export const isValidToken = (token: string) => {
  const decoded: JwtPayload = jwtDecode(token)
  const currentTime = Date.now() / 1000
  return decoded.exp > currentTime
}
