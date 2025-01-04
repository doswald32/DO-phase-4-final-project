import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import "../App.css"

function App() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
    </div>
  );
}

export default App;
