const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");
    
    next();
});


postsRouter.get('/', async (req, res) => {
    try {
        const allPosts = await getAllPosts();
    
        const posts = allPosts.filter(post => {
            if (post.active) {
                return true;
            }

            if (req.user && post.author.id === req.user.id) {
                return true;
            }

            return false;
        });
  
        res.send({
            posts
        });
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = postsRouter;
