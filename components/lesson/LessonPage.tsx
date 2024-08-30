'use client';
import React from 'react';
import { IoTime } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useGetLessonByIdQuery } from '../../lib/features/lesson/lessonApi';
import Loading from '../Loading';

const LessonPage: React.FC = () => {
  const { accessToken } = useSelector((state: any) => state.auth);
  const { lessonId } = useSelector((state: any) => state.lesson);

  const { data, isFetching } = useGetLessonByIdQuery(
    {
      id: lessonId,
      accessToken,
    },
    {
      skip: !lessonId,
    },
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="grow">
      <div className="border-b border-gray-200 p-10">
        <h1 className="text-xl font-bold cursor-pointer">
          {data.data.lessonName}
        </h1>
        <div className="flex items-center space-x-2 text-sm pt-5">
          <IoTime />
          <span>{data.data.duration}'</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <TbWorld />
          <span>English</span>
        </div>
      </div>
      <div className="flex space-x-10 text-sm p-10">
        <h1>Description</h1>
        <div className="w-3/4">
          <p>{data.data.description}</p>
        </div>
      </div>
      <div className="space-x-10 text-sm px-10 pb-10">
        <h1 className="font-bold">Content</h1>
        <div className="w-3/4">
          <p>{data.data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
