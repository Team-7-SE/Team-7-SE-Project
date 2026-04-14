import React, {useState} from "react";
import {AVATARS} from "../avatars";

//Pop up function to add new person to our list
function AddPerson({people, setPeople, closePopup}) {

  //State used to store typed name
  const [newName, setNewName] = useState("");
  const [avatar, setAvatar] = useState("🤡");

  //Function that adds person to the list
  const addPerson = () => {
    //If no new name return
    if (newName == "") {
      return;
    }

    //Sets newID to proper index;
    let newId;
    if (people.length > 0) {
      newId = people[people.length - 1].id + 1;
    }
    else {
      newId = 0;
    }

    //creates new person object
    const newPerson = {
      id: newId,
      name: newName,
      total: 0,
      avatar: avatar
    };

    //array = array + newPerson
    setPeople(prev => [...prev, newPerson]);

    //Resets new name and closes popup
    setNewName("");
    closePopup();
  };

  //Returns pop up of div
  return (
    <div style={styles.overlay}>
      {/*Popup box div*/}
      <div style={styles.popup}>
        <h2 style={{ color: "var(--text-invert)" }}>
          Add Person
        </h2>

        {/*input box and sets new name to array*/}
        <input
          type="text"
          placeholder="Click and type name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={styles.input}
        />
        {/* Avatar picker */}
        <p style={{ color: "var(--text-invert)", marginBottom: "8px" }}>Pick an avatar:</p>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "6px",
          maxWidth: "260px", marginBottom: "15px", justifyContent: "center"
        }}>
          {AVATARS.map(a => (
            <span
              key={a}
              onClick={() => setAvatar(a)}
              style={{
                fontSize: "24px", cursor: "pointer", padding: "4px",
                borderRadius: "4px",
                background: avatar === a ? "rgba(255,255,255,0.3)" : "transparent",
                outline: avatar === a ? "2px solid white" : "none"
              }}
            >
              {a}
            </span>
          ))}
        </div>
        <div>
          {/*Add person Button*/}
          <button onClick={addPerson} style={{ border: "1px solid black", color: "white" }}>
            Submit
          </button>
          <button onClick={closePopup} style={{ marginLeft: "10px", border: "1px solid black", color: "white" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

//Styles object used to format popup
const styles = {
  //Overlay (full screen) style
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", //Dims the background
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  //Popup box style
  popup: {
    backgroundColor: "var(--bg-invert)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "200px"
  },
  //User input style
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "5px",
    backgroundColor: "white"
  }
};

export default AddPerson;