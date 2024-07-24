// // pages/signup.tsx
// "use client";  // Chỉ thị này cần được thêm vào đầu tệp
import Image from "next/image";
import Logo from '../../public/logo.png';
const Signup: React.FC = () => {
  return (
    <>

      <div className="md:grid md:grid-cols-2 md:justify-end">
        <div className="flex justify-center ml-10">
          <Image
          src={Logo}
          alt="img"
          className="h-full w-auto"
          />
        </div>
        <div className="flex items-center justify-center p-5">
          <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h1 className="font-bold text-center text-3xl mb-10">Sign up and start learning</h1>
            <div className="mb-2">
              <input
              placeholder="Name"
                type="name"
                name="name"
                required
                className = "w-full p-2 border border-black"
              />
            </div>
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
            <button type="submit" className="bg-purple-500 text-white w-full p-2 mb-10 font-bold">Sign up</button>
            <div className="text-center mt-10">
              <span>Already have an account? </span>
              <button className="font-bold underline text-purple-700">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
