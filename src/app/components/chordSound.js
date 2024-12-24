import React, { useState, useCallback, useEffect } from "react";
import * as Tone from "tone";
import { chords, scales } from "./arrays";
import { useChordListStore } from "../store";

const ChordSound = React.memo(({ chord, note, bpm, play, count }) => {
  ChordSound.displayName = "ChordSound";

  const [arrayActiveNotes, setArrayActiveNotes] = useState([]);
  const { chordsListStore, listStoreMode } = useChordListStore.getState();

  // Associe les chordIntervalls
  const chordData = chordsListStore[chord];
  let chordIntervalls = [];

  if (chordData) {
    if (listStoreMode) {
      chordIntervalls =
        chords.find((e) => e.nom === chordData.nom)?.intervalles || [];
    } else {
      chordIntervalls =
        scales.find((e) => e.nom === chordData.nom)?.rootChord || [];
    }
  }

  const calculateActiveNotes = useCallback(() => {
    const activeNotes = chordIntervalls.map((intervall) => intervall + note);
    setArrayActiveNotes(activeNotes);
  }, [chordIntervalls, note]);

  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
    }).toDestination();
    synth.set({
      envelope: {
        release: 0.5,
      },
    });
    synth.volume.value = -10;

    if (play && synth) {
      arrayActiveNotes.forEach((element) => {
        const midiNote = Tone.Midi((element % 48) + 48).toNote();
        synth.triggerAttackRelease(midiNote, (60 / bpm) * 4 - 0.5);
      });
    }
    return () => {
      synth.dispose();
    };
  }, [arrayActiveNotes, bpm, count]);

  useEffect(() => {
    calculateActiveNotes();
  }, [calculateActiveNotes]);

  return null;
});

export default ChordSound;
