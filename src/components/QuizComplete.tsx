import { formatTime, quizFeedback } from "../functions";
import { useAppSelector } from "../redux/hooks";

type Props = {
  score: number;
  timer: number;
};

export default function QuizComplete({ score, timer }: Props) {
  const numberOfQuestions = useAppSelector(
    (state) => state.quiz.questions.length,
  );

  return (
    <div className="p-6 mb-28">
      <p className="text-base text-gray-500 mb-2">{quizFeedback(score)}</p>
      <p className="text-3xl">
        You scored {score} out of {numberOfQuestions} in a time of{" "}
        {formatTime(timer)}.
      </p>
    </div>
  );
}
