'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('You need to log in first!!!');
      router.push('/log-in'); // Redirect đến trang đăng nhập nếu không có accessToken
    }
  }, [router]);
};

export default useAuth;
