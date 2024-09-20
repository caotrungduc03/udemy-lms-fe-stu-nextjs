import Image from 'next/image';

const NotFound: React.FC = () => {
  return (
    <main className="flex flex-col justify-center items-center pt-4 px-6 pb-16">
      <Image
        src={'/images/error-desktop-v1.jpg'}
        alt="Not Found"
        width={480}
        height={360}
      />
      <h1 className="mb-5 text-4xl font-bold">
        We can’t find the page you’re looking for
      </h1>
      <a href="/" className="btn btn-medium btn-primary heading-sm rounded-md">
        Back to Home Page
      </a>
    </main>
  );
};

export default NotFound;
