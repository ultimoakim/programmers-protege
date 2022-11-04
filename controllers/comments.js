const Post = require('../models/post');

module.exports = {
    create,
    edit,
    update,
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


function edit(req, res) {
    Post.findOne({'comment._id': req.params.id})
        .then(function(commPost) {
            const findPostId = commPost.comment.id(req.params.id);
            res.render('comments/edit', {findPostId});
        })
}

function update(req, res) {
    Post.findOne({'comment._id': req.params.id})
        .then(function(post) {
            const commentSubdoc = post.comment.id(req.params.id);
            if (commentSubdoc.userId !== req.user._id) {
                return res.redirect(`/posts/${post._id}`);
            }
            commentSubdoc.content = req.body.content;
            return post.save();
        }).then(function(saved) {
            res.redirect(`/posts/${saved._id}`);
        })
  }

  
    