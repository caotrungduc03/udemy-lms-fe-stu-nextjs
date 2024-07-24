// // pages/signup.tsx
// "use client";  // Chỉ thị này cần được thêm vào đầu tệp
import Image from "next/image";
import GGicon from '../public/gg-icon.png';
import Logo from '../public/logo.png';
const Signin: React.FC = () => {
  return (
    <>

      <div className="md:grid md:grid-cols-2 md:justify-end">
        <div className="flex justify-center ml-10">
          <Image
          src={Logo}
          alt="img"
          />
        </div>
        <div className="flex items-center justify-center p-5">
          <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h1 className="font-bold text-center text-3xl mb-10">Log in Udemy</h1>
            <div className="mb-2">
              <input
              placeholder="Email"
                type="email"
                name="email"
                required
                className = "w-full p-2 border border-black"
              />
            </div>
            <div className="mb-2">
              <input
                placeholder="Password"
                type="password"
                name="password"
                required
                className = "w-full p-2 border border-black"
              />
            </div>
            <button type="submit" className="bg-purple-500 text-white w-full p-2 mb-10 font-bold">Log in</button>
            <div className="text-center">
              <span>or </span>
              <span className="underline text-purple-700 font-bold">Forgot Password</span>
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
                height={40} // Cần thêm thuộc tính height để duy trì tỷ lệ ảnh
                className="border border-black p-2"
              />
            </div>
            <div className="text-center mt-10">
              <span>Don't have an account? </span>
              <button className="font-bold underline text-purple-700">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
