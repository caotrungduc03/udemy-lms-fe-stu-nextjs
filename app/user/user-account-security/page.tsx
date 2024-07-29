"use client"
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import Modal from './Modal';

const Security: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("truonglb@gmail.com");
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      
        <div className="col-span-4 border-t border-b border-r border-gray-200">
          <div className="text-center p-5">
            <h1 className="font-bold text-xl">Account</h1>
            <span className="text-gray-700 text-sm">Edit your account settings and change your password here.</span>
          </div>
          <div className="p-5 border-t border-r border-b border-gray-200 flex flex-col items-center">
            <div className="w-full max-w-lg">
              <h1 className="font-bold text-sm border-b border-gray-200">Email:</h1>
              <div className="flex border border-black items-center">
                <span className="ml-2">
                  Your email address is 
                  <span className="font-bold"> {email}</span>
                </span>
                <MdEdit size={40} className="p-2 ml-auto border-l border-black cursor-pointer hover:bg-gray-200" onClick={() => setShowModal(true)}/>
              </div>
              <h1 className="font-bold text-sm mt-10 pt-4">Password:</h1>
              <input
                placeholder="Enter current password"
                type="currentpassword"
                name="currentpassword"
                required
                className="w-full p-2 border border-black my-2"
              />
              <input
                placeholder="Enter new password"
                type="newpassword"
                name="newpassword"
                required
                className="w-full p-2 border border-black my-2"
              />
              <input
                placeholder="Re-type your new password"
                type="retypepassword"
                name="retypepassword"
                required
                className="w-full p-2 border border-black my-2"
              />
              
              <button type="submit" className="text-white font-bold bg-black mt-4 py-2 px-4 hover:opacity-80">
                Change password
              </button>
            </div>
          </div>
          <Modal isVisible={showModal} onClose={handleCloseModal} email={email}/>
        </div>
    </>
  );
};

export default Security;
