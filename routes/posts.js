var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');

// Read all posts: GET /posts
router.get('/', postsCtrl.index);


module.exports = router;