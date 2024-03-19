import { IonIcon } from "@ionic/react";
import { ribbon } from "ionicons/icons";
import { useParams } from "react-router-dom";
import { OCTAVE, QUIZ_TYPE_DATA_MAP } from "../constants";
import { useAppSelector } from "../redux/hooks";
import Piano from "./Piano";
import Timer from "./Timer";

export default function Quiz() {
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";
  const quiz = useAppSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useAppSelector(
    (state) => state.quiz.currentQuestionIndex,
  );
  const pressedKeys = useAppSelector((state) => state.pressedKeys);
  const record = useAppSelector((state) =>
    state.records.find((record) => record.quizType === quizType),
  );
  const currentQuestion = useAppSelector((state) => state.quiz.currentQuestion);
  const quizNote = OCTAVE[currentQuestion[0]]?.replace("/", " / ");
  const quizTypeData = QUIZ_TYPE_DATA_MAP.get(quizType);
  const uniquePressedKeys = [...new Set(pressedKeys.map((k) => k % 12))];
  const numberOfCorrectKeysPressed = uniquePressedKeys.filter((key) =>
    currentQuestion.includes(key),
  ).length;

  return (
    <div>
      <div className="flex flex-col p-6 gap-3">
        <p className="text-base-content/70 text-xs w-20">
          Start in the first octave
        </p>
        <div className="flex justify-between items-end">
          <div className={`btn btn-lg shadow-md px-2 ${quizTypeData?.colour}`}>
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
            <p className="text-sm text-base-content/70">
              {numberOfCorrectKeysPressed}/{currentQuestion.length} Keys Pressed
            </p>
          </div>
          <div className="flex flex-col items-end">
            <h3 className="text-lg font-bold">
              {currentQuestionIndex + 1}/{quiz.length}
            </h3>
            <Timer />
          </div>
        </div>
      </div>
      <Piano />
      <div className="h-28 bg-base-300" />
    </div>
  );
}
