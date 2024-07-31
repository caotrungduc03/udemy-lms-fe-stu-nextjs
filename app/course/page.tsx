"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosPhonePortrait } from "react-icons/io";
import { LiaStopwatchSolid } from "react-icons/lia";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import CourseSwiper from "../../components/CourseSwiper";
import course from '../../public/excercise2.jpg';

import { useGetCourseDataQuery } from '../../lib/features/course/courseApi';
import instructor from '../../public/fakeImage/instructor2.jpg';
const Course: React.FC = () => {
    const handleData2 = () => {
        if (isLoading) {
        console.log('...Loading')
        } else if (isSuccess) {
        console.log('...Success', data)
        } else if (isError) {
        console.log('...Error', error)
        }
    };


    const {
        data: data,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetCourseDataQuery('1')

    const courses = [
        {
          id: 1,
          title: "The Complete Python Bootcamp From Zero to Hero in Python",
          author: "Author",
          rating: 4.6,
          price: "299,000 VND",
          imageSrc: "/excercise.jpg", // Replace with actual image path
        },
        {
          id: 2,
          title: "The Completed Python Bootcamp From Zero to Hero in Python",
          author: "Author",
          rating: 4.6,
          price: "299,000 VND",
          imageSrc: "/excercise2.jpg", // Replace with actual image path
        },
        {
          id: 2,
          title: "The Completed Python Bootcamp From Zero to Hero in Python",
          author: "Author",
          rating: 4.6,
          price: "299,000 VND",
          imageSrc: "/excercise3.jpg", // Replace with actual image path
        },
        {
          id: 2,
          title: "The Completed Python Bootcamp From Zero to Hero in Python",
          author: "Author",
          rating: 4.6,
          price: "299,000 VND",
          imageSrc: "/excercise4.jpg", // Replace with actual image path
        },
        {
          id: 2,
          title: "The Completed Python Bootcamp From Zero to Hero in Python",
          author: "Author",
          rating: 4.6,
          price: "299,000 VND",
          imageSrc: "/excercise5.jpg", // Replace with actual image path
        },
        {
          id: 2,
          title: "The Completed Python Bootcamp From Zero to Hero in Python",
          author: "Author",
          rating: 4.6,
          price: "299,000 VND",
          imageSrc: "/excercise6.jpg", // Replace with actual image path
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

    return (
        <>
            <div className='flex justify-center bg-primary'>
                <div className='w-full max-w-screen-xl grid grid-cols-12 gap-4 p-5'>
                    <div className='col-span-1'></div>
                    <div className='col-span-10 flex justify-between'>
                        <div className='max-w-[550px]'>
                            <h1 className='text-white mb-2 text-4xl font-bold'>Programming for Beginners: (Python, HTML, CSS, JavaScript)</h1>
                            <span className='text-white mb-2'>From Zero to Coder: A Practical Guide to Programming for Beginners</span>
                            <span className='text-white'>Created by </span>
                            <span className='underline font-bold text-purple-200'>ABC</span>
                        </div>
                        <div className='min-w-[350px]' id='course-image'>
                            <Image src={course} alt="img" className='w-[350px]'/>
                        </div>
                    </div>
                    <div className='col-span-1'></div>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='max-w-[650px]'>
                    <div className='border border-gray-200 my-10 w-[650px]'>
                        <div className='p-5'>
                            <h1 className='text-2xl font-bold mb-2'>What you'll learn</h1>
                            <ul className='list-disc text-gray-500 list-inside text-sm grid grid-cols-2 gap-x-5'>
                                <li>Understand the foundational concepts of web development</li>
                                <li>Create well-structured and semantically meaningful web pages using HTML</li>
                                <li>Apply CSS styling techniques to design visually appealing websites.</li>
                                <li>Utilize JavaScript to add interactivity and dynamic functionality to web pages</li>
                                <li>Grasp fundamental programming concepts such as variables, data types, and control structures in Python.</li>
                                <li>Build desktop applications using Python</li>
                                <li>Build web applications with HTML, CSS, JavaScript</li>
                                <li>Learn the principles of object-oriented programming with Python</li>
                                <li>Learn about Python packages and modules</li>
                                <li>Learn how to interact with external files using Python</li>
                                <li>Learn to debug and handle errors in Python programming</li>
                                <li>Learn GUI Programming with Python</li>
                                <li>Learn web development and build web applications</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold mb-2'>Description</h1>
                        <p className={`transition-all text-sm text-gray-500 duration-300 ${isExpanded ? 'max-h-full' : 'max-h-24 overflow-hidden'}`}>
                            "Programming for Beginners: Building the Foundations" offers a comprehensive introduction to the world of web development and Python programming, catering to individuals with little to no prior experience in coding. Whether you're aspiring to become a web developer, data analyst, or simply looking to gain valuable technical skills, this course equips you with the fundamental knowledge and practical experience needed to kickstart your journey in the dynamic field of programming.
                            <br />
                            <br />
                            Throughout the course, you will delve into the core technologies that power the modern web, including HTML, CSS, JavaScript, and Python. The journey begins with an exploration of HTML, the backbone of web development, where you'll learn to create structured and semantically meaningful web pages. From there, you'll progress to CSS, mastering the art of styling and layout to transform your HTML documents into visually appealing websites.
                            <br />
                            <br />
                            As your understanding of front-end development solidifies, you'll venture into the realm of JavaScript, the language of interactivity and dynamism on the web. Through hands-on exercises and projects, you'll discover how to manipulate the Document Object Model (DOM), respond to user interactions, and breathe life into your web pages with dynamic content and functionality.
                            <br />
                            <br />
                            In parallel, the course introduces you to the versatile programming language Python, known for its simplicity and readability. You'll embark on a journey of logical thinking and problem-solving as you grasp Python's syntax, data types, control structures, and functions. With Python as your tool, you'll tackle coding challenges and explore real-world applications, from automating tasks to analyzing data and beyond.
                            <br />
                            <br />
                            Building on your newfound Python skills, the course seamlessly integrates backend development into your repertoire. You'll learn to harness the power of Flask, a lightweight web framework, to create dynamic web applications with Python serving as the backend logic. By mastering concepts such as routing, templating, and handling requests, you'll gain the confidence to build and deploy your own web applications from scratch.
                            <br />
                            <br />
                            Throughout the course, emphasis is placed on hands-on learning and project-based assessments. You'll apply your skills to practical projects, including building a personal portfolio website that showcases your abilities and creativity. With guidance from experienced instructors and a supportive learning community, you'll receive personalized feedback and guidance to ensure your success every step of the way.
                            <br />
                            <br />
                            By the end of "Programming for Beginners: Building the Foundations," you'll emerge with a solid understanding of web development principles, proficiency in HTML, CSS, JavaScript, and Python, and the confidence to pursue further learning and explore exciting opportunities in the ever-evolving world of technology. Join us on this transformative journey and unlock your potential as a programmer and web developer.
                        </p>
                        <button
                            className="text-purple-500 underline mt-2 font-bold text-sm hover:text-purple-900"
                            onClick={toggleExpansion}
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold mb-2 mt-10'>Instructor</h1>
                        <div className='flex gap-5'>
                            <div className="rounded-full mb-2 border border-gray-200 h-[100px] w-[100px]">
                                <Image src={instructor} alt="instructor" className='rounded-full aspect-square object-cover' width={100} height={100}/>
                            </div>
                            <div className='gap-2 text-sm text-gray-500'>
                                <h3 className='underline text-2xl font-bold text-purple-700'>Digital Learning Academy</h3>
                                <span className=''>Digital learning 24 /7</span>
                                <div className='flex'>
                                    <MdOutlinePlayCircleFilled />
                                    <span className='ml-2 text-sm'>24 Courses</span>
                                </div>
                            </div>
                        </div>
                        <p className='text-sm text-gray-500'>
                        Digital learning academy  produces bespoke elearning which helps you to effectively gain useful and marketable skills and knowledge .
                        <br/>

                        We work closely with you to map out exactly what you want to bring about and discover what you want to learn and achieve. 
                        <br/>
                        We can help you learn something completely new? Working together, we can help you acquire some useful digital skills online.
                        <br/>
                        Our instructors are industry experts and have years of experience to deliver the 
                        training and skills you need.
                        </p>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold mb-2 mt-10'> More courses</h1>
                        <CourseSwiper courses={courses} slidesPerView={3}/>
                    </div>
                </div>
                <div className='bg-white m-10 max-w-[350px]'>
                    <div className='sticky top-5 border border-gray-200 p-5'>
                        {showStickyImage && (
                            <div className='mb-4'>
                                <Image src={course} alt="Course image" className='w-full'/>
                            </div>
                        )}
                        <h1 className='font-bold text-3xl'>₫1,099,000</h1>
                        <div className='flex py-2'>
                            <button className='font-bold bg-purple-900 text-white py-2 px-10 mr-2' onClick={handleData2}>
                                Add to cart
                            </button>
                            <button className='font-bold bg-white border border-black p-2'>Buy now</button>
                        </div>
                        <div>
                            <h1 className='font-bold'>This course includes:</h1>
                            <div className='flex gap-4'>
                                <LiaStopwatchSolid />
                                <span className='text-sm'> 21 hours on-demand video</span>
                            </div>
                            <div className='flex gap-4'>
                                <IoIosPhonePortrait />
                                <span className='text-sm'> Access on mobile and TV</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Course;
