import { useNavigate } from "react-router-dom";

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

  return (
    //Background style
    <div style={{ backgroundColor: "#585756", minHeight: "100vh", padding: "30px" }}>

      {/*Header*/}
      <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "black", marginBottom: "25px" }}>
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
          backgroundColor: "#cec0b6"
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
              color: "black"
            }}
          >
            {t.text}
          </p>
        ))}
      </div>

      {/*Logout button*/}
      <button
        onClick={() => navigate("/")}
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
  );
}

export default TransactionPage;