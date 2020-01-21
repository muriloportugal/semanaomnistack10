import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';



import './style.css';

function DevItem(props){
  const { dev } = props;
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>  
 
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
      <div>
          <IconButton aria-label="delete"  className="editIcon">
            <EditIcon  />
          </IconButton>
          <IconButton aria-label="delete"  className="deleteIcon">
            <DeleteIcon />
          </IconButton> 
      </div>
    </li>
  );
}

export default DevItem;