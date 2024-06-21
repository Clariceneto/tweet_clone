import React, { useEffect, useState } from 'react';
import { fetchTweets } from '../services/apiService';
import Tweet from './Tweet';
import '../styles/Tweet.css';

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await fetchTweets();
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setLoading(false);
      }
    };

    getTweets();
  }, []);

  const handleLike = (tweetId) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId ? { ...tweet, likes: tweet.likes + 1 } : tweet
    ));
  };

  if (loading) {
    return <div>.................Loading.................</div>;
  }

  if (!tweets.length) {
    return <div>No tweets available</div>;
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} onLike={handleLike} />
      ))}
    </div>
  );
};

export default TweetList;
