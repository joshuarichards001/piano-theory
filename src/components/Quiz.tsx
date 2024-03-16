import { IonIcon } from "@ionic/react";
import { ribbon } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NOTES, QUIZ_TYPE_DATA_MAP } from "../constants";
import { createQuiz } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetKeys } from "../redux/slices/pressedKeysSlice";
import {
  resetQuiz,
  setCurrentQuestionIndex,
  setIsCompleted,
} from "../redux/slices/quizSlice";
import Piano from "./Piano";
import QuizComplete from "./QuizComplete";

export default function Quiz() {
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";
  const quizTypeData = QUIZ_TYPE_DATA_MAP.get(quizType);

  const quiz = useAppSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useAppSelector(
    (state) => state.quiz.currentQuestionIndex,
  );
  const currentQuestion = useAppSelector((state) => state.quiz.currentQuestion);
  const pressedKeys = useAppSelector((state) => state.pressedKeys);
  const isCompleted = useAppSelector((state) => state.quiz.isCompleted);
  const record = useAppSelector((state) =>
    state.records.find((record) => record.quizType === quizType),
  );

  const quizNote = NOTES[currentQuestion[0]]
    ?.replace("3", "")
    .replace("/", " / ");

  const dispatch = useAppDispatch();

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const navigate = useNavigate();

  const restartQuiz = () => {
    const newQuiz = createQuiz(quizType);
    dispatch(resetQuiz(newQuiz));
    dispatch(resetKeys());
    setTimer(0);
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
      dispatch(setIsCompleted(true));
      setIsTimerRunning(false);
      return;
    }

    dispatch(resetKeys());
    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
  };

  return (
    <main className="flex flex-col justify-between h-full">
      <div className="p-6">
        <nav className="flex justify-between mb-8">
          <button
            className="btn btn-sm btn-neutral shadow-md"
            onClick={() => {
              restartQuiz();
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="btn btn-sm btn-active shadow-md"
            onClick={restartQuiz}
          >
            Restart
          </button>
        </nav>
        <section>
          <h2 className="text-2xl capitalize font-bold mb-4">
            {quizTypeData?.name}
          </h2>
          <p className="text-sm">{quizTypeData?.info}</p>
        </section>
      </div>

      {!isCompleted ? (
        <div>
          <div className="flex flex-col p-6 gap-3">
            <p className="text-gray-500 text-xs w-20">
              Start in the first octave
            </p>
            <div className="flex justify-between items-end">
              <div
                className={`btn btn-lg shadow-md px-2 ${quizTypeData?.colour}`}
              >
                <h3 className="text-5xl font-bold">{quizNote}</h3>
              </div>
              {record && (
                <div className="badge badge-warning shadow-md gap-1">
                  <p className="font-semibold">{record.time}s</p>
                  <IonIcon icon={ribbon} className="h-3 w-3" />
                </div>
              )}
            </div>
            <div className="flex justify-between w-full">
              <div>
                <h3 className="text-lg capitalize font-bold">
                  {quizTypeData?.name}
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
              <div className="flex flex-col items-end">
                <h3 className="text-lg font-bold">
                  {currentQuestionIndex + 1}/{quiz.length}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">{timer}s</p>
                </div>
              </div>
            </div>
          </div>
          <Piano nextQuestion={nextQuestion} />
          <div className="h-28 bg-base-300" />
        </div>
      ) : (
        <QuizComplete timer={timer} />
      )}
    </main>
  );
}
