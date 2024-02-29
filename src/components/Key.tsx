import { useEffect, useState } from "react";
import { blackColor, whiteBorder, whiteColor } from "../functions";

type Props = {
  keyIndex: number;
  fileName: string;
  correct: boolean | null;
  setPressedKeys: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function Key({
  keyIndex,
  fileName,
  correct,
  setPressedKeys,
}: Props) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const keyStyles = () => {
    if (!fileName.includes("b")) {
      return `grow-[3] h-24 ${whiteColor(correct)} ${whiteBorder(fileName)}`;
    } else {
      return `grow-[2] h-14 ${blackColor(correct)} z-10 -mx-[3%]`;
    }
  };

  useEffect(() => {
    const audioObj = new Audio(`/notes/${fileName}`);
    setAudio(audioObj);
  }, [fileName]);

  const onClick = () => {
    setPressedKeys((prev) => [...prev, keyIndex]);
    audio?.play();
  };

  return <button onClick={onClick} className={keyStyles()} />;
}
