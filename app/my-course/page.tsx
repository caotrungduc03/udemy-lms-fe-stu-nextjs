'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useGetMyCourseDataQuery } from '../../lib/features/course/courseApi';
import { getToken } from '../../lib/tokens';
import useAuth from '../hook/auth';

const MyCourse: React.FC = () => {
  useAuth();
  const { data, isLoading, isSuccess } = useGetMyCourseDataQuery({
    accessToken: getToken(),
  });
  // const { courses } = useSelector((state: any) => state.course);
  console.log('course', data);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);
  const router = useRouter();
  // const courses = [
  //   {
  //     id: 1,
  //     title: 'The Complete Python Bootcamp From Zero to Hero in Python',
  //     author: 'Author',
  //     rating: 4.6,
  //     price: '299,000 VND',
  //     imageSrc: '/excercise.jpg', // Replace with actual image path
  //   },
  //   {
  //     id: 2,
  //     title: 'The Completed Python Bootcamp From Zero to Hero in Python',
  //     author: 'Author',
  //     rating: 4.6,
  //     price: '299,000 VND',
  //     imageSrc: '/excercise2.jpg', // Replace with actual image path
  //   },
  //   {
  //     id: 2,
  //     title: 'The Completed Python Bootcamp From Zero to Hero in Python',
  //     author: 'Author',
  //     rating: 4.6,
  //     price: '299,000 VND',
  //     imageSrc: '/excercise3.jpg', // Replace with actual image path
  //   },
  //   {
  //     id: 2,
  //     title: 'The Completed Python Bootcamp From Zero to Hero in Python',
  //     author: 'Author',
  //     rating: 4.6,
  //     price: '299,000 VND',
  //     imageSrc: '/excercise4.jpg', // Replace with actual image path
  //   },
  //   {
  //     id: 2,
  //     title: 'The Completed Python Bootcamp From Zero to Hero in Python',
  //     author: 'Author',
  //     rating: 4.6,
  //     price: '299,000 VND',
  //     imageSrc: '/excercise5.jpg', // Replace with actual image path
  //   },
  //   {
  //     id: 2,
  //     title: 'The Completed Python Bootcamp From Zero to Hero in Python',
  //     author: 'Author',
  //     rating: 4.6,
  //     price: '299,000 VND',
  //     imageSrc: '/excercise6.jpg', // Replace with actual image path
  //   },

  //   // Repeat for other courses
  // ];

  const handleClick = (id: number) => {
    const searchURL = `/learning?courseId=${encodeURIComponent(id)}`;
    router.push(searchURL);
  };
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
  return (
    <div className="p-10 flex flex-col">
      {data.data.items.map((c: any) => (
        <div
          key={c.course.id}
          className="flex py-2 transition duration-500 ease-in-out transform hover:scale-105"
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
              <h2 className="font-bold text-sm pl-10">
                {c.course.price},000vnd
              </h2>
            </div>
            <p className="text-xs text-gray-500">Author: </p>
            <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full">
              <div className="bg-blue-600 w-1/4 p-0.5 text-center text-white text-xs rounded-full font-medium leading-none text-primary-100">
                25%
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

export default MyCourse;
