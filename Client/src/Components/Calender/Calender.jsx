import { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns'; // Import format function
import 'react-calendar/dist/Calendar.css'; // Import default styles

function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const tileClassName = ({ view }) => {
    if (view === 'month') {
      return 'h-12 w-12 flex items-center justify-center text-center'; // Reduced height and width
    }
    return '';
  };

  return (
    <div className="max-w-md mx-auto rounded">
      <header className="mb-4">
        <h1 className="text-xl font-bold text-center">{format(date, 'MMMM yyyy')}</h1>
      </header>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={tileClassName}
        className="react-calendar border-none" // Remove border
      />
    </div>
  );
}

export default CustomCalendar;
