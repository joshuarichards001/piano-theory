import {
  DIMINISHED_7TH,
  DOMINANT_7TH,
  HALF_DIMINISHED_7TH,
  MAJOR_7TH,
  MAJOR_SCALE,
  MINOR_7TH,
  NATURAL_MINOR_SCALE,
  NOTES,
  OCTAVE,
} from "./constants";

export const getKeyStyles = (note: string, keyState: KeyState) => {
  if (!note.includes("♭")) {
    return `grow-[3] h-24 ${whiteColor(keyState)} ${whiteBorder(note)}`;
  } else {
    return `grow-[2] h-14 border-2 border-black ${blackColor(
      keyState,
    )} z-10 -mx-[3%]`;
  }
};

export const whiteColor = (keyState: KeyState) => {
  if (keyState === "not-pressed") {
    return "bg-white";
  }

  if (keyState === "correct-pressed") {
    return "bg-green-400";
  } else if (keyState === "incorrect-pressed") {
    return "bg-red-400";
  } else if (keyState === "failed") {
    return "bg-green-200";
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
    return "bg-green-800";
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
  const keys = [];

  const startNoteIndex = NOTES.indexOf(startNote);

  for (let i = 0; i < intervals.length; i++) {
    keys.push(startNoteIndex + intervals[i]);
  }

  return keys;
};

export const parseQuizToKeys = (quizType: QuizType) => {
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
    case "half-diminished-7th-chord":
      return HALF_DIMINISHED_7TH;
    case "diminished-7th-chord":
      return DIMINISHED_7TH;
  }
};

export const getQuizColour = (quizType: QuizType) => {
  if (quizType === "major-scale") {
    return "btn-primary";
  } else if (quizType === "natural-minor-scale") {
    return "btn-secondary";
  } else if (quizType === "major-7th-chord") {
    return "btn-primary";
  } else if (quizType === "minor-7th-chord") {
    return "btn-secondary";
  } else if (quizType === "dominant-7th-chord") {
    return "btn-accent";
  } else if (quizType === "half-diminished-7th-chord") {
    return "btn-info";
  } else if (quizType === "diminished-7th-chord") {
    return "btn-warning";
  }
};

export const createQuiz = (quizType: QuizType) => {
  const quiz = [];
  const shuffledOctave = shuffle(OCTAVE);

  for (const note of shuffledOctave) {
    quiz.push(getKeys(note + "3", parseQuizToKeys(quizType)));
  }

  return quiz;
};

export const shuffle = (array: string[]) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const getKeyState = (
  keyIndex: number,
  pressedKeys: number[],
  question: number[],
): KeyState => {
  const isKeyInQuestion = question.includes(keyIndex);
  const isKeyInPressedKeys = pressedKeys.includes(keyIndex);

  if (isKeyInPressedKeys && isKeyInQuestion) {
    return "correct-pressed";
  } else if (isKeyInPressedKeys && !isKeyInQuestion) {
    return "incorrect-pressed";
  }

  return "not-pressed";
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${minutes}:${formattedSeconds}`;
};
