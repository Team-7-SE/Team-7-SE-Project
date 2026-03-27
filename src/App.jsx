import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import MainPage from "./Pages/MainPage";
import TransactionPage from "./Pages/TransactionPage";
import AboutPage from "./Pages/AboutPage";

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
    const [people, setPeople] = useState([
      {id: 0, name: "Carter", total: 35.67},
      {id: 1, name: "Bob", total: 18.98},
      {id: 2, name: "Kyle", total: 22.54},
      {id: 3, name: "Erik", total: 18.30},
      {id: 4, name: "Greg", total: 130.67},
    ]);

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