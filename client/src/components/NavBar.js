import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink
            to="/"
            className="nav-link"
            >
                Home
            </NavLink>
            <NavLink
            to="/animals"
            className="nav-link"
            >
                Animals
            </NavLink>
            <NavLink
            to="/new-animal"
            className="nav-link"
            >
                New Animal
            </NavLink>
        </nav>
    )
}

export default NavBar;