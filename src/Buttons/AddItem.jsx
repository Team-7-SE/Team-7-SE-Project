import { useState } from "react";

//pop up function to add new item to the list
function AddItem({ addItem, closePopup }) {

  //state used to store new item info
  const [item, setItem] = useState({
    name: "",
    price: "",
    quantity: 1
  });

  //function that adds item to the list
  const submitItem = () => {
    if (item.name === "" || item.price === "") {
      return;
    }

    addItem(item);
    setItem({ name: "", price: "", quantity: 1 });
    closePopup();
  };

  //returns popup of div
  return (
    <div style={styles.overlay}>
      {/*Popup box div*/}
      <div style={styles.popup}>
        <h2>
          Add Item
        </h2>

        {/*Item name input*/}
        <input
          type="text"
          placeholder="Item name..."
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          style={styles.input}
        />

        {/*Item price input*/}
        <input
          type="number"
          placeholder="Price..."
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          style={styles.input}
        />

        {/*Item quantity input*/}
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            setItem({ ...item, quantity: parseInt(e.target.value) })
          }
          style={styles.input}
        />

        <div>
          {/*Submit item button*/}
          <button onClick={submitItem} style={{ border: "1px solid black" }}>
            Submit
          </button>

          <button
            onClick={closePopup}
            style={{ marginLeft: "10px", border: "1px solid black" }}
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
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "200px"
  },

  //user input style
  input: {
    width: "75%",
    marginBottom: "15px",
    padding: "5px"
  }
};

export default AddItem;