const mongoose = (require('mongoose'));

//SauceSchema
const articleSchema = mongoose.Schema({
    userId: {type: String, require: true},
    fullname: {type: String, require: true},
    title: {type: String, require: true},
    post: {type: String, require: true},
    imageUrl: {type: String, require: true},
    // likes: {type: Number, require: true},
    // dislikes: {type: Number, require: true},
    // usersLiked: {type: Array, require: true},
    // usersDisliked: {type: Array, require: true},
});

module.exports = mongoose.model('Article', articleSchema);