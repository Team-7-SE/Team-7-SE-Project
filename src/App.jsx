import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import MainPage from "./Pages/MainPage";
import TransactionPage from "./Pages/TransactionPage";
import AddPerson from "./Buttons/AddPerson";
import RemovePerson from "./Buttons/RemovePerson";
import EditPerson from "./Buttons/EditPerson";

function App() {

    //React state array
    const [people, setPeople] = useState([
      {id: 0, name: "Carter", total: 35.67},
      {id: 1, name: "Sam", total: 18.98},
      {id: 2, name: "Nathaniel", total: 22.54},
      {id: 3, name: "Erik", total: 18.30},
    ]);


  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/main" element={<MainPage people={people} />} />
      <Route path="/transaction" element={<TransactionPage />} />
      <Route path="/add-person" element={<AddPerson people={people} setPeople={setPeople} />} />
      <Route path="remove-person" element={<RemovePerson/>} />
      <Route path="edit-person" element={<EditPerson />} />
    </Routes>
  );
}

export default App;