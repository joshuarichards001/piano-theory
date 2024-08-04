import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Vex from "vexflow";

const MusicNotation = ({ note }: { note: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "notes-notation-both";

  const getClef = (quizType: QuizType) => {
    if (quizType === "notes-notation-treble") {
      return "treble";
    } else if (quizType === "notes-notation-bass") {
      return "bass";
    } else {
      return "both";
    }
  };

  const randomNotePosition = useCallback(() => {
    let clef = "";
    const clefPreference = getClef(quizType);
    if (clefPreference === "both") {
      clef = Math.random() < 0.5 ? "treble" : "bass";
    } else {
      clef = clefPreference;
    }

    let octave = 0;
    if (clef === "treble") {
      octave = Math.random() < 0.5 ? 4 : 5;
    } else {
      octave = Math.random() < 0.5 ? 2 : 3;
    }

    return { octave, clef };
  }, [quizType]);

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
      context.scale(1.2, 1.2);

      vf.draw();
    }
  }, [note, randomNotePosition]);

  return <div ref={containerRef} />;
};

export default MusicNotation;
