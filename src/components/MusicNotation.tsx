import React, { useEffect, useRef } from 'react';
import Vex from 'vexflow';

const MusicNotation: React.FC<{ note: string }> = ({ note }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const uniqueId = `vexflow-container-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.id = uniqueId;

      const { Factory } = Vex.Flow;
      const vf = new Factory({
        renderer: { elementId: uniqueId, width: 120, height: 120 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [
            score.voice(score.notes(`${note}/w`)),
          ],
        })
        .addClef('treble')
      
      const context = vf.getContext();
      
      const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      context.setFillStyle(isDarkTheme ? '#FFFFFF' : '#000000');
      context.setStrokeStyle(isDarkTheme ? '#FFFFFF' : '#000000');

      vf.draw();
    }
  }, [note]);

  return <div ref={containerRef} />;
};

export default MusicNotation;