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
            to="/dogs"
            className="nav-link"
            >
                Dogs
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