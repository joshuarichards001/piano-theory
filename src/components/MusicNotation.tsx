import { useEffect, useRef } from "react";
import Vex from "vexflow";

const MusicNotation = ({ note }: { note: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const randomNotePosition = () => {
    const clef = Math.random() < 0.5 ? "treble" : "bass";

    let octave = 0;
    if (clef === "treble") {
      octave = Math.random() < 0.5 ? 4 : 5;
    } else {
      octave = Math.random() < 0.5 ? 2 : 3;
    }

    return { octave, clef };
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      const uniqueId = `vexflow-container-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.id = uniqueId;

      const { Factory } = Vex.Flow;
      const vf = new Factory({
        renderer: { elementId: uniqueId, width: 120, height: 120 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      const { octave, clef } = randomNotePosition();

      system
        .addStave({
          voices: [score.voice(score.notes(`${note}${octave}/w`, { clef }))],
          options: {
            fill_style: "#000000",
            left_bar: true,
            space_above_staff_ln: 2,
          },
        })
        .addClef(clef);

      const context = vf.getContext();
      context.setFillStyle("#000000");

      vf.draw();
    }
  }, [note]);

  return <div ref={containerRef} />;
};

export default MusicNotation;
