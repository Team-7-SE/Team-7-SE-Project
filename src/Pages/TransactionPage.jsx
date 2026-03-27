import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import { auth } from "../firebase";

function TransactionPage() {

  //Array of tansactions
  const transactions = [
    { id: 1, text: "Carter — 6 rolls of toilet paper — $5.99" },
    { id: 2, text: "Carter — Dish soap — $4.50" },
    { id: 3, text: "Carter — Paper towels (2) — $7.00" },
    { id: 4, text: "Carter — Chair — $10.00" },
    { id: 5, text: "Carter — Laundry detergent — $12.75" },
    { id: 6, text: "Carter — Carter 2 - $67.00" }
  ];

  {/*useNavigate hook for routing back to login page on logout button click*/ }
  const navigate = useNavigate();

  //Removes unwanted guests (also know if u copy paste link, u can't just bypass to transactions page)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  
  //Log out of application
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
  }


  return (
    //Background style
    <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh", padding: "30px" }}>

      {/*Header*/}
      <h1 style={{ fontSize: "48px", color: "var(--text-color)", fontWeight: "bold", marginBottom: "25px", WebkitTextStroke: "2px var(--text-outline)" }}>
        Transactions Log
      </h1>

      {/* Transaction log window */}
      <div
        style={{
          border: "2px solid black",
          width: "650px",
          height: "350px",
          padding: "15px",
          overflowY: "auto",
          backgroundColor: "var(--table-color)"
        }}
      >
        {/*pull transactions from array and map to log*/}
        {transactions.map(t => (
          <p
            key={t.id}
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              borderBottom: "1px solid #000000",
              paddingBottom: "5px",
              color: "var(--text-color)"
            }}
          >
            {t.text}
          </p>
        ))}
      </div>

      {/* Routing button container div*/}
      <div style={{ display: "flex", gap: "7px" }}>

        {/*Main Page button*/}
        <button
          onClick={() => navigate("/main")}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "navy",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Main Page
        </button>

        {/*Logout button*/}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Logout
        </button>
      </div>


    </div>
  );
}

export default TransactionPage;