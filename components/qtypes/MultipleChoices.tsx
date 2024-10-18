import { useState } from 'react';

const MultipleChoices = ({
  selectedOptions,
  onOptionsSelect,
  answers,
}: {
  selectedOptions: string[];
  onOptionsSelect: (value: string[]) => void;
  answers: (value: string[]) => void; // Nhận hàm callback từ component cha
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      onOptionsSelect([...selectedOptions, value]); // Thêm vào danh sách lựa chọn
    } else {
      onOptionsSelect(selectedOptions.filter((option) => option !== value)); // Xóa khỏi danh sách lựa chọn
    }
  };

  const handleOptionNameChange = (index: number, newName: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = newName;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption.trim()]);
      answers([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const deleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    // Cập nhật lại các lựa chọn đã chọn khi xóa một lựa chọn
    setOptions(selectedOptions.filter((option) => option !== options[index]));
    answers(selectedOptions.filter((option) => option !== options[index]));
  };

  return (
    <div className="w-full px-6 py-4 mb-6">
      <div className="mb-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`option-${index}`}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionNameChange(index, e.target.value)}
              className="text-base font-medium mr-2"
            />
            <button
              type="button"
              onClick={() => deleteOption(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        placeholder="New option name"
        className="mb-2 px-2 py-1 border rounded"
      />
      <button
        type="button"
        onClick={addOption}
        className="ml-2 text-[#29A0B1] hover:text-[#1d7987] focus:outline-none"
      >
        Add Option
      </button>
    </div>
  );
};

export default MultipleChoices;
