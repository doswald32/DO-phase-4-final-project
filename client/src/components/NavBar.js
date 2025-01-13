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
            to="/visits"
            className="nav-link"
            >
                Visits
            </NavLink>
            <NavLink
            to="/new-visit"
            className="nav-link"
            >
                New Visit
            </NavLink>
        </nav>
    )
}

export default NavBar;