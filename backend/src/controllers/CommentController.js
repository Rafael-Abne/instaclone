const Post = require('../models/Post');

module.exports = {
    /* listando os posts na ordem decrescente */
    async store(req, res) {
        const { comments } = req.body;
        const post = await Post.findById(req.params.id);
        post.comments+= comments+",";
        await post.save();
        req.io.emit('comment',post);

        return res.json(post);
    }
    
    
    

}