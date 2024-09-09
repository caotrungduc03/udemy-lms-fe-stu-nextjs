export const getAuthorId = (): string => {
  if (typeof window === 'undefined') return '';

  return localStorage.getItem('authorId') || '';
};

export const setAuthorId = (Id: string) => {
  if (typeof window === 'undefined' || !Id) return;

  localStorage.setItem('authorId', Id);
};

export const removeAuthorId = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('authorId');
};
