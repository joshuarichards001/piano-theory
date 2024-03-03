import { useEffect, useMemo, useState } from "react";
import { NOTES } from "../constants";
import { createQuiz, getQuizBackgroundColour } from "../functions";
import Piano from "./Piano";
import QuizComplete from "./QuizComplete";
import { useAppSelector } from "../redux/hooks";

type Props = {
  quizType: QuizType;
};

export default function Quiz({ quizType }: Props) {
  const quiz = useMemo(() => createQuiz(quizType), [quizType]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const question = quiz[questionNumber];
  const startNote = NOTES[question[0]];
  const pressedKeys = useAppSelector((state) => state.pressedKeys);

  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

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
              <div className="flex items-center gap-2">
                <h3
                  className={`text-4xl ${getQuizBackgroundColour(
                    quizType,
                  )} rounded-lg px-1`}
                >
                  {startNote.replace("3", "")}{" "}
                </h3>
                <div>
                  <h3 className="text-2xl capitalize">
                    {quizType.replaceAll("-", " ")}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {pressedKeys.filter((key) => question.includes(key)).length}
                    /{question.length} Keys Pressed
                  </p>
                </div>
              </div>
              <h3 className="text-2xl">
                {questionNumber + 1}/{quiz.length}
              </h3>
            </div>
          </div>
          <Piano
            question={quiz[questionNumber]}
            nextQuestion={nextQuestion}
            setScore={setScore}
          />
          <div className="h-20 bg-black" />
        </div>
      ) : (
        <QuizComplete score={score} numberOfQuestions={quiz.length} />
      )}
    </div>
  );
}
