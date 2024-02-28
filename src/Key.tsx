import { useEffect, useState } from "react";

type Props = {
  fileName: string;
};

export default function Key({ fileName }: Props) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioObj = new Audio(`/notes/${fileName}`);
    setAudio(audioObj);
  }, [fileName]);

  const onClick = () => {
    audio?.play();
  };

  if (!fileName.includes("b")) {
    return (
      <button
        onMouseDown={onClick}
        onTouchStart={onClick}
        className={`grow-[3] h-24 bg-white active:bg-neutral-400 border-2 border-black ${
          (fileName === "E3.mp3" ||
            fileName === "B3.mp3" ||
            fileName === "E4.mp3" ||
            fileName === "B4.mp3") &&
          "border-r-0"
        } last:border-r-2`}
      />
    );
  } else {
    return (
      <button
        onMouseDown={onClick}
        onTouchStart={onClick}
        className="grow-[2] h-14 bg-black active:bg-neutral-600 z-10 -mx-[3%]"
      />
    );
  }
}
