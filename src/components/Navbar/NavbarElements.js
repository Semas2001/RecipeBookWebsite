// Filename - ./components/Navbar.js

import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	background: #C3B091;
	height: 85px;
	display: flex;
	justify-content: space-between;
	padding: 0.2rem calc((100vw - 1000px) / 2);
	z-index: 12;
	border-radius: 40px; /* Adjust the border-radius value as needed */
`;

export const NavLink = styled(Link)`
	color: #fff;
	text-decoration: none;
	font-size: 1.4rem;
	padding: 0 1rem;
	transition: all 0.3s ease;

	&:hover, &:active {
		color: #000;
		background-color: #fff8e7;
}
`;

export const Bars = styled(FaBars)`
	display: none;
	color: #808080;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: -250px; 
	@media screen and (max-width: 768px) {
		display: none;
	}
`;