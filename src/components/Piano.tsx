import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";

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

  const Keys = () => {
    const keys = quizType === "notes" ? NOTES.slice(0, 12) : NOTES;

    return keys.map((note, i) => (
      <Key
        key={note}
        note={note}
        keyIndex={i}
        keyState={getKeyState(i, pressedKeys, currentQuestion)}
      />
    ));
  };

  return (
    <div className="flex w-full max-w-xl">
      <Keys />
    </div>
  );
}
