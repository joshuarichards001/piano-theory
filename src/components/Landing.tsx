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
    <main className="mx-4 pt-body-safe-top pb-16">
      {window.innerWidth > 750 && (
        <div role="alert" className="alert mb-6">
          <svg viewBox="0 0 24 24" fill="none" className="stroke-info w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Piano Theory is best experienced on mobile.</span>
        </div>
      )}
      <p className="text-base-content/70 mb-6 tracking-wide">
        Dive into the world of music theory. Pick a topic, and see how quickly
        and accurately you can hit the right notes!
      </p>

      <section className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Notes</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="notes" />
          <QuizButton quizType="notes-notation" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Scales</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="major-scale" />
          <QuizButton quizType="natural-minor-scale" />
          <QuizButton quizType="harmonic-minor-scale" />
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

      <section className="mb-10">
        <h2 className="text-2xl mb-2 font-bold">Modes</h2>
        <div className="flex flex-wrap gap-3">
          <QuizButton quizType="ionian-mode" />
          <QuizButton quizType="dorian-mode" />
          <QuizButton quizType="phrygian-mode" />
          <QuizButton quizType="lydian-mode" />
          <QuizButton quizType="mixolydian-mode" />
          <QuizButton quizType="aeolian-mode" />
          <QuizButton quizType="locrian-mode" />
        </div>
      </section>
    </main>
  );
}
