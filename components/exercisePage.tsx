'use client';
import React, { memo } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useGetExerciseDataQuery } from '../lib/features/exercise/exerciseApi';
import { getToken } from '../lib/tokens';
import Loading from './Loading';
interface Exercise {
  progressLEID: any;
  exerciseId: string;
}
const ExercisePage: React.FC<Exercise> = ({ exerciseId, progressLEID }) => {
  const { data, isLoading, isFetching, isError } = useGetExerciseDataQuery({
    id: exerciseId,
    accessToken: getToken(),
  });
  if (isError) {
    return toast.error('Something went wrong');
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  const randomNumber = Math.floor(Math.random() * 10);

  if (!progressLEID.exercise.includes(parseInt(exerciseId))) {
    return (
      <div className="flex items-center justify-center w-full px-4 py-16">
        <div className="w-[560px] border border-solid border-primary rounded-xl py-16 px-20">
          <div className="border-b border-solid border-[#cdcfd5] pb-7">
            <p className="pb-2">Exercise</p>
            <h3 className="text-2xl heading-md">{data.data.exerciseName}</h3>
          </div>
          <div className="mt-6 mb-14">
            <p>Deadline: {data.data.deadline}</p>
            <p className="pt-4">
              Number of questions: {data.data.questions.length}
            </p>
            <p className="pt-4">Time limit: {data.data.duration}'</p>
            <p className="pt-4">Total tries: 0/{data.data.max_tries}</p>
            <p className="pt-4">
              Minimum score to complete: {data.data.min_passing_percentage}%
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
  }

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

export default memo(ExercisePage);
