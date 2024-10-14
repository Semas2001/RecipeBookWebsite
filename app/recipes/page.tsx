import React from "react";
import Link from 'next/link';
import Image from 'next/image'; 
import Navbar from "@/components/navbar";

const Recipes = () => {
    // Array of category objects with name and image path
    const categories = [
        { name: "Breakfast", image: '/Breakfast.jpg', link: "/breakfast" },
        { name: "Lunch", image: '/Lunch.jpeg', link: "/lunch" },
        { name: "Dinner", image: '/Dinner.jpg', link: "/dinner" },
        { name: "Desert", image: '/Desert.jpg', link: "/desert" },
        { name: "Drinks", image: '/Drinks.jpg', link: "/drinks" },
        { name: "Salads", image: '/Salads.jpeg', link: "/salads" },
        { name: "Snacks", image: '/Snacks.png', link: "/snacks" },
        { name: "Pastry", image: '/Pastry.jpeg', link: "/pastry" },
        { name: "Sourdough", image: '/Sourdough.png', link: "/sourdough" }
    ];

    return (
        
        <div className="bg-background text-text p-10 text-center">
            <Navbar/>
            <h1 className="font-heading text-4xl mb-8">Choose Category</h1>
            <div className="flex flex-wrap justify-center">
                {categories.map((category, index) => (
                    <Link key={index} href={category.link} className="relative m-4 group">
                        <div className="text-center">
                            <Image 
                                src={category.image} 
                                alt={category.name} 
                                width={200}  // Set the width here
                                height={200} // Set the height here
                                className="object-cover rounded-lg border border-gray-300 transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-70"
                            />
                            <p className="font-heading mt-2">{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
