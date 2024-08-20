'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../lib/features/auth/authApi';
import Logo from '../../public/logo.png';

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);
  const [addUser, { data, isLoading, isSuccess, error }] =
    useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();
  const password = watch('password');

  // useEffect(() => {
  //   toast.success('Sign up successfully');
  //   redirect('/log-in');
  // }, [isSuccess, data]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const result = await addUser(data).unwrap();
      console.log('result', result);
      if (result) {
        toast.success('Sign up successfully');
        window.location.href = '/log-in';
      }
      // Handle success (e.g., navigate to another page or show a success message)
    } catch (err) {
      console.error('Failed to register:', err);
    }
  };

  return (
    <div
      className="md:grid md:grid-cols-2 md:justify-end"
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-easing="ease-in-sine"
      data-aos-duration="600"
    >
      <div className="flex justify-center ml-10">
        <Image src={Logo} alt="img" className="h-full w-auto" />
      </div>
      <div className="flex items-center justify-center p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h1 className="font-bold text-center text-3xl mb-10">
            Sign up and start learning
          </h1>
          <div className="mb-2">
            <input
              placeholder="Name"
              {...register('fullName', { required: true })}
              className="w-full p-2 border border-black"
            />
            {errors.fullName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-2">
            <input
              placeholder="Email"
              type="email"
              {...register('email', { required: true })}
              className="w-full p-2 border border-black"
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-2">
            <input
              placeholder="Password"
              type="password"
              {...register('password', { required: true })}
              className="w-full p-2 border border-black"
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-2">
            <input
              placeholder="Confirm password"
              type="password"
              {...register('confirmPassword', { required: true })}
              className="w-full p-2 border border-black"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white w-full p-2 mb-10 font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
          {error && (
            <span className="text-red-500">
              Failed to sign up. Please try again.
            </span>
          )}
          <div className="text-center mt-10">
            <span>Already have an account? </span>
            <Link href="/log-in" className="font-bold link-underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
