import React from "react";
import axios from "axios";
import LoginCompany from "./LoginCompany.jsx";

class SignUpCompany extends React.Component {
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
    const { name, password, image, key } = this.state;
    axios.post("/signup/company", { name, password, image, key }).then(() => {
      var login = !this.state.toLogin;
      this.setState({ toLogin: login });
    });
  }
  render() {
    return (
      <div>
        {!this.state.toLogin ? (
          <div id="signUpCom">
            <label id="label"> Kindly Fill Below Your Ccompany Name</label>
            <br />
            <input
              id="inp"
              type="text"
              onChange={this.handleChange.bind(this)}
              name="name"
              placeholder="  Company Name"
              value={this.state.name}
            />
            <br />
            <label id="label">Enter the password</label>
            <br />
            <input
              id="inp"
              type="new-password"
              onChange={this.handleChange.bind(this)}
              name="password"
              placeholder="password"
              value={this.state.password}
            />
            <br />
            <label id="label">ImageUrl</label>
            <br />
            <input
              id="inp"
              type="text"
              onChange={this.handleChange.bind(this)}
              name="image"
              value={this.state.image}
            />
            <br />
            <label id="label">Declare Your Company Key</label>
            <br />
            <input
              id="inp"
              type="new-password"
              onChange={this.handleChange.bind(this)}
              name="key"
              placeholder="Your Company Key"
              value={this.state.key}
            />
            <br />
            <br />
            <button id="but" onClick={this.submit.bind(this)}>
              Sign up Company
            </button>
          </div>
        ) : (
          <LoginCompany />
        )}
      </div>
    );
  }
}
export default SignUpCompany;
