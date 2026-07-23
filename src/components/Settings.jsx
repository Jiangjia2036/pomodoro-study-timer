import "./Settings.css";

function Settings({ bgColor, setBgColor, isOpen }) {
  return (
    <div className="settings-wrapper">
      {isOpen && (
        <div className="settings-panel">
          <h3>Settings</h3>

          <div className="settings-field">
            <label>Work Duration</label>
            <input type="number" defaultValue={25} min="1" />
          </div>

          <div className="settings-field">
            <label>Short Break</label>
            <input type="number" defaultValue={5} min="1" />
          </div>

          <div className="settings-field">
            <label>Long Break</label>
            <input type="number" defaultValue={15} min="1" />
          </div>

          <div className="settings-field settings-field-center">
            <label>Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;