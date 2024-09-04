import { useDispatch, useSelector } from 'react-redux';
import { setIsDoingSubmission } from '../../lib/features/submission/submissionSlice';

const Submission: React.FC = () => {
  const { progressExerciseId } = useSelector((state: any) => state.submission);
  const dispatch = useDispatch();

  return (
    <div className="w-[1000px]">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex mr-6">
            <span className="mr-3">Question Number:</span>
            <span className="font-bold">1/6</span>
          </div>
          <div className="flex mr-6">
            <span className="mr-3">Total tries:</span>
            <span className="font-bold">1/6</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex mr-6">
            <span className="mr-3">Time Remaining:</span>
            <span className="font-bold">45'</span>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="mb-5 text-2xl">1. Tại sao sử dụng Linux?</h2>
        <p>(chọn 1 đáp án)</p>
      </div>
      <div className="flex w-full flex-wrap">
        <div className="w-1/2 flex justify-between px-3 mb-4">
          <div className="flex items-center w-full border border-black rounded-md px-4 py-3">
            <input
              id="answer-1"
              type="radio"
              name="answer"
              defaultChecked={false}
            />
            <label htmlFor="answer-1" className="flex-1 ml-2 cursor-pointer">
              Tối ưu hiệu suất và chi phí
            </label>
          </div>
        </div>
        <div className="w-1/2 flex justify-between px-3 mb-4">
          <div className="flex items-center w-full border border-black rounded-md px-4 py-3">
            <input
              id="answer-2"
              type="radio"
              name="answer"
              defaultChecked={false}
            />
            <label htmlFor="answer-2" className="flex-1 ml-2 cursor-pointer">
              Cài đặt dễ dàng
            </label>
          </div>
        </div>
        <div className="w-1/2 flex justify-between px-3 mb-4">
          <div className="flex items-center w-full border border-black rounded-md px-4 py-3">
            <input
              id="answer-3"
              type="radio"
              name="answer"
              defaultChecked={false}
            />
            <label htmlFor="answer-3" className="flex-1 ml-2 cursor-pointer">
              Bảo mật và ổn định
            </label>
          </div>
        </div>
        <div className="w-1/2 flex justify-between px-3 mb-4">
          <div className="flex items-center w-full border border-black rounded-md px-4 py-3">
            <input
              id="answer-4"
              type="radio"
              name="answer"
              defaultChecked={false}
            />
            <label htmlFor="answer-4" className="flex-1 ml-2 cursor-pointer">
              Khả năng kiểm soát và linh hoạt
            </label>
          </div>
        </div>
        <div className="w-1/2 flex justify-between px-3 mb-4">
          <div className="flex items-center w-full border border-black rounded-md px-4 py-3">
            <input
              id="answer-5"
              type="radio"
              name="answer"
              defaultChecked={false}
            />
            <label htmlFor="answer-5" className="flex-1 ml-2 cursor-pointer">
              Cộng đồng phát triển lớn
            </label>
          </div>
        </div>
        <div className="w-1/2 flex justify-between px-3 mb-4">
          <div className="flex items-center w-full border border-black rounded-md px-4 py-3">
            <input
              id="answer-6"
              type="radio"
              name="answer"
              defaultChecked={false}
            />
            <label htmlFor="answer-6" className="flex-1 ml-2 cursor-pointer">
              Phát triển và cập nhật
            </label>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button
          className="btn btn-medium btn-primary heading-sm rounded-md"
          onClick={() => dispatch(setIsDoingSubmission(false))}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Submission;
