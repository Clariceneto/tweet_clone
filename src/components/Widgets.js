import React, { useState } from 'react';
import { searchTweets } from '../services/apiService';
import Tweet from './Tweet';

const SearchTweets = () => {
  const [query, setQuery] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await searchTweets(query);
      setTweets(response.data);
    } catch (error) {
      console.error('Error searching tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tweets"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default SearchTweets;
