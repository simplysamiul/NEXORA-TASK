import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="navbar-area">
            <div className="navbar">
                {/* Logo */}
                <div className="nav-logo">Nexora</div>

                {/* Nav Links */}
                <div className={`nav-links ${isOpen ? "open" : ""}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/addProduct"
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={closeMenu}
                    >
                        Add Product
                    </NavLink>

                    <NavLink
                        to="/added-items"
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={closeMenu}
                    >
                        Added Items
                    </NavLink>

                    <NavLink
                        to="/productList"
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={closeMenu}
                    >
                        Product List
                    </NavLink>
                </div>

                {/* Hamburger / Close Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
