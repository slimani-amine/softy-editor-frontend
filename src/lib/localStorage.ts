/**
 * Retrieves a value from localStorage by its key, and parses it as type `T`.
 * @param key The key to look up in localStorage.
 * @returns The parsed value as type `T`, or `null` if no value is found for the given key.
 * @template T The type of the value to parse from localStorage. Defaults to `unknown`.
 */
const getItem = <T = unknown>(key: string): T | null => {
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

/**
 * Saves a value to localStorage with the given key.
 * @param key The key to use to store the value in localStorage.
 * @param value The value to save to localStorage.
 */
const setItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Clears an item from localStorage by its key.
 * @param key The key of the item to clear from localStorage.
 */
const clearItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export { getItem, setItem, clearItem };
