import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import './App.css';

const VIEWS = { LOGIN: "login", CREATE: "create" };

function Page1() {
  const navigate = useNavigate();

  const [view, setView]       = useState(VIEWS.LOGIN);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  // ── login state ───────────────────────────────────────────
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  // ── create account state ──────────────────────────────────
  const [createEmail, setCreateEmail]       = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createConfirm, setCreateConfirm]   = useState("");

  // ── helpers ───────────────────────────────────────────────
  const switchView = (v) => { setView(v); setError(""); };

  // ── handlers ─────────────────────────────────────────────

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/main");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    if (!createEmail.trim())              return setError("Please enter an email.");
    if (createPassword.length < 6)        return setError("Password must be at least 6 characters.");
    if (createPassword !== createConfirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      // TODO: Wire to Firebase — createUserWithEmailAndPassword is imported and ready
      await createUserWithEmailAndPassword(auth, createEmail, createPassword);
      navigate("/main");
    } catch (err) {
      setError(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  // ── styles ────────────────────────────────────────────────

  const cardStyle = {
    background: "var(--login-color)",
    padding: "36px 40px",
    width: "340px",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "92%",
    padding: "12px",
    backgroundColor: "var(--table-color)",
    marginBottom: "12px",
    borderRadius: "4px",
    color: "var(--text-color)",
    border: "1px solid #ccc",
  };

  const btnPrimaryStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.6 : 1,
    marginBottom: "10px",
  };

  const linkBtnStyle = {
    background: "none",
    border: "none",
    color: "#555",
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
    display: "block",
    margin: "8px auto 0",
  };

  // ── render views ──────────────────────────────────────────

  const renderLogin = () => (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "black" }}>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError(""); }}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => { setPassword(e.target.value); setError(""); }}
        style={inputStyle}
      />

      {error && <p style={{ color: "red", fontSize: "14px", margin: "0 0 12px 0" }}>{error}</p>}

      <button onClick={handleLogin} disabled={loading} style={btnPrimaryStyle}>
        {loading ? "Logging in…" : "Login"}
      </button>

      <button style={linkBtnStyle} onClick={() => switchView(VIEWS.CREATE)}>
        Create household account
      </button>
    </>
  );

  const renderCreate = () => (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "6px", color: "black" }}>Create Account</h2>
      <p style={{ textAlign: "center", color: "#666", fontSize: "13px", marginBottom: "20px" }}>
        One account, shared by the whole household.
      </p>

      <input
        type="email"
        placeholder="Email"
        value={createEmail}
        onChange={(e) => { setCreateEmail(e.target.value); setError(""); }}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={createPassword}
        onChange={(e) => { setCreatePassword(e.target.value); setError(""); }}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={createConfirm}
        onChange={(e) => { setCreateConfirm(e.target.value); setError(""); }}
        style={inputStyle}
      />

      {error && <p style={{ color: "red", fontSize: "14px", margin: "0 0 12px 0" }}>{error}</p>}

      <button onClick={handleCreateAccount} disabled={loading} style={btnPrimaryStyle}>
        {loading ? "Creating…" : "Create Account"}
      </button>

      <button style={linkBtnStyle} onClick={() => switchView(VIEWS.LOGIN)}>
        ← Back to Login
      </button>
    </>
  );

  // ── root render ───────────────────────────────────────────

  return (
    <>
      <div>
        <pre style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>
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

        <div style={cardStyle}>
          {view === VIEWS.LOGIN  && renderLogin()}
          {view === VIEWS.CREATE && renderCreate()}
        </div>

        {/* About button */}
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
            fontSize: "14px",
          }}
        >
          About
        </button>
      </div>
    </>
  );
}

export default Page1;