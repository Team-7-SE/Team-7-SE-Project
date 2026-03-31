import { useState } from "react";

function MarkPurchased({ item, markPurchased, closePopup, people, addTransaction }) {

    const [amount, setAmount] = useState(1);
    const [selectedPerson, setSelectedPerson] = useState("");

    const handleConfirm = () => {
        if (selectedPerson === "") {
            alert("Please select a person");
            return;
        }
        
        if (amount > 0 && amount <= item.quantity) {
            markPurchased(item.id, amount, selectedPerson);
            addTransaction(item, amount, selectedPerson, people);
            closePopup();
        } else {
            alert("Invalid quantity");
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2 style={{color: "var(--text-invert)"}}>Purchased By:</h2>
                <select 
                    value={selectedPerson} 
                    onChange={(e) => setSelectedPerson(e.target.value)}
                    style={styles.input}
                >
                    <option value="">Select a Person</option>
                    {people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.name?.includes('@') ? person.name.split('@')[0] : person.name}
                        </option>
                    ))}
                </select>

                <h2 style={{color: "var(--text-invert)"}}>Amount Purchased:</h2>
                <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={styles.input}
                />

                <div>
                    <button onClick={handleConfirm} style={{ border: "1px solid black", color: "white" }}>
                        Confirm
                    </button>

                    <button
                        onClick={closePopup}
                        style={{ marginLeft: "10px", border: "1px solid black", color: "white" }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

//styles object used to format popup
const styles = {
  //overlay (full screen) style
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", //dims the background
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  //popup box style
  popup: {
    backgroundColor: "var(--bg-invert)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "200px"
  },

  //user input style
  input: {
    width: "75%",
    marginBottom: "15px",
    padding: "5px",
    backgroundColor: "white",
    color: "black"
  }
};

export default MarkPurchased;