import React from "react";
import LoginCompany from "./LoginCompany.jsx";
import LoginUser from "./LoginUser.jsx";


class Land extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToUserLogin: false,
      goToCompanyLogin: false,
    };
    this.toUserLogin = this.toUserLogin.bind(this);
    this.toCompanyLogin = this.toCompanyLogin.bind(this);
  }
  // take you to user login interface
  toUserLogin() {
    var logUser = !this.state.goToUserLogin;
    this.setState({ goToUserLogin: logUser });
  }
  // take you to Company login interface
  toCompanyLogin() {
    var logCompany = !this.state.goToCompanyLogin;
    this.setState({ goToCompanyLogin: logCompany });
  }
  render() {
    return (
      <div>
        {!this.state.goToCompanyLogin && !this.state.goToUserLogin ? (
          <div>
            <h1 className="landH">Online Task Manager</h1>
            <p className="landP">
              Plan and schedule your workflow online. Increase your team
              efficiency.
            </p>
            <br />
            <button className="landB1" onClick={this.toUserLogin}>
            Join as User
            </button>
            <button className="landB2" onClick={this.toCompanyLogin}>
              Join as Company
            </button>
          </div>
        ) : this.state.goToUserLogin ? (
          <LoginUser/>
        ) : this.state.goToCompanyLogin ? (
          <LoginCompany/>
        ) : null}
      </div>
    );
  }
}
export default Land;
