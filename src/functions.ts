import { NOTES, OCTAVE, QUIZ_MAP } from "./constants";

export const getKeyStyles = (
  note: string,
  keyState: KeyState,
  quizType: QuizType,
) => {
  const isNotes = quizType === "notes";
  const whiteHeight = isNotes ? "h-36" : "h-24";
  const blackHeight = isNotes ? "h-20" : "h-14";
  const offset = isNotes ? "-mx-[6%]" : "-mx-[3%]";

  if (!note.includes("♭")) {
    return `select-none grow-[3] ${whiteHeight} ${whiteColour(
      keyState,
    )} ${whiteBorder(note)}`;
  } else {
    return `select-none grow-[2] ${blackHeight} border-2 border-black ${blackColour(
      keyState,
    )} z-10 ${offset}`;
  }
};

export const whiteColour = (keyState: KeyState) => {
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

export const blackColour = (keyState: KeyState) => {
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

export const createQuiz = (quizType: QuizType) => {
  const quiz = [];
  const shuffledOctave = shuffle(OCTAVE);
  const keys = QUIZ_MAP.get(quizType)?.keys || [];

  for (const note of shuffledOctave) {
    quiz.push(getKeys(note + "3", keys));
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

export const quizFeedback = (score: number) => {
  if (score === 12) {
    return "Perfect score! Great job!";
  } else if (score >= 9) {
    return "Great job! You're getting there!";
  } else if (score >= 6) {
    return "Not bad! Keep practicing!";
  } else {
    return "Keep practicing! You'll get there!";
  }
};
