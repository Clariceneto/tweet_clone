import React from 'react';
import { followUser, unfollowUser } from '../services/apiService';

const UserProfile = ({ user }) => {
  const handleFollow = async () => {
    try {
      await followUser(user.id);
      // Atualize o estado para refletir o novo seguidor
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(user.id);
      // Atualize o estado para refletir a remoção do seguidor
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div className="user-profile">
      <h3>{user.username}</h3>
      <button onClick={handleFollow}>Follow</button>
      <button onClick={handleUnfollow}>Unfollow</button>
    </div>
  );
};

export default UserProfile;
