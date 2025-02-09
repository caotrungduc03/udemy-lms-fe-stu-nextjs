'use client';

import {
  addQuestion,
  deleteQuestion,
  setActiveQuestionIndex,
  setQuestions,
} from '@/lib/features/question/formSlice';
import {
  useGetQuestionByExerciseIdQuery,
  useUpdateQuestionByExerciseIdMutation,
} from '@/lib/features/question/questionApi';
import { RootState } from '@/lib/store';
import { getToken } from '@/lib/tokens';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Edit from './Edit';
import Loading from './Loading';
import Question from './Question';

const FormUpdate = () => {
  const params = useParams();
  const courseId = params.courseId;
  const dispatch = useDispatch();
  const rexerciseId = Array.isArray(params.id) ? params.id[0] : params.id; // Lấy phần tử đầu tiên nếu là mảng
  const exerciseId = parseInt(rexerciseId, 10);
  const questions = useSelector((state: RootState) => state.form.questions);
  const { data, isFetching } = useGetQuestionByExerciseIdQuery({
    id: exerciseId,
    accessToken: getToken(),
    limit: 100, // hoặc giá trị bạn cần
    sort: 'id:asc', // hoặc giá trị bạn cần
  });
  useEffect(() => {
    if (data) {
      // Chuyển đổi dữ liệu nếu cần và gọi action để cập nhật
      const formattedQuestions = data.data.items.map(
        (question: {
          id: any;
          questionTitle: any;
          questionType: any;
          answers: any;
          correctAnswers: any;
          maxPoint: any;
        }) => ({
          id: question.id,
          questionTitle: question.questionTitle,
          questionType: question.questionType,
          answers: question.answers || [],
          correctAnswers: question.correctAnswers || [],
          maxPoint: question.maxPoint,
        }),
      );

      dispatch(setQuestions(formattedQuestions));
      console.log('aaaaaaaaa', formattedQuestions);
    }
  }, [data, dispatch]);
  const activeQuestionIndex = useSelector(
    (state: RootState) => state.form.activeQuestionIndex,
  );

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleDeleteQuestion = (index: number) => {
    dispatch(deleteQuestion(index));
  };
  const handleQuestionClick = (index: number) => {
    dispatch(setActiveQuestionIndex(index));
  };
  const router = useRouter();
  const [updateQuestion, { isLoading }] =
    useUpdateQuestionByExerciseIdMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formdata = { questions };

    console.log('Form Data:', formdata);

    try {
      // Gọi API tạo câu hỏi
      const result = await updateQuestion({
        data: formdata,
        accessToken: getToken(),
        id: exerciseId,
      }).unwrap();

      // In kết quả trả về từ API để kiểm tra

      if (result) {
        // Hiển thị thông báo thành công
        toast.success('Create questions successfully');

        // Chuyển hướng sau khi thành công
        setTimeout(() => {
          router.push(
            `/instructor/exercise-tab/course/${courseId}/list-exercises`,
          );
        }, 2000);
      }
    } catch (err) {
      console.error('Error:', err);
      // Hiển thị thông báo lỗi
      toast.error('Failed to create exercise');
    }
  };
  if (isFetching) {
    return <Loading />;
  }
  return (
    <div>
      <div className="bg-[#29A0B1]/10 w-full grid mx-auto min-h-screen py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full block mx-auto h-full px-6 md:px-0 overflow-x-hidden"
        >
          <h1 className="font-bold text-2xl text-center">Form Exercise</h1>
          <div className="flex md:flex-row flex-col justify-center items-center max-w-3xl mx-auto">
            <div>
              {questions.length === 0 && (
                <Edit
                  handleAdd={handleAddQuestion}
                  show
                  handleDelete={() =>
                    handleDeleteQuestion(questions.length - 1)
                  }
                />
              )}
            </div>
          </div>
          <div className="relative">
            {questions.map((question, index) => (
              <Question
                onclick={() => handleQuestionClick(index)}
                key={index}
                index={index}
                value={question}
                addQuestion={handleAddQuestion}
                handleDelete={() => handleDeleteQuestion(index)}
                isActiveQuestion={index === activeQuestionIndex}
              />
            ))}
          </div>
          <div>
            {questions.length > 0 && (
              <div className="grid place-items-center w-auto mx-auto">
                {isLoading ? (
                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg dark:focus:ring-blue-900 hover:bg-blue-700"
                  >
                    Update Questions
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdate;
