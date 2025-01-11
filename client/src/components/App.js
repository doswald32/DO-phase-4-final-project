import NavBar from "./NavBar";
import "../App.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

  const [animalsList, setAnimalsList] = useState([])
  const [owners, setOwners] = useState([])
  const [vets, setVets] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5555/animals')
    .then((r) => r.json())
    .then(data => setAnimalsList(data))
  }, [])

  useEffect(() => {
    fetch('http://127.0.0.1:5555/owners')
    .then(r => r.json())
    .then(data => setOwners(data))
  }, []);
  
  
  useEffect(() => {
    fetch('http://127.0.0.1:5555/vets')
    .then(r => r.json())
    .then(data => setVets(data))
  }, []);

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Outlet context={{ animalsList, setAnimalsList, owners, setOwners, vets, setVets }}/>
    </div>
  );
}

export default App;
