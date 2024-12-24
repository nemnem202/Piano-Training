import { useEffect, useRef } from "react";
import { useNoteStore } from "../store";
import * as Tone from "tone";

const PianoSound = ({ sound }) => {
  const { noteOn, noteOff, countOn, countOff, notesActivated } = useNoteStore();

  const synthRef = useRef(null);

  useEffect(() => {
    // Initialiser le synthétiseur une seule fois
    synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
    synthRef.current.volume.value = -5;
    return () => {
      // Nettoyer les ressources au démontage
      synthRef.current.dispose();
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      if (noteOn === -1) return;
      const note = Tone.Midi(noteOn).toNote();
      synthRef.current.triggerAttack(note);
    }
  }, [noteOn, countOn]);

  useEffect(() => {
    if (sound) {
      const note = Tone.Midi(noteOff).toNote();
      synthRef.current.triggerRelease(note);
    }
  }, [noteOff, countOff]);

  useEffect(() => {
    if (notesActivated === 0) {
      synthRef.current.triggerRelease();
    }
  }, [notesActivated]);

  if (!sound) return;
};

export default PianoSound;
