import { useEffect, useRef, useState } from "react";
import { isDeviceiOS } from "./functions";

export function useSilentAudio() {
  const [hasUnblockedAudio, setHasUnblockedAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasUnblockedAudio || !isDeviceiOS()) {
      return;
    }

    setHasUnblockedAudio(true);
    const audio = document.createElement("audio");
    audio.setAttribute("x-webkit-airplay", "deny");
    audio.preload = "auto";
    audio.src = "1-minute-of-silence.mp3";
    audio.loop = true;
    audio.play();
    audioRef.current = audio;
  }, [hasUnblockedAudio]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) {
        return;
      }

      if (document.hidden) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
