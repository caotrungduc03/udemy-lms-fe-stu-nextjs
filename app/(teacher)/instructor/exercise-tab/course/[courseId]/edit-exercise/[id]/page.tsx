'use client';

import {
  useGetExerciseByIdQuery,
  useUpdateExerciseMutation,
} from '@/lib/features/exercise/exerciseApi';
import { getToken } from '@/lib/tokens';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormValues = {
  exerciseName: string;
  description: string;
  exerciseType: string;
  duration: number;
  deadline: string;
  minPassingPercentage: number;
  maxTries: number;
  courseId: string;
};

export default function EditExercise() {
  const [date, setDate] = useState('');
  const params = useParams();
  const courseId = params.courseId;
  const exerciseId = Number(params.id);
  const { data } = useGetExerciseByIdQuery({
    id: exerciseId,
    accessToken: getToken(),
  });
  console.log(data);
  useEffect(() => {
    setDate(data?.deadline);
  }, [data]);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const formattedDate = formatMMDDYYYY(inputDate);
    setDate(formattedDate);
  };

  const formatMMDDYYYY = (inputDate: string) => {
    // Split the input (which comes as yyyy-mm-dd) into parts
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      return `${parts[1]}-${parts[2]}-${parts[0]}`;
    }
    return inputDate;
  };
  const [editExercise, { isLoading }] = useUpdateExerciseMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const formatYYYYMMDD = (dateString: string | undefined) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const exerciseData = {
      ...data,
      minPassingPercentage: Number(data.minPassingPercentage),
      maxTries: Number(data.maxTries),
      duration: Number(data.duration),
      courseId: courseId,
    };
    try {
      const result = await editExercise({
        id: exerciseId,
        data: exerciseData,
        accessToken: getToken(),
      }).unwrap();
      if (result) {
        toast.success('Edit exercise successfully');
        setTimeout(() => {
          window.location.href = `/instructor/exercise-tab/course/${courseId}/list-exercises`;
        }, 2000);
      }
    } catch (err) {
      toast.error('Failed to edit exercise');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-5">
      <div className="font-c font-bold text-center text-4xl text-blue-700 mb-10">
        Edit Exercise
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-2xl flex flex-col border border-gray-300 rounded-lg p-8 shadow-lg"
      >
        <label className="font-medium text-lg text-gray-700 mb-2">
          Exercise Name
        </label>
        <input
          placeholder={data?.exerciseName}
          {...register('exerciseName', { required: true })}
          className="border border-gray-300 p-3 rounded-lg mb-5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label className="font-medium text-lg text-gray-700 mb-2">
          Description
        </label>
        <input
          placeholder={data?.description}
          {...register('description', { required: true })}
          className="border border-gray-300 p-3 rounded-lg mb-5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label className="font-medium text-lg text-gray-700 mb-2">Type</label>
        <select
          className="p-3 border border-gray-300 w-full rounded-lg text-gray-900 mb-5"
          value={data?.exerciseType}
          {...register('exerciseType', { required: true })}
        >
          <option value="QUIZ">QUIZ</option>
        </select>
        <label className="font-medium text-lg text-gray-700 mb-2">
          Duration
        </label>
        <input
          placeholder={data?.duration}
          {...register('duration', { required: true })}
          type="number"
          className="border border-gray-300 p-3 rounded-lg w-full text-gray-900 mb-5"
        />
        <label className="font-medium text-lg text-gray-700 mb-2">
          Deadline
        </label>
        <input
          type="date"
          value={formatYYYYMMDD(date)}
          {...register('deadline', { required: true })}
          onChange={handleDateChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-5"
        />
        <label className="font-medium text-lg text-gray-700 mb-2">
          Min passing percentage
        </label>
        <input
          placeholder={data?.minPassingPercentage}
          {...register('minPassingPercentage', { required: true })}
          type="number"
          className="border border-gray-300 p-3 rounded-lg mb-5 w-full text-gray-900"
        />
        <label className="font-medium text-lg text-gray-700 mb-2">
          Max tries
        </label>
        <input
          placeholder={data?.maxTries}
          {...register('maxTries', { required: true })}
          type="number"
          className="border border-gray-300 p-3 rounded-lg w-full text-gray-900 mb-5"
        />

        <div className="flex justify-center">
          {isLoading ? (
            <button
              type="button"
              className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                ></path>
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg dark:focus:ring-blue-900 hover:bg-blue-700"
            >
              Create Exercise
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
