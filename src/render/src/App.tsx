import React from "react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import MainEntry from "./app/MainEntry";
import "./App.css";
import "antd/dist/reset.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainEntry />} />
      </Routes>
    </Router>
  );
}
