import { useEffect, useState } from "react";
import { NOTES } from "../constants";
import Key from "./Key";

type Props = {
  scale: number[];
  nextScale: () => void;
};

export default function Piano({ scale, nextScale }: Props) {
  const [pressedKeys, setPressedKeys] = useState<number[]>([]);

  useEffect(() => {
    if (pressedKeys.length === scale.length) {
      setPressedKeys([]);
      nextScale();
    }
  }, [pressedKeys, scale, nextScale]);

  const isCorrect = (keyIndex: number) => {
    if (!scale.includes(keyIndex)) {
      return null;
    }

    const scaleIndex = scale.indexOf(keyIndex);
    if (scaleIndex > pressedKeys.length - 1) {
      return null;
    }

    return pressedKeys[scaleIndex] === keyIndex;
  };

  return (
    <div className="flex w-full max-w-xl">
      {NOTES.map((note, i) => (
        <Key
          key={note}
          note={note}
          keyIndex={i}
          correct={isCorrect(i)}
          setPressedKeys={setPressedKeys}
        />
      ))}
    </div>
  );
}
