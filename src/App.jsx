import { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import MusicPlayer from "./components/MusicPlayer";
import Settings from "./components/Settings";

function App() {
  const [bgColor, setBgColor] = useState("#242424");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <div className="app">
      <Timer
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
      />
      <MusicPlayer />
      <Settings
        bgColor={bgColor}
        setBgColor={setBgColor}
        isOpen={isSettingsOpen}
      />
    </div>
  );
}

export default App;