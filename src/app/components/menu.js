import "./menu.css";
import { notesList, chords, scales } from "../components/arrays";
import React, { useState, useCallback, useEffect } from "react";
import {
  useNoteListStore,
  useChordListStore,
  useScrollStore,
  useScoreStore,
} from "../store";

export default function Menu() {
  const notesListStore = useNoteListStore((state) => state.notesListStore);
  const { removeNoteFromList, addNoteToList } = useNoteListStore();
  const [chordsList, setChordList] = useState(chords.map((chord) => chord.nom));
  const [mode, setMode] = useState(true);
  const chordsListStore = useChordListStore((state) => state.chordsListStore);
  const { removeChordFromList, addChordToList, toggleListStore } =
    useChordListStore();
  const { setScrollMode } = useScrollStore();
  const { scrollMode } = useScrollStore.getState();
  const { display, setDisplay } = useScoreStore();

  const handleNoteChange = (note) => {
    if (notesListStore.includes(note)) {
      removeNoteFromList(note);
    } else {
      addNoteToList(note);
    }
  };

  const changeTheme = (string) => {
    console.log("oeoe");
    document.documentElement.className = string;
  };

  useEffect(() => {
    if (mode) {
      setChordList(chords.map((chord) => chord.nom));
    } else {
      setChordList(scales.map((chord) => chord.nom));
    }
  }, [mode]);

  const handleChordChange = (chord) => {
    if (chordsListStore.some((chordObj) => chordObj.nom === chord)) {
      removeChordFromList(chord);
    } else {
      addChordToList(chord);
    }
  };

  return (
    <>
      <h2 className="menuTitle">Settings :</h2>
      <div className="parameter">
        <h2>notes enabled :</h2>
        <ul className="notesList">
          {notesList.map((note, index) => (
            <li
              key={index}
              className={`item ${
                notesListStore.includes(note) ? "active" : ""
              }`}
              id={index}
              onClick={() => handleNoteChange(note)}
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
      <div className="parameter">
        {mode ? (
          <>
            <h2>chords enabled :</h2>
            <ul className="chordList">
              {chordsList.map((chord, index) => (
                <li
                  key={index}
                  className={`item chord ${
                    chordsListStore.some((chordObj) => chordObj.nom === chord)
                      ? "active"
                      : ""
                  }`}
                  id={index}
                  onClick={() => handleChordChange(chord)}
                >
                  {chord}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>scales enabled :</h2>{" "}
            <ul className="chordList">
              {chordsList.map((chord, index) => (
                <li
                  key={index}
                  className={`item chord ${
                    chordsListStore.some((chordObj) => chordObj.nom === chord)
                      ? "active"
                      : ""
                  }`}
                  id={index}
                  onClick={() => handleChordChange(chord)}
                >
                  {chord}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="container">
        <div className="box">
          <div
            className={`item ${mode ? "active" : ""}`}
            onClick={() => {
              toggleListStore(true);
              setMode(true);
            }}
          >
            Chords
          </div>
          <div
            className={`item ${mode ? "" : "active"}`}
            onClick={() => {
              toggleListStore(false);
              setMode(false);
            }}
          >
            Scales
          </div>
        </div>
        <div className="box">
          <div
            className={`item ${scrollMode ? "active" : ""}`}
            onClick={() => setScrollMode(true)}
          >
            auto-scroll
          </div>
          <div
            className={`item ${scrollMode ? "" : "active"}`}
            onClick={() => setScrollMode(false)}
          >
            step by step
          </div>
        </div>
        <div className="box">
          <div
            className={`item ${display ? "active" : ""}`}
            onClick={() => setDisplay(!display)}
          >
            display score
          </div>
        </div>
      </div>

      <div className="container">
        <div className="box">
          <div className="item">sound from suggestion</div>
          <div className="item active">enlabe midi</div>
        </div>
        <div className="box">
          {" "}
          <h2>themes : </h2>
          <button
            className="theme1"
            onClick={() => changeTheme("root-theme1")}
          ></button>
          <button
            className="theme2"
            onClick={() => changeTheme("root-theme2")}
          ></button>
          <button
            className="theme3"
            onClick={() => changeTheme("root-theme3")}
          ></button>
        </div>
      </div>
      <div className="parameter">save settings</div>
    </>
  );
}
