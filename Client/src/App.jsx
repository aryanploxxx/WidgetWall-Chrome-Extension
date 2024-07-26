/* eslint-disable no-unused-vars */
import React from 'react';

import './App.css'

import Navbar from './Components/Navbar/Navbar'
import Player from './Components/musicPlayer/Player';
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
import FloatingEmoji from './Components/FloatingEmoji/FloatingEmoji';
import Sidebar from './Components/Sidebar/Sidebar';
import GoogleSlide from './Components/GoogleSlide/GoogleSlide';
// eslint-disable-next-line react/prop-types

function App() {
  
  return (
    <div>
      <Navbar />
      <FloatingEmoji/>

      <div className='mx-10 h-[90vh] pt-10 pb-10 poppins-medium px-5 flex flex-row items-center'>
        <Sidebar />        

        <div className='h-full mt-28 ml-[22%] w-[80%] flex flex-row flex-wrap gap-5 rounded-lg'>
          <GoogleSlide />
          
          <div className='w-[32%] h-[80%] rounded-xl flex flex-col gap-5 justify-between'>
              <Pomodoro />
              <Quote />
          </div>

          <div className='w-[97.7%] flex justify-between'>
              <Player />
              <DailyChecklist />
              <DailyStepCount />
          </div>

          <div className='w-[97.7%] flex justify-between'>
              <Calender />          
              <Sheets />
          </div>

          <div className='w-[97.7%] flex justify-between'>
              <Forms />
              <PollsContainer />
          </div>

          <div className='w-[97.7%] flex justify-between'>
              <Chatbot />
              <NewsComponent />
          </div>

          <div className='w-[97.7%] flex justify-between'>
              <CreateIssue />
              <TrackIssue />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App