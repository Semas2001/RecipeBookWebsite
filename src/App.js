import React from "react";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Home from "./pages/";
import About from "./pages/about";
import SignUp from "./pages/signup";
import Recipes from "./pages/recipes";
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/Recipes" element={<Recipes />}/>
                <Route path="/sign-up"element={<SignUp />}/>
            </Routes>
        </Router>
    );
}
 
export default App;
