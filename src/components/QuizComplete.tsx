type Props = {
  score: number;
  numberOfQuestions: number;
};

export default function QuizComplete({ score, numberOfQuestions }: Props) {
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
    <div className="p-6 mb-16">
      <p className="text-2xl mb-4">{quizFeedback()}</p>
      <p className="text-xl">
        You scored {score} out of {numberOfQuestions}.
      </p>
    </div>
  );
}
