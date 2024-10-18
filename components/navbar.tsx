"use client"
import React from "react";
import { FaBook } from "react-icons/fa";
import Link from "next/link";
import  { signOut, useSession } from "next-auth/react";


const Navbar: React.FC = () => {
  const {data: session}: any = useSession();
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
        {!session ? (
          <>
            <Link href="/login" className="text-black text-lg hover:border-b-2 transition-colors">
            Login
          </Link>
          </>

        ):(
          <>
          <button>
          {session.user?.name}
          </button>
          <li>
            <button className="text-black text-lg hover:border-b-2 transition-colors" onClick={() => signOut()}>Sign Out</button>
          </li>
          </>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
