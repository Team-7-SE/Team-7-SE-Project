import { useNavigate } from "react-router-dom";
import './App.css'

function Page1() {

  const navigate = useNavigate();

  return (
    <>

      {/*The main container for the page, which centers the content both vertically and horizontally*/}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", gap: "12px" }}>

        {/*The container for Login functions*/}
        <div style={{ background: "white", padding: "48px", width: "340px", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center", marginBottom: "24px", color: "black" }}>Login</h2>
          <input type="text" placeholder="Username" style={{ width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <input type="password" placeholder="Password" style={{ width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <button style={{ width: "100%", padding: "12px", backgroundColor: "black", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Login
          </button>
        </div>

        <button onClick={() => navigate("/main")} style={{ backgroundColor: 'blue', color: 'white' }}>
          Route me to main page(Sam and Alex work here)
        </button>

        <button onClick={() => navigate("/transaction")} style={{ backgroundColor: 'pink', color: 'black' }}>
          Route me to transaction page(Nathaniel work here)
        </button>

      </div>

    </>
  )
}

export default Page1;