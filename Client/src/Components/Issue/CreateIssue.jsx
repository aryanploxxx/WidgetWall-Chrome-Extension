import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://sea-turtle-app-su3k3.ondigitalocean.app/issues';

const CreateIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [issueId, setIssueId] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      setError('Issue title and description cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        title,
        description,
      });
      setIssueId(response.data.id);
      setTitle('');
      setDescription('');
      setError(null);
    } catch (err) {
      setError('Failed to create issue. Please try again.');
    }
  };

  return (
    <div className='w-[49%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Create an Issue</h2>
        {issueId && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-lg">
            <strong>Issue Created Successfully!</strong>
            <p>Your issue ID is: <span className="font-bold">{issueId}</span></p>
          </div>
        )}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Issue Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter issue title..."
            />
          </div>
          <div className="mb-4 w-96">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Issue Description</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Describe the issue here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
