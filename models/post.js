const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const commentSchema = new Schema({
    content: {
        type: String,
        minLength: 5,
    },
    // So the thing is, since this was required, when I tried to run my create function in the comments controller, it would fail and get a 500 error because it would say that "The path 'user' is required". However, once I disabled this, it worked because now there's no more required things in the way. TECHNICALLY SPEAKING, it's true that I don't need the user property in this case because we just want to grab their name and avatar for the comments, but... yeah... I'm gonna have to figure this out with somebody later on.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
      },
      userName: String,
      userAvatar: String,
}, {
    timestamps: true
});



const postSchema = new Schema({
    title: {
        type: String,
        minLength: [5, `Your title must be at least 5 characters.`],
    },
    tag: String,
    content: {
        type: String,
        minLength: [20, `Your post must be at least 50 characters.`],
    },
    // We will embed the commentSchema within the postSchema because they share a one-to-many relationship. If they did NOT have a one-to-many relationship, we would be prohibited from using embedding.
    comment: [commentSchema],
    // OAuth Required Stuff
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: String,
    userAvatar: String,
    // End of OAuth stuff
}, {
    timestamps: true
});


module.exports = mongoose.model('Post', postSchema);