import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  setPianoScrollValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function PianoMinimap({ setPianoScrollValue }: IProps) {
  const [dragging, setDragging] = useState(false);
  const [objectPos, setObjectPos] = useState(0);
  const [objectWidth, setObjectWidth] = useState(0);
  const mousePos = useRef(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const pressDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      setDragging(true);
      const isTouch = e instanceof TouchEvent;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      mousePos.current = clientX;
    },
    [setDragging],
  );

  const pressMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (dragging && targetRef.current && childRef.current) {
        const isTouch = e instanceof TouchEvent;
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const dx = clientX - mousePos.current;
        const x = Math.max(
          0,
          Math.min(
            targetRef.current?.offsetWidth - childRef.current.offsetWidth,
            objectPos + dx,
          ),
        );
        setObjectPos(x);
        mousePos.current = clientX;

        // Calculate the percentage
        const maxPos =
          targetRef.current.offsetWidth - childRef.current.offsetWidth;
        const percentage = x / maxPos;
        setPianoScrollValue(percentage);
      }
    },
    [dragging, objectPos, setPianoScrollValue],
  );

  const pressUp = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  useEffect(() => {
    window.addEventListener("mousedown", pressDown);
    window.addEventListener("mousemove", pressMove);
    window.addEventListener("mouseup", pressUp);
    window.addEventListener("touchstart", pressDown);
    window.addEventListener("touchmove", pressMove);
    window.addEventListener("touchend", pressUp);

    return () => {
      window.removeEventListener("mousedown", pressDown);
      window.removeEventListener("mousemove", pressMove);
      window.removeEventListener("mouseup", pressUp);
      window.removeEventListener("touchstart", pressDown);
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
        style={{ left: `${objectPos}px`, width: `${objectWidth}px` }}
        onMouseDown={pressDown}
        onTouchStart={pressDown}
        ref={childRef}
      />
    </div>
  );
}
