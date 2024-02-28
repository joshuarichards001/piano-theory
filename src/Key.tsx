import { useEffect, useState } from "react";

type Props = {
  note: string;
  fileName: string;
};

export default function Key({ note, fileName }: Props) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioObj = new Audio(`/notes/${fileName}`);
    setAudio(audioObj);
  }, [fileName]);

  const onClick = () => {
    audio?.play();
  };

  if (!note.includes("b")) {
    return (
      <div
        onMouseDown={onClick}
        onTouchStart={onClick}
        onTouchMove={onClick}
        className={`grow-[3] h-24 bg-white active:bg-neutral-400 border-2 border-black ${
          (note === "E" || note === "B") && "border-r-0"
        } last:border-r-2`}
      />
    );
  } else {
    return (
      <div
        onMouseDown={onClick}
        onTouchStart={onClick}
        onTouchMove={onClick}
        className="grow-[2] h-14 bg-black active:bg-neutral-600 z-10 -mx-[3%]"
      />
    );
  }
}
