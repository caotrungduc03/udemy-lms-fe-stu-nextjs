'use client';
import { useUpdateUserProfileMutation } from '@/lib/features/auth/authApi';
import { getToken } from '@/lib/tokens';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
interface User {
  userName: string;
  email: string;
  phone: string;
  photo: string;
}

type FormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  file: FileList;
};

const Profile: React.FC<User> = ({ userName, email, phone, photo }) => {
  const [previewImage, setPreviewImage] = useState(photo);
  const [token, setToken] = useState('');

  const [updateUser, { data, isLoading, isSuccess, error }] =
    useUpdateUserProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    setToken(getToken() || '');
  }, [token]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    if (data.file[0]) {
      formData.append('file', data.file[0]);
    }

    try {
      const result = await updateUser({
        accessToken: token,
        userData: formData,
      }).unwrap();
      console.log('result', result);
      if (result) {
        toast.success('Update successfully');
        setTimeout(() => {
          window.location.href = '/user';
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  return (
    <>
      <div className="col-span-4 border-t border-b border-r border-gray-200">
        <div className="text-center p-5">
          <h1 className="font-bold text-xl">Public profile</h1>
          <span className="text-gray-700 text-sm">
            Add information about yourself
          </span>
        </div>
        <div className="p-5 border-t border-r border-gray-200 flex flex-col items-center">
          <div className="w-full max-w-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-6 rounded shadow-sm w-full max-w-md"
            >
              <h1 className="font-bold text-sm">Name:</h1>
              <input
                placeholder={userName}
                {...register('fullName', { required: true })}
                className="w-full rounded-md p-2 border border-black mb-4"
              />
              <h1 className="font-bold text-sm">Email:</h1>
              <input
                placeholder={email}
                {...register('email')}
                className="w-full p-2 rounded-md border border-black mb-4"
              />
              <h1 className="font-bold text-sm">Phone:</h1>
              <input
                placeholder={phone}
                {...register('phoneNumber')}
                className="w-full p-2 rounded-md border border-black mb-4"
              />
              <span className="text-sm font-bold text-gray-700">
                Image preview
              </span>
              <div className="w-96 h-96">
                <img
                  src={previewImage}
                  alt="altAvt"
                  className="w-full h-auto border border-black"
                />
              </div>
              <h1 className="text-sm font-bold text-gray-700 mt-10">
                Add / Change Image
              </h1>
              {/* <input
                className="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              /> */}
              <input
                className="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                accept="image/*"
                {...register('file')}
                onChange={handleFileChange}
              />
              <button
                type="submit"
                className="text-white font-bold bg-black mt-4 py-2 px-4 hover:opacity-80 rounded-md"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
