function MusicPlayer() {
  return (
    <section className="music-card">

      <h2>Background Music</h2>

      <div>

        <input type="checkbox" />

        <label>White Noise</label>

      </div>

      <div>

        <input type="checkbox" />

        <label>Rain</label>

      </div>

      <div>

        <input type="checkbox" />

        <label>Forest</label>

      </div>

      <div>

        <label>Volume</label>

        <input
          type="range"
          min="0"
          max="100"
        />

      </div>

    </section>
  );
}

export default MusicPlayer;