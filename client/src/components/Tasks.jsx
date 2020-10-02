import React from "react";
import axios from "axios";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmployees: [],
      taskForEmployee: "",
      nameOfEmloyee: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.getAllEmployees = this.getAllEmployees.bind(this);
  }
  // insert every input change in state
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  // send the task to the employee
  sendToEmployee() {
    axios.post("/api/users/giveOrder", {
      taskForEmployee: this.state.taskForEmployee,
      nameOfEmloyee: this.state.nameOfEmloyee,
    });
  }
  // get the list of the employees from the database
  getAllEmployees() {
    $.ajax({
      url: `/api/users/employee`,
      type: "get",
      success: (res) => {
        this.setState({ allEmployees: res });
      },
    });
  }
  componentWillMount() {
    this.getAllEmployees();
  }
  render() {
    var employeesList = [];
    for (var i = 0; i < this.state.allEmployees.length; i++) {
      employeesList.push(
        <option key={i}>{this.state.allEmployees[i].name}</option>
      );
    }
    return (
      <div>
        <div className="Orders">
          <p>
            Choose HERE :
            <select
              placeholder="WORKERS NAMES"
              name="nameOfEmloyee"
              onChange={this.handleChange}
            >
              {employeesList}
              <option>-- Select ALL -- </option>
            </select>
          </p>
          <p>
            DO WHAT ?
            <input
              name="taskForEmployee"
              type="text"
              placeholder="TODO"
              onChange={this.handleChange}
            ></input>
            <button onClick={this.sendToEmployee.bind(this)}>send</button>
          </p>
        </div>
        <div className="companyTodo">
          <p>EMPTY DIV HERE</p>
        </div>
      </div>
    );
  }
}
export default Tasks
