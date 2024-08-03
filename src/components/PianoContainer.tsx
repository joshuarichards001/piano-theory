import { useState } from "react";
import Piano from "./Piano";
import PianoMinimap from "./PianoMinimap";

export default function PianoContainer() {
  const [pianoScrollValue, setPianoScrollValue] = useState(0);

  return (
    <>
      <PianoMinimap setPianoScrollValue={setPianoScrollValue} />
      <Piano pianoScrollValue={pianoScrollValue} />
    </>
  );
}
