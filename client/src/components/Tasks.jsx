import React from "react";
import axios from "axios";
class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmployees: [],
      taskForEmployee: "",
      nameOfEmloyee: "",
      newEmploye: "",
      fire: "",
      archive: [],
    };
    this.getAllArchive = this.getAllArchive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAllEmployees = this.getAllEmployees.bind(this);
  }
  // insert every input change in state
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  // send the task to the employee
  sendToEmployee() {
    axios
      .post("/api/users/giveOrder", {
        taskForEmployee: this.state.taskForEmployee,
        nameOfEmloyee: this.state.nameOfEmloyee,
      })
      .then(() => {
        this.componentWillMount();
      });
  }
  fireEmployee() {
    axios.post("/api/user/fire", { newF: this.state.fire });
  }
  addEmployee() {
    axios.post("/api/user/add", { newE: this.state.newEmploye }).then((res) => {
      this.setState({ allEmployees: [...this.state.allEmployees, res.data] });
    });
  }
  // get the list of the employees from the database
  getAllEmployees() {
    $.ajax({
      url: "/api/users/employee",
      type: "get",
      success: (res) => {
        this.setState({ allEmployees: res });
      },
    });
  }
  getAllArchive() {
    $.ajax({
      url: "/api/users/archive",
      type: "get",
      success: (res) => {
        var arch = [];
        for (var i = 0; i < res.length; i++) {
          arch.push(
            <li key={i}>
              to {res[i].name} : {res[i].todo}
            </li>
          );
        }
        this.setState({ archive: arch });
      },
    });
  }
  // async getAllArchive(){
  //     const data =await fetch("/api/users/archive");
  //   let archiive= await  data.json();
  //   console.log(archiive)
  // }
  componentWillMount() {
    this.getAllArchive();
    this.addEmployee();
    this.getAllArchive();
    this.getAllEmployees();
  }
  render() {
    var employeesList = [];
    for (var i = 0; i < this.state.allEmployees.length; i++) {
      employeesList.push(<option key={i}>{this.state.allEmployees[i]}</option>);
    }
    console.log("helloo ", this.state.archive);
    return (
      <div>
        <div className="Orders">
          <p>
           Pick Employee
            <select
              placeholder="WORKERS NAMES"
              name="nameOfEmloyee"
              onChange={this.handleChange}
            >
              {employeesList}
              <option>-- Select -- </option>
            </select>
          </p>
          <p>
            Require Task
            <input
               id="task"
              name="taskForEmployee"
              type="text"
              placeholder="Task"
              onChange={this.handleChange}
            ></input>
            <button onClick={this.sendToEmployee.bind(this)}>send</button>
          </p>
        </div>
        <div className="companyTodo">
          <ul>{this.state.archive}</ul>
        </div>
        <div>
          <h3>Add Newcomer</h3>
          <input name="newEmploye" onChange={this.handleChange}></input>
          <button onClick={this.addEmployee.bind(this)}>Add</button>
        </div>
        <div>
          <h3>Dismiss</h3>
          <input name="fire" onChange={this.handleChange}></input>
          <button onClick={this.fireEmployee.bind(this)}>Confirm</button>
        </div>
      </div>
    );
  }
}
export default Tasks;