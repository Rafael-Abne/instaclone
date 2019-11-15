const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth'); /* importaando chave secreta em md5 */

module.exports = (req, res, next) => {
    /* verificação de autorização */
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.json({error : 'no token provide' });
    }
    /* separando token em duas partes */
    const parts = authHeader.split(' ');

    if(!parts.lenght === 2){
        return res.status(401).send({ error: 'Token error' });
    }
    /* separando o token em duas partes para verificação */
    const [ scheme , token ] = parts;
       
    /* se no token não conter a o metodo Bearer, token mau formatado */
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({  error : 'Token malformated' });
    }

     jwt.verify(token, authConfig.secret, (err, decoded) => {
         /*verificando se o token do cliente é igual ao que foi passado na variável autoConfig*/
         if(err){
             return res.json({error: 'Token invalid'});
         }
         
         req.userId = decoded.id
         return next();
     });

    
}