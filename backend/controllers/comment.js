const { Sequelize } = require('sequelize');

const db = require("../models");
const Comment = db.Comment;
const Article = db.Article;
const User = db.User;
const jwtUtils= require('../utils/jwt.utils');

exports.getComments = async (req, res) => {

    try {
        const fields = req.body.fields;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const order = req.query.order;

        const comments = await Comment.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: User,
                attributes: [ 'fullname' ]
            }]
        })
        console.log(comments)

        if(comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({ "error": "no messages found"});
        }        
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

exports.getCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findOne({
            where: { id: commentId },
            include: [{
                model: User,
                attributes: [ 'fullname' ]
            }]
        });

        if(comment) {
            return res.status(200).json(comment);
        } else {
            return res.status(404).send('Article with the specified ID does not exists');
        }     
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

exports.createComment = async (req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);
        const content = req.body.content;
        const user = await User.findOne({
            where: { id: userId }
        })
        const articleId = req.params.id;
        console.log(articleId)

        if(content === null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if(user) {
            const newComment = await Comment.create({
                content: content,
                UserId: userId,
                ArticleId: parseInt(articleId, 10)
            })

            if(newComment) {
                return res.status(201).json(newComment);
            } else {
                return res.status(500).json({'error': 'cannot post message'})
            }             
        }
    }
    catch(error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateComment = async(req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);
        const commentId = req.params.id;

        const user = await User.findOne({
            where: { id: userId }
        }); 

        const comment = await Comment.findOne({
            where: { id: commentId }
        })
        
        if(userId === comment.UserId || user.isAdmin === true) {
            const updatedComment = await comment.update({
                content: req.body.content
            }, {
                where: { id: req.body.id }
            });

            if(updatedComment) {
                return res.status(200).json(updatedComment);
            }
            throw new Error('User not found');
        }
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);
        const comment = await Comment.findOne({
            attributes: ["id", "content", "UserId", "ArticleId"],
            where: { id: req.params.id }
        })
        
        if(!comment) {
            throw new Error("comment is not found")
        }
        if(userId === comment.UserId || user.isAdmin === true) {
            await Comment.destroy({
                where: { id: req.params.id }
            })
            res.status(200).json({ message: "comment has been deleted"})            
        }
    } catch(error) {
        return res.status(500).json({ error: error.message }) 
    }
}