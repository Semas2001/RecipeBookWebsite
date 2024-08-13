import React from "react";
import './css/categories.css'
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Import category images
import category1Img from "./photos/Breakfast.jpg";
import category2Img from "./photos/Lunch.jpeg";
import category3Img from "./photos/Dinner.jpg";
import category4Img from "./photos/Desert.jpg";
import category5Img from "./photos/Drinks.jpg";
import category6Img from "./photos/Salads.jpeg";
import category7Img from "./photos/Snacks.png";
import category8Img from "./photos/Pastry.jpeg";
import category9Img from "./photos/Sourdough.png";

const Recipes = () => {
    // Array of category objects with name and image path
    const categories = [
        { name: "Breakfast", image: category1Img, link: "/breakfast" },
        { name: "Lunch", image: category2Img, link: "/lunch" },
        { name: "Dinner", image: category3Img, link: "/dinner" },
        { name: "Desert", image: category4Img, link: "/desert" },
        { name: "Drinks", image: category5Img, link: "/drinks" },
        { name: "Salads", image: category6Img, link: "/salads" },
        { name: "Snacks", image: category7Img, link: "/snacks" },
        { name: "Pastry", image: category8Img, link: "/pastry" },
        { name: "Sourdough", image: category9Img, link: "/sourdough" }
    ];

    return (
        <div>
            <h1>Choose Category</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {/* Map over categories and render each category with its image */}
                {categories.map((category, index) => (
                    <Link key={index} to={category.link} className="category-link">
                        <div className="category-container" style={{ margin: "10px", textAlign: "center", position: "relative" }}>
                            <img src={category.image} alt={category.name} style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
                            <p className="category-name">{category.name}</p>
                            <div className="category-overlay"></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
