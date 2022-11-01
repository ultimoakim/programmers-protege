const Post = require('../models/post');

module.exports = {
    index,
    new: newPost,
    create,
}

index = Post.find({});

// Read all posts: GET /posts
function index(req, res) {
    Post.find({})
        .then(function(allPosts) {
            res.render('posts/index', { title: 'All Posts', allPosts });
        })
}

// See new page for creating new posts: GET /posts/new
function newPost(req, res) {
    res.render('posts/new', {title: 'New Post'});
}

// Create a new post! POST /posts
function create(req, res) {
    const post = new Post(req.body);
    post.save()
        .then(function(result) {
            res.redirect('/posts');
        })
        .catch(function(error) {
            if (error) return redirect('/posts/new');
            console.log(error);
        })
}

