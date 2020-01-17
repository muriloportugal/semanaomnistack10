const axios = require('axios');
const Dev = require('../models/Dev');
const parseStrigAsArray = require('../utils/parseStringAsArray');

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
    }

    return response.json(dev);
  }
};