import React, { useState } from 'react';
import Header from '../../components/Header';
import './style.css';
import api from '../../services/api';


export default function CreatePost({ history }) {

  const [imagem, setImagem] = useState(null);
  const [localization, setLocalization] = useState('');
  const [hashtags, setHashtag] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    /* pegando os valores do formulário */
    const data = new FormData();
    const author = localStorage.getItem('user');
    data.append('imagem', imagem);
    data.append('localization', localization);
    data.append('description', description);
    data.append('hashtags', hashtags);
    data.append('author', author);
    
    await api.post('posts', data);

    history.push('/home');
  }


  return (
    <div>
      <Header />
      <div>

        <div id="container">
          <div class="content">
            <form class="form-insta" onSubmit={handleSubmit} enctype="application/x-www-form-urlencoded">

              Imagem:<input type="file" onChange={event => setImagem(event.target.files[0])} class="input-text" required/><br />< br />
              <input type="text" value={localization} onChange={event => setLocalization(event.target.value)} placeholder="localização" class="input-text" required/>
              <textarea value={hashtags} onChange={event => setHashtag(event.target.value)} class="input-text" placeholder="digite aqui as hashtags" required></textarea>
              <textarea value={description} onChange={event => setDescription(event.target.value)} class="input-text" placeholder="descrição do post" required></textarea>
              <input type="submit" value="Concluir" class="btn" />
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
