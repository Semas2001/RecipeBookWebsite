"use client"
import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import Link from "next/link";
import  { signOut, useSession } from "next-auth/react";


const Navbar: React.FC = () => {
  const {data: session}: any = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className=" top-2 text-black h-20 flex justify-between items-center p-5 rounded-full z-12">
      <a href="/">
      <div className="flex items-center" >
        <FaBook className="text-5xl mt-1" />
        <h1 className="ml-2 text-2xl font-bold">Recipe Book</h1>
      </div>
      </a>
          <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-black text-lg hover:border-b-2 transition-colors">
          Home
        </Link>
        <Link href="/recipes" className="text-black text-lg hover:border-b-2 transition-colors">
          Recipes
        </Link>
        <>
      {!session ? (
        <>
          <Link href="/login" className="text-black text-lg hover:border-b-2 transition-colors">
            Login
          </Link>
        </>
      ) : (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {session.user?.name}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <Link
                  href="/add"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Add a Recipe
                </Link>
                <button
                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => signOut()}
                  role="menuitem"
                  tabIndex={-1}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>

        
      </div>
    </nav>
  );
};

export default Navbar;
