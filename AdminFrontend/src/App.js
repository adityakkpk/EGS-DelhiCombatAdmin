import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Header />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
