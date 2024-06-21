import React, { useState } from 'react';
import { createTweet } from '../services/apiService';
import '../styles/TweetBox.css';

const TweetBox = ({ token }) => {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState(null);

  const handleImageChange = (e) => {
    setTweetImage(e.target.files[0]);
  };

  const sendTweet = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', tweetMessage);
    if (tweetImage) {
      formData.append('image', tweetImage);
    }

    try {
      await createTweet(formData, token);
      setTweetMessage('');
      setTweetImage(null);
      // Atualizar feed de tweets ou redirecionar
    } catch (error) {
      console.error('Error posting tweet:', error);
      alert('Failed to post tweet');
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <img src="/path/to/profile/picture" alt="Profile" className="tweetBox__avatar" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          type="file"
          onChange={handleImageChange}
          className="tweetBox__imageInput"
        />
        <button onClick={sendTweet} type="submit" className="tweetBox__tweetButton">
          Postar
        </button>
      </form>
    </div>
  );
};

export default TweetBox;
