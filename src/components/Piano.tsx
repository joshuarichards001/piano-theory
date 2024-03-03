import { useEffect, useState } from "react";
import { NOTES } from "../constants";
import { getKeyState } from "../functions";
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

  return (
    <div className="flex w-full max-w-xl">
      {NOTES.map((note, i) => (
        <Key
          key={note}
          note={note}
          keyIndex={i}
          keyState={getKeyState(i, pressedKeys, scale)}
          setPressedKeys={setPressedKeys}
        />
      ))}
    </div>
  );
}
