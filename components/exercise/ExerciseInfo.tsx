import { memo } from 'react';
import { useGetExerciseQuery } from '../../lib/features/exercise/exerciseApi';
import { getToken } from '../../lib/tokens';
import Loading from '../Loading';

interface Props {
  exerciseId: string | number;
}

const ExerciseInfo: React.FC<Props> = ({ exerciseId }) => {
  const { data, isLoading, isFetching } = useGetExerciseQuery({
    id: exerciseId,
    accessToken: getToken(),
  });

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="flex items-center justify-center w-full px-4 py-16">
      <div className="w-[560px] border border-solid border-primary rounded-xl py-16 px-20">
        <div className="border-b border-solid border-[#cdcfd5] pb-7">
          <p className="pb-2">Exercise</p>
          <h3 className="text-2xl heading-md">{data.exerciseName}</h3>
        </div>
        <div className="mt-6 mb-14">
          <p>Deadline: {data.deadline}</p>
          <p className="pt-4">Number of questions: {data.questions.length}</p>
          <p className="pt-4">Time limit: {data.duration}'</p>
          <p className="pt-4">Total tries: 0/{data.max_tries}</p>
          <p className="pt-4">
            Minimum score to complete: {data.min_passing_percentage}%
          </p>
        </div>
        <div className="flex gap-6 w-full justify-start">
          <button className="btn btn-medium btn-primary heading-sm rounded-md">
            Start
          </button>
          <button className="btn btn-medium btn-ghost heading-sm rounded-md">
            Skip this exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ExerciseInfo);
