import { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import MusicPlayer from "./components/MusicPlayer";
import Settings from "./components/Settings";


function App() {
  const [bgColor, setBgColor] = useState("#242424");


  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);


  return (
    <div className="app">
      <Timer />
      <MusicPlayer />
      <Settings bgColor={bgColor} setBgColor={setBgColor} />
    </div>
  );
}


export default App;
