import "./piano.css";
import { chords, scales } from "./arrays";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNoteStore, useChordListStore, useScoreStore } from "../store";

const PianoComponent = ({ chord, note, nmbrOctaves, play }) => {
  PianoComponent.displayName = "PianoComponent";
  const { noteOn, noteOff, countOn, countOff } = useNoteStore();
  const { chordsListStore, listStoreMode } = useChordListStore.getState();
  const {
    increaseWrongNotes,
    increaseCorrectNotes,
    increaseScore,
    clearCorrectNotes,
  } = useScoreStore();

  const [playedNotes, setPlayedNotes] = useState([]);
  const playedNotesRef = useRef([]);

  // Associe les chordIntervalls
  const updatePlayedNotes = (newNote) => {
    const updatedNotes = [...playedNotesRef.current, newNote];
    playedNotesRef.current = updatedNotes;
    setPlayedNotes(updatedNotes);
  };

  const chordData = chordsListStore[chord];

  let chordIntervalls = [];
  if (chordData) {
    if (listStoreMode) {
      chordIntervalls =
        chords.find((e) => e.nom === chordData.nom)?.intervalles || [];
    } else {
      chordIntervalls =
        scales.find((e) => e.nom === chordData.nom)?.intervalles || [];
    }
  }

  useEffect(() => {
    if (!chordData) return;
    const arrayActiveNotes = chordIntervalls.map(
      (intervall) => intervall + note
    );

    const allKeys = document.querySelectorAll(".whiteKey, .blackKey");
    allKeys.forEach((key) => {
      key.classList.remove("active");
      key.classList.remove("root");
    });

    arrayActiveNotes.forEach((active) => {
      const activeKey = document.querySelectorAll(`.key-${active % 12}`);
      activeKey.forEach((key) => {
        key.classList.add("active");
      });
    });
    const root = document.querySelectorAll(`.key-${note % 12}`);
    root.forEach((key) => {
      key.classList.add("root");
    });
  }, [chordData, chordIntervalls, countOn]);

  useEffect(() => {
    if (!chordData || noteOn === -1) return;

    const arrayActiveNotes = chordIntervalls.map(
      (intervall) => (intervall + note) % 12
    );

    const playedKey = document.querySelector(`.index-${noteOn - 36}`);
    if (!playedKey) return;

    if (arrayActiveNotes.includes(noteOn % 12)) {
      playedKey.classList.add("correct");

      // Vérifie si la note n'a pas encore été jouée
      if (!playedNotes.includes(noteOn % 12)) {
        increaseCorrectNotes();
        updatePlayedNotes(noteOn % 12);
      }
    } else {
      playedKey.classList.add("error");
      increaseWrongNotes();
    }
  }, [countOn, chordData, chordIntervalls, note]);

  useEffect(() => {
    console.log(playedNotes);
    if (playedNotes.length === chordIntervalls.length) {
      playedNotesRef.current = [];
      setPlayedNotes([]);
      clearCorrectNotes();
      increaseScore();
    }
  }, [playedNotes, chordIntervalls]);

  useEffect(() => {
    if (!chordData) return;

    const playedKey = document.querySelector(`.index-${noteOff - 36}`);

    if (noteOff === -1 || !playedKey) return;

    playedKey.classList.remove("correct");
    playedKey.classList.remove("error");
  }, [noteOff, countOff, chordData, nmbrOctaves]);

  useEffect(() => {
    const keys = document.querySelectorAll(".whiteKey, .blackKey");
    keys.forEach((key) => {
      key.classList.remove("correct");
      key.classList.remove("error");
    });
  }, [play, chordIntervalls]);

  if (!chordData) {
    return null;
  }

  return (
    <div className="fullKeyboardContainer">
      {Array.from({ length: nmbrOctaves }).map((_, index) => (
        <div key={index} className="octaveContainer" style={{ width: "400px" }}>
          <div className="whiteKeyContainer">
            <div className={`whiteKey key-0 index-${0 + 12 * index}`}></div>
            <div className={`whiteKey key-2 index-${2 + 12 * index}`}></div>
            <div className={`whiteKey key-4 index-${4 + 12 * index}`}></div>
            <div className={`whiteKey key-5 index-${5 + 12 * index}`}></div>
            <div className={`whiteKey key-7 index-${7 + 12 * index}`}></div>
            <div className={`whiteKey key-9 index-${9 + 12 * index}`}></div>
            <div className={`whiteKey key-11 index-${11 + 12 * index}`}></div>
          </div>

          <div className="blackKeyContainer">
            <div className="empty1"></div>
            <div className={`blackKey key-1 index-${1 + 12 * index}`}></div>
            <div className={`blackKey key-3 index-${3 + 12 * index}`}></div>
            <div className="empty2"></div>
            <div className={`blackKey key-6 index-${6 + 12 * index}`}></div>
            <div className={`blackKey key-8 index-${8 + 12 * index}`}></div>
            <div className={`blackKey key-10 index-${10 + 12 * index}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PianoComponent;
