import { useState, useEffect } from 'react';
import axios from 'axios';

const MotivationalQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('https://type.fit/api/quotes');
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching the quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  const nextQuote = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  };

  if (quotes.length === 0) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className='w-full h-1/2 rounded-xl bg-[#5d7dfc] text-white'>
      <div className="text-center p-4 px-8">
        <h1 className="text-2xl font-bold mb-4">Motivational Quotes</h1>
        <blockquote className="text-md italic mb-4">
          &quot;{quotes[currentIndex].text}&quot;
        </blockquote>
        <p className="text-md mb-2">- {quotes[currentIndex].author.split(",")[0] || 'Unknown'}</p>
        <div>
          <button
            onClick={prevQuote}
            className="text-blue-500 bg-white px-4 py-2 rounded mr-2 hover:bg-blue-600 hover:text-white"
          >
            Previous
          </button>
          <button
            onClick={nextQuote}
            className="text-blue-500 bg-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuotes;
