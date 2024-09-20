import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useCreateProgressExerciseMutation,
  useGetSubmissionsQuery,
} from '../../lib/features/submission/submissionApi';
import { RootState } from '../../lib/store';
import Loading from '../Loading';
import ExerciseHeader from './ExerciseHeader';
import ExerciseTable from './ExerciseTable';

type Props = {
  exerciseId: number;
};

const ExerciseHistory: React.FC<Props> = ({ exerciseId }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { progressId } = useSelector((state: RootState) => state.progress);
  const { data, isFetching } = useGetSubmissionsQuery({
    progressId,
    exerciseId,
    accessToken,
  });
  const [trigger] = useCreateProgressExerciseMutation();
  const router = useRouter();
  const pathName = usePathname();

  const handleDoSubmission = () => {
    trigger({
      progressId,
      exerciseId,
      accessToken,
    })
      .unwrap()
      .then((res) => {
        router.push(`${pathName}/submission`);
      })
      .catch((error) => {
        toast.error(error.data.message);
        console.log('error', error);
      });
  };

  if (!progressId || isFetching) return <Loading />;

  return (
    <div className="w-[1000px]">
      <ExerciseHeader />
      <ExerciseTable submissions={data.submissions} isShowDetail={true} />
      <div className="flex gap-6 w-full justify-start">
        <button
          className="btn btn-medium btn-primary heading-sm rounded-md"
          onClick={handleDoSubmission}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ExerciseHistory;
