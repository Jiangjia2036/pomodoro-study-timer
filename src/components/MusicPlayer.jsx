import React, { useRef, useState } from "react";
import "./MusicPlayer.css";

import logo from "../assets/logo.jpg";
import song1 from "../audio/song1.mp3";
import song2 from "../audio/song2.mp3";
import song3 from "../audio/song3.mp3";
import song4 from "../audio/song4.mp3";
import song5 from "../audio/song5.mp3";
import song6 from "../audio/song6.mp3";
import song7 from "../audio/song7.mp3";
import song8 from "../audio/song8.mp3";
import song9 from "../audio/song9.mp3";
import song10 from "../audio/song10.mp3";


const App = () => {
  const[currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const shouldAutoPlayRef = useRef(false); //will load the song automatically
  const [volume, setVolume]= useState(0.6); //set the volume, 0.6 means the starting volume when it first launch
  const previousVolumeRef=useRef(0.6);

  const songs=[
    {src:song1, title:"Lofi Beat"},
    {src:song2, title:"Long Night Ride"},
    {src:song3, title:"Lofi Chill"},
    {src:song4, title: "Quiet Rain"},
    {src:song5, title: "Once in Paris"},
    {src:song6, title: "Saxophone Jazz"},
    {src:song7, title: "Samba Jazz"},
    {src:song8, title: "Jazz Midnight"},   
    {src:song9, title: "Moment of Peace"},    
    {src:song10, title: "Rain and Tears"},
  ];

  const currentSong= songs[currentSongIndex];


  //function to handle the progress slider
  const handleSeek = (e) => {
    const newTime=Number(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime); //line updates the number displayed on the page
    }
  };
  
  const handleNext=() => {
    shouldAutoPlayRef.current= true;
    setIsPlaying(false);
    setCurrentSongIndex(
      (currentIndex) => (currentIndex + 1) % songs.length
    );
    setCurrentTime(0);
    setDuration(0);
  };
  
  const handlePrevious=() => {
    shouldAutoPlayRef.current= true;

    setCurrentSongIndex(
      (currentIndex) => 
        (currentIndex - 1 + songs.length) % songs.length
    );

    setCurrentTime(0);
    setDuration(0);
    };
  //Function to update the current time and duration of the audio
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  // Get the song duration after it loads
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume=volume; 
    }
  };

  //Function to format the time in minutes and seconds
  function formatTime(durationSeconds) { 
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds=seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;

  }

  //function to handle playing the audio
  const handlePlay=() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlaying(true);
  }
  
  const handlePause=() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => { //function to handle the play/pause button click, when the music is playing when click the button it should pause it
    if (isPlaying) {
      handlePause(); //calling pausing function
    } else {
      handlePlay();
    }
  };

  const handleCanPlay= async () => {
    if (!shouldAutoPlayRef.current || !audioRef.current) 
      {                          //check to see if automatic play is requested or not if not then stop this
      return;
  }
   
  try{
    await audioRef.current.play();
    setIsPlaying(true);
  }
  catch (error)
  {
  console.error("Cannot play the song", error);
  setIsPlaying(false);
  }
  finally
  {
    shouldAutoPlayRef.current=false;
  }
};

const handleVolumeChange = (e) => {
  const newVolume = Number(e.target.value);

  setVolume(newVolume);
  
  if (newVolume>0)
  {
    previousVolumeRef.current=newVolume;
  }

  if (audioRef.current) {
    audioRef.current.volume = newVolume;
  }
};

const handleMute =() => {
      if(!audioRef.current)
      {
        return;
      }

      if(volume>0)
      {
        previousVolumeRef.current=volume; // this part the system will remeber the current volume before mute
        setVolume(0) 
      audioRef.current.volume=0;
      }
      else{
        const restoredVolume= previousVolumeRef.current || 0.6;
        setVolume(restoredVolume);
        audioRef.current.volume= restoredVolume;
      }
    };
  return (
    <div className="music-card">
    <div className="music-notes">♪ ♫ ♪</div>
      <img
  src={logo}
  alt="Music Player"
  className={`music-image ${
    isPlaying ? "music-image-playing" : ""
  }`}
/>

      <h3 className="music-title">
        {currentSong.title}
      </h3>

      <input
        type="range"
        min="0"
        max={duration ||0}
        value={currentTime}
        onChange={handleSeek}
      />

      <audio 
      key={currentSongIndex}
      ref={audioRef}
      src={currentSong.src}
      onCanPlay={handleCanPlay}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onEnded={handleNext}
      /> 
      

     <div className="volume-control">

      <button
       type="button"
       className="volume-button"
       onClick={handleMute}
       aria-label={volume ===0 ? "Turn volume on" : "Mute volumr"}
       >
      <span className="material-symbols-outlined">
        {volume === 0? "volume_off" : "volume_up"}
      </span>
      </button>


      <input
      className="volume-slider"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
      aria-label="Volume"
      />
     </div>


      <div className="time-display">
        <p>{formatTime(currentTime)}</p>
        <p>{formatTime(duration)}</p>
      </div>


      <div className="music-controls">  
        <button
          onClick={handlePrevious}
          aria-label="Previous song"
        >
          <span className="material-symbols-outlined">
            skip_previous
          </span>
        </button>

      <button onClick={handlePlayPause}>
        <span className="material-symbols-outlined"> 
         {isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>

      <button
        onClick={handleNext}
        aria-label="Next song"
      >
        <span className="material-symbols-outlined">
          skip_next
          </span>
      </button>

      </div>

    </div>
  );
};

export default App;