import { Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import MainPage from "./Pages/MainPage";
import TransactionPage from "./Pages/TransactionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/transaction" element={<TransactionPage />} />
    </Routes>
  );
}

export default App;