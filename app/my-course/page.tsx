'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMyCourseDataQuery } from '../../lib/features/course/courseApi';
import { getToken } from '../../lib/tokens';

const MyCourse: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetMyCourseDataQuery({
    accessToken: getToken(),
  });
  const { courses } = useSelector((state: any) => state.course);
  console.log('course', courses);
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

  return (
    <div className="p-10 flex flex-col">
      {courses.map((c: any) => (
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
