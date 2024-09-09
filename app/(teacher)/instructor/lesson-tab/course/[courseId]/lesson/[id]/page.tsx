'use client';
import Loading from '@/components/Loading';
import { useGetLessonByIdQuery } from '@/lib/features/lesson/lessonApi';
import { getToken } from '@/lib/tokens';
import classroom from '@/public/fakeImage/excercise2.jpg';
import headerBg from '@/public/fakeImage/header-bg.jpg';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const Lesson: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const { data, isLoading } = useGetLessonByIdQuery({
    id: id,
    accessToken: getToken(),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="bg-cover bg-center bg-gray-100 flex items-center opacity-80 mt-2"
        style={{
          backgroundImage: `url(${headerBg.src})`,
          height: '30%',
        }}
      >
        <Image src={classroom} alt="Classroom" className="pl-10" />
        <div className="text-white pl-5 text-2xl font-semibold">
          Lop hoc sat thu
        </div>
        {/* Updated the parent div to be a flex container */}
        <div className="flex justify-end flex-grow pr-10 space-x-5">
          <div className="text-white flex flex-col">
            <span className="pr-2 text-2xl">30</span>
            <span className="text-sm font-thin">lessons</span>
          </div>
          <div className="text-white flex flex-col">
            <span className="pr-2 text-2xl">10</span>
            <span className="text-sm font-thin">Exercises</span>
          </div>
          <div className="text-white flex flex-col">
            <span className="pr-2 text-2xl">20</span>
            <span className="text-sm font-thin">Lessons</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 w-4/5 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Lesson Details
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="pb-4">
                <h2 className="font-bold text-lg text-gray-700">Lesson Name</h2>
                <p className="text-gray-600 mt-2">{data?.data.lessonName}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-700">Duration</h2>
                <p className="text-gray-600 mt-2">
                  {data?.data.duration} minutes
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-700">Description</h2>
              <p className="text-gray-600 mt-2">{data?.data.description}</p>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-700">Content</h2>
            {/* <p className="text-gray-600 mt-2">{data?.data.content}</p> */}
            <div dangerouslySetInnerHTML={{ __html: data?.data.content }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson;
