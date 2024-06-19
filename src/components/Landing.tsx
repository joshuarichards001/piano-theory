import { useNavigate } from "react-router-dom";
import { QUIZ_TYPE_DATA_MAP } from "../constants";
import { useAppSelector } from "../redux/hooks";
import { RibbonIcon } from "./Icons";

const QuizButton = ({ quizType }: { quizType: QuizType }) => {
  const navigate = useNavigate();
  const quizTypeData = QUIZ_TYPE_DATA_MAP.get(quizType);
  const record = useAppSelector((state) =>
    state.records.find((record) => record.quizType === quizType),
  );

  return (
    <button
      onClick={() => navigate(quizType)}
      className={`btn shadow-md ${quizTypeData?.colour}`}
    >
      <p className="font-bold capitalize">{quizTypeData?.name}</p>
      {record && (
        <div className="badge badge-warning gap-1">
          <p className="font-semibold">{record.time}s</p>
          <RibbonIcon />
        </div>
      )}
    </button>
  );
};

export default function Landing() {
  return (
    <main className="p-4 pb-16">
      <p className="text-base-content/70 mb-10 tracking-wide">
        Dive into the world of music theory. Pick a topic, and see how quickly
        and accurately you can hit the right notes!
      </p>

      <section className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Notes</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="notes" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Scales</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-scale" />
          <QuizButton quizType="natural-minor-scale" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Triad Chords</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-triad" />
          <QuizButton quizType="minor-triad" />
          <QuizButton quizType="diminished-triad" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">7th Chords</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-7th-chord" />
          <QuizButton quizType="minor-7th-chord" />
          <QuizButton quizType="dominant-7th-chord" />
          <QuizButton quizType="half-diminished-7th-chord" />
          <QuizButton quizType="diminished-7th-chord" />
        </div>
      </section>
    </main>
  );
}
