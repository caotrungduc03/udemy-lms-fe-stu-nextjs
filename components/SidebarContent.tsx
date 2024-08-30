'use client';

import { useState } from 'react';
import {
  MdArrowBack,
  MdArrowDropDown,
  MdArrowDropUp,
  MdOutlineClose,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  setExerciseId,
  setLessonId,
} from '../lib/features/learning/learningSlice';
import Loading from './Loading';

const SidebarContent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLessons, setShowLessons] = useState(true);
  const [showExercises, setShowExercises] = useState(false);
  const { lessons, exercises } = useSelector((state: any) => state.course);
  const { lessonIds, exerciseIds } = useSelector(
    (state: any) => state.progress,
  );
  const dispatch = useDispatch();
  const handleLessonClick = (lessonId: string) => {
    dispatch(setLessonId(lessonId));
  };

  const handleExerciseClick = (exerciseId: string) => {
    dispatch(setExerciseId(exerciseId));
  };

  if (!lessonIds || !exerciseIds) {
    return <Loading />;
  }

  return (
    <div
      className={`border border-gray-200 top-0 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'w-1/4' : 'w-0'
      }`}
    >
      {isOpen && (
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-gray-200">
            <h2 className="font-bold">Course Content</h2>
            <button onClick={() => setIsOpen(!isOpen)}>
              <MdOutlineClose />
            </button>
          </div>
          <div className="flex flex-col">
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200"
              onClick={() => setShowLessons(!showLessons)}
            >
              <h2 className="text-black px-2 py-2 rounded-md">
                The List Of Lessons
              </h2>
              {showLessons ? (
                <MdArrowDropUp className="text-2xl" />
              ) : (
                <MdArrowDropDown className="text-2xl" />
              )}
            </div>
            {showLessons && (
              <div className="mt-2">
                {lessons?.map((lesson: any) => (
                  <div
                    key={lesson.id}
                    className="flex items-center hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={() => handleLessonClick(lesson.id)}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      defaultChecked={lessonIds.includes(lesson.id)}
                    />
                    <h1 className="text-sm text-gray-400">
                      {lesson.lessonName}
                    </h1>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200"
              onClick={() => setShowExercises(!showExercises)}
            >
              <h2 className="text-black px-2 py-2 rounded-md">
                The List Of Exercises
              </h2>
              {showExercises ? (
                <MdArrowDropUp className="text-2xl" />
              ) : (
                <MdArrowDropDown className="text-2xl" />
              )}
            </div>
            {showExercises && (
              <div className="mt-2">
                {exercises?.map((exercise: any) => (
                  <div
                    key={exercise.id}
                    className="flex items-center hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={() => handleExerciseClick(exercise.id)}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      style={{ backgroundColor: 'green', color: 'white' }}
                      defaultChecked={exerciseIds?.includes(exercise.id)}
                    />
                    <h1 className="text-sm text-gray-400">
                      {exercise.exerciseName}
                    </h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!isOpen && (
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-0 bg-gray-800 p-2 rounded-l cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <button className="flex items-center">
            <MdArrowBack className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
