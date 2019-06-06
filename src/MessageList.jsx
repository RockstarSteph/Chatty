
import React from 'react';
import Message from './Message.jsx'


class MessageList extends React.Component{

  render(){

  const messageListItems = this.props.messages.map((message) => {
    return(<Message key={message.id} message = {message} />);
  });


    return (
      <main className="messages" >
      {messageListItems}
      </main>
      )
  }
}

export default MessageList;