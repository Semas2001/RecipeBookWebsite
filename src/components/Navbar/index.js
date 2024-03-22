import React from "react";
import { FaBook } from "react-icons/fa";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        {/* Book Logo */}
        <div style={{ display: 'flex', alignItems: 'left', marginLeft: '-250px'}}>
          <FaBook style={{ fontSize: '5rem', marginTop: '2px' }} />
          <h1 style={{ margin: '5' }}>Recipe Book</h1>
        </div>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/Recipes" activeStyle>
            Recipes
          </NavLink>
          <NavLink to="/sign-up" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;