import React, { useRef, useState, useEffect } from "react";
import "./MusicPlayer.css";

import logo from "../assets/logo.jpg";
import audioSrc from "../audio/audio.mp3";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  //function to handle time in audio
  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  //Function to update the current time and duration of the audio
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  // Get the song duration after it loads
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  //Function to format the time in minutes and seconds
  function formatTime(durationSeconds) { 
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds=seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;

  }


  //Use the effect to listen for time updates on the audio element
  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  //function to handle playing the audio
  const handlePlay=() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlaying(true);
  }
  
  const handlePause=() => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
       if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };
  

  return (
    <div className="music-card">
      <img src={logo} alt="Music Player" className="music-image" />

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />

      <audio 
      ref={audioRef}
       src={audioSrc} 
       onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="time-display">
        <p>{formatTime(currentTime)}</p>
        <p>{formatTime(duration)}</p>
      </div>

      <button onClick={handlePlayPause}>
        <span className="material-symbols-outlined"> 
         {isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>

    </div>
  );
};

export default App;