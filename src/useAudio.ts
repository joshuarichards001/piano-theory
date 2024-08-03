import { useEffect, useRef } from "react";

export function useAudio(
  keyIndex: number,
  mute: boolean,
  audioContext: AudioContext,
) {
  const audioContextRef = useRef<AudioContext>(audioContext);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioControllersRef = useRef<
    { sourceNode: AudioBufferSourceNode; gainNode: GainNode }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/${keyIndex}.mp3`);
      const arrayBuffer = await response.arrayBuffer();
      const decodedAudioBuffer =
        await audioContextRef.current.decodeAudioData(arrayBuffer);

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

    const sourceNode = audioContextRef.current.createBufferSource();
    sourceNode.buffer = audioBufferRef.current;

    const gainNode = audioContextRef.current.createGain();
    gainNode.connect(audioContextRef.current.destination);
    sourceNode.connect(gainNode);

    audioControllersRef.current.push({ sourceNode, gainNode });

    sourceNode.start(0);
    gainNode.gain.setValueAtTime(1, audioContextRef.current.currentTime);
  };

  const endSound = () => {
    const fadeOutDuration = 0.5;
    audioControllersRef.current.forEach(({ sourceNode, gainNode }) => {
      gainNode.gain.setValueAtTime(1, audioContextRef.current!.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current!.currentTime + fadeOutDuration,
      );
      setTimeout(() => {
        sourceNode.disconnect();
        gainNode.disconnect();
      }, fadeOutDuration * 1000);
    });
    audioControllersRef.current = [];
  };

  return { startSound, endSound };
}
