import { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import MusicPlayer from "./components/MusicPlayer";
import Settings from "./components/Settings";

function App() {
  const [bgMode, setBgMode] = useState("color"); 
  const [bgColor, setBgColor] = useState("#242424");
  const [bgImage, setBgImage] = useState(null); 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (bgMode === "image" && bgImage) { 
      document.body.style.backgroundImage = `url(${bgImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    } else {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = bgColor;
    }
  }, [bgMode, bgColor, bgImage]); 

  return (
    <div className="app">
      <Timer setIsSettingsOpen={setIsSettingsOpen} />
      <MusicPlayer />
      <Settings
        bgColor={bgColor}
        setBgColor={setBgColor}
        bgMode={bgMode}
        setBgMode={setBgMode}
        bgImage={bgImage}
        setBgImage={setBgImage}
        isOpen={isSettingsOpen}
      />
    </div>
  );
}

export default App;