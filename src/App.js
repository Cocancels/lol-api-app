import "./App.css";
import React from "react";
import { Champions } from "./Components/Champions/Champions";
import { Route, Routes } from "react-router-dom";
import { SingleChampion } from "./Components/SingleChampion/SingleChampion";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Champions />} />
        <Route path="/champions/:id/:version" element={<SingleChampion />} />
      </Routes>
    </div>
  );
};
