'use client';

import Loading from '@/components/Loading';
import { RootState } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LearnPage: React.FC = () => {
  const { general, lessons, exercises } = useSelector(
    (state: RootState) => state.course,
  );
  const { progressId } = useSelector((state: RootState) => state.progress);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (progressId && general) {
      if (lessons.length) {
        router.push(`${pathName}/lesson/${lessons[0].id}`);
      } else if (exercises.length) {
        router.push(`${pathName}/exercise/${exercises[0].id}`);
      } else {
        toast.warn('No lesson or exercise found');
      }
    }
  }, [progressId, general, lessons, exercises, pathName, router]);

  return <Loading />;
};

export default LearnPage;
