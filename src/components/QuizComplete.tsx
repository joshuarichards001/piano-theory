type Props = {
  score: number;
  numberOfQuestions: number;
};

export default function QuizComplete({ score, numberOfQuestions }: Props) {
  const quizFeedback = () => {
    if (score === 12) {
      return <p>Perfect score! Great job!</p>;
    } else if (score >= 9) {
      return <p>Great job! You're getting there!</p>;
    } else if (score >= 6) {
      return <p>Not bad! Keep practicing!</p>;
    } else {
      return <p>Keep practicing! You'll get there!</p>;
    }
  };

  return (
    <div>
      <p>{quizFeedback()}</p>
      <div>
        You scored {score} out of {numberOfQuestions}.
      </div>
    </div>
  );
}
