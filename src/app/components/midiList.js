import "../home/home.css";
import { useMidiListArrayStore } from "../store";
import React, { useEffect } from "react";

const MidiList = React.memo(() => {
  const midiList = useMidiListArrayStore((state) => state.midiList);

  return (
    <>
      <h2 className="menuTitle">Active controllers :</h2>
      {midiList.map((midi, index) => (
        <div key={index} className="midiController">
          {midi.name}{" "}
        </div>
      ))}
    </>
  );
});

MidiList.displayName = "MidiList";

export default MidiList;
