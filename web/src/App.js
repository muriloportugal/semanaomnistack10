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
  const [edit, setEdit] = useState({});

  useEffect(() => { // Busca no BD os Devs para serem exibidos na página inicial
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    };
    loadDevs();
  },[]); // Array vazio no final para executar somente uma vez quando carregar este componente.

  async function handleAddDev(data){ // Salva um novo Dev
    const response = await api.post('/devs', data);
    
    setDevs([...devs, response.data]);
  }

  async function deleteDev(github_username){ // Deleta um Dev
    const response = await api.delete('/devs', {data: github_username}); // axios utiliza .detele(url,{headers:{Authorization: authorizationToken},data:{source: source}});
    setDevs(response.data);
  }

  async function editMode(devData){ // Editar Dev
    setEdit(devData);
    
  }

  async function editDev(data){
    const response = await api.patch('/devs',data);
    setDevs(response.data);
  }

  return (
    <div id="app">
      <aside>
        
        <DevForm onSubmit={handleAddDev} editMode={edit} onEdit={editDev}/>
      </aside>
      
      <main>
        <ul>
          {devs.map( dev => {
            return (
              <DevItem key={dev._id} dev={dev} onDelete={deleteDev} editMode={editMode} />
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
