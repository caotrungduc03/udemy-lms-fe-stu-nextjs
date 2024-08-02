'use client';
import Image from 'next/image';
import React from 'react';
interface PhotoProps {
  photo: string;
}
const UserPhoto: React.FC<PhotoProps> = ({ photo }) => {
  return (
    <>
      <div className="col-span-4 border-t border-b border-r border-gray-200">
        <div className="text-center p-5">
          <h1 className="font-bold text-xl">Photo</h1>
          <span className="text-gray-700 text-sm">
            Add a nice photo of yourself for your profile.
          </span>
        </div>
        <div className="p-5 border-t border-r border-gray-200 flex flex-col items-center">
          <div className="w-full max-w-lg">
            <span className="text-sm font-bold text-gray-700">
              Image preview
            </span>
            <Image
              src={photo}
              width={32}
              height={32}
              alt="altAvt"
              className="w-full border border-black"
            />
            <span className="text-sm font-bold text-gray-700">
              Add / Change Image
            </span>
            <input
              className="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <button
              type="submit"
              className="text-white font-bold bg-black mt-4 py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPhoto;
