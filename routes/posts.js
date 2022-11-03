var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');
var ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes here start with /post!

// Read all posts: GET /posts
router.get('/', postsCtrl.index);

// New post (which leads into creating one): GET /posts/new
router.get('/new', ensureLoggedIn, postsCtrl.new);

// Create the post!: POST /posts
router.post('/', ensureLoggedIn, postsCtrl.create);

// View each post!: GET /posts/:id
router.get('/:id', postsCtrl.show);

// Edit each post!: GET /posts/:id/edit
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);



module.exports = router;