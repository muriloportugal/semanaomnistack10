const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');
const connection = [];
let io; //Cria o io fora para ser utilizado nos outros métodos desta classe.

// Websocket utilizado para atualizar as informações na tela dos usuários em tempo real

exports.setupWebsocket = (server) => {
  io = socketio(server);

  // Quando algum cliente se conectar armazena as informações de 
  // latitude, longitude e techs para utilziar como filtro e caso alguém cadastre um novo dev
  // que atenda aos filtros é exibido automaticamente na tela do usuário sem ele precisar clicar para
  // atualizar. (Lembrando que o Raio de busca para retornar os dev é de 10km $maxDistance: 10000)
  io.on('connection', socket => {
    
    const { latitude, longitude, techs} = socket.handshake.query;

    if(latitude && longitude && techs){
      connection.push({
        id: socket.id,
        coordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        techs: parseStringAsArray(techs)
      });
    }

  });
};

exports.findConnections = (coordinates, techs) => {
  return connection.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item));
  });
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message,data);
  });
}