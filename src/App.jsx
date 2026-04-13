import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import MainPage from "./Pages/MainPage";
import TransactionPage from "./Pages/TransactionPage";
import AboutPage from "./Pages/AboutPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { ref, update, onValue, get, push } from "firebase/database";

function App() {
  //Array of tansactions
  const [transactions, setTransactions] = useState([]);

  //Update transactions
  const addTransaction = async (item, amount, personId, people) => {
    const person = people.find(p => p.id === personId);

    const name = person?.name?.includes('@') ? person.name.split('@')[0] : person?.name;

    //split each transaction up for grid display
    const newTransaction = {
      name: name,
      item: item.name,
      amount: Number(amount),
      cost: Number((item.price * amount).toFixed(2)),
      timestamp: Date.now()
    };

    const transactionsRef = ref(db, "transactions");
    const newRef = push(transactionsRef);

    await update(newRef, newTransaction);
  };

  //DARK & LIGHT MODE STUFF
  //Holds current themem state, light or dark
  const [theme, setTheme] = useState("dark");

  // ON LOAD
  //Check if user has stored theme, use that over default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Whenever the themem is updated (user presses button), apply change to <body>, then store that state 
  // to load next time user loads app
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle that the button works, swaps between light and dark
  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  };

  //React state array
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [householdId, setHouseholdId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setHouseholdId(user.email.replace(/\./g, "_"));
      } else {
        setHouseholdId(null);
        setPeople([]);
      }
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!householdId) return;

    const membersRef = ref(db, `users/${householdId}/members`);
    const unsub = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          name: data[key].name,
          active: data[key].active,
          total: data[key].total,
          avatar: data[key].avatar
        }));
        setPeople(list);
      } else {
        setPeople([]);
      }
    });
    return () => unsub();
  }, [householdId]);


  useEffect(() => {
    const transactionsRef = ref(db, "transactions");
    const unsubscribeTransactions = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        //newest transactions first
        list.sort((a, b) => b.timestamp - a.timestamp);
        setTransactions(list);
      }
      else {
        setTransactions([]);
      }
    });
    return () => unsubscribeTransactions();
  }, []);

  // RENDERING
  //Determine which emoj to show, moon if in dark mode, sun if in light
  let icon;
  if (theme === "dark") {
    icon = "🌙";
  } else {
    icon = "☀️";
  }

  return (
    <>
      {/* Global toggle button */}
      <button
        onClick={toggleTheme}
        style={{ position: "absolute", top: 55, right: 75 }}
      >
        {icon}
      </button>

      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/main" element={
          <MainPage people={people} setPeople={setPeople} addTransaction={addTransaction} householdId={householdId} />
        } />
        <Route path="/transaction" element={<TransactionPage transactions={transactions} />} />
        <Route path="/readme" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;