// components/CourseSwiper.tsx
'use-client';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Course {
  id: number;
  title: string;
  author: string;
  rating: number;
  price: string;
  imageSrc: string;
}

interface CourseSwiperProps {
  courses: Course[];
  slidesPerView: number;
}

const CourseSwiper: React.FC<CourseSwiperProps> = ({
  courses,
  slidesPerView,
}) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={slidesPerView} // Use the prop here
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={750}
      modules={[FreeMode, Pagination, Autoplay]}
    >
      {courses.map((course) => (
        <SwiperSlide key={course.id} className="mb-10">
          <div>
            <Image
              src={course.imageSrc}
              alt={course.title}
              className="border border-gray-200 mt-2"
              width={300} // Specify width
              height={200} // Specify height
            />
            <p className="font-bold text-sm">{course.title}</p>
            <p className="text-gray-600 text-xs">{course.author}</p>
            <div className="flex">
              <span>{course.rating}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <span className="font-bold text-md">{course.price}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseSwiper;
