import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useGetExerciseByIdQuery } from '../../lib/features/exercise/exerciseApi';
import { RootState } from '../../lib/store';
import Loading from '../Loading';

type Props = {
  exerciseId: number;
  handleDoSubmission: () => void;
};

const ExerciseInfo: React.FC<Props> = ({ exerciseId, handleDoSubmission }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { progressId } = useSelector((state: RootState) => state.progress);
  const { exercises } = useSelector((state: RootState) => state.course);
  const router = useRouter();
  const pathName = usePathname();

  const { data, isFetching } = useGetExerciseByIdQuery({
    id: exerciseId,
    accessToken,
  });

  const handleSkipExercise = () => {
    const currentIndex = exercises.findIndex(
      (exercise) => exercise.id === exerciseId,
    );
    let nextIndex = currentIndex + 1;
    if (nextIndex >= exercises.length) {
      nextIndex = 0;
    }

    router.push(
      `${pathName.split('/').slice(0, -1).join('/')}/${
        exercises[nextIndex].id
      }`,
    );
  };

  if (!progressId || isFetching) return <Loading />;

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
        <p className="pt-4">Total tries: 0/{data.maxTries}</p>
        <p className="pt-4">
          Minimum score to complete: {data.minPassingPercentage}%
        </p>
      </div>
      <div className="flex gap-6 w-full justify-start">
        <button
          className="btn btn-medium btn-primary heading-sm rounded-md"
          onClick={handleDoSubmission}
        >
          Start
        </button>
        <button
          className="btn btn-medium btn-ghost heading-sm rounded-md"
          onClick={handleSkipExercise}
        >
          Skip this exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseInfo;
