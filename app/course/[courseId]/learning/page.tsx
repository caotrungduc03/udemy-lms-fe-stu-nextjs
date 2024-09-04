'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../components/Loading';
import { useGetCourseByIdQuery } from '../../../../lib/features/course/courseApi';
import { useGetProgressByCourseIdQuery } from '../../../../lib/features/progress/progressApi';

type Params = {
  courseId: string;
};

const LearnPage: React.FC = () => {
  const params: Params = useParams();
  const { accessToken } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const { data, isSuccess: isSuccessCourse } = useGetCourseByIdQuery({
    id: params.courseId,
  });

  const { isSuccess: isSuccessProgress } = useGetProgressByCourseIdQuery({
    id: params.courseId,
    accessToken,
  });

  useEffect(() => {
    if (isSuccessCourse && isSuccessProgress) {
      if (data?.lessons?.[0]?.id) {
        router.push(`${pathName}/lesson/${data.lessons[0].id}`);
      } else if (data?.exercises?.[0]?.id) {
        router.push(`${pathName}/exercise/${data.exercises[0].id}`);
      }
    }
  }, [data, isSuccessCourse, isSuccessProgress, pathName, router, dispatch]);

  return <Loading />;
};

export default LearnPage;
