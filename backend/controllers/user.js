const { Sequelize } = require('sequelize');

// user security
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const db = require("../models");
const User = db.User;
const Article = db.Article;

// REGEX
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/


exports.signup = async (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const post = req.body.post;
    const description = req.body.description;

console.log(req.body)
    try {
        if (email == null || fullname == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        
        // conditions signup

        if(fullname > 13 || fullname < 3) {
            return res.status(400).json({ 'error': 'Your name must be between 3 and 13 characters'});
        }


        if(!emailRegex.test(email)) {
            return res.status(400).json({ 'error': 'Email address is not valid'});
        }

        if(!passwordRegex.test(password)) {
            return res.status(400).json({ 'error': 'Password is not valid'});
        }

        const user = await User.findOne({
            where: { email: email }
        });

        if(user) {
            return res.status(409).json({ 'error': 'user already exist' });
        }

        if(!user) {
            const newUser = await User.create({
                fullname: fullname,
                email: email,
                password: await bcrypt.hash(password, 10),
                post: post,
                description: description,
                isAdmin: false
            });
           
            if(newUser) {
                return res.status(201).json({
                    'userId': newUser.id
                })
            }
        } else {
            return res.status(409).json({ 'error': 'user already exist' });
        }

    } catch(error) {
        res.status(400).json({ error: error });
    } 
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
       if(email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters'});
        }

        const user = await User.findOne({
            where: { email: email }
        });

        if(user) {
            const verifyBcrypt = await bcrypt.compare(password, user.password);
            if(verifyBcrypt) {
                return res.status(200).json({
                    'userId': user.id,
                    'token': jwtUtils.generateTokenForUser(user),
                    'isAdmin': user.isAdmin
                });
            } else {
                return res.status(500).json({ 'error': 'invalid password'});
            }
        } else {
            return res.status(500).json({ 'error': 'user does not exist' });
        } 
    } catch(error) {
        res.status(400).json({ error: error });
    }
}

exports.userProfil = async (req, res) => {
    const userId = jwtUtils.getUserId(req.headers.authorization);

    try {
        const user = await User.findOne({
            attributes: ['id', 'fullname', 'email'],
            where: { id: userId }
        });

        if(user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ 'error': 'user not found'});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }  
}

exports.userDelete = async (req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);
        const user = await User.findOne({ where: { id: userId }});
        // const Article = await Article.findOne({ where: { id: req.params.id }});

            if(user) {
                // Article.destroy({
                //     where: { id: userId }
                // })
                User.destroy({
                    where: { id: userId }
                })
                return res.status(200).json({ message: "user deleted"})
            }             
        
    } catch(error) {
        return res.status(500).send(error.message);
    }  
}

exports.userUpdate = async(req, res) => {
    try {
        const userId = jwtUtils.getUserId(req.headers.authorization);

        const user = await User.findOne({
            where: { id: userId }
        }); 

        if(userId === userId|| user.isAdmin === true) {
            const updatedUser = await user.update({
                fullname: req.body.fullname,
                email: req.body.email,
                
            }, {
                where: { id: req.body.id }
            });

            if(updatedUser) {
                return res.status(200).json({ article: updatedUser });
            }
            throw new Error('User not found');
        }
    } catch(error) {
        return res.status(500).send(error.message);
    }
}