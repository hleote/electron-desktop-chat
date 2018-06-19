import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit'
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm'
import OnlineList from './OnlineList'

class Chat extends Component {
  state = {
    currentUser: {},
    currentRoom: {},
    messages: []
  }

  componentDidMount() {
    const chatkit = new ChatManager({
      instanceLocator: 'v1:us1:90438d6f-97bc-4436-be48-440af79a307d',
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/90438d6f-97bc-4436-be48-440af79a307d/token'
      })
    })

    chatkit
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        console.log('Bleep bloop 🤖 You are connected to Chatkit')
        return currentUser.subscribeToRoom({
            roomId: 9818789,
            messageLimit: 100,
            hooks: {
                onNewMessage: message => {
                    this.setState({ messages: [...this.state.messages, message] })
                },
                onUserCameOnline: () => this.forceUpdate(),
                onUserWentOffline: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate()
            }
        }).then(currentRoom => {
            this.setState({ currentRoom })
        })
      })
      .catch(error => console.error('error', error))
  }

  onSend = (text) => {
    this.state.currentUser.sendMessage({ text, roomId: this.state.currentRoom.id })
  }

  render() {
    return (
      <div className="wrapper">
        <div>
            <OnlineList currentUser={this.state.currentUser} users={this.state.currentRoom.users} />
        </div>
        <div className="chat">
            <MessageList currentUserName={this.state.currentUser.name} messages={this.state.messages} />
            <SendMessageForm onSend={this.onSend} />
        </div>
      </div>
    )
  }
}

export default Chat