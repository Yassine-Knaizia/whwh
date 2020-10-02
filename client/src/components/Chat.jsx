import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
  }
  // get all the messages from database
  getAllMessages() {
    $.ajax({
      url: `/api/users/getMessages`,
      type: "get",
      success: (res) => {
        this.setState({ messages: res });
      },
    });
  }
  // // get the person who is connected 
  // getConnected() {
  //   $.ajax({
  //     url: `/api/users/getMessages`,
  //     type: "get",
  //     success: (res) => {
  //       this.setState({ messages: res });
  //     },
  //   });
  // }
  // invoke getAllMessages in componentWillMount so you don't have to reload the
  // page every time you add message 
  componentWillMount() {
    this.getAllMessages();
  }
  // save one message in the data base
  sendMessage() {
    axios.post("/api/users/sendMessage", this.state).then(() => {
      this.componentWillMount();
    });
  }
  // save every change of the input in the state
  handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    // insert all the messages in list
    var listOfMessages = [];
    for (var i = 0; i < this.state.messages.length; i++) {
      console.log("this is a msg ======> ", this.state.messages[i].msg);
      listOfMessages.push(<li key={i}>{this.state.messages[i].msg}</li>);
    }
    // return the chat 
    return (
      <div>
        <div className="chatArea"></div>
        <div className="chatText">
          <textarea name="msg" onChange={this.handlechange}></textarea>
          <button value="Send" onClick={this.sendMessage}>
            Send
          </button>
          <ul>{listOfMessages}</ul>
        </div>
      </div>
    );
  }
}
export default Chat;
