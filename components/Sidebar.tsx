'use client';
import { removeToken } from '@/lib/tokens';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ImExit } from 'react-icons/im';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoBookOutline, IoHomeOutline } from 'react-icons/io5';
import { LiaCheckSquareSolid } from 'react-icons/lia';
import { PiExam, PiStudent } from 'react-icons/pi';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('Home');

  // Use useEffect to update selectedTab based on pathname change
  useEffect(() => {
    if (pathname.includes('/instructor/lesson-tab')) {
      setSelectedTab('Lessons');
    } else if (pathname.includes('/instructor/exercise-tab')) {
      setSelectedTab('Exercises');
    } else if (pathname.includes('/instructor/student-tab')) {
      setSelectedTab('Students');
    } else if (pathname.includes('/instructor/notification-tab')) {
      setSelectedTab('Notifications');
    } else if (pathname == '/instructor') {
      setSelectedTab('Home');
    } else {
      setSelectedTab('Courses');
    }
  }, [pathname]); // Dependency array with pathname ensures effect runs only on pathname change

  const handleClick = (item: string) => {
    setSelectedTab(item);
    switch (item) {
      case 'Home':
        router.push('/instructor');
        break;
      case 'Courses':
        router.push('/instructor/course');
        break;
      case 'Lessons':
        router.push('/instructor/lesson-tab');
        break;
      case 'Exercises':
        router.push('/instructor/exercise-tab');
        break;
      case 'Students':
        router.push('/instructor/student-tab');
        break;
      case 'Notifications':
        router.push('/instructor/notification-tab');
        break;
      default:
        router.push('/instructor/course');
        break;
    }
  };

  const handleLogout = () => {
    removeToken();
    window.location.href = '/log-in';
  };

  const tabs = [
    { icon: IoHomeOutline, label: 'Home' },
    { icon: IoBookOutline, label: 'Courses' },
    { icon: PiExam, label: 'Lessons' },
    { icon: LiaCheckSquareSolid, label: 'Exercises' },
    { icon: PiStudent, label: 'Students' },
    { icon: IoIosNotificationsOutline, label: 'Notifications' },
  ];

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed h-full flex flex-col justify-between items-start z-10 shadow-md bg-[#DCE8F5ff] ${
        isExpanded ? 'w-52' : 'w-20'
      } transition-all duration-100 rounded-r-xl`}
    >
      <div className="pl-[10px] pt-10 space-y-2">
        {tabs.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.label)}
            className={`flex items-center space-x-2 cursor-pointer w-full ${
              selectedTab === item.label
                ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                : 'text-[#477C9E] border-transparent'
            } ${isExpanded ? 'w-44' : 'w-20'}
             hover:text-indigo-700 hover:bg-indigo-50 hover:border-l-4 transition-all duration-100 p-2 py-3 rounded-r-lg`}
          >
            <item.icon size={32} />
            <span
              className={`transition-all duration-100 font-bold ${
                isExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'
              } overflow-hidden`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="pl-[10px] pb-4">
        <div
          className={`cursor-pointer ${
            selectedTab === 'Logout'
              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-700'
              : 'text-[#477C9E] border-transparent'
          } hover:text-indigo-700 hover:bg-indigo-50 hover:border-l-4 transition-all duration-200 p-3 rounded-lg`}
        >
          <ImExit size={32} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
