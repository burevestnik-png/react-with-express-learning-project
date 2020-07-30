import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();

    }

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-4" style={{ padding: '0 2rem'}}>
                <span className="brand-logo">Links briefer</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
