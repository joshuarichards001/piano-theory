import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFinalTime } from "../redux/slices/quizSlice";

export default function Timer() {
  const dispatch = useAppDispatch();
  const quizStatus = useAppSelector((state) => state.quiz.status);
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

  useEffect(() => {
    switch (quizStatus) {
      case "stopped":
        setIsTimerRunning(false);
        setTimer(0);
        break;
      case "running":
        setIsTimerRunning(true);
        break;
      case "completed":
        setIsTimerRunning(false);
        dispatch(setFinalTime(timer));
        break;
    }
  }, [dispatch, quizStatus, timer]);

  return <p className="text-sm text-base-content/70">{timer}s</p>;
}
