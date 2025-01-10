import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "../App.css";
import { Outlet } from "react-router-dom";

function App() {

  const [animalsList, setAnimalsList] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5555/animals')
    .then(r => r.json())
    .then(data => setAnimalsList(data))
  }, [])

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Outlet context={{ animalsList, setAnimalsList }}/>
    </div>
  );
}

export default App;
