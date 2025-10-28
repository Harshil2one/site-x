export const useLocalStorage = () => {
  const getLocalStorage = (key: string) => {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return data;
  };

  const setLocalStorage = (key: string, value: string | object | number) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    getLocalStorage,
    setLocalStorage,
    clearLocalStorage,
    removeLocalStorage,
  };
};
