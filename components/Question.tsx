'use client';

import {
  updateQuestionCorrectAnswers,
  updateQuestionPoint,
  updateQuestionTitle,
  updateQuestionType,
} from '@/lib/features/question/formSlice';
import { RootState } from '@/lib/store';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Edit from './Edit';
import MultipleChoices from './qtypes/MultipleChoices';
import ShortAnswer from './qtypes/ShortAnswer';
import SingleChoice from './qtypes/SingleChoice';

const data = [
  {
    title: 'SHORT_ANSWER',
    file: <ShortAnswer />,
  },
];

const Question = ({
  index,
  value,
  addQuestion,
  handleDelete,
  isActiveQuestion,
  onclick,
}: {
  index: number;
  value: {
    questionTitle: string;
    questionType: string;
    answers?: string[];
    correctAnswers?: string[];
    maxPoint: number;
  };
  addQuestion: () => void;
  handleDelete: () => void;
  isActiveQuestion: boolean;
  onclick: any;
}) => {
  const dispatch = useDispatch();
  const { questionTitle, questionType, correctAnswers = [], maxPoint } = value;

  const handleChange = (newValue: string) => {
    dispatch(updateQuestionTitle({ index, questionTitle: newValue }));
  };

  const handleTypeChange = (value: string) => {
    dispatch(updateQuestionType({ index, questionType: value }));
  };

  const handleCorrectAnswersChange = (value: string[]) => {
    dispatch(
      updateQuestionCorrectAnswers({
        index,
        questionCorrectAnswers: value,
      }),
    );
  };

  const handlePointChange = (newValue: string) => {
    const parsedValue = parseInt(newValue);
    if (isNaN(parsedValue)) {
      dispatch(updateQuestionPoint({ index, maxPoint: 0 }));
    } else {
      dispatch(updateQuestionPoint({ index, maxPoint: parsedValue }));
    }
  };

  const activeQuestionIndex = useSelector(
    (state: RootState) => state.form.activeQuestionIndex,
  );

  const qType = data.find((elem) => elem.title === questionType);

  return (
    <div
      onClick={onclick}
      className="flex md:flex-row flex-col justify-center items-center w-full max-w-3xl mx-auto"
    >
      <div
        className={`rounded-md my-6 ${
          activeQuestionIndex === index
            ? 'border-l-4 border-[#29A0B1]'
            : 'border border-gray-300'
        } bg-white max-w-2xl shadow w-full grid place-items-center lg:place-items-start lg:ml-10 mx-auto`}
      >
        <div className="w-full md:px-6 px-2 flex md:flex-row flex-col md:justify-between justify-center items-center gap-8 py-6">
          <input
            type="text"
            value={questionTitle}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Question"
            required
            className="text-base px-4 outline-none capitalize border-b bg-gray-100 focus:border-b-2 border-gray-400 pt-3 pb-2 w-full focus:border-[#29A0B1]"
          />
          <Select
            placeholder="Select Question Type"
            style={{ width: 300 }}
            onChange={handleTypeChange}
            value={questionType}
            options={[
              { value: 'MULTIPLE_CHOICE', label: 'Multiple choices' },
              { value: 'SINGLE_CHOICE', label: 'Single choice' },
              { value: 'SHORT_ANSWER', label: 'Short Answer' },
            ]}
          />
        </div>
        {questionType === 'MULTIPLE_CHOICE' && (
          <MultipleChoices
            selectedOptions={correctAnswers}
            onOptionsSelect={handleCorrectAnswersChange}
          />
        )}
        {questionType === 'SINGLE_CHOICE' && (
          <SingleChoice
            selectedOption={correctAnswers[0] || null} // Lấy lựa chọn đúng đầu tiên hoặc null
            onOptionSelect={(value) =>
              handleCorrectAnswersChange(value ? [value] : [])
            } // Chuyển đổi giá trị vào hàm callback
          />
        )}
        {qType &&
          questionType !== 'MultipleChoices' &&
          questionType !== 'SingleChoice' && (
            <div className="w-full">{qType.file}</div>
          )}
        <div className="w-full md:px-6 px-2 flex md:flex-row flex-col md:justify-between justify-center items-center gap-8 py-6">
          <input
            type="text"
            value={maxPoint}
            onChange={(e) => handlePointChange(e.target.value)}
            placeholder="Point"
            className="text-base px-4 outline-none capitalize border-b bg-gray-100 focus:border-b-2 border-gray-400 pt-3 pb-2 focus:border-[#29A0B1]"
          />
        </div>
      </div>
      {isActiveQuestion && (
        <Edit handleAdd={addQuestion} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default Question;
