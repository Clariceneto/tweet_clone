import React, { useEffect, useState } from 'react';
import { getTweets } from '../services/apiService';
import Tweet from './Tweet';
import TweetBox from './TweetBox';
import '../styles/Feed.css';

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await getTweets();
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  const handleLike = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId ? { ...tweet, isLiked: true, likesCount: tweet.likesCount + 1 } : tweet
      )
    );
  };

  const handleUnlike = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId ? { ...tweet, isLiked: false, likesCount: tweet.likesCount - 1 } : tweet
      )
    );
  };

  return (
    <div className="feed">
      <TweetBox />
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} onLike={handleLike} onUnlike={handleUnlike} />
      ))}
    </div>
  );
};

export default Feed;
