import { useState, useEffect, useRef } from 'react';
import './FloatingEmoji.css';

const emojis = ['😀', '😅', '😍', '😎', '🤔'];

const FloatingEmoji = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeEmojis, setActiveEmojis] = useState([]);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const addEmoji = (emoji) => {
    const newEmojis = [];
    const numEmojis = Math.floor(Math.random() * 5) + 1; // Random number of emojis between 1 and 5
    for (let i = 0; i < numEmojis; i++) {
      newEmojis.push({
        id: Math.random(),
        emoji: emoji,
        left: Math.random() * 90 + '%',
        top: '100%',
        size: Math.random() * 50 + 20 + 'px',
      });
    }
    setActiveEmojis((prev) => [...prev, ...newEmojis]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEmojis((prevEmojis) =>
        prevEmojis.map((e) => ({
          ...e,
          top: parseFloat(e.top) - 2 + '%',
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button className="floating-button" onClick={togglePopup}>
        😊
      </button>
      {isOpen && (
        <div className="emoji-popup" ref={popupRef}>
          {emojis.map((emoji) => (
            <div key={emoji} className="emoji-item" onClick={() => addEmoji(emoji)}>
              {emoji}
            </div>
          ))}
        </div>
      )}
      {activeEmojis.map((e) => (
        <div
          key={e.id}
          className="floating-emoji"
          style={{ left: e.left, top: e.top, fontSize: e.size }}
        >
          {e.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
