import { useState, useEffect, useRef } from "react";
import "./Timer.css";

const DURATIONS = {
  demo: {
    work: 10,
    break: 10,
    label: "10/10"
  },
  short: {
    work: 25 * 60,
    break: 5 * 60,
    label: "25/5"
  },
  long: {
    work: 50 * 60,
    break: 10 * 60,
    label: "50/10"
  },
};

function Timer({ setIsSettingsOpen }) {
  const [mode, setMode] = useState("demo");
  const [phase, setPhase] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS.demo.work);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const playAlarm = () => {
    return new Promise((resolve) => {
      let count = 0;

      const beep = () => {
        if (count >= 5) {
          resolve();
          return;
        }

        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.value = 1000;
        gainNode.gain.value = 0.8;

        oscillator.start();

        setTimeout(() => {
          oscillator.stop();
          audioContext.close();
        }, 500);

        count++;

        setTimeout(beep, 500);
      };

      beep();
    });
  };

  const handlePhaseComplete = async () => {
    await playAlarm();

    if (phase === "work") {
      setPhase("break");
      setSecondsLeft(DURATIONS[mode].break);
    } else {
      setPhase("work");
      setSecondsLeft(DURATIONS[mode].work);
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handlePhaseComplete();
          return prev;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, phase, mode]);

  const handleStart = () => {
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

  const handleModeChange = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setPhase("work");
    setSecondsLeft(DURATIONS[newMode].work);
  };

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
          onClick={() => setIsSettingsOpen(prev => !prev)}
        >
          <span className="material-symbols-outlined">
            settings
          </span>
        </button>
      </div>

      <div className="session-selector">
        <span className="session-label">
          Session Length
        </span>

        <div className="toggle-group">
          <button
            className={mode === "demo" ? "toggle-button active" : "toggle-button"}
            onClick={() => handleModeChange("demo")}
            disabled={isRunning}
          >
            10/10 Demo
          </button>

          <button
            className={mode === "short" ? "toggle-button active" : "toggle-button"}
            onClick={() => handleModeChange("short")}
            disabled={isRunning}
          >
            25/5
          </button>

          <button
            className={mode === "long" ? "toggle-button active" : "toggle-button"}
            onClick={() => handleModeChange("long")}
            disabled={isRunning}
          >
            50/10
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
        <button
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          onClick={handlePause}
          disabled={!isRunning}
        >
          Pause
        </button>

        <button onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="study-note">
        <label htmlFor="study-note">
          Wake Up! Study! Exam!
        </label>

        <textarea
          id="study-note"
          placeholder="What are your goals for today?"
          rows="3"
        />
      </div>
    </div>
  );
}

export default Timer;