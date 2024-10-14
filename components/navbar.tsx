import React from "react";
import { FaBook } from "react-icons/fa";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#C3B091] h-20 flex justify-between items-center p-5 rounded-full z-12">
      <div className="flex items-center">
        <FaBook className="text-5xl mt-1" />
        <h1 className="ml-2 text-2xl font-bold">Recipe Book</h1>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-white text-lg hover:text-black transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-white text-lg hover:text-black transition-colors">
          About
        </Link>
        <Link href="/recipes" className="text-white text-lg hover:text-black transition-colors">
          Recipes
        </Link>
        <Link href="/user" className="text-white text-lg hover:text-black transition-colors">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
