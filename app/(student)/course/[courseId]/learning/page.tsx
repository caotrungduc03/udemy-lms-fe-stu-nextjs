'use client';

import Loading from '@/components/Loading';
import { RootState } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LearnPage: React.FC = () => {
  const { lessons, exercises } = useSelector(
    (state: RootState) => state.course,
  );
  const { progressId } = useSelector((state: RootState) => state.progress);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (progressId) {
      if (lessons.length) {
        router.push(`${pathName}/lesson/${lessons[0].id}`);
      } else if (exercises.length) {
        router.push(`${pathName}/exercise/${exercises[0].id}`);
      }
    }
  }, [pathName, progressId, router, exercises, lessons]);

  return <Loading />;
};

export default LearnPage;
