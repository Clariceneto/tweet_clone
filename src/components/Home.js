import React from 'react';
import TweetList from './TweetList';
import '../styles/Home.css';
import TweetBox from './TweetBox';

const Home = () => {
  return (
    <div className="home">
      <TweetBox/>
      <TweetList />
    </div>
  );
};

export default Home;
