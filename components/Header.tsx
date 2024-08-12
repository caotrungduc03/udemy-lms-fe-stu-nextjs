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
  const { isLoading, error } = useGetAuthDataQuery(
    {
      accessToken: token || '',
    },
    {
      skip: !!user || !token,
    },
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
        <span className="header-item">Categories</span>
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
        {user ? (
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
                      <Link href="/" className="dropdown-item">
                        Settings
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
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
