import { useNavigate } from "react-router-dom";
import { getQuizColour } from "../functions";

export default function Landing() {
  const navigate = useNavigate();

  const QuizButton = ({ quizType }: { quizType: QuizType }) => (
    <button
      onClick={() => navigate(quizType)}
      className={`btn capitalize ${getQuizColour(quizType)}`}
    >
      {quizType.replace(/-/g, " ").replace("chord", "").replace("scale", "")}
    </button>
  );

  return (
    <div className="p-6">
      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Scales</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-scale" />
          <QuizButton quizType="natural-minor-scale" />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Chords</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-7th-chord" />
          <QuizButton quizType="minor-7th-chord" />
          <QuizButton quizType="dominant-7th-chord" />
          <QuizButton quizType="half-diminished-7th-chord" />
          <QuizButton quizType="diminished-7th-chord" />
        </div>
      </div>
    </div>
  );
}
