'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import Link from 'next/link';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useGetCourseDataQuery } from '../../lib/features/course/courseApi';

interface Course {
  id: number;
  createdAt: string;
  courseName: string;
  description: string;
  coverImage: string;
  priceType: string;
  price: number;
  author: Author;
  category: Category;
}
interface Category {
  id: number;
  createdAt: string;
  categoryName: string;
}
interface Author {
  id: number;
  createdAt: string;
  fullName: string;
  avatar?: any;
}

export const Search: React.FC = () => {
  const searchParam = useSearchParams();
  const search = searchParam.get('query') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { isLoading, isSuccess } = useGetCourseDataQuery({ q: search });
  const { course } = useSelector((state: any) => state);

  if (isLoading) {
    return (
      <div role="status" className="flex justify-center p-40">
        <svg
          aria-hidden="true"
          className="w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  } else if (isSuccess) {
    const numResults = course.courses.length;
    var totalPages = Math.ceil(numResults / itemsPerPage);

    // const filteredData = fakeData.filter(
    //   (course) =>
    //     course.summary.toLowerCase().includes(search.toLowerCase()) ||
    //     course.description.toLowerCase().includes(search.toLowerCase()),
    // );

    // const [numberResults, setNumResults] = useState(0);

    // React.useEffect(() => {
    //   setNumResults(data.data.total);
    // }, [isSuccess]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = course.courses.slice(startIndex, endIndex);

    // const totalPages = Math.ceil(numberResults / itemsPerPage);

    const paginationNumbers = () => {
      const pages: (number | string)[] = [];
      const totalPagesToShow = 5; // Số trang hiển thị tối đa (bao gồm cả ... nếu có)

      if (totalPages <= totalPagesToShow) {
        // Nếu tổng số trang ít hơn hoặc bằng số trang tối đa hiển thị, hiển thị tất cả các trang
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Luôn hiển thị trang đầu và cuối
        pages.push(1);

        // Tính toán các trang ở giữa cần hiển thị
        let leftBound = Math.max(2, currentPage - 1);
        let rightBound = Math.min(totalPages - 1, currentPage + 1);

        // Nếu có các trang bị ẩn bên trái
        if (leftBound > 2) {
          pages.push('...');
        }

        for (let i = leftBound; i <= rightBound; i++) {
          pages.push(i);
        }

        // Nếu có các trang bị ẩn bên phải
        if (rightBound < totalPages - 1) {
          pages.push('...');
        }

        pages.push(totalPages);
      }

      return pages;
    };

    return (
      <>
        <div className="grid grid-cols-12 my-5">
          <div className="col-span-1" />
          <h1 className="font-bold text-2xl col-span-11">
            {course.courses.length} result for "{search}"
          </h1>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-1" />
          <div className="col-span-10">
            <div className="min-w-[800px] grid grid-cols-10 flex">
              <div id="filter" className="col-span-2 mr-10 pb-10">
                <select
                  name="options"
                  className="w-full p-2 border border-black mb-4 mt-2 cursor-pointer"
                >
                  <option value="old">Oldest</option>
                  <option value="new">Newest</option>
                </select>
                <div className="flex flex-col">
                  <span className="font-bold border-t border-gray-200 pt-2">
                    Language
                  </span>
                  <div className="text-gray-800 text-sm">
                    <input type="checkbox" id="checkbox1" className="m-2" />
                    English
                  </div>
                  <div className="text-gray-800 text-sm">
                    <input type="checkbox" id="checkbox2" className="m-2" />
                    Tiếng Việt
                  </div>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="font-bold border-t border-gray-200 pt-2">
                    Topic
                  </span>
                  <div className="text-gray-800 text-sm">
                    <input type="checkbox" id="checkbox1" className="m-2" />
                    Python
                  </div>
                  <div className="text-gray-800 text-sm">
                    <input type="checkbox" id="checkbox2" className="m-2" />
                    C++
                  </div>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="font-bold border-t border-gray-200 pt-2">
                    Price
                  </span>
                  <div className="text-gray-800 text-sm">
                    <input type="checkbox" id="checkbox1" className="m-2" />
                    Paid
                  </div>
                  <div className="text-gray-800 text-sm">
                    <input type="checkbox" id="checkbox2" className="m-2" />
                    Free
                  </div>
                </div>
              </div>
              <div className="col-span-8">
                {currentData.map((c: Course) => (
                  <div
                    key={c.id}
                    className="flex py-2 border-b border-gray-200 transition duration-500 ease-in-out transform hover:scale-105"
                  >
                    <img
                      src={c.coverImage}
                      alt={c.courseName}
                      className="border border-gray-200 w-[300px] h-[150px] mr-5 object-cover"
                    />
                    <div className="space-y-2">
                      <Link href="/course" className="font-bold text-sm">
                        {c.courseName}
                      </Link>
                      <h2 className="text-gray-700 text-sm">{c.description}</h2>
                      <p className="text-xs text-gray-500">
                        Author: {c.author.fullName}
                      </p>
                      <button className="transition duration-500 ease-in-out transform hover:scale-105 font-bold bg-purple-900 text-white py-2 px-5 mr-2 hover:bg-black hover:opacity-70 ">
                        Add to cart
                      </button>
                      <button className="transition duration-500 ease-in-out transform hover:scale-105 font-bold bg-white border border-black p-2 hover:bg-gray-200">
                        Buy now
                      </button>
                    </div>
                    <div className="font-bold text-sm">{c.price},000vnd</div>
                  </div>
                ))}

                <div className="flex justify-center items-center my-5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="mx-2"
                  >
                    <IoIosArrowDropleft
                      size={30}
                      className="cursor-pointer rounded-full hover:bg-gray-200"
                    />
                  </button>

                  <div className="flex space-x-2">
                    {paginationNumbers().map((page, index) =>
                      typeof page === 'number' ? (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 ${
                            currentPage === page
                              ? 'text-purple-900 underline'
                              : ''
                          }`}
                        >
                          {page}
                        </button>
                      ) : (
                        <span key={index} className="px-3 py-1">
                          ...
                        </span>
                      ),
                    )}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="mx-2"
                  >
                    <IoIosArrowDropright
                      size={30}
                      className="cursor-pointer rounded-full hover:bg-gray-200"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1" />
        </div>
      </>
    );
  }
};

export default Search;
