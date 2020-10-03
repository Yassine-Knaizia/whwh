import React from "react";
import axios from "axios";
import LoginUser from "./LoginUser.jsx";
class SignUpUser extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      imageUrl: "",
      key: "",
      toLogin: false,
    };
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  submit(e) {
    e.preventDefault();
    const { name, password, imageUrl, key } = this.state;
    axios.post("/signup/user", { name, password, imageUrl, key });
    var login = !this.state.toLogin;
    this.setState({ toLogin: login });
  }
  render() {
    return (
      <div>
        {!this.state.toLogin ? (
          <div>
            <label id="label">Enter Your Name</label>
            <br />
            
                    <input
                        id="inp"
              type="text"
              onChange={this.handleChange.bind(this)}
                        name="name"
                        placeholder="Your Name"
              value={this.state.name}
            />
            <br/>
            <label id="label">Enter your password</label>
            <br/>
                    <input
                        id="inp"
              type="new-password"
              onChange={this.handleChange.bind(this)}
                        name="password"
                        placeholder="password"
              value={this.state.password}
            />
            <br/>
            <label id="label">ImageUrl</label><br />
            
            <input
              id="inp"
              type="text"
              onChange={this.handleChange.bind(this)}
                        name="imageUrl"
                        placeholder="ImageUrl"
              value={this.state.image}
            />
            <br/>
            <label id="label">Your Company Key</label><br/>
                    <input
                         id="inp"
              type="new-password"
              onChange={this.handleChange.bind(this)}
                        name="key"
                        placeholder="Company key"
              value={this.state.key}
            />
            <br />
            <br/>
            <button id="but" onClick={this.submit.bind(this)}>Sign up User</button>
          </div>
        ) : (
          <LoginUser />
        )}
      </div>
    );
  }
}
export default SignUpUser;
