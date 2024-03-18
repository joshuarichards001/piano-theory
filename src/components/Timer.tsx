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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, setTimer]);

  useEffect(() => {
    if (isCompleted) {
      dispatch(setFinalTime(timer));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isCompleted]);

  useEffect(() => {
    if (currentQuestionIndex === 0 && pressedKeys.length === 0) {
      setIsTimerRunning(false);
      setTimer(0);
    } else if (currentQuestionIndex === 0 && pressedKeys.length === 1) {
      setIsTimerRunning(true);
    }
  }, [pressedKeys, currentQuestionIndex]);

  useEffect(() => {
    if (isCompleted) {
      setIsTimerRunning(false);
    }
  }, [isCompleted]);

  return <p className="text-sm text-base-content/70">{timer}s</p>;
}
