'use client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUpdateUserProfileMutation } from '../../../lib/features/auth/authApi';
import { getToken } from '../../../lib/tokens';
interface User {
  userName: string;
  email: string;
  phone: string;
}

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
};

const Profile: React.FC<User> = ({ userName, email, phone }) => {
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
    setToken(getToken());
    console.log(token);
  }, [token]);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await updateUser({
        accessToken: token,
        userData: data,
      }).unwrap();
      console.log('result', result);
      if (result) {
        toast.success('Update successfully');
        // window.location.href = '/';
      }
      // Handle success (e.g., navigate to another page or show a success message)
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
              className="bg-white p-6 rounded shadow-md w-full max-w-md"
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
                {...register('email', { required: true })}
                className="w-full p-2 rounded-md border border-black mb-4"
              />
              <h1 className="font-bold text-sm">Phone:</h1>
              <input
                placeholder={phone}
                {...register('phone', { required: true })}
                className="w-full p-2 rounded-md border border-black mb-4"
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
