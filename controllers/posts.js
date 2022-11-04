const Post = require('../models/post');

// All functions in this controller ONLY have to do with posts. If you want to CRUD something that's for ANOTHER data, like comments, then you need another controller with functions that will only affect THAT data.
// So yup, you gotta create a comments controller!

module.exports = {
    index,
    new: newPost,
    create,
    show,
    edit,
    update,
    delete: deletePost,
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
                    `Greetings, my friends! Carpe Diem! Seize the lesson!`,
                    `Hello world! What are you going to write about today? Tell us!`,
                ],
                randNum: Math.floor(Math.random() * 5),
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
            console.log(`If you see this message, this is an error from the create function. Error: ${error}, post: ${post}`);
        })
}


// View each post! GET /posts/:id
function show(req, res) {
    Post.findById(req.params.id)
        .then(function(singDoc) {
            res.render('posts/show', {title: 'Post Details', singDoc });
        }).catch(function(error) {
            console.log(`If you see this message, this is an error coming from our show function. The error is this: ${error}`);
            res.redirect('/posts');
        })
}


function edit(req, res) {
    Post.findById(req.params.id)
        .then(function(singDoc) {
            res.render('posts/edit', { title: 'Edit Post', singDoc });
        }).catch(function(error) {
            console.log(`If you see this message, this is an error from our edit function. The error is this: ${error}`);
            res.redirect('/posts');
        })
}


function update(req, res) {
    Post.findOneAndUpdate({_id: req.params.id, user: req.user.id}, req.body, {new: true})
    // Remember, req.user.id is a request used to grab the ID of the user. This is a special property that wouldn't exist without OAuth.
        .then(function(updated) {
            res.redirect(`/posts/${updated._id}`);
        })
}


function deletePost(req, res) {
    Post.findOneAndDelete({_id: req.params.id, user: req.user.id})
        .then(function(deleted) {
            res.redirect(`/posts`);
        }).catch(function(error) {
            console.log(`If you see this message, this is an error coming from the delete function. The error is this: ${error}`);
            res.redirect(`/posts`);
        })
}