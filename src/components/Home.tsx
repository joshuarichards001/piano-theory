import { useState } from "react";
import Quiz from "./Quiz";

export default function Home() {
  const [quizType, setQuizType] = useState<QuizType>("major-scale");

  return (
    <div className="h-full flex flex-col justify-between max-w-2xl mx-auto">
      <div className="p-6">
        <h1 className="text-4xl mb-6">Piano Theory</h1>
        <p className="mb-10">
          Pick a quiz type below and we will provide you direct feedback on the
          piano when you get a note right or wrong!
        </p>

        <div>
          <h2 className="text-xl mb-2">Scales</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setQuizType("major-scale")}
              className="btn btn-success"
            >
              Major
            </button>
            <button
              onClick={() => setQuizType("natural-minor-scale")}
              className="btn btn-warning"
            >
              Natural Minor
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl mb-2 mt-10">Chords</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setQuizType("major-7th-chord")}
              className="btn btn-primary"
            >
              Major 7th
            </button>
            <button
              onClick={() => setQuizType("minor-7th-chord")}
              className="btn btn-secondary"
            >
              Minor 7th
            </button>
            <button
              onClick={() => setQuizType("dominant-7th-chord")}
              className="btn btn-accent"
            >
              Dominant 7th
            </button>
          </div>
        </div>
      </div>
      <Quiz quizType={quizType} />
    </div>
  );
}
