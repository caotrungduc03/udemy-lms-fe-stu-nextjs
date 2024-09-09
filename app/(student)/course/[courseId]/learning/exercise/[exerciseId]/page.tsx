'use client';

import ExerciseHistory from '@/components/exercise/ExerciseHistory';
import ExerciseInfo from '@/components/exercise/ExerciseInfo';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

type Params = {
  courseId: string;
  exerciseId: string;
};

const ExercisePage: React.FC = () => {
  const { exerciseIds } = useSelector((state: any) => state.progress);
  const { exerciseId }: Params = useParams();

  return exerciseIds.includes(Number(exerciseId)) ? (
    <ExerciseHistory exerciseId={Number(exerciseId)} />
  ) : (
    <ExerciseInfo exerciseId={Number(exerciseId)} />
  );
};

export default ExercisePage;
