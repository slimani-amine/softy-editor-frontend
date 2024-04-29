export const localStorageAdapter = {
  set: (key: string, value: string): void => {
    if (value) {
      localStorage.setItem(key, value)
    } else {
      localStorage.removeItem(key)
    }
  },

  get: (key: string): string | null => {
    return localStorage.getItem(key)
  },

  remove: (key: string): void => {
    return localStorage.removeItem(key)
  },
}
