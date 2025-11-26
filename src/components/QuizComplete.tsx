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
  const isComplete = useAppSelector((state) => state.quiz.isCompleted);
  const [isRecord, setIsRecord] = useState(false);

  // Check if the user has set a new record. If so, add or update the record.
  useEffect(() => {
    if (!isComplete || score < numberOfQuestions) {
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
    isComplete,
  ]);

  // Send analytics event to plausible.io
  useEffect(() => {
    if (window.plausible) {
      window.plausible("Quiz Complete", {
        props: {
          quizType,
          score,
          numberOfQuestions,
          finalTime,
        },
      });
    }
  }, [quizType, score, numberOfQuestions, finalTime]);

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
