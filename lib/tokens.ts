export const getToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};

export const setToken = (token: string) => {
  if (!token) return;

  localStorage.setItem('accessToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
};
