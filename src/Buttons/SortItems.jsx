import React from "react";

function SortItems({ setItemSortType, closeSortPopup }) {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2>Filter Items By Price</h2>

                <button
                onClick={() => {
                    setItemSortType("min");
                    closeSortPopup();
                }}
                style={styles.button}
                >
                Lowest → Highest
                </button>

                <button
                onClick={() => {
                    setItemSortType("max");
                    closeSortPopup();
                }}
                style={styles.button}
                >
                Highest → Lowest
                </button>

                <button
                onClick={() => {
                    setItemSortType("default");
                    closeSortPopup();
                }}
                style={styles.button}
                >
                Default
                </button>

                <button onClick={closeSortPopup} style={{ marginTop: "10px", border: "1px solid black" }}>
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

export default SortItems;