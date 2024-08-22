'use client';
import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineArrowDropDown } from 'react-icons/md';

interface SidebarContentProps {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
  progress: any;
  handleLessonClick: (lessonId: string) => void;
  handleExerciseClick: (exerciseId: string) => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  hidden,
  setHidden,
  progress,
  handleLessonClick,
  handleExerciseClick,
}) => {
  const [showLessons, setShowLessons] = useState(false);
  const [showExercises, setShowExercises] = useState(false);

  return (
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
                {progress?.lessons?.map((lesson: any) => (
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
  );
};

export default SidebarContent;
