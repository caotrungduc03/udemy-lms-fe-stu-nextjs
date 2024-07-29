'use client';  // Correct directive for Next.js or similar environment
import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, email }) => {
  if (!isVisible) {
    return null;
  }

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    <div id="wrapper" className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleCloseModal}>
      <div className='w-[500px] bg-white p-5'>
        <div className='flex justify-between'>
          <div className='font-bold'>
            Change your email
          </div>
          <button onClick={onClose}>x</button>
        </div>
        <input
          placeholder={email}
          type="email"
          name="email"
          required
          className="w-full p-2 border border-black my-2"
        />
        <button className="text-white font-bold bg-black mt-4 py-2 px-4 hover:opacity-80">
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
