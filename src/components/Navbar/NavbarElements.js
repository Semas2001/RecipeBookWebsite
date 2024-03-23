import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #C3B091;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  z-index: 12;
  border-radius: 40px;
`;

export const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.4rem;
  padding: 0 1rem;
  transition: all 0.3s ease;

  &:hover,
  &:active {
    color: #000;
    background-color: #fff8e7;
	border-radius: 40px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: left;
  marginLeft: -5;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
