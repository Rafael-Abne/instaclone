const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    localization: {
        type: String,
        required: true
    },
    hashtags: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: String,
        default: ""
    }

}, {
        timestamps: true,
    });

module.exports = mongoose.model('Post', PostSchema);