import { useEffect, useRef } from "react";

export function useAudio(
  keyIndex: number,
  mute: boolean,
  audioContext: AudioContext,
) {
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

  return { startSound, endSound };
}
