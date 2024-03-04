import { useEffect, useMemo, useState } from "react";
import { NOTES } from "../constants";
import { createQuiz, formatTime, getQuizBackgroundColour } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetKeys } from "../redux/slices/pressedKeysSlice";
import Piano from "./Piano";
import QuizComplete from "./QuizComplete";

type Props = {
  quizType: QuizType;
};

export default function Quiz({ quizType }: Props) {
  const quiz = useMemo(() => createQuiz(quizType), [quizType]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const question = quiz[questionNumber];
  const startNote = NOTES[question[0]];

  const dispatch = useAppDispatch();
  const pressedKeys = useAppSelector((state) => state.pressedKeys);

  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    dispatch(resetKeys());
    setQuestionNumber(0);
    setScore(0);
    setTimer(0);
    setDone(false);
  }, [quizType, dispatch]);

  useEffect(() => {
    if (questionNumber === 0 && pressedKeys.length === 1) {
      setIsTimerRunning(true);
    }
  }, [pressedKeys, questionNumber]);

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
    if (questionNumber === quiz.length - 1) {
      setDone(true);
      setIsTimerRunning(false);
      return;
    }

    setQuestionNumber((prev) => prev + 1);
  };

  return (
    <div>
      {!done ? (
        <div>
          <div className="p-6 flex gap-3 items-center">
            <h3
              className={`text-3xl whitespace-nowrap ${getQuizBackgroundColour(
                quizType,
              )} rounded-lg px-2`}
            >
              {startNote.replace("3", "").replace("/", " / ")}{" "}
            </h3>
            <div className="flex justify-between w-full">
              <div>
                <h3 className="text-base capitalize">
                  {quizType.replaceAll("-", " ")}
                </h3>
                <p className="text-xs text-gray-500">
                  {
                    [...new Set(pressedKeys)].filter((key) =>
                      question.includes(key),
                    ).length
                  }
                  /{question.length} Keys Pressed
                </p>
              </div>
              <div>
                <h3 className="text-base">
                  {questionNumber + 1}/{quiz.length}
                </h3>
                <p className="text-xs text-gray-500">{formatTime(timer)}</p>
              </div>
            </div>
          </div>
          <Piano
            question={quiz[questionNumber]}
            nextQuestion={nextQuestion}
            setScore={setScore}
          />
          <div className="h-10 bg-black" />
        </div>
      ) : (
        <QuizComplete
          score={score}
          timer={timer}
          numberOfQuestions={quiz.length}
        />
      )}
    </div>
  );
}
