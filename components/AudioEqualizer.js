import { useEffect, useRef } from "react";

const AudioEqualizer = () => {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodesRef = useRef([]);

  useEffect(() => {
    const setupAudioNodes = async () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      if (!sourceNodeRef.current) {
        const audio = audioRef.current;
        await audio.play();
        sourceNodeRef.current =
          audioContextRef.current.createMediaElementSource(audio);
      }

      const numBands = 10; // Number of equalizer bands

      // Create or update gain nodes for each band
      for (let i = 0; i < numBands; i++) {
        if (!gainNodesRef.current[i]) {
          const gainNode = audioContextRef.current.createGain();
          sourceNodeRef.current.connect(gainNode);
          gainNodesRef.current[i] = gainNode;
        }
      }

      // Connect the last gain node to the audio context's destination
      gainNodesRef.current[numBands - 1].connect(
        audioContextRef.current.destination
      );
    };

    setupAudioNodes();

    return () => {
      const stopAudio = async () => {
        const audio = audioRef.current;
        await audio.pause();
        audioContextRef.current.close().catch((error) => {
          console.error("Error closing AudioContext:", error);
        });
      };

      stopAudio().catch((error) => {
        console.error("Error stopping audio:", error);
      });

      sourceNodeRef.current = null;
      gainNodesRef.current = [];
    };
  }, []);

  const handleFrequencyChange = (bandIndex, value) => {
    const frequency = calculateFrequency(bandIndex);
    const gainNode = gainNodesRef.current[bandIndex];
    gainNode.gain.setValueAtTime(value, audioContextRef.current.currentTime);
  };

  const calculateFrequency = (bandIndex) => {
    // Calculate the frequency for a specific equalizer band
    const minFrequency = 100; // Minimum frequency in Hz
    const maxFrequency = 10000; // Maximum frequency in Hz
    const numBands = 10; // Number of equalizer bands
    const bandWidth = (maxFrequency - minFrequency) / numBands;
    return minFrequency + bandIndex * bandWidth;
  };

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src="/waves.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div>
        {gainNodesRef.current.map((gainNode, index) => (
          <input
            key={index}
            type="range"
            min="-20"
            max="20"
            defaultValue="0"
            onChange={(e) => handleFrequencyChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioEqualizer;
