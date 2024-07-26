import React from 'react';

function Footer() {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Widget Walls. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
