import React, {useState} from "react";
import {ref, update} from "firebase/database";
import {db} from "../firebase";

//Pop up function to remove person from our list
function RemovePerson({people, setPeople, closePopup}) {

    //State used to store typed name
    const [selectedId, setSelectedId] = useState("");

    //Function that removes person from our list
    const removePerson = () => {
        //If nothing, return
        if (selectedId === "") {
            return;
        }

        //Points to specific user in df folder
        const userRef = ref(db, 'users/' + selectedId);

        //Active = false in db
        update(userRef, {
            active:false
        }).then(() => {
            closePopup();
        });
    };

    //Return pop up of div
    return (
        <div style={styles.overlay}>
            {/*Popup box div*/}
            <div style={styles.popup}>
                <h2 style={{color: "var(--text-invert)"}}
                >
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
                    {people.filter(person=>person.active!==false).map(person => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                <div>
                    {/*Remove person button*/}
                    <button onClick={removePerson} style={{border : "1px solid black", color: "white"}}>
                        Remove
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
    width: "75%",
    marginBottom: "15px",
    padding: "5px"
  },
  select: {
    backgroundColor: "white",
    color: "black"
  }
};

export default RemovePerson;