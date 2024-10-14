'use client'
import Navbar from "@/components/navbar";
import RecipeCarousel from "@/components/recentCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FBF7F2] text-[#62645b] p-10 text-center">
      <Navbar/>
      <div>
        <h1 className="font-CBR font-heading mt-5 text-6xl">The Recipe for a Family</h1>
        <p className="mt-4">
          Welcome to our Family Recipe Book, where we share our favorite recipes and keep our family traditions alive.
        </p>
        <p className="mt-2">Ready to add your own recipe?</p>
      </div>
      
      <div className="mt-10">
        <h2 className="border-b border-black mb-4 text-2xl">
        </h2>
        <RecipeCarousel/>
      </div>
    </div>
  );
}
