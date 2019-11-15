import React, { Component } from 'react';
import Header from '../../components/Header';
import './style.css';
import api from '../../services/api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import io from 'socket.io-client';
import Like from './imagens/like.svg';
import Comment from './imagens/comment.svg';
import Direct from './imagens/direct.svg';
import Delete from './imagens/delete.svg';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({ forceRefresh: true });



class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: [],
      comment: '',
      comments: [],
      author: ''
    }
  }

  /* alerta de remoção de um post */
  DeleteConfirm = (id) => {
    confirmAlert({
      title: 'Confirme',
      message: 'Deseja realmente deletar este post?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => this.DeletePost(id)
        },
        {
          label: 'Não'
        }
      ]
    });
  };



  /* inicializa este método primeiro buscando os posts */
  async componentDidMount() {
    this.SocketIo();
    const response = await api.get('posts', {
      headers: { authorization: "Bearer " + localStorage.getItem('token') }/* realizando a autorização da visualização dos posts */
    });

    /* caso o token não for inserido ou não formatado da forma certa. voltar para rota login */
    if (response.data.error) {
      history.push('/login');

    }
    this.setState({ posts: response.data });

  }

  /* enviando comentário */
  submitComment(id) {
    const user = localStorage.getItem('user');
    api.post(`/posts/${id}/comment`, { comments: `@${user} ${this.state.comment}` });
    this.state.comment = ''; /* setando o estado do campo comentário em vazio para poder escrever novamente */
  }

  SocketIo = () => {
    const socket = io('http://localhost:3333');

    /* na escuta por novos likes */
    socket.on('like', like => {
      this.setState({
        posts: this.state.posts.map(post =>
          post._id === like._id ? like : post
        )
      });
    });

    /* na escuta por novos comentários */
    socket.on('comment', comment => {
      this.setState({
        posts: this.state.posts.map(post =>
          post._id === comment._id ? comment : post
        )
      });
    });

    /* na escuta por novos posts ao serem deletados ou adicionados*/
    socket.on('post', newPost => {
      this.setState({ posts: newPost });
    });

  }

  /* efetuar like de acordo com o id do post*/
  IncrementLike(id) {
    api.post(`/posts/${id}/like`);
    document.getElementById(id).style.backgroundImage = `url(${require('./imagens/like_red.svg')})`; /* deixando o icone vermelho */
    document.getElementById(id).style.transform = 'scale(1.1)'; /* aumentando um pouco o seu tamanho */
    document.getElementById(id).style.transition = '0.2s'; /* tempo da animação */
  }

  /*  deletar post*/
  DeletePost(id) {
    api.delete(`/posts/${id}/delete`);

  }


  render() {

    return (
      <div>
        <Header />
        <div>
          {this.state.posts.map(post => (
            <div class="post" key={post._id}>
              <div class="username">
                <img class="menu-post" onClick={() => this.DeleteConfirm(post._id)} src={Delete} alt="menu" />
                <div class="nickname">
                  <b>{post.author}</b>
                  <p class="localization">{post.localization}</p>
                </div>
              </div>
              <div class="post-img">
                <img src={`http://localhost:3333/files/${post.imagem}`} />
              </div>
              <div class="buttons">
                <img src={Like} alt="Like" id={post._id} onClick={() => this.IncrementLike(post._id)} class="btn-like" />
                <img src={Comment} class="btn-comment" alt="Comment" />
                <button type="button" class="btn-direct"><img src={Direct} alt="Direct" /></button>
              </div>
              <div class="content">
                <p class="like">{post.likes} Curtidas</p>
                <p>{post.description}</p>
                <p class="hashtags">{post.hashtags}</p>
                {post.comments.split(',').map(comment => (
                  <p class="text-comment">{comment}</p>
                ))}
              </div>
              <input type="text" required value={this.state.comment} placeholder="Adicione um comentário" onChange={e => this.setState({ comment: e.target.value })} class="input-text comment" /><button onClick={() => this.submitComment(post._id)} class="comment-submit">Publicar</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Home;

