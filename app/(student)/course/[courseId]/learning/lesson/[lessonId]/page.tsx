'use client';

import Loading from '@/components/Loading';
import { useGetLessonByIdQuery } from '@/lib/features/lesson/lessonApi';
import { RootState } from '@/lib/store';
import { useParams } from 'next/navigation';
import { IoTime } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';
import { useSelector } from 'react-redux';

type Params = {
  courseId: string;
  lessonId: string;
};

const LessonPage: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { progressId } = useSelector((state: RootState) => state.progress);
  const { lessonId }: Params = useParams();

  const { data, isFetching } = useGetLessonByIdQuery({
    id: lessonId,
    accessToken,
  });

  if (!progressId || isFetching) {
    return <Loading />;
  }

  return (
    <div className="w-full">
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
        <div className="w-full">
          <p>{data.data.description}</p>
        </div>
      </div>
      <div className="space-x-10 text-sm px-10 pb-10">
        <h1 className="font-bold">Content</h1>
        <div className="w-full">
          <div
            className="quill-content"
            dangerouslySetInnerHTML={{ __html: data.data.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
