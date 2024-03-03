import {
  DOMINANT_7TH,
  MAJOR_7TH,
  MAJOR_SCALE,
  MINOR_7TH,
  NATURAL_MINOR_SCALE,
  NOTES,
  OCTAVE,
} from "./constants";

export const whiteColor = (keyState: KeyState) => {
  if (keyState === "not-pressed") {
    return "bg-white";
  }

  if (keyState === "correct-pressed") {
    return "bg-green-400";
  } else if (keyState === "incorrect-pressed") {
    return "bg-red-400";
  } else if (keyState === "failed") {
    return "bg-neutral-400";
  }
};

export const blackColor = (keyState: KeyState) => {
  if (keyState === "not-pressed") {
    return "bg-black";
  }

  if (keyState === "correct-pressed") {
    return "bg-green-600";
  } else if (keyState === "incorrect-pressed") {
    return "bg-red-600";
  } else if (keyState === "failed") {
    return "bg-neutral-600";
  }
};

export const whiteBorder = (fileName: string) => {
  return `border-2 border-black ${
    (fileName === "E3" ||
      fileName === "B3" ||
      fileName === "E4" ||
      fileName === "B4") &&
    "border-r-0"
  } last:border-r-2`;
};

export const getRandomStartNote = () => {
  return NOTES[Math.floor(Math.random() * 12)];
};

export const getKeys = (startNote: string, intervals: number[]) => {
  const scale = [];

  const startNoteIndex = NOTES.indexOf(startNote);

  for (let i = 0; i < intervals.length; i++) {
    scale.push(startNoteIndex + intervals[i]);
  }

  return scale;
};

export const parseQuizToScale = (quizType: QuizType) => {
  switch (quizType) {
    case "major-scale":
      return MAJOR_SCALE;
    case "natural-minor-scale":
      return NATURAL_MINOR_SCALE;
    case "major-7th-chord":
      return MAJOR_7TH;
    case "minor-7th-chord":
      return MINOR_7TH;
    case "dominant-7th-chord":
      return DOMINANT_7TH;
  }
};

export const createQuiz = (quizType: QuizType) => {
  const quiz = [];
  const shuffledOctave = [...OCTAVE]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  for (const note of shuffledOctave) {
    quiz.push(getKeys(note + "3", parseQuizToScale(quizType)));
  }

  return quiz;
};

export const getKeyState = (
  keyIndex: number,
  pressedKeys: number[],
  scale: number[],
): KeyState => {
  const scaleIndex = scale.indexOf(keyIndex);
  const pressedIndex = pressedKeys.lastIndexOf(keyIndex);

  if (pressedIndex !== -1) {
    if (scaleIndex !== -1 && scaleIndex === pressedIndex) {
      return "correct-pressed";
    } else if (scaleIndex === -1 || scaleIndex !== pressedIndex) {
      return "incorrect-pressed";
    }
  }

  if (scaleIndex !== -1 && scaleIndex < pressedKeys.length) {
    return "failed";
  }

  return "not-pressed";
};
