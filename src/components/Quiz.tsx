import { NOTES } from "../constants";
import { getRandomStartNote } from "../functions";
import Piano from "./Piano";

type Props = {
  scaleType: string;
};

export default function Quiz({ scaleType }: Props) {
  const startNote = getRandomStartNote();

  const buildScale = () => {
    const scale = [];
    const startNoteIndex = NOTES.indexOf(startNote);

    scale.push(NOTES[startNoteIndex]);

    if (scaleType === "major") {
      scale.push(NOTES[startNoteIndex + 2]);
      scale.push(NOTES[startNoteIndex + 4]);
      scale.push(NOTES[startNoteIndex + 5]);
      scale.push(NOTES[startNoteIndex + 7]);
      scale.push(NOTES[startNoteIndex + 9]);
      scale.push(NOTES[startNoteIndex + 11]);
      scale.push(NOTES[startNoteIndex + 12]);
    }

    return scale;
  };

  return (
    <div>
      <div className="p-6">
        <h3 className="text-5xl mb-10">
          {startNote.replace("3", "")} {scaleType} scale
        </h3>
      </div>
      <Piano scale={buildScale()} />
    </div>
  );
}
