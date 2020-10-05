import React from "react";
import axios from "axios";
import SignUpCompany from "./SignUpCompany.jsx";
import { Link, link } from 'react-router-dom'
import Tasks from "./Tasks.jsx"
class LoginCompany extends React.Component {

  /** Choose a consistent way of doing things. Axios or jQuery. */
 
    constructor() {
        super();
        this.state = {
          name: "",
          password: "",
          signUp: false,
          login : false,
        };
      }
      goToSingUp() {
      var  changeSignUp = !this.state.signUp;
        this.setState({ signUp: changeSignUp });
        console.log("this is ===>", this.state.signUp)
      }
      handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }
      send() {
        axios.post("/login", this.state).then((res) => {
          axios.post("/api/user/update" , this.state.name)
        }).then(()=>{
          this.setState({login : true})
        }).catch(() => {
          alert('wrong password')
        });
      }

      /** If you have problems with writing readable code, use tools like prettier and eslint. They'll do it for you */

      render() {
        return (
          <div className="login">
            {!this.state.login ?
          <div>{!this.state.signUp ? 
              <div>
            <label id="label">Enter your name</label>
            <input id="inp"
              type="text"
                    name="name"
                    placeholder="Your name"
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
            />
            <label id="label">Enter your password</label>
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
                  <button id="but" onClick={this.send.bind(this)}>Login</button>
                  
                  
            <p id="loginP">
            Create your account 
              <a onClick={this.goToSingUp.bind(this)}>Sign up</a>
            </p>
            </div> : <SignUpCompany/> }
          </div> : <Tasks/> }
          </div>
        );
      }
}

export default LoginCompany;
