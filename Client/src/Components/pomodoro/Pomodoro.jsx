import { useState, useEffect, useRef } from 'react';
import { Settings, X } from 'lucide-react';
import './Pomodoro.css';

const Pomodoro = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [tab, setTab] = useState('Work');
  const [showSettings, setShowSettings] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [pomodoro, setPomodoro] = useState(1);
  const [timerType, setTimerType] = useState(1); // 1 is work, 0 is break

  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && time > 0) {
      timerRef.current = setTimeout(() => setTime(time - 1), 1000);
    } else if (time === 0) {
      handleTimerComplete();
    }
    return () => clearTimeout(timerRef.current);
  }, [isActive, time]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (timerType === 1 && pomodoro === 4) {
      setTimerType(0);
      setTime(longBreakDuration * 60);
      setPomodoro(1);
      setTab('Long Break');
    } else if (timerType === 1) {
      setTimerType(0);
      setTime(shortBreakDuration * 60);
      setTab('Short Break');
    } else {
      setTimerType(1);
      setTime(workDuration * 60);
      setPomodoro(pomodoro + 1);
      setTab('Work');
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(timerType === 1 ? workDuration * 60 : shortBreakDuration * 60);
    setPomodoro(1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetDurations = () => {
    setTime(workDuration * 60);
    setShowSettings(false);
  };

  return (
    <div className='w-full h-1/2 rounded-xl border-2 shadow-lg bg-white overflow-hidden'>
      <div className="pomodoro-container w-full h-full flex flex-col items-center justify-center">
        
        <div className="content">
          <div id="pomo" className={showSettings ? 'hide' : ''}>
          <div id="tab-holder">
          <div id="tab">{tab}</div>
        </div>
            <div id="time">{formatTime(time)}</div>
            <div >
              <button onClick={toggleTimer} className="ctrl-btn" style={{ marginRight: '1rem' }}>
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button onClick={resetTimer} className="ctrl-btn">
                Reset
              </button>
            </div>
          </div>
          <div id="settings" className={showSettings ? 'show' : ''}>
            <div className="settings-header">
              {/* <h3>Settings</h3> */}
              {/* <button
            onClick={() => setShowSettings(false)}
            className="close-btn material-symbols-outlined"
          >
            close
          </button> */}
            </div>
            <div style={{ padding: '0px 0 0 0' }}>
              <button onClick={handleSetDurations} className="settings-element">
                Set Durations
              </button>
            </div>
            <div id="duration-inputs">
              <div className="input-group">
                <label htmlFor="work-input">Work</label>
                <input
                  type="number"
                  id="work-input"
                  className="settings-element time-input"
                  value={workDuration}
                  onChange={(e) => setWorkDuration(parseInt(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label htmlFor="shortbreak-input">Short Break</label>
                <input
                  type="number"
                  id="shortbreak-input"
                  className="settings-element time-input"
                  value={shortBreakDuration}
                  onChange={(e) => setShortBreakDuration(parseInt(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label htmlFor="longbreak-input">Long Break</label>
                <input
                  type="number"
                  id="longbreak-input"
                  className="settings-element time-input"
                  value={longBreakDuration}
                  onChange={(e) => setLongBreakDuration(parseInt(e.target.value))}
                />
              </div>
            </div>
            
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            id="settings-btn"
            className="ctrl-btn material-symbols-outlined"
            style={{width:'2rem'}}
          >
                      {showSettings ? <X size={24} /> : <Settings size={24} />}

          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;