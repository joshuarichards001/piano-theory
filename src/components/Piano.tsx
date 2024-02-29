import { useEffect, useState } from "react";
import { NOTES } from "../constants";
import Key from "./Key";

type Props = {
  scale: number[];
  nextQuestion: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function Piano({ scale, nextQuestion, setScore }: Props) {
  const [pressedKeys, setPressedKeys] = useState<number[]>([]);

  useEffect(() => {
    if (pressedKeys.length === scale.length) {
      setTimeout(() => {
        if (pressedKeys.join("") === scale.join("")) {
          setScore((prev) => prev + 1);
        }

        setPressedKeys([]);
        nextQuestion();
      }, 700);
    }
  }, [pressedKeys, scale, nextQuestion, setScore]);

  const isCorrectKey = (keyIndex: number) => {
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
          correct={isCorrectKey(i)}
          setPressedKeys={setPressedKeys}
        />
      ))}
    </div>
  );
}
