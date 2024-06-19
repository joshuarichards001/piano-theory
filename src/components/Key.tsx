import React, { useEffect, useRef } from "react";
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
  const isMouseDevice = window.matchMedia("(hover: hover)").matches;
  const mute = useAppSelector((state) => state.mute);

  const audioContext = useRef<AudioContext | null>(null);
  const audioBuffer = useRef<AudioBuffer | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);

      const response = await fetch(`/${keyIndex}.mp3`);
      const arrayBuffer = await response.arrayBuffer();
      const decodedAudioBuffer = await audioContext.current.decodeAudioData(
        arrayBuffer,
      );

      if (decodedAudioBuffer) {
        audioBuffer.current = decodedAudioBuffer;
      }
    };

    if (!mute) {
      fetchData();
    }

    return () => {
      audioContext.current?.close();
    };
  }, [keyIndex, mute]);

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

  const startSound = () => {
    if (!audioContext.current) {
      return;
    }

    source.current = audioContext.current.createBufferSource();
    source.current.buffer = audioBuffer.current;

    if (gainNode.current) {
      source.current.connect(gainNode.current);
    }

    source.current.start(0);
    gainNode.current?.gain.setValueAtTime(1, audioContext.current.currentTime);
  };

  const endSound = () => {
    const fadeOutDuration = 0.5;
    gainNode.current?.gain.setValueAtTime(1, audioContext.current!.currentTime);
    gainNode.current?.gain.linearRampToValueAtTime(
      0,
      audioContext.current!.currentTime + fadeOutDuration,
    );
    setTimeout(() => {
      source.current?.disconnect();
    }, fadeOutDuration * 1000);
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
