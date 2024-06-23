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
    "harmonic-minor-scale",
    {
      keys: [0, 2, 3, 5, 7, 8, 11, 12],
      name: "Harmonic Minor Scale",
      info: "Harmonic Minor Scales follow the same formula as a natural minor scale but raises the 7th note a half step (e.g. D-E-F-G-A-B♭-C♯-D).",
      colour: "btn-accent",
    },
  ],
  [
    "ionian-mode",
    {
      keys: [0, 2, 4, 5, 7, 9, 11, 12],
      name: "Ionian Mode",
      info: "The Ionian mode is identical to a Major Scale. Starting on any given note follow the pattern: W-W-H-W-W-W-H (e.g. D-E-F♯-G-A-B-C♯-D).",
      colour: "btn-primary",
    },
  ],
  [
    "dorian-mode",
    {
      keys: [0, 2, 3, 5, 7, 9, 10, 12],
      name: "Dorian Mode",
      info: "The Dorian mode is a scale that starts on the second note of a major scale. It follows a pattern of whole and half steps: W-H-W-W-W-H-W. In D Dorian, this would be D-E-F-G-A-B-C-D.",
      colour: "btn-secondary",
    },
  ],
  [
    "phrygian-mode",
    {
      keys: [0, 1, 3, 5, 7, 8, 10, 12],
      name: "Phrygian Mode",
      info: "The Phrygian mode is a scale that starts on the third note of a major scale. It follows a pattern of whole and half steps: H-W-W-W-H-W-W. In D Phrygian, this would be D-E♭-F-G-A-B♭-C-D.",
      colour: "btn-accent",
    },
  ],
  [
    "lydian-mode",
    {
      keys: [0, 2, 4, 6, 7, 9, 11, 12],
      name: "Lydian Mode",
      info: "The Lydian mode is a scale that starts on the fourth note of a major scale. It follows a pattern of whole and half steps: W-W-W-H-W-W-H. In D Lydian, this would be D-E-F#-G#-A-B-C#-D.",
      colour: "btn-info",
    },
  ],
  [
    "mixolydian-mode",
    {
      keys: [0, 2, 4, 5, 7, 9, 10, 12],
      name: "Mixolydian Mode",
      info: "The Mixolydian mode is a scale that starts on the fifth note of a major scale. It follows a pattern of whole and half steps: W-W-H-W-W-H-W. In D Mixolydian, this would be D-E-F#-G-A-B-C-D.",
      colour: "btn-neutral",
    },
  ],
  [
    "aeolian-mode",
    {
      keys: [0, 2, 3, 5, 7, 8, 10, 12],
      name: "Aeoilan Mode",
      info: "The Aeolian mode is identical to a Natural Minor Scale. Starting on any given note follow the pattern: W-H-W-W-H-W-W (e.g. D-E-F-G-A-B♭-C-D).",
      colour: "btn-success",
    },
  ],
  [
    "locrian-mode",
    {
      keys: [0, 1, 3, 5, 6, 8, 10, 12],
      name: "Locrian Mode",
      info: "The Locrian mode is a scale that starts on the seventh note of a major scale. It follows a pattern of whole and half steps: H-W-W-H-W-W-W. In D Locrian, this would be D-E♭-F-G-A♭-B♭-C-D.",
      colour: "btn-error",
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
