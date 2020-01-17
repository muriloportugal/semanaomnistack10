import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

// Componente
//   Bloco isolado de HTML, CSS e JS que não interfere no restante da aplicacao 
//   (funcao que retorna algum conteúdo como html, css ou js da interface. Primeira letra sempre maiúscula e um componente por arquivo)
// Propriedade
//  Informação (variáveis) que são passadas para os componentes
// Estado
//  Informações mantidas pelo componente (lembrar imutabilidade)


function App() {

  const [github_username, setGithubusername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    }, (err) => {
      console.log(err);
    }, {
      timeout: 30000,
    });
  },[]);


  async function handleAddDev(e){
    e.preventDefault();
    const response = api.post('/devs',{
      github_username,
      techs,
      latitude,
      longitude
    });
    console.log(response.data);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={ e => setGithubusername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={ e => setTechs(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                required value={latitude}
                onChange={ e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required value={longitude}
                onChange={ e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          
          <button type="submit">Salvar</button>
        
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/40072024?s=400&v=4" alt="Murilo Portugal"/>
              <div className="user-info">
                <strong>Murilo Portugal</strong>
                <span>ABAP, ReactJS, NodeJS</span>
              </div>
            </header>
            <p>Biografia, blablabla blablabla blablablablablabla blablabla blablabla blablablablablabla blablabla</p>
            <a href="https://github.com/muriloportugal">Acessar perfil no GitHub</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/40072024?s=400&v=4" alt="Murilo Portugal"/>
              <div className="user-info">
                <strong>Murilo Portugal</strong>
                <span>ABAP, ReactJS, NodeJS</span>
              </div>
            </header>
            <p>Biografia, blablabla blablabla blablablablablabla blablabla blablabla blablablablablabla blablabla</p>
            <a href="https://github.com/muriloportugal">Acessar perfil no GitHub</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/40072024?s=400&v=4" alt="Murilo Portugal"/>
              <div className="user-info">
                <strong>Murilo Portugal</strong>
                <span>ABAP, ReactJS, NodeJS</span>
              </div>
            </header>
            <p>Biografia, blablabla blablabla blablablablablabla blablabla blablabla blablablablablabla blablabla</p>
            <a href="https://github.com/muriloportugal">Acessar perfil no GitHub</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/40072024?s=400&v=4" alt="Murilo Portugal"/>
              <div className="user-info">
                <strong>Murilo Portugal</strong>
                <span>ABAP, ReactJS, NodeJS</span>
              </div>
            </header>
            <p>Biografia, blablabla blablabla blablablablablabla blablabla blablabla blablablablablabla blablabla</p>
            <a href="https://github.com/muriloportugal">Acessar perfil no GitHub</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
