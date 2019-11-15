import React, { useState } from 'react';
import './style.css';
import api from '../../services/api';
import logo from '../../assets/logo_insta.png';
import { Route, Link } from "react-router-dom";
import Cadastro from '../Cadastro';

export default function Login({ history }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState('');
  
  async function handleSubmit(event) {
    event.preventDefault();

    /* pegando os valores do formulário */
    const data = {
      email: email,
      password: password
    };

    /* fazendo requisição post para login de usuário */
   const response =  await api.post('/login', {
      email: data.email,
      password: data.password
    }
   );
     
    if(response.data.error){
      setError(response.data.error);
    }else{
      localStorage.setItem('user',response.data.username);
      localStorage.setItem('token',response.data.token);
      history.push('/home');
    }
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
        <form class="form-insta" onSubmit={handleSubmit} enctype="application/x-www-form-urlencoded">
          <input type="text" value={email} onChange={event => setEmail(event.target.value)}  name="email" placeholder="Email" class="input-text" required/>
          <input type="password" value={password} onChange={event => setPassword(event.target.value)}  name="password" placeholder="Password" class="input-text" required/>
          <input type="submit" value="Login" class="btn" />
        </form>
      </div>
      <div class="sub-content">
        <div class="footer">
          Não tem uma conta?<Link to="/create-account">Cadastre-se</Link>
          <Route path="/create-account" component={Cadastro} />
        </div>
      </div>
    </div>



  );
}
