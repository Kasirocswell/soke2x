import { useEffect, useRef } from "react";

const LoopingSound = ({ src }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    // Enable looping
    audioElement.loop = true;

    // Start playing the sound
    if (audioRef.current) {
      audioRef.current.play();
    }

    return () => {
      // Cleanup: Stop the sound and remove event listeners
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  return <audio className="audio" ref={audioRef} src={src} />;
};

export default LoopingSound;
