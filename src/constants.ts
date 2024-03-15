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

export const QUIZ_TYPE_DATA_MAP = new Map<QuizType, QuizTypeData>([
  [
    "notes",
    {
      keys: [0],
      name: "Notes",
      info: "Notes start at C with every white note being a new letter, ♯'s and ♭'s are the black key higher or lower than the white key respectively.",
      colour: "btn-primary",
    },
  ],
  [
    "major-scale",
    {
      keys: [0, 2, 4, 5, 7, 9, 11, 12],
      name: "Major Scale",
      info: "Major scales follow the formula of whole and half steps: W-W-H-W-W-W-H.",
      colour: "btn-primary",
    },
  ],
  [
    "natural-minor-scale",
    {
      keys: [0, 2, 3, 5, 7, 8, 10, 12],
      name: "Natural Minor Scale",
      info: "Natural Minor scales follow the formula of whole and half steps: W-H-W-W-H-W-W.",
      colour: "btn-secondary",
    },
  ],
  [
    "major-triad",
    {
      keys: [0, 4, 7],
      name: "Major Triad",
      info: "Major Triads are constructed with a root, a major third and a perfect fifth.",
      colour: "btn-primary",
    },
  ],
  [
    "minor-triad",
    {
      keys: [0, 3, 7],
      name: "Minor Triad",
      info: "Minor Triads are constructed with a root, a minor third and a perfect fifth.",
      colour: "btn-secondary",
    },
  ],
  [
    "diminished-triad",
    {
      keys: [0, 3, 6],
      name: "Diminished Triad",
      info: "Diminished Triads are constructed with a root, a minor third and a flattened fifth.",
      colour: "btn-neutral",
    },
  ],
  [
    "major-7th-chord",
    {
      keys: [0, 4, 7, 11],
      name: "Major 7th",
      info: "Major 7th chord is constructed with a root, a major third, a perfect fifth and a major seventh.",
      colour: "btn-primary",
    },
  ],
  [
    "minor-7th-chord",
    {
      keys: [0, 3, 7, 10],
      name: "Minor 7th",
      info: "Minor 7th chord is constructed with a root, a minor third, a perfect fifth and a minor seventh.",
      colour: "btn-secondary",
    },
  ],
  [
    "dominant-7th-chord",
    {
      keys: [0, 4, 7, 10],
      name: "Dominant 7th",
      info: "Dominant 7th chord is constructed with a root, a major third, a perfect fifth and a minor seventh.",
      colour: "btn-accent",
    },
  ],
  [
    "half-diminished-7th-chord",
    {
      keys: [0, 3, 6, 10],
      name: "Half Diminished 7th",
      info: "Half Diminished 7th is a minor seventh chord with a lowered fifth.",
      colour: "btn-info",
    },
  ],
  [
    "diminished-7th-chord",
    {
      keys: [0, 3, 6, 9],
      name: "Diminished 7th",
      info: "Diminished 7th is a diminished chord extended with a minor third.",
      colour: "btn-neutral",
    },
  ],
]);
