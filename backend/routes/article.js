const express = require('express');

const articleController = require('../controllers/article');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

exports.router = (function() {
    const Router = express.Router();

    Router.get('/', auth, articleController.getAllArticles);
    Router.get('/:id/', auth, articleController.getArticleById);
    Router.post('/new/', auth, multer, articleController.createArticle);
    Router.put('/edit/:id/', auth, articleController.UpdateArticle);
    Router.delete('/:id/', auth, articleController.deleteArticle);

    return Router;
})();
