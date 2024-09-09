'use client';
import Loading from '@/components/Loading';
import { useGetLessonByCourseIdDataQuery } from '@/lib/features/lesson/lessonApi';
import { getToken } from '@/lib/tokens';
import classroom from '@/public/fakeImage/excercise2.jpg';
import headerBg from '@/public/fakeImage/header-bg.jpg';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { TiPencil } from 'react-icons/ti';

const lessons = [
  {
    id: 23,
    lessonName: 'Unbranded Cotton Ball',
    description:
      'Commodi magni sunt autem est ipsa accusantium laborum provident. Ab sit neque omnis corrupti et cupiditate. Quam distinctio natus qui. Harum voluptatum laudantium vel qui omnis maiores et. Doloribus sit labore quae quisquam quo et nulla et id.',
    duration: 12,
    content:
      'The JBOD monitor is down, reboot the haptic interface so we can parse the SMTP bus!',
  },
  {
    id: 22,
    lessonName: 'Generic Concrete Ball',
    description:
      'Nihil repellendus dicta cumque est aut ex est asperiores. Porro ipsa quaerat consequatur eos fugiat quos est est. Cum suscipit a occaecati maxime quasi velit in.',
    duration: 725,
    content:
      'If we hack the card, we can get to the RSS array through the primary SQL bus!',
  },
  {
    id: 21,
    lessonName: 'Awesome Steel Ball',
    description:
      'Quo porro dolores est velit fuga fugiat. Deserunt nobis et. Sunt tempora et ut exercitationem tempore at nihil est.',
    duration: 572,
    content: '{"name":"sss"}',
  },
  {
    id: 20,
    lessonName: '16',
    description:
      'Est eos perferendis non veritatis. Asperiores ut aut quod rem. Suscipit optio exercitationem eos assumenda nemo sit in voluptatibus. Est adipisci excepturi qui qui maiores illum ducimus ipsum. Maxime consectetur adipisci doloribus est voluptatem ut. Et velit perspiciatis autem dolorem tenetur eaque voluptatem.',
    duration: 365,
    content:
      'Try to copy the CSS firewall, maybe it will input the primary circuit!',
  },
];
export default function LessonList() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;
  const searchParam = useSearchParams();
  const search = searchParam.get('lessonId') || '';
  const itemsPerPage = 6;
  const { data, isLoading } = useGetLessonByCourseIdDataQuery({
    accessToken: getToken(),
    courseId: courseId,
  });
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }
  const filteredData = data?.data?.items?.filter((lesson: any) =>
    lesson.lessonName.toLowerCase().includes(search.toLowerCase()),
  );

  const numResults = filteredData.length || 0;
  var totalPages = Math.ceil(numResults / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const handleClick = (id: any) => {
    router.push(`/instructor/lesson-tab/course/${courseId}/lesson/${id}`);
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
      const searchURL = `/instructor/lesson-tab/course/${courseId}/list-lessons?lessonId=${encodeURIComponent(
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
            <span className="text-sm font-thin">lessons</span>
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
          <button className="font-bold text-white text-sm bg-blue-600 py-2 w-36 rounded-lg hover:bg-blue-700 mb-2">
            <a href={`/instructor/lesson-tab/course/${courseId}/create-lesson`}>
              Create New Lesson
            </a>
          </button>
          <input
            placeholder="Search Lesson..."
            className="border border-gray-200 p-2 rounded-md w-60 mb-10"
            onKeyPress={handleKeyPress}
          />
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentData.map((lesson: any, index: any) => (
                <tr
                  key={index}
                  className="hover:-translate-y-2 transition duration-150 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-gray-900 cursor-pointer">
                    <a onClick={() => handleClick(lesson.id)}>
                      {lesson.lessonName}
                    </a>
                  </td>
                  <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
                    {lesson.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lesson.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2 items-end">
                      <TiPencil size={20} />
                      <a
                        href={`/instructor/lesson-tab/course/${courseId}/edit-lesson/${lesson.id}`}
                      >
                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                          Edit
                        </button>
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
      <div></div>
    </>
  );
}
