import React from "react";
import { Route, Link } from "react-router-dom";
import './style.css';
import camera from './imagens/camera.svg';
import CreatePost from '../../pages/CratePost';


class Header extends React.Component {
  render() {
    return (
      <nav className="Nav">
        <div className="Nav-menus">
          <div className="Nav-bar">
          {/* <Link class="foto" to="/create-post"> */}
            <div className="logo-insta">
            </div>
            {/* </Link> */}
            {/* <Route path="/home" component={Home} /> */}
          </div>
          <Link class="foto" to="/create-post"><img class="capturar" alt="Publicar" src={camera} /></Link>
          <Route path="/creat-post" component={CreatePost} />
        </div>

      </nav>
    );
  }
}
export default Header;