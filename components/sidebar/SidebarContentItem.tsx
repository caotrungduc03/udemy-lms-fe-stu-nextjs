'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  MdCheck,
  MdOutlineLightbulb,
  MdOutlineOndemandVideo,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../lib/store';

type Props = {
  index: number;
  itemIds: any[];
  item: any;
  type: string;
};

type Params = {
  courseId: string;
  lessonId?: string;
  exerciseId?: string;
};

const SidebarContentItem: React.FC<Props> = ({
  index,
  itemIds,
  item,
  type,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { isDoingSubmission } = useSelector(
    (state: RootState) => state.submission,
  );
  const { courseId }: Params = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const isActive = pathName.includes(`${type}/${item.id}`);

  useEffect(() => {
    if (itemIds.includes(item.id)) {
      setIsChecked(true);
    }
  }, [itemIds, item]);

  const handleClick = (id: number) => {
    if (isDoingSubmission) {
      return toast.warn('Please complete the exercise first');
    }

    router.push(`/course/${courseId}/learning/${type}/${id}`);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={
        'flex justify-between items-start px-4 py-2 hover:bg-[#d1d7dc] cursor-pointer ' +
        (isActive ? 'bg-[#d1d7dc]' : '')
      }
      onClick={() => handleClick(item.id)}
    >
      <div className="mr-4">
        <label htmlFor={`${type}-checkbox-` + index} className="flex">
          <input
            id={`${type}-checkbox-` + index}
            type="checkbox"
            className="real-toggle-input"
            checked={isChecked}
            onChange={handleChange}
          />
          <MdCheck className="icon icon-xsmall fake-toggle-input fake-toggle-checkbox relative top-1 cursor-pointer" />
        </label>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="mb-1 text-sm">
          {++index +
            '. ' +
            (type === 'lesson' ? item.lessonName : item.exerciseName)}
        </h1>
        <div className="flex justify-start items-center text-xs">
          {type === 'lesson' ? (
            <>
              <MdOutlineOndemandVideo className="icon icon-xsmall" />
              <span className="ml-1">{item.duration} min</span>
            </>
          ) : (
            <>
              <MdOutlineLightbulb className="icon icon-xsmall" />
              <span className="ml-1">
                {item.totalQuestions} questions | {item.duration} min
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarContentItem;
