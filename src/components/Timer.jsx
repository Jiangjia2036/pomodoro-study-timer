import {useState, useEffect, useRef} from "react";
import "./Timer.css";

function Timer() {
  const WORK_TIME = 25 * 60; // 25 mins in seconds

  const [secondsLeft, setSecondsLeft] = useState (WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  //countdown
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval (() => {
        setSecondsLeft ((prev) => {
          if (prev <= 1) {
            clearInterval (intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // cleanup on pause so intervals don't stack
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    if (secondsLeft === 0) return; // nothing to start if timer is done
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(WORK_TIME);
  };

  // format seconds -> MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer-card">

      <div className="timer-header">
        <h2>Pomodoro Timer</h2>

        <button className="settings-button">
          <span className="material-symbols-outlined">
            settings
          </span>
        </button>
      </div>

      <h1 className="timer-display"> 
        {formatTime(secondsLeft)}</h1>

      <div className="button-group">

        <button onClick = {handleStart} disabled = {isRunning}>
          Start
          </button>
        <button onClick = {handlePause} disabled={!isRunning}>
          Pause
          </button>
        <button onClick = {handleReset}>Reset</button>
      </div>

    </div>
  );
}

export default Timer;