var express = require('express');
var router = express.Router();
var commentsCtrl = require('../controllers/comments');
var ensureLoggedIn = require('../config/ensureLoggedIn');


// All routes here start with /


// Create comment: POST /posts/:id/comments
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);

// Get to Edit page to edit a comment: GET /comments/:id/edit
router.get('/comments/:id/edit', ensureLoggedIn, commentsCtrl.edit);

// Update a selected comment: PUT /comments/:id
router.put('/comments/:id', ensureLoggedIn, commentsCtrl.update);


module.exports = router;