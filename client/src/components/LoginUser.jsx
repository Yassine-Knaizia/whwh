import React from "react";
import axios from "axios";
import SignUpUser from "./SignUpUser.jsx";
import Home from "./Home.jsx"
import { Link, link } from 'react-router-dom'

class LoginUser extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      signUp: false,
      login : false
    };
  }
  goToSingUp() {
  var  changeSignUp = !this.state.signUp;
    this.setState({ signUp: changeSignUp });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  send() {
    axios.post("/login", this.state).then((res) => {
      axios.post("/api/user/update" , this.state.name)
    }).then(()=>{
      this.setState({login : true})
    });
  }
  render() {
    return (
      <div>
        {!this.state.login ?
      <div>{!this.state.signUp ? 
          <div>
        <p>User's Login</p>
        <label>Enter your name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
        />
        <label>enter your password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={this.send.bind(this)}>Login</button>
        <p>
          if you dont have an acount
          <a onClick={this.goToSingUp.bind(this)}>sign up</a>
        </p>
        </div> : <SignUpUser/> }
      </div> : <NewNav/> }
      </div>
    );
  }
}

function NewNav(){

  return <div>
   <div className="nav-bar"> 
  
  <nav>
  <a className="logo" href="#"> logo</a>
  <ul className="nav">
  <Link to="/home">
         <li><a>Home</a></li>
      </Link>
      <Link to="/todo">
         <li ><a>Todo</a></li>
      </Link>
      <Link to="/chat">
         <li><a>chat</a></li>
      </Link>
  </ul>
</nav>
</div>
<h1>hello to our task maneger</h1>
</div>
}
export default LoginUser;
