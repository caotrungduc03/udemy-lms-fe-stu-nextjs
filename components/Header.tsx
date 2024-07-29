'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  MdLanguage,
  MdOutlineFavoriteBorder,
  MdOutlineNotifications,
  MdOutlineShoppingCart,
  MdSearch,
} from 'react-icons/md';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <header className="z-10 flex items-center justify-between shadow-lg px-6">
      <Link href={'/'} className="pr-2">
        <Image
          src={'/logo-udemy.svg'}
          width={91}
          height={34}
          alt={'Udemy Logo'}
          loading={'lazy'}
        />
      </Link>
      <nav className="flex-1 flex items-center justify-between">
        <span className="header-item">Categories</span>
        <div className="flex-1 h-12 mx-3 border border-solid border-primary rounded-full bg-gray-50">
          <form className="flex items-center h-full pr-6">
            <button
              className="btn btn-large btn-ghost heading-sm btn-disabled btn-icon btn-icon-large"
              type="submit"
            >
              <MdSearch className="icon icon-medium text-primary" />
            </button>
            <input
              className="text-input flex-1 border-0 pl-1 bg-transparent text-sm focus:outline-none"
              placeholder="Search for anything"
            ></input>
          </form>
        </div>
        <span className="header-item">Udemy Business</span>
        {user ? (
          <>
            <span className="header-item">Instructor</span>
            <span className="header-item">My learning</span>
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
            <Link
              href={'/profile'}
              className="btn btn-large btn-ghost heading-sm btn-icon btn-icon-large"
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  width={32}
                  height={32}
                  alt="img"
                  loading="lazy"
                />
              ) : (
                <span>{user.fullName.split(' ')[0][0].toUpperCase()}</span>
              )}
            </Link>
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
