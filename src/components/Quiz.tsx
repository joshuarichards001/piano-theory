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
  const [questionNumber, setQuestionNumber] = useState(0);
  const startNote = NOTES[quiz[questionNumber][0]];
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const quizColour = () => {
    if (quizType === "major-scale") {
      return "bg-success";
    } else if (quizType === "natural-minor-scale") {
      return "bg-warning";
    } else if (quizType === "major-7th-chord") {
      return "bg-primary";
    } else if (quizType === "minor-7th-chord") {
      return "bg-secondary";
    } else if (quizType === "dominant-7th-chord") {
      return "bg-accent";
    }
  };

  useEffect(() => {
    setQuestionNumber(0);
    setScore(0);
    setDone(false);
  }, [quizType]);

  const nextQuestion = () => {
    if (questionNumber === quiz.length - 1) {
      setDone(true);
      return;
    }

    setQuestionNumber((prev) => prev + 1);
  };

  return (
    <div>
      {!done ? (
        <div>
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <div className="flex items-end gap-2">
                <h3 className={`text-4xl ${quizColour()} rounded-lg px-1`}>
                  {startNote.replace("3", "")}{" "}
                </h3>
                <h3 className="text-2xl">{quizType.replaceAll("-", " ")}</h3>
              </div>
              <h3 className="text-4xl">
                {questionNumber + 1}/{quiz.length}
              </h3>
            </div>
          </div>
          <Piano
            question={quiz[questionNumber]}
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
