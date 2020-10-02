import axios from "axios";
import React from "react";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfCoworker: [] , 
      todosMe : [] , 
      info : false , 
      todosCompany : []
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
  show(index){
    var name = this.state.listOfCoworker[index].name
    axios.post('/api/getinfo',{Speciffic:name}).then((res)=>{
      console.log(res.data.myToDoList)
      var mytodo = []
      for(var i = 0 ; i < res.data.myToDoList.length ; i++){
        mytodo.push(<li key={i}>{res.data.myToDoList[i]}</li>)
      }
      var companytodo = []
      for(var i = 0 ; i < res.data.companyToDoList.length ; i++){
        companytodo.push(<li key={i}>{res.data.companyToDoList[i]}</li>)
      }
      this.setState({todosCompany : companytodo})
      this.setState({todosMe : mytodo})
      var infos = !this.state.info 
      this.setState({info : infos})
      console.log(this.state.info)
    })
  }
  render() {
    var friendList = [];
    //add the coworker to list with their images
    for (var i = 0; i < this.state.listOfCoworker.length; i++) {
      friendList.push(
        <div key={i}>
        <li onClick={this.show.bind(this , i )}>
          {this.state.listOfCoworker[i].name}
          <img src={this.state.listOfCoworker[i].imageUrl} />
        </li>
      {this.state.info ?<div> this is his todos : <ul>{this.state.todosMe}</ul> this is the company of him todos <ul>{this.state.todosCompany}</ul> </div>: null}
        </div>
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