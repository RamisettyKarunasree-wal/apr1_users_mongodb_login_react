import { useEffect } from 'react';

export default function () {
  useEffect(() => {
    localStorage.clear();
    window.location.pathname = '/';
  });
  return null;
}
