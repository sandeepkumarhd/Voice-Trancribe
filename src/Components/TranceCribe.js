import React, { useState, useEffect } from "react";
import "./TranceCribe.css"
import {FaMicrophone} from "react-icons/fa"
import {ImStop} from "react-icons/im"
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;

const launguegeHandler = (event) => {
  if (event.target.value === "") {
    alert("Please Select launguege");
  } else {
    mic.lang = `${event.target.value}`;
  }
};

const TranceCribe = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
    } else {
      mic.stop();
    }
    
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
      setNote(transcript);
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };
  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
        {isListening ? <span><FaMicrophone/> <p>Listing...</p></span> : <p>Click On Mic To Record...</p>}
          <h2>Current Note</h2>
          
          {
            note? <button onClick={handleSaveNote} disabled={!note}>
            Save
          </button>:""
          }
         
          <select onChange={launguegeHandler}>
            <option value={""}>Select</option>
            <option value={"hi-US"}>Hindi</option>
            <option value={"en-US"}>English</option>
          </select>
          <button onClick={() => setIsListening((pre) => !pre)}>{isListening?<ImStop/>:<FaMicrophone/>} </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
};
export default TranceCribe;
