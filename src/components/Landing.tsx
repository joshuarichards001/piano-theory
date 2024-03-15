import { IonIcon } from "@ionic/react";
import { ribbon } from "ionicons/icons";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { QUIZ_TYPE_MAP } from "../constants";
import { useAppSelector } from "../redux/hooks";

const QuizButton = ({
  quizTypeId,
  navigate,
}: {
  quizTypeId: QuizType;
  navigate: NavigateFunction;
}) => {
  const quizType = QUIZ_TYPE_MAP.get(quizTypeId);
  const record = useAppSelector((state) =>
    state.records.find((record) => record.quizType === quizTypeId),
  );

  return (
    <button
      onClick={() => navigate(quizTypeId)}
      className={`btn shadow-md ${quizType?.colour}`}
    >
      <p className="font-bold capitalize">{quizType?.name}</p>
      {record && (
        <div className="badge badge-warning gap-1">
          <p className="font-semibold">{record.time}s</p>
          <IonIcon icon={ribbon} className="h-3 w-3" />
        </div>
      )}
    </button>
  );
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="px-6 pb-16">
      <p className="text-gray-500 mb-6">
        Dive into the world of music theory. Pick a topic, and see how quickly
        and accurately you can hit the right notes!
      </p>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Notes</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizTypeId="notes" navigate={navigate} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Scales</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizTypeId="major-scale" navigate={navigate} />
          <QuizButton quizTypeId="natural-minor-scale" navigate={navigate} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Triad Chords</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizTypeId="major-triad" navigate={navigate} />
          <QuizButton quizTypeId="minor-triad" navigate={navigate} />
          <QuizButton quizTypeId="diminished-triad" navigate={navigate} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">7th Chords</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizTypeId="major-7th-chord" navigate={navigate} />
          <QuizButton quizTypeId="minor-7th-chord" navigate={navigate} />
          <QuizButton quizTypeId="dominant-7th-chord" navigate={navigate} />
          <QuizButton
            quizTypeId="half-diminished-7th-chord"
            navigate={navigate}
          />
          <QuizButton quizTypeId="diminished-7th-chord" navigate={navigate} />
        </div>
      </div>
    </div>
  );
}
