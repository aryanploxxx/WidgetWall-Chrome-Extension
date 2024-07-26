import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const Player = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const embedRef = useRef(null);

  const categories = [
    { name: "Deep Focus", playlistId: "37i9dQZF1DWZeKCadgRdKQ" },
    { name: "Relaxation music", playlistId: "37i9dQZF1DWXe9gFZP0gtP" },
    { name: "Calm your mind", playlistId: "37i9dQZF1DWWQRwui0ExPn" },
    { name: "Instrumental", playlistId: "37i9dQZF1DX4sWSpwq3LiO" },
    { name: "Play random music", playlistId: "37i9dQZF1DXcBWIGoYBM5M" }
  ];

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'playback_update') {
        setIsPlaying(event.data.payload.isPaused === false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const playCategory = (index) => {
    setActiveCategory(index);
    setIsPlaying(true);
    if (embedRef.current) {
      embedRef.current.contentWindow.postMessage({ command: 'play' }, '*');
    }
  };

  const togglePlayPause = () => {
    if (embedRef.current) {
      embedRef.current.contentWindow.postMessage({ command: 'toggle' }, '*');
    }
  };

  return (
    // <div className="h-full flex justify-center items-start overflow-auto p-4">
      <div className="w-full max-w-sm">
        <div className="mb-3">
          <iframe
            ref={embedRef}
            src={`https://open.spotify.com/embed/playlist/${categories[activeCategory].playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="100"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg shadow-sm"
          ></iframe>
        </div>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => playCategory(index)}
              className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                activeCategory === index ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-gray-700 text-sm font-medium">{category.name}</span>
              {activeCategory === index ? (
                isPlaying ? (
                  <Pause
                    className="h-4 w-4 text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                  />
                ) : (
                  <Play className="h-4 w-4 text-gray-600" />
                )
              ) : (
                <Play className="h-4 w-4 text-gray-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    // </div>

  );
};

export default Player;