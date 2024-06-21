import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to TweetClone</h1>
      <p>The best place to share your thoughts</p>
      <div className="landing-buttons">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
