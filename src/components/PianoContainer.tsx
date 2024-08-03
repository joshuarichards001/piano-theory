import { useState } from "react";
import Piano from "./Piano";
import PianoMinimap from "./PianoMinimap";

export default function PianoContainer() {
  const [pianoScrollValue, setPianoScrollValue] = useState(0);

  return (
    <div className="fixed bottom-0 z-50 max-w-2xl mx-auto md:bottom-40">
      <PianoMinimap setPianoScrollValue={setPianoScrollValue} />
      <Piano pianoScrollValue={pianoScrollValue} />
    </div>
  );
}
