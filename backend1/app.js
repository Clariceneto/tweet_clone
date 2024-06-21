require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const commentRouter = require('./routes/commentRoutes');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const tweetRouter = require('./routes/tweetRoutes');
const likeRouter = require('./routes/likeRoutes');
const followRouter = require('./routes/followRoutes');

const { initModels } = require('./models');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tweets', tweetRouter);
app.use('/api/likes', likeRouter);
app.use('/api/follows', followRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/comments', commentRouter);



if (fs.existsSync('./swagger_output.json')) {
  const swaggerUi = require('swagger-ui-express');
  const swaggerFile = require('./swagger_output.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.use(function(req, res, next) {
  res.status(404).send('Not Found');
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
});

initModels().then(() => {
  console.log('Models initialized');
}).catch(err => {
  console.error('Unable to initialize models:', err);
});

module.exports = app;
