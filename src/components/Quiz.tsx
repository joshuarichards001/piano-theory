import { useEffect, useState } from "react";
import { NOTES } from "../constants";
import { createQuiz } from "../functions";
import Piano from "./Piano";
import QuizComplete from "./QuizComplete";

type Props = {
  quizType: QuizType;
};

export default function Quiz({ quizType }: Props) {
  const quiz = createQuiz(quizType);
  const [question, setQuestion] = useState(0);
  const startNote = NOTES[quiz[question][0]];
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setQuestion(0);
    setScore(0);
    setDone(false);
  }, [quizType]);

  const nextQuestion = () => {
    if (question === quiz.length - 1) {
      setDone(true);
      return;
    }

    setQuestion((prev) => prev + 1);
  };

  return (
    <div>
      {!done ? (
        <div>
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <div className="flex items-end gap-2">
                <h3 className="text-4xl bg-primary rounded-lg px-1">
                  {startNote.replace("3", "")}{" "}
                </h3>
                <h3 className="text-2xl">{quizType.replaceAll("-", " ")}</h3>
              </div>
              <h3 className="text-4xl">
                {question + 1}/{quiz.length}
              </h3>
            </div>
          </div>
          <Piano
            scale={quiz[question]}
            nextQuestion={nextQuestion}
            setScore={setScore}
          />
        </div>
      ) : (
        <QuizComplete score={score} numberOfQuestions={quiz.length} />
      )}
    </div>
  );
}
