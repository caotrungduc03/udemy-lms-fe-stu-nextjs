'use client';

import { useGetCategoriesQuery } from '@/lib/features/categories/categoryApi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  MdLanguage,
  MdOutlineFavoriteBorder,
  MdOutlineNotifications,
  MdOutlineShoppingCart,
  MdSearch,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../lib/features/auth/authSlice';
import logoU from '../public/fakeImage/logo-udemy.svg';
interface SearchFormData {
  search: string;
}

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

const Header: React.FC = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { register, handleSubmit } = useForm<SearchFormData>();
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  const { data } = useGetCategoriesQuery<CategoryResponse>();
  console.log(data);
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
  console.log(',', transformedData);

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    const searchURL = `/search?query=${encodeURIComponent(data.search)}`;
    router.push(searchURL);
  };

  return (
    <header className="z-10 flex items-center justify-between shadow-md px-6">
      <Link href={'/'} className="pr-2">
        <Image
          src={logoU}
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
              {transformedData.map((category, index) => (
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
                        {subcategory.categoryName}
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
        {user ? (
          <>
            <Link href="/instructor/course" className="header-item">
              Instructor
            </Link>
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
                <div className="dropdown" onClick={handleToggle}>
                  <img
                    src={user.avatar}
                    alt="img"
                    loading="lazy"
                    className="avatar"
                  />
                  {isOpenDropDown && (
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
