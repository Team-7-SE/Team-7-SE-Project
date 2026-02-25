import React, { useState } from "react";

//Pop up function to remove person from our list
function RemovePerson({ people, setPeople, closePopup }) {

    //State used to store typed name
    const [selectedId, setSelectedId] = useState("");

    //Function that removes person from our list
    const removePerson = () => {
        //If nothing, return
        if (selectedId === "") {
            return;
        }

        //Removes the actual person
        setPeople(prev => prev.filter(person => person.id !== parseInt(selectedId)));

        //Reset selection and closes popup
        setSelectedId("");
        closePopup();
    };

    //Return pop up of div
    return (
        <div style={styles.overlay}>
            {/*Popup box div*/}
            <div style={styles.popup}>
                <h2>
                    Remove Person
                </h2>
                {/*Dropdown to select person*/}
                <select 
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    style={styles.select}
                >
                    <option value="">--
                        Select a Person
                    </option>
                    {people.map(person => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                <div>
                    {/*Remove person button*/}
                    <button onClick={removePerson} style={{border : "1px solid black"}}>
                        Remove
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

export default RemovePerson;