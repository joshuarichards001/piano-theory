import { OCTAVE, QUIZ_TYPE_DATA_MAP } from "./constants";

export const getKeyStyles = (note: string, keyState: KeyState) => {
  const sharedStyles = "select-none flex-shrink-0 border-black rounded-b";

  if (!note.includes("♭")) {
    return `select-none flex-shrink-0 w-12 h-40 border-l-2 border-y-2 last:border-r-2 ${sharedStyles} ${whiteColour(
      keyState,
    )}`;
  } else {
    return `select-none flex-shrink-0 w-8 h-24 border-2 z-10 -mx-4 ${sharedStyles} ${blackColour(
      keyState,
    )}`;
  }
};

const whiteColour = (keyState: KeyState) => {
  if (keyState === "not-pressed") {
    return "bg-gray-100 active:bg-gray-200 shadow-white-key active:shadow-white-key-active";
  }

  if (keyState === "correct-pressed") {
    return "bg-green-400";
  } else if (keyState === "incorrect-pressed") {
    return "bg-red-400";
  }
};

const blackColour = (keyState: KeyState) => {
  if (keyState === "not-pressed") {
    return "bg-gray-800 shadow-black-key active:shadow-black-key-active";
  }

  if (keyState === "correct-pressed") {
    return "bg-green-700";
  } else if (keyState === "incorrect-pressed") {
    return "bg-red-700";
  }
};

export const createQuiz = (quizType: QuizType) => {
  const quiz = [];
  const shuffledOctave = shuffle([...OCTAVE]);
  const keys = QUIZ_TYPE_DATA_MAP.get(quizType)?.keys || [];

  for (const note of shuffledOctave) {
    quiz.push(getKeys(note, keys));
  }

  return quiz;
};

const shuffle = (array: string[]) => {
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

const getKeys = (startNote: string, intervals: number[]) => {
  const keys = [];

  const startNoteIndex = OCTAVE.indexOf(startNote);

  for (let i = 0; i < intervals.length; i++) {
    keys.push((startNoteIndex + intervals[i]) % 12);
  }

  return keys;
};

export const getKeyState = (
  keyIndex: number,
  pressedKeys: number[],
  question: number[],
): KeyState => {
  const isKeyInQuestion = question.includes(keyIndex % 12);
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
