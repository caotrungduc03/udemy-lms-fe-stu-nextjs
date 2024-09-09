'use client';

import { useGetCategoriesQuery } from '@/lib/features/categories/categoryApi';
import {
  useEditCourseMutation,
  useGetCourseByIdDataQuery,
} from '@/lib/features/course/courseApi';
import { getToken } from '@/lib/tokens';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

interface Category {
  id: number;
  categoryName: string;
  parent?: Parent;
}

interface Parent {
  id: number;
  categoryName: string;
}

interface CategoryResponse {
  data: {
    data: {
      items: Category[];
    };
  };
}

type FormValues = {
  courseName: string;
  description: string;
  priceType: string;
  price: string;
  language: string;
  categoryId: string;
  file: FileList;
};

export default function EditCourse() {
  const searchParam = useSearchParams();
  const id = searchParam.get('id');
  const [previewImage, setPreviewImage] = useState('');
  const [{ categoryId, subcategoryId }, setData] = useState({
    categoryId: '',
    subcategoryId: 'Select Subcategory',
  });
  const [language, setLanguage] = useState('');
  const [priceType, setPriceType] = useState('');
  const { data: data2 } = useGetCourseByIdDataQuery({ id });
  useEffect(() => {
    if (data2?.data.coverImage) {
      setPreviewImage(data2.data.coverImage);
      setLanguage(data2.data.language);
      setPriceType(data2.data.priceType);
    }
  }, [data2]);
  const [editCourse, { isLoading, error }] = useEditCourseMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append('courseName', data.courseName);
    formData.append('description', data.description);
    formData.append('language', data.language);

    if (subcategoryId === 'Select Subcategory') {
      formData.append('categoryId', categoryId);
    } else {
      formData.append('categoryId', subcategoryId);
    }
    if (priceType == 'FREE') {
      formData.append('priceType', 'FREE');
      formData.append('price', '0');
    } else {
      formData.append('priceType', 'PAID');
      formData.append('price', data.price);
    }

    if (data.file[0]) {
      formData.append('file', data.file[0]);
    }

    try {
      const result = await editCourse({
        data: formData,
        id: id,
        accessToken: getToken(),
      }).unwrap();
      if (result) {
        toast.success('Edit course successfully');
        setTimeout(() => {
          window.location.href = '/instructor/course';
        }, 2000);
      }
    } catch (err) {
      toast.error('Failed to edit course');
    }
  };

  const { data } = useGetCategoriesQuery<CategoryResponse>();
  function transformData(data: Category[]) {
    const categories: {
      [key: string]: { name: string; id: number; subcategories: Parent[] };
    } = {};

    data.forEach((item) => {
      if (item.parent) {
        if (!categories[item.parent.categoryName]) {
          categories[item.parent.categoryName] = {
            name: item.parent.categoryName,
            id: item.parent.id,
            subcategories: [],
          };
        }
        categories[item.parent.categoryName].subcategories.push({
          categoryName: item.categoryName,
          id: item.id,
        });
      } else {
        if (!categories[item.categoryName]) {
          categories[item.categoryName] = {
            name: item.categoryName,
            id: item.id,
            subcategories: [],
          };
        }
      }
    });

    return Object.values(categories);
  }

  const transformedData = transformData(data?.data?.items ?? []);

  const categories = transformedData.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  const subcategories = transformedData
    .find((item) => item.id === Number(categoryId))
    ?.subcategories.map((subcategory) => (
      <option key={subcategory.id} value={subcategory.id}>
        {subcategory.categoryName}
      </option>
    ));

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setData({
      subcategoryId: 'Select Subcategory',
      categoryId: event.target.value,
    });
  }

  function handleSubcategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setData((data) => ({ ...data, subcategoryId: event.target.value }));
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-5">
      <div className="font-c font-bold text-center text-4xl text-blue-700 mb-10">
        Edit Course
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-2xl flex flex-col border border-gray-300 rounded-lg p-8 shadow-lg"
      >
        {/* Title */}
        <label className="font-medium text-lg text-gray-700 mb-2">Title</label>
        <input
          placeholder={data2?.data?.courseName}
          {...register('courseName', { required: true })}
          className="border border-gray-300 p-3 rounded-lg mb-5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Category */}
        <label className="font-medium text-lg text-gray-700 mb-2">
          Category
        </label>
        <span className="font-bold text-sm text-gray-500 mb-1">
          Previous category: {data2?.data.category.categoryName}
        </span>
        <div className="mb-2">
          <select
            value={categoryId}
            onChange={handleCategoryChange}
            className="p-3 border border-gray-300 w-full rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories}
          </select>
        </div>
        <div className="mb-5">
          <select
            value={subcategoryId}
            onChange={handleSubcategoryChange}
            className="p-3 border border-gray-300 w-full rounded-lg text-gray-900 "
          >
            <option value="Select Subcategory">Select Subcategory</option>
            {subcategories}
          </select>
        </div>

        {/* Language */}
        <label className="font-medium text-lg text-gray-700 mb-2">
          Language
        </label>
        <div className="mb-5">
          <select
            value={language}
            {...register('language', { required: true })}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-3 border border-gray-300 w-full rounded-lg text-gray-900 "
          >
            <option value="English">English</option>
            <option value="Vietnamese">Tiếng Việt</option>
          </select>
        </div>

        {/* Price */}
        <label className="font-medium text-lg text-gray-700 mb-2">Price</label>
        <div className="mb-5">
          <select
            value={priceType}
            {...register('priceType', { required: true })}
            onChange={(e) => setPriceType(e.target.value)}
            className="p-3 border border-gray-300 w-full rounded-lg text-gray-900"
          >
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
          </select>
          {priceType !== 'FREE' && (
            <input
              placeholder={data2?.data?.price}
              {...register('price', { required: true })}
              type="number"
              className="border border-gray-300 p-3 rounded-lg mt-3 w-full text-gray-900"
            />
          )}
        </div>

        {/* Description */}
        <label className="font-medium text-lg text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('description', { required: true })}
          className="mb-5 p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
          placeholder={data2?.data.description}
        ></textarea>

        {/* Upload Image */}
        <label className="font-medium text-lg text-gray-700 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          {...register('file')}
          onChange={handleFileChange}
          className="mb-5 border border-gray-300 p-3 rounded-lg w-full text-gray-900"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mb-5 w-full h-auto rounded-lg shadow-md object-cover"
          />
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          {isLoading ? (
            <button
              type="button"
              className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
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
              Save Course
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
