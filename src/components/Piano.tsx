import { useEffect } from "react";
import { NOTES } from "../constants";
import { getKeyState } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setScore } from "../redux/slices/quizSlice";
import Key from "./Key";

type Props = {
  nextQuestion: () => void;
};

export default function Piano({ nextQuestion }: Props) {
  const dispatch = useAppDispatch();
  const pressedKeys = useAppSelector((state) => state.pressedKeys);
  const currentQuestion = useAppSelector((state) => state.quiz.currentQuestion);
  const score = useAppSelector((state) => state.quiz.score);

  useEffect(() => {
    if (currentQuestion.every((key) => pressedKeys.includes(key))) {
      const timeout = setTimeout(() => {
        if (pressedKeys.length === currentQuestion.length) {
          dispatch(setScore(score + 1));
        }
        nextQuestion();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [pressedKeys, currentQuestion, nextQuestion, dispatch, score]);

  return (
    <div className="flex overflow-x-scroll whitespace-nowrap">
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
