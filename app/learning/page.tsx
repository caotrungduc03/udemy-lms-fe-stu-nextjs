'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExercisePage from '../../components/exercisePage';
import LessonPage from '../../components/lessonPage';
import SidebarContent from '../../components/SidebarContent';
import SidebarToggleButton from '../../components/SidebarToggleButton';
import { useGetProgressDataQuery } from '../../lib/features/progress/progressApi';
import { getToken } from '../../lib/tokens';
import useAuth from '../hook/auth';

const Learning: React.FC = () => {
  useAuth();
  const searchParam = useSearchParams();
  const router = useRouter();
  const id = searchParam.get('courseId') || '';
  const lessonId = searchParam.get('lessonId');
  const exerciseId = searchParam.get('exerciseId');
  const [hidden, setHidden] = useState(false);
  const { data, isLoading } = useGetProgressDataQuery({
    id,
    accessToken: getToken(),
  });
  const { progress } = useSelector((state: any) => state.progress);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  if (isLoading) {
    return (
      <div role="status" className="flex justify-center p-40">
        {/* Spinner code */}
      </div>
    );
  }

  const handleLessonClick = (lessonId: string) => {
    router.push(`/learning?courseId=${id}&lessonId=${lessonId}`);
  };

  const handleExerciseClick = (exerciseId: string) => {
    router.push(`/learning?courseId=${1}&exerciseId=${exerciseId}`);
  };

  return (
    <div className="relative grid grid-cols-4">
      <div className={`col-span-${hidden ? '4' : '3'} flex flex-col pb-10`}>
        {lessonId && <LessonPage lessonId={lessonId} />}
        {exerciseId && <ExercisePage exerciseId={exerciseId} />}
        {!lessonId && !exerciseId && (
          <div className="flex flex-col space-y-5 m-2">
            <h1 className="font-bold text-2xl text-center">Nhạc dẩy đầm</h1>
            <iframe
              className="w-full h-[450px]"
              src="https://www.youtube.com/embed/Q71_rxMv0uU?si=drwsVur_0fgu1noN"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <SidebarContent
        hidden={hidden}
        setHidden={setHidden}
        progress={progress}
        handleLessonClick={handleLessonClick}
        handleExerciseClick={handleExerciseClick}
      />
      {hidden && <SidebarToggleButton setHidden={setHidden} />}
    </div>
  );
};

export default Learning;
