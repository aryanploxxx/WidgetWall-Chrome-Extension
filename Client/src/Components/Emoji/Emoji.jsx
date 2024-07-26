import React, { useState } from 'react';
import './EmojiButton.css'; // Ensure this path is correct

function EmojiButton() {
  const [emojis, setEmojis] = useState([]);

  const handleClick = (e) => {
    const emoji = '🎉'; // Example emoji
    const { clientX: x, clientY: y } = e;

    // Calculate the position relative to the viewport
    const emojiX = x - 20; // Center the emoji
    const emojiY = y - 20;

    setEmojis(prevEmojis => [
      ...prevEmojis,
      { emoji, x: emojiX, y: emojiY, id: Date.now() }
    ]);

    // Remove the emoji after the animation is complete
    setTimeout(() => {
      setEmojis(prevEmojis => prevEmojis.filter(emoji => emoji.id !== Date.now()));
    }, 3000); // Match this duration with the animation time
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg fixed bottom-10 right-10 z-50"
      >
        🎈
      </button>
      {emojis.map(({ emoji, x, y, id }) => (
        <div
          key={id}
          className="absolute"
          style={{ left: x, top: y }}
        >
          <span className="floating-emoji text-3xl">{emoji}</span>
        </div>
      ))}
    </div>
  );
}

export default EmojiButton;
