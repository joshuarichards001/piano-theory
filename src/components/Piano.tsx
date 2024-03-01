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

  const isCorrectKey = (keyIndex: number): KeyState => {
    if (!scale.includes(keyIndex)) {
      return "not-pressed";
    }

    const scaleIndexOfKey = scale.indexOf(keyIndex);
    if (scaleIndexOfKey > pressedKeys.length - 1) {
      return "not-pressed";
    }

    if (pressedKeys[scaleIndexOfKey] === keyIndex) {
      return "correct-pressed";
    } else {
      return "failed";
    }
  };

  return (
    <div className="flex w-full max-w-xl">
      {NOTES.map((note, i) => (
        <Key
          key={note}
          note={note}
          keyIndex={i}
          keyState={isCorrectKey(i)}
          setPressedKeys={setPressedKeys}
        />
      ))}
    </div>
  );
}
