import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, fetchTweets, deleteTweet } from '../services/adminService';

const BackOffice = () => {
  const [users, setUsers] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchUsers();
      setUsers(response.data);
    };

    const getTweets = async () => {
      const response = await fetchTweets();
      setTweets(response.data);
    };

    getUsers();
    getTweets();
  }, []);

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleDeleteTweet = async (tweetId) => {
    await deleteTweet(tweetId);
    setTweets(tweets.filter(tweet => tweet.id !== tweetId));
  };

  return (
    <div>
      <h1>BackOffice</h1>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Tweets</h2>
      <ul>
        {tweets.map(tweet => (
          <li key={tweet.id}>
            {tweet.content}
            <button onClick={() => handleDeleteTweet(tweet.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BackOffice;
