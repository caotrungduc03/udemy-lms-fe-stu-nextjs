'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAuthDataQuery } from '../lib/features/auth/authApi';
import { getToken } from '../lib/tokens';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | undefined>('');
  const { user } = useSelector((state: any) => state.auth);
  const { isLoading } = useGetAuthDataQuery(
    {
      accessToken,
    },
    {
      skip: !!user || !accessToken,
    },
  );

  useEffect(() => {
    if (!accessToken) {
      setAccessToken(getToken());
    }
  }, []);

  if (accessToken === '' || isLoading) return <Loading />;

  return (
    <div className="flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Wrapper;
