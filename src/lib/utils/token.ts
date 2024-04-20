import { localStorageAdapter } from "./localStorageAdapter"

export const getTokens = () => {
  return {
    access_token: localStorageAdapter.get('access_token') || null,
    refresh_token: localStorageAdapter.get('refresh_token') || null,
  }
}

export const setTokens = (access_token: string, refresh_token?: string | null) => {
  localStorageAdapter.set('access_token', access_token)
  if (refresh_token) {
    localStorageAdapter.set('refresh_token', refresh_token)
  }
}

export const clearTokens = () => {
  localStorageAdapter.remove('access_token')
  localStorageAdapter.remove('refresh_token')
}
