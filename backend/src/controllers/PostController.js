const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
module.exports = {
    /* listando os posts na ordem decrescente */
    async index(req, res) {
        const post = await Post.find().sort('-createdAt'); /* buscando post por data */
        return res.json(post);
    },


    /* salvando post  */
    async store(req, res) {
        const { localization, hashtags, description, author } = req.body;
        const { filename: image } = req.file;
        const ext = path.extname(req.file.path);
        const [name] = image.split('.');
        const fileName = `${name}${ext}`;


        /* salvando no banco de dados */
        const post = await Post.create({
            author,
            localization,
            description,
            hashtags,
            imagem: fileName
        });

        const newPost = await Post.find().sort('-createdAt'); /* buscando post por data */
        req.io.emit('post', newPost);
        return res.json(post);
    },
    async delete(req, res) {
        id = req.params.id;
        await Post.findByIdAndRemove(id); /*deletando post por data */
        const newPost = await Post.find().sort('-createdAt'); /* buscando post por data */
        req.io.emit('post', newPost);
        return res.json(newPost);
    }
}