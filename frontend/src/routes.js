import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CreatePost from './pages/CratePost';

export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route path="/"  exact component={Cadastro} />
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={Cadastro} />
        <Route path="/create-post" component={CreatePost} />
        <Route path="/home" component={Home} />

     </Switch> 
    </BrowserRouter>
    
  );  
}
