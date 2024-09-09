import avt from '@/public/fakeImage/customer.png';
import headerBg from '@/public/fakeImage/header-bg.jpg';
import Image from 'next/image';

export default function Student() {
  return (
    <>
      <div
        className="bg-cover bg-center bg-gray-100 flex items-center opacity-80 mt-2"
        style={{
          backgroundImage: `url(${headerBg.src})`,

          height: '20%',
        }}
      >
        <h1 className="font-medium text-white text-4xl pl-10">
          Student Profile
        </h1>
      </div>
      <div className="h-screen flex items-start justify-center mt-10">
        <div className="bg-white w-full max-w-4xl border border-gray-300 rounded-lg p-8 shadow-lg">
          <div className="flex mb-5">
            <Image
              src={avt}
              alt="User"
              className="rounded-full cursor-pointer aspect-square object-cover"
              width={100}
              height={100}
            />
            <div>
              <h1 className="font-bold text-4xl pt-5 pl-5">Le Truong</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 space-x-5">
            <div className="col-span-1 border border-gray-200 rounded-lg p-5">
              <h1 className="text-lg pb-5">Personal details</h1>
              <div className="flex flex-col">
                <label className="font-bold text-lg">Email:</label>
                <span>abcd@gmail.com</span>
                <label className="font-bold text-lg">Phone number:</label>
                <span>0123456789</span>
                <label className="font-bold text-lg">Address: </label>
                <span>so nha 31, ngo 129, ngach 37, Tran Duy Hung, Ha Noi</span>
              </div>
            </div>
            <div className="col-span-1 border border-gray-200 rounded-lg p-5">
              <h1 className="text-lg pb-5">Classroom details</h1>
              <div className="flex flex-col">
                <label className="font-bold text-lg">Classroom:</label>
                <span>Lop hoc sat thu</span>
                <label className="font-bold text-lg">Date entry:</label>
                <span>02/09/2024</span>
                <label className="font-bold text-lg">Status: </label>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 w-14 text-white">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
