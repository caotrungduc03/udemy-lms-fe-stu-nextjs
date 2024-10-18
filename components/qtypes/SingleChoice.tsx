import { useEffect, useState } from 'react';

const SingleChoice = ({
  selectedOption,
  onOptionSelect,
  answers, // This should be passed as an array of strings
  onAnswersChange, // Added to handle the change in answers from the parent
}: {
  selectedOption: string | null;
  onOptionSelect: (value: string | null) => void; // Callback to handle selected option
  answers: string[]; // Expecting an array of strings from the parent
  onAnswersChange: (value: string[]) => void; // Callback to update answers array
}) => {
  const [options, setOptions] = useState<string[]>(answers); // Initialize with passed answers
  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    // Keep the options in sync with answers prop when it changes
    setOptions(answers);
  }, [answers]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onOptionSelect(value); // Call the callback when the selected option changes
  };

  const handleOptionNameChange = (index: number, newName: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = newName;
    setOptions(updatedOptions);
    onAnswersChange(updatedOptions); // Update the parent with new answers
  };

  const addOption = () => {
    if (newOption.trim() !== '') {
      const updatedOptions = [...options, newOption.trim()];
      setOptions(updatedOptions);
      onAnswersChange(updatedOptions); // Add the new option to the answers array
      setNewOption('');
    }
  };

  const deleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    onAnswersChange(updatedOptions); // Remove option from answers array
    // If the deleted option is the selected one, reset selectedOption to null
    if (selectedOption === options[index]) {
      onOptionSelect(null); // Reset selected option
    }
  };

  return (
    <div className="w-full px-6 py-4 mb-6">
      <div className="mb-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              id={`option-${index}`}
              name="single-choice" // Group the radio buttons
              value={option}
              checked={selectedOption === option}
              onChange={handleRadioChange}
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

export default SingleChoice;
