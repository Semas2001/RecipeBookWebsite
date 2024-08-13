import React from "react";
import { FaBook } from "react-icons/fa";
import { Nav, NavLink, NavMenu, LogoContainer } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <LogoContainer>
          <FaBook style={{ fontSize: '4.5rem', marginTop: '5px' }} />
          <h1 style={{ margin: '5' }}>Recipe Book</h1>
        </LogoContainer>
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
          <NavLink to="/Login" activeStyle>
            Login
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
