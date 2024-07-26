// sk-proj-74y4wbu0iXlg2DgvSIDGT3BlbkFJgJnCaghDPrb5wWuY23Dn

import { useState } from 'react';
import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Replace with the desired model endpoint
const OPENAI_API_KEY = 'sk-proj-74y4wbu0iXlg2DgvSIDGT3BlbkFJgJnCaghDPrb5wWuY23Dn'; // Replace with your OpenAI API key

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    try {
      // Send message to OpenAI
      const response = await axios.post(
        OPENAI_API_URL,
        {
          prompt: input,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Get and add bot response to chat
      const botMessage = response.data.choices[0].text.trim();
      setMessages([...messages, { text: input, sender: 'user' }, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      setMessages([...messages, { text: input, sender: 'user' }, { text: 'Sorry, there was an error.', sender: 'bot' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      handleSendMessage();
    }
  };

  return (
    <div className='w-[30%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
      <div className="m-4 w-80">
        <span className='text-lg poppins-bold'>Chat Bot</span>
        <div className="h-80 overflow-y-scroll mb-4 p-2 border border-gray-300 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'bot' ? 'text-blue-500' : 'text-green-500'}`}>
              <div className={`p-2 rounded-lg ${msg.sender === 'bot' ? 'bg-blue-100' : 'bg-green-100'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 p-2 rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
