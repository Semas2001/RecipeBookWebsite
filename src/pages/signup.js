import React, { useState } from "react";
import "./css/register.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch('/pages/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to sign up');
            }
    
            // Sign up successful
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : (isSignUp ? 'Sign Up' : 'Login')}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button onClick={() => setIsSignUp(!isSignUp)} disabled={isLoading}>
                    {isLoading ? 'Loading...' : (isSignUp ? 'Login' : 'Sign Up')}
                </button>
            </p>
        </div>
    );
};

export default SignUp;
