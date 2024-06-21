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
      info: "White keys are notes from A to G, repeating in cycles. The piano below starts at C. Sharps (♯) and flats (♭) are the black key above or below the white key respectively. E♯ is the same as F, and C♭ is the same as B.",
      colour: "btn-primary",
    },
  ],
  [
    "major-scale",
    {
      keys: [0, 2, 4, 5, 7, 9, 11, 12],
      name: "Major Scale",
      info: "Major scales follow a formula of half and whole steps (half is one key over, whole is two keys over). Starting on any given note follow the pattern: W-W-H-W-W-W-H (e.g. D-E-F♯-G-A-B-C♯-D).",
      colour: "btn-primary",
    },
  ],
  [
    "natural-minor-scale",
    {
      keys: [0, 2, 3, 5, 7, 8, 10, 12],
      name: "Natural Minor Scale",
      info: "Natural Minor Scales follow a formula of half and whole steps (half is one key over, whole is two keys over). Starting on any given note follow the pattern: W-H-W-W-H-W-W (e.g. D-E-F-G-A-B♭-C-D).",
      colour: "btn-secondary",
    },
  ],
  [
    "major-triad",
    {
      keys: [0, 4, 7],
      name: "Major Triad",
      info: "Major Triads are constructed with a root, a major third (4 half steps above the root) and a perfect fifth (7 half steps above the root). For example, D major triad: D (root), F♯ (major third), A (perfect fifth).",
      colour: "btn-primary",
    },
  ],
  [
    "minor-triad",
    {
      keys: [0, 3, 7],
      name: "Minor Triad",
      info: "Minor Triads are constructed with a root, a minor third (3 half steps above the root) and a perfect fifth (7 half steps above the root). For example, D minor triad: D (root), F (minor third), A (perfect fifth).",
      colour: "btn-secondary",
    },
  ],
  [
    "diminished-triad",
    {
      keys: [0, 3, 6],
      name: "Diminished Triad",
      info: "Diminished Triads are constructed with a root, a minor third (3 half steps above the root) and a diminished fifth (6 half steps above the root). For example, D diminished triad: D (root), F (minor third), G♯ (diminished fifth).",
      colour: "btn-neutral",
    },
  ],
  [
    "major-7th-chord",
    {
      keys: [0, 4, 7, 11],
      name: "Major 7th",
      info: "A major 7th chord is a major triad with an added major seventh (11 half steps above the root). For example, D major 7th: D (root), F♯ (major third), A (perfect fifth), C♯ (major seventh).",
      colour: "btn-primary",
    },
  ],
  [
    "minor-7th-chord",
    {
      keys: [0, 3, 7, 10],
      name: "Minor 7th",
      info: "A minor 7th chord is a minor triad with an added minor seventh (10 half steps above the root). For example, D minor 7th: D (root), F (minor third), A (perfect fifth), C (minor seventh).",
      colour: "btn-secondary",
    },
  ],
  [
    "dominant-7th-chord",
    {
      keys: [0, 4, 7, 10],
      name: "Dominant 7th",
      info: "A dominant 7th chord is a major triad with an added minor seventh (10 half steps above the root). For example, D dominant 7th: D (root), F♯ (major third), A (perfect fifth), C (minor seventh).",
      colour: "btn-accent",
    },
  ],
  [
    "half-diminished-7th-chord",
    {
      keys: [0, 3, 6, 10],
      name: "Half-Diminished 7th",
      info: "A half-diminished 7th chord is a diminished triad with an added minor seventh (10 half steps above the root). For example, D half-diminished 7th: D (root), F (minor third), G♯ (diminished fifth), C (minor seventh).",
      colour: "btn-info",
    },
  ],
  [
    "diminished-7th-chord",
    {
      keys: [0, 3, 6, 9],
      name: "Diminished 7th",
      info: "A diminished 7th chord is a diminished triad with an added diminished seventh (9 half steps above the root). For example, D diminished 7th: D (root), F (minor third), G♯ (diminished fifth), B (diminished seventh).",
      colour: "btn-neutral",
    },
  ],
]);
