import { IonIcon } from "@ionic/react";
import { ribbon } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { quizFeedback } from "../functions";
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
    <div className="card bg-base-200 my-28 mx-6 shadow-md">
      <div className="card-body">
        <p className="text-base-content/60">{quizFeedback(score)}</p>
        <p className="text-3xl font-bold mb-4">
          You scored {score}/{numberOfQuestions} in a time of {timer}s.
        </p>
        {isRecord && (
          <div className="badge badge-warning gap-1">
            <p className="font-semibold">New Record!</p>
            <IonIcon icon={ribbon} className="h-3 w-3" />
          </div>
        )}
      </div>
    </div>
  );
}
