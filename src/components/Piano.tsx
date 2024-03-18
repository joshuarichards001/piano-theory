import { useEffect } from "react";
import { OCTAVE } from "../constants";
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
    if (
      currentQuestion.every((key) =>
        pressedKeys.map((k) => k % 12).includes(key),
      )
    ) {
      const timeout = setTimeout(() => {
        if (pressedKeys.length === currentQuestion.length) {
          dispatch(setScore(score + 1));
        }
        nextQuestion();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [pressedKeys, currentQuestion, nextQuestion, dispatch, score]);

  const getKeys = () => {
    const keys = [];
    for (let octaveNumber = 0; octaveNumber < 2; octaveNumber++) {
      for (let noteIndex = 0; noteIndex < OCTAVE.length; noteIndex++) {
        const keyIndex = octaveNumber * OCTAVE.length + noteIndex;
        keys.push(
          <Key
            key={keyIndex}
            note={OCTAVE[noteIndex]}
            keyIndex={keyIndex}
            keyState={getKeyState(keyIndex, pressedKeys, currentQuestion)}
          />,
        );
      }
    }
    return keys;
  };

  return (
    <div className="flex overflow-x-scroll whitespace-nowrap">{getKeys()}</div>
  );
}
