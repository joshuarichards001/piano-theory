import { IonIcon } from "@ionic/react";
import { reorderFour } from "ionicons/icons";
import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  setPianoScrollValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function PianoMinimap({ setPianoScrollValue }: IProps) {
  const [dragging, setDragging] = useState(false);
  const [objectX, setObjectX] = useState(0);
  const [objectWidth, setObjectWidth] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const pressDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ) => {
      setDragging(true);
      const isTouch = "touches" in e.nativeEvent;
      const userX = isTouch
        ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX
        : (e as React.MouseEvent<HTMLDivElement>).clientX;

      setOffsetX(userX - objectX);
    },
    [setDragging, objectX],
  );

  const pressMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (dragging && targetRef.current && childRef.current) {
        e.preventDefault();
        const isTouch = "touches" in e;
        const userX = isTouch ? e.touches[0].clientX : e.clientX;
        const maxX =
          targetRef.current.offsetWidth - childRef.current.offsetWidth;
        const newX = Math.min(Math.max(userX - offsetX, 0), maxX);
        setObjectX(newX);

        const percentage = newX / maxX;
        setPianoScrollValue(percentage);
      }
    },
    [dragging, offsetX, setPianoScrollValue],
  );

  const pressUp = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  useEffect(() => {
    window.addEventListener("mousemove", pressMove);
    window.addEventListener("mouseup", pressUp);
    window.addEventListener("touchmove", pressMove, { passive: false });
    window.addEventListener("touchend", pressUp, { passive: false });

    return () => {
      window.removeEventListener("mousemove", pressMove);
      window.removeEventListener("mouseup", pressUp);
      window.removeEventListener("touchmove", pressMove);
      window.removeEventListener("touchend", pressUp);
    };
  }, [dragging, pressDown, pressMove, pressUp]);

  useEffect(() => {
    const handleResize = () => {
      const pianoWidth = 672;
      const quizWidth = Math.min(window.innerWidth, pianoWidth);
      setObjectWidth((quizWidth / pianoWidth) * quizWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="h-10 w-full bg-base-300 relative overflow-hidden"
      ref={targetRef}
    >
      <div
        className={`h-10 absolute flex items-center justify-between cursor-move px-2 shadow-draggable ${
          dragging ? "bg-neutral/70" : "bg-neutral"
        }`}
        style={{ left: `${objectX}px`, width: `${objectWidth}px` }}
        onMouseDown={pressDown}
        onTouchStart={pressDown}
        ref={childRef}
      >
        <IonIcon icon={reorderFour} className="h-8 w-8 text-base-300" />
        <IonIcon icon={reorderFour} className="h-8 w-8 text-base-300" />
      </div>
    </div>
  );
}
