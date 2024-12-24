"use client";

import PianoComponent from "../components/piano";
import MidiList from "../components/midiList";
import PianoSound from "../components/pianoSound";
import "./home.css";
import React, { useState, useRef, useEffect } from "react";
import {
  useMidiEnlabedStore,
  useNoteListStore,
  useChordListStore,
  useScrollStore,
  useNoteStore,
  useScoreStore,
} from "../store";
import Menu from "../components/menu";
import * as Tone from "tone";

const Home = React.memo(() => {
  Home.displayName = "Home";
  const notesListStore = useNoteListStore((state) => state.notesListStore);
  const chordsListStore = useChordListStore((state) => state.chordsListStore);
  const { wrongNotes, correctNotes, score, display } = useScoreStore();

  const { scrollMode } = useScrollStore();
  const [chordArray, setChordArray] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showMidiList, setShowMidiList] = useState(false);
  const [bpm, setBpm] = useState(300);
  const [quarterNote, setQuarterNote] = useState(0);
  const [play, setPlay] = useState(false);
  const clickSound = "/metronome.mp3";
  const { midiEnlabed } = useMidiEnlabedStore();
  const [measureCount, setMeasureCount] = useState(0);
  const measureCountRef = useRef(measureCount);
  const [pianoSound, setPianoSound] = useState(false);
  const { notesActivated } = useNoteStore();

  useEffect(() => {
    const chordsContainer = document.querySelector(".chordsContainer");
    const initArray = Array.from({ length: 4 }, () => ({
      fundamental: Math.floor(Math.random() * notesListStore.length),
      chord: Math.floor(Math.random() * chordsListStore.length),
    }));
    setChordArray(initArray);
    setChordContainer(
      chordsContainer,
      initArray,
      notesListStore,
      chordsListStore
    );
  }, [notesListStore, chordsListStore]);

  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    const menu = document.querySelector(".menu");

    const handleClickOutside = (event) => {
      if (event.target === overlay) {
        overlay.classList.add("hidden");
        menu.classList.add("hidden");
        setShowMenu(false);
      }
    };

    overlay.addEventListener("click", handleClickOutside);

    return () => {
      overlay.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    const menu = document.querySelector(".midiList");

    const handleClickOutside = (event) => {
      if (event.target === overlay) {
        overlay.classList.add("hidden");
        menu.classList.add("hidden");
        setShowMidiList(false);
      }
    };

    overlay.addEventListener("click", handleClickOutside);

    return () => {
      overlay.removeEventListener("click", handleClickOutside);
    };
  }, [showMidiList]);

  const handleBpm = (event) => {
    setPlay(false);
    setBpm(event.target.value);
  };

  const handlePlay = () => {
    setPlay(!play);
  };

  useEffect(() => {
    let intervaltransform;

    if (play) {
      intervaltransform = setInterval(() => {
        handletransform();
        measureCountRef.current += 1;
        setMeasureCount(measureCountRef.current);
      }, (60000 / bpm) * 4);
    }

    return () => {
      if (intervaltransform) {
        clearInterval(intervaltransform);
      }
    };
  }, [bpm, play]);

  useEffect(() => {
    let intervalQuarterNote;

    if (play) {
      setQuarterNote(1);

      intervalQuarterNote = setInterval(() => {
        const click = new Audio(clickSound);
        click.play();
        setQuarterNote((prevQuarterNote) => {
          if (prevQuarterNote >= 4) {
            return 1; // Réinitialise à 0 lorsque la valeur atteint 4
          }
          return prevQuarterNote + 1; // Incrémente la valeur de quarterNote
        });
      }, 60000 / bpm);
    }

    return () => {
      if (intervalQuarterNote) {
        clearInterval(intervalQuarterNote); // Nettoyage de l'intervalle de quarterNote
      }
    };
  }, [bpm, play]);

  useEffect(() => {
    if (!scrollMode && !showMenu && !showMidiList) {
      handletransform();
      measureCountRef.current += 1;
      setMeasureCount(measureCountRef.current);
    }
  }, [score, showMenu, showMidiList]);

  const handletransform = () => {
    const chordsContainer = document.querySelector(".chordsContainer");
    translateChords();
    setChordArray((prevArray) => {
      const newArray = [...prevArray];
      addNewChord(newArray, notesListStore, chordsListStore);
      setTimeout(() => {
        setChordContainer(
          chordsContainer,
          newArray,
          notesListStore,
          chordsListStore
        );
      }, 300);

      return newArray;
    });
  };

  return (
    <>
      <PianoSound sound={pianoSound} />
      <div className="corner">
        <button
          onClick={() => {
            setShowMidiList(true);
            setPlay(false);
          }}
          className={`MidiEnlabed ${midiEnlabed ? "active" : ""}`}
        >
          {midiEnlabed ? "MIDI Enlabed" : "MIDI Disabled"}
        </button>
        <button
          onClick={() => {
            setShowMenu(true);
            setPlay(false);
          }}
          className="settings"
        >
          <svg version="1.1" id="Layer_1" viewBox="0 0 455 455">
            <path
              d="M455,257v-70h-63.174c-4.423-20.802-12.706-40.174-24.066-57.334l42.32-42.32l-49.498-49.498l-42.756,42.756
	C299.911,69.199,279.682,61.104,258,57.183V0h-70v59.319c-21.306,5.221-41.009,14.515-58.24,27.014L88.346,44.92L38.849,94.417
	l43.979,43.979C72.59,156.135,65.513,175.926,62.359,197H0v70h66.623c5.396,19.392,14.195,37.364,25.711,53.24L45.92,366.654
	l49.497,49.498l48.979-48.979c16.329,9.424,34.397,16.171,53.604,19.645V455h70v-70.319c18.91-4.634,36.557-12.476,52.334-22.92
	l47.32,47.32l49.498-49.498l-47.756-47.756c10.524-16.531,18.223-35.033,22.431-54.827H455z M228,309.5
	c-48.248,0-87.5-39.252-87.5-87.5s39.252-87.5,87.5-87.5s87.5,39.252,87.5,87.5S276.248,309.5,228,309.5z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`overlay ${showMenu || showMidiList ? "" : "hidden"}`}
      ></div>
      <div className={`menu ${showMenu ? "" : "hidden"}`}>
        <Menu />
      </div>
      <div className={`midiList ${showMidiList ? "" : "hidden"}`}>
        <MidiList />
      </div>
      {scrollMode ? (
        <div className="bpmPlayContainer">
          <button onClick={handlePlay} className={`playButton`}>
            {play ? (
              <svg viewBox="0 0 16 16" className="stop">
                <path d="M7 0H2V16H7V0Z" />
                <path d="M14 0H9V16H14V0Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 17.804 17.804" className="play">
                <g>
                  <g id="c98_play">
                    <path
                      d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313
    c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04
    c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"
                    />
                  </g>
                  <g id="Capa_1_78_"></g>
                </g>
              </svg>
            )}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ fontSize: "150%", color: "var(--color4)" }}>
              BPM :{" "}
            </div>
            <input
              type="number"
              defaultValue={bpm}
              onChange={handleBpm}
              className="bpmInput"
            ></input>{" "}
          </div>
        </div>
      ) : (
        <div className="bpmPlayContainer"></div>
      )}

      <div className="chordsContainer"></div>
      {scrollMode ? (
        <div className="pointsBpm">
          {Array.from({ length: quarterNote }).map((_, index) => (
            <div key={index} className="point"></div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <div className="scoreContainer">
        {display ? (
          <>
            {" "}
            <div className="scoreBox">
              <h1>{wrongNotes}</h1> <h2>wrong</h2>
            </div>
            <div className="scoreBox">
              <h1>{correctNotes}</h1> <h2>correct</h2>
            </div>
            <div className="scoreBox">
              <h1>{score}</h1> <h2>score</h2>
            </div>{" "}
          </>
        ) : (
          ""
        )}
      </div>
      <div className="menuAndPiano">
        <div className="pianoContainer">
          <PianoComponent
            chord={chordArray[1]?.chord || 0}
            note={chordArray[1]?.fundamental || 0}
            nmbrOctaves={3}
            play={play}
          />
        </div>
        <div>
          <button
            onClick={() => {
              setPianoSound(!pianoSound);
              console.log(pianoSound);
            }}
          >
            pianoSound ?
          </button>
        </div>
      </div>
    </>
  );
});

function convertValuesToChord(notesArray, chordsArray, note, harm) {
  return `${notesArray[note] ?? ""}${chordsArray[harm]?.nom ?? ""}`;
}

function translateChords() {
  const passedChord = document.querySelector(".passedChord");
  const activeChord = document.querySelector(".activeChord");
  const nextChord = document.querySelector(".nextChord");
  const nextChord2 = document.querySelector(".nextChord2");

  passedChord.style.transform = "translateX(-420px)";
  passedChord.style.opacity = "0";

  activeChord.style.transform = "translateX(-420px)";
  activeChord.style.backgroundPosition = "0px 0";
  activeChord.style.fontSize = "300%";
  activeChord.style.height = "100px";

  nextChord.style.transform = "translateX(-420px)";
  nextChord.style.backgroundPosition = "-420px 0";
  nextChord.style.height = "150px";
  nextChord.style.fontSize = "450%";

  nextChord2.style.transform = "translateX(-420px)";
  nextChord2.style.backgroundPosition = "-840px 0";
  nextChord2.style.opacity = "1";
}

function addNewChord(array, notesArray, chordsArray) {
  array.shift();
  const newChord = {
    fundamental: Math.floor(Math.random() * notesArray.length),
    chord: Math.floor(Math.random() * chordsArray.length),
  };
  array.push(newChord);
}

function setChordContainer(container, array, notesArray, chordsArray) {
  container.innerHTML = `
  <div class="passedChord">${convertValuesToChord(
    notesArray,
    chordsArray,
    array[0].fundamental,
    array[0].chord
  )}</div>
  <div class="activeChord">${convertValuesToChord(
    notesArray,
    chordsArray,
    array[1].fundamental,
    array[1].chord
  )}</div>
  <div class="nextChord">${convertValuesToChord(
    notesArray,
    chordsArray,
    array[2].fundamental,
    array[2].chord
  )}</div>
  <div class="nextChord2">${convertValuesToChord(
    notesArray,
    chordsArray,
    array[3].fundamental,
    array[3].chord
  )}</div>
  `;
}

export default Home;
