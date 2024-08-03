import { useState } from "react";
import Piano from "./Piano";
import PianoMinimap from "./PianoMinimap";

export default function PianoContainer() {
  const [pianoScrollValue, setPianoScrollValue] = useState(0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-piano-safe-bottom">
      <PianoMinimap setPianoScrollValue={setPianoScrollValue} />
      <Piano pianoScrollValue={pianoScrollValue} />
    </div>
  );
}
