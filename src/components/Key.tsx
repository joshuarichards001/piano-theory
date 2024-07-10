import React from "react";
import { getKeyStyles } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addKey } from "../redux/slices/pressedKeysSlice";
import { useAudio } from "../useAudio";

type Props = {
  keyIndex: number;
  note: string;
  keyState: KeyState;
  audioContext: AudioContext;
};

function Key({ keyIndex, note, keyState, audioContext }: Props) {
  const dispatch = useAppDispatch();
  const isMouseDevice = window.matchMedia("(hover: hover)").matches;
  const mute = useAppSelector((state) => state.mute);
  const quizStatus = useAppSelector((state) => state.quiz.status);

  const { startSound, endSound } = useAudio(keyIndex, mute, audioContext);

  const handleTouchStart = () => {
    if (!isMouseDevice) {
      
      if (quizStatus === "running") {
        dispatch(addKey(keyIndex));
      }
      
      if (!mute) {
        startSound();
      }
    }
  };

  const handleMouseDown = () => {
    if (isMouseDevice) {
      if (quizStatus === "running") {
        dispatch(addKey(keyIndex));
      }

      if (!mute) {
        startSound();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      if (quizStatus === "running") {
        dispatch(addKey(keyIndex));
      }

      if (!mute) {
        startSound();
      }
    }
  };

  const handleInteractionEnd = () => {
    if (!mute) {
      endSound();
    }
  };

  return (
    <button
      aria-label={`Piano key ${note}`}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      onTouchEnd={handleInteractionEnd}
      onMouseUp={handleInteractionEnd}
      onKeyUp={handleInteractionEnd}
      className={getKeyStyles(note, keyState)}
    />
  );
}

const MemoizedKey = React.memo(Key);
export default MemoizedKey;
