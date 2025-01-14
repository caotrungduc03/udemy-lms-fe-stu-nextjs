'use client';

import Loading from '@/components/Loading';
import { addSubmission } from '@/lib/features/exercise/exerciseSlice';
import { addExerciseId } from '@/lib/features/progress/progressSlice';
import { useCreateSubmissionMutation } from '@/lib/features/submission/submissionApi';
import { AnswerSubmission } from '@/lib/features/submission/submissionSlice';
import { RootState } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const questionTypeLabels: Record<string, string> = {
  SINGLE_CHOICE: 'Select one answer',
  MULTIPLE_CHOICE: 'Select multiple answers',
  SHORT_ANSWER: 'Write short answer',
};

const SubmissionPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { general } = useSelector((state: RootState) => state.exercise);
  const { progressExerciseId, tryCount, questions, isDoingSubmission } =
    useSelector((state: RootState) => state.submission);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [trigger] = useCreateSubmissionMutation();
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDoingSubmission) {
      router.push(pathName.split('/').slice(0, -1).join('/'));
    }
  }, [isDoingSubmission, general]);

  const handleFinishSubmission = async (data: any) => {
    try {
      if (confirm('Are you sure you want to submit?')) {
        const submission: AnswerSubmission[] = [];
        Object.keys(data).forEach((key) => {
          const keys = key.split('-');
          const questionId = Number(keys[1]);

          submission.push({
            questionId,
            answers: [data[key]],
          });
        });
        const res = await trigger({
          progressExerciseId,
          submission,
          accessToken,
        }).unwrap();

        if (res.statusCode === 201) {
          toast.success('Submitted successfully');
          dispatch(addExerciseId(general.id));
          dispatch(addSubmission(res.data));
        } else {
          toast.error(res.message);
        }
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? questions?.length - 1 : prevIndex - 1,
    );
  };

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === questions?.length - 1 ? 0 : prevIndex + 1,
    );
  };

  if (!general || !questions || !tryCount) {
    return <Loading />;
  }

  return (
    <div className="w-[1000px]">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex mr-6">
            <span className="mr-3">Question Number:</span>
            <span className="font-bold">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
          <div className="flex mr-6">
            <span className="mr-3">Total tries:</span>
            <span className="font-bold">
              {tryCount}/{general.maxTries}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex mr-6">
            <span className="mr-3">Time Remaining:</span>
            <span className="font-bold">{general.duration}'</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFinishSubmission)}>
        {questions?.length ? (
          questions.map((question: any, index: number) => (
            <div
              key={question.id}
              className={currentIndex === index ? 'block' : 'hidden'}
            >
              <div className="my-10">
                <h2 className="mb-5 text-2xl">
                  {index + 1}. {question.questionTitle}
                </h2>
                <p>({questionTypeLabels[question.questionType]})</p>
              </div>
              <div className="flex w-full flex-wrap">
                {question.answers.map((answer: any, index: number) => (
                  <div
                    key={index}
                    className="w-1/2 flex justify-between px-3 mb-4"
                  >
                    <label
                      htmlFor={`question-${question.id}-answer-${index}`}
                      className="flex items-center w-full border border-black rounded-md px-4 py-3 cursor-pointer"
                    >
                      <input
                        {...register(`question-${question.id}-answer`)}
                        id={`question-${question.id}-answer-${index}`}
                        type="radio"
                        value={answer}
                      />
                      <span className="flex-1 ml-2">{answer}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="my-10 text-center">No questions</div>
        )}
        <div className="flex gap-3 justify-center mt-10">
          {currentIndex > 0 && (
            <button
              type="button"
              className="btn btn-medium btn-primary heading-sm rounded-md"
              onClick={handlePrevQuestion}
            >
              Previous
            </button>
          )}
          {(questions.length === 0 ||
            (questions.length > 0 &&
              currentIndex === questions.length - 1)) && (
            <button
              type="submit"
              className="btn btn-medium btn-primary heading-sm rounded-md"
            >
              Submit
            </button>
          )}
          {currentIndex < questions.length - 1 && (
            <button
              type="button"
              className="btn btn-medium btn-primary heading-sm rounded-md"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubmissionPage;
