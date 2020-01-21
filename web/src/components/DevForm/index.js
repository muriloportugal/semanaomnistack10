import React, { useState, useEffect } from 'react'

import './style.css'

function DevForm(props){
  const { onSubmit, editMode, onEdit } = props;
  const [ id, setId ] = useState('');
  const [github_username, setGithubusername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showEditButtons, setEditButtons] = useState(false);
  const [title, setTitle] = useState('Cadastrar');

  function getLocation(){
    navigator.geolocation.getCurrentPosition( (position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    }, (err) => {
      console.log(err);
    }, {
      timeout: 30000,
    });
  }

  useEffect(() => { // Busca Localização ao renderizar
    getLocation();
  },[]); // Array vazio no final para executra somente uma vez quando carregar este componente.

  useEffect(() => { // Se tiver alterações em editMode entra em modo de edição
    if(editMode.github_username ){
      setTitle('Editar');
      setId(editMode.id);
      setGithubusername(editMode.github_username);
      setTechs(editMode.techs);
      setLatitude(editMode.latitude);
      setLongitude(editMode.longitude);
      setEditButtons(true);
    }

  },[editMode]);

  function modoCadastro(){
    setTitle('Cadastrar');
    setId('');
    setGithubusername('');
    setTechs('');
    setEditButtons(false);
    getLocation();
  }

  async function handleSubmit(e){
    e.preventDefault();
    //Se esta cadastrando um usuário envia para o post
    if(e.target.user_id.value === ''){
      await onSubmit({
        github_username,
        techs,
        latitude,
        longitude
      });
      setGithubusername('');
      setTechs('');
    }else{
      // Quando estiver editando envia para o patch
      await onEdit({
        github_username,
        techs,
        latitude,
        longitude
      });
    }
    modoCadastro()
  }

  function cancelEdit(e){
    e.preventDefault();
    modoCadastro();
  }

  return (
    <>
    <strong>{title}</strong>
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <input name="user_id" id="user_id" value={id} hidden readOnly/> 
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
            step="any"
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
            step="any"
            required value={longitude}
            onChange={ e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <div className="formBttn">
        {showEditButtons && (
          <button className="btnCancelar" onClick={cancelEdit}>Cancelar</button>
        )}
        <button type="submit">Salvar</button>
      </div>
    </form>
    </ >
  );
}

export default DevForm;