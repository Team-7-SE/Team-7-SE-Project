import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../firebase";

function TransactionPage({transactions}) {
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
        {/*transaction grid display headers*/}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            fontWeight: "bold",
            borderBottom: "2px solid black",
            paddingBottom: "5px",
            marginBottom: "10px",
            color: "var(--text-color)"
          }}
        >
          <div>Name</div>
          <div>Item</div>
          <div>Amount</div>
          <div>Total Cost</div>
        </div>

        {/*transaction grid display individual formatting*/}
        {transactions.map(t => (
          <div
            key={t.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              marginBottom: "8px",
              paddingBottom: "5px",
              borderBottom: "1px solid black",
              color: "var(--text-color)"
            }}
          >
            <div>{t.name}</div>
            <div>{t.item}</div>
            <div>{t.amount}</div>
            <div>{t.cost}</div>
          </div>
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