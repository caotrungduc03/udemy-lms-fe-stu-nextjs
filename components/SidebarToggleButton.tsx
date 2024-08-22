'use client';
import { FaArrowLeft } from 'react-icons/fa';

interface SidebarToggleButtonProps {
  setHidden: (hidden: boolean) => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  setHidden,
}) => {
  return (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-0 bg-gray-800 p-2 rounded-l">
      <button onClick={() => setHidden(false)} className="flex items-center">
        <FaArrowLeft className="text-white" />
      </button>
    </div>
  );
};

export default SidebarToggleButton;
