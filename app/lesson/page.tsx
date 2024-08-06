'use client';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { IoCloseSharp, IoTime } from 'react-icons/io5';
import { RxUpdate } from 'react-icons/rx';
import { TbWorld } from 'react-icons/tb';

const Lesson: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div className="relative grid grid-cols-4">
        <div
          className={`col-span-${
            hidden ? '4' : '3'
          } flex flex-col justify-center items-center pb-10`}
        >
          <iframe
            className="w-full h-[450px]"
            src="https://www.youtube.com/embed/TzjUVP9uZcE"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="border-b border-gray-200 p-2">
            <h1 className="text-xl px-2">
              How to program in the popular (and tricky!) C++ programming
              language, for complete beginners.
            </h1>
            <div className="flex items-center space-x-2 text-sm pt-5">
              <IoTime />
              <span>150'</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RxUpdate />
              <span>Last updated December 2019</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TbWorld />
              <span>English</span>
            </div>
          </div>
          <div className="flex space-x-10 justify-center text-sm">
            <h1>Description</h1>
            <div className="w-3/4">
              <p>
                This course teaches you the powerful, fast and popular C++
                programming language from scratch, assuming only basic computer
                knowledge. If you want to develop apps that squeeze the most
                power from your computer -- high-end desktop games or complex
                artificial intelligence programs, for instance -- or if you want
                to use a language that let's you get close to your machine and
                access all of your computer's hardware, C++ is the language for
                you. While C++ is quite challenging, in this course we'll learn
                the basics step by step; towards the end of the course you'll
                learn how to create a beautiful "particle fire" program,
                including a smattering of the basic principles of game
                development.
              </p>
              <p className="font-bold">What you'll learn</p>
              <ul className="list-disc">
                <li>You'll be able to develop powerful C++ programs</li>
                <li>
                  You'll be able to apply for C++ jobs, with at least a
                  possibility of success
                </li>
                <li>
                  You'll understand the basics of computer programming,
                  including Object Orientation
                </li>
              </ul>
              <p className="font-bold">
                Are there any course requirements or prerequisites?
              </p>
              <ul className="list-disc">
                <li>
                  You can use any C++ IDE (terms explained in the course) and
                  compiler to follow this course; all the software you need is
                  free, but you may need to do a little Googling to find
                  explicit install instructions for your platform.
                </li>
              </ul>
              <p className="font-bold">Who this course is for:</p>
              <ul className="list-disc">
                <li>
                  This course is intended for those who are computer literate
                  and familiar with downloading and unzipping files, using the
                  Internet and so on, and who want to learn to program
                </li>
                <li>
                  C++ is one of the more challenging computer programming
                  languages -- so expect to encounter difficulties! You will
                  need a degree of patience and persistence.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`col-span-1 border border-gray-200 top-0 transform transition-transform duration-300 ease-in-out ${
            hidden ? 'translate-x-full' : 'relative translate-x-0'
          }`}
        >
          {!hidden && (
            <div>
              <div className="flex justify-between items-center p-2 border-b border-gray-200">
                <h1 className="font-bold">Course Content</h1>
                <button onClick={() => setHidden(!hidden)}>
                  <IoCloseSharp />
                </button>
              </div>
              <div className="flex hover:bg-gray-200 pl-2">
                <input type="checkbox" />
                <h1 className="p-2 cursor-pointer text-sm text-gray-400">
                  Exercise 1
                </h1>
              </div>
              <div className="flex hover:bg-gray-200 pl-2">
                <input type="checkbox" />
                <h1 className="p-2 cursor-pointer text-sm text-gray-400">
                  Exercise 2
                </h1>
              </div>
              <div className="flex hover:bg-gray-200 pl-2">
                <input type="checkbox" />
                <h1 className="p-2 cursor-pointer text-sm text-gray-400">
                  Exercise 3
                </h1>
              </div>
            </div>
          )}
        </div>
        {hidden && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-0 bg-gray-800 p-2 rounded-l">
            <button
              onClick={() => setHidden(false)}
              className="flex items-center"
            >
              <FaArrowLeft className="text-white" />
              <span className="text-white ml-2 hidden hover:inline-block">
                Course Content
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Lesson;
