const Post = require('../models/post');
// jsdom
const jsdom = require('jsdom');

module.exports = {
    index,
    new: newPost,
    create,
    show,
    edit,
}

// index = Post.find({}); // Why do I even have this code? If there are no bugs then that means I put this here for no reason.


// Read all posts: GET /posts
function index(req, res) {
    Post.find({})
        .then(function (allPosts) {
            res.render('posts/index', {
                title: 'All Posts',
                allPosts,
                welcomeMessage: [
                    `Thanks for stopping by, fellow students! Let's teach other something new today!`,
                    `Welcome back to another glorious day of learning! Got something to talk about?`,
                    `Hello, and welcome! It's nice to see you here!`,
                    `Greetings, my friends! Carpe Diem! Seize the lesson!`
                ],
                randNum: Math.floor(Math.random() * 4),
            });
        })
}

// See new page for creating new posts: GET /posts/new
function newPost(req, res) {
    res.render('posts/new', { title: 'New Post' });
}

// Create a new post! POST /posts
function create(req, res) {
    const post = new Post(req.body);
    post.user = req.user._id;
    post.userName = req.user.name;
    // post.userAvatar = req.user.avatar; Adding this line of code creates an error, and I've yet to discover why. However, I don't plan to show icon images on the home page. Maybe when you click on the specific post created by them. But otherwise? Nah.
    post.save()
        .then(function(result) {
            res.redirect('/posts');
        }).catch(function(error) {
            res.redirect('/posts/new');
            console.log(error);
            console.log(post);
        })
}

// View each post! GET /posts/:id
function show(req, res) {
    Post.findById(req.params.id)
        .then(function(singDoc) {
            
            const dom = new jsdom.JSDOM(singDoc.content);
            console.log(dom.window.document.body.textContent);
            let stringToHTML = dom.window.document.body.textContent;

            res.render('posts/show', {title: 'Post Details', singDoc, stringToHTML });
        }).catch(function(error) {
            console.log(error);
            res.redirect('/posts');
        })
}

function edit(req, res) {
    Post.findById(req.params.id)
        .then(function(singDoc) {
            res.render('posts/edit', { title: 'Edit Post', singDoc })
        })
}
