import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { useParams } from "react-router-dom";
import { quizFeedback } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addRecord, updateRecord } from "../redux/slices/recordsSlice";
import { RibbonIcon } from "./Icons";

export default function QuizComplete() {
  const dispatch = useAppDispatch();
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";
  const numberOfQuestions = useAppSelector(
    (state) => state.quiz.questions.length,
  );
  const score = useAppSelector((state) => state.quiz.score);
  const records = useAppSelector((state) => state.records);
  const finalTime = useAppSelector((state) => state.quiz.finalTime);
  const quizStatus = useAppSelector((state) => state.quiz.status);
  const [isRecord, setIsRecord] = useState(false);

  // Check if the quiz is complete and that they got a perfect score. If so, add or update the record.
  useEffect(() => {
    if (quizStatus !== "completed" || score < numberOfQuestions) {
      return;
    }
    const record = records.find((record) => record.quizType === quizType);
    if (!record) {
      dispatch(addRecord({ quizType, time: finalTime }));
      setIsRecord(true);
      return;
    }
    if (finalTime < record.time) {
      dispatch(updateRecord({ quizType, time: finalTime }));
      setIsRecord(true);
      return;
    }
  }, [
    dispatch,
    score,
    numberOfQuestions,
    records,
    quizType,
    finalTime,
    quizStatus,
  ]);

  return (
    <div className="card bg-base-200 my-28 mx-6 shadow-md">
      <div className="card-body">
        <p className="text-base-content/70">{quizFeedback(score)}</p>
        <p className="text-3xl font-bold mb-4">
          You scored {score}/{numberOfQuestions} in a time of {finalTime}s.
        </p>
        {isRecord && (
          <div className="badge badge-warning gap-1">
            <p className="font-semibold">New Record!</p>
            <RibbonIcon />
            <Fireworks autorun={{ speed: 2, duration: 500 }} />
          </div>
        )}
      </div>
    </div>
  );
}
