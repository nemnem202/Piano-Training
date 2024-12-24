import { create } from "zustand";
import { notesList, chords, scales } from "./components/arrays";

const useNoteStore = create((set) => ({
  // État initial
  noteOn: -1, // Note actuellement jouée
  noteOff: -1, // Note actuellement éteinte
  countOn: 0,
  countOff: 0,
  notesActivated: 0,

  // Fonction pour mettre à jour noteOn et incrémenter countOn
  setNoteOn: (note) => {
    set((state) => {
      // Incrémenter countOn à chaque fois que setNoteOn est appelé
      return {
        noteOn: note,
        countOn: state.countOn + 1,
        notesActivated: state.notesActivated + 1,
      };
    });
  },

  setNoteOff: (note) => {
    set((state) => {
      // Incrémenter countOn à chaque fois que setNoteOn est appelé
      return {
        noteOff: note,
        countOff: state.countOff + 1,
        notesActivated: state.notesActivated - 1,
      };
    });
  },
}));

const useMidiEnlabedStore = create((set) => ({
  midiEnlabed: false,
  setMidiEnlabed: (bool) =>
    set({
      midiEnlabed: bool,
    }),
}));

const useMidiListArrayStore = create((set) => ({
  midiList: [],
  setMidiList: (array) =>
    set({
      midiList: array,
    }),
}));

const useNoteListStore = create((set) => ({
  notesListStore: notesList,

  addNoteToList: (note) =>
    set((state) => ({
      notesListStore: [...state.notesListStore, note], // Crée une nouvelle copie avec la note ajoutée
    })),

  removeNoteFromList: (note) =>
    set((state) => ({
      notesListStore: state.notesListStore.filter((n) => n !== note), // Filtre la note à supprimer
    })),
}));

const useChordListStore = create((set) => ({
  chordsListStore: chords, // Assurez-vous que `chords` est bien un tableau d'objets avec une propriété 'nom',
  listStoreMode: true,

  toggleListStore: (bool) =>
    set((state) => {
      if (bool) {
        console.log("mode set to chords");
        return {
          chordsListStore: chords,
          listStoreMode: true,
        };
      } else {
        console.log("mode set to scale");
        return {
          chordsListStore: scales,
          listStoreMode: false,
        };
      }
    }),

  addChordToList: (chordName) =>
    set((state) => {
      const chordToAdd = state.listStoreMode
        ? chords.find((chord) => chord.nom === chordName)
        : scales.find((scale) => scale.nom === chordName);
      if (chordToAdd) {
        return {
          chordsListStore: [...state.chordsListStore, chordToAdd], // Ajoute l'objet entier à la liste
        };
      }
      return state; // Si l'accord n'est pas trouvé, on ne fait rien
    }),

  removeChordFromList: (chordName) =>
    set((state) => ({
      chordsListStore: state.chordsListStore.filter((n) => n.nom !== chordName), // Filtre l'accord par son nom pour le supprimer
    })),
}));

const useScrollStore = create((set) => ({
  scrollMode: false,

  setScrollMode: (bool) => {
    set((state) => {
      return {
        scrollMode: bool,
      };
    });
  },
}));

const useScoreStore = create((set) => ({
  display: true,
  wrongNotes: 0,
  correctNotes: 0,
  score: 0,
  setDisplay: (bool) =>
    set((state) => ({
      display: bool,
    })),
  increaseWrongNotes: () =>
    set((state) => ({
      wrongNotes: (state.wrongNotes + 1) % 100, // Pas de modulo si inutile
    })),
  increaseCorrectNotes: () =>
    set((state) => ({
      correctNotes: (state.correctNotes + 1) % 100, // Pas de modulo si inutile
    })),
  clearCorrectNotes: () =>
    set(() => ({
      correctNotes: 0,
    })),
  increaseScore: () =>
    set((state) => ({
      score: state.score + (1 % 100),
    })),
  clearScore: () =>
    set(() => ({
      wrongNotes: 0,
      correctNotes: 0,
      score: 0,
    })),
}));

export {
  useNoteStore,
  useMidiEnlabedStore,
  useMidiListArrayStore,
  useNoteListStore,
  useChordListStore,
  useScrollStore,
  useScoreStore,
};
