import NavBar from "./NavBar";
import "../App.css";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Outlet/>
    </div>
  );
}

export default App;
