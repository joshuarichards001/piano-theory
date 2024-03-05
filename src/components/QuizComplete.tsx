import { formatTime } from "../functions";

type Props = {
  score: number;
  numberOfQuestions: number;
  timer: number;
};

export default function QuizComplete({
  score,
  numberOfQuestions,
  timer,
}: Props) {
  const quizFeedback = () => {
    if (score === 12) {
      return "Perfect score! Great job!";
    } else if (score >= 9) {
      return "Great job! You're getting there!";
    } else if (score >= 6) {
      return "Not bad! Keep practicing!";
    } else {
      return "Keep practicing! You'll get there!";
    }
  };

  return (
    <div className="p-6 mb-36">
      <p className="text-base text-gray-500 mb-2">{quizFeedback()}</p>
      <p className="text-3xl">
        You scored {score} out of {numberOfQuestions} in a time of{" "}
        {formatTime(timer)}.
      </p>
    </div>
  );
}
