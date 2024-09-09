import { useState } from 'react';

const MultipleChoices = () => {
  const [options, setOptions] = useState(['Option 1', 'Option 2']);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
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
      setNewOption('');
    }
  };

  const deleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setSelectedOptions(
      selectedOptions.filter((option) => option !== options[index]),
    );
  };

  return (
    <div className="w-full px-6 py-4 mb-6">
      <div className="mb-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`option-${index}`}
              name="multiple-choice"
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
