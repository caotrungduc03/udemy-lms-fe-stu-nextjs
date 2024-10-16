import { useSelector } from 'react-redux';
import { useGetSubmissionsQuery } from '../../lib/features/submission/submissionApi';
import { RootState } from '../../lib/store';
import Loading from '../Loading';
import ExerciseHeader from './ExerciseHeader';
import ExerciseTable from './ExerciseTable';

type Props = {
  exerciseId: number;
  handleDoSubmission: () => void;
};

const ExerciseHistory: React.FC<Props> = ({
  exerciseId,
  handleDoSubmission,
}) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { progressId } = useSelector((state: RootState) => state.progress);
  const { submissions } = useSelector((state: RootState) => state.exercise);
  const { isFetching } = useGetSubmissionsQuery({
    progressId,
    exerciseId,
    accessToken,
  });

  if (!progressId || isFetching) return <Loading />;

  return (
    <div className="w-[1000px]">
      <ExerciseHeader />
      <ExerciseTable submissions={submissions} isShowDetail={true} />
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
