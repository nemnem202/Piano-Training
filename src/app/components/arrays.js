export const notesList = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const chords = [
  {
    nom: "maj",
    intervalles: [0, 4, 7], // fondamentale (0), tierce majeure (4), quinte juste (7)
  },
  {
    nom: "min",
    intervalles: [0, 3, 7], // fondamentale (0), tierce mineure (3), quinte juste (7)
  },
  {
    nom: "dim",
    intervalles: [0, 3, 6], // fondamentale (0), tierce mineure (3), quinte diminuée (6)
  },
  {
    nom: "aug",
    intervalles: [0, 4, 8], // fondamentale (0), tierce majeure (4), quinte augmentée (8)
  },
  {
    nom: "maj7",
    intervalles: [0, 4, 7, 11], // fondamentale (0), tierce majeure (4), quinte juste (7), septième majeure (11)
  },
  {
    nom: "min7",
    intervalles: [0, 3, 7, 10], // fondamentale (0), tierce mineure (3), quinte juste (7), septième mineure (10)
  },
  {
    nom: "dom7",
    intervalles: [0, 4, 7, 10], // fondamentale (0), tierce majeure (4), quinte juste (7), septième mineure (10)
  },
  {
    nom: "maj6",
    intervalles: [0, 4, 7, 9], // fondamentale (0), tierce majeure (4), quinte juste (7), sixte majeure (9)
  },
  {
    nom: "min6",
    intervalles: [0, 3, 7, 9], // fondamentale (0), tierce mineure (3), quinte juste (7), sixte majeure (9)
  },
  {
    nom: "sus2",
    intervalles: [0, 2, 7], // fondamentale (0), seconde majeure (2), quinte juste (7)
  },
  {
    nom: "sus4",
    intervalles: [0, 5, 7], // fondamentale (0), quarte juste (5), quinte juste (7)
  },
  {
    nom: "dim7",
    intervalles: [0, 3, 6, 9], // fondamentale (0), tierce mineure (3), quinte diminuée (6), septième diminuée (9)
  },
  {
    nom: "half-dim7",
    intervalles: [0, 3, 6, 10], // fondamentale (0), tierce mineure (3), quinte diminuée (6), septième mineure (10)
  },
  {
    nom: "min9",
    intervalles: [0, 3, 7, 10, 14], // fondamentale (0), tierce mineure (3), quinte juste (7), septième mineure (10), neuvième majeure (14)
  },
  {
    nom: "maj9",
    intervalles: [0, 4, 7, 11, 14], // fondamentale (0), tierce majeure (4), quinte juste (7), septième majeure (11), neuvième majeure (14)
  },
  {
    nom: "dom9",
    intervalles: [0, 4, 7, 10, 14], // fondamentale (0), tierce majeure (4), quinte juste (7), septième mineure (10), neuvième majeure (14)
  },
  {
    nom: "add9",
    intervalles: [0, 4, 7, 14], // fondamentale (0), tierce majeure (4), quinte juste (7), neuvième majeure (14)
  },
  {
    nom: "7sus4",
    intervalles: [0, 5, 7, 10], // fondamentale (0), quarte juste (5), quinte juste (7), septième mineure (10)
  },
  {
    nom: "min11",
    intervalles: [0, 3, 7, 10, 14, 17], // fondamentale (0), tierce mineure (3), quinte juste (7), septième mineure (10), neuvième majeure (14), onzième juste (17)
  },
  {
    nom: "maj13",
    intervalles: [0, 4, 7, 11, 14, 21], // fondamentale (0), tierce majeure (4), quinte juste (7), septième majeure (11), neuvième majeure (14), treizième majeure (21)
  },
];
export const scales = [
  {
    nom: "Maj",
    intervalles: [0, 2, 4, 5, 7, 9, 11],
    rootChord: [0, 4, 7],
  },
  {
    nom: "Min",
    intervalles: [0, 2, 3, 5, 7, 8, 10],
    rootChord: [0, 3, 7],
  },
  {
    nom: "Harm-Min",
    intervalles: [0, 2, 3, 5, 7, 8, 11],
    rootChord: [0, 3, 7],
  },
  {
    nom: "Mel-Min",
    intervalles: [0, 2, 3, 5, 7, 9, 11],
    rootChord: [0, 3, 7],
  },
  {
    nom: "Pent-Maj",
    intervalles: [0, 2, 4, 7, 9],
    rootChord: [0, 4, 7],
  },
  {
    nom: "Pent-Min",
    intervalles: [0, 3, 5, 7, 10],
    rootChord: [0, 5, 10],
  },
  {
    nom: "Blues",
    intervalles: [0, 3, 5, 6, 7, 10],
    rootChord: [0, 5, 7],
  },
  {
    nom: "Lyd",
    intervalles: [0, 2, 4, 6, 7, 9, 11],
    rootChord: [0, 4, 7],
  },
  {
    nom: "Mixo",
    intervalles: [0, 2, 4, 5, 7, 9, 10],
    rootChord: [0, 4, 7],
  },
  {
    nom: "Dor",
    intervalles: [0, 2, 3, 5, 7, 9, 10],
    rootChord: [0, 3, 7],
  },
  {
    nom: "Phry",
    intervalles: [0, 1, 3, 5, 7, 8, 10],
    rootChord: [0, 3, 7],
  },
  {
    nom: "Loc",
    intervalles: [0, 1, 3, 5, 6, 8, 10],
    rootChord: [0, 3, 6],
  },
  {
    nom: "Dim",
    intervalles: [0, 2, 3, 5, 6, 8, 9, 11],
    rootChord: [0, 3, 6],
  },
  {
    nom: "Whole",
    intervalles: [0, 2, 4, 6, 8, 10],
    rootChord: [0, 4, 8],
  },
  {
    nom: "Aug",
    intervalles: [0, 3, 4, 7, 8, 11],
    rootChord: [0, 4, 8],
  },
  {
    nom: "Arab",
    intervalles: [0, 1, 4, 5, 6, 8, 10],
    rootChord: [0, 4, 6],
  },
  {
    nom: "Jap",
    intervalles: [0, 1, 5, 7, 8],
    rootChord: [0, 5, 8],
  },
  {
    nom: "Enig",
    intervalles: [0, 1, 4, 6, 8, 10, 11],
    rootChord: [0, 4, 8],
  },
  {
    nom: "Byz",
    intervalles: [0, 1, 4, 5, 7, 8, 11],
    rootChord: [0, 4, 7],
  },
  {
    nom: "Hung",
    intervalles: [0, 2, 3, 6, 7, 8, 11],
    rootChord: [0, 3, 7],
  },
];
