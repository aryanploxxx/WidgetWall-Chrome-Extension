import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_API_URL = 'https://sea-turtle-app-su3k3.ondigitalocean.app/api/news'; // URL of your backend endpoint

function NewsComponent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(BACKEND_API_URL);
        console.log(response);
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className='w-[68%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
      <div className="p-4 max-w-3xl mx-auto rounded">
        <h1 className="text-xl font-bold mb-4">Latest News</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            {articles.map((article, index) => (
              <li key={index} className="border-b pb-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <h2 className="text-lg font-semibold">{article.title}</h2>
                </a>
                <p className="text-sm text-gray-600">{article.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NewsComponent;
