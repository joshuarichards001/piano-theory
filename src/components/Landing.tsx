import { IonIcon } from "@ionic/react";
import { ribbon } from "ionicons/icons";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getQuizColour } from "../functions";
import { useAppSelector } from "../redux/hooks";

const QuizButton = ({
  quizType,
  navigate,
}: {
  quizType: QuizType;
  navigate: NavigateFunction;
}) => {
  const record = useAppSelector((state) =>
    state.records.find((record) => record.quizType === quizType),
  );

  return (
    <button
      onClick={() => navigate(quizType)}
      className={`btn shadow-md ${getQuizColour(quizType)}`}
    >
      <p className="font-bold capitalize">
        {quizType.replace(/-/g, " ").replace("chord", "")}
      </p>
      {record && (
        <div className="badge badge-warning gap-1">
          <p className="text-xs font-semibold">{record.time}s</p>
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
          <QuizButton quizType="notes" navigate={navigate} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Scales</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-scale" navigate={navigate} />
          <QuizButton quizType="natural-minor-scale" navigate={navigate} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Triad Chords</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-triad" navigate={navigate} />
          <QuizButton quizType="minor-triad" navigate={navigate} />
          <QuizButton quizType="diminished-triad" navigate={navigate} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">7th Chords</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-7th-chord" navigate={navigate} />
          <QuizButton quizType="minor-7th-chord" navigate={navigate} />
          <QuizButton quizType="dominant-7th-chord" navigate={navigate} />
          <QuizButton
            quizType="half-diminished-7th-chord"
            navigate={navigate}
          />
          <QuizButton quizType="diminished-7th-chord" navigate={navigate} />
        </div>
      </div>
    </div>
  );
}
