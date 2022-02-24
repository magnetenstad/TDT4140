const express = require('express');
const {Database} = require('./db.js');

const PORT = 3001;
const server = express();
let db = new Database(
  process.argv[2] === 'test' ? ':memory:' : './data/database.db');

server.use(express.json());
server.use(express.urlencoded({extended: true}));

// API tests: client/cypress/integration/api.test.js

server.get('/api/get-users', (request, result) => {
  result.send(JSON.stringify(db.getUsers()));
});

server.delete('/api/debug/clear', (request, result) => {
  db = new Database(
    process.argv[2] === 'test' ? ':memory:' : './data/database.db');
  result.send('OK');
});

server.put('/api/get-user', (request, result) => {
  result.send(JSON.stringify(db.getUser(request.body.username)));
});

server.put('/api/insert-user', (request, result) => {
  if (!db.tryLogin(request.body.username, request.body.password) &&
      validUsername(request.body.username) &&
      validPassword(request.body.password)) {
    db.insertUser(request.body.username, request.body.password,
        request.body.age, request.body.email, request.body.gender);
    result.send('OK');
  } else {
    let errorData = alertErrors(registration_errors);
    result.status(400);
    result.send(JSON.stringify(errorData.error));
    clearErrors(registration_errors);
  }
});

server.put('/api/try-login', (request, result) => {
  if (db.tryLogin(request.body.username, request.body.password)) {
    result.send('OK');
  } else {
    result.status(400).send();
  }
});

server.put('/api/insert-group', (request, result) => {
  if (validGroupname(request.body.groupname)) {
    db.insertGroup(request.body.id, request.body.name,
        request.body.admin, request.body.description);
    db.addUserToGroup(request.body.id, request.body.admin);
    result.send('OK');
  } else {
    result.status(400);
  }
});

server.put('/api/get-group', (request, result) => {
  result.send(JSON.stringify(db.getGroup(request.body.id)));
});

server.put('/api/get-groups-with-user', (request, result) => {
  result.send(JSON.stringify(db.getGroupsWithUser(request.body.username)));
});

server.get('/api/get-groups', (request, result) => {
  result.send(JSON.stringify(db.getGroups()));
});

server.put('/api/add-user-to-group', (request, result) => {
  db.addUserToGroup(request.body.groupId, request.body.username);
  result.send('OK');
});

server.get('/api/get-group-members', (request, result) => {
  result.send(JSON.stringify(db.getGroupMembers(request.body.groupId)));
});

server.get('/api/get-group-interests', (request, result) => {
  result.send(JSON.stringify(db.getGroupInterests(request.body.groupId)));
});

server.put('/api/insert-group-interest', (request, result) => {
  db.addGroupInterest(request.body.groupId, request.body.interest);
  result.send('OK');
});

server.put('/api/match-groups', (request, result) => {
  db.matchGroups(request.body.primaryId, request.body.secondaryId);
  result.send('OK');
});

server.put('/api/get-group-matches', (request, result) => {
  result.send(JSON.stringify(db.getGroupMatches(request.body.id)));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const registration_errors = [];

function validUsername(username) {
  const regexPattern = /[A-Za-z]+$/i; // Regex only letters
  if(regexPattern.test(username)){
    return true;
  } else {
    registration_errors.push("Username must only containt letters");
  }
}

function validPassword(password) {
  if(password.length > 6){
    return true;
  } else {
    registration_errors.push("Password must be atleast 6 characters long");
    return false;
  }
}

function validGroupname(groupname) {
  const regexPattern = /[A-Za-z]+$/i;
  if(regexPattern.test(groupname)){
    return true;
  } else {
    registration_errors.push("Groupname must only contain letters");
    return false;
  }
}

function alertErrors(registration_errors) {
  if(registration_errors.length != 0) {
    let output = registration_errors.join('\r\n');
    let outputJSON = {
      error: output,
    };
    return outputJSON;
  }
}

function clearErrors(registration_errors) {
  registration_errors.length = 0;
  output = "";
  return null;
}
