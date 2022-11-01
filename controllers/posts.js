module.exports = {
    index,
    new: newPost,
}

// Read all posts: GET /posts
function index(req, res) {
    res.render('posts/index', {title: 'All Posts'});
}

// See new page for creating new posts: GET /posts/new
function newPost(req, res) {
    res.render('posts/new', {title: 'New Post'});
}

