import Image from "next/image";

export default function Login() {
  return (
    <div className=' w-full py-14 flex items-center h-screen'>
            <div className=' w-full flex flex-col justify-center items-center'>
                <form className='login flex flex-col px-10 bg-slate-200 py-10 w-4/12 rounded-lg '>
                    <h1 className=" font-extrabold flex items-center justify-center text-purple-500 text-4xl font-RobotoMono">Login Page</h1>
                    <label htmlFor="email" className=' p-1 m-2 font-raleway text-2xl text-gray-700'>Email</label>
                    <input type="email" name="email"  className=' p-3 m-2 rounded-md bg-zinc-50' />
                    <label  className=' p-1 m-2 font-raleway text-2xl text-gray-700'>Password</label>
                    <input type="password" name="password"  className=' p-3 m-1 rounded-md bg-zinc-50' />
                    <button  className='font-bold rounded-md m-1 p-3 font-RobotoMono border-none my-5 bg-slate-500 hover:transition-all hover:bg-[#7dd3fc]'>Login</button>
                    <button type="submit" className='gap-3 flex justify-center rounded-md m-1 p-3 font-RobotoMono border-none my-5 bg-slate-500 hover:transition-all hover:bg-[#f87171]'>
                      <svg  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible" /></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg>
                      <p className="font-bold">Login With Google</p>
                    </button>
                </form>
            </div>
      </div>
  );
}
