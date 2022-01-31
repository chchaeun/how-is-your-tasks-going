import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ToDoList from "./OldVersion/ToDoList";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/old" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
