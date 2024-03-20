import React from "react";
import "./App.css";
 
function App() {
    return (
        <div>
            <nav class="navbar background">
                <ul class="nav-list">
                    <div class="logo">
                        <img src="Recipe.png.png"
                        />
                    </div>
                    <li>
                        <a href="#categories">Categories</a>
                    </li>
                    <li>
                        <a href="#addrecipe">Add Recipe</a>
                    </li>
                    <li>
                        <a href="#bboutus">About us</a>
                    </li>
                </ul>
 
                <div class="rightNav">
                    <input
                        type="text"
                        name="search"
                        id="search"
                    />
                    <button class="btn btn-sm">
                        Search
                    </button>
                </div>
            </nav>
 
            <section class="section">
                <div class="box-main">
                    <div class="firstHalf">
                        <h1 class="text-big">
                            Welcome to Our Recipe Book
                        </h1>
                        <p class="text-small">
                            This is our recpe book which contains different recipes that we like to cook and share with our families and friends. 
                            Dont be afraid to add your own recipes to share with us. 
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}
 
export default App;
