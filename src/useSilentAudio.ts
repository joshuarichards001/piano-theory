import { useEffect, useRef } from "react";
import { isDeviceiOS } from "./functions";

export function useSilentAudio() {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current || !isDeviceiOS()) {
      return;
    }

    let audio: HTMLAudioElement | null = null;

    const setupAudio = () => {
      hasRunRef.current = true;
      audio = document.createElement("audio");
      audio.setAttribute("x-webkit-airplay", "deny");
      audio.preload = "auto";
      audio.src = "1-minute-of-silence.mp3";
      audio.loop = true;
      audio.play();
    };

    const handleVisibilityChange = () => {
      if (document.hidden && audio) {
        audio.pause();
        audio.remove();
        audio = null;
      } else {
        setupAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // return () => {
    //   document.removeEventListener("visibilitychange", handleVisibilityChange);
    //   audio.pause();
    //   audio.remove();
    // };
  }, []);
}
