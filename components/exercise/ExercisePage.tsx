'use client';
import React, { memo } from 'react';
import ExerciseHistory from './ExerciseHistory';
import ExerciseInfo from './ExerciseInfo';
interface Exercise {
  exerciseId: string | number;
}

const ExercisePage: React.FC<Exercise> = ({ exerciseId }) => {
  const randomNumber = Math.floor(Math.random() * 10);

  if (randomNumber % 2 === 0) {
    return <ExerciseInfo exerciseId={exerciseId} />;
  }

  return <ExerciseHistory progressId={15} exerciseId={exerciseId} />;
};

export default memo(ExercisePage);
