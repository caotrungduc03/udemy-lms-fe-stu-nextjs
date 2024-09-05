'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  MdArrowBack,
  MdCheck,
  MdOutlineClose,
  MdOutlineExpandLess,
  MdOutlineExpandMore,
  MdOutlineOndemandVideo,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetCourseByIdQuery } from '../lib/features/course/courseApi';
import { useGetProgressByCourseIdQuery } from '../lib/features/progress/progressApi';
import { RootState } from '../lib/store';
import Loading from './Loading';

type Params = {
  courseId: string;
};

const SidebarContent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLessons, setShowLessons] = useState(true);
  const [showExercises, setShowExercises] = useState(true);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { general, lessons, exercises } = useSelector(
    (state: RootState) => state.course,
  );
  const { progressId, lessonIds, exerciseIds } = useSelector(
    (state: RootState) => state.progress,
  );
  const params: Params = useParams();
  const { isDoingSubmission } = useSelector(
    (state: RootState) => state.submission,
  );
  const { isLoading: isLoadingCourse } = useGetCourseByIdQuery(
    {
      id: params.courseId,
    },
    {
      skip: !!general,
    },
  );
  const { isLoading: isLoadingProgress } = useGetProgressByCourseIdQuery(
    {
      id: params.courseId,
      accessToken,
    },
    {
      skip: !!progressId,
    },
  );
  const isLoading = isLoadingCourse || isLoadingProgress;

  const handleLessonClick = (lessonId: string) => {
    if (isDoingSubmission) {
      return toast.warn('Please complete the exercise first');
    }
  };

  const handleExerciseClick = (exerciseId: string) => {
    if (isDoingSubmission) {
      return toast.warn('Please complete the exercise first');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`border border-gray-200 bg-white transition-all duration-300 ${
        isOpen ? 'w-[416px]' : 'w-0'
      }`}
    >
      {/* Content */}
      {isOpen && (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center border-b border-[#d1d7dc] p-2 pl-4">
            <h2 className="heading-md">Course Content</h2>
            <button
              className="btn btn-large"
              onClick={() => setIsOpen(!isOpen)}
              title="Close Sidebar"
            >
              <MdOutlineClose className="icon icon-small" />
            </button>
          </div>

          {/* Lessons */}
          <div className="flex flex-col border-b border-[#d1d7dc]">
            <div
              className="flex justify-between items-start p-4 bg-[#f7f9fa] cursor-pointer"
              onClick={() => setShowLessons(!showLessons)}
            >
              <div className="heading-md">
                <h2 className="mb-2">The List Of Lessons</h2>
                <span className="ud-text-xs">2 / 4 | 9min</span>
              </div>
              {showLessons ? (
                <MdOutlineExpandMore className="icon icon-small" />
              ) : (
                <MdOutlineExpandLess className="icon icon-small" />
              )}
            </div>
            {showLessons && (
              <div>
                {lessons?.map((lesson: any) => (
                  <div
                    key={lesson.id}
                    className="flex justify-between items-start px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleLessonClick(lesson.id)}
                  >
                    <div className="mr-4">
                      <label
                        htmlFor={'checkbox--' + lesson.id}
                        className="flex"
                      >
                        <input
                          id={'checkbox--' + lesson.id}
                          type="checkbox"
                          className="real-toggle-input"
                          defaultChecked={lessonIds.includes(lesson.id)}
                        />
                        <MdCheck className="icon icon-xsmall fake-toggle-input fake-toggle-checkbox top-1 cursor-pointer" />
                      </label>
                    </div>
                    <div className="flex flex-col w-full">
                      <h1 className="mb-1 text-sm">{lesson.lessonName}</h1>
                      <div className="flex justify-start items-center text-xs">
                        <MdOutlineOndemandVideo className="icon icon-xsmall" />
                        <span className="ml-1">3min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exercises */}
          <div className="flex flex-col border-b border-[#d1d7dc]">
            <div
              className="flex justify-between items-start p-4 bg-[#f7f9fa] cursor-pointer"
              onClick={() => setShowExercises(!showExercises)}
            >
              <div className="heading-md">
                <h2 className="mb-2">The List Of Exercises</h2>
                <span className="ud-text-xs">2 / 4 | 9min</span>
              </div>
              {showExercises ? (
                <MdOutlineExpandMore className="icon icon-small" />
              ) : (
                <MdOutlineExpandLess className="icon icon-small" />
              )}
            </div>
            {showExercises && (
              <div>
                {exercises?.map((exercise: any) => (
                  <div
                    key={exercise.id}
                    className="flex justify-between items-start px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleExerciseClick(exercise.id)}
                  >
                    <div className="mr-4">
                      <label
                        htmlFor={'checkbox--' + exercise.id}
                        className="flex"
                      >
                        <input
                          id={'checkbox--' + exercise.id}
                          type="checkbox"
                          className="real-toggle-input"
                          defaultChecked={exerciseIds.includes(exercise.id)}
                        />
                        <MdCheck className="icon icon-xsmall fake-toggle-input fake-toggle-checkbox relative top-1 cursor-pointer" />
                      </label>
                    </div>
                    <div className="flex flex-col w-full">
                      <h1 className="mb-1 text-sm">{exercise.exerciseName}</h1>
                      <div className="flex justify-start items-center text-xs">
                        <MdOutlineOndemandVideo className="icon icon-xsmall" />
                        <span className="ml-1">3min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Show Back Button */}
      {!isOpen && (
        <div
          className="absolute right-0 top-1/3 z-10 overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <button className="btn btn-large btn-primary heading-md flex justify-between items-center border border-r-0 border-solid border-[#6a6f73] translate-x-[132px] hover:translate-x-0 transition-all duration-300">
            <MdArrowBack className="icon icon-medium" />
            <h2 className="ml-1">Course Content</h2>
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
