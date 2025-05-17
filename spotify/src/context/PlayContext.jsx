import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

// 1. Tạo Context
export const PlayerContext = createContext();

// 2. Tạo Provider Component
const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id ) => {
    await setTrack(songsData[id]);
      await audioRef.current.play();
      setPlayStatus(true);
  }

  // 3. Update time on playback progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      seekBar.current.style.width= (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100+"%"))
      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60),
        },
      });
    };

    audio.ontimeupdate = handleTimeUpdate;

    return () => {
      audio.ontimeupdate = null; // Cleanup
    };
  }, []); // empty dependency array = run once on mount

  // 4. Trả về Provider bao bọc children
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,setTime,
    play, pause,
    playWithId,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
