import axios from 'axios';

const API_URL = 'http://localhost:5000';

const createTweet = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };
  const response = await axios.post(`${API_URL}/tweets`, formData, config);
  return response.data;
};

const fetchTweets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/tweets`, config);
  return response.data;
};

const likeTweet = async (tweetId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(`${API_URL}/likes/like`, { tweetId }, config);
  return response.data;
};

const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/users/profile`, config);
  return response.data;
};

const updateUserProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(`${API_URL}/users/profile`, data, config);
  return response.data;
};

export { createTweet, fetchTweets, likeTweet, getUserProfile, updateUserProfile };
