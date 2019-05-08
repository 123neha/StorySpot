const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const storyRoute = require('./story.route');
const userRoute = require('./user.route');

router.get('', (req, res) => {
  res.send('Welcome to Story Spot APIs');
});

router.post('/login', userController.login);
router.use('/user', userRoute);
router.use('/story', storyRoute);

module.exports = router;
