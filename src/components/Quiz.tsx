import { useEffect, useState } from "react";
import { MAJOR_SCALE } from "../constants";
import { getKeys, getRandomStartNote, parseQuizToScale } from "../functions";
import Piano from "./Piano";

type Props = {
  quizType: QuizType;
};

export default function Quiz({ quizType }: Props) {
  const [startNote, setStartNote] = useState(getRandomStartNote());
  const [scale, setScale] = useState(MAJOR_SCALE);

  useEffect(() => {
    const parsedScale = parseQuizToScale(quizType);
    setScale(parsedScale);
  }, [quizType]);

  const nextScale = () => {
    setStartNote(getRandomStartNote());
  };

  return (
    <div>
      <div className="p-6">
        <h3 className="text-4xl mb-4">
          {startNote.replace("3", "")} {quizType.replaceAll("-", " ")}
        </h3>
      </div>
      <Piano scale={getKeys(startNote, scale)} nextScale={nextScale} />
    </div>
  );
}
