const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('posts');

module.exports = app => {
    app.get('/api/posts', requireLogin, async (req, res) => {
        const posts = await Post.find({ _user: req.user.id })

        res.send(posts);
    });

    app.post('/api/posts', requireLogin, async (req,res)=> {
        const { title, body, category } = req.body;

        const post = new Post({
            title,
            body,
            category,
            _user: req.user.id,
            dateCreated: Date.now() 
        });
        
        try{
        await post.save();
        req.user.posts += 1;
        const user = await req.user.save();

        res.send(user);
        } catch(err) {
            res.status(422).send(err);
        }
    });
};