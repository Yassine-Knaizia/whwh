import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfCoworker: [],
    };
    this.getAllCoworkers = this.getAllCoworkers.bind(this);
  }
  //get all the coworkers from database
  getAllCoworkers() {
    $.ajax({
      url: `/api/users/getFriends`,
      type: "get",
      success: (res) => {
        this.setState({ listOfCoworker: res });
      },
    });
  }
  componentWillMount() {
    this.getAllCoworkers();
  }
  render() {
    var friendList = [];
    //add the coworker to list with their images
    for (var i = 0; i < this.state.listOfCoworker.length; i++) {
      friendList.push(
        <li key={i}>
          {this.state.listOfCoworker[i].name}
          <img src={this.state.listOfCoworker[i].imageUrl} />{" "}
        </li>
      );
    }
    return (
      <div id="main">
        <ul>{friendList}</ul>
      </div>
    );
  }
}
export default Home;
