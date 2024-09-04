'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import ExerciseHistory from '../../../../../../components/exercise/ExerciseHistory';
import ExerciseInfo from '../../../../../../components/exercise/ExerciseInfo';
import Submission from '../../../../../../components/exercise/Submission';

type Params = {
  courseId: string;
  exerciseId: string;
};

const ExercisePage: React.FC = () => {
  const { exerciseIds } = useSelector((state: any) => state.progress);
  const { exerciseId }: Params = useParams();
  const { isDoingSubmission } = useSelector((state: any) => state.submission);

  return (
    <div className="flex items-center justify-center w-full px-4 py-16">
      {isDoingSubmission ? (
        <Submission />
      ) : exerciseIds.includes(exerciseId) ? (
        <ExerciseHistory exerciseId={exerciseId} />
      ) : (
        <ExerciseInfo exerciseId={exerciseId} />
      )}
    </div>
  );
};

export default ExercisePage;
