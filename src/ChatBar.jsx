import React from 'react';

class ChatBar extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      //username: ''
      content: '',
    };
  }

  // handleChange = event => {
  //   this.setState({content: event.target.value});
  // }


  handleMsgPlusEnter = event => {
    if (event.key === 'Enter'){
      // this.props.addNewMessage(this.state.content);
      this.props.addNewMessage(event.target.value);
      event.target.value= "";
      this.setState({content:''});
    }
  };

  // handleUsernameChange = event =>{
  //       this.props.changeName(event.target.value)

  //   }

    PressEnterUserName = event => {
      if(event.key === 'Enter') {
    this.props.changeName(event.target.value)

      }
    }

  render(){

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} type="text" onKeyDown={this.PressEnterUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
            onKeyDown={this.handleMsgPlusEnter}/>
      </footer>
      )
  }

}

export default ChatBar;
