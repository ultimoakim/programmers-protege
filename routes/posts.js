var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');

// All routes here start with /post!

// Read all posts: GET /posts
router.get('/', postsCtrl.index);

// New post (which leads into creating one): GET /posts/new
router.get('/new', postsCtrl.new);


module.exports = router;