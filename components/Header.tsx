import Image from "next/image";
import Link from "next/link";
import { MdLanguage, MdOutlineShoppingCart, MdSearch } from "react-icons/md";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between shadow-lg px-6 ">
      <Link href={"/"} className="pr-2">
        <Image
          src={"/logo-udemy.svg"}
          width={91}
          height={34}
          alt={"Udemy Logo"}
          loading={"lazy"}
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
        <span className="header-item">Teach on Udemy</span>
        <Link
          href={"/cart"}
          className="btn btn-large btn-ghost heading-sm btn-icon btn-icon-large"
        >
          <MdOutlineShoppingCart className="icon icon-medium text-primary " />
        </Link>
        <button className="btn btn-medium btn-secondary heading-sm w-[80px] ml-2">
          Log in
        </button>
        <button className="btn btn-medium btn-primary heading-sm w-[80px] ml-2">
          Sign up
        </button>
        <button className="btn btn-medium btn-secondary heading-sm btn-icon btn-icon-medium ml-2">
          <MdLanguage className="icon icon-small text-primary" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
