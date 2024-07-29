"use client"
import React, { useState } from 'react';
const Profile: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
        <div className="col-span-4 border-t border-b border-r border-gray-200">
          <div className="text-center p-5">
            <h1 className="font-bold text-xl">Public profile</h1>
            <span className="text-gray-700 text-sm">Add information about yourself</span>
          </div>
          <div className="p-5 border-t border-r border-gray-200 flex flex-col items-center">
            <div className="w-full max-w-lg">
              <h1 className="font-bold text-sm">Basics:</h1>
              <input
                placeholder="First Name"
                type="text"
                name="Fname"
                required
                className="w-full p-2 border border-black my-4"
              />
              <input
                placeholder="Last Name"
                type="text"
                name="Lname"
                required
                className="w-full p-2 border border-black"
              />
              <input
                placeholder="Headline"
                type="text"
                name="headline"
                required
                className="w-full p-2 border border-black mt-4"
              />
              <span className="text-xs text-gray-400">Add a professional headline like, "Instructor at Udemy" or "Architect."</span>
              <select
                name="options"
                className={`w-full p-2 border border-black my-4 cursor-pointer ${isHovered ? 'bg-gray-200' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <option value="eng">English (US)</option>
                <option value="vie">Tiếng Việt</option>
              </select>
              <h1 className="font-bold text-sm border-t border-gray-200 pt-4">Links:</h1>
              <input
                placeholder="Website (http(s)://..)"
                type="website"
                name="website"
                required
                className="w-full p-2 border border-black my-2"
              />
              <div className="flex w-full border border-black my-2">
                <span className="border-r border-black p-3 bg-gray-200">http://twitter.com/</span>
                <input
                placeholder="Twitter Profile"
                type="Twitter"
                name="Twitter"
                required
                className="p-3"
              />
              </div>
              <span className="text-xs text-gray-400">Add your Twitter username (e.g. johnsmith).</span>
              <div className="flex w-full border border-black my-2">
                <span className="border-r border-black p-3 bg-gray-200">http://www.facebook.com/</span>
                <input
                placeholder="Facebook Profile"
                type="Facebook"
                name="Facebook"
                required
                className="p-3"
              />
              </div>
              <span className="text-xs text-gray-400">Input your Facebook username (e.g. johnsmith).</span>
              <div className="flex w-full border border-black my-2">
                <span className="border-r border-black p-3 bg-gray-200">http://www.linkedin.com/</span>
                <input
                placeholder="LinkedIn Profile"
                type="LinkedIn"
                name="LinkedIn"
                required
                className="p-3"
              />
              </div>
              <span className="text-xs text-gray-400">Input your LinkedIn resource id (e.g. in/johnsmith).</span>
              <div>
                <div className="flex w-full border border-black my-2">
                  <span className="border-r border-black p-3 bg-gray-200">http://www.youtube.com/</span>
                  <input
                  placeholder="Youtube Profile"
                  type="Youtube"
                  name="Youtube"
                  required
                  className="p-3"
                  />
                </div>
                <span className="text-xs text-gray-400">Input your Youtube username (e.g. johnsmith).</span>
              </div>
              <button type="submit" className="text-white font-bold bg-black mt-4 py-2 px-4 hover:opacity-80">
                Save
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default Profile;
