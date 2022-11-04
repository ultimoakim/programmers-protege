var express = require('express');
var router = express.Router();
var commentsCtrl = require('../controllers/comments');
var ensureLoggedIn = require('../config/ensureLoggedIn');


// Create comment: POST /posts/:id/comments
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);



module.exports = router;