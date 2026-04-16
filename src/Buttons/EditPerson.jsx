import React, {useState} from "react";
import {ref, update} from "firebase/database";
import {db} from "../firebase";
import {AVATARS} from "../avatars";

//Pop up function to edit person from our list
function EditPerson({people, setPeople, closePopup}) {

    //State used to store typed name
    const [selectedId, setSelectedId] = useState("");

    //State used to store avatar
    const [avatar, setAvatar] = useState("🧑");

    //State used to store new name
    const [newName, setNewName] = useState("");

    // When a person is selected, pre-fill their current avatar
    const handleSelectPerson = (e) => {
        const id = e.target.value;
        setSelectedId(id);
        const person = people.find(p => String(p.id) === String(id));
        if (person) {
            setNewName(person.name?.includes('@') ? person.name.split('@')[0] : person.name);
            setAvatar(person.avatar || "🧑");
        }
    };

    //Function that edits person from our list
    const editPerson = async () => {
        //If nothing, return
        if (selectedId === "" || newName === "") {
            return;
        }

        const userRef = ref(db, 'users/' + selectedId);
        await update(userRef, { name: newName, avatar: avatar });

        //Edits the actual person
        setPeople(prev =>
            prev.map(person =>
                String(person.id) !== String(selectedId)
                    ? person
                    : { ...person, name: newName, avatar: avatar }
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
                <h2 style={{ color: "var(--text-invert)" }}
                >
                    Edit Person
                </h2>

                {/* MOSTLY COPIED FROM REMOVE PERSON*/}
                {/*Dropdown to select person*/}
                <select
                    value={selectedId}
                    onChange={handleSelectPerson}
                    style={styles.select}
                >
                    <option value="">
                        --
                        Select a Person
                    </option>
                    {people.map(person => (
                        <option key={person.id} value={person.id}>
                            {person.name?.includes('@') ? person.name.split('@')[0] : person.name}
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
                
                {/* Avatar picker */}
                <p style={{ color: "var(--text-invert)", marginBottom: "8px" }}>Pick an avatar:</p>
                <div style={{
                    display: "flex", flexWrap: "wrap", gap: "6px",
                    maxWidth: "330px", marginBottom: "15px", justifyContent: "center"
                }}>
                    {AVATARS.map(a => (
                        <span
                            key={a}
                            onClick={() => setAvatar(a)}
                            style={{
                                fontSize: "24px", cursor: "pointer", padding: "4px",
                                borderRadius: "4px",
                                background: avatar === a ? "rgba(0, 0, 0, 0.32)" : "transparent",
                                outline: avatar === a ? "2px solid white" : "none"
                            }}
                        >
                            {a}
                        </span>
                    ))}
                </div>

                <div>
                    {/*Edit person button*/}
                    <button onClick={editPerson} style={{ border: "1px solid black", color: "white" }}>
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
        width: "75%",
        marginBottom: "15px",
        padding: "5px",
        backgroundColor: "white",
        color: "black"
    },
    select: {
        backgroundColor: "white",
        color: "black"
    }
};

export default EditPerson;