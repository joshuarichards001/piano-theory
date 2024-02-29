import { NOTES } from "./constants";

export const whiteColor = (correct: boolean | null) => {
  if (correct === null) {
    return "bg-white";
  }

  if (correct) {
    return "bg-green-400";
  } else {
    return "bg-red-400";
  }
};

export const blackColor = (correct: boolean | null) => {
  if (correct === null) {
    return "bg-black";
  }

  if (correct) {
    return "bg-green-600";
  } else {
    return "bg-red-600";
  }
};

export const whiteBorder = (fileName: string) => {
  return `border-2 border-black ${
    (fileName === "E3.mp3" ||
      fileName === "B3.mp3" ||
      fileName === "E4.mp3" ||
      fileName === "B4.mp3") &&
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
