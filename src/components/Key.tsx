import { useEffect, useState } from "react";
import { whiteColor, whiteBorder, blackColor } from "../functions";

type Props = {
  fileName: string;
  correct: boolean;
};

export default function Key({ fileName, correct }: Props) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const audioObj = new Audio(`/notes/${fileName}`);
    setAudio(audioObj);
  }, [fileName]);

  const onClick = () => {
    setClicked(true);
    audio?.play();
  };

  if (!fileName.includes("b")) {
    return (
      <button
        onMouseDown={onClick}
        onTouchStart={onClick}
        className={`grow-[3] h-24 ${whiteColor(clicked, correct)} ${whiteBorder(fileName)}`}
      />
    );
  } else {
    return (
      <button
        onMouseDown={onClick}
        onTouchStart={onClick}
        className={`grow-[2] h-14 ${blackColor(clicked, correct)} z-10 -mx-[3%]`}
      />
    );
  }
}
