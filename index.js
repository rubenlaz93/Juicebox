require('dotenv').config();

// const PORT = 3002;
const { PORT = 3002 } = process.env
const express = require('express');
const server = express();
const morgan = require('morgan');
server.use(morgan('dev'));

const { client } = require('./db');
client.connect();

// server.use(express.json())

server.listen(PORT, () => {
  console.log('The server is up and ready on port', PORT)
});

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

const apiRouter = require('./api');
server.use('/api', apiRouter);