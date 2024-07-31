import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
          <div className="flex items-center justify-between">
            <div className="relative mx-4 lg:mx-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
              <input
                className="w-32 border-b border-indigo-900 h-10 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
                type="text"
                placeholder="Search......"
              />
            </div>
          </div>
          <div>
            <div className="group relative cursor-pointer py-2">
              <button className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4">
                <Image
                  className="rounded-full"
                  width={40}
                  height={60}
                  src="/assets/img/9.jpg"
                  alt="Test Image"
                />
              </button>

              <div className="w-60 invisible absolute z-50 flex -mx-48 flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                <a className="my-2 block  py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                  Profile
                </a>

                <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                  Logout
                </a>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
        </header>
      </div>
    </div>
  );
};
