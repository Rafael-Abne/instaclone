import React, { useState } from 'react';
import logo from '../../assets/logo_insta.png';
import './style.css';
import { Route, Link } from "react-router-dom";
import Login from '../Login';
import api from '../../services/api';


export default function Cadastro({ history }) {
  /*  inciando variáveis */
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    /* pegando os valores do formulário */
    const data = {
      username: username,
      email: email,
      password: password
    };

    /* fazendo requisição post para rota register para registrar um usuário */
    await api.post('/register', {
      username: data.username,
      email: data.email,
      password: data.password
    }).then(function () {
      history.push('/login');
    }).catch(function () {
      setError('user exists!');
    });
  }


  return (
    <div id="container">
      <div class="main-content">
        <div class="header">
          <img src={logo} alt="logo" />
        </div>
        {errors !== '' && (
           <div class="danger-errors">
              {errors}
           </div>
        )}
        
        <form class="form-insta" onSubmit={handleSubmit}>
          <input type="text" value={email} onChange={event => setEmail(event.target.value)} id="email" name="email" placeholder="Email" class="input-text" required/>
          <input type="text" value={username} onChange={event => setUsername(event.target.value)} id="username" name="username" placeholder="Username" class="input-text" required/>
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} id="password" name="password" placeholder="Password" class="input-text" required/>

          <input type="submit" value="Cadastrar" class="btn" />
        </form>
      </div>
      <div class="sub-content">
        <div class="footer">
          Possui uma conta?<Link to="/login">Login</Link>
          <Route path="/login" component={Login} />
        </div>
      </div>
    </div>
  );
}

