import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import './App.css'

function Page1() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = () => {
    //Checks firebase to see if user exists
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Successful login
        navigate("/main");
      })
      .catch((error) => {
        //Invalid login
        setError("Invalid email or password");
      });
  };


  return (
    <>
      <div>

      <pre style={{ textAlign: "center",fontWeight: "bold",fontSize: "18px"}}>
        {`         __  
________| |_
/        | | \\
/              \\
/________________\\
|             |
|  __   ___   |
| |__|  |,|   |
|_______| |___|

`}
        </pre>

        <div style={{ background: "white", padding: "48px", width: "340px", borderRadius: "8px", backgroundColor: "var(--login-color)",
           boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center", marginBottom: "24px", color: "black" }}>Login</h2>

            <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => { setEmail(e.target.value); setError(""); }} 
            style={{ width: "92%", padding: "12px", backgroundColor: "var(--table-color)", marginBottom: "12px", borderRadius: "4px", 
              color: "var(--text-color)", border: "1px solid #ccc" }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => { setPassword(e.target.value); setError(""); }} 
            style={{ width: "92%", padding: "12px", marginBottom: "12px", backgroundColor: "var(--table-color)", borderRadius: "4px", 
              color: "var(--text-color)", border: "1px solid #ccc" }} 
          />
          
          {error && <p style={{ color: "red", fontSize: "14px", margin: "0 0 12px 0" }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: "100%", padding: "12px", backgroundColor: "black", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Login
          </button>
        </div>
        {/*Readme button*/}
        <button
          onClick={() => navigate("/readme")}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          About
        </button>

      </div>

    </>
  );
}

export default Page1;