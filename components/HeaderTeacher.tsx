'use client';
import avt from '@/public/fakeImage/customer.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
const HeaderTeacher: React.FC = () => {
  return (
    <div>
      <div className="flex pl-4 space-x-4 justify-center items-center pr-4 pt-4">
        <Link href="/" className="cursor-pointer hover:text-indigo-700">
          Student
        </Link>
        <IoIosNotificationsOutline
          color="black"
          size={40}
          className="hover:bg-gray-200 hover:rounded-full p-2"
        />
        <Image
          src={avt}
          alt="User"
          className="rounded-full cursor-pointer aspect-square object-cover"
          width={40}
          height={40}
        />
      </div>
      {/* <h1 className="font-bold pl-4 text-[#618FADff] text-xl mt-4 transition-all duration-300  overflow-hidden">
        Le Ba Truong
      </h1>
      <h1 className="text-[#709AB6] pl-4 text-xl transition-all duration-300  overflow-hidden">
        Instructor
      </h1> */}
    </div>
  );
};

export default HeaderTeacher;
