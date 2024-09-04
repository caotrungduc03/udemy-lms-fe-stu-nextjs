import { useDispatch, useSelector } from 'react-redux';
import { useGetExerciseByIdQuery } from '../../lib/features/exercise/exerciseApi';
import { setIsDoingSubmission } from '../../lib/features/submission/submissionSlice';
import Loading from '../Loading';

type Props = {
  exerciseId: string;
};

const ExerciseInfo: React.FC<Props> = ({ exerciseId }) => {
  const { accessToken } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetExerciseByIdQuery({
    id: exerciseId,
    accessToken,
  });

  if (isFetching) return <Loading />;

  return (
    <div className="w-[560px] border border-solid border-primary rounded-xl py-16 px-20">
      <div className="border-b border-solid border-[#cdcfd5] pb-7">
        <p className="pb-2">Exercise</p>
        <h3 className="text-2xl heading-md">{data.exerciseName}</h3>
      </div>
      <div className="mt-6 mb-14">
        <p>Deadline: {data.deadline}</p>
        <p className="pt-4">Number of questions: {data.totalQuestions}</p>
        <p className="pt-4">Time limit: {data.duration}'</p>
        <p className="pt-4">Total tries: 0/{data.max_tries}</p>
        <p className="pt-4">
          Minimum score to complete: {data.min_passing_percentage}%
        </p>
      </div>
      <div className="flex gap-6 w-full justify-start">
        <button
          className="btn btn-medium btn-primary heading-sm rounded-md"
          onClick={() => dispatch(setIsDoingSubmission(true))}
        >
          Start
        </button>
        <button className="btn btn-medium btn-ghost heading-sm rounded-md">
          Skip this exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseInfo;
