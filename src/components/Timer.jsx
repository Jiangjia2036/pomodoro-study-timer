function Timer() {
  return (
    <div className="timer-card">

      <div className="timer-header">
        <h2>Pomodoro Timer</h2>

        
      </div>

      <h1 className="timer-display">
        25:00
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