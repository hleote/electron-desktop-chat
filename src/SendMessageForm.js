import React, { Component } from 'react'
import { Button, TextInput } from 'react-desktop/macOs'

class SendMessageForm extends Component {
  state = {
    text: '',
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSend(this.state.text)
    this.setState({ text: '' })
  }

  onChange = e => {
    this.setState({ text: e.target.value })
    this.props.currentUser.isTypingIn({ roomId: 9818789 })
    .then(() => {})
    .catch(err => { console.log(`Error sending typing indicator: ${err}`) })
  }
  render() {
    return (
      <div className="send-message-form-container">
        <span>{this.props.typingMessage}</span>
        <form onSubmit={this.onSubmit} className="send-message-form">
          <TextInput
            type="text"
            onChange={this.onChange}
            value={this.state.text}
            className="message-input"
          />
          <Button color="blue" type="submit">
            Send
          </Button>
        </form>
      </div>
    )
  }
}

export default SendMessageForm