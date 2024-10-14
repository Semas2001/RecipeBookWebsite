import React, { useState } from "react";
import "./css/register.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState(""); // Changed to setName
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // For success message

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false); // Reset success state

        try {
            const response = await fetch('/pages/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, password }), // Added name to the body
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to sign up');
            }

            setSuccess(true); // Set success to true
            console.log('Sign up successful');
        } catch (error) {
            console.error('Error signing up:', error.message);
            setError(error.message || 'Failed to sign up');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            {isSignUp ? <h1>Sign Up</h1> : <h1>Login</h1>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text" // Changed to text
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Changed to setName
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email" // Changed to email
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : (isSignUp ? 'Sign Up' : 'Login')}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Sign up successful! You can now log in.</p>} {/* Success message */}
            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button onClick={() => setIsSignUp(!isSignUp)} disabled={isLoading}>
                    {isLoading ? 'Loading...' : (isSignUp ? 'Login' : 'Sign Up')}
                </button>
            </p>
        </div>
    );
};

export default Signup;
