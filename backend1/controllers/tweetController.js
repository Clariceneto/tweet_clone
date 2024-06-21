
const { Tweet, User, Sequelize } = require('../models');
const { Op } = Sequelize;


const postTweet = async (req, res) => {
  const { content } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  if (content.length > 280) {
    return res.status(400).json({ error: 'Tweet content exceeds 280 characters' });
  }

  try {
    const tweet = await createTweet(content, imageUrl, req.user.id);
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const likeTweet = async (req, res) => {
  const { tweetId } = req.body;
  const userId = req.user.id;

  try {
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    // Atualize o contador de curtidas
    tweet.likes += 1;
    await tweet.save();

    res.status(200).json(tweet);
  } catch (error) {
    console.error('Error liking tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Selecionar todos os tweets (GET)
const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      order: [['createdAt', 'DESC']],
      include: { model: User, attributes: ['username'] }
    });
    res.json(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Criar novo tweet com upload de imagem (POST)
const createTweet = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  if (content.length > 280) {
    return res.status(400).json({ error: 'Content exceeds 280 characters' });
  }

  try {
    const tweet = await Tweet.create({ content, userId, imageUrl });
    res.status(201).json(tweet);
  } catch (error) {
    console.error('Error creating tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Atualizar tweet (PUT)
const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  if (content.length > 280) {
    return res.status(400).json({ error: 'Content exceeds 280 characters' });
  }

  try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet || tweet.userId !== req.user.id) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    tweet.content = content;
    await tweet.save();

    res.json(tweet);
  } catch (error) {
    console.error('Error updating tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Deletar tweet (DELETE)
const deleteTweet = async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet || tweet.userId !== req.user.id) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    await tweet.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getTweetById = async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findByPk(id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchTweets = async (req, res) => {
  const { query } = req.query;

  try {
    const tweets = await Tweet.findAll({
      where: {
        content: {
          [Op.like]: `%${query}%`
        }
      },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(tweets);
  } catch (error) {
    console.error('Error searching tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Função para buscar tweets com pesquisa
const getTweets = async (req, res) => {
  try {
    const query = req.query.q || '';
    const tweets = await Tweet.findAll({
      where: {
        content: {
          [Op.like]: `%${query}%`
        }
      },
      include: [{ model: User, attributes: ['username'] }]
    });
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { postTweet, getAllTweets ,likeTweet,createTweet,deleteTweet,updateTweet,getTweetById,searchTweets,getTweets};
