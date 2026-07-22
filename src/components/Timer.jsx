import "./Timer.css";

function Timer({ isSettingsOpen, setIsSettingsOpen }) {
  return (
    <div className="timer-card">
      <div className="timer-header">
        <h2>Pomodoro Timer</h2>

        <button
          className="settings-button"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      <h1 className="timer-display">
        25:00 {/* need to be changed */}
      </h1>

      <div className="button-group">
        <button>Start</button>
        <button>Pause</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

export default Timer;