import React from "react";
import "./css/index.css"; // Importing your CSS file
const Home = () => {
  return (
    <div>
      <div>
        <h1>The Recipe for a Family</h1>
        <p>
          Welcome to our Family Recipe Book, where we share our favorite recipes and keep our family traditions alive.
        </p>
        <p>
          Ready to add your own recipe? 
        </p>
      </div>
      <div>
        <div>
          <br>
          </br>
        </div>
        <h2><span>Recent Additions</span></h2>
        <ul>
          <li>
            <img src={require("./photos/Photo1.jpg")} alt="" />
            <div>Chicken Alfredo</div>
          </li>
          <li>
            <img src={require("./photos/Photo2.jpg")} alt="" />
            <div>Grandma's Apple Pie</div>
          </li>
          <li>
            <img src={require("./photos/Photo3.jpeg")} alt="" />
            <div>BBQ Ribs</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
