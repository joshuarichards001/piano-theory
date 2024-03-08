import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NOTES } from "../constants";
import { createQuiz, formatTime, getQuizColour } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetKeys } from "../redux/slices/pressedKeysSlice";
import { resetQuiz, setCurrentQuestionIndex } from "../redux/slices/quizSlice";
import Piano from "./Piano";
import QuizComplete from "./QuizComplete";

export default function Quiz() {
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";

  const quiz = useAppSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useAppSelector(
    (state) => state.quiz.currentQuestionIndex,
  );
  const currentQuestion = useAppSelector((state) => state.quiz.currentQuestion);

  const dispatch = useAppDispatch();
  const pressedKeys = useAppSelector((state) => state.pressedKeys);

  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const navigate = useNavigate();

  const restartQuiz = () => {
    const newQuiz = createQuiz(quizType);

    dispatch(resetKeys());
    dispatch(resetQuiz(newQuiz));

    setScore(0);
    setTimer(0);
    setDone(false);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    restartQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizType]);

  useEffect(() => {
    if (currentQuestionIndex === 0 && pressedKeys.length === 1) {
      setIsTimerRunning(true);
    }
  }, [pressedKeys, currentQuestionIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const nextQuestion = () => {
    if (currentQuestionIndex === quiz.length - 1) {
      setDone(true);
      setIsTimerRunning(false);
      return;
    }

    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between p-6">
        <button
          className="btn btn-sm btn-neutral"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button className="btn btn-sm btn-active" onClick={restartQuiz}>
          Restart
        </button>
      </div>
      {!done ? (
        <div>
          <div className="flex flex-col p-6 gap-3">
            <h3
              className={`text-5xl w-fit whitespace-nowrap rounded-lg px-2 font-bold btn btn-lg ${getQuizColour(
                quizType,
              )}`}
            >
              {NOTES[currentQuestion[0]]?.replace("3", "").replace("/", " / ")}{" "}
            </h3>
            <div className="flex justify-between w-full">
              <div>
                <h3 className="text-lg capitalize font-bold">
                  {quizType.replaceAll("-", " ")}
                </h3>
                <p className="text-sm text-gray-500">
                  {
                    [...new Set(pressedKeys)].filter((key) =>
                      currentQuestion.includes(key),
                    ).length
                  }
                  /{currentQuestion.length} Keys Pressed
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {currentQuestionIndex + 1}/{quiz.length}
                </h3>
                <p className="text-sm text-gray-500">{formatTime(timer)}</p>
              </div>
            </div>
          </div>
          <Piano nextQuestion={nextQuestion} setScore={setScore} />
          <div className="h-28 bg-base-300" />
        </div>
      ) : (
        <QuizComplete score={score} timer={timer} />
      )}
    </div>
  );
}
