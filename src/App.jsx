import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import MainPage from "./Pages/MainPage";
import TransactionPage from "./Pages/TransactionPage";
import AboutPage from "./Pages/AboutPage";

function App() {

    //React state array
    const [people, setPeople] = useState([
      {id: 0, name: "Carter", total: 35.67},
      {id: 1, name: "Bob", total: 18.98},
      {id: 2, name: "Kyle", total: 22.54},
      {id: 3, name: "Erik", total: 18.30},
      {id: 4, name: "Greg", total: 130.67},
    ]);

  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/main" element={<MainPage people={people} setPeople={setPeople}/>} />
      <Route path="/transaction" element={<TransactionPage />} />
      <Route path="/readme" element={<AboutPage />} />
    </Routes>
  );
}

export default App;