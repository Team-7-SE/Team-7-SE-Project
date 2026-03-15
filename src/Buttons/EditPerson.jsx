import React, { useState } from "react";

//Pop up function to edit person from our list
function EditPerson({ people, setPeople, closePopup }) {

    //State used to store typed name
    const [selectedId, setSelectedId] = useState("");

    //State used to store new name
    const [newName, setNewName] = useState("");

    //Function that edits person from our list
    const editPerson = () => {
        //If nothing, return
        if (selectedId === "" || newName === "") {
            return;
        }

        //Edits the actual person
        setPeople(prev =>
            prev.map(person =>
                person.id !== parseInt(selectedId)
                    ? person
                    : { ...person, name: newName }
            )
        );

        //Reset selection and closes popup
        setSelectedId("");
        setNewName("");
        closePopup();
    };

    //Return pop up of div
    return (
        <div style={styles.overlay}>
            {/*Popup box div*/}
            <div style={styles.popup}>
                <h2>
                    Edit Person
                </h2>

                {/* MOSTLY COPIED FROM REMOVE PERSON*/}
                {/*Dropdown to select person*/}
                <select 
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    style={styles.select}
                >
                    <option value="">
                        --
                        Select a Person
                    </option>
                    {people.map(person => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>

                {/*Input box for new name*/}
                <input
                    type="text"
                    placeholder="Enter new name..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={styles.input}
                />

                <div>
                    {/*Edit person button*/}
                    <button onClick={editPerson} style={{border : "1px solid black"}}>
                        Submit
                    </button>
                    <button onClick={closePopup} style={{ marginLeft: "10px", border: "1px solid black" }}>
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
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "200px"
  },
  //User input style
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "5px"
  }
};

export default EditPerson;