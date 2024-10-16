'use client';
import { Card } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
interface Card {
  desc: string;
  img: string;
  name: string;
  lastUpdate: string;
  price: number;
  id: number;
}

const Cards: React.FC<Card> = ({ desc, img, name, lastUpdate, price, id }) => {
  const path = usePathname();
  const router = useRouter();
  const handleClick = (id: any) => {
    if (path.includes('student-tab')) {
      router.push(`/instructor/student-tab/course/${id}/list-students`);
    } else if (path.includes('lesson-tab')) {
      router.push(`/instructor/lesson-tab/course/${id}/list-lessons`);
    } else {
      router.push(`/instructor/exercise-tab/course/${id}/list-exercises`);
    }
  };
  return (
    <div>
      <Card
        className="w-[300px] h-[400px] hover:scale-105 transition rounded-lg duration-200 cursor-pointer"
        onClick={() => handleClick(id)}
        renderImage={() => (
          <img className="object-cover max-h-40" src={img} alt="img" />
        )}
      >
        <h5 className="text-lg overflow-hidden font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-900 dark:text-white first-line: text-ellipsis line-clamp-2">
          {desc}
        </span>
        <span className="text-sm text-gray-900 dark:text-white">
          Last update: <p className="font-bold">{lastUpdate}</p>
        </span>
        <div className="flex">
          <span className="text-sm text-gray-900 dark:text-white">
            Price: <p className="font-bold">${price}</p>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Cards;
