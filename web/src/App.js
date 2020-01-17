import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

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
  const [devs, setDevs] = useState([]);

  useEffect(() => { // Busca no BD os Devs para serem exibidos na página inicial
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    };
    loadDevs();
  },[]); // Array vazio no final para executra somente uma vez quando carregar este componente.

  async function handleAddDev(data){
    const response = await api.post('/devs', data);
    
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      
      <main>
        <ul>
          {devs.map( dev => {
            return (
              <DevItem key={dev._id} dev={dev} />
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
