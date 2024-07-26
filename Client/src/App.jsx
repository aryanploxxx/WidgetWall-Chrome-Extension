/* eslint-disable no-unused-vars */
// import { useState } from 'react'

import ReactDOM from 'react-dom';
import React from 'react';
import Player from './Components/musicPlayer/Player';

import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar'
// import Body from './Components/Body/Body'
// import AllWidgets from './pages/AllWidgets'
import { FaPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

import Pomodoro from './Components/pomodoro/Pomodoro'
import Calender from './Components/Calender/Calender';
import Quote from './Components/Quote/Quote';
import DailyStepCount from './Components/Steps/DailyStepCount';
import Sheets from './Components/Sheets/Sheets';
import Forms from './Components/Forms/Forms';
import DailyChecklist from './Components/DailyCheckList/DailyCheckList';
import PollsContainer from './Components/Poll/Poll';
import NewsComponent from './Components/News/News';
import Chatbot from './Components/AiChat/ChatBot';
import CreateIssue from './Components/Issue/CreateIssue';
import TrackIssue from './Components/Issue/TrackIssue';


// eslint-disable-next-line react/prop-types
const ToggleComponent = ({ componentName }) => {
  const [isVisible, setIsVisible] = useState(
    JSON.parse(localStorage.getItem(componentName)) ?? true
  );

  useEffect(() => {
    localStorage.setItem(componentName, JSON.stringify(isVisible));
  }, [isVisible, componentName]);

  return (
    <div className='px-5 py-2 text-sm rounded-lg mb-2 poppins-medium border-2 border-collapse'>
      <button className='flex flex-row justify-between w-full gap-2 items-center' onClick={() => setIsVisible(!isVisible)}>
        {componentName}
        {isVisible ? <FaMinus /> : <FaPlus />}
      </button>
    </div>
  );
};

function App() {
  const components = ['Google Slide', 'Pomodoro Timer', 'Quote', 'Songs', 'Daily Growth Checklist', 'Step Count', 'Calendar', 'Google Spreadsheet', 'Google Forms', 'Poll', 'Chat Bot', 'News Feed', 'Issue Tracker', ];
  return (
    <div className=''>
      <Navbar />

      <div className='mx-10 h-[90vh] pt-10 pb-10 poppins-medium px-5 flex flex-row items-center'>
        {/* Part 1 */}
        <div className='h-full w-[20%] bg-white flex flex-col justify-between items-start mr-5 top-24 left-8 fixed'>
          {/* Listing of components started from here */}
          <div className='w-full'>
            {components.map((name) => (
              <ToggleComponent key={name} componentName={name} />
            ))}
          </div>
        </div>

        {/* Part 2 */}
        <div className='h-full mt-28 ml-[22%] w-[80%] flex flex-row flex-wrap gap-5 rounded-lg'>
          <div className='min-w-[64%] h-[80%] rounded-xl border bg-white'>
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSHU5lCgMJ3Akb8ovraVAAX4v31zv9WtbDghTsP2Om2iLCHxj4hxwq0oGrIZ4CtgQgUcn7Dbetzxu6l/embed?start=false&loop=false&delayms=0"
              className="h-full w-full rounded-lg"
            ></iframe>
          </div>
          <div className='w-[32%] h-[80%] rounded-xl flex flex-col gap-5 justify-between'>
            <div className='w-full h-1/2 rounded-xl border-2 shadow-lg bg-white overflow-hidden'>
              <Pomodoro />
            </div>
            <div className='w-full h-1/2 rounded-xl bg-[#5d7dfc] text-white'>
              <Quote />
            </div>
          </div>
          <div className='w-[97.7%] flex justify-between'>
            <div className='w-[32%] p-5 rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <Player />
            </div>
            <div className='w-[32%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <DailyChecklist />
            </div>
            <div className='w-[33%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <DailyStepCount />
            </div>
          </div>
          <div className='w-[97.7%] flex justify-between'>
            <div className='w-[32%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <Calender />
            </div>
            
            <div className='w-[66.5%] p-5 rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <Sheets />
            </div>
          </div>
          <div className='w-[97.7%] flex justify-between'>
            <div className='w-[68%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <Forms />
            </div>
            <div className='w-[30%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <PollsContainer />
            </div>
          </div>
          <div className='w-[97.7%] flex justify-between'>
            <div className='w-[30%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <Chatbot />
            </div>
            <div className='w-[68%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <NewsComponent />
            </div>
          </div>
          <div className='w-[97.7%] flex justify-between'>
            <div className='w-[49%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <CreateIssue />
            </div>
            <div className='w-[49%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
              <TrackIssue />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App