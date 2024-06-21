const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (id, expiresIn = '1h') => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({ user, token, refreshToken });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`Attempting to log in user: ${username}`);
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    user.refreshToken = refreshToken;
    await user.save();

    console.log('Login successful');
    res.json({ token, refreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const newToken = generateToken(user.id);
    res.json({ token: newToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(401).json({ error: 'Token verification failed' });
  }
};

module.exports = { register, login, refreshToken };
