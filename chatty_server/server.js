
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');
  let connectedClientsObj = {
    type: 'newjoin',
    nbOfUsers: wss.clients.size
  }
      wss.clients.forEach(function each(client){

      client.send(JSON.stringify(connectedClientsObj));

    })
  // connectClient(ws, wss.clients.size)



  ws.on('message', function incoming(message) {
    let messageObject = JSON.parse(message)
    console.log(messageObject)

    messageObject.id = uuidv4();

    //console.localhostog(messageObject);

    //console.log('User',messageObject.id, messageObject.username, 'said', messageObject.content);

    switch(messageObject.type){
      case "postNotification":
      wss.clients.forEach(function each(client){
      client.send(JSON.stringify(messageObject));
    })
      break;

      case "postMessage":
       wss.clients.forEach(function each(client){
      client.send(JSON.stringify(messageObject));
    })
      break;
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () =>  {
    console.log('Client disconnected')

    connectedClientsObj.nbOfUsers = wss.clients.size;

          wss.clients.forEach(function each(client){

      client.send(JSON.stringify(connectedClientsObj));

    })



  }




    );


});