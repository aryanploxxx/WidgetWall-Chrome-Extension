import {useEffect, useState} from 'react'
import Marquee from './Marquee/Marquee'
import './Navbar.css'
import axios from 'axios';

const SHEET_ID = '1EwC3R41zB8g0jL1tiuLNEKfFmmAJN_ytK5OqLbs3n4Y';
const API_KEY = 'AIzaSyC2m5z17BBdHm9ezt4WU-0IAZr2icjUnRA';
const RANGE = 'Sheet1!A:C';


const Navbar = () => {
    const [name, setName] = useState(window.localStorage.getItem('name') || 'User');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [greeting, setGreeting] = useState('');
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
          const rows = response.data.values;
  
          // Assuming the first row contains column names
          const [columns, ...dataRows] = rows;
  
          // Find the index of the relevant columns
          const headingIndex = columns.indexOf('Announcement');
          const statusIndex = columns.indexOf('Status');
          console.log(statusIndex)
          if (headingIndex === -1 || statusIndex === -1) {
            throw new Error('Required columns are missing');
          }
  
          // Filter rows based on status and extract headings
          const filteredHeadings = dataRows
            .filter(row => row[statusIndex] === 'Active')
            .map(row => row[headingIndex]);
  
          setHeadings(filteredHeadings);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            setTime(formattedTime);
        };
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const currentDate = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        setDate(formattedDate);
    }, []);


    useEffect(() => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      let greetingMessage;
      if(currentHour < 12) {
        greetingMessage = 'Good morning, ';
      } else if(currentHour < 18) {
        greetingMessage = 'Good afternoon, ';
      } else {
        greetingMessage = 'Good evening, ';
      }
  
      setGreeting(greetingMessage);
    }, []);
  
  useEffect(() => {
    const func = () => {
      if (window.localStorage.getItem('name')) {
        setName(window.localStorage.getItem('name'));
      } else {
        const user = prompt('Please enter your name');
        if (user === "" || user === null) {
          alert('Please enter a valid name');
          func();
        }
        window.localStorage.setItem('name', user);
        setName(window.localStorage.getItem('name'));
      }
    }

    func();
  }, [])
  
  
  return (
    <div className='navbar top-0 fixed bg-[#f4f5f7] px-16 w-full h-[10vh] pt-10 pb-10 poppins-medium flex justify-between items-center gap-10'>
        <div className="text-3xl">
            <span>
                {greeting}
            </span>
            <span className="text-[#b0afaf]">
                {name}
            </span>
        </div>

        <div className="overflow-hidden text-white flex flex-wrap gap-4 flex-grow px-3 py-2 text-xl rounded-3xl mask-cont">
          {headings.map((heading, index) => (
            <Marquee key={index} text={heading} />
          ))}
        </div>
        
        <div className="flex flex-col text-right justify-end">
            <div className="text-3xl">{time} </div>
            <div className="text-md text-[#b0afaf]">{date}</div>
        </div>
    </div>
  )
}

export default Navbar