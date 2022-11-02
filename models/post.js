const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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