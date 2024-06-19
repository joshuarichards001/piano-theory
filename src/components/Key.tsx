import React, { useEffect, useRef } from "react";
import { getKeyStyles } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addKey } from "../redux/slices/pressedKeysSlice";

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

  const audioContextRef = useRef<AudioContext>(audioContext);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);

      const response = await fetch(`/${keyIndex}.mp3`);
      const arrayBuffer = await response.arrayBuffer();
      const decodedAudioBuffer = await audioContextRef.current.decodeAudioData(
        arrayBuffer,
      );

      if (decodedAudioBuffer) {
        audioBufferRef.current = decodedAudioBuffer;
      }
    };

    if (!mute) {
      fetchData();
    }
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
    if (!audioContextRef.current) {
      return;
    }

    sourceRef.current = audioContextRef.current.createBufferSource();
    sourceRef.current.buffer = audioBufferRef.current;

    if (gainNodeRef.current) {
      sourceRef.current.connect(gainNodeRef.current);
    }

    sourceRef.current.start(0);
    gainNodeRef.current?.gain.setValueAtTime(
      1,
      audioContextRef.current.currentTime,
    );
  };

  const endSound = () => {
    const fadeOutDuration = 0.5;
    gainNodeRef.current?.gain.setValueAtTime(
      1,
      audioContextRef.current!.currentTime,
    );
    gainNodeRef.current?.gain.linearRampToValueAtTime(
      0,
      audioContextRef.current!.currentTime + fadeOutDuration,
    );
    setTimeout(() => {
      sourceRef.current?.disconnect();
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
