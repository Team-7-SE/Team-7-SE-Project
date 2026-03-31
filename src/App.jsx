import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import MainPage from "./Pages/MainPage";
import TransactionPage from "./Pages/TransactionPage";
import AboutPage from "./Pages/AboutPage";
import { onAuthStateChanged } from "firebase/auth"; 
import { auth, db } from "./firebase";
import { ref, update, onValue, get } from "firebase/database";

function App() {

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

    useEffect(() => {
      const unsubscribeAuth = onAuthStateChanged(auth, async(user) => {

        if(user) {
          //Cleans email up
          const userId = user.email.replace(/\./g,"_");
          const userRef = ref(db, 'users/' + userId);
          const snapshot = await get(userRef);

          if(!snapshot.exists()) {
            await update(userRef, {
              name: user.email,
              total: 0,
              active: true
            });
          }
          else {
            await update(userRef, {
              active: true
            });
          }
        }
        setLoading(false);
      });
      //Reads entire list for mainpage
      const allUsersRef = ref(db, 'users');
      const unsubscribeDb = onValue(allUsersRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
          //Converts to object in array
          const userList = Object.keys(data).map(key => ({
            id: key,
            name: data[key].name,
            active: data[key].active,
            total: data[key].total
          }));
          setPeople(userList);
        }
      });
      return () => {
        unsubscribeAuth();
        unsubscribeDb();
      };
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
      <Route path="/main" element={<MainPage people={people} setPeople={setPeople}/>} />
      <Route path="/transaction" element={<TransactionPage />} />
      <Route path="/readme" element={<AboutPage />} />
    </Routes>
    </>
  );
}

export default App;