const express = require('express');

const router = express.Router();
const storyController = require('../controllers/story.controller');

router.post('', storyController.create);
router.get('', storyController.findAll);
router.get('/:id', storyController.findById);

module.exports = router;
