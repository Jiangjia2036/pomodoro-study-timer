import "./Settings.css";
import bg1 from "../assets/pomodoro-study-timer_background1.jpg"; 
import bg2 from "../assets/pomodoro-study-timer_background2.jpg"; 
import bg3 from "../assets/pomodoro-study-timer_background3.jpg"; 
import bg4 from "../assets/pomodoro-study-timer_background4.jpg"; 
import bg5 from "../assets/pomodoro-study-timer_background5.jpg";
import bg6 from "../assets/pomodoro-study-timer_background6.jpg";

const BACKGROUNDS = [
  { name: "Background 1", src: bg1 }, 
  { name: "Background 2", src: bg2 }, 
  { name: "Background 3", src: bg3 },
  { name: "Background 4", src: bg4 }, 
  { name: "Background 5", src: bg5 }, 
  { name: "Background 6", src: bg6 }, 
];



function Settings({ bgColor, setBgColor, bgMode, setBgMode, bgImage, setBgImage, isOpen }) {
  return (
    <div className="settings-wrapper">
      {isOpen && (
        <div className="settings-panel">
          <h3>Settings</h3>

          <div className="bg-mode-toggle">
            <button
              className={bgMode === "color" ? "bg-mode-button active" : "bg-mode-button"}
              onClick={() => setBgMode("color")}
            >
              Color
            </button>
            <button

              className={bgMode === "image" ? "bg-mode-button active" : "bg-mode-button"}
              onClick={() => setBgMode("image")}
            >
              Image
            </button>
          </div>

          {bgMode === "color" && (
            <div className="settings-field settings-field-center">
              <label>Background Color</label>
              <input
                type="color"
                value={bgColor}

                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          )}

          {bgMode === "image" && (
            <div className="bg-preset-grid">
              {BACKGROUNDS.map((preset) => (

                <button
                  key={preset.name}
                  className={bgImage === preset.src ? "bg-preset selected" : "bg-preset"}
                  onClick={() => setBgImage(preset.src)}
                  aria-label={preset.name}
                >
                  <img src={preset.src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;