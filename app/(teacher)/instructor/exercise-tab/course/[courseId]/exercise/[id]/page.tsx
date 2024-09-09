import avt from '@/public/fakeImage/customer.png';
import headerBg from '@/public/fakeImage/header-bg.jpg';
import Image from 'next/image';
const data = [
  {
    id: 16,
    status: true,
    course: {
      id: 2,
      courseName: 'English for everyone updated',
      description: '',
      coverImage:
        'http://res.cloudinary.com/dfy7njmck/image/upload/v1724228062/s3rtu4hgrvzykadzvyw1.png',
      priceType: 'paid',
      price: 49.99,
      language: 'English',
      status: true,
      lastUpdate: '21/08/2024',
      author: {
        id: 1,
        fullName: 'Supper Admin',
        avatar:
          'http://res.cloudinary.com/dfy7njmck/image/upload/v1723541546/gcsb1pfbsznbvrvprbrj.png',
      },
    },
    percentage: 0,
  },
  {
    id: 15,
    status: true,
    course: {
      id: 24,
      courseName: 'Handcrafted Rubber Bike',
      description:
        'Quasi dignissimos sit facere provident et consequatur omnis atque adipisci.',
      coverImage:
        'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E',
      priceType: 'free',
      price: 0,
      language: 'English',
      status: true,
      lastUpdate: '23/08/2024',
      author: {
        id: 1,
        fullName: 'Supper Admin',
        avatar:
          'http://res.cloudinary.com/dfy7njmck/image/upload/v1723541546/gcsb1pfbsznbvrvprbrj.png',
      },
    },
    percentage: 30,
  },
];

export default function Exercise() {
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
          Lesson details
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
