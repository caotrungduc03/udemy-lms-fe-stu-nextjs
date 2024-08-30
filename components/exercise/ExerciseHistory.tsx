import { MdInfoOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useGetSubmissionsQuery } from '../../lib/features/submission/submissionApi';
import Loading from '../Loading';

const ExerciseHistory: React.FC = () => {
  const { accessToken } = useSelector((state: any) => state.auth);
  const { progressId } = useSelector((state: any) => state.progress);
  const { exerciseId } = useSelector((state: any) => state.learning);
  const { data, isFetching } = useGetSubmissionsQuery({
    progressId,
    exerciseId,
    accessToken,
  });

  if (!progressId || !exerciseId || isFetching) return <Loading />;

  return (
    <div className="flex items-center justify-center w-full px-4 py-16">
      <div className="w-[1000px]">
        <div className="mb-8">
          <p className="pb-2">Exercise</p>
          <h3 className="text-2xl heading-md">{data.exercise.exerciseName}</h3>
        </div>
        <div className="flex items-center justify-between py-5 border-y border-solid border-[#cdcfd5]">
          <p>Deadline: {data.exercise.deadline}</p>
          <p>
            Total tries:
            {` ${data.submissions.length} / ${data.exercise.max_tries}`}
          </p>
          <p>Time limit: {data.exercise.duration}'</p>
          <p>
            Minimum score:
            {` ${data.exercise.min_passing_percentage}%`}
          </p>
        </div>
        <div className="mt-5 mb-6">
          <table className="tutor-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Date</th>
                <th>Question</th>
                <th>Correct Answers</th>
                <th>Incorrect Answers</th>
                <th>Pending Answers</th>
                <th>Score</th>
                <th>Result</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.submissions.map((submission: any) => (
                <tr key={submission.id}>
                  <td>{submission.tryCount}</td>
                  <td>
                    <p>{submission.date.split(' ')[0]}</p>
                    <p>{submission.date.split(' ')[1]}</p>
                  </td>
                  <td>{submission.totalQuestions}</td>
                  <td>{submission.numberOfCorrectAnswers}</td>
                  <td>{submission.numberOfIncorrectAnswers}</td>
                  <td>{submission.numberOfPendingAnswers}</td>
                  <td>{`${submission.gainedPointQuestions} (${submission.percentage}%)`}</td>
                  <td>
                    <span
                      className={`${
                        submission.status === 'PENDING'
                          ? 'label-warning'
                          : submission.status === 'PASS'
                          ? 'label-success'
                          : 'label-error'
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <a className="btn btn-medium btn-secondary rounded-md">
                        <MdInfoOutline className="icon icon-small" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-6 w-full justify-start">
          <button className="btn btn-medium btn-primary heading-sm rounded-md">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseHistory;
