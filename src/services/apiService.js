import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.refreshToken) {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {
            token: user.refreshToken,
          });
          user.token = response.data.token;
          localStorage.setItem('user', JSON.stringify(user));
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          return api(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token', err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const login = (credentials) => api.post('/api/auth/login', credentials);
export const register = (data) => api.post('/api/auth/register', data);
export const createTweet = (data) => api.post('/api/tweets', data);
export const fetchTweets = (count = 10) => api.get(`/api/tweets?count=${count}`);
export const getUserProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data); // Corrigir a função exportada
export const likeTweet = (tweetId) => api.post('/api/likes/like', { tweetId });
export const unlikeTweet = (tweetId) => api.post('/api/likes/unlike', { tweetId });
export const followUser = (followingId) => api.post('/api/follows/follow', { followingId });
export const unfollowUser = (followingId) => api.post('/api/follows/unfollow', { followingId });
export const searchTweets = (query) => api.get(`/api/tweets/search?query=${query}`);
export const getCommentsByTweet = (tweetId) => api.get(`/api/comments/tweet/${tweetId}`);
export const createComment = (data) => api.post('/api/comments', data);