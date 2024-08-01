'use client';
import React, { useState } from 'react';

interface User {
  userName: string;
  email: string;
  phone: string;
}

const Profile: React.FC<User> = ({ userName, email, phone }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="col-span-4 border-t border-b border-r border-gray-200">
        <div className="text-center p-5">
          <h1 className="font-bold text-xl">Public profile</h1>
          <span className="text-gray-700 text-sm">
            Add information about yourself
          </span>
        </div>
        <div className="p-5 border-t border-r border-gray-200 flex flex-col items-center">
          <div className="w-full max-w-lg">
            <h1 className="font-bold text-sm">Name:</h1>
            <input
              placeholder={userName}
              type="text"
              name="name"
              required
              className="w-full rounded-md p-2 border border-black mb-4"
            />
            <h1 className="font-bold text-sm">Email:</h1>
            <input
              placeholder={email}
              type="text"
              name="email"
              required
              className="w-full p-2 rounded-md border border-black mb-4"
            />
            <h1 className="font-bold text-sm">Phone:</h1>
            <input
              placeholder={phone}
              type="text"
              name="phone"
              required
              className="w-full p-2 rounded-md border border-black mb-4"
            />
            <button
              type="submit"
              className="text-white font-bold bg-black mt-4 py-2 px-4 hover:opacity-80 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
