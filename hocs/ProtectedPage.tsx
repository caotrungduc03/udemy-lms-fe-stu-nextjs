import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

const ProtectedPage = (Component: any) => {
  return () => {
    const router = useRouter();
    const { user, accessToken } = useSelector((state: any) => state.auth);

    useEffect(() => {
      if (!user || !accessToken) {
        router.push('/log-in');
      }
    }, [user, accessToken, router]);

    if (!user || !accessToken) {
      return <Loading />;
    }

    return <Component />;
  };
};

export default ProtectedPage;
