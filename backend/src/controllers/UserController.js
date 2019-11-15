const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretAuth = require('../config/auth');

/* metodo para gerar token, com parâmetro id */

function generateToken(params = {}) {
    return jwt.sign(params, secretAuth.secret, {
        expiresIn: 86400  /* expira em 1 dia */
    });
}

module.exports = {


    async index(req, res) {
        const user = await User.find().sort('-createdAt');
        return res.json(user);
    },

    /* salvando usuário */
    async store(req, res) {


        const { username, password, email } = req.body;/* dados da requisição */

        const userBd = await User.findOne({ email }); /* buscar pelo email na base de dados*/

        if (userBd) { /* verificando se usuário já existe */
            return res.status(400).send({ error: 'user exists' });
        }
       /* cadastrar na base de dados */
        const user = await User.create({
            username,
            password,
            email
        });


        return res.json({ user: user, token: generateToken({ id: user.id }) });
    },

    /* metodo login */
    async login(req, res) {
        const { email, password } = req.body; /* dados da requisição */

        const user = await User.findOne({ email }); /* buscando usuário pelo email */

        if (!user) { /* verificando se usuário não existe */
            return res.json({ error: 'user not found' });
        }

        if (user && user.password == password) { /* comparando as senhas */
            const token = generateToken({ id: user.id }) /* gernado token */
            return res.json({ message: 'user found!', token: token, userId: req.userId, username: user.username });

        }
        return res.json({ error: 'incorrect password' });
    }
}