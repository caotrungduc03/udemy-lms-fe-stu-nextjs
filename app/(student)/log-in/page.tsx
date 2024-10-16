'use client';
import { setAuthorId } from '@/lib/authorId';
import { useLoginMutation } from '@/lib/features/auth/authApi';
import GGicon from '@/public/fakeImage/gg-icon.png';
import Logo from '@/public/fakeImage/logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Inputs = {
  email: string;
  password: string;
};

const loginOptions = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
};

const Login: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const [login, { isLoading, isSuccess, data, isError, error }] =
    useLoginMutation();
  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) =>
    login({ email, password });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successfully');
      setAuthorId(data.data.user.id);
      switch (data.data.user.role.roleName) {
        case 'STUDENT':
          return redirect('/my-course');
        case 'PROFESSOR':
          return redirect('/instructor');
        default:
          return redirect('/');
      }
    }

    if (isError) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, data, isError, error]);

  return (
    <>
      <div
        className="md:grid md:grid-cols-2 md:justify-end"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-easing="ease-in-sine"
        data-aos-duration="600"
      >
        <div className="flex justify-center ml-10">
          <Image src={Logo} alt="img" loading="lazy" />
        </div>
        <div className="flex items-center justify-center p-5">
          <form
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-center text-3xl mb-10">
              Log in Udemy
            </h1>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-black"
                {...register('email', loginOptions.email)}
              />
              {formState.errors.email && (
                <p className="text-red-500">{formState.errors.email.message}</p>
              )}
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-black"
                {...register('password', loginOptions.password)}
              />
              {formState.errors.password && (
                <p className="text-red-500">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white w-full p-2 mb-10 font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Log in'}
            </button>
            <div className="text-center">
              <span>or </span>
              <span className="underline text-purple-700 font-bold">
                Forgot Password
              </span>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="px-4 text-black">Other log in options</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex justify-center mt-4">
              <Image
                src={GGicon}
                alt="gg-icon"
                width={40}
                height={40}
                className="border border-black p-2"
              />
            </div>
            <div className="text-center mt-10">
              <span>Don't have an account? </span>
              <Link href="/sign-up" className="font-bold link-underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
