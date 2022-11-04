const Post = require('../models/post');

module.exports = {
    create,
};


function create(req, res) {
    Post.findById(req.params.id)
        .then(function(thePost) {
            req.body.userId = req.user._id;
            req.body.userName = req.user.name;
            req.body.userAvatar = req.user.avatar;
            thePost.comment.push(req.body);
            return thePost.save();
        }).then(function(saved) {
            res.redirect(`/posts/${saved._id}`);
        })
}
    