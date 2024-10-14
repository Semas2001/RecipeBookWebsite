import Navbar from "@/components/navbar";
import React from "react";

const About = () => {
    return (
        <div className="bg-background text-text p-10 text-center">
            <Navbar/>
            <h1 className="font-heading text-4xl mb-8">
                This is the Family Recipe Book where all our family members can add recipes that they love and share it with the rest of us.
            </h1>
        </div>
    );
};

export default About;
