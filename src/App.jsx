import "./App.css";
import Timer from "./components/Timer";
import MusicPlayer from "./components/MusicPlayer";
import Settings from "./components/Settings";

function App() {
  return (
    <div className="app">

      <Timer />

      <MusicPlayer />

      <Settings />

    </div>
  );
}

export default App;