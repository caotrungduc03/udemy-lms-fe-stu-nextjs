'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import ProtectedPage from '../../hocs/ProtectedPage';
import { useGetMyCourseQuery } from '../../lib/features/progress/progressApi';

const MyCourse: React.FC = () => {
  const { accessToken } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetMyCourseQuery({ accessToken });
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/course/${id}/learn`);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-10 w-5/6 flex flex-col ">
      {data.data &&
        data.data.items.map((c: any) => (
          <div
            key={c.course.id}
            className="flex justify-center items-center py-2 transition duration-500 ease-in-out transform hover:scale-105"
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="600"
          >
            <img
              src={c.course.coverImage}
              alt={c.course.courseName}
              className="border border-gray-200 w-[300px] h-[150px] mr-5 object-cover"
            />
            <div className="space-y-2 flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-700 text-lg font-bold">
                  {c.course.courseName}
                </h2>
                <h2 className="font-bold text-sm pl-10">${c.course.price}</h2>
              </div>
              <p className="text-xs text-gray-500">
                Author: {c.course.author.fullName}
              </p>
              <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full">
                <div
                  className="bg-blue-600 p-0.5 text-center text-white text-xs rounded-full font-medium leading-none text-primary-100"
                  style={{ width: `${c.percentage}%` }}
                >
                  {c.percentage}%
                </div>
              </div>
              <button
                onClick={() => handleClick(c.course.id)}
                className="transition duration-500 ease-in-out transform hover:scale-105 font-bold bg-purple-900 text-white py-2 px-5 mr-2 hover:bg-black hover:opacity-70 "
              >
                Learn
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProtectedPage(MyCourse);
