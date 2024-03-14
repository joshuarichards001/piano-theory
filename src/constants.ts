export const NOTES = [
  "C3",
  "C♯/D♭3",
  "D3",
  "D♯/E♭3",
  "E3",
  "F3",
  "F♯/G♭3",
  "G3",
  "G♯/A♭3",
  "A3",
  "A♯/B♭3",
  "B3",
  "C4",
  "C♯/D♭4",
  "D4",
  "D♯/E♭4",
  "E4",
  "F4",
  "F♯/G♭4",
  "G4",
  "G♯/A♭4",
  "A4",
  "A♯/B♭4",
  "B4",
];

export const OCTAVE = [
  "C",
  "C♯/D♭",
  "D",
  "D♯/E♭",
  "E",
  "F",
  "F♯/G♭",
  "G",
  "G♯/A♭",
  "A",
  "A♯/B♭",
  "B",
];

export const QUIZ_MAP = new Map<QuizType, Quiz>([
  [
    "notes",
    {
      keys: [0],
      name: "Notes",
      info: "Notes start at C with every white note being a new letter",
    },
  ],
  [
    "major-scale",
    {
      keys: [0, 2, 4, 5, 7, 9, 11, 12],
      name: "Major Scale",
      info: "Semi-notes: 2 - 2 - 1 - 2 - 2 - 2 - 1",
    },
  ],
  [
    "natural-minor-scale",
    {
      keys: [0, 2, 3, 5, 7, 8, 10, 12],
      name: "Natural Minor Scale",
      info: "Semi-notes: 2 - 1 - 2 - 2 - 1 - 2 - 2",
    },
  ],
  [
    "major-triad",
    { keys: [0, 4, 7], name: "Major Triad", info: "Semi-notes: 4 - 3" },
  ],
  [
    "minor-triad",
    { keys: [0, 3, 7], name: "Minor Triad", info: "Semi-notes: 3 - 4" },
  ],
  [
    "diminished-triad",
    { keys: [0, 3, 6], name: "Diminished Triad", info: "Semi-notes: 3 - 3" },
  ],
  [
    "major-7th-chord",
    { keys: [0, 4, 7, 11], name: "Major 7th", info: "Semi-notes: 4 - 3 - 4" },
  ],
  [
    "minor-7th-chord",
    { keys: [0, 3, 7, 10], name: "Minor 7th", info: "Semi-notes: 3 - 4 - 3" },
  ],
  [
    "dominant-7th-chord",
    {
      keys: [0, 4, 7, 10],
      name: "Dominant 7th",
      info: "Semi-notes: 4 - 3 - 3",
    },
  ],
  [
    "half-diminished-7th-chord",
    {
      keys: [0, 3, 6, 10],
      name: "Half Diminished 7th",
      info: "Semi-notes: 3 - 3 - 4",
    },
  ],
  [
    "diminished-7th-chord",
    {
      keys: [0, 3, 6, 9],
      name: "Diminished 7th",
      info: "Semi-notes: 3 - 3 - 3",
    },
  ],
]);
