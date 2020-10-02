import React from "react";
import axios from "axios";
import Tasks from "./Tasks.jsx"
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      todo: "",
      myTodos: [],
      friend: "",
      tosend: "",
      myName: "",
      companyTodos:[],
      change : "DC"
    };
    // this.getTodoCompany = this.getTodoCompany.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.sendTodo = this.sendTodo.bind(this);
    // this.typeOfUser = this.typeOfUser.bind(this);
  }
  changeCompany(){
    axios.post("/api/user/changeKey" , {newKey : this.state.change})
  }

  handlechange(e){
   console.log(this.state.change)
    this.setState({[e.target.name] : e.target.value})
  }
  // get the list of the friends 
  getFriends() {
    $.ajax({
      url: `/api/users/getFriends`,
      type: "get",
      success: (res) => {
        this.setState({ friends: res });
      },
    });
  }
  // get the list of the todos for every user 
  getTodo() {
    $.ajax({
      url: `/api/users/getuser`,
      type: "get",
      success: (res) => {
        console.log("this is element ",res);
        var newTodo = [];
        for (var i = 0; i < res[0].myToDoList.length; i++) {
          newTodo.push(
            <li key={i} id="liColor" onClick={this.done.bind(this , i )}>
              {res[0].myToDoList[i]}
            </li>
          );
        }
        this.setState({companyTodos : res[0].companyToDoList})
        this.setState({ myTodos: newTodo });
        this.setState({ myName: res[0].name });
      },
    });
  }
  //set that todo to done if you click on it 
  done(index) {
    console.log(index);
  }

  componentDidMount() {
    this.getFriends();
    this.getTodo();
  }
  //push todo inside the data base 
  sendTodo() {
    axios.post("/api/users/pushTodo", { todo: this.state.todo }).then(() => {
      this.getTodo();
    });
  }
  // inser the todo in the state and friend that you will send to him the 
  // todo 
  putTodo(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // insert friend that you will send to him the todo in state 
  selectFriend(e) {
    this.setState({ friend: e.target.value });
  }


  done() {
    var e = document.getElementById("liColor");
    var c = window.getComputedStyle(e).backgroundColor;
    if (c === "rgb(252, 250, 250)") {
    document.getElementById("liColor").style.background = "#66FF66";
} else{
    document.getElementById("liColor").style.background = "#FCFAFA";
}
  }


  delete(){
    axios.post("/api/delete").then(()=>{
      this.componentDidMount()
      })
   }
  Tosend(e) {
    this.setState({ toSend: e.target.value });
    console.log(this.state.toSend);
  }
  Post() {
    const { toSend, friend, myName } = this.state;
    axios.post("/api/users/sendTodo", { toSend, friend, myName });
  }
  render() {
    var users = [];
        for (var i = 0; i < this.state.friends.length; i++) {
      users.push(<option key={i} >{this.state.friends[i].name} </option>);
    }

    var companytodosforme = []
    for(var i = 0 ; i < this.state.companyTodos.length ; i++){
    companytodosforme.push(<li key={i}>{this.state.companyTodos[i]}</li>)
    }
    return (
      <div>
          <div>
            <div className="myTodo">
              <p>
                WHAT I DO TODAY ??
                <input
                  name="todo"
                  type="text"
                  placeholder="my Todo"
                  onChange={this.putTodo.bind(this)}
                ></input>
              </p>
              <button value="TodoButton" onClick={this.sendTodo}>
                APPLY
              </button>
            </div>
            <div className="todoList">
              <ul> {this.state.myTodos} </ul>
              <button onClick={this.delete.bind(this)}>Delete</button>
            </div>
            <div className="companyTodo">
            <h1>rgtjdf</h1>
          <ul> {companytodosforme} </ul>
          </div>
            <div className="friendAdd">
              <p>
                Choose HERE :
                <select
                  placeholder="Choose your friend"
                  className="friendList"
                  onChange={this.selectFriend.bind(this)}
                >
                  {users}
                  <option>--- Select ALL ---</option>
                </select>
              </p>
              WHAT YOU WANT YOUR FRIEND TO DO :
              <input
                type="text"
                className="friendList"
                onChange={this.Tosend.bind(this)}
              ></input>
              <button onClick={this.Post.bind(this)}>GET HIM!</button>
            </div>
            <div>
              <input name="change" onChange={this.handlechange.bind(this)}></input>
              <button onClick={this.changeCompany.bind(this)}>change key of company</button>
            </div>
          </div>
      </div>
    );
  }
}


export default Todo;
