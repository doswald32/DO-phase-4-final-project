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
            to="/add-a-visit"
            className="nav-link"
            >
                Add a Visit
            </NavLink>
        </nav>
    )
}

export default NavBar;