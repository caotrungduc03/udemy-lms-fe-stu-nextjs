'use client';
import Loading from '@/components/Loading';
import { getAuthorId } from '@/lib/authorId';
import { useGetCourseByAuthorIdDataQuery } from '@/lib/features/course/courseApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { TiPencil } from 'react-icons/ti';
import 'react-quill/dist/quill.snow.css';

export default function Course() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get('query') || '';
  const { data, isLoading, isSuccess } = useGetCourseByAuthorIdDataQuery({
    id: parseInt(getAuthorId()),
  });
  if (isLoading) {
    return <Loading />;
  } else if (isSuccess) {
    const handleClick = (id: any) => {
      router.push(`/instructor/edit-course?id=${id}`);
    };
    const filteredData = data.data.items.filter((course: any) =>
      course.courseName.toLowerCase().includes(search.toLowerCase()),
    );

    const numResults = filteredData.length;
    var totalPages = Math.ceil(numResults / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);
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
    function handleKeyPress(event: any) {
      if (event.key === 'Enter') {
        // Lấy giá trị đã nhập từ trường input
        const inputData = event.target.value;

        // Gọi hàm xử lý dữ liệu với giá trị nhập vào
        const searchURL = `/instructor/course?query=${encodeURIComponent(
          inputData,
        )}`;
        // window.location.href = searchURL;
        router.push(searchURL);
        setCurrentPage(1);
      }
    }
    return (
      <div className="h-screen flex flex-col items-center w-full">
        <div className="w-5/6 flex flex-col">
          <button className="font-bold text-white text-sm bg-blue-600 py-2 w-36 rounded-lg hover:bg-blue-700 mb-2">
            <a href="/instructor/create-course">Create New Course</a>
          </button>
          <input
            placeholder="Search Course..."
            className="border border-gray-200 p-2 rounded-md w-60 mb-10"
            onKeyDown={handleKeyPress}
          />
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentData.map((course: any, index: any) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:-translate-y-2 transition duration-150 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-gray-900">
                    {course.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <img src={course.coverImage} alt="img" className="w-20" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${course.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.language}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.category.categoryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.status === true
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {course.status === true ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2 items-end">
                      <TiPencil size={20} />
                      <a
                        onClick={() => handleClick(course.id)}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      >
                        Edit
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center my-5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      currentPage === page ? 'text-purple-900 underline' : ''
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
    );
  }
}
