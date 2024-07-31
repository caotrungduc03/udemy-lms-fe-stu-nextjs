"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useGetUserDataQuery } from "../../lib/features/user/userApi";
import Avt from "../../public/gg-icon.png";
import Security from "./user-account-security/page";
import UserPhoto from "./userphoto/page";
import Profile from "./userprofile/page";

const User: React.FC = () => {
  const [page, setPage] = useState("profile"); // Default to "profile" page
  const {
    data: data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserDataQuery('1')

  useEffect(() => {
    if (isLoading) {
        console.log('...Loading')
        } else if (isSuccess) {
        console.log('...Success', data)
        } else if (isError) {
        console.log('...Error', error)
        }
  }, []);

  // Function to render the selected page
  const renderPage = () => {
    switch (page) {
      case "profile":
        return <Profile />;
      case "userphoto":
        return <UserPhoto />;
      case "changepassword":
        return <Security />;
      default:
        return <Profile />;
    }
  };

  return (
    <>
      <div className="grid grid-cols-7 p-3">
        <div className="col-start-2 col-span-1 border border-gray-200 flex flex-col items-center">
          <div className="rounded-full border border-gray-200 mt-4">
            <Image src={Avt} alt="avt" width={100} />
          </div>
          <span className="mt-2 font-bold">Username</span>
          <div className="w-full">
            <div
              className="hover:bg-gray-400 text-sm text-gray-600 p-2 cursor-pointer"
              onClick={() => setPage("profile")}
            >
              Profile
            </div>
            <div
              className="hover:bg-gray-400 text-sm text-gray-600 p-2 cursor-pointer"
              onClick={() => setPage("userphoto")}
            >
              Photo
            </div>
            <div 
                className="hover:bg-gray-400 text-sm text-gray-600 p-2 cursor-pointer"
                onClick={() => setPage("changepassword")}    
            >
                Account Security</div>
            <div className="hover:bg-gray-400 text-sm text-gray-600 p-2">Payment methods</div>
          </div>
        </div>
        <div className="col-span-5">
          {renderPage()}
        </div>
      </div>
    </>
  );
};

export default User;
