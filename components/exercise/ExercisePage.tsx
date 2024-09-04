import React from 'react';
import { useSelector } from 'react-redux';
import ExerciseHistory from './ExerciseHistory';
import ExerciseInfo from './ExerciseInfo';
import Submission from './Submission';

const ExercisePage: React.FC = () => {
  const { exerciseIds } = useSelector((state: any) => state.progress);
  const { exerciseId } = useSelector((state: any) => state.learning);
  const { isDoingSubmission } = useSelector((state: any) => state.submission);

  return (
    <div className="flex items-center justify-center w-full px-4 py-16">
      {isDoingSubmission ? (
        <Submission />
      ) : exerciseIds.includes(exerciseId) ? (
        <ExerciseHistory />
      ) : (
        <ExerciseInfo />
      )}
    </div>
  );
};

export default ExercisePage;
