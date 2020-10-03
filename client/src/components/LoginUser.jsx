import React from "react";
import axios from "axios";
import SignUpUser from "./SignUpUser.jsx";
import Home from "./Home.jsx";
import { Link, link } from "react-router-dom";

class LoginUser extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      signUp: false,
      login: false,
    };
  }
  goToSingUp() {
    var changeSignUp = !this.state.signUp;
    this.setState({ signUp: changeSignUp });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  send() {
    axios
      .post("/login", this.state)
      .then((res) => {
        axios.post("/api/user/update", this.state.name);
      })
      .then(() => {
        this.setState({ login: true });
      });
  }
  render() {
    return (
      <div>
        {!this.state.login ? (
          <div className="login">
            {!this.state.signUp ? (
              <div>
                <label id="label">Enter your name</label>
                <br/>
                <input
                  id="inp"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                /><br/>
                <label id="label">Enter your password</label>
                <br/>
                <input
                  id="inp"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
                  <br />
                  <br/>
                <button id="but" onClick={this.send.bind(this)}>
                  Login
                </button>
                <br/>
                <p id="loginP">
                  Create your account
                  <a onClick={this.goToSingUp.bind(this)}>Sign up</a>
                </p>
              </div>
            ) : (
              <SignUpUser />
            )}
          </div>
        ) : (
          <NewNav />
        )}
      </div>
    );
  }
}

function NewNav() {
  return (
    <div>
      <div className="nav-bar">
        
          <a className="logo" href="#">
            {" "}
            logo
          </a>
          <ul className="nav">
            <Link to="/home">
              <li>
                <a>Home</a>
              </li>
            </Link>
            <Link to="/todo">
              <li>
                <a>Tasks</a>
              </li>
            </Link>
            <Link to="/chat">
              <li>
                <a>chat</a>
              </li>
            </Link>
          </ul>
      
      </div>
      <div className="loginUser">
      <h1>Welcome! Enjoy your experience  </h1>
      </div>
    </div>
  );
}
export default LoginUser;
