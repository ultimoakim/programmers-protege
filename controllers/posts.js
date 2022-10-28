module.exports = {
    index
}

function index(req, res) {
    res.render('posts/index', {title: 'All Posts'});
}