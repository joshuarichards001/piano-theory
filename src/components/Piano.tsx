import { useEffect } from "react";
import { NOTES } from "../constants";
import { getKeyState } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetKeys } from "../redux/slices/pressedKeysSlice";
import Key from "./Key";

type Props = {
  nextQuestion: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function Piano({ nextQuestion, setScore }: Props) {
  const dispatch = useAppDispatch();
  const pressedKeys = useAppSelector((state) => state.pressedKeys);
  const currentQuestion = useAppSelector((state) => state.quiz.currentQuestion);

  useEffect(() => {
    if (currentQuestion.every((key) => pressedKeys.includes(key))) {
      const timeout = setTimeout(() => {
        if (pressedKeys.length === currentQuestion.length) {
          setScore((prev) => prev + 1);
        }

        dispatch(resetKeys());
        nextQuestion();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [pressedKeys, currentQuestion, nextQuestion, setScore, dispatch]);

  return (
    <div className="flex w-full max-w-xl">
      {NOTES.map((note, i) => (
        <Key
          key={note}
          note={note}
          keyIndex={i}
          keyState={getKeyState(i, pressedKeys, currentQuestion)}
        />
      ))}
    </div>
  );
}
