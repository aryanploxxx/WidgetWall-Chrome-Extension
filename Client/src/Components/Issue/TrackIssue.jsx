import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://sea-turtle-app-su3k3.ondigitalocean.app/issues';

const TrackIssue = () => {
  const [issueId, setIssueId] = useState('');
  const [issueDetails, setIssueDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackIssue = async () => {
    if (issueId.trim() === '') {
      setError('Issue ID cannot be empty.');
      setIssueDetails(null);
      return;
    }

    try {
      const { data } = await axios.get(API_URL);
      const issue = data.issues.find(issue => issue.id === issueId);

      if (issue) {
        setIssueDetails(issue);
        setError(null);
      } else {
        setIssueDetails(null);
        setError('Issue not found.');
      }
    } catch (err) {
      setError('Failed to fetch issues. Please try again.');
    }
  };

  return (
    <div className='w-[49%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
      <div className="max-w-md mx-auto p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Track an Issue</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className="mb-4">
          <input
            type="text"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            placeholder="Enter issue ID..."
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <button
            onClick={handleTrackIssue}
            className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Track Issue
          </button>
        </div>
        {issueDetails && (
          <div className="p-4 bg-gray-100 border rounded-lg">
            <h3 className="text-lg font-bold">Issue Details</h3>
            <p><strong>ID:</strong> {issueDetails.id}</p>
            <p><strong>Title:</strong> {issueDetails.title}</p>
            <p><strong>Status:</strong> {issueDetails.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackIssue;
