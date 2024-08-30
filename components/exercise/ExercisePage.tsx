import React from 'react';
import { useSelector } from 'react-redux';
import ExerciseHistory from './ExerciseHistory';
import ExerciseInfo from './ExerciseInfo';

const ExercisePage: React.FC = () => {
  const { exerciseIds } = useSelector((state: any) => state.progress);
  const { exerciseId } = useSelector((state: any) => state.learning);

  return exerciseIds.includes(exerciseId) ? (
    <ExerciseHistory />
  ) : (
    <ExerciseInfo />
  );
};

export default ExercisePage;
