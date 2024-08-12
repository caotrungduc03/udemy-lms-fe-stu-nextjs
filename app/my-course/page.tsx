'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const MyCourse: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);
  const router = useRouter();
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

  const handleClick = (id: number, idLesson: number) => {
    const searchURL = `/learning?id=${encodeURIComponent(
      id,
    )}&lesson=${encodeURIComponent(idLesson)}`;
    router.push(searchURL);
  };

  return (
    <div className="p-10">
      {courses.map((c) => (
        <div
          key={c.id}
          className="flex justify-center py-2 transition duration-500 ease-in-out transform hover:scale-105"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="600"
        >
          <img
            src={c.imageSrc}
            alt={c.title}
            className="border border-gray-200 w-[300px] h-[150px] mr-5 object-cover"
          />
          <div className="space-y-2">
            <div className="flex justify-center items-center">
              <h2 className="text-gray-700 text-lg font-bold">{c.title}</h2>
              <h2 className="font-bold text-sm pl-10">{c.price},000vnd</h2>
            </div>
            <p className="text-xs text-gray-500">Author: {c.author}</p>
            <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full">
              <div className="bg-blue-600 w-1/4 p-0.5 text-center text-white text-xs rounded-full font-medium leading-none text-primary-100">
                25%
              </div>
            </div>
            <button
              onClick={() => handleClick(c.id, 2)}
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
