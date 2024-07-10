import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QUIZ_TYPE_DATA_MAP } from "../constants";
import { createQuiz } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetKeys } from "../redux/slices/pressedKeysSlice";
import { resetQuiz } from "../redux/slices/quizSlice";
import Quiz from "./Quiz";
import QuizComplete from "./QuizComplete";

export default function QuizPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";
  const quizStatus = useAppSelector((state) => state.quiz.status);
  const finalTime = useAppSelector((state) => state.quiz.finalTime);
  const quizTypeData = QUIZ_TYPE_DATA_MAP.get(quizType);

  const restartQuiz = useCallback(() => {
    const newQuiz = createQuiz(quizType);
    dispatch(resetQuiz(newQuiz));
    dispatch(resetKeys());
  }, [dispatch, quizType]);

  useEffect(() => {
    restartQuiz();
  }, [quizType, restartQuiz]);

  return (
    <main className="flex flex-col justify-between h-full">
      <div className="p-4 pt-6">
        <nav className="flex justify-between mb-10">
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
          <p className="text-sm text-base-content/70">{quizTypeData?.info}</p>
        </section>
      </div>
      {quizStatus === "completed" && finalTime !== 0 ? (
        <QuizComplete />
      ) : (
        <Quiz />
      )}
    </main>
  );
}
