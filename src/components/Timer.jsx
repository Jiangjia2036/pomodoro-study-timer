import {useState, useEffect, useRef} from "react";
import "./Timer.css";

const DURATIONS = {
  short: {work: 25 * 60, break: 5 * 60, label: "25/5" },
  long: {work: 50 * 60, break: 10 * 60, label: "50/10" },
};
function Timer({ setIsSettingsOpen }) {
  const [mode, setMode] = useState("short"); //"short" or "long"
  const [phase, setPhase] = useState("work"); // "work" or "break"
  const [secondsLeft, setSecondsLeft] = useState (DURATIONS["short"].work);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  //countdown
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval (() => {
        setSecondsLeft ((prev) => {
          if (prev <= 1) {
            clearInterval (intervalRef.current);
            handlePhaseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // cleanup on pause so intervals don't stack
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // called when countdown hits 0 - swaps btwn work and break
  const handlePhaseComplete = () => {
    setIsRunning(false);

    if (phase === "work") {setPhase("break");
      setSecondsLeft(DURATIONS[mode].break);
    } else {
      setPhase("work");
      setSecondsLeft(DURATIONS[mode].work);
    }
  };

  const handleStart = () => {
    if (secondsLeft === 0) return; // nothing to start if timer is done
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("work");
    setSecondsLeft(DURATIONS[mode].work);
  };

  // switching mode resets everything to that mode's work time
  const handleModeChange = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setPhase("work");
    setSecondsLeft(DURATIONS[newMode].work);
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

        <button
          className="settings-button"
          onClick={() => setIsSettingsOpen((prev) => !prev)}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      <div className="session-selector">
        <span className="session-label"> Session Length</span>
        <div className="toggle-group">
        <button
          className={mode === "short" ? "toggle-button active" : "toggle-button"}
          onClick={() => handleModeChange("short")}
          disabled={isRunning}
          >
            25 min
          </button>
          <button
            className={mode === "long" ? "toggle-button active" : "toggle-button"}
            onClick={() => handleModeChange("long")}
            disabled={isRunning}
            >
              50 min
            </button>
          </div>
      </div>

      <div className="phase-badge"> 
        {phase === "work" ? "Focus" : "Break"}
        </div>

      <h1 className="timer-display"> 
        {formatTime(secondsLeft)}
        </h1>
      
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