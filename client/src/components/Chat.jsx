import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      messages: [],
      connected : ""
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
    this.getConnected = this.getConnected.bind(this)
  }
  // get all the messages from database
  getAllMessages() {
    $.ajax({
      url: `/api/users/getMessages`,
      type: "get",
      success: (res) => {
        this.setState({ messages: res })
        
      },
    });
  }
  // // get the person who is connected 
  getConnected() {
    $.ajax({
      url: `/api/users/getConnected`,
      type: "get",
      success: (res) => {
        this.setState({ connected: res });
        // console.log('this is you ===>',this.state.connected)
        console.log("this is sparta" , this.state.connected)
      },
    });
  }
  // invoke getAllMessages in componentWillMount so you don't have to reload the
  // page every time you add message 
  componentWillMount() {
    this.getAllMessages();
    this.getConnected() 
  }
  // save one message in the data base
  sendMessage() {
    axios.post("/api/users/sendMessage", this.state).then(() => {
      this.componentWillMount();
    });
  }
  // save every change of the input in the state
  handlechange(e) {
    var msgWithName = this.state.connected + ":" + e.target.value 
    this.setState({ [e.target.name]: msgWithName });
  }
  render() {
    // insert all the messages in list
    var listOfMessages = [];
    for (var i = 0; i < this.state.messages.length; i++) {
      console.log("this is a msg ======> ", this.state.messages[i].msg);
      listOfMessages.push(<li key={i}> {this.state.messages[i].msg}</li>);
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
