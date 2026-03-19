import React from "react";

function SortPeople({ setSortType, closePopup }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Filter People By Price</h2>

        <button
          onClick={() => {
            setSortType("min");
            closePopup();
          }}
          style={styles.button}
        >
          Lowest → Highest
        </button>

        <button
          onClick={() => {
            setSortType("max");
            closePopup();
          }}
          style={styles.button}
        >
          Highest → Lowest
        </button>

        <button
          onClick={() => {
            setSortType("default");
            closePopup();
          }}
          style={styles.button}
        >
          Default
        </button>

        <button onClick={closePopup} style={{ marginTop: "10px", border: "1px solid black" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "250px"
  },
  button: {
    display: "block",
    margin: "10px auto",
    border: "1px solid black",
    padding: "5px"
  }
};

export default SortPeople;