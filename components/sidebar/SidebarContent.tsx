'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  MdArrowBack,
  MdOutlineClose,
  MdOutlineExpandLess,
  MdOutlineExpandMore,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useGetCourseByIdQuery } from '../../lib/features/course/courseApi';
import { useGetProgressByCourseIdQuery } from '../../lib/features/progress/progressApi';
import { RootState } from '../../lib/store';
import SidebarContentItem from './SidebarContentItem';

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
  const { isError: isErrorCourse } = useGetCourseByIdQuery(
    {
      id: params.courseId,
    },
    {
      skip: !!general,
    },
  );
  const { isError: isErrorProgress } = useGetProgressByCourseIdQuery(
    {
      id: params.courseId,
      accessToken,
    },
    {
      skip: !!progressId,
    },
  );

  return (
    <div
      className={`border border-gray-200 bg-white transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-[var(--sidebar-width)]' : 'w-0'
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
                <span className="ud-text-xs">
                  {lessonIds.length} / {lessons.length}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  {lessons.reduce((prev, curr) => prev + curr.duration, 0)}
                  &nbsp;min
                </span>
              </div>
              {showLessons ? (
                <MdOutlineExpandMore className="icon icon-small" />
              ) : (
                <MdOutlineExpandLess className="icon icon-small" />
              )}
            </div>
            {showLessons &&
              lessons?.map((lesson: any, index: number) => (
                <SidebarContentItem
                  key={lesson.id}
                  index={index}
                  itemIds={lessonIds}
                  item={lesson}
                  type="lesson"
                />
              ))}
          </div>

          {/* Exercises */}
          <div className="flex flex-col border-b border-[#d1d7dc]">
            <div
              className="flex justify-between items-start p-4 bg-[#f7f9fa] cursor-pointer"
              onClick={() => setShowExercises(!showExercises)}
            >
              <div className="heading-md">
                <h2 className="mb-2">The List Of Exercises</h2>
                <span className="ud-text-xs">
                  {exerciseIds.length} / {exercises.length}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  {exercises.reduce((prev, curr) => prev + curr.duration, 0)}
                  &nbsp; min
                </span>
              </div>
              {showExercises ? (
                <MdOutlineExpandMore className="icon icon-small" />
              ) : (
                <MdOutlineExpandLess className="icon icon-small" />
              )}
            </div>
            {showExercises &&
              exercises?.map((exercise: any, index: number) => (
                <SidebarContentItem
                  key={exercise.id}
                  index={index}
                  itemIds={exerciseIds}
                  item={exercise}
                  type="exercise"
                />
              ))}
          </div>
        </div>
      )}

      {/* Show Back Button */}
      {!isOpen && (
        <div
          className="absolute right-0 top-1/3 z-10 overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <button className="btn btn-large btn-primary heading-md flex justify-between items-center border border-r-0 border-solid border-[#6a6f73] translate-x-[132px] transition-all duration-300 hover:translate-x-0">
            <MdArrowBack className="icon icon-medium" />
            <h2 className="ml-1">Course Content</h2>
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
