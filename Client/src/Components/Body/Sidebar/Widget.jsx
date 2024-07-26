/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ToggleComponent = ({ componentName }) => {
  const [isVisible, setIsVisible] = useState(
    JSON.parse(localStorage.getItem(componentName)) ?? true
  );

  useEffect(() => {
    localStorage.setItem(componentName, JSON.stringify(isVisible));
  }, [isVisible, componentName]);

  return (
    <div className='px-5 py-3 text-xl'>
      <button className='flex flex-row gap-2 items-center justify-between px-2' onClick={() => setIsVisible(!isVisible)}>
        {componentName}
        {
          isVisible ? <FaMinus /> : <FaPlus />
        }
      </button>
    </div>
  );
};

const App = () => {
  const components = ['Google Slide', 'Pomodoro Timer', 'Spotify'];

  return (
    <div>
      {
        components.map((name) => (
          <ToggleComponent key={name} componentName={name} />
        ))
      }
    </div>
  );
};

export default App;
