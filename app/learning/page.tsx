'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ExercisePage from '../../components/exercisePage';
import LessonPage from '../../components/lessonPage';
import { useGetProgressDataQuery } from '../../lib/features/progress/progressApi';
import { getToken } from '../../lib/tokens';

const Learning: React.FC = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const id = searchParam.get('courseId') || '';
  const lessonId = searchParam.get('lessonId');
  const exerciseId = searchParam.get('exerciseId');
  const [hidden, setHidden] = useState(false);
  const [showLessons, setShowLessons] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const { data, isLoading } = useGetProgressDataQuery({
    id,
    accessToken: getToken(),
  });
  const { progress } = useSelector((state: any) => state.progress);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  if (isLoading) {
    return (
      <div role="status" className="flex justify-center p-40">
        <svg
          aria-hidden="true"
          className="w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  const handleLessonClick = (lessonId: string) => {
    router.push(`/learning?courseId=${id}&lessonId=${lessonId}`);
  };

  const handleExerciseClick = (exerciseId: string) => {
    router.push(`/learning?courseId=${1}&exerciseId=${exerciseId}`);
  };

  return (
    <div className="relative grid grid-cols-4">
      <div className={`col-span-${hidden ? '4' : '3'} flex flex-col pb-10`}>
        {lessonId && <LessonPage lessonId={lessonId} />}
        {exerciseId && <ExercisePage exerciseId={exerciseId} />}
        {!lessonId && !exerciseId && (
          <div className="flex flex-col space-y-5 m-2">
            <h1 className="font-bold text-2xl text-center">Nhạc dẩy đầm</h1>
            <iframe
              className="w-full h-[450px]"
              src="https://www.youtube.com/embed/Q71_rxMv0uU?si=drwsVur_0fgu1noN"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <div
        className={`col-span-1 border border-gray-200 top-0 transform transition-transform duration-300 ease-in-out ${
          hidden ? 'translate-x-full' : 'relative translate-x-0'
        }`}
      >
        {!hidden && (
          <>
            <div>
              <div className="flex justify-between items-center p-2 border-b border-gray-200">
                <h1 className="font-bold">Course Content</h1>
                <button onClick={() => setHidden(!hidden)}>
                  <IoCloseSharp />
                </button>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200"
                onClick={() => setShowLessons(!showLessons)}
              >
                <span className=" text-black px-2 py-2 rounded-md">
                  Show Lessons
                </span>
                <MdOutlineArrowDropDown />
              </div>
              {showLessons && (
                <div className="mt-2">
                  {progress.lessons.map((lesson: any) => (
                    <div
                      key={lesson.id}
                      className="flex items-center hover:bg-gray-200 p-2 cursor-pointer"
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      <input type="checkbox" className="mr-2" />
                      <h1 className="text-sm text-gray-400">
                        {lesson.lessonName}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200"
                onClick={() => setShowExercises(!showExercises)}
              >
                <span className=" text-black px-2 py-2 rounded-md">
                  Show Exercises
                </span>
                <MdOutlineArrowDropDown />
              </div>
              {showExercises && (
                <div className="mt-2">
                  {progress.exercises.map((exercise: any) => (
                    <div
                      key={exercise.id}
                      className="flex items-center hover:bg-gray-200 p-2 cursor-pointer"
                      onClick={() => handleExerciseClick(exercise.id)}
                    >
                      <input type="checkbox" className="mr-2" />
                      <h1 className="text-sm text-gray-400">
                        {exercise.exerciseName}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {hidden && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-0 bg-gray-800 p-2 rounded-l">
          <button
            onClick={() => setHidden(false)}
            className="flex items-center"
          >
            <FaArrowLeft className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Learning;
