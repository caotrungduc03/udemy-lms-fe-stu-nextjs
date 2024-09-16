import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetExerciseByIdQuery } from '../../lib/features/exercise/exerciseApi';
import { useCreateProgressExerciseMutation } from '../../lib/features/submission/submissionApi';
import { RootState } from '../../lib/store';
import Loading from '../Loading';

type Props = {
  exerciseId: number;
};

const ExerciseInfo: React.FC<Props> = ({ exerciseId }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { progressId } = useSelector((state: RootState) => state.progress);
  const { data, isFetching } = useGetExerciseByIdQuery({
    id: exerciseId,
    accessToken,
  });
  const [trigger] = useCreateProgressExerciseMutation();
  const router = useRouter();
  const pathName = usePathname();

  const handleDoSubmission = async () => {
    try {
      const res = await trigger({
        progressId,
        exerciseId,
        accessToken,
      }).unwrap();

      router.push(`${pathName}/submission`);
    } catch (error: any) {
      toast.error(error.data.message);
      console.log('error', error);
    }
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
        <button className="btn btn-medium btn-ghost heading-sm rounded-md">
          Skip this exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseInfo;
