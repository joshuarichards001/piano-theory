import { Howl } from "howler";
import React from "react";
import { getKeyStyles } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addKey } from "../redux/slices/pressedKeysSlice";

type Props = {
  keyIndex: number;
  note: string;
  keyState: KeyState;
};

function Key({ keyIndex, note, keyState }: Props) {
  const dispatch = useAppDispatch();
  const sound = new Howl({
    src: [`${keyIndex}.mp3`],
  });
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
      if (!mute) sound.play();
    }
  };

  const handleInteractionEnd = () => {
    if (mute) return;

    sound.fade(1, 0, 100);
    sound.pause();
    sound.volume(1);
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

const MemoizedKey = React.memo(Key);
export default MemoizedKey;
