const express = require('express');
const cors = require('cors')
/*
    multer é utilizado na rota de upload de posts
    permite o express entenda o corpo(multipart) de envio
*/

const multer = require('multer');

const uploadConfig = require('./config/upload');

/* controllers */

const authMiddleware = require('./middleware/auth');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const UserController = require('./controllers/UserController');
const CommentController = require('./controllers/CommentController');
const routes = new express.Router();

const upload = multer(uploadConfig);

routes.get('/posts', authMiddleware, PostController.index)
routes.post('/posts',upload.single('imagem'), PostController.store);
routes.post('/register', UserController.store);
routes.post('/login', UserController.login);
routes.get('/users', UserController.index);
routes.post('/posts/:id/like', LikeController.store);
routes.delete('/posts/:id/delete', PostController.delete);
routes.post('/posts/:id/comment', CommentController.store);


module.exports = routes;