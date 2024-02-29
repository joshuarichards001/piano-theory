import { useState } from "react";
import { MAJOR_SCALE } from "../constants";
import { getKeys, getRandomStartNote } from "../functions";
import Piano from "./Piano";

type Props = {
  scaleType: ScaleType;
};

export default function Quiz({ scaleType }: Props) {
  const [startNote, setStartNote] = useState(getRandomStartNote());

  const nextScale = () => {
    setStartNote(getRandomStartNote());
  }

  return (
    <div>
      <div className="p-6">
        <h3 className="text-5xl mb-10">
          {startNote.replace("3", "")} {scaleType} scale
        </h3>
      </div>
      <Piano scale={getKeys(startNote, MAJOR_SCALE)} nextScale={nextScale} />
    </div>
  );
}
