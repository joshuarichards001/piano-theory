import { useState } from "react";
import { useParams } from "react-router-dom";
import Piano from "./Piano";
import PianoMinimap from "./PianoMinimap";

export default function PianoContainer() {
  const [pianoScrollValue, setPianoScrollValue] = useState(0);

  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";

  return (
    <div className="sticky bottom-0 z-50">
      {!quizType.includes("notes") && (
        <PianoMinimap setPianoScrollValue={setPianoScrollValue} />
      )}
      <Piano pianoScrollValue={pianoScrollValue} />
    </div>
  );
}
