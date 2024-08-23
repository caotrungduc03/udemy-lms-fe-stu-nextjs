'use client';
import React, { useEffect, useState } from 'react';
import { IoIosPhonePortrait } from 'react-icons/io';
import { LiaStopwatchSolid } from 'react-icons/lia';
import { MdOutlinePlayCircleFilled } from 'react-icons/md';
import CourseSwiper from '../../components/CourseSwiper';

import { useSearchParams } from 'next/navigation';
import { useGetCourseByIdDataQuery } from '../../lib/features/course/courseApi';
import useAuth from '../hook/auth';
const Course: React.FC = () => {
  useAuth();
  const searchParam = useSearchParams();
  const id = searchParam.get('id');
  const { data, isLoading } = useGetCourseByIdDataQuery({ id: id });
  console.log('aaaaaaaa', data);
  const handleBuy = () => {};
  // const handleData2 = () => {
  //   if (isLoading) {
  //     console.log('...Loading');
  //   } else if (isSuccess) {
  //     console.log('...Success', data);
  //   } else if (isError) {
  //     console.log('...Error', error);
  //   }
  // };

  // const {
  //   data: data,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetCourseDataQuery('1');

  const courses = [
    {
      id: 1,
      title: 'The Complete Python Bootcamp From Zero to Hero in Python',
      author: 'Author',
      rating: 4.6,
      price: '299,000 VND',
      imageSrc: '/excercise.jpg', // Replace with actual image path
    },
    {
      id: 2,
      title: 'The Completed Python Bootcamp From Zero to Hero in Python',
      author: 'Author',
      rating: 4.6,
      price: '299,000 VND',
      imageSrc: '/excercise2.jpg', // Replace with actual image path
    },
    {
      id: 2,
      title: 'The Completed Python Bootcamp From Zero to Hero in Python',
      author: 'Author',
      rating: 4.6,
      price: '299,000 VND',
      imageSrc: '/excercise3.jpg', // Replace with actual image path
    },
    {
      id: 2,
      title: 'The Completed Python Bootcamp From Zero to Hero in Python',
      author: 'Author',
      rating: 4.6,
      price: '299,000 VND',
      imageSrc: '/excercise4.jpg', // Replace with actual image path
    },
    {
      id: 2,
      title: 'The Completed Python Bootcamp From Zero to Hero in Python',
      author: 'Author',
      rating: 4.6,
      price: '299,000 VND',
      imageSrc: '/excercise5.jpg', // Replace with actual image path
    },
    {
      id: 2,
      title: 'The Completed Python Bootcamp From Zero to Hero in Python',
      author: 'Author',
      rating: 4.6,
      price: '299,000 VND',
      imageSrc: '/excercise6.jpg', // Replace with actual image path
    },

    // Repeat for other courses
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStickyImage, setShowStickyImage] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleScroll = () => {
      const courseImage = document.getElementById('course-image');
      if (courseImage) {
        const bounding = courseImage.getBoundingClientRect();
        const courseImageBottom = bounding.top + bounding.height;
        if (courseImageBottom <= 0) {
          setShowStickyImage(true);
        } else {
          setShowStickyImage(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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
    <>
      <div className="flex justify-center bg-primary">
        <div className="w-full max-w-screen-xl grid grid-cols-12 gap-4 p-5">
          <div className="col-span-1"></div>
          <div className="col-span-10 flex justify-between">
            <div className="max-w-[550px]">
              <h1 className="text-white mb-2 text-4xl font-bold">
                {data.data.courseName}
              </h1>
              <span className="text-white mb-2">
                From Zero to Coder: A Practical Guide to Programming for
                Beginners
              </span>
              <span className="text-white">Created by </span>
              <span className="underline font-bold text-purple-200">
                {data.data.author.fullName}
              </span>
            </div>
            <div className="min-w-[350px]" id="course-image">
              <img
                src={data.data.coverImage}
                alt="img"
                className="w-[300px] h-[150px]"
              />
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[650px]">
          <div className="border border-gray-200 my-10 w-[650px]">
            <div className="p-5">
              <h1 className="text-2xl font-bold mb-2">What you'll learn</h1>
              <ul className="list-disc text-gray-500 list-inside text-sm grid grid-cols-2 gap-x-5">
                <li>Understand the foundational concepts of web development</li>
                <li>
                  Create well-structured and semantically meaningful web pages
                  using HTML
                </li>
                <li>
                  Apply CSS styling techniques to design visually appealing
                  websites.
                </li>
                <li>
                  Utilize JavaScript to add interactivity and dynamic
                  functionality to web pages
                </li>
                <li>
                  Grasp fundamental programming concepts such as variables, data
                  types, and control structures in Python.
                </li>
                <li>Build desktop applications using Python</li>
                <li>Build web applications with HTML, CSS, JavaScript</li>
                <li>
                  Learn the principles of object-oriented programming with
                  Python
                </li>
                <li>Learn about Python packages and modules</li>
                <li>Learn how to interact with external files using Python</li>
                <li>Learn to debug and handle errors in Python programming</li>
                <li>Learn GUI Programming with Python</li>
                <li>Learn web development and build web applications</li>
              </ul>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Description</h1>
            <p
              className={`transition-all text-sm text-gray-500 duration-300 ${
                isExpanded ? 'max-h-full' : 'max-h-24 overflow-hidden'
              }`}
            >
              {data.data.description}
            </p>
            <button
              className="text-purple-500 underline mt-2 font-bold text-sm hover:text-purple-900"
              onClick={toggleExpansion}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2 mt-10">Instructor</h1>
            <div className="flex gap-5">
              <div className="rounded-full mb-2 border border-gray-200 h-[100px] w-[100px]">
                <img
                  src={data.data.author.avatar}
                  alt="instructor"
                  className="rounded-full aspect-square object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <div className="gap-2 text-sm text-gray-500">
                <h3 className="underline text-2xl font-bold text-purple-700">
                  {data.data.author.fullName}
                </h3>
                <span className="">Digital learning 24 /7</span>
                <div className="flex">
                  <MdOutlinePlayCircleFilled />
                  <span className="ml-2 text-sm">24 Courses</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Digital learning academy produces bespoke elearning which helps
              you to effectively gain useful and marketable skills and knowledge
              .
              <br />
              We work closely with you to map out exactly what you want to bring
              about and discover what you want to learn and achieve.
              <br />
              We can help you learn something completely new? Working together,
              we can help you acquire some useful digital skills online.
              <br />
              Our instructors are industry experts and have years of experience
              to deliver the training and skills you need.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2 mt-10"> More courses</h1>
            <CourseSwiper courses={courses} slidesPerView={3} />
          </div>
        </div>
        <div className="bg-white m-10 max-w-[350px]">
          <div className="sticky top-5 border border-gray-200 p-5">
            {showStickyImage && (
              <div className="mb-4">
                <img
                  src={data.data.coverImage}
                  alt="Course image"
                  className="w-[300px] h-[150px]"
                />
              </div>
            )}
            <h1 className="font-bold text-3xl">${data.data.price}</h1>
            <div className="flex py-2">
              <button
                className="font-bold bg-purple-900 text-white py-2 px-10 mr-2 transition duration-500 ease-in-out transform hover:scale-105"
                // onClick={handleData2}
              >
                Add to cart
              </button>
              <button
                onClick={handleBuy}
                className="font-bold bg-white border border-black p-2 transition duration-500 ease-in-out transform hover:scale-105"
              >
                Buy now
              </button>
            </div>
            <div>
              <h1 className="font-bold">This course includes:</h1>
              <div className="flex gap-4">
                <LiaStopwatchSolid />
                <span className="text-sm"> 21 hours on-demand video</span>
              </div>
              <div className="flex gap-4">
                <IoIosPhonePortrait />
                <span className="text-sm"> Access on mobile and TV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
