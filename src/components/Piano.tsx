import { useEffect } from "react";
import { NOTES } from "../constants";
import { getKeyState } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetKeys } from "../redux/slices/pressedKeysSlice";
import Key from "./Key";

type Props = {
  question: number[];
  nextQuestion: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function Piano({ question, nextQuestion, setScore }: Props) {
  const dispatch = useAppDispatch();
  const pressedKeys = useAppSelector((state) => state.pressedKeys);

  useEffect(() => {
    if (question.every((key) => pressedKeys.includes(key))) {
      const timeout = setTimeout(() => {
        if (pressedKeys.length === question.length) {
          setScore((prev) => prev + 1);
        }

        dispatch(resetKeys());
        nextQuestion();
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [pressedKeys, question, nextQuestion, setScore, dispatch]);

  return (
    <div className="flex w-full max-w-xl">
      {NOTES.map((note, i) => (
        <Key
          key={note}
          note={note}
          keyIndex={i}
          keyState={getKeyState(i, pressedKeys, question)}
        />
      ))}
    </div>
  );
}
