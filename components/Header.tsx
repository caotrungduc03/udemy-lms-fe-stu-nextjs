'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  MdLanguage,
  MdOutlineFavoriteBorder,
  MdOutlineNotifications,
  MdOutlineShoppingCart,
  MdSearch,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useGetAuthDataQuery } from '../lib/features/auth/authApi';
import { getToken, removeToken } from '../lib/tokens';
import { categories } from './categories';
interface SearchFormData {
  search: string;
}

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const [token, setToken] = useState('');
  const { user } = useSelector((state: any) => state.auth);
  // console.log(user);
  const handleLogout = () => {
    removeToken();
    window.location.href = '/log-in';
  };
  const { isLoading, isFetching, isSuccess, error } = useGetAuthDataQuery(
    {
      accessToken: token || '',
    },
    // {
    //   skip: !!user || !token,
    // },
  );

  useEffect(() => {
    setToken(getToken());
  }, [token]);

  const { register, handleSubmit } = useForm<SearchFormData>();

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    const searchURL = `/search?query=${encodeURIComponent(data.search)}`;
    // window.location.href = searchURL;
    router.push(searchURL);
  };
  if (isLoading || isFetching) {
    return (
      <div className="animate-pulse z-10 flex items-center shadow-lg">
        <header className="bg-slate-200 w-full h-[88px] flex items-center justify-center">
          <Image
            src={'/logo-udemy.svg'}
            width={91}
            height={34}
            alt={'Udemy Logo'}
            priority={true}
          />
        </header>
      </div>
    );
  }
  return (
    <header className="z-10 flex items-center justify-between shadow-lg px-6">
      {/* <h1>{user?.role?.roleName}</h1> */}
      <Link href={'/'} className="pr-2">
        <Image
          src={'/logo-udemy.svg'}
          width={91}
          height={34}
          alt={'Udemy Logo'}
          priority={true}
        />
      </Link>
      <nav className="flex-1 flex items-center justify-between">
        <div className="p-2">
          <div className="group/main inline-block relative">
            <button className="inline-flex items-center">
              <span className="header-item">Categories</span>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </button>
            <ul className="absolute hidden pt-1 w-48 group-hover/main:block bg-white border border-gray-200">
              {categories.map((category, index) => (
                <li key={index} className="group/item">
                  <a
                    className="flex items-center my-3 px-3 text-sm text-primary hover:text-[#412885] hover:cursor-pointer"
                    href="#"
                  >
                    {category.name}
                  </a>
                  <ul className="absolute hidden w-48 bg-white border border-gray-200 group-hover/item:block top-0 left-48">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <li
                        key={subIndex}
                        className="flex items-center my-3 px-3 text-sm text-primary hover:text-[#412885] hover:cursor-pointer"
                      >
                        {subcategory}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 h-12 mx-3 border border-solid border-primary rounded-full bg-gray-50">
          <form
            className="flex items-center h-full pr-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <button
              className="btn btn-large btn-ghost heading-sm btn-disabled btn-icon btn-icon-large"
              type="submit"
            >
              <MdSearch className="icon icon-medium text-primary" />
            </button>
            <input
              className="text-input flex-1 border-0 pl-1 bg-transparent text-sm focus:outline-none"
              placeholder="Search for anything"
              {...register('search')}
            ></input>
            <Link
              href={{ pathname: '/search', query: { search: 'search' } }}
            ></Link>
          </form>
        </div>
        <span className="header-item">Udemy Business</span>
        {user && isSuccess ? (
          <>
            <span className="header-item">Instructor</span>
            <Link href={'/my-course'}>
              <span className="header-item">My learning</span>
            </Link>
            <Link
              href={'/'}
              className="btn btn-large btn-ghost heading-sm btn-icon btn-icon-large"
            >
              <MdOutlineFavoriteBorder className="icon icon-medium text-primary " />
            </Link>
            <Link
              href={'/cart'}
              className="btn btn-large btn-ghost heading-sm btn-icon btn-icon-large"
            >
              <MdOutlineShoppingCart className="icon icon-medium text-primary " />
            </Link>
            <Link
              href={'/'}
              className="btn btn-large btn-ghost heading-sm btn-icon btn-icon-large"
            >
              <MdOutlineNotifications className="icon icon-medium text-primary " />
            </Link>
            <div className="btn btn-large btn-ghost heading-sm btn-icon btn-icon-large">
              {user.avatar ? (
                <div className="dropdown" onBlur={handleClose}>
                  <img
                    src={user.avatar}
                    alt="img"
                    loading="lazy"
                    className="avatar"
                    onClick={handleToggle}
                  />
                  {open && (
                    <div className="dropdown-menu">
                      <Link href="/user" className="dropdown-item">
                        User Profile
                      </Link>
                      <Link href="/notifications" className="dropdown-item">
                        Settings
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <span className="avatar">
                  {user.fullName.split(' ')[0][0].toUpperCase()}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <span className="header-item">Teach on Udemy</span>
            <Link
              href={'/cart'}
              className="btn btn-large btn-ghost heading-sm btn-icon btn-icon-large"
            >
              <MdOutlineShoppingCart className="icon icon-medium text-primary " />
            </Link>
            <Link
              href={'/log-in'}
              className="btn btn-medium btn-secondary heading-sm w-[80px] ml-2"
            >
              Log in
            </Link>
            <Link
              href={'/sign-up'}
              className="btn btn-medium btn-primary heading-sm w-[80px] ml-2"
            >
              Sign up
            </Link>
            <button className="btn btn-medium btn-secondary heading-sm btn-icon btn-icon-medium ml-2">
              <MdLanguage className="icon icon-small text-primary" />
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
