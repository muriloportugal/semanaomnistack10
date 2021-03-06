const axios = require('axios');
const Dev = require('../models/Dev');
const parseStrigAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket'); 

// index, show, store, update, destroy

module.exports = {
  async index (request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },
  
  async store (request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });
    
    if(!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      // Se o apiResponse.data não tiver o valor de name, ele assume o valor de login
      const { name = login, avatar_url, bio } = apiResponse.data;
      const techsArray = parseStrigAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
    
      dev = await Dev.create({
        name,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar as conexões que estão no máximo 10km de distância
      // e que o novo dev tenha alguma das tecnologias filtradas
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return response.json(dev);
  },

  async delete(request, response){
    console.log(request.body);
    const { github_username } = request.body;
    if ( github_username ){
      const dev = await Dev.deleteOne({ github_username});
      if ( dev.deletedCount === 1){
        // Após deletado envia todos os devs novamente
        const devs = await Dev.find();
        return response.json(devs);
      }
    }else{
      return response.status(400).json({message: 'Bad Request'});
    }
  },

  async patch(request,response){
    const { github_username, techs, latitude, longitude } = request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    // Se o apiResponse.data não tiver o valor de name, ele assume o valor de login
    const { name = login, avatar_url, bio } = apiResponse.data;
    const techsArray = parseStrigAsArray(techs);
  
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };
  
    dev = await Dev.updateOne({
      github_username
    }, {
      name,
      github_username,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });
    
    if( dev.nModified === 1 ){
      // Após alterado envia todos os devs novamente
      const devs = await Dev.find();
      return response.json(devs);
    }else{
      return response.status(400).json({message: 'Bad Request'});
    }
  }
};