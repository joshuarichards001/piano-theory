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
      className={`btn capitalize ${getQuizColour(quizType)}`}
    >
      <p>
        {quizType.replace(/-/g, " ").replace("chord", "").replace("scale", "")}
      </p>
      {record && <p>{record.time}s</p>}
    </button>
  );
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
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
        <h2 className="text-2xl mb-2 font-bold">Chords</h2>
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
