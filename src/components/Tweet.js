import React from 'react';
import '../styles/Tweet.css';

const Tweet = ({ tweet, onLike }) => {
  if (!tweet || !tweet.user || !tweet.user.username) {
    return null; // Ou uma mensagem de erro/aviso
  }

  const handleLike = () => {
    onLike(tweet.id);
  };

  return (
    <div className="tweet">
      <div className="tweet__header">
        <h3>{tweet.user.username}</h3>
      </div>
      <div className="tweet__body">
        <p>{tweet.content}</p>
        {tweet.imageUrl && <img src={tweet.imageUrl} alt="Tweet image" />}
      </div>
      <div className="tweet__footer">
        <button onClick={handleLike}>Like</button>
        <span>{tweet.likes} likes</span>
      </div>
    </div>
  );
};

export default Tweet;
