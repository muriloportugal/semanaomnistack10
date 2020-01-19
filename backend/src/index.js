const express = require('express');
const mongooose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app); // Para a comunicação via websocket

setupWebsocket(server);

mongooose.connect('mongodb+srv://mpmongouser:bXBtb25nb3VzZXI2020@cluster0-cvvcq.gcp.mongodb.net/omnistack10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//app.use( cors( { origin: 'http://localhost:3000' } ) );
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
