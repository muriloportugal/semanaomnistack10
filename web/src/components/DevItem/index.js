import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';



import './style.css';

function DevItem(props){
  const { dev, onDelete, editMode } = props;

  async function handleDelete(e){
    e.preventDefault();

    await onDelete({github_username: dev.github_username});
  }

  async function handleEdit(e){
    e.preventDefault();
    
    await editMode ({
      id: dev._id,
      github_username: dev.github_username,
      techs: dev.techs.join(', '),
      latitude: dev.location.coordinates[1],
      longitude: dev.location.coordinates[0],
    });
  }

  return (
    <li className="dev-item">
      <div className="userTop">
        <div className="divHeader">
          <header>
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
          </header>
        </div>
        <div className="divIcon">
          <IconButton aria-label="edit"  className="btnIcon" onClick={handleEdit}>
            <EditIcon  fontSize="small"/>
          </IconButton>
          <IconButton aria-label="delete"  className="btnIcon" onClick={handleDelete}>
            <DeleteIcon fontSize="small"/>
          </IconButton> 
        </div>
      </div>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
    </li>
  );
}

export default DevItem;