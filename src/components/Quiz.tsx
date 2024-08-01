import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { OCTAVE, QUIZ_TYPE_DATA_MAP } from "../constants";
import { getKey, numberOfCorrectKeys } from "../functions";
import { useAppSelector } from "../redux/hooks";
import { RibbonIcon } from "./Icons";
import MusicNotation from "./MusicNotation";
import Piano from "./Piano";
import PianoMinimap from "./PianoMinimap";
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
  const quizNote = useMemo(() => {
    return getKey(OCTAVE[currentQuestion[0]]);
  }, [currentQuestion]);
  const quizTypeData = QUIZ_TYPE_DATA_MAP.get(quizType);
  const numberOfCorrectKeysPressed = numberOfCorrectKeys(
    currentQuestion,
    pressedKeys,
  );
  const [pianoScrollValue, setPianoScrollValue] = useState(0);
  const userPreferenceNotation = quizType === "notes";

  return (
    <div>
      <div className="flex flex-col p-4 gap-3">
        <p className="text-base-content/70 text-xs w-20">
          Start in the first octave
        </p>
        <div className="flex justify-between items-end">
          {userPreferenceNotation ? (
            <div className="bg-primary px-4 rounded-xl h-24 w-32">
              <MusicNotation note={quizNote} />
            </div>
          ) : (
            <div
              className={`btn btn-lg shadow-md px-2 ${quizTypeData?.colour}`}
            >
              <h3 className="text-5xl font-bold">{quizNote}</h3>
            </div>
          )}
          {record && (
            <div className="badge badge-warning shadow-md gap-1">
              <p className="font-semibold">{record.time}s</p>
              <RibbonIcon />
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
      <PianoMinimap setPianoScrollValue={setPianoScrollValue} />
      <Piano pianoScrollValue={pianoScrollValue} />
      <div className="h-20 bg-base-300" />
    </div>
  );
}
