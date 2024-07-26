/* eslint-disable react/prop-types */
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Poll({ question, options }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [results, setResults] = useState(options.reduce((acc, option) => ({ ...acc, [option]: Math.floor(Math.random() * 10) }), {})); // Random initial data

  const handleVote = () => {
    if (selectedOption) {
      setResults(prevResults => ({
        ...prevResults,
        [selectedOption]: prevResults[selectedOption] + 1
      }));
      setSelectedOption('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto  rounded mb-4">
      <h1 className="text-xl font-bold mb-4">{question}</h1>
      <div className="mb-4">
        {options.map(option => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              id={option}
              name={question}
              value={option}
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mr-2"
            />
            <label htmlFor={option} className="text-lg">{option}</label>
          </div>
        ))}
      </div>
      <button
        onClick={handleVote}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Vote
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Results:</h2>
        <ul>
          {options.map(option => (
            <li key={option} className="mb-2">
              {option}: {results[option]} votes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PollsContainer() {
  const polls = [
    {
      question: 'What is your preferred method for team meetings?',
      options: ['In-Person', 'Video Call', 'Phone Call']
    },
    {
      question: 'How often do you prefer to have team-building activities?',
      options: ['Weekly', 'Monthly', 'Quarterly']
    },
  ];

  return (
    <div className='w-[30%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
      <div className="space-y-4">
        {polls.map((poll, index) => (
          <Poll
            key={index}
            question={poll.question}
            options={poll.options}
          />
        ))}
      </div>
    </div>
  );
}

export default PollsContainer;
