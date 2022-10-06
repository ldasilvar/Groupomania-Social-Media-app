const db = require('../models');
const Article = db.Article;
const User = db.User;
const jwtUtils= require('../utils/jwt.utils');
const fs = require("fs");

const getAllArticles = async (req, res) => {  
    try {
        const fields = req.body.fields;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const order = req.query.order;
        
        

        const articles = await Article.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: User,
                attributes: [ 'fullname' ]
            }]
        })

        if(articles) {
            res.status(200).json(articles);
            // console.log(pathImg);
        } else {
            res.status(404).json({ "error": "no messages found"});
        }
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

const getArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await Article.findOne({
            where: { id: articleId },
            include: [{
                model: User,
                attributes: [ 'fullname' ]
            }]
        });

        if(article) {
            return res.status(200).json(article);
        } else {
            return res.status(404).send('Article with the specified ID does not exists');
        }     
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

const createArticle = async (req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);
        const title = req.body.title;
        const content = req.body.content;
        let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        console.log(imageUrl);

        if(title == null || content == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        const user = await User.findOne({
            where: { id: userId }
        });

        const newArticle = await Article.create({
            title: title,
            content: content,
            likes: 0,
            UserId: user.id,
            image: imageUrl
        })

        if(newArticle) {
            return res.status(201).json(newArticle);
        } else {
            return res.status(500).json({'error': 'cannot post message'})
        } 
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }
}

const UpdateArticle = async(req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);
        const articleId = req.params.id;
        const article = await Article.findOne({
            where: { id: articleId }
        })
        console.log(req.body.image)

        if(userId === article.UserId) {
            const updatedArticle = await article.update({
                title: req.body.title,
                content: req.body.content
            }, {
                where: { id: req.body.id }
            });

            if(updatedArticle) {
                return res.status(200).json({ article: updatedArticle });
            }
            throw new Error('User not found');
        }
    } catch(error) {
        return res.status(500).send(error.message);
    }
};

const deleteArticle = async (req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);
        const articleId = req.params.id;

        const user = await User.findOne({
            where: { id: userId }
        });

        const article = await Article.findOne({
            where: { id: articleId }
        })

        if(userId === article.UserId || user.isAdmin === true) {
            const deleted = await Article.destroy({
                where: { id: articleId }
            })

           if(deleted) {
                return res.status(204).send("article deleted");
            }
            throw new Error('Article not found') 
        }
        throw new Error('User not found');
    } catch(error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { getAllArticles, getArticleById, UpdateArticle, deleteArticle, createArticle }