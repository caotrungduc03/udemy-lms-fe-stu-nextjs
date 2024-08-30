'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExercisePage from '../../../../components/exercise/ExercisePage';
import LessonPage from '../../../../components/lesson/LessonPage';
import Loading from '../../../../components/Loading';
import SidebarContent from '../../../../components/SidebarContent';
import { useGetCourseByIdQuery } from '../../../../lib/features/course/courseApi';
import {
  setExerciseId,
  setLessonId,
} from '../../../../lib/features/learning/learningSlice';
import { useGetProgressByCourseIdQuery } from '../../../../lib/features/progress/progressApi';

type Params = {
  id: string;
};

const LearnPage: React.FC = () => {
  const params: Params = useParams();
  const { accessToken } = useSelector((state: any) => state.auth);
  const { lessonId, exerciseId } = useSelector((state: any) => state.learning);
  const dispatch = useDispatch();

  const { data, isLoading: isLoadingCourse } = useGetCourseByIdQuery({
    id: params.id,
  });

  const { isLoading: isLoadingProgress } = useGetProgressByCourseIdQuery({
    id: params.id,
    accessToken,
  });

  const isLoading = isLoadingProgress || isLoadingCourse;

  useEffect(() => {
    if (!lessonId && !exerciseId) {
      if (data?.lessons?.[0]?.id) {
        dispatch(setLessonId(data.lessons[0].id));
      } else if (data?.exercises?.[0]?.id) {
        dispatch(setExerciseId(data.exercises[0].id));
      }
    }
  }, [data, dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div className="relative flex min-h-[600px]">
      <div className="basis-3/4 grow">
        {!lessonId && !exerciseId && <Loading />}
        {lessonId && <LessonPage />}
        {exerciseId && <ExercisePage />}
      </div>
      <SidebarContent />
    </div>
  );
};

export default LearnPage;
