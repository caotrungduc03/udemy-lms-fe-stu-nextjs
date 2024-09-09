'use client';
import gif200 from '@/public/fakeImage/200w-unscreen.gif';
import gif200happy from '@/public/fakeImage/happy-unscreen.gif';
import bg from '@/public/fakeImage/home-instructor.jpg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
const data = [
  {
    name: 'Parent 1',
    id: 1,
    sub: [
      { name: 'Child 1.1', id: 11 },
      { name: 'Child 1.2', id: 12 },
    ],
  },
  {
    name: 'Parent 2',
    id: 2,
    sub: [
      { name: 'Child 2.1', id: 21 },
      { name: 'Child 2.2', id: 22 },
    ],
  },
];

function findById(data: any, searchId: any) {
  for (const parent of data) {
    if (parent.id === searchId) {
      return { name: parent.name };
    }

    for (const child of parent.sub) {
      if (child.id === searchId) {
        return {
          parentName: parent.name,
          parentId: parent.id,
          childName: child.name,
          childId: child.id,
        };
      }
    }
  }

  return null;
}
const words = [
  'GROWING FOR A BETTER TOMORROW.',
  'Education is your right, take it now!',
  'A well-educated person knows about a lot of things.',
  'Learn today and have a bright future.',
];

const Course: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  useEffect(() => {
    const handleTyping = () => {
      let updatedWord = currentWord;
      if (isDeleting) {
        updatedWord = currentWord.substring(0, j - 1);
        setJ(j - 1);
        if (j === 0) {
          setIsDeleting(false);
          setI((prev) => (prev + 1) % words.length);
        }
      } else {
        updatedWord = words[i].substring(0, j + 1);
        setJ(j + 1);
        if (j === words[i].length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 5000); // 5 seconds delay before starting to delete
        }
      }
      setCurrentWord(updatedWord);
    };

    const timeoutId = setTimeout(handleTyping, 100);

    return () => clearTimeout(timeoutId);
  }, [currentWord, isDeleting, i, j, words]);
  const result1 = findById(data, 11);
  console.log(result1);

  const result2 = findById(data, 2);
  console.log(result2);

  const result3 = findById(data, 99);
  console.log(result3);

  return (
    <>
      <div className="fixed px-20 py-10 flex">
        <div>
          <h1 className="font-bold text-5xl py-10 w-[450px] h-[300px]">
            {currentWord}
          </h1>
          <h2 className="font-light text-gray-500">
            Best digital learning website.
          </h2>
          <div>
            {!isExpanded ? (
              <Image
                src={gif200}
                alt="Animated GIF"
                className="relative top-5 z-50 left-10 rotate-6"
                width={100}
                height={100}
              />
            ) : (
              <Image
                src={gif200happy}
                alt="Animated GIF"
                className="relative top-3 z-50 left-10"
                width={100}
                height={100}
              />
            )}
            <button
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              className="flex items-center space-x-2 border border-gray-500 rounded-full px-7 py-2 bg-gradient-to-b  shadow-lg hover:shadow-2xl transition transform duration-200 hover:translate-y-1 hover:scale-105"
            >
              <a href="/instructor/course" className="text-black">
                Get Start
              </a>
              <HiArrowLongRight />
            </button>
          </div>
        </div>
        <Image src={bg} alt="background" className="w-2/3 h-auto" />
      </div>
    </>
  );
};

export default Course;
