import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const ToggleComponent = ({ componentName }) => {
  const [isVisible, setIsVisible] = useState(
    JSON.parse(localStorage.getItem(componentName)) ?? true
  );

  useEffect(() => {
    localStorage.setItem(componentName, JSON.stringify(isVisible));
  }, [isVisible, componentName]);

  return (
    <div className='px-5 py-2 bg-white  text-sm rounded-lg mb-2 poppins-medium border-2 border-collapse'>
      <button className='flex flex-row justify-between w-full gap-2 items-center' onClick={() => setIsVisible(!isVisible)}>
        {componentName}
        {isVisible ? <FaMinus /> : <FaPlus />}
      </button>
    </div>
  );
};
  
export default ToggleComponent;