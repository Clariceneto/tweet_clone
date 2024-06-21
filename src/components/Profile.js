import React, { useEffect, useState } from 'react';
import { getUserProfile, updateProfile } from '../services/apiService'; // Atualizar as importações corretas
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', biography: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
        setForm({
          username: response.data.username,
          email: response.data.email,
          biography: response.data.biography || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
        <h2>Profile</h2>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Biography</label>
          <textarea name="biography" value={form.biography} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
