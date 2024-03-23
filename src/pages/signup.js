import React, { useState } from "react";
import "./css/register.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle sign up or login logic here
        if (isSignUp) {
            // Handle sign-up
            console.log("Signing up with email:", email, "and password:", password);
        } else {
            // Handle login
            console.log("Logging in with email:", email, "and password:", password);
        }
    };

    return (
        <div className="signup-container">
            {isSignUp ? <h1>Sign Up</h1> : <h1>Login</h1>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
            </form>
            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Login" : "Sign Up"}
                </button>
            </p>
        </div>
    );
};

export default SignUp;
