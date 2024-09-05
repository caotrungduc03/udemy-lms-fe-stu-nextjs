'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Loading from '../../../../components/Loading';

const LearnPage: React.FC = () => {
  const pathName = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   if () {
  //     if (data?.lessons?.[0]?.id) {
  //       router.push(`${pathName}/lesson/${data.lessons[0].id}`);
  //     } else if (data?.exercises?.[0]?.id) {
  //       router.push(`${pathName}/exercise/${data.exercises[0].id}`);
  //     }
  //   }
  // }, [data, isSuccessCourse, isSuccessProgress, pathName, router, dispatch]);

  return <Loading />;
};

export default LearnPage;
