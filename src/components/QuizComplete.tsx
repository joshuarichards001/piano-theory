import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime, quizFeedback } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addRecord, updateRecord } from "../redux/slices/recordsSlice";

type Props = {
  timer: number;
};

export default function QuizComplete({ timer }: Props) {
  const dispatch = useAppDispatch();

  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";

  const numberOfQuestions = useAppSelector(
    (state) => state.quiz.questions.length,
  );
  const score = useAppSelector((state) => state.quiz.score);
  const isCompleted = useAppSelector((state) => state.quiz.isCompleted);
  const records = useAppSelector((state) => state.records);

  const [isRecord, setIsRecord] = useState(false);
  const recordEdited = useRef(false);

  useEffect(() => {
    if (!isCompleted || score < numberOfQuestions || recordEdited.current) {
      return;
    }

    const record = records.find((record) => record.quizType === quizType);
    if (!record) {
      dispatch(addRecord({ quizType, time: timer }));
      setIsRecord(true);
      recordEdited.current = true;
      return;
    }

    if (timer < record.time) {
      dispatch(updateRecord({ quizType, time: timer }));
      setIsRecord(true);
      recordEdited.current = true;
      return;
    }
  }, [
    dispatch,
    isCompleted,
    numberOfQuestions,
    quizType,
    records,
    score,
    timer,
  ]);

  return (
    <div className="p-6 mb-28">
      <p className="text-base text-gray-500 mb-2">{quizFeedback(score)}</p>
      <p className="text-3xl">
        You scored {score} out of {numberOfQuestions} in a time of{" "}
        {formatTime(timer)}.
      </p>
      {isRecord && <p>New Record!!!</p>}
    </div>
  );
}
