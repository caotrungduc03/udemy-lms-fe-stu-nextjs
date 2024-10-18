import { useState } from 'react';

const MultipleChoices = ({
  selectedOptions,
  onOptionsSelect,
  answers, // Accept answers as a prop
  onAnswersChange, // Handle answers change from the parent
}: {
  selectedOptions: string[];
  onOptionsSelect: (value: string[]) => void;
  answers: string[]; // answers will now be passed from the parent component
  onAnswersChange: (value: string[]) => void; // Callback to update answers
}) => {
  const [newOption, setNewOption] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      onOptionsSelect([...selectedOptions, value]);
    } else {
      onOptionsSelect(selectedOptions.filter((option) => option !== value));
    }
  };

  const handleOptionNameChange = (index: number, newName: string) => {
    const updatedOptions = [...answers];
    updatedOptions[index] = newName;
    onAnswersChange(updatedOptions); // Update answers with the new name
  };

  const addOption = () => {
    if (newOption.trim() !== '') {
      const updatedOptions = [...answers, newOption.trim()];
      onAnswersChange(updatedOptions); // Add new option to answers
      setNewOption('');
    }
  };

  const deleteOption = (index: number) => {
    const updatedOptions = answers.filter((_, i) => i !== index);
    onAnswersChange(updatedOptions); // Remove option from answers
  };

  return (
    <div className="w-full px-6 py-4 mb-6">
      <div className="mb-4">
        {answers.map((option, index) => (
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
