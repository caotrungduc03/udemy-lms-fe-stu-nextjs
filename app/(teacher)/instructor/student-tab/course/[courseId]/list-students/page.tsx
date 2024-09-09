'use client';
import classroom from '@/public/fakeImage/excercise2.jpg';
import headerBg from '@/public/fakeImage/header-bg.jpg';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { TiPencil } from 'react-icons/ti';

const students = [
  {
    id: 54,
    createdAt: '2024-08-30T02:04:20.070Z',
    updatedAt: '2024-08-30T02:49:09.983Z',
    deletedAt: null,
    fullName: 'ngoc uoc',
    email: 'uoc@gmail.com',
    phoneNumber: '0933333',
    avatar:
      'http://res.cloudinary.com/dfy7njmck/image/upload/v1724986149/rgzckyyd6vgilzrgippd.jpg',
    roleId: 3,
    status: true,
    lastLogin: '2024-08-30T02:22:41.368Z',
  },
  {
    id: 53,
    createdAt: '2024-08-30T01:50:41.214Z',
    updatedAt: '2024-08-30T02:14:53.371Z',
    deletedAt: null,
    fullName: 'Mrs. Sophia Sawayn',
    email: 'abcd@gmail.com',
    phoneNumber: null,
    avatar: null,
    roleId: 2,
    status: true,
    lastLogin: '2024-08-30T02:08:51.992Z',
  },
  {
    id: 52,
    createdAt: '2024-08-30T01:34:28.600Z',
    updatedAt: '2024-08-30T02:05:10.941Z',
    deletedAt: null,
    fullName: 'abcde',
    email: 'herbert_fay@gmail.com',
    phoneNumber: '123456789',
    avatar: null,
    roleId: 3,
    status: false,
    lastLogin: '2024-08-30T01:43:16.661Z',
  },
  {
    id: 51,
    createdAt: '2024-08-29T09:57:19.676Z',
    updatedAt: '2024-08-30T02:14:56.129Z',
    deletedAt: null,
    fullName: 'Ga Hma Mascott',
    email: 'trever.kovacek76@hotmail.com',
    phoneNumber: '011112',
    avatar:
      'http://res.cloudinary.com/dfy7njmck/image/upload/v1724927235/mxjj83axfxyvq0kva9zf.jpg',
    roleId: 2,
    status: true,
    lastLogin: '2024-08-29T09:57:38.742Z',
  },
];
export default function StudentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;
  const searchParam = useSearchParams();
  const search = searchParam.get('search') || '';
  const itemsPerPage = 6;
  const filteredData = students.filter((student: any) =>
    student.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const numResults = filteredData.length;
  var totalPages = Math.ceil(numResults / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const handleClick = (id: any) => {
    router.push(`/instructor/student-tab/course/${courseId}/student/${id}`);
  };
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
      const searchURL = `/instructor/student-tab/course/${courseId}/list-students?search=${encodeURIComponent(
        inputData,
      )}`;
      // window.location.href = searchURL;
      router.push(searchURL);
      setCurrentPage(1);
    }
  }
  return (
    <>
      <div
        className="bg-cover bg-center bg-gray-100 flex items-center opacity-80 mt-2"
        style={{
          backgroundImage: `url(${headerBg.src})`,
          height: '30%',
        }}
      >
        <Image src={classroom} alt="Classroom" className="pl-10" />
        <div className="text-white pl-5 text-2xl font-semibold">
          Lop hoc sat thu
        </div>
        {/* Updated the parent div to be a flex container */}
        <div className="flex justify-end flex-grow pr-10 space-x-5">
          <div className="text-white flex flex-col">
            <span className="pr-2 text-2xl">30</span>
            <span className="text-sm font-thin">Students</span>
          </div>
          <div className="text-white flex flex-col">
            <span className="pr-2 text-2xl">10</span>
            <span className="text-sm font-thin">Exercises</span>
          </div>
          <div className="text-white flex flex-col">
            <span className="pr-2 text-2xl">20</span>
            <span className="text-sm font-thin">Lessons</span>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col items-center w-full pt-10">
        <div className="w-5/6 flex flex-col">
          <input
            placeholder="Search Student..."
            className="border border-gray-200 p-2 rounded-md w-60 mb-10"
            onKeyPress={handleKeyPress}
          />
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
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
              {currentData.map((student: any, index: any) => (
                <tr
                  key={index}
                  className="hover:-translate-y-2 transition duration-150 hover:bg-gray-100"
                >
                  <td className="px-6 py-4">
                    <img
                      src={student.avatar}
                      alt="avt"
                      width={60}
                      height={60}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-gray-900 cursor-pointer">
                    <a onClick={() => handleClick(student.id)}>
                      {student.fullName}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    50%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === true
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {student.status === true ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2 items-end">
                      <TiPencil size={20} />
                      <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                        Edit
                      </button>
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
      <div></div>
    </>
  );
}
