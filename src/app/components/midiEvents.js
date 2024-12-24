"use client";

import { useEffect, useRef } from "react";
import {
  useNoteStore,
  useMidiEnlabedStore,
  useMidiListArrayStore,
} from "../store";
import * as Tone from "tone";

export default function MidiEvents() {
  const isInitialized = useRef(false); // Permet de s'assurer qu'une seule instance tourne.
  const { setNoteOn, setNoteOff } = useNoteStore();
  const { setMidiEnlabed } = useMidiEnlabedStore();
  const { setMidiList } = useMidiListArrayStore();

  useEffect(() => {
    if (isInitialized.current) return; // Empêche la réinitialisation si déjà initialisé.

    isInitialized.current = true; // Marque comme initialisé.

    if (navigator.requestMIDIAccess) {
      console.log("This browser supports WebMIDI!");

      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }

    function onMIDISuccess(midiAccess) {
      checkMIDIInputs(midiAccess);
      midiAccess.onstatechange = (event) => {
        checkMIDIInputs(midiAccess);
      };
    }

    function checkMIDIInputs(midiAccess) {
      const inputs = Array.from(midiAccess.inputs.values());

      if (inputs.length > 0) {
        setMidiEnlabed(true);
        setMidiList(inputs);
        console.log(`There are now ${inputs.length} MIDI inputs connected.`);
        midiMessageListener(midiAccess);
      } else {
        setMidiEnlabed(false);
        console.log("No MIDI inputs are connected.");
      }
    }

    function midiMessageListener(midiAccess) {
      for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
      }
    }

    function onMIDIFailure() {
      console.log("Error: Could not access MIDI devices.");
    }

    function getMIDIMessage(message) {
      const synth = new Tone.PolySynth().toDestination();
      synth.volume.value = -10;
      let command = message.data[0];
      let note = message.data[1];
      let velocity = message.data.length > 2 ? message.data[2] : 0;

      switch (command) {
        case 153: // note on
          if (velocity > 0) {
            noteOn(note);
          } else {
            noteOff(note);
          }
          break;
        case 137: // note off
          noteOff(note);
          break;
      }
    }

    function noteOn(note) {
      setNoteOn(note);
    }
    function noteOff(note) {
      setNoteOff(note);
    }

    return () => {
      // Cleanup si nécessaire lors du démontage.
      midiAccess?.inputs?.forEach((input) => (input.onmidimessage = null));
    };
  }, []);

  return null;
}
