import { OCTAVE, QUIZ_TYPE_DATA_MAP } from "./constants";

export const getKeyStyles = (note: string, keyState: KeyState) => {
  const sharedStyles = "select-none flex-shrink-0 border-black rounded-b";

  if (!note.includes("b") && !note.includes("#")) {
    return `w-12 h-40 shadow-white-key border-l-2 border-y-2 last:border-r-2 ${sharedStyles} ${whiteColour(
      keyState,
    )}`;
  } else {
    return `w-8 h-24 shadow-black-key border-2 z-10 -mx-4 ${sharedStyles} ${blackColour(
      keyState,
    )}`;
  }
};

const whiteColour = (keyState: KeyState) => {
  switch (keyState) {
    case "not-pressed":
      return "bg-gray-100";
    case "correct-pressed":
      return "bg-green-400";
    case "incorrect-pressed":
      return "bg-red-400";
    default:
      return;
  }
};

const blackColour = (keyState: KeyState) => {
  switch (keyState) {
    case "not-pressed":
      return "bg-gray-800";
    case "correct-pressed":
      return "bg-green-700";
    case "incorrect-pressed":
      return "bg-red-700";
    default:
      return;
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

const shuffle = (array: string[][]) => {
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

const getKeys = (startNote: string[], intervals: number[]) => {
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
  switch (true) {
    case score === 12:
      return "Perfect score! Great job!";
    case score >= 9:
      return "Great job! You're getting there!";
    case score >= 6:
      return "Not bad! Keep practicing!";
    default:
      return "Keep practicing! You'll get there!";
  }
};

export const isFinishedQuestion = (
  currentQuestion: number[],
  pressedKeys: number[],
) => {
  const currentQuestionFrequency = new Map<number, number>();
  const pressedKeysFrequency = new Map<number, number>();

  currentQuestion.forEach((key) => {
    const count = currentQuestionFrequency.get(key) || 0;
    currentQuestionFrequency.set(key, count + 1);
  });

  pressedKeys
    .map((k) => k % 12)
    .forEach((key) => {
      const count = pressedKeysFrequency.get(key) || 0;
      pressedKeysFrequency.set(key, count + 1);
    });

  for (const [key, value] of currentQuestionFrequency) {
    if (
      !pressedKeysFrequency.has(key) ||
      value > (pressedKeysFrequency.get(key) || 0)
    ) {
      return false;
    }
  }

  return true;
};

export const numberOfCorrectKeys = (
  currentQuestion: number[],
  pressedKeys: number[],
) => {
  const currentQuestionFrequency = new Map<number, number>();
  const pressedKeysFrequency = new Map<number, number>();

  currentQuestion.forEach((key) => {
    const count = currentQuestionFrequency.get(key) || 0;
    currentQuestionFrequency.set(key, count + 1);
  });

  pressedKeys
    .map((k) => k % 12)
    .forEach((key) => {
      const count = pressedKeysFrequency.get(key) || 0;
      pressedKeysFrequency.set(key, count + 1);
    });

  let correctKeys = 0;

  for (const [key, value] of currentQuestionFrequency) {
    if (pressedKeysFrequency.has(key)) {
      correctKeys += Math.min(value, pressedKeysFrequency.get(key) as number);
    }
  }

  return correctKeys;
};

export const isDeviceiOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const randomZeroOrOne = () => {
  return Math.floor(Math.random() * 2);
};

export const getKey = (
  octaveNote: string[],
  noteQuality: NoteQuality | undefined,
) => {
  switch (noteQuality) {
    case "sharp":
      return octaveNote[0];
    case "flat":
      return octaveNote[1];
    case "natural":
      return octaveNote[0];
    case "random":
      return octaveNote[randomZeroOrOne()];
    default:
      return octaveNote[0];
  }
};
