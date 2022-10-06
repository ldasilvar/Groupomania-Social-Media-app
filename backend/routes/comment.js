const express = require('express');

const commentController = require('../controllers/comment');
const auth = require('../middleware/auth.js');

exports.router = (function() {
    const Router = express.Router();

    Router.route('/').get(auth, commentController.getComments);
    Router.route('/:id/comments').get(auth, commentController.getComments);
    Router.route('/:id').get(auth, commentController.getCommentById);
    Router.route('/:id/comments').post(auth, commentController.createComment);
    Router.route('/:id').put(auth, commentController.updateComment);
    Router.route('/:id').delete(auth, commentController.deleteComment);

    return Router;
})();
