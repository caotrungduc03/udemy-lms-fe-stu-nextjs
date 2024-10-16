import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const ExerciseHeader: React.FC = () => {
  const { general, submissions } = useSelector(
    (state: RootState) => state.exercise,
  );

  return (
    <div className="mb-5">
      <div className="mb-8">
        <p className="pb-2">Exercise</p>
        <h3 className="text-2xl heading-md">{general.exerciseName}</h3>
      </div>
      <div className="flex items-center justify-between py-5 border-y border-solid border-[#cdcfd5]">
        <p>Deadline: {general.deadline}</p>
        <p>
          Total tries:
          {` ${submissions.length} / ${general.maxTries}`}
        </p>
        <p>Time limit: {general.duration}'</p>
        <p>
          Minimum score:
          {` ${general.minPassingPercentage}%`}
        </p>
      </div>
    </div>
  );
};

export default ExerciseHeader;
