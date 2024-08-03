import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { OCTAVE, OCTAVE_LENGTH } from "../constants";
import { getKeyState, isDeviceiOS, isFinishedQuestion } from "../functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetKeys } from "../redux/slices/pressedKeysSlice";
import {
  setCurrentQuestionIndex,
  setIsCompleted,
  setScore,
} from "../redux/slices/quizSlice";
import Key from "./Key";

interface IProps {
  pianoScrollValue: number;
}

export default function Piano({ pianoScrollValue }: IProps) {
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";
  const octaveCount = quizType.includes("notes") ? 1 : 2;
  const dispatch = useAppDispatch();
  const pressedKeys = useAppSelector((state) => state.pressedKeys);
  const currentQuestion = useAppSelector((state) => state.quiz.currentQuestion);
  const currentQuestionIndex = useAppSelector(
    (state) => state.quiz.currentQuestionIndex,
  );
  const quizLength = useAppSelector((state) => state.quiz.questions.length);
  const score = useAppSelector((state) => state.quiz.score);
  const pianoRef = useRef<HTMLDivElement>(null);
  const audioContext = useMemo(() => new AudioContext(), []);
  const [hasUnblockedAudio, setHasUnblockedAudio] = useState(false);

  // Scroll the piano to the correct position when the piano minimap position changes.
  useEffect(() => {
    const pianoContainer = pianoRef.current;
    if (pianoContainer) {
      const maxScrollLeft =
        pianoContainer.scrollWidth - pianoContainer.offsetWidth;
      pianoContainer.scrollLeft = pianoScrollValue * maxScrollLeft;
    }
  }, [pianoScrollValue]);

  // Runs when you finish the current question.
  useEffect(() => {
    if (isFinishedQuestion(currentQuestion, pressedKeys)) {
      const timeout = setTimeout(() => {
        if (pressedKeys.length === currentQuestion.length) {
          dispatch(setScore(score + 1));
        }
        if (currentQuestionIndex === quizLength - 1) {
          dispatch(setIsCompleted(true));
          return;
        }
        dispatch(resetKeys());
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [
    pressedKeys,
    currentQuestion,
    dispatch,
    score,
    currentQuestionIndex,
    quizLength,
  ]);

  // Unblocks audio on iOS devices.
  useEffect(() => {
    if (hasUnblockedAudio || !isDeviceiOS()) {
      return;
    }

    setHasUnblockedAudio(true);
    const audio = document.createElement("audio");
    audio.setAttribute("x-webkit-airplay", "deny");
    audio.preload = "auto";
    audio.loop = true;
    audio.src = "250-milliseconds-of-silence.mp3";
    audio.play();
  }, [hasUnblockedAudio]);

  // Prevent scrolling on the piano because navigation is determined by the piano minimap.
  useEffect(() => {
    const pianoContainer = pianoRef.current;
    if (pianoContainer) {
      pianoContainer.addEventListener("wheel", preventScroll, {
        passive: false,
      });
      pianoContainer.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
      return () => {
        pianoContainer.removeEventListener("wheel", preventScroll);
        pianoContainer.removeEventListener("touchmove", preventScroll);
      };
    }
  }, []);

  const preventScroll = (e: WheelEvent | TouchEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={pianoRef}
      className="flex overflow-x-scroll no-scrollbar whitespace-nowrap bg-base-300"
    >
      {Array.from({ length: octaveCount * OCTAVE_LENGTH }, (_, i) => (
        <Key
          key={i}
          note={OCTAVE[i % OCTAVE_LENGTH][0]}
          keyIndex={i}
          keyState={getKeyState(i, pressedKeys, currentQuestion)}
          audioContext={audioContext}
        />
      ))}
    </div>
  );
}
