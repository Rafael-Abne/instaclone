const Post = require('../models/Post');


/* Metodos */
module.exports = {
    async store(req, res) {
         /* procurando post pelo id */
        const post = await Post.findById(req.params.id);
 
        post.likes += 1; /* incrementando +1 e salvando na base de dados */
        await post.save();

        /* enviando like em rempo real */
        req.io.emit('like', post);
        return res.json(post)
    }
}