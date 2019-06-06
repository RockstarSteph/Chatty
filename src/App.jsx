import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {
  //sets intial state
  constructor(props){
    super(props);
    this.state = {
  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
  nbOfUsers: "",
  messages: [

    // { id: 1,
    //   username: "Bob",
    //   content: "Has anyone seen my marbles?",
    // },

    // { id: 2,
    //   username: "Anonymous",
    //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    // }
    ]
  };
}



changeName = (newName) => {
 // const newCurrentUser = Object.assign({}, this.state.currentUser)
  // newCurrentUser.name = newName
  const newCurrentUser = { ...this.state.currentUser, name: newName }

  const oldName = this.state.currentUser.name;

  this.setState({currentUser: newCurrentUser})

  const notificationObj = {
    type: "postNotification",
    content: ` ${oldName} changed their username to ${newCurrentUser.name}`
  }

  this.serverSocket.send(JSON.stringify(notificationObj));
  //type prop needs to be attached to all objects sent through socket
  // the line `userA changed their username to Bob`

}


 // let currentUserFunc (()=>{

 //    )
 //  }

componentDidMount() {
  console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 3000);


  this.serverSocket = new WebSocket('ws://localhost:3001');
    console.log('new ws client created within serverSocket')

  this.serverSocket.onopen = event => {
    console.log('listener when an open connection to serverSocket from ws')
    }

  this.serverSocket.onmessage = event => {
        //console.log(event)
    console.log("THIS", event.data)
    const parsedEvent = JSON.parse(event.data);
    // const notif = JSON.parse(event.data);
    // const ajoin = JSON.parse(event.data);
//console.log(msg);
//switch(data.type)
    switch(parsedEvent.type){
      case "postNotification":
      this.setState({messages: [...this.state.messages, parsedEvent]});
      break;

      case "postMessage":
      this.setState({messages: [...this.state.messages, parsedEvent]});
      break;

      case "newjoin":
      this.setState({nbOfUsers: parsedEvent.nbOfUsers});
      break;
    }


  }

  // this.serverSocket.onmessage= event => {
  //   const notif = JSON.parse(event.data);
  //   console.log("THISONE ", event.data)
  //   this.setState({messages: [...this.state.messages, notif]});

  // }

  // this.serverSocket.onmessage = event => {
  //   const ajoin = JSON.parse(event.data);
  //   //this.setState({nbOfUsers: ajoin})
  // }

// ws.on('open', function open() {
//   ws.send('something');
// });

// ws.on('message', function incoming(data) {
//   console.log(data);
// });

// }

// joiningChannel = () => {

//   const myCurrentUser = this.state.currentUser.name;

//   const newJoinObj = {
//     type: "newjoin",
//     username: this.state.currentUser.name
//     //content: ` ${myCurrentUser} joined channel!`
//   }
//   this.serverSocket.send(JSON.stringify(newJoinObj));

}

addNewMessage = newMessage => {
 const messageObj = {
  type: "postMessage",
  username: this.state.currentUser.name,
  content: newMessage
 }

 // const oldArr = this.state.messages;
 // const newArr = [messageObj, ...oldArr]

 //this.setState({messages: newArr})

 this.serverSocket.send(JSON.stringify(messageObj));
}

// ps in Navbar for counting users or something currentUser={this.state.currentUser}

  render() {
    return (
      <div>

        <nav className="navbar" >
          <a href="/" className="navbar-brand">Work or Chat?</a>
          <span className = "navbar-count">{`Online Users ${this.state.nbOfUsers}`}</span>
        </nav>

        <MessageList messages={this.state.messages}/>

        <ChatBar currentUser={this.state.currentUser} addNewMessage= {this.addNewMessage} changeName={this.changeName}/>

      </div>
    );
  }
}
export default App;
