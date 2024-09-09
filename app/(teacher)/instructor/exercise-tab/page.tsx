'use client';
import Cards from '@/components/Card';
import Loading from '@/components/Loading';
import { getAuthorId } from '@/lib/authorId';
import { useGetCourseByAuthorIdDataQuery } from '@/lib/features/course/courseApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

export default function Classroom() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();
  const path = usePathname();
  const searchParam = useSearchParams();
  const search = searchParam.get('search') || '';
  const { data, isLoading, isSuccess } = useGetCourseByAuthorIdDataQuery({
    id: parseInt(getAuthorId()),
  });
  if (isLoading) {
    return <Loading />;
  }
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
      const searchURL = `/instructor/exercise-tab?search=${encodeURIComponent(
        inputData,
      )}`;
      // window.location.href = searchURL;
      router.push(searchURL);
      setCurrentPage(1);
    }
  }
  const handlePage = () => {
    switch (path) {
      case '/instructor/classroom':
        router.push('/instructor/exercise-tab/list-exercises');
    }
  };
  return (
    <div className="h-screen flex flex-col items-center w-full">
      <h1 className="font-c font-bold text-center text-4xl text-blue-700 mb-10">
        Select classroom
      </h1>
      <input
        placeholder="Search classroom..."
        className="border border-gray-200 p-2 rounded-md w-60 mb-10"
        onKeyDown={handleKeyPress}
      />
      <div className="grid grid-cols-3 gap-10">
        {currentData.map((c: any) => (
          <Cards
            desc={c.description}
            img={c.coverImage}
            name={c.courseName}
            lastUpdate={c.lastUpdate}
            price={c.price}
            id={c.id}
          />
        ))}
      </div>
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
  );
}
