const express = require('express');
const mongooose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');
require('dotenv').config()

const app = express();
const server = http.Server(app); // Para a comunicação via websocket

setupWebsocket(server);

mongooose.connect(process.env.DB_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//app.use( cors( { origin: 'http://localhost:3000' } ) );
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
