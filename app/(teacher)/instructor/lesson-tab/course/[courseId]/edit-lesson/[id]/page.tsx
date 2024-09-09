'use client';
import {
  useGetLessonByIdQuery,
  useUpdateLessonMutation,
} from '@/lib/features/lesson/lessonApi';
import { getToken } from '@/lib/tokens';
import html2canvas from 'html2canvas'; // Import html2canvas
import jsPDF from 'jspdf'; // Import jsPDF
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { toast } from 'react-toastify';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
type FormValues = {
  lessonName: string;
  description: string;
  duration: string;
  content: string;
  courseId: number;
};

export default function EditLesson() {
  const params = useParams();
  const courseId = params.courseId;
  const lessonId = Number(params.id);
  const [content, setContent] = useState('');
  const { data } = useGetLessonByIdQuery({
    id: lessonId,
    accessToken: getToken(),
  });
  console.log(data);
  useEffect(() => {
    setContent(data?.data.content);
  }, [data]);
  const [editLesson, { isLoading }] = useUpdateLessonMutation();
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        [{ align: [] }],
        [{ color: [] }],
        ['code-block'],
        ['clean'],
      ],
    },
  };

  const quillFormats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const handleExportPDF = () => {
    const editor = document.querySelector('.ql-editor') as HTMLElement;
    html2canvas(editor).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('document.pdf');
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const lessonData = {
      ...data,
      content: content,
      courseId: courseId,
    };
    try {
      const result = await editLesson({
        id: lessonId,
        data: lessonData,
        accessToken: getToken(),
      }).unwrap();
      if (result) {
        toast.success('Create lesson successfully');
        setTimeout(() => {
          window.location.href = `/instructor/lesson-tab/course/${courseId}/list-lessons`;
        }, 2000);
      }
    } catch (err) {
      toast.error('Failed to create lesson');
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center bg-gray-50 py-10 px-5">
        <h1 className="font-c font-bold text-center text-4xl text-blue-700 mb-10">
          Create lesson
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-2xl flex flex-col border border-gray-300 rounded-lg p-8 shadow-lg"
        >
          <label className="font-medium text-lg text-gray-700 mb-2">
            Lesson Name
          </label>
          <input
            placeholder={data?.data.lessonName}
            {...register('lessonName', { required: true })}
            className="border border-gray-300 p-3 rounded-lg mb-5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="font-medium text-lg text-gray-700 mb-2">
            Description
          </label>
          <input
            placeholder={data?.data.description}
            {...register('description', { required: true })}
            className="border border-gray-300 p-3 rounded-lg mb-5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="font-medium text-lg text-gray-700 mb-2">
            Duration
          </label>
          <input
            placeholder={data?.data.duration}
            {...register('duration', { required: true })}
            type="number"
            className="border border-gray-300 p-3 rounded-lg w-full text-gray-900 mb-5"
          />
          <label className="font-medium text-lg text-gray-700 mb-2">
            Content
          </label>
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            className="min-h-56 mb-5 bg-white"
          />
          <button
            onClick={handleExportPDF}
            className="p-2 mt-2 bg-blue-500 text-white rounded"
          >
            Export to PDF
          </button>
          <div className="flex justify-center">
            {isLoading ? (
              <button
                type="button"
                className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  ></path>
                </svg>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg dark:focus:ring-blue-900 hover:bg-blue-700"
              >
                Edit Lesson
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
