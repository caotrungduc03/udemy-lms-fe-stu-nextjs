import { setProgressExerciseId } from '@/lib/features/submission/submissionSlice';
import { usePathname, useRouter } from 'next/navigation';
import { MdInfoOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

type Props = {
  submissions: any[];
  isShowDetail?: boolean;
};

const ExerciseTable: React.FC<Props> = ({
  submissions = [],
  isShowDetail = false,
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = (id: number) => {
    dispatch(setProgressExerciseId(id));
    router.push(`${pathName}/result`);
  };

  return (
    <table className="tutor-table mb-6">
      <thead>
        <tr>
          <th>Try Count</th>
          <th>Date</th>
          <th>Question</th>
          <th>Correct Answers</th>
          <th>Incorrect Answers</th>
          <th>Pending Answers</th>
          <th>Score</th>
          <th>Result</th>
          {isShowDetail && <th>Details</th>}
        </tr>
      </thead>
      <tbody>
        {submissions?.map((submission: any, index: number) => (
          <tr key={index}>
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
            {isShowDetail && (
              <td>
                <div className="flex justify-center">
                  <a
                    onClick={() => handleClick(submission.progressExerciseId)}
                    className="btn btn-medium btn-secondary rounded-md"
                  >
                    <MdInfoOutline className="icon icon-small" />
                  </a>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExerciseTable;
