// // pages/signup.tsx
'use client'; // Chỉ thị này cần được thêm vào đầu tệp
import Image from 'next/image';
import React, { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CourseSwiper from '../../components/CourseSwiper';
import logo1 from '../../public/cisco_logo.svg';
import logo2 from '../../public/citi_logo.svg';
import customer from '../../public/customer.png';
import logo3 from '../../public/ericsson_logo.svg';
import logo4 from '../../public/hewlett_packard_enterprise_logo.svg';
import instructor from '../../public/instructor.jpg';
import logoUB from '../../public/logo-ub.svg';
import pr from '../../public/PR.jpg';
import logo5 from '../../public/procter_gamble_logo.svg';
import quote from '../../public/quote.svg';
import logo6 from '../../public/samsung_logo.svg';
import topic1 from '../../public/topic1.jpg';
import topic2 from '../../public/topic2.jpg';
import topic3 from '../../public/topic3.jpg';
import topic4 from '../../public/topic4.jpg';
import topic5 from '../../public/topic5.jpg';
import topic6 from '../../public/topic6.jpg';
import topic7 from '../../public/topic7.jpg';
import topic8 from '../../public/topic8.jpg';
import logo7 from '../../public/vimeo_logo.svg';
import logo8 from '../../public/volkswagen_logo.svg';
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
    id: 3,
    title: 'The Completed Python Bootcamp From Zero to Hero in Python',
    author: 'Author',
    rating: 4.6,
    price: '299,000 VND',
    imageSrc: '/excercise3.jpg', // Replace with actual image path
  },
  {
    id: 4,
    title: 'The Completed Python Bootcamp From Zero to Hero in Python',
    author: 'Author',
    rating: 4.6,
    price: '299,000 VND',
    imageSrc: '/excercise4.jpg', // Replace with actual image path
  },
  {
    id: 5,
    title: 'The Completed Python Bootcamp From Zero to Hero in Python',
    author: 'Author',
    rating: 4.6,
    price: '299,000 VND',
    imageSrc: '/excercise5.jpg', // Replace with actual image path
  },
  {
    id: 6,
    title: 'The Completed Python Bootcamp From Zero to Hero in Python',
    author: 'Author',
    rating: 4.6,
    price: '299,000 VND',
    imageSrc: '/excercise6.jpg', // Replace with actual image path
  },

  // Repeat for other courses
];
const comments = [
  {
    comment:
      'I am proud to say that after a few months of taking this course...I passed my exam and am now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.',
    name: 'Will Smith',
    video: '[NEW] Ultimate AWS Certified Cloud Practitioner - 2022',
  },
  {
    comment:
      'I am proud to say that after a few months of taking this course...I passed my exam and am now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.',
    name: 'James Cameron',
    video: '[NEW] Ultimate AWS Certified Cloud Practitioner - 2022',
  },
  {
    comment:
      'I am proud to say that after a few months of taking this course...I passed my exam and am now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.',
    name: 'John Smith',
    video: '[NEW] Ultimate AWS Certified Cloud Practitioner - 2022',
  },
  {
    comment:
      'I am proud to say that after a few months of taking this course...I passed my exam and am now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.',
    name: 'Kelia Ronie',
    video: '[NEW] Ultimate AWS Certified Cloud Practitioner - 2022',
  },
];
const topic = [
  {
    image: topic1,
    title: 'topic1',
  },
  {
    image: topic2,
    title: 'topic2',
  },
  {
    image: topic3,
    title: 'topic3',
  },
  {
    image: topic4,
    title: 'topic4',
  },
  {
    image: topic5,
    title: 'topic5',
  },
  {
    image: topic6,
    title: 'topic6',
  },
  {
    image: topic7,
    title: 'topic7',
  },
  {
    image: topic8,
    title: 'topic8',
  },
];

const LandingPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Python');

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="relative w-full" style={{ height: 'auto' }}>
        <div
          className="mx-20 bg-cover bg-center bg-gray-100 flex"
          style={{
            backgroundImage: 'url(./clock-landingpage.jpg)',
            width: '90%',
            height: '90%',
          }}
        >
          <div className="z-10 items-left justify-center text-black ml-20 mt-20 mb-30 p-30">
            <div
              className="bg-white shadow-lg border border-gray-100 mb-20 pr-20"
              style={{ width: '70%' }}
            >
              <h1 className="text-4xl font-udemy-sans font-bold ml-5 mt-5">
                New to Udemy?
              </h1>
              <h1 className="text-4xl font-bold pt-5 ml-5">Lucky you</h1>
              <p className="text-md ml-5 pt-5 mb-10">
                Courses start at 299,000vnd. Get your new-student offer before
                it expires.
              </p>
            </div>
          </div>
          <div className="flex-grow"></div>
        </div>
      </div>

      <div className="mt-10 text-center bg-gray-100 content-around">
        <div className="mt-16 text-gray-500 mb-5">
          Trusted by over 15,000 companies and millions of learners around the
          world
        </div>
        <div className="mb-16 flex justify-around mx-20">
          <Image src={logo1} alt="logo1" />
          <Image src={logo2} alt="logo2" />
          <Image src={logo3} alt="logo3" />
          <Image src={logo4} alt="logo4" />
          <Image src={logo5} alt="logo5" />
          <Image src={logo6} alt="logo6" />
          <Image src={logo7} alt="logo7" />
          <Image src={logo8} alt="logo8" />
        </div>
      </div>

      <div className="px-20 pt-5">
        <h1 className="font-bold text-2xl mb-5">
          A broad selection of courses
        </h1>
        <h2 className="text-xl mb-5">
          Choose from over 220,000 online video courses with new additions
          published every month
        </h2>
        <div className="font-bold">
          {[
            'Python',
            'Microsoft Excel',
            'Web Development',
            'JavaScript',
            'Data Science',
            'Amazon',
            'Drawing',
          ].map((tab) => (
            <button
              key={tab}
              className={`hover:text-purple-900 hover:bg-gray-200 transition-colors duration-300 p-2 ${
                selectedTab === tab ? 'bg-gray-200' : ''
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-gray-200">
          <div className="grid grid-cols-5">
            <div className="text-xl font-bold m-5 col-span-5">
              Expand your career opportunities with Python
            </div>
            <p className="ml-5 text-sm pr-100 col-span-3">
              Take one of Udemys range of Python courses and learn how to code
              using this incredibly useful language. Its simple syntax and
              readability makes Python perfect for Flask, Django, data science,
              and machine learning. You’ll learn how to build everything from
              games to sites to apps. Choose from a range of courses that will
              appeal to...
            </p>
          </div>
          <button className="mt-2 text-xs font-bold ml-5 border border-black p-2 hover:bg-gray-200">
            Explore Python
          </button>
          <div className="flex space-x-4 mx-5 mb-10 ">
            <CourseSwiper courses={courses} slidesPerView={5} />
          </div>
        </div>
      </div>
      <div className="mt-10 bg-gray-100 content-around">
        <div className="ml-20 mr-20">
          <div className="mt-5 font-bold text-2xl mb-5">
            How learners like you are achieving their goals
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={750}
            modules={[FreeMode, Pagination, Autoplay]}
          >
            {comments.map((object, index) => (
              <SwiperSlide key={index} className="mb-10 bg-white">
                <div className="border border-gray-200 p-10">
                  <Image src={quote} alt="quote" width={20} className="mb-5" />
                  <span>{object.comment}</span>
                  <p className="border-b border-gray-200 font-bold text-sm py-5">
                    {object.name}
                  </p>
                  <div className="flex pt-5 ">
                    <FaPlayCircle size={40} color="purpil" />
                    <div className="ml-2 font-bold text-[#5022c3]">
                      {object.video}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mx-20 mt-10">
        <h1 className="font-bold text-2xl">Learners are viewing</h1>
        <CourseSwiper courses={courses} slidesPerView={5} />
      </div>
      <div className="mt-10 content-around">
        <div className="mx-20">
          <div className="mt-10 font-bold text-2xl mb-5">Top categories</div>
          <div className="grid grid-cols-4 gap-8">
            {topic.map((topic, index) => (
              <div className="overflow-hidden relative">
                <div className="bg-gray-200">
                  <Image
                    src={topic.image}
                    alt="topics"
                    className="z-10 transition duration-500 ease-in-out transform hover:scale-105 mb-2"
                  />
                </div>
                <span className="font-bold tetx-sm">{topic.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 bg-gray-100 content-around">
        <div className="ml-20 mb-10">
          <div className="mt-5 font-bold text-2xl mb-5">
            Featured topics by category
          </div>
          <div className="grid grid-cols-4 gap-y-5">
            <h1 className="font-bold">Development</h1>
            <h1 className="font-bold">Business</h1>
            <h1 className="font-bold">IT and Software</h1>
            <h1 className="font-bold">Design</h1>
            <span className="text-purple-900 font-bold text-xs underline">
              Python
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Financial Analysis
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Amazon AWS
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Photoshop
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Web Development
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              SQL
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Ethical Hacking
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Graphic Design
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Machine Learning
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              PMP
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Cyber Security
            </span>
            <span className="text-purple-900 font-bold text-xs underline">
              Drawing
            </span>
          </div>
          <button className="mt-5 text-xs font-bold border border-black p-2 hover:bg-gray-200">
            Explore more topics
          </button>
        </div>
      </div>
      <div className="flex justify-center mx-20">
        <div
          className="grid grid-cols-2 justify-center items-center mt-20 mx-20"
          style={{ width: '90%' }}
        >
          <div className="pl-10">
            <Image src={logoUB} alt="logo-ub" width={192} />
            <h1 className="text-4xl font-bold">Upskill your team with</h1>
            <h1 className="text-4xl font-bold">Udemy Business</h1>
            <ul className="list-disc ml-5 text-xl my-2">
              <li className="mt-2">
                Unlimited access to 26,000+ top Udemy courses, anytime, anywhere
              </li>
              <li className="mt-2">
                International course collection in 14 languages
              </li>
              <li className="mt-2">Top certifications in tech and business</li>
            </ul>
            <button className="bg-black text-white p-2 font-bold hover:opacity-80">
              Get Udemy Business
            </button>
            <button className="ml-2 border border-black font-bold text-black p-2 hover:bg-gray-200">
              Learn more
            </button>
          </div>
          <div className="flex justify-center">
            <Image src={pr} alt="PR" width={400} className="object-contain" />
          </div>
        </div>
      </div>

      <div className="mt-10 bg-gray-100">
        <div className="w-full flex justify-center">
          <div className="bg-white border border-black p-10 md:w-1/3 my-10">
            <div className="text-center">
              <Image src={quote} alt="quote" width={20} className="mx-auto" />
              <span className="block mt-4">
                To stay at the leading edge of IT innovation, your team needs to
                regularly reinvent its skillset. With Udemy Business, I can give
                my team the space to learn and take the initiative. It means we
                can produce higher quality work more quickly.
              </span>
              <button className="text-purple-900 font-bold text-sm mt-4">
                Read full story
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <Image
                src={customer}
                alt="customer"
                className="rounded-full aspect-square object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="text-center mt-2">
              <h1 className="font-bold">Ismaeel Ameen</h1>
              <div>Head of Data Engineering</div>
              <div>Development and Data Management</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mx-20 my-10">
        <div
          className="grid grid-cols-2 justify-center items-center mt-20 mx-20"
          style={{ width: '90%' }}
        >
          <div className="flex justify-center">
            <Image
              src={instructor}
              alt="instructor"
              width={400}
              className="object-contain"
            />
          </div>
          <div className="pl-10">
            <h1 className="text-4xl font-bold">Become an instructor</h1>
            <div className="my-2">
              Instructors from around the world teach millions of learners on
              Udemy. We provide the tools and skills to teach what you love.
            </div>
            <button className="bg-black text-white p-2 font-bold hover:opacity-80">
              Start teaching today
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
