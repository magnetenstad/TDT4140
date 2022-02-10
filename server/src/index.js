const express = require('express');
const {Database} = require('./db.js');

const PORT = 3001;
const server = express();
const db = new Database(
  process.argv[2] === 'test' ? ':memory:' : './data/database.db');

server.get('/api/get', (request, result) => {
  result.send(JSON.stringify(db.getUsers()));
});

server.put('/api/insert', (request, result) => {
  db.insertUser(username,password);
  result.send();
});

//Is this correct?:)
server.put('/api/try_login', (request, result) => {
  db.tryLogin(username,password);
  result.send();
})

server.delete('/api/clear', (request, result) => {
  db.clearNumbers();
  result.send();
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
