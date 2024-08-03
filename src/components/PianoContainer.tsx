import { useState } from "react";
import Piano from "./Piano";
import PianoMinimap from "./PianoMinimap";

export default function PianoContainer() {
  const [pianoScrollValue, setPianoScrollValue] = useState(0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <PianoMinimap setPianoScrollValue={setPianoScrollValue} />
      <Piano pianoScrollValue={pianoScrollValue} />
      <div className="h-16 bg-base-300" />
    </div>
  );
}
