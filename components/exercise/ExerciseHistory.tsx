import { memo } from 'react';
import { MdInfoOutline } from 'react-icons/md';

const data = {
  data: {
    exerciseName: 'Exercise 1',
    deadline: '2022-06-30T00:00:00.000Z',
    questions: [],
    duration: 60,
    max_tries: 3,
    min_passing_percentage: 60,
  },
};

interface Props {
  progressId: string | number;
  exerciseId: string | number;
}

const ExerciseHistory: React.FC<Props> = ({ progressId, exerciseId }) => {
  return (
    <div className="flex items-center justify-center w-full px-4 py-16">
      <div className="w-[1000px]">
        <div className="mb-8">
          <p className="pb-2">Exercise</p>
          <h3 className="text-2xl heading-md">{data.data.exerciseName}</h3>
        </div>
        <div className="flex items-center justify-between py-5 border-y border-solid border-[#cdcfd5]">
          <p>Deadline: {data.data.deadline}</p>
          <p>Number of questions: {data.data.questions.length}</p>
          <p>Time limit: {data.data.duration}'</p>
          <p>
            Minimum score:{' '}
            {Math.ceil(data.data.min_passing_percentage * data.data.max_tries) /
              100}
          </p>
        </div>
        <div className="mt-5 mb-6">
          <table className="tutor-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Question</th>
                <th>Correct Answers</th>
                <th>Incorrect Answers</th>
                <th>Score</th>
                <th>Result</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tháng Bảy 6, 2024 6:48 chiều </td>
                <td>2 </td>
                <td>2 </td>
                <td>0 </td>
                <td>2 (100%) </td>
                <td>
                  <span className="label-success">Đạt</span>
                </td>
                <td>
                  <div className="flex justify-center">
                    <a className="btn btn-medium btn-secondary rounded-md">
                      <MdInfoOutline className="icon icon-small" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tháng Bảy 6, 2024 6:48 chiều </td>
                <td>2 </td>
                <td>2 </td>
                <td>0 </td>
                <td>2 (100%) </td>
                <td>
                  <span className="label-error">Trượt</span>
                </td>
                <td>
                  <div className="flex justify-center">
                    <a className="btn btn-medium btn-secondary rounded-md">
                      <MdInfoOutline className="icon icon-small" />
                    </a>
                  </div>
                </td>
              </tr>
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

export default memo(ExerciseHistory);
