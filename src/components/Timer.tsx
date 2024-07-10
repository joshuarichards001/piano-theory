import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFinalTime } from "../redux/slices/quizSlice";

export default function Timer() {
  const dispatch = useAppDispatch();
  const pressedKeys = useAppSelector((state) => state.pressedKeys);
  const currentQuestionIndex = useAppSelector(
    (state) => state.quiz.currentQuestionIndex,
  );
  const isCompleted = useAppSelector((state) => state.quiz.isCompleted);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Increment the timer every second.
  useEffect(() => {
    let timer: number | undefined;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, setTimer]);

  // Start the timer when the first key is pressed.
  useEffect(() => {
    if (currentQuestionIndex === 0 && pressedKeys.length === 0) {
      setIsTimerRunning(false);
      setTimer(0);
    } else if (currentQuestionIndex === 0 && pressedKeys.length === 1) {
      setIsTimerRunning(true);
    }
  }, [pressedKeys, currentQuestionIndex]);

  // If quiz is completed, stop the timer and set the final time.
  useEffect(() => {
    if (isCompleted) {
      setIsTimerRunning(false);
      dispatch(setFinalTime(timer));
    }
  }, [dispatch, isCompleted, timer]);

  return <p className="text-sm text-base-content/70">{timer}s</p>;
}
