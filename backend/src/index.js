const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/* conexão com o banco de dados mongodb */
mongoose.connect('mongodb+srv://rafael-abne:rafael2017@cluster0-aolnz.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

/*middleware que passa o io para todas as rotas */
app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use('*', cors()); /* permitir requisições de outros locais */

app.use(bodyParser());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));/* rota de arquivos onde ficaram as imagens*/

app.use(require('./routes'));


server.listen(3333);

