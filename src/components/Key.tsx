import { useMemo, useRef } from "react";
import { getKeyStyles } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addKey } from "../redux/slices/pressedKeysSlice";

type Props = {
  keyIndex: number;
  note: string;
  keyState: KeyState;
};

export default function Key({ keyIndex, note, keyState }: Props) {
  const dispatch = useAppDispatch();
  const audio = useMemo(() => new Audio(`${keyIndex}.mp3`), [keyIndex]);
  const audioRef = useRef<HTMLAudioElement>(audio);
  const isMouseDevice = window.matchMedia("(hover: hover)").matches;
  const mute = useAppSelector((state) => state.mute);

  const handleInteraction = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      (event.type === "touchstart" && !isMouseDevice) ||
      (event.type === "mousedown" && isMouseDevice) ||
      (event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Enter")
    ) {
      dispatch(addKey(keyIndex));
      if (!mute) audioRef.current?.play();
    }
  };

  const handleInteractionEnd = () => {
    if (mute) return;

    const fadeOutInterval = setInterval(() => {
      if (audioRef.current.volume > 0.1) {
        audioRef.current.volume -= 0.1;
      } else {
        clearInterval(fadeOutInterval);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
      }
    }, 60);
  };

  return (
    <button
      aria-label={`Piano key ${note}`}
      onTouchStart={handleInteraction}
      onMouseDown={handleInteraction}
      onKeyDown={handleInteraction}
      onTouchEnd={handleInteractionEnd}
      onMouseUp={handleInteractionEnd}
      onKeyUp={handleInteractionEnd}
      className={getKeyStyles(note, keyState)}
    />
  );
}
