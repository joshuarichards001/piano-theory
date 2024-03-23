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
    window.addEventListener("touchmove", pressMove);
    window.addEventListener("touchend", pressUp);

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
    <div className="h-10 w-full bg-gray-500 relative" ref={targetRef}>
      <div
        className="h-10 bg-black p-1 absolute cursor-move"
        style={{ left: `${objectX}px`, width: `${objectWidth}px` }}
        onMouseDown={pressDown}
        onTouchStart={pressDown}
        ref={childRef}
      />
    </div>
  );
}
