import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
/** Remove the unused imports to avoid slowing down your application */

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      messages: [],
      connected: "",
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
    this.getConnected = this.getConnected.bind(this);
  }
  // get all the messages from database
  getAllMessages() {
    $.ajax({
      url: `/api/users/getMessages`, /**  You don't need to use a litteral with backticks `` if you don't have variables */
      type: "get", /** Normally, we write GET in capital letters. That's not wrong but it's a convention */
      success: (res) => {
        this.setState({ messages: res });
      },
    });
  }
  // // get the person who is connected
  getConnected() {
    $.ajax({
      url: `/api/users/getConnected`, /** Same thing as the other request */
      type: "get", /** Same thing as the other request */
      success: (res) => {
        this.setState({ connected: res });
        /** console.log('this is you ===>',this.state.connected) */
        console.log("this is sparta", this.state.connected); /** XD */
      },
    });
  }
  // invoke getAllMessages in componentWillMount so you don't have to reload the
  // page every time you add message
  componentWillMount() {
    this.getAllMessages();
    this.getConnected();
  }
  // save one message in the data base
  sendMessage() {
    axios.post("/api/users/sendMessage", this.state).then(() => {
      this.componentWillMount(); 
      /** Life cycle methods are made to be called automatically when we something happens to the component 
      We don't call them manually. Instead, you could've used another Life cycle mehod for your case */
    });
  }
  // save every change of the input in the state
  handlechange(e) {
    var msgWithName = this.state.connected + ":" + e.target.value;
    this.setState({ [e.target.name]: msgWithName });
  }
  render() {
    // insert all the messages in list
    var listOfMessages = [];
    /** Map is way better for these loops. Since they give us the ability to return a new element (the jsx tag)
     * for each element in the array */
    for (var i = 0; i < this.state.messages.length; i++) {
      console.log("this is a msg ======> ", this.state.messages[i].msg);
      listOfMessages.push(<li key={i}> {this.state.messages[i].msg}</li>);
    }
    // return the chat
    return (
      <div>
        {/** Use css "margin" and "padding" to make space between elements */}
        <br />
        <br />
        <br />
        <div className="wala">
          <div className="chatArea"></div>
          <div className="chatD">
            <h3>Your Messages Here</h3>
            <textarea id="msgArea" name="msg" onChange={this.handlechange}></textarea>
            <button className="chatB" value="Send" onClick={this.sendMessage}>
              Send
            </button>
            <ul>{listOfMessages}</ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Chat;
